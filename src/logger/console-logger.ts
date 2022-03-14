import { Logger } from '../types'

export interface ConsoleLoggerConfigs {
  newline?: number
}

export class ConsoleLogger implements Logger {
  constructor(public namespace: string = '', public config: ConsoleLoggerConfigs = {}) {}

  create(namespace: string): Logger {
    return new ConsoleLogger([this.namespace, namespace].filter(Boolean).join('/'), this.config)
  }

  debug(...msg: string[]): void {
    const logs = [...msg]
    if (this.namespace) logs.unshift(`[${this.namespace}]`)
    console.log(`[${new Date().toLocaleString()}]`, '[debug]', ...logs)
    if (this.config.newline) console.log(new Array(Math.max(0, this.config.newline - 1)).fill('\n').join(''))
  }

  info(...msg: string[]): void {
    const logs = [...msg]
    if (this.namespace) logs.unshift(`[${this.namespace}]`)
    console.log(`[${new Date().toLocaleString()}]`, '[info]', ...logs)
    if (this.config.newline) console.log(new Array(Math.max(0, this.config.newline - 1)).fill('\n').join(''))
  }

  warn(...msg: string[]): void {
    const logs = [...msg]
    if (this.namespace) logs.unshift(`[${this.namespace}]`)
    console.warn(`[${new Date().toLocaleString()}]`, '[warn]', ...logs)
    if (this.config.newline) console.log(new Array(Math.max(0, this.config.newline - 1)).fill('\n').join(''))
  }

  error(...msg: string[]): void {
    const logs = [...msg]
    if (this.namespace) logs.unshift(`[${this.namespace}]`)
    console.error(`[${new Date().toLocaleString()}]`, '[error]', ...logs)
    if (this.config.newline) console.log(new Array(Math.max(0, this.config.newline - 1)).fill('\n').join(''))
  }
}
