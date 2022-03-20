import { Market } from '../types'

export class MockMarket implements Market {
  balance = jest.fn()
  bestAsk = jest.fn()
  bestBid = jest.fn()
  orderbook = jest.fn()
  receipts = jest.fn()
  placeOrder = jest.fn()
  cancelOrder = jest.fn()
  cancelAllOrders = jest.fn()
  closeAllPosition = jest.fn()
}
