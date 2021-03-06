import floor from 'lodash.floor'
import { OrderType } from '../..'
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
  /**
   * @default 'neutral'
   */
  gridType?: 'long' | 'short' | 'neutral'
}

export class NaiveGridSignal extends BaseSignal<GridSignalConfigs> {
  hasStarted = false

  constructor(config: GridSignalConfigs, logger: Logger) {
    super(config, logger)
  }

  async initialize() {
    const { market, gridType = 'neutral', priceLowerCap, priceUpperCap, gridCount, orderSize, startPrice } = this.config

    let started = false
    let currentPrice = 0
    while (!started) {
      const [bestAsk, bestBid] = await Promise.all([market.bestAsk(), market.bestBid()])

      if (!bestAsk || !bestBid) {
        this.logger.debug('no best ask or bid found, skip this tick')
        this.logger.debug(`wait 10 seconds...`)
        await new Promise(r => setTimeout(r, 10 * 1000))
        continue
      }

      currentPrice = average(bestAsk.price, bestBid.price)

      if (startPrice && currentPrice > startPrice) {
        this.logger.debug(`still not meet start price (${startPrice}), skip this tick`)
        this.logger.debug(`wait 10 seconds...`)
        await new Promise(r => setTimeout(r, 10 * 1000))
      } else {
        started = true
        break
      }
    }

    if (gridType === 'neutral') return

    const balance = await market.balance()
    const pace = (priceUpperCap - priceLowerCap) / gridCount
    if (gridType === 'long') {
      const expectedPosition = ((priceUpperCap - currentPrice) / pace) * orderSize
      this.logger.debug(`expected position: ${expectedPosition}`)
      if (balance.base < expectedPosition) {
        const order = {
          price: currentPrice * (1 + 0.025),
          size: expectedPosition - balance.base,
          side: OrderSide.Buy,
          type: OrderType.IOC,
        }
        this.logger.debug(`init position order: ${order.price} ${order.size} ${order.side} ${order.type}`)
        await market.placeOrder(order)
      }
    } else {
      const expectedPosition = ((priceLowerCap - currentPrice) / pace) * orderSize
      if (balance.base > expectedPosition) {
        const order = {
          price: currentPrice * (1 - 0.025),
          size: balance.base - expectedPosition,
          side: OrderSide.Sell,
          type: OrderType.IOC,
        }
        this.logger.debug(`init position order: ${order.price} ${order.size} ${order.side} ${order.type}`)
        await market.placeOrder(order)
      }
    }
  }

  async tick() {
    const {
      market,
      priceLowerCap,
      priceUpperCap,
      gridCount,
      gridActiveRange = 10,
      orderSize,
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
