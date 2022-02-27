import {
  Config,
  getMarketByBaseSymbolAndKind,
  GroupConfig,
  IDS,
  MangoAccount,
  MangoClient,
  MangoGroup,
  MarketKind,
  PerpMarket,
  PerpOrder,
} from '@blockworks-foundation/mango-client'
import { Account, Connection, Keypair } from '@solana/web3.js'
import { Market, Order, Orderbook, OrderDraft, OrderSide, Receipt } from 'types'
import { ReceiptType } from 'types'

const connection = new Connection('https://mercurial.rpcpool.com/', 'confirmed')

const config = new Config(IDS)
const groupConfig = config.getGroup('mainnet', 'mainnet.1') as GroupConfig

export interface MangoMarketConfigs {
  keypair: Keypair
  // ex: sol
  symbol: string
  kind: MarketKind
}

export const loadMangoMarket = async (configs: MangoMarketConfigs): Promise<MangoMarket> => {
  const client = new MangoClient(connection, groupConfig.mangoProgramId)
  const mangoGroup = await client.getMangoGroup(groupConfig.publicKey)
  const marketConfig = getMarketByBaseSymbolAndKind(groupConfig, configs.symbol, configs.kind)
  const market = await mangoGroup.loadPerpMarket(
    connection,
    marketConfig.marketIndex,
    marketConfig.baseDecimals,
    marketConfig.quoteDecimals,
  )
  return new MangoMarket(configs, client, mangoGroup, market)
}

export class MangoMarket implements Market {
  mangoAccount: MangoAccount | undefined
  owner: Account
  receiptList: Receipt[]
  botClientID = 5566

  constructor(
    private configs: MangoMarketConfigs,
    private mangoClient: MangoClient,
    private mangoGroup: MangoGroup,
    private market: PerpMarket,
  ) {
    this.owner = new Account(this.configs.keypair.secretKey)
    this.receiptList = []
  }

  // fetch mango sub account list
  async subAccounts() {
    const accounts = await this.mangoClient.getMangoAccountsForOwner(this.mangoGroup, this.configs.keypair.publicKey)
    return accounts
  }

  // set current operated sub account
  // eslint-disable-next-line
  setSubAccountIndex(account: MangoAccount) {
    this.mangoAccount = account
  }

  async bestAsk(): Promise<Order | undefined> {
    const ask = await (await this.market.loadAsks(connection)).getBest()
    if (!ask) {
      return undefined
    }

    return {
      price: ask.price,
      size: ask.size,
    }
  }

  async bestBid(): Promise<Order | undefined> {
    const bid = await (await this.market.loadBids(connection)).getBest()
    if (!bid) {
      return undefined
    }

    return {
      price: bid.price,
      size: bid.size,
    }
  }

  async orderbook(depth: number): Promise<Orderbook> {
    const [_asks, _bids] = await Promise.all([this.market.loadAsks(connection), this.market.loadBids(connection)])

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

  async receipts(type: ReceiptType): Promise<Receipt[]> {
    return this.receiptList.filter(r => r.type === type)
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
      'postOnly',
      this.botClientID, //client id
    )

    await connection.confirmTransaction(tx, 'confirmed')

    const log = (await connection.getTransaction(tx))?.meta?.logMessages?.join(',')
    if (!log) {
      throw new Error('can not fetch transaction log')
    }

    const matches = log.match(/\sorder_id=([\d\w]+)/)
    if (!matches) {
      throw new Error('can not parse transaction log')
    }

    const id = matches[1]
    const receipt = {
      id,
      type: ReceiptType.Placed,
      order: order,
    }
    this.receiptList.push(receipt)

    return receipt
  }

  async cancelOrder(id: string): Promise<Receipt> {
    if (!this.mangoAccount) {
      throw new Error('mango account undefined')
    }
    const mangoOrder = (await this.market.loadOrdersForAccount(connection, this.mangoAccount)).find(od => {
      od.orderId.toString() === id
    })

    if (!mangoOrder) {
      throw new Error(`can not find order by id: ${id}`)
    }

    const tx = await this.mangoClient.cancelPerpOrder(
      this.mangoGroup,
      this.mangoAccount,
      this.owner,
      this.market,
      mangoOrder,
    )

    await connection.confirmTransaction(tx, 'confirmed')

    const receipt = {
      id: id,
      type: ReceiptType.Canceled,
      order: {
        price: mangoOrder.price,
        size: mangoOrder.size,
        side: mangoOrder.side === 'buy' ? OrderSide.Buy : OrderSide.Sell,
      },
    }
    this.receiptList.push(receipt)

    return receipt
  }

  async fetchAllOrders(): Promise<PerpOrder[]> {
    if (!this.mangoAccount) {
      throw new Error('mango account undefined')
    }
    const mangoOrders = await this.market.loadOrdersForAccount(connection, this.mangoAccount)
    return mangoOrders.filter(od => od.clientId?.toNumber() === this.botClientID)
  }

  async cancelAllOrders(): Promise<Receipt[]> {
    if (!this.mangoAccount) {
      throw new Error('mango account undefined')
    }
    let mangoOrders = await this.fetchAllOrders()

    const receipts: Receipt[] = mangoOrders.map(od => {
      const r: Receipt = {
        id: od.orderId.toString() as string,
        type: ReceiptType.Canceled,
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
        await connection.confirmTransaction(tx)
      }

      mangoOrders = await this.fetchAllOrders()
    }

    return receipts
  }
}
