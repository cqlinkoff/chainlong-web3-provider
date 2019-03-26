import WKBridge from '@cqlinkoff/wk-bridge'
export default class WalletHooks {
  constructor (address) {
    this.bridge = new WKBridge({
      namespace: 'dApp'
    })
    this.accounts = [address]
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
