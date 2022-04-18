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
  getPrice = jest.fn()
  getCollateralValue = jest.fn()
  on = jest.fn()
  off = jest.fn()
  once = jest.fn()
}
