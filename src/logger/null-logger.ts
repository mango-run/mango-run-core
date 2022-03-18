import { Logger } from '../types'

export class NullLogger implements Logger {
  create(): Logger {
    return this
  }

  debug(): void {
    return
  }

  info(): void {
    return
  }

  warn(): void {
    return
  }

  error(): void {
    return
  }
}
