export enum OrderSide {
  Buy,
  Sell,
}

export enum OrderType {
  Default,
  IOC,
  PostOnly,
}

export interface Order {
  price: number
  size: number
  side: OrderSide
  type?: OrderType
}

export enum ReceiptType {
  Placed,
  Canceled,
}

export interface Receipt {
  id: string
  type: ReceiptType
  order: Order
}

export interface Orderbook {
  asks: [price: number, size: number][]
  bids: [price: number, size: number][]
  ts: number
}

export interface Market {
  receipts(type: ReceiptType): Promise<Receipt[]>
  orderbook(): Promise<Orderbook>
  placeOrder(order: Order): Promise<Receipt>
  cancelOrder(id: string): Promise<Receipt>
}

export interface PlaceOrderEvent {
  order: Order
}

export interface CancelOrderEvent {
  id: string
}

// eslint-disable-next-line
export interface CancelAllOrderEvent {}

type SignalEventMap = {
  place_order_event: PlaceOrderEvent
  cancel_order_event: CancelOrderEvent
  cancel_all_order_event: CancelAllOrderEvent
}

type SignalEventListener<E extends keyof SignalEventMap, P extends SignalEventMap[E]> = (payload: P) => void

export interface Signal {
  on<E extends keyof SignalEventMap, P extends SignalEventMap[E]>(event: E, listener: SignalEventListener<E, P>): void
  off<E extends keyof SignalEventMap, P extends SignalEventMap[E]>(event: E, listener: SignalEventListener<E, P>): void
}

export abstract class Bot {
  constructor(public signal: Signal, public market: Market) {}
  abstract start(): void
  abstract stop(): void
}

// bot -> singal -> market
//     -----------> market
