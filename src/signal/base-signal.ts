import { EventEmitter } from 'events'
import { ConsoleLogger } from 'logger/console-logger'
import { Logger, Signal, SignalEvent, SignalEventListener, SignalEventPayload } from 'types'

export interface BaseSignalConfigs {
  interval?: number
  logger?: Logger
}

export abstract class BaseSignal<Config extends BaseSignalConfigs = BaseSignalConfigs> implements Signal {
  eventEmitter = new EventEmitter()

  isRunning = false

  logger: Logger

  interval: number

  constructor(public config: Config) {
    this.interval = config.interval || 1000
    this.logger = config.logger || new ConsoleLogger()
  }

  /**
   * @event start emit before first tick started
   * @event stop emit after last tick ended
   */
  on<E extends SignalEvent>(event: E, listener: SignalEventListener<E>) {
    this.eventEmitter.on(event, listener)
  }

  off<E extends SignalEvent>(event: E, listener: SignalEventListener<E>) {
    this.eventEmitter.off(event, listener)
  }

  emit<E extends SignalEvent>(event: E, payload: SignalEventPayload<E>) {
    this.eventEmitter.emit(event, payload)
  }

  async start() {
    this.isRunning = true
    this.emit('start', void 0)
    await this.run()
  }

  async stop() {
    this.isRunning = false
    return new Promise<void>(resolve => this.on('stop', resolve))
  }

  async run() {
    await this.tick()

    if (this.isRunning) {
      setTimeout(() => this.run(), this.interval)
    } else {
      this.emit('stop', void 0)
    }
  }

  abstract tick(): Promise<void>
}
