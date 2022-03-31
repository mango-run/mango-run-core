import {
  MangoAccount,
  MangoCache,
  MangoClient,
  MangoGroup,
  MarketConfig,
  nativeI80F48ToUi,
  PerpMarket,
  QUOTE_INDEX,
  TimeoutError,
} from '@blockworks-foundation/mango-client'
import BN from 'bn.js'
import { Account, Connection, Keypair } from '@solana/web3.js'

import {
  Balance,
  Logger,
  Market,
  Order,
  Orderbook,
  OrderDraft,
  OrderSide,
  Receipt,
  ReceiptStatus,
  ReceiptStore,
} from '../../types'
import { Cache, retry, sleep } from '../../utils'
import { InMemoryReceiptStore } from '../in-memory-receipt-store'

export interface MangoPerpMarketConfigs {
  keypair: Keypair
  connection: Connection
  mangoAccount: MangoAccount
  mangoCache: MangoCache
  mangoClient: MangoClient
  mangoGroup: MangoGroup
  marketConfig: MarketConfig
  perpMarket: PerpMarket
  receiptStore?: ReceiptStore
}

export class MangoPerpMarket implements Market {
  private owner: Account

  private connection: Connection
  private mangoAccount: MangoAccount
  private mangoClient: MangoClient
  private mangoGroup: MangoGroup
  private mangoCache: MangoCache
  private marketConfig: MarketConfig
  private perpMarket: PerpMarket
  private receiptStore: ReceiptStore

  private hasInitialized = false
  /**
   * determine underlying process is keeping alive or not
   */
  private keepAlive = false

  fillEvents = new Cache(
    async () => {
      const publicKey = this.mangoAccount.publicKey

      const events = await retry(() => this.perpMarket.loadFills(this.connection)).catch(error => {
        this.logger.error('update fill events failed', error)
        return []
      })

      return events.filter(e => e.maker.equals(publicKey) && !!this.receiptStore.get(e.makerClientOrderId.toString()))
    },
    { ttl: 1000 },
  )

  constructor(configs: MangoPerpMarketConfigs, private logger: Logger) {
    this.logger = logger.create('market')
    this.owner = new Account(configs.keypair.secretKey)
    this.connection = configs.connection
    this.mangoAccount = configs.mangoAccount
    this.mangoClient = configs.mangoClient
    this.mangoGroup = configs.mangoGroup
    this.mangoCache = configs.mangoCache
    this.marketConfig = configs.marketConfig
    this.perpMarket = configs.perpMarket
    this.receiptStore = configs.receiptStore || new InMemoryReceiptStore(logger)
  }

  async initialize() {
    if (this.hasInitialized) return
    this.hasInitialized = true
    this.keepAlive = true

    await this.syncReceiptsFromChain()
  }

  async destroy() {
    this.hasInitialized = false
    this.keepAlive = false
    await this.fillEvents.destroy()
  }

  async balance(): Promise<Balance> {
    const perpAccount = this.mangoAccount.perpAccounts[this.marketConfig.marketIndex]
    // in base token
    const base = this.perpMarket.baseLotsToNumber(perpAccount.basePosition)
    // perp market use `collateral available` as quote balance
    const quote = nativeI80F48ToUi(
      this.mangoAccount.getHealth(this.mangoGroup, this.mangoCache, 'Init'),
      this.mangoGroup.tokens[QUOTE_INDEX].decimals,
    ).toNumber()
    return { base, quote }
  }

  async bestAsk(): Promise<Order | undefined> {
    const ask = (await this.perpMarket.loadAsks(this.connection)).getBest()
    if (!ask) {
      return undefined
    }

    return {
      price: ask.price,
      size: ask.size,
    }
  }

  async bestBid(): Promise<Order | undefined> {
    const bid = (await this.perpMarket.loadBids(this.connection)).getBest()
    if (!bid) {
      return undefined
    }

    return {
      price: bid.price,
      size: bid.size,
    }
  }

