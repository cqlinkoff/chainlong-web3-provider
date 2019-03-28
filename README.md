# chainlong-web3-provider

web3 provider for ChainLong Pay

## Install

```bash
npm i @cqlinkoff/chainlong-web3-provider
```

## Use

```js
import * as Web3 from 'web3'
import ChainLongWeb3Provider from '@cqlinkoff/chainlong-web3-provider'

const provider = new ChainLongWeb3Provider({
  rpcUrl: 'wss://rinkeby.infura.io/ws'
})

const web3 = new Web3(provider)

```
