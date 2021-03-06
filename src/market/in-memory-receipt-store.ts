import { Receipt, ReceiptStatus, ReceiptStore, Logger } from '../types'

export class InMemoryReceiptStore implements ReceiptStore {
  byStatus: Record<ReceiptStatus, Receipt[]> = {
    [ReceiptStatus.PlacePending]: [],
    [ReceiptStatus.CancelPending]: [],
    [ReceiptStatus.Placed]: [],
    [ReceiptStatus.Canceled]: [],
    [ReceiptStatus.Fulfilled]: [],
    [ReceiptStatus.Error]: [],
  }

  byId: Record<string, Receipt | undefined> = {}

  byOrderId: Record<string, Receipt | undefined> = {}

  logger: Logger

  private nextId = 0

  constructor(logger: Logger) {
    this.logger = logger.create('receipt-store')
  }

  generateId(): string {
    return `${this.nextId++}`
  }

  get(id: string): Receipt | null
  get(...status: ReceiptStatus[]): Receipt[]
  get(idOrStatus: ReceiptStatus | string, ...rest: ReceiptStatus[]) {
    if (typeof idOrStatus === 'string') return this.byId[idOrStatus] || null
    return [idOrStatus, ...rest].reduce<Receipt[]>((acc, status) => [...acc, ...this.byStatus[status]], [])
  }

  getByOrderId(orderId: string): Receipt | null {
    return this.byOrderId[orderId] || null
  }

  add(draft: Omit<Receipt, 'id'>, id = this.generateId()): Receipt {
    if (parseFloat(id) >= this.nextId) this.nextId = parseFloat(id) + 1
    const receipt = { ...draft, id } as Receipt
    this.byId[receipt.id] = receipt
    this.byStatus[receipt.status].push(receipt)
    if (receipt.status === ReceiptStatus.Placed) this.byOrderId[receipt.orderId] = receipt
    return receipt
  }

  remove(id: string): boolean {
    const receipt = this.get(id)
    if (!receipt) {
      this.logger.error('remove failed', 'not found receipt', id)
      return false
    }
    delete this.byId[id]
    const index = this.byStatus[receipt.status].findIndex(r => r.id === id)
    this.byStatus[receipt.status].splice(index, 1)
    return true
  }

  onPlaced(id: string, orderId: string): boolean {
    const receipt = this.get(id)
    if (!receipt) {
      this.logger.error('onPlaced failed', 'not found receipt', id)
      return false
    }
    if (receipt.status !== ReceiptStatus.PlacePending) {
      this.logger.error('onPlaced failed', 'receipt status is', receipt.status)
      return false
    }
    return this.update({ ...receipt, status: ReceiptStatus.Placed, orderId })
  }

  onCanceled(id: string): boolean {
    const receipt = this.get(id)
    if (!receipt) {
      this.logger.error('onCanceled failed', 'not found receipt', id)
      return false
    }
    if (receipt.status !== ReceiptStatus.CancelPending) {
      this.logger.error('onCanceled failed', 'receipt status is', receipt.status)
      return false
    }
    return this.update({ ...receipt, status: ReceiptStatus.Canceled })
  }

  onFulfilled(id: string): boolean {
    const receipt = this.get(id)
    if (!receipt) {
      this.logger.error('onFulfilled failed', 'not found receipt', id)
      return false
    }
    if (receipt.status !== ReceiptStatus.Placed) {
      this.logger.error('onFulfilled failed', 'receipt status is', receipt.status)
      return false
    }
    return this.update({ ...receipt, status: ReceiptStatus.Fulfilled })
  }

  onError(id: string, error: any): boolean {
    const receipt = this.get(id)
    if (!receipt) {
      this.logger.error('onError failed', 'not found receipt', id)
      return false
    }
    return this.update({ ...receipt, status: ReceiptStatus.Error, error })
  }

  update(draft: Receipt) {
    const receipt = this.get(draft.id)
    if (!receipt) {
      this.logger.error('update failed', 'not found receipt', draft.id)
      return false
    }
    if (!this.remove(draft.id)) {
      this.logger.error('update failed', 'remove failed', draft.id)
      return false
    }
    return !!this.add(draft, draft.id)
  }
}
