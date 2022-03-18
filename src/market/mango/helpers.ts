import { Config, Cluster, getMarketByBaseSymbolAndKind, IDS, MangoClient } from '@blockworks-foundation/mango-client'
import { Connection, Keypair } from '@solana/web3.js'
import { MangoPerpMarketConfigs } from './mango-perp-market'

export interface CreateMangoPerpMarketConfigsOptions {
  rpcUrl?: string
}

export async function createMangoPerpMarketConfigs(
  cluster: Cluster,
  groupName: string,
  keypair: Keypair,
  symbol: string,
  accountIndex: number,
  { rpcUrl = 'https://ssc-dao.genesysgo.net' }: CreateMangoPerpMarketConfigsOptions = {},
): Promise<MangoPerpMarketConfigs> {
  const groupConfig = new Config(IDS).getGroup(cluster, groupName)
  if (!groupConfig) throw new Error(`not found group config ${cluster} ${groupName}`)

  const connection = new Connection(rpcUrl)
  const mangoClient = new MangoClient(connection, groupConfig.mangoProgramId)
  const mangoGroup = await mangoClient.getMangoGroup(groupConfig.publicKey)
  const mangoCache = await mangoGroup.loadCache(connection)
  const marketConfig = getMarketByBaseSymbolAndKind(groupConfig, symbol, 'perp')
  const perpMarket = await mangoGroup.loadPerpMarket(
    connection,
    marketConfig.marketIndex,
    marketConfig.baseDecimals,
    marketConfig.quoteDecimals,
  )
  const mangoAccounts = await mangoClient.getMangoAccountsForOwner(mangoGroup, keypair.publicKey)
  if (!mangoAccounts.length) throw new Error('no mango accounts found')
  if (mangoAccounts.length < accountIndex) throw new Error(`not found account with index ${accountIndex}`)

  const mangoAccount = mangoAccounts[accountIndex]

  return { keypair, connection, mangoAccount, mangoCache, mangoClient, mangoGroup, marketConfig, perpMarket }
}
