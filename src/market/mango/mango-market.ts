import {
  Config,
  getMarketByBaseSymbolAndKind,
  GroupConfig,
  IDS,
  MangoAccount,
  MangoCache,
  MangoClient,
  MangoGroup,
  MarketConfig,
  MarketKind,
  PerpMarket,
  TimeoutError,
} from '@blockworks-foundation/mango-client'
import BN from 'bn.js'
import { Account, Connection, Keypair } from '@solana/web3.js'

import { Balance, Logger, Market, Order, Orderbook, OrderDraft, OrderSide, Receipt, ReceiptStatus } from '../../types'
import { Cache, retry, sleep } from '../../utils'
import { ReceiptStore } from '../receipt-store'

export interface MangoMarketConfigs {
  keypair: Keypair
  // ex: sol
  symbol: string
  kind: MarketKind
  rpc?: string | undefined
}

export class MangoMarket implements Market {
  mangoAccount: MangoAccount | undefined
  owner: Account
  /**
   * @todo should generate according config to allow launch multiple bot on same market
   */
  botClientID = 5566

  private groupConfig: GroupConfig
  private connection: Connection
  private mangoClient!: MangoClient
  private mangoGroup!: MangoGroup
  private mangoCache!: MangoCache
  private marketConfig!: MarketConfig
  private market!: PerpMarket

  private hasInitialized = false
  /**
   * determine underlying process is keeping alive or not
   */
  private keepAlive = false

  receiptStore: ReceiptStore

  fillEvents = new Cache(
    async () => {
      if (!this.mangoAccount) return []

      const publicKey = this.mangoAccount.publicKey

      const events = await retry(() => this.market.loadFills(this.connection)).catch(error => {
        this.logger.error('update fill events failed', error)
        return []
      })

      return events.filter(e => e.maker.equals(publicKey) && e.makerClientOrderId.toNumber() === this.botClientID)
    },
    { ttl: 1000 },
  )

  constructor(private configs: MangoMarketConfigs, private logger: Logger) {
    const groupConfig = new Config(IDS).getGroup('mainnet', 'mainnet.1')
    if (!groupConfig) throw new Error('not found manago group config')
    this.groupConfig = groupConfig

    this.logger = logger.create('market')
    this.owner = new Account(this.configs.keypair.secretKey)
    this.receiptStore = new ReceiptStore(logger)

    // default use genesysgo's rpc endpoint
    this.connection = new Connection(configs.rpc || 'https://ssc-dao.genesysgo.net')
  }

  async initialize() {
    if (this.hasInitialized) return
    this.hasInitialized = true
    this.keepAlive = true

    this.mangoClient = new MangoClient(this.connection, this.groupConfig.mangoProgramId)
    this.mangoGroup = await this.mangoClient.getMangoGroup(this.groupConfig.publicKey)
    this.mangoCache = await this.mangoGroup.loadCache(this.connection)
    this.marketConfig = getMarketByBaseSymbolAndKind(this.groupConfig, this.configs.symbol, this.configs.kind)
    this.market = await this.mangoGroup.loadPerpMarket(
      this.connection,
      this.marketConfig.marketIndex,
      this.marketConfig.baseDecimals,
      this.marketConfig.quoteDecimals,
    )
  }

  async destroy() {
    this.hasInitialized = false
    this.keepAlive = false
  }

  // fetch mango sub account list
  async subAccounts() {
    const accounts = await this.mangoClient.getMangoAccountsForOwner(this.mangoGroup, this.configs.keypair.publicKey)
    return accounts
  }

  // set current operated sub account
  setSubAccountIndex(account: MangoAccount) {
    this.mangoAccount = account
  }

  async balance(): Promise<Balance> {
    if (!this.mangoAccount) {
      throw new Error('mango account undefined')
    }

    const perpAccount = this.mangoAccount.perpAccounts[this.marketConfig.marketIndex]
    const base = this.market.baseLotsToNumber(perpAccount.basePosition)
    const indexPrice = this.mangoGroup.getPrice(this.marketConfig.marketIndex, this.mangoCache).toNumber()
    const quote = Math.abs(base * indexPrice)
    return { base, quote }
  }

