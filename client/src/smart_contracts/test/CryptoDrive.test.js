const CryptoDrive = artifacts.require('./../contracts/CryptoDrive.sol')
var asserted = require('assert');

contract('CryptoDrive', (accounts) => {
  let cryptodrive

  before(async () => {
    cryptodrive = await CryptoDrive.deployed()
  })

  describe('deployment', async () => {
    it('deploys successfully', async () => {
      const address = await cryptodrive.address
      assert.notEqual(address, 0x0)
      assert.notEqual(address, '')
      assert.notEqual(address, null)
      assert.notEqual(address, undefined)
    });

    

  })
})
