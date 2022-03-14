export type Callback<T = unknown> = () => T | Promise<T>

export enum OrderSide {
  Buy,
  Sell,
}

export enum OrderType {
  Default = 'limit',
  IOC = 'ioc',
  PostOnly = 'postOnly',
}

export interface OrderDraft {
  price: number
  size: number
  side: OrderSide
  type?: OrderType
}

export interface Order {
  price: number
  size: number
}

export enum ReceiptStatus {
  // order placed but still not on chain
  PlacePending,
  // order canceled but still not on chain
  CancelPending,
  // order has been on chain
  Placed,
  Canceled,
  Fulfilled,
  Error,
}

export type Receipt = {
  id: string
  order: OrderDraft
  txHash?: string
} & (
  | {
      status: ReceiptStatus.PlacePending
    }
  | {
      status: ReceiptStatus.Error
      error: any
    }
  | {
      status: ReceiptStatus
      orderId: string
    }
)

export interface Orderbook {
  asks: Order[]
  bids: Order[]
  ts: number
}

export interface Balance {
  base: number
  quote: number
}

export interface Market extends LifeCycle {
  balance(): Promise<Balance>
  bestAsk(): Promise<Order | undefined>
  bestBid(): Promise<Order | undefined>
  orderbook(depth: number): Promise<Orderbook>
  receipts(...status: ReceiptStatus[]): Receipt[]
  placeOrder(order: OrderDraft): Promise<Receipt>
  cancelOrder(id: string): Promise<Receipt>
  cancelAllOrders(): Promise<Receipt[]>
}

export interface PlaceOrderEvent {
  order: OrderDraft
}

export interface CancelOrderEvent {
  id: string
}

type SignalEventMap = {
  place_order_event: PlaceOrderEvent
  cancel_order_event: CancelOrderEvent
  cancel_all_orders_event: void
  clear_all_position: void
  start: void
  stop: void
  pause: void
  resume: void
  tick: void
}

export type SignalEvent = keyof SignalEventMap

export type SignalEventPayload<E extends SignalEvent> = SignalEventMap[E]

export type SignalEventListener<E extends SignalEvent> = (payload: SignalEventPayload<E>) => void

export interface Signal extends LifeCycle {
  readonly isRunning: boolean
  readonly isPaused: boolean
  on<E extends SignalEvent>(event: E, listener: SignalEventListener<E>): void
  off<E extends SignalEvent>(event: E, listener: SignalEventListener<E>): void
  once<E extends SignalEvent>(event: E, listener: SignalEventListener<E>): void
  // return a promise which resolved once first tick done
  start(): Promise<boolean>
  // return a promise which resolved once last tick done
  stop(): Promise<boolean>
  // return a promise which resolved once current tick done
  pause(): Promise<boolean>
  // return a promise which resolved once next tick done
  resume(): Promise<boolean>
}

// bot -> singal -> market
//     -----------> market

export interface Logger {
  create(namespace: string): Logger
  debug(...msg: unknown[]): void
  info(...msg: unknown[]): void
  warn(...msg: unknown[]): void
  error(...msg: unknown[]): void
}

export interface LifeCycle {
  initialize?(): Promise<void>
  destroy?(): Promise<void>
}

export interface IReceiptStore {
  get(id: string): Receipt | null
  get(...status: ReceiptStatus[]): Receipt[]
  getByOrderId(orderId: string): Receipt | null
  add(receipt: Omit<Receipt, 'uuid'>): Receipt
  remove(id: string): boolean
  onPlaced(id: string, orderId: string): boolean
  onCanceled(id: string): boolean
  onFulfilled(id: string): boolean
  onError(id: string, error: any): boolean
}
