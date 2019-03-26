import WKBridge from '@cqlinkoff/wk-bridge'
export default class WalletHooks {
  constructor (address) {
    this.bridge = new WKBridge({
      namespace: 'dApp'
    })
    this.accounts = [address]
  }
  serializeResponse = (result) => {
    const data = {
      jsonrpc: '2.0'
    }
    if (typeof result === 'object' && result.jsonrpc && result.result) {
      data.result = result.result
    } else {
      data.result = result
    }
    return data
  }
  getAccounts = (cb) => {
    cb(null, this.accounts)
  }
  signTransaction = (msg, cb) => {
    this.bridge.postMessage('signTransaction', msg)
      .then(txHash => {
        // const data = this.serializeResponse(txHash)
        // console.log(data)
        cb(null, txHash)
      })
      .catch(err => {
        console.log(err)
        cb(err)
      })
  }
  publishTransaction = (msg, cb) => {
    console.log(msg)
    cb(null, msg)
  }
  signMessage = (cb) => {}
  signPersonalMessage = (cb) => {}
  signTypedMessage = (cb) => {}
}
