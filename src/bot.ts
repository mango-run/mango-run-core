import { Signal, Market, SignalEventListener } from 'types'

export class Bot {
  placeOrderHandler: SignalEventListener<'place_order_event'> = ({ order }) => this.market.placeOrder(order)
  cancelOrderHandler: SignalEventListener<'cancel_order_event'> = ({ id }) => this.market.cancelOrder(id)
  cancelAllOrdersHandler: SignalEventListener<'cancel_all_orders_event'> = () => this.market.cancelAllOrders()

  constructor(protected market: Market, protected signal: Signal) {}

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
}
