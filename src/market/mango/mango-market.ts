import { Keypair } from '@solana/web3.js'
import type { Market } from 'types'

export interface MangoMarketConfigs {
  keypair: Keypair
}

// @todo implement Market interface
// eslint-disable-next-line
// @ts-ignore
export class MangoMarket implements Market {
  constructor(private configs: MangoMarketConfigs) {}

  // fetch mango sub account list
  async subAccounts() {
    return []
  }

  // set current operated sub account
  // eslint-disable-next-line
  setSubAccountIndex(index: number) {
    // @todo implement
    return
  }
}
