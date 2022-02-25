import { EventEmitter } from 'events'
import { Signal, SignalEvent, SignalEventListener, SignalEventPayload, Market } from 'types'

export interface GridSignalConfigs {
  martket: Market
  interval?: number
}

export class GridSignal implements Signal {
  eventEmitter = new EventEmitter()

  config: Required<GridSignalConfigs>

  isRunning = false

  constructor(config: GridSignalConfigs) {
    this.config = {
      ...config,
      interval: config.interval || 1000,
    }
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
    await this.tick()
  }

  async stop() {
    this.isRunning = false
    return new Promise<void>(resolve => this.on('stop', resolve))
  }

  async tick() {
    // @todo implement signal logic

    if (this.isRunning) {
      setTimeout(() => this.tick(), this.config.interval)
    } else {
      this.emit('stop', void 0)
    }
  }
}