  async orderbook(depth: number): Promise<Orderbook> {
    const [_asks, _bids] = await Promise.all([
      this.perpMarket.loadAsks(this.connection),
      this.perpMarket.loadBids(this.connection),
    ])

    const asks: Order[] = _asks.getL2(depth).map(([price, size]) => {
      return {
        price,
        size,
      }
    })
    const bids: Order[] = _bids.getL2(depth).map(([price, size]) => {
      return {
        price,
        size,
      }
    })
    const ts = Date.now()

    return {
      asks,
      bids,
      ts,
    }
  }

  receipts(...status: ReceiptStatus[]): Receipt[] {
    return this.receiptStore.get(...status)
  }

  async placeOrder(order: OrderDraft): Promise<Receipt> {
    const clientOrderId = this.receiptStore.generateId()

    const txHash = await retry(async () => {
      try {
        return await this.mangoClient.placePerpOrder(
          this.mangoGroup,
          this.mangoAccount,
          this.mangoGroup.mangoCache,
          this.perpMarket,
          this.owner,
          order.side === OrderSide.Buy ? 'buy' : 'sell',
          order.price,
          order.size,
          order.type || 'postOnly',
          parseInt(clientOrderId, 10), //client id
        )
      } catch (error) {
        this.logger.debug('place order error', JSON.stringify(order), error)

        if (error instanceof TimeoutError) {
          // it may still possible sent successfully
          return error.txid
        }

        throw error
      }
    })

    const receipt = this.receiptStore.add({ order, txHash, status: ReceiptStatus.PlacePending }, clientOrderId)

    this.waitForPlaced(receipt).then(success => {
      if (success) {
        this.logger.debug('receipt placed, waiting for fulfilled', JSON.stringify(receipt))
        this.waitForFulfilled(receipt)
      } else {
        this.logger.debug('receipt not placed, remove it', JSON.stringify(receipt))
        this.receiptStore.remove(receipt.id)
      }
    })

    return receipt
  }

  async cancelOrder(id: string): Promise<Receipt> {
    const receipt = this.receiptStore.get(id)

    if (!receipt) throw new Error(`cancel order failed, not found receipt (${id})`)

    /**
     * @todo handle canceling pending orders
     */
    // if (receipt?.status === ReceiptStatus.PlacePending) {
    //   await this.waitForPlaced(receipt)
    //   receipt = this.receiptStore.get(id)
    // }

    if (receipt.status !== ReceiptStatus.Placed) {
      // throw new Error(`cancel order failed, receipt (${id}) has invalid status: ${receipt.status}`)
      return receipt
    }

    const placedReceipt = receipt

    this.receiptStore.remove(id)

    const txHash = await retry(async () => {
      try {
        return await this.mangoClient.cancelPerpOrder(
          this.mangoGroup,
          this.mangoAccount,
          this.owner,
          this.perpMarket,
          // cancel instruction needs only orderId
          // mock perp order to prevent loading perp order
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          { orderId: new BN(placedReceipt.orderId) } as any,
        )
      } catch (error) {
        this.logger.debug('cancel order error', JSON.stringify(receipt), error)

        if (error instanceof TimeoutError) {
          // it may still possible sent successfully
          return error.txid
        }

        throw error
      }
    })

    const cancelReceipt = this.receiptStore.add({ ...placedReceipt, status: ReceiptStatus.CancelPending, txHash })

    this.waitForCanceled(cancelReceipt).then(canceled => {
      if (canceled) {
        this.logger.debug('receipt canceled', JSON.stringify(cancelReceipt))
        this.receiptStore.onCanceled(cancelReceipt.id)
      } else {
        this.logger.debug(
          'receipt not canceled, restore placed receipt and remove cancel receipt',
          JSON.stringify(placedReceipt),
          JSON.stringify(cancelReceipt),
        )
        this.receiptStore.add(placedReceipt, placedReceipt.id)
        this.receiptStore.remove(cancelReceipt.id)
      }
    })

    return cancelReceipt
  }

