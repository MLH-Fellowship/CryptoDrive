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

    const user_id="u1";
    const passhash="whdkwuxdhdrmi";
    const public_key="hhhhhhhhhhhssssssssseeee"

    it('Signup Successfully',async()=>{
        const result=await cryptodrive.SignUp(user_id,passhash,public_key);
    });

    it('Retrive Pass Hash',async()=>{
        const result=await cryptodrive.GetPassHash(user_id);
        asserted.equal(passhash,result,"Pass Hash not Retrived Successfully");
    });

    it('Retrive the Public Key',async()=>{
        const result=await cryptodrive.getPublicKey(user_id);
        asserted.equal(public_key,result,"Public Key not Retrived Successfully");
    });

    const filehash="aaaaaaaawwwwwww0dddddd";
    const filename="name.txt"

    it('Add the file hashes', async () => {
        const result= await cryptodrive.AddFileHash(user_id,filehash,filename);
      });

    it('Getting the Files from user id u1',async()=>{
        const result=await cryptodrive.GetFilehash(user_id);
        asserted.equal(filehash,result[0]['filehash'],"File Hash not Successfully Retrived");
        asserted.equal(filename,result[0]['filename'],"File Name not Successfully Retrived");
    });

    


  })
})
