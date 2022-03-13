import dotenv from 'dotenv'
import { Config, getMarketByBaseSymbolAndKind, IDS, MangoClient } from '@blockworks-foundation/mango-client'
import { Account, Connection, Keypair } from '@solana/web3.js'
import base58 from 'bs58'

dotenv.config()

main()

async function main() {
  const connection = new Connection('https://ssc-dao.genesysgo.net')
  const groupConfig = new Config(IDS).getGroup('mainnet', 'mainnet.1')
  if (!groupConfig) throw new Error('not found grounp config')
  const client = new MangoClient(connection, groupConfig.mangoProgramId)
  const group = await client.getMangoGroup(groupConfig.publicKey)
  const marketConfig = getMarketByBaseSymbolAndKind(groupConfig, 'SOL', 'perp')
  const keypair = Keypair.fromSecretKey(base58.decode(process.env.PRIVATE_KEY || ''))
  const market = await group.loadPerpMarket(
    connection,
    marketConfig.marketIndex,
    marketConfig.baseDecimals,
    marketConfig.quoteDecimals,
  )
  const accounts = await client.getMangoAccountsForOwner(group, keypair.publicKey)
  let orders = await market.loadOrdersForAccount(connection, accounts[0])
  while (orders.length > 0) {
    await client.cancelAllPerpOrders(group, [market], accounts[0], new Account(keypair.secretKey))
    orders = await market.loadOrdersForAccount(connection, accounts[0])
  }
}
