# @mango-run/core

A simple trading bot framework base on [Mango](https://mango.markets/).

[documentation](https://mango-run.github.io/mango-run-core)

# Quick start

```
$ yarn add @mango-run/core

# or

$ npm install @mango-run/core
```

```typescript
import { Bot, ConsoleLogger, MangoPerpMarket, NaiveGridSignal, createMangoPerpMarketConfigs } from '@mango-run/core'

const marketConfig = await createMangoPerpMarketConfigs(...)
const market = new MangoPerpMarket(marketConfig)
const signal = new NaiveGridSignal(...)
const logger = new ConsoleLogger()
const bot = new Bot(market, singal, logger)
bot.start()
```
