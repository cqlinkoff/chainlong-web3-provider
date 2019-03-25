import WKBridge from '@cqlinkoff/wk-bridge'
export default class WalletHooks {
  constructor () {
    this.bridge = new WKBridge('dApp')
  }
  signTransaction = (msg, cb) => {
    this.bridge.postMessage('signTransaction', msg)
      .then(txHash => cb(null, txHash))
      .catch(err => cb(err))
  }
  signMessage = (cb) => {}
  signPersonalMessage = (cb) => {}
  signTypedMessage = (cb) => {}
}
