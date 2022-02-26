import { Market } from 'types'

export class MockMarket implements Market {
  bestAsk = jest.fn()
  bestBid = jest.fn()
  orderbook = jest.fn()
  receipts = jest.fn()
  placeOrder = jest.fn()
  cancelOrder = jest.fn()
  cancelAllOrders = jest.fn()
}
