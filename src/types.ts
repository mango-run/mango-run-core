export enum OrderSide {
  Buy,
  Sell,
}

export enum OrderType {
  Default,
  IOC,
  PostOnly,
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

export enum ReceiptType {
  Placed,
  Canceled,
}

export interface Receipt {
  id: string
  type: ReceiptType
  order: OrderDraft
}

export interface Orderbook {
  asks: Order[]
  bids: Order[]
  ts: number
}

export interface Market {
  bestAsk(): Promise<Order | undefined>
  bestBid(): Promise<Order | undefined>
  orderbook(depth: number): Promise<Orderbook>
  receipts(type: ReceiptType): Promise<Receipt[]>
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
  start: void
  stop: void
}

export type SignalEvent = keyof SignalEventMap

export type SignalEventPayload<E extends SignalEvent> = SignalEventMap[E]

export type SignalEventListener<E extends SignalEvent> = (payload: SignalEventPayload<E>) => void

export interface Signal {
  on<E extends SignalEvent>(event: E, listener: SignalEventListener<E>): void
  off<E extends SignalEvent>(event: E, listener: SignalEventListener<E>): void
  // return a promise which resolved once first tick done
  start(): Promise<void>
  // return a promise which resolved once last tick done
  stop(): Promise<void>
}

// bot -> singal -> market
//     -----------> market

export interface Logger {
  debug(...msg: string[]): void
  info(...msg: string[]): void
  warn(...msg: string[]): void
  error(...msg: string[]): void
}
