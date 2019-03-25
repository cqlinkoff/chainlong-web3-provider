import WalletHook from '../src/hooks'

describe('Hook', () => {
  test('create instance', () => {
    const hook = new WalletHook()

    console.log(hook)

    expect(hook).toBeInstanceOf(WalletHook)
  })
})