  async cancelAllOrders(): Promise<Receipt[]> {
    const pendings = this.receiptStore.get(ReceiptStatus.PlacePending)

    if (pendings.length > 0) {
      await Promise.all(pendings.map(r => this.waitForPlaced(r)))
    }

    let orders = await this.perpMarket.loadOrdersForAccount(this.connection, this.mangoAccount)

    const receipts: Receipt[] = []

    while (orders.length > 0) {
      const txs = await this.mangoClient.cancelAllPerpOrders(
        this.mangoGroup,
        [this.perpMarket],
        this.mangoAccount,
        this.owner,
      )

      await Promise.all(txs.map(tx => this.connection.confirmTransaction(tx, 'confirmed')))

      const currentOrders = await this.perpMarket.loadOrdersForAccount(this.connection, this.mangoAccount)

      const currentOrderIds: Record<string, boolean> = {}

      for (const { orderId } of currentOrders) currentOrderIds[orderId.toString()] = true

      for (const { orderId } of orders) {
        if (currentOrderIds[orderId.toString()]) continue
        const receipt = this.receiptStore.getByOrderId(orderId.toString())
        if (!receipt) continue
        this.receiptStore.onCanceled(receipt.id)
        receipts.push(receipt)
      }

      orders = currentOrders
    }

    return receipts
  }

  async waitForPlaced(receipt: Receipt) {
    if (receipt.status !== ReceiptStatus.PlacePending) return false

    const txHash = receipt.txHash

    this.logger.debug('waiting for order placed', JSON.stringify(receipt))

    try {
      await retry(() => this.connection.confirmTransaction(txHash, 'confirmed'), {
        maxAttempt: 5,
        retryDelay: attempt => attempt * 100,
      })
    } catch (error) {
      this.logger.error('fail to confirm tx', JSON.stringify(receipt), error)
      return false
    }

    this.logger.debug('waiting for order placed, tx confirmed', JSON.stringify(receipt))

    this.logger.debug('waiting for order placed, getting tx log', JSON.stringify(receipt))

    const log = await retry(
      async () => {
        const tx = await this.connection.getTransaction(txHash)
        if (!tx) throw new Error(`not found transaction: ${txHash}`)
        if (!tx.meta) throw new Error(`not found transaction meta: ${txHash}`)
        if (!tx.meta.logMessages) throw new Error(`not found transaction meta log messages: ${txHash}`)
        return tx.meta.logMessages.join(',')
      },
      { maxAttempt: 10, retryDelay: attempt => Math.pow(2, attempt) * 100 },
    ).catch(error => this.logger.error('get tx log failed', JSON.stringify(receipt), error))

    if (!log) {
      this.logger.debug('failed to fetch transaction log')
      this.receiptStore.onError(receipt.id, 'failed to fetch transaction log')
      return false
    }

    this.logger.debug('waiting for order placed, got tx log', JSON.stringify(receipt), log)

    const matches = log.match(/\sorder_id=([\d\w]+)/)

    if (!matches) {
      this.logger.debug('failed to parse transaction log')
      this.receiptStore.onError(receipt.id, 'failed to parse transaction log')
      return false
    }

    const orderId = matches[1]

    this.receiptStore.onPlaced(receipt.id, orderId)
    this.logger.info('order placed', `receipt id: ${receipt.id}`, `order id: ${orderId}`)

    return true
  }

  async waitForCanceled(receipt: Receipt) {
    if (receipt.status !== ReceiptStatus.CancelPending) return false
    const txHash = receipt.txHash
    try {
      await retry(() => this.connection.confirmTransaction(txHash, 'confirmed'), {
        maxAttempt: 5,
        retryDelay: attempt => attempt * 100,
      })
    } catch (error) {
      this.logger.error('fail to confirm tx', JSON.stringify(receipt), error)
      return false
    }
    this.receiptStore.onCanceled(receipt.id)
    this.logger.info('order canceled', `receipt id: ${receipt.id}`)
    return true
  }

