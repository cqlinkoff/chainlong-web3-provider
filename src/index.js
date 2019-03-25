import * as ProviderEngine from 'web3-provider-engine'
import * as RpcSubProvider from 'web3-provider-engine/subproviders/rpc'
import * as HookedWalletSubProvider from 'web3-provider-engine/subproviders/hooked-wallet'
import WalletHooks from './hooks'
import * as Web3 from 'web3'

export default class ChainLongWeb3Provider {
  constructor (options = {}) {
    const {
      rpcUrl
    } = options
    this.engine = new ProviderEngine()
    const hookedWallet = new HookedWalletSubProvider(new WalletHooks())
    this.engine.addProvider(hookedWallet)
    if (rpcUrl) {
      this.engine.addProvider(new RpcSubProvider({
        rpcUrl
      }))
    }
    this.engine.start()
    this.web3 = new Web3(this.engine)
    window.web3 = this.web3
    window.Web3 = Web3
  }
}

window.ChainLongWeb3Provider = ChainLongWeb3Provider
