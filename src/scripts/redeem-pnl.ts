import base58 from 'bs58'
import dotenv from 'dotenv'

import { Keypair } from '@solana/web3.js'

import { ConsoleLogger } from '../logger/console-logger'
import { MangoPerpMarket } from '../market/mango/mango-perp-market'

import { createMangoPerpMarketConfigs } from '../market/mango/helpers'

dotenv.config()

main()

async function main() {
  const keypair = Keypair.fromSecretKey(base58.decode(process.env.PRIVATE_KEY || ''))

  const configs = await createMangoPerpMarketConfigs('mainnet', 'mainnet.1', keypair, 'ETH', 0)

  const logger = new ConsoleLogger(void 0, { newline: 1 })

  const market = new MangoPerpMarket(configs, logger)

  const res = await market.settlePnl()
  logger.info(`settle pnl output: ${res}`)
}
