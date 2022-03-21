import floor from 'lodash.floor'
import { Logger, Market, OrderDraft, OrderSide, ReceiptStatus } from '../../types'
import { average, isBetween, orderDraftKey } from '../../utils'
import { BaseSignal, BaseSignalConfigs } from '../base-signal'

export interface GridSignalConfigs extends BaseSignalConfigs {
  market: Market
  // highest acceptable price, bot will not place order when price higher than
  priceUpperCap: number
  // lowest acceptable price, bot will not place order when price lower than
  priceLowerCap: number
  gridCount: number
  /**
   * @default 10
   */
  gridActiveRange?: number
  // size of every placed order
  orderSize: number
  // signal will start to emit after price lower or equal to start price
  startPrice?: number
  // cancel all orders, clear all position and stop signal after price lowner or equal to stop loss price
  stopLossPrice?: number
  // cancel all orders, clear all position and stop signal after price higher or equal to take profit price
  takeProfitPrice?: number
}

export class NaiveGridSignal extends BaseSignal<GridSignalConfigs> {
  hasStarted = false

  constructor(config: GridSignalConfigs, logger: Logger) {
    super(config, logger)
  }

  async tick() {
    const {
      market,
      priceLowerCap,
      priceUpperCap,
      gridCount,
      gridActiveRange = 10,
      orderSize,
      startPrice,
      stopLossPrice,
      takeProfitPrice,
    } = this.config

    const [bestAsk, bestBid] = await Promise.all([market.bestAsk(), market.bestBid()])

    const receipts = market.receipts(ReceiptStatus.Placed, ReceiptStatus.PlacePending)

    if (!bestAsk || !bestBid) {
      this.logger.debug('no best ask or bid found, skip this tick')
      return
    }

    const currentPrice = average(bestAsk.price, bestBid.price)

    if (!this.hasStarted) {
      if (startPrice && currentPrice > startPrice) {
        this.logger.debug(`still not meet start price (${startPrice}), skip this tick`)
        return
      }

      this.hasStarted = true
    }

    if (stopLossPrice && currentPrice <= stopLossPrice) {
      this.logger.debug(`meet stop loss price (${stopLossPrice}), stop signal`)
      this.emit('cancel_all_orders_event', void 0)
      this.emit('clear_all_position', void 0)
      this.stop()
      return
    }

    if (takeProfitPrice && currentPrice >= takeProfitPrice) {
      this.logger.debug(`meet take profit price (${takeProfitPrice}), stop signal`)
      this.emit('cancel_all_orders_event', void 0)
      this.emit('clear_all_position', void 0)
      this.stop()
      return
    }

    this.logger.debug('stat report', {
      currentPrice,
      priceLowerCap,
      priceUpperCap,
      gridCount,
      orderSize,
      placePendings: market.receipts(ReceiptStatus.PlacePending).length,
      cancelPendings: market.receipts(ReceiptStatus.CancelPending).length,
      placeds: market.receipts(ReceiptStatus.Placed).length,
      fulfilleds: market.receipts(ReceiptStatus.Fulfilled).length,
      errors: market.receipts(ReceiptStatus.Error).length,
      canceled: market.receipts(ReceiptStatus.Canceled).length,
    })

    // price diff between every grids
    const pace = (priceUpperCap - priceLowerCap) / gridCount

    const drafts = new Map<string, OrderDraft>()

    for (let i = 0; i < gridCount; i++) {
      const gridPrice = priceLowerCap + pace * i

      const priceDistance = Math.abs(currentPrice - gridPrice)

      let draft: OrderDraft | undefined

      if (currentPrice > gridPrice && isBetween(priceDistance, pace, pace * gridActiveRange)) {
        draft = { side: OrderSide.Buy, size: orderSize, price: floor(gridPrice, 2) }
      } else if (gridPrice > currentPrice && isBetween(priceDistance, pace, pace * gridActiveRange)) {
        draft = { side: OrderSide.Sell, size: orderSize, price: floor(gridPrice, 2) }
      }

      if (draft) drafts.set(orderDraftKey(draft), draft)
    }

    this.logger.debug(`signal drafts:\n${Array.from(drafts.keys()).join('\n')}`)

    const cancelOrders: string[] = []

    for (const receipt of receipts) {
      const priceDistance = Math.abs(receipt.order.price - currentPrice)

      // cancel all orders which are beyond over 2 times of grid active range
      if (priceDistance > pace * 2 * gridActiveRange) {
        // cancel order which has be out of boundary
        cancelOrders.push(receipt.id)
        this.logger.debug('cancel order', receipt.id, JSON.stringify(receipt.order))
      } else {
        // remove draft which has placed
        drafts.delete(orderDraftKey(receipt.order))
        this.logger.debug('remove draft because of it has placed', receipt.id, JSON.stringify(receipt.order))
      }
    }

    for (const id of cancelOrders) {
      this.emit('cancel_order_event', { id })
    }

    for (const [, order] of drafts) {
      this.emit('place_order_event', { order })
    }

    return
  }
}
