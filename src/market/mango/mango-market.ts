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
  PerpOrder,
} from '@blockworks-foundation/mango-client'
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
      const events = await this.market.loadFills(this.connection)
      return events.filter(
        e => e.maker === this.mangoAccount?.publicKey && e.makerClientOrderId.toNumber() === this.botClientID,
      )
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

    const tx = await this.mangoClient.placePerpOrder(
      this.mangoGroup,
      this.mangoAccount,
      this.mangoGroup.mangoCache,
      this.market,
      this.owner,
      order.side === OrderSide.Buy ? 'buy' : 'sell',
      order.price,
      order.size,
      order.type || 'postOnly',
      this.botClientID, //client id
    )

    const receipt = this.receiptStore.add({ order, txHash: tx, status: ReceiptStatus.PlacePending })

    this.waitForPlaced(receipt).then(success => {
      if (success) this.waitForFulfilled(receipt)
    })

    return receipt
  }

  async cancelOrder(id: string): Promise<Receipt> {
    if (!this.mangoAccount) {
      throw new Error('mango account undefined')
    }

    let receipt = this.receiptStore.get(id)

    if (!receipt) throw new Error(`cancel order failed, not found receipt: ${id}`)

    if (receipt.status === ReceiptStatus.PlacePending) {
      await this.waitForPlaced(receipt)
      receipt = this.receiptStore.get(id)
    }

    if (!receipt) throw new Error(`cancel order failed, not found receipt (${id}) after waited for placed`)

    if (receipt.status !== ReceiptStatus.Placed)
      throw new Error(`cancel order failed, receipt (${id}) has invalid status: ${receipt.status}`)

    this.receiptStore.remove(id)

    const tx = await this.mangoClient.cancelPerpOrder(
      this.mangoGroup,
      this.mangoAccount,
      this.owner,
      this.market,
      // cancel instruction needs only orderId
      // mock perp order to prevent loading perp order
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      { orderId: receipt.orderId } as any,
    )

    const cancelReceipt = this.receiptStore.add({ ...receipt, status: ReceiptStatus.CancelPending, txHash: tx })

    this.waitForCanceled(cancelReceipt)

    return cancelReceipt
  }

  async fetchAllOrders(): Promise<PerpOrder[]> {
    if (!this.mangoAccount) {
      throw new Error('mango account undefined')
    }
    const mangoOrders = await this.market.loadOrdersForAccount(this.connection, this.mangoAccount)
    return mangoOrders.filter(od => od.clientId?.toNumber() === this.botClientID)
  }

  async cancelAllOrders(): Promise<Receipt[]> {
    if (!this.mangoAccount) {
      throw new Error('mango account undefined')
    }

    const pendings = this.receiptStore.get(ReceiptStatus.PlacePending)

    if (pendings.length > 0) {
      await Promise.all(pendings.map(r => this.waitForPlaced(r)))
    }

    let receipts = this.receiptStore.get(ReceiptStatus.Placed)

    while (receipts.length > 0) {
      const txs = await this.mangoClient.cancelAllPerpOrders(
        this.mangoGroup,
        [this.market],
        this.mangoAccount,
        this.owner,
      )

      await Promise.all(txs.map(tx => this.connection.confirmTransaction(tx, 'confirmed')))

      receipts = this.receiptStore.get(ReceiptStatus.Placed)
    }

    return receipts
  }

  async waitForPlaced(receipt: Receipt) {
    /**
     * @todo remove it
     */
    if (!receipt.txHash) return false
    if (receipt.status !== ReceiptStatus.PlacePending) return false
    await this.connection.confirmTransaction(receipt.txHash, 'confirmed')

    const txHash = receipt.txHash

    const log = await retry(
      async () => {
        const tx = await this.connection.getTransaction(txHash)
        if (!tx) throw new Error(`not found transaction: ${txHash}`)
        if (!tx.meta) throw new Error(`not found transaction meta: ${txHash}`)
        if (!tx.meta.logMessages) throw new Error(`not found transaction meta log messages: ${txHash}`)
        return tx.meta.logMessages.join(',')
      },
      { maxAttempt: 10, retryDelay: attempt => Math.pow(2, attempt) * 100 },
    ).catch(() => void 0)

    if (!log) {
      this.logger.debug('failed to fetch transaction log')
      this.receiptStore.onError(receipt.id, 'failed to fetch transaction log')
      return false
    }

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
    await this.connection.confirmTransaction(receipt.txHash, 'confirmed')
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
