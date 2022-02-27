import { floor } from 'lodash'
import { BaseSignal, BaseSignalConfigs } from 'signal/base-signal'
import { Market, OrderDraft, OrderSide, ReceiptStatus } from 'types'
import { average, orderDraftKey, isBetween } from 'utils'

export interface GridSignalConfigs extends BaseSignalConfigs {
  market: Market
  // highest acceptable price, bot will not place order when price higher than
  priceUpperCap: number
  // lowest acceptable price, bot will not place order when price lower than
  priceLowerCap: number
  gridCount: number
  // size of every placed order
  orderSize: number
  // signal will start to emit after price lower or equal to start price
  startPrice?: number
  // cancel all orders and stop signal after price lowner or equal to stop loss price
  stopLossPrice?: number
  // cancel all orders and stop signal after price higher or equal to take profit price
  takeProfitPrice?: number
}

export class NaiveGridSignal extends BaseSignal<GridSignalConfigs> {
  hasStarted = false

  constructor(config: GridSignalConfigs) {
    super(config)
  }

  async tick() {
    const { market, priceLowerCap, priceUpperCap, gridCount, orderSize, startPrice, stopLossPrice, takeProfitPrice } =
      this.config

    const [bestAsk, bestBid, receipts] = await Promise.all([
      market.bestAsk(),
      market.bestBid(),
      market.receipts(ReceiptStatus.Placed),
    ])

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

    // price diff between every grids
    const pace = (priceUpperCap - priceLowerCap) / gridCount

    const drafts = new Map<string, OrderDraft>()

    for (let i = 0; i < gridCount; i++) {
      const gridPrice = priceLowerCap + pace * i

      const priceDistance = Math.abs(currentPrice - gridPrice)

      let draft: OrderDraft | undefined

      if (currentPrice > gridPrice && isBetween(priceDistance, pace, pace * 10)) {
        draft = { side: OrderSide.Buy, size: orderSize, price: floor(gridPrice, 2) }
      } else if (gridPrice > currentPrice && isBetween(priceDistance, pace, pace * 10)) {
        draft = { side: OrderSide.Sell, size: orderSize, price: floor(gridPrice, 2) }
      }

      if (draft) drafts.set(orderDraftKey(draft), draft)
    }

    const cancelOrders: string[] = []

    for (const receipt of receipts) {
      const priceDistance = Math.abs(receipt.order.price - currentPrice)

      /**
       * @todo do we have to make `pace * 20` as arguments?
       */
      if (priceDistance > pace * 20) {
        // cancel order which has be out of boundary
        cancelOrders.push(receipt.id)
      } else {
        // remove draft which has placed
        drafts.delete(orderDraftKey(receipt.order))
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
