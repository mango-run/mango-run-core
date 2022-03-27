import { EventEmitter } from 'events'
import { Logger, Signal, SignalEvent, SignalEventListener, SignalEventPayload } from '../types'
import { retry } from '../utils'

export interface BaseSignalConfigs {
  interval?: number
}

export abstract class BaseSignal<Config extends BaseSignalConfigs = BaseSignalConfigs> implements Signal {
  eventEmitter = new EventEmitter()

  isRunning = false

  isPaused = false

  logger: Logger

  interval: number

  constructor(public config: Config, logger: Logger) {
    this.interval = config.interval || 5000
    this.logger = logger.create('signal')
  }

  /**
   * @event start emit before first tick started
   * @event stop emit before last tick started
   * @event pause emit before next tick started
   * @event resume emit before next tick started
   */
  on<E extends SignalEvent>(event: E, listener: SignalEventListener<E>) {
    this.eventEmitter.on(event, listener)
  }

  off<E extends SignalEvent>(event: E, listener: SignalEventListener<E>) {
    this.eventEmitter.off(event, listener)
  }

  once<E extends SignalEvent>(event: E, listener: SignalEventListener<E>) {
    this.eventEmitter.once(event, listener)
  }

  emit<E extends SignalEvent>(event: E, payload: SignalEventPayload<E>) {
    this.eventEmitter.emit(event, payload)
  }

  async start() {
    if (this.isRunning) return false
    this.isRunning = true
    await this.init()
    this.emit('start', void 0)
    await this.run()
    return true
  }

  async stop() {
    if (!this.isRunning) return false
    this.isRunning = false
    this.emit('stop', void 0)
    await new Promise<void>(resolve => this.once('stop', resolve))
    return true
  }

  async pause() {
    if (this.isPaused) return false
    this.isPaused = true
    this.emit('pause', void 0)
    await new Promise<void>(resolve => this.once('tick', resolve))
    return true
  }

  async resume() {
    if (!this.isPaused) return false
    this.isPaused = false
    this.emit('resume', void 0)
    await new Promise<void>(resolve => this.once('tick', resolve))
    return true
  }

  async run() {
    if (!this.isPaused) {
      await retry(() => this.tick()).catch(error => {
        this.logger.error('tick failed', error)
      })
      this.emit('tick', void 0)
    }

    if (this.isRunning) {
      setTimeout(() => this.run(), this.interval)
    }
  }

  abstract init(): Promise<boolean>

  abstract tick(): Promise<void>
}
