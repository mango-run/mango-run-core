import { OrderDraft, Queue } from '../types'

type Sortor = (a: OrderDraft, b: OrderDraft) => number

export class SortedOrderDraftQueue implements Queue<OrderDraft> {
  private data: OrderDraft[] = []

  constructor(private sortor: Sortor) {}

  push(item: OrderDraft): void {
    this.data.push(item)
    this.data.sort(this.sortor)
  }

  find(predicate: (item: OrderDraft) => boolean): OrderDraft | undefined {
    return this.data.find(predicate)
  }

  findIndex(predicate: (item: OrderDraft) => boolean): number {
    return this.data.findIndex(predicate)
  }

  remove(index: number): boolean {
    return this.data.splice(index, 1).length === 1
  }

  removeMatched(predicate: (item: OrderDraft) => boolean): void {
    this.data = this.data.filter(item => !predicate(item))
  }

  head(): OrderDraft | undefined
  head(count: number): OrderDraft[]
  head(count?: number): OrderDraft | OrderDraft[] | undefined {
    if (!count) return this.data[0]
    return this.data.slice(0, count)
  }

  size(): number {
    return this.data.length
  }
}
