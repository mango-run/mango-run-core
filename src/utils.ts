import { Callback, LifeCycle, Order, OrderDraft, OrderType } from './types'

export function average(...numbers: number[]) {
  if (numbers.length === 0) return 0
  return numbers.reduce((acc, curr) => acc + curr, 0) / numbers.length
}

export function isBetween(val: number, left: number, right: number, includeMargin = false) {
  if (includeMargin) return val >= left && val <= right
  return val > left && val < right
}

export function orderDraftKey(order: OrderDraft) {
  return [order.side, order.price, order.size, order.type || OrderType.Default].join(':')
}

export function order(v: Order) {
  return v
}

export function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

export async function measureTime(callback: Callback) {
  const start = process.hrtime.bigint()
  try {
    await callback()
  } catch {
    // eat error
  }
  const end = process.hrtime.bigint()
  const nano = Number(end - start)
  return nano * 10 ** -9
}

export async function doInitialize(lifeCycle: LifeCycle) {
  if (!lifeCycle.initialize) return
  await lifeCycle.initialize()
}

export async function doDestroy(lifeCycle: LifeCycle) {
  if (!lifeCycle.destroy) return
  await lifeCycle.destroy()
}

export interface CacheConfig {
  ttl: number
  refreshInterval?: number
}

export class Cache<T> implements LifeCycle {
  data: Promise<T> | null = null

  updatedAt = 0

  isLoading = false

  timer: any

  constructor(private updater: () => Promise<T>, private config: CacheConfig) {
    if (config.refreshInterval) {
      this.timer = setInterval(() => this.get(), config.refreshInterval)
    }
  }

  async destroy() {
    if (this.timer) clearInterval(this.timer)
  }

  async get() {
    // clear data if expired
    if (!this.isLoading && Date.now() - this.updatedAt > this.config.ttl) {
      this.data = null
    }
    // fetch data if required
    if (!this.data) {
      this.isLoading = true
      this.data = this.updater().then(res => {
        this.isLoading = false
        this.updatedAt = Date.now()
        return res
      })
    }
    return await this.data
  }
}

export interface RetryConfig {
  maxAttempt?: number
  retryDelay?: number | ((attempt: number) => number)
  shouldRetry?: (error: unknown) => boolean
}

export async function retry<T>(fn: () => Promise<T>, config: RetryConfig = {}) {
  const { maxAttempt = 3, retryDelay = 1000, shouldRetry = () => true } = config

  for (let i = 0; i < maxAttempt; i++) {
    try {
      const res = await fn()
      return res
    } catch (error) {
      if (i + 1 === maxAttempt) throw error
      if (!shouldRetry(error)) throw error
      const delay = typeof retryDelay === 'number' ? retryDelay : retryDelay(i + 1)
      await sleep(delay)
    }
  }

  throw new Error('reach max retry attempt')
}
