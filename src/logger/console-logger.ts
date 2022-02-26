import { Logger } from 'types'

export class ConsoleLogger implements Logger {
  debug(...msg: string[]): void {
    console.log(...msg)
  }

  info(...msg: string[]): void {
    console.log(...msg)
  }

  warn(...msg: string[]): void {
    console.warn(...msg)
  }

  error(...msg: string[]): void {
    console.error(...msg)
  }
}