  async waitForFulfilled(receipt: Receipt) {
    let fulfilled = false

    while (!fulfilled) {
      const latestReceipt = this.receiptStore.get(receipt.id)

      if (!latestReceipt) {
        this.logger.debug('not found receipt when waiting for fulfilled', `receipt id: ${receipt.id}`)
        return false
      }

      if (latestReceipt.status !== ReceiptStatus.Placed) {
        this.logger.debug(
          'got stale receipt when waiting for fulfilled',
          `receipt id: ${receipt.id}`,
          `receipt status: ${receipt.status}`,
        )
        return false
      }

      const fillEvents = await this.fillEvents.get()

      const fillEvent = fillEvents.find(fe => fe.makerOrderId.toString() === latestReceipt.orderId)

      if (fillEvent) {
        this.receiptStore.onFulfilled(receipt.id)
        fulfilled = true
      }

      await sleep(1000)

      if (!this.keepAlive) {
        return false
      }
    }

    this.logger.info('order fulfilled', `receipt id: ${receipt.id}`)

    return true
  }

  async settlePnl() {
    const rootBanks = await this.mangoGroup.loadRootBanks(this.connection)
    const rootBankAccount = rootBanks[QUOTE_INDEX]
    if (!rootBankAccount) return null
    const marketIndex = this.mangoGroup.getPerpMarketIndex(this.perpMarket.publicKey)
    const txid = await this.mangoClient.settlePnl(
      this.mangoGroup,
      this.mangoCache,
      this.mangoAccount,
      this.perpMarket,
      rootBankAccount,
      this.mangoCache.priceCache[marketIndex].price,
      this.owner,
      undefined,
    )

    return txid
  }

  async closeAllPosition() {
    let balance = await this.balance()

    const side = balance.base > 0 ? 'sell' : 'buy'
    // // send a large size to ensure we are reducing the entire position
    const size = Math.abs(balance.base) * 2

    // hard coded for now; market orders are very dangerous and fault prone
    const maxSlippage: number | undefined = 0.025
    const bb = await this.bestBid()
    const ba = await this.bestAsk()
    if (!bb || !ba) {
      this.logger.error('close all position failed', 'no best bid or ask')
      return false
    }
    const referencePrice = (bb.price + ba.price) / 2

    const txHash = await this.mangoClient.placePerpOrder(
      this.mangoGroup,
      this.mangoAccount,
      this.mangoGroup.mangoCache,
      this.perpMarket,
      this.owner,
      side,
      referencePrice * (1 + (side === 'buy' ? 1 : -1) * maxSlippage),
      size,
      'ioc',
      0, // client order id
      undefined,
      true, // reduce only
      undefined,
    )

    try {
      await retry(() => this.connection.confirmTransaction(txHash, 'confirmed'), {
        maxAttempt: 5,
        retryDelay: attempt => attempt * 100,
      })
    } catch (error) {
      this.logger.error('close all position failed', error)
      return false
    }

    balance = await this.balance()

    return balance.base === 0
  }

  async syncReceiptsFromChain() {
    this.logger.debug('start to syncing receipts from chain')

    const orders = await this.perpMarket.loadOrdersForAccount(this.connection, this.mangoAccount)

    for (const order of orders) {
      const id = order.clientId?.toString()
      const orderId = order.orderId.toString()

      if (this.receiptStore.getByOrderId(orderId)) {
        this.logger.debug('found local receipt with order id:', orderId)
        continue
      }

      if (!id) {
        this.logger.debug('restore receipt failed, not found client id from order, order id:', orderId)
        continue
      }

      const receipt = this.receiptStore.add(
        {
          status: ReceiptStatus.Placed,
          txHash: 'restored-receipt',
          orderId,
          order: {
            price: order.price,
            size: order.size,
            side: order.side === 'buy' ? OrderSide.Buy : OrderSide.Sell,
          },
        },
        id,
      )

      this.logger.debug('receipt restored from chain', JSON.stringify(receipt))

      this.waitForFulfilled(receipt)
    }
  }

  async getPrice() {
    const bb = await this.bestBid()
    const ba = await this.bestAsk()
    if (!bb || !ba) {
      this.logger.error('close all position failed', 'no best bid or ask')
      return undefined
    }
    const referencePrice = (bb.price + ba.price) / 2
    return referencePrice
  }

  async getCollateralValue() {
    const asset = await this.mangoAccount.getAssetsVal(this.mangoGroup, this.mangoCache)
    const liabilities = await this.mangoAccount.getLiabsVal(this.mangoGroup, this.mangoCache)
    return asset.toNumber() - liabilities.toNumber()
  }
}
