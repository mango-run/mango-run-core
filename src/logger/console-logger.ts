import { Logger } from 'types'

export class ConsoleLogger implements Logger {
  constructor(public namespace: string = '') {}

  create(namespace: string): Logger {
    return new ConsoleLogger([this.namespace, namespace].filter(Boolean).join('/'))
  }

  debug(...msg: string[]): void {
    const logs = [...msg]
    if (this.namespace) logs.unshift(`[${this.namespace}]`)
    console.log(...logs)
  }

  info(...msg: string[]): void {
    const logs = [...msg]
    if (this.namespace) logs.unshift(`[${this.namespace}]`)
    console.log(...logs)
  }

  warn(...msg: string[]): void {
    const logs = [...msg]
    if (this.namespace) logs.unshift(`[${this.namespace}]`)
    console.warn(...logs)
  }

  error(...msg: string[]): void {
    const logs = [...msg]
    if (this.namespace) logs.unshift(`[${this.namespace}]`)
    console.error(...logs)
  }
}
