import { Command } from 'commander'

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
  .requiredOption('-pk, --private-key', 'solana wallet private key')
  .requiredOption('-base, --base-symbol', 'market base. e.q. sol')
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
  .action((args: GridBotArgs) => {
    /**
     * @todo build bot
     */
    console.log(args)
  })

program.parse()
