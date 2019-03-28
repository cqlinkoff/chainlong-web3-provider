import * as Web3 from 'web3'
import WKBridge from '@cqlinkoff/wk-bridge'

export default class ChainLongWeb3Provider extends Web3.providers.WebsocketProvider {
  constructor (options = {}) {
    super(options.rpcUrl)
    this.bridge = new WKBridge({
      namespace: 'dApp'
    })

    window.Web3 = Web3
  }

  send = (payload, callback) => {
    if (this.connection.readyState === this.connection.CONNECTING) {
      setTimeout(() => {
        this.send(payload, callback)
      }, 10)
      return
    }

    // try reconnect, when connection is gone
    // if(!this.connection.writable)
    //     this.connection.connect({url: this.url});
    if (this.connection.readyState !== this.connection.OPEN) {
      console.error('connection not open on send()')
      if (typeof this.connection.onerror === 'function') {
        this.connection.onerror(new Error('connection not open'))
      } else {
        console.error('no error callback')
      }
      callback(new Error('connection not open'))
      return
    }
    switch (payload.method) {
      case 'eth_sendTransaction':
        this.bridge.postMessage('signTransaction', payload.params[0])
          .then(result => {
            const response = {
              jsonrpc: '2.0',
              id: payload.id
            }
            response.result = result
            callback(null, response)
          })
          .catch(err => callback(err, null))
        break
      default:
        this.connection.send(JSON.stringify(payload))
        this._addResponseCallback(payload, callback)
    }
  }
}
