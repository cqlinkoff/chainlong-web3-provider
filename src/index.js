import * as ProviderEngine from 'web3-provider-engine'
import * as RpcSubProvider from 'web3-provider-engine/subproviders/rpc'
import * as HookedWalletSubProvider from 'web3-provider-engine/subproviders/hooked-wallet'
import * as SubscriptionsSubProvider from 'web3-provider-engine/subproviders/subscriptions'
import * as Web3 from 'web3'
import WalletHooks from './hooks'

export default class ChainLongWeb3Provider {
  constructor (options = {}) {
    const { rpcUrl, address } = options
    this.engine = new ProviderEngine()
    const hookedWallet = new HookedWalletSubProvider(new WalletHooks(address))
    this.engine.addProvider(hookedWallet)
    this.engine.addProvider(new SubscriptionsSubProvider())
    if (rpcUrl) {
      this.engine.addProvider(
        new RpcSubProvider({
          rpcUrl
        })
      )
    }
    this.engine.start()
    this.web3 = new Web3(this.engine)
    window.web3 = this.web3
    window.Web3 = Web3
  }
}

window.ChainLongWeb3Provider = ChainLongWeb3Provider
