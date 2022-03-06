import { NullLogger } from '../../logger/null-logger'
import { MockMarket } from '../../market/mock-market'
import { order } from '../../utils'
import { NaiveGridSignal } from './naive-grid-signal'

describe('grid-signal', () => {
  let market = new MockMarket()

  beforeEach(() => {
    market = new MockMarket()
  })

  describe('triggers', () => {
    it('should not start when price higher than start price', async () => {
      const signal = new NaiveGridSignal(
        {
          market,
          priceLowerCap: 10,
          priceUpperCap: 20,
          gridCount: 10,
          orderSize: 1,
          startPrice: 15,
        },
        new NullLogger(),
      )

      expect(signal.hasStarted).toBe(false)

      market.bestAsk.mockResolvedValueOnce(order({ price: 17, size: 1 }))
      market.bestBid.mockResolvedValueOnce(order({ price: 16, size: 1 }))

      await signal.tick()

      expect(signal.hasStarted).toBe(false)
    })

    it('should start when price less or equal to start price', async () => {
      const signal = new NaiveGridSignal(
        {
          market,
          priceLowerCap: 10,
          priceUpperCap: 20,
          gridCount: 10,
          orderSize: 1,
          startPrice: 15,
        },
        new NullLogger(),
      )

      expect(signal.hasStarted).toBe(false)

      market.bestAsk.mockResolvedValueOnce(order({ price: 15.5, size: 1 }))
      market.bestBid.mockResolvedValueOnce(order({ price: 14.5, size: 1 }))
      market.receipts.mockResolvedValueOnce([])

      await signal.tick()

      expect(signal.hasStarted).toBe(true)
    })

    it('should cancel all orders when price less or equal to stop loss price', async () => {
      const signal = new NaiveGridSignal(
        {
          market,
          priceLowerCap: 10,
          priceUpperCap: 20,
          gridCount: 10,
          orderSize: 1,
          stopLossPrice: 5,
        },
        new NullLogger(),
      )

      expect(signal.hasStarted).toBe(false)

      const onCancelAllOrders = jest.fn()
      const onClearAllPosition = jest.fn()
      signal.on('cancel_all_orders_event', onCancelAllOrders)
      signal.on('clear_all_position', onClearAllPosition)
      market.bestAsk.mockResolvedValueOnce(order({ price: 5.5, size: 1 }))
      market.bestBid.mockResolvedValueOnce(order({ price: 4.5, size: 1 }))

      await signal.tick()

      expect(signal.hasStarted).toBe(true)
      expect(onCancelAllOrders).toBeCalledTimes(1)
      expect(onClearAllPosition).toBeCalledTimes(1)
    })

    it('should cancel all orders when price higher or equal to take profit price', async () => {
      const signal = new NaiveGridSignal(
        {
          market,
          priceLowerCap: 10,
          priceUpperCap: 20,
          gridCount: 10,
          orderSize: 1,
          takeProfitPrice: 25,
        },
        new NullLogger(),
      )

      expect(signal.hasStarted).toBe(false)

      const onCancelAllOrders = jest.fn()
      const onClearAllPosition = jest.fn()
      signal.on('cancel_all_orders_event', onCancelAllOrders)
      signal.on('clear_all_position', onClearAllPosition)
      market.bestAsk.mockResolvedValueOnce(order({ price: 25.5, size: 1 }))
      market.bestBid.mockResolvedValueOnce(order({ price: 24.5, size: 1 }))

      await signal.tick()

      expect(signal.hasStarted).toBe(true)
      expect(onCancelAllOrders).toBeCalledTimes(1)
      expect(onClearAllPosition).toBeCalledTimes(1)
    })
  })
})
