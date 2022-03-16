import base58 from 'bs58'
import dotenv from 'dotenv'

import { Keypair } from '@solana/web3.js'

import { Bot } from '../bot'
import { ConsoleLogger } from '../logger/console-logger'
import { MangoPerpMarket } from '../market/mango/mango-perp-market'
import { NaiveGridSignal } from '../signal/naive-grid-signal/naive-grid-signal'
import { Signal } from '../types'
import { createMangoPerpMarketConfigs } from '../market/mango/helpers'

dotenv.config()

main()

async function main() {
  const keypair = Keypair.fromSecretKey(base58.decode(process.env.PRIVATE_KEY || ''))

  const configs = await createMangoPerpMarketConfigs('mainnet', 'mainnet.1', keypair, 'SOL', 1)

  const logger = new ConsoleLogger(void 0, { newline: 1 })

  const market = new MangoPerpMarket(configs, logger)

  const signal: Signal = new NaiveGridSignal(
    {
      market: market,
      priceUpperCap: 85,
      priceLowerCap: 75,
      gridCount: 100,
      orderSize: 0.1,
      gridActiveRange: 10,
    },
    logger,
  )

  const bot = new Bot(market, signal, logger)

  bot.start()
}
