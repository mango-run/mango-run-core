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
import { Cache, sleep } from '../../utils'
import { ReceiptStore } from '../receipt-store'

export interface MangoMarketConfigs {
  keypair: Keypair
  // ex: sol
  symbol: string
  kind: MarketKind
}

export class MangoMarket implements Market {
  mangoAccount: MangoAccount | undefined
  owner: Account
  /**
   * @todo should generate according config to allow launch multiple bot on same market
   */
  botClientID = 5566
  canceledReceipts: Receipt[] = []

  private groupConfig: GroupConfig
  private connection = new Connection('https://mercurial.rpcpool.com/', 'confirmed')
  private mangoClient!: MangoClient
  private mangoGroup!: MangoGroup
  private mangoCache!: MangoCache
  private marketConfig!: MarketConfig
  private market!: PerpMarket

  private hasInitialized = false

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
  }

  async initialize() {
    if (this.hasInitialized) return
    this.hasInitialized = true

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
    const ask = await (await this.market.loadAsks(this.connection)).getBest()
    if (!ask) {
      return undefined
    }

    return {
      price: ask.price,
      size: ask.size,
    }
  }

  async bestBid(): Promise<Order | undefined> {
    const bid = await (await this.market.loadBids(this.connection)).getBest()
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

  async receipts(status: ReceiptStatus): Promise<Receipt[]> {
    if (!this.mangoAccount) {
      return []
    }

    switch (status) {
      case ReceiptStatus.Placed: {
        const orders = await this.market.loadOrdersForAccount(this.connection, this.mangoAccount)
        return orders
          .filter(o => {
            return o.clientId?.toNumber() === this.botClientID
          })
          .map(o => {
            return {
              id: o.orderId.toString(),
              orderId: o.orderId.toString(),
              status: ReceiptStatus.Placed,
              order: {
                price: o.price,
                size: o.size,
                side: o.side === 'buy' ? OrderSide.Buy : OrderSide.Sell,
              },
            }
          })
      }
      case ReceiptStatus.Fulfilled: {
        const fills = await this.market.loadFills(this.connection)
        return fills
          .filter(f => {
            return f.makerClientOrderId.toNumber() === this.botClientID && f.maker === this.mangoAccount?.publicKey
          })
          .map(f => {
            return {
              id: f.makerOrderId.toString(),
              orderId: f.makerOrderId.toString(),
              status: ReceiptStatus.Fulfilled,
              order: {
                price: f.price,
                size: f.quantity,
                side: f.takerSide === 'sell' ? OrderSide.Buy : OrderSide.Sell,
              },
            }
          })
      }
      case ReceiptStatus.Canceled:
        return this.canceledReceipts
      default:
        break
    }

    return []
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

    await this.connection.confirmTransaction(tx, 'confirmed')

    const log = (await this.connection.getTransaction(tx))?.meta?.logMessages?.join(',')
    if (!log) {
      this.logger.debug('failed to fetch transaction log')
      return {
        id: '',
        status: ReceiptStatus.Error,
        order,
        error: 'failed to fetch transaction log',
      }
    }

    const matches = log.match(/\sorder_id=([\d\w]+)/)
    if (!matches) {
      this.logger.debug('failed to parse transaction log')
      return {
        id: '',
        status: ReceiptStatus.Error,
        order,
        error: 'failed to parse transaction log',
      }
    }

    const id = matches[1]
    const receipt: Receipt = {
      id,
      orderId: id,
      status: ReceiptStatus.Placed,
      order: order,
    }

    return receipt
  }

  async cancelOrder(id: string): Promise<Receipt> {
    if (!this.mangoAccount) {
      throw new Error('mango account undefined')
    }
    const mangoOrder = (await this.market.loadOrdersForAccount(this.connection, this.mangoAccount)).find(od => {
      od.orderId.toString() === id
    })

    if (!mangoOrder) {
      this.logger.debug(`failed to find order by id: ${id}`)
      return {
        id: '',
        status: ReceiptStatus.Error,
        order: {
          price: 0,
          size: 0,
          side: OrderSide.Buy,
        },
        error: `failed to find order by id: ${id}`,
      }
    }

    const tx = await this.mangoClient.cancelPerpOrder(
      this.mangoGroup,
      this.mangoAccount,
      this.owner,
      this.market,
      mangoOrder,
    )

    await this.connection.confirmTransaction(tx, 'confirmed')

    const receipt: Receipt = {
      id: id,
      orderId: mangoOrder.orderId.toString(),
      status: ReceiptStatus.Canceled,
      order: {
        price: mangoOrder.price,
        size: mangoOrder.size,
        side: mangoOrder.side === 'buy' ? OrderSide.Buy : OrderSide.Sell,
      },
    }

    this.canceledReceipts.push(receipt)

    return receipt
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
    let mangoOrders = await this.fetchAllOrders()

    const receipts: Receipt[] = mangoOrders.map(od => {
      const r: Receipt = {
        id: od.orderId.toString(),
        orderId: od.orderId.toString(),
        status: ReceiptStatus.Canceled,
        order: {
          price: od.price,
          size: od.size,
          side: od.side === 'buy' ? OrderSide.Buy : OrderSide.Sell,
        },
      }
      return r
    })

    while (mangoOrders.length != 0) {
      const txs = await this.mangoClient.cancelAllPerpOrders(
        this.mangoGroup,
        [this.market],
        this.mangoAccount,
        this.owner,
      )

      for (let index = 0; index < txs.length; index++) {
        const tx = txs[index]
        await this.connection.confirmTransaction(tx)
      }

      mangoOrders = await this.fetchAllOrders()
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
    const log = (await this.connection.getTransaction(receipt.txHash))?.meta?.logMessages?.join(',')
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
    const id = matches[1]
    this.receiptStore.onPlaced(receipt.id, id)
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
  }

  async waitForFulfilled(receipt: Receipt) {
    if (receipt.status !== ReceiptStatus.Placed) return false
    let fulfilled = false
    while (!fulfilled) {
      const fillEvents = await this.fillEvents.get()
      const fillEvent = fillEvents.find(fe => fe.makerOrderId.toString() === receipt.orderId)
      if (fillEvent) {
        this.receiptStore.onFulfilled(receipt.id)
        fulfilled = true
      }
      await sleep(1000)
    }
    return true
  }
}