  async bestAsk(): Promise<Order | undefined> {
    const ask = (await this.market.loadAsks(this.connection)).getBest()
    if (!ask) {
      return undefined
    }

    return {
      price: ask.price,
      size: ask.size,
    }
  }

  async bestBid(): Promise<Order | undefined> {
    const bid = (await this.market.loadBids(this.connection)).getBest()
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
      this.market.loadAsks(this.connection),
      this.market.loadBids(this.connection),
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
    if (!this.mangoAccount) {
      throw new Error('mango account undefined')
    }

    const mangoAccount = this.mangoAccount

    const txHash = await retry(async () => {
      try {
        return await this.mangoClient.placePerpOrder(
          this.mangoGroup,
          mangoAccount,
          this.mangoGroup.mangoCache,
          this.market,
          this.owner,
          order.side === OrderSide.Buy ? 'buy' : 'sell',
          order.price,
          order.size,
          order.type || 'postOnly',
          this.botClientID, //client id
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

    const receipt = this.receiptStore.add({ order, txHash, status: ReceiptStatus.PlacePending })

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
    if (!this.mangoAccount) {
      throw new Error('mango account undefined')
    }

    const mangoAccount = this.mangoAccount

    let receipt = this.receiptStore.get(id)

    if (!receipt) throw new Error(`cancel order failed, not found receipt: ${id}`)

    if (receipt.status === ReceiptStatus.PlacePending) {
      await this.waitForPlaced(receipt)
      receipt = this.receiptStore.get(id)
    }

    if (!receipt) throw new Error(`cancel order failed, not found receipt (${id}) after waited for placed`)

    if (receipt.status !== ReceiptStatus.Placed)
      throw new Error(`cancel order failed, receipt (${id}) has invalid status: ${receipt.status}`)

    const orderId = new BN(receipt.orderId)

    this.receiptStore.remove(id)

    const txHash = await retry(async () => {
      try {
        return await this.mangoClient.cancelPerpOrder(
          this.mangoGroup,
          mangoAccount,
          this.owner,
          this.market,
          // cancel instruction needs only orderId
          // mock perp order to prevent loading perp order
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          { orderId } as any,
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

    const cancelReceipt = this.receiptStore.add({ ...receipt, status: ReceiptStatus.CancelPending, txHash })

    this.waitForCanceled(cancelReceipt)

    return cancelReceipt
  }

  async cancelAllOrders(): Promise<Receipt[]> {
    if (!this.mangoAccount) {
      throw new Error('mango account undefined')
    }

    const pendings = this.receiptStore.get(ReceiptStatus.PlacePending)

    if (pendings.length > 0) {
      await Promise.all(pendings.map(r => this.waitForPlaced(r)))
    }

    let orders = await this.market.loadOrdersForAccount(this.connection, this.mangoAccount)

    const receipts: Receipt[] = []

    while (orders.length > 0) {
      const txs = await this.mangoClient.cancelAllPerpOrders(
        this.mangoGroup,
        [this.market],
        this.mangoAccount,
        this.owner,
      )

      await Promise.all(txs.map(tx => this.connection.confirmTransaction(tx, 'confirmed')))

      const currentOrders = await this.market.loadOrdersForAccount(this.connection, this.mangoAccount)

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
    /**
     * @todo remove it
     */
    if (!receipt.txHash) return false
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
    /**
     * @todo remove it
     */
    if (!receipt.txHash) return false
    if (receipt.status !== ReceiptStatus.CancelPending) return false
    const txHash = receipt.txHash
    await retry(() => this.connection.confirmTransaction(txHash, 'confirmed'), {
      maxAttempt: 5,
      retryDelay: attempt => attempt * 100,
    })
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
}
