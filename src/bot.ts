import { Signal, Market, SignalEventListener, OrderType, OrderSide, Logger } from 'types'

export class Bot {
  placeOrderHandler: SignalEventListener<'place_order_event'> = ({ order }) => this.market.placeOrder(order)
  cancelOrderHandler: SignalEventListener<'cancel_order_event'> = ({ id }) => this.market.cancelOrder(id)
  cancelAllOrdersHandler: SignalEventListener<'cancel_all_orders_event'> = () => this.market.cancelAllOrders()
  clearAllPositionHandler: SignalEventListener<'clear_all_position'> = () => this.clearAllPosition()

  protected logger: Logger

  constructor(protected market: Market, protected signal: Signal, logger: Logger) {
    this.logger = logger.create('bot')
  }

  async start() {
    this.signal.on('place_order_event', this.placeOrderHandler)
    this.signal.on('cancel_order_event', this.cancelOrderHandler)
    this.signal.on('cancel_all_orders_event', this.cancelAllOrdersHandler)
    await this.signal.start()
  }

  async stop() {
    await this.signal.stop()
    this.signal.off('place_order_event', this.placeOrderHandler)
    this.signal.off('cancel_order_event', this.cancelOrderHandler)
    this.signal.off('cancel_all_orders_event', this.cancelAllOrdersHandler)
  }

  async clearAllPosition() {
    this.logger.info('clearing all position')

    let isFulfilled = false

    while (!isFulfilled) {
      const [{ base }, bestBid] = await Promise.all([this.market.balance(), this.market.bestBid()])

      if (base === 0) {
        isFulfilled = true
        break
      }

      if (bestBid) {
        await this.market.placeOrder({
          type: OrderType.IOC,
          side: OrderSide.Sell,
          price: bestBid.price,
          size: Math.min(bestBid.size, base),
        })
      } else {
        this.logger.debug('not found best bid')
      }
    }

    const balance = await this.market.balance()

    this.logger.info(`all position cleared, balance.base: ${balance.base}, balance.quote: ${balance.quote}`)

    return isFulfilled
  }
}
