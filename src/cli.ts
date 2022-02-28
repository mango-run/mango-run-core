import { Keypair } from '@solana/web3.js'
import base58 from 'bs58'
import { Command } from 'commander'
import { ConsoleLogger } from 'logger/console-logger'
import { loadMangoMarket, MangoMarketConfigs } from 'market/mango/mango-market'
import { GridSignalConfigs, NaiveGridSignal } from 'signal/naive-grid-signal/naive-grid-signal'
import { Signal } from 'types'
import { Bot } from 'bot'

const program = new Command()

program.name('mango-run').description('arbitrage bot depends on mango market').version('0.0.0')

interface GridBotArgs {
  privateKey: string
  baseSymbol: string
  marketKind?: string
  priceUpperCap: number
  priceLowerCap: number
  gridCount: number
  gridActiveRange?: number
  orderSize: number
  startPrice?: number
  stopLossPrice?: number
  takeProfitPrice?: number
}

program
  .command('grid-bot')
  .description('run grid bot')
  .requiredOption('-pk, --private-key <key>', 'solana wallet private key')
  .requiredOption('-base, --base-symbol <symbol>', 'market base. e.q. SOL')
  .option('--market-kind', 'mango market kind: perp or spot', 'perp')
  .requiredOption(
    '-puc, --price-upper-cap <number>',
    'highest acceptable price, bot will not place order when price higher than',
    parseFloat,
  )
  .requiredOption(
    '-plc, --price-lower-cap <number>',
    'lowest acceptable price, bot will not place order when price lower than',
    parseFloat,
  )
  .requiredOption('-grid, --grid-count <number>', 'maximun grid count', parseFloat)
  .option('--grid-active-range <number>', 'limit the maximun count of placed orders', parseFloat, 10)
  .requiredOption('-size, --order-size <number>', 'size of every placed order', parseFloat)
  .option('--start-price <number>', 'bot will start after price lower or equal to start price', parseFloat)
  .option(
    '--stop-loss-price <number>',
    'bot will clear all position and stop after price lowner or equal to this price',
    parseFloat,
  )
  .option(
    '--take-profit-price <number>',
    'bot will clear all position and stop after price higher or equal to this price',
    parseFloat,
  )
  .action(async (args: GridBotArgs) => {
    const logger = new ConsoleLogger()
    if (args.marketKind != 'perp') {
      logger.info('current market kind only supper perp')
      return
    }

    const marketConfigs: MangoMarketConfigs = {
      keypair: Keypair.fromSecretKey(base58.decode(args.privateKey)),
      symbol: args.baseSymbol,
      kind: args.marketKind || 'perp',
    }
    const market = await loadMangoMarket(marketConfigs, logger)

    const mangoAccounts = await market.subAccounts()
    if (!mangoAccounts.length) {
      logger.info('please create mango account first')
      return
    }

    market.setSubAccountIndex(mangoAccounts[0])

    const signalConfigs: GridSignalConfigs = {
      market: market,
      priceUpperCap: args.priceUpperCap,
      priceLowerCap: args.priceLowerCap,
      gridCount: args.gridCount,
      orderSize: args.orderSize,
      gridActiveRange: args.gridActiveRange,
      startPrice: args.startPrice,
      stopLossPrice: args.stopLossPrice,
      takeProfitPrice: args.takeProfitPrice,
    }
    const signal: Signal = new NaiveGridSignal(signalConfigs, logger)

    const bot = new Bot(market, signal, logger)
    bot.start()
  })

program.parse()
