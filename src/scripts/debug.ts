import dotenv from 'dotenv'
import { Keypair } from '@solana/web3.js'
import base58 from 'bs58'
import { ConsoleLogger } from '../logger/console-logger'
import { MangoMarketConfigs, MangoMarket } from '../market/mango/mango-market'
import { GridSignalConfigs, NaiveGridSignal } from '../signal/naive-grid-signal/naive-grid-signal'
import { Signal } from '../types'
import { Bot } from '../bot'

dotenv.config()

main()

async function main() {
  const logger = new ConsoleLogger()

  const marketConfigs: MangoMarketConfigs = {
    keypair: Keypair.fromSecretKey(base58.decode(process.env.PRIVATE_KEY || '')),
    symbol: 'SOL',
    kind: 'perp',
  }

  const market = new MangoMarket(marketConfigs, logger)

  await market.initialize()

  const mangoAccounts = await market.subAccounts()
  if (!mangoAccounts.length) {
    logger.info('please create mango account first')
    return
  }

  market.setSubAccountIndex(mangoAccounts[0])

  const signalConfigs: GridSignalConfigs = {
    market: market,
    priceUpperCap: 85,
    priceLowerCap: 75,
    gridCount: 100,
    orderSize: 0.1,
    gridActiveRange: 10,
    // startPrice: 0,
    // stopLossPrice: 0,
    // takeProfitPrice: 0,
  }
  const signal: Signal = new NaiveGridSignal(signalConfigs, logger)

  const bot = new Bot(market, signal, logger)

  bot.start()
}
