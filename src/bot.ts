import { Signal, Market, SignalEventListener, OrderType, OrderSide, Logger, Callback } from './types'
import { doDestroy, doInitialize, measureTime } from './utils'

interface CallbackWithDetail {
  name: string
  callback: Callback
}

export class Bot {
  blockCallbacks: CallbackWithDetail[] = []

  placeOrderHandler: SignalEventListener<'place_order_event'> = ({ order }) => {
    this.blockSignal(() => this.market.placeOrder(order), 'place order')
  }

  cancelOrderHandler: SignalEventListener<'cancel_order_event'> = ({ id }) => {
    this.blockSignal(() => this.market.cancelOrder(id), 'cancel order')
  }

  cancelAllOrdersHandler: SignalEventListener<'cancel_all_orders_event'> = () => {
    this.blockSignal(() => this.market.cancelAllOrders(), 'cancel all orders')
  }

  clearAllPositionHandler: SignalEventListener<'clear_all_position'> = () => {
    this.blockSignal(() => this.clearAllPosition(), 'clear all position')
  }

  protected logger: Logger

  constructor(protected market: Market, protected signal: Signal, logger: Logger) {
    this.logger = logger.create('bot')
  }

  blockSignal(callback: Callback, name = 'unknown') {
    this.blockCallbacks.push({ callback, name })

    if (this.signal.isPaused) return

    this.logger.debug('pause signal for block signal callbacks')

    this.signal.pause().then(isPaused => {
      if (isPaused) {
        this.resolveBlockSignalCallbacks()
      } else {
        this.logger.debug('pause failed, signal is keep running')
      }
    })
  }

  async resolveBlockSignalCallbacks() {
    this.logger.debug('start to resolve block signal callbacks')

    const callbacks = [...this.blockCallbacks]
    this.blockCallbacks = []

    const promises = callbacks.map(async ({ name, callback }) => {
      const dt = await measureTime(async () => {
        try {
          await callback()
        } catch (error) {
          this.logger.error(`block signal callback: ${name} failed`, error)
        }
      })
      this.logger.debug(`block signal callback: ${name} take ${dt}s`)
    })

    const dt = await measureTime(() => Promise.all(promises))

    this.logger.debug(`block signal callbacks resolved, take ${dt}s`)

    this.logger.debug('resume signal after block signal callbacks resolved')

    if (this.signal.isPaused) await this.signal.resume()
  }

  async start() {
    await Promise.all([
      measureTime(() => doInitialize(this.market)).then(dt => this.logger.info('market initialized', `take ${dt}s`)),
      measureTime(() => doInitialize(this.signal)).then(dt => this.logger.info('signal initialized', `take ${dt}s`)),
    ])
    await measureTime(() => this.clearAllPosition()).then(dt => this.logger.info('clear all position', `take ${dt}s`))
    this.signal.on('place_order_event', this.placeOrderHandler)
    this.signal.on('cancel_order_event', this.cancelOrderHandler)
    this.signal.on('cancel_all_orders_event', this.cancelAllOrdersHandler)
    this.signal.on('clear_all_position', this.clearAllPositionHandler)
    await this.signal.start()
  }

  async stop() {
    await this.signal.stop()
    this.signal.off('place_order_event', this.placeOrderHandler)
    this.signal.off('cancel_order_event', this.cancelOrderHandler)
    this.signal.off('cancel_all_orders_event', this.cancelAllOrdersHandler)
    this.signal.off('clear_all_position', this.clearAllPositionHandler)
    await measureTime(() => this.clearAllPosition()).then(dt => this.logger.info('clear all position', `take ${dt}s`))
    await Promise.all([
      measureTime(() => doDestroy(this.market)).then(dt => this.logger.info('market destroyed', `take ${dt}s`)),
      measureTime(() => doDestroy(this.signal)).then(dt => this.logger.info('signal destroyed', `take ${dt}s`)),
    ])
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
