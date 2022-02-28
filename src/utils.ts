import { Callback, Order, OrderDraft, OrderType } from 'types'

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
