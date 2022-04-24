import { EventEmitter } from 'events'
import { Signal, Market, SignalEventListener, Logger, Callback } from './types'
import { doDestroy, doInitialize, measureTime } from './utils'

export interface CallbackWithDetail {
  name: string
  callback: Callback
}

export type BotEventMap = {
  status: { message: string }
}

export type BotEvent = keyof BotEventMap

export type BotEventPayload<E extends BotEvent> = BotEventMap[E]

export type BotEventListener<E extends BotEvent> = (payload: BotEventPayload<E>) => void

export class Bot {
  eventEmitter = new EventEmitter()

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
    this.blockSignal(() => this.market.closeAllPosition(), 'clear all position')
  }

  protected logger: Logger

  constructor(protected market: Market, protected signal: Signal, logger: Logger) {
    this.logger = logger.create('bot')
  }

  blockSignal(callback: Callback, name = 'unknown') {
    this.eventEmitter.emit('status', { message: 'running | blockSignal' })
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
    this.eventEmitter.emit('status', { message: 'running | resolveBlockSignalCallbacks' })
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
    this.eventEmitter.emit('status', { message: 'starting | wait for market and signal to init' })
    await Promise.all([
      measureTime(() => doInitialize(this.market)).then(dt => this.logger.info('market initialized', `take ${dt}s`)),
      measureTime(() => doInitialize(this.signal)).then(dt => this.logger.info('signal initialized', `take ${dt}s`)),
    ])
    // @todo it should be optional
    // await measureTime(() => this.clearAllPosition()).then(dt => this.logger.info('clear all position', `take ${dt}s`))
    this.signal.on('place_order_event', this.placeOrderHandler)
    this.signal.on('cancel_order_event', this.cancelOrderHandler)
    this.signal.on('cancel_all_orders_event', this.cancelAllOrdersHandler)
    this.signal.on('clear_all_position', this.clearAllPositionHandler)

    this.eventEmitter.emit('status', { message: 'starting | wait for signal to start' })
    await this.signal.start()
    this.eventEmitter.emit('status', { message: 'started' })
  }

  async stop() {
    this.eventEmitter.emit('status', { message: 'stopping | wait for signal to stop' })
    await this.signal.stop()
    this.signal.off('place_order_event', this.placeOrderHandler)
    this.signal.off('cancel_order_event', this.cancelOrderHandler)
    this.signal.off('cancel_all_orders_event', this.cancelAllOrdersHandler)
    this.signal.off('clear_all_position', this.clearAllPositionHandler)
    // @todo it should be optional
    // await measureTime(() => this.clearAllPosition()).then(dt => this.logger.info('clear all position', `take ${dt}s`))
    this.eventEmitter.emit('status', { message: 'stopping | wait for market and signal to destroy' })
    await Promise.all([
      measureTime(() => doDestroy(this.market)).then(dt => this.logger.info('market destroyed', `take ${dt}s`)),
      measureTime(() => doDestroy(this.signal)).then(dt => this.logger.info('signal destroyed', `take ${dt}s`)),
    ])
    this.eventEmitter.emit('status', { message: 'stopped' })
  }

  on<E extends BotEvent>(event: E, listener: BotEventListener<E>): void {
    this.eventEmitter.on(event, listener)
  }

  off<E extends BotEvent>(event: E, listener: BotEventListener<E>): void {
    this.eventEmitter.off(event, listener)
  }

  once<E extends BotEvent>(event: E, listener: BotEventListener<E>): void {
    this.eventEmitter.once(event, listener)
  }

  emit<E extends BotEvent>(event: E, payload: BotEventListener<E>) {
    this.eventEmitter.emit(event, payload)
  }
}
