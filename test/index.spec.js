import ChainLongWeb3Provider from '../src'
import * as Web3 from 'web3'

describe('ChainLongWeb3Provider', () => {
  test('create instance', () => {
    const provider = new ChainLongWeb3Provider({
      rpcUrl: 'wss://rinkeby.infura.io/ws'
    })
    expect(provider).toBeInstanceOf(ChainLongWeb3Provider)
    expect(provider).toBeInstanceOf(Web3.providers.WebsocketProvider)
  })
})
