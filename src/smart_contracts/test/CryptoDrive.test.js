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

    it('Signup Successfully for user 1',async()=>{
        const result=await cryptodrive.SignUp(user_id,passhash,public_key);
    });

    it('Retrive Pass Hash for user 1',async()=>{
        const result=await cryptodrive.GetPassHash(user_id);
        asserted.equal(passhash,result,"Pass Hash not Retrived Successfully");
    });

    it('Retrive the Public Key for user 1',async()=>{
        const result=await cryptodrive.getPublicKey(user_id);
        asserted.equal(public_key,result,"Public Key not Retrived Successfully");
    });

    const filehash="aaaaaaaawwwwwww0dddddd";
    const filename="name.txt"

    it('Add the file hashes by user 1', async () => {
        const result= await cryptodrive.AddFileHash(user_id,filehash,filename);
      });

    it('Getting the Files from user id u1',async()=>{
        const result=await cryptodrive.GetFilehash(user_id);
        asserted.equal(filehash,result[0]['filehash'],"File Hash not Successfully Retrived");
        asserted.equal(filename,result[0]['filename'],"File Name not Successfully Retrived");
    });

    
    const user_id_2="u2";
    const passhash_2="aaawwwwaad";
    const public_key_2="kkkkaaaaaeeeeeddddcccccssss"

    
    it('Signup Successfully for user 2',async()=>{
      const result_2=await cryptodrive.SignUp(user_id_2,passhash_2,public_key_2);
  });

  it('Retrive Pass Hash for user 2',async()=>{
      const result_2=await cryptodrive.GetPassHash(user_id_2);
      asserted.equal(passhash_2,result_2,"Pass Hash not Retrived Successfully");
  });

  it('Retrive the Public Key for user 2',async()=>{
      const result_2=await cryptodrive.getPublicKey(user_id_2);
      asserted.equal(public_key_2,result_2,"Public Key not Retrived Successfully");
  });

  // Sender u1 and receiver u2

  it('User u1 shares a file with User u2 successfully',async()=>{
    const result_final=await cryptodrive.AddShareFile(user_id_2,filehash,filename,user_id);
  });

  it('Retrived the file sent by user id u1 to user id u2 successfully',async()=>{
    const result_final=await cryptodrive.GetShareDetails(user_id_2);
    // console.log(result_final);
    asserted.equal(filehash,result_final[0].filehash,"FileHash which is shared by u1 not retrived successfully");
    asserted.equal(filename,result_final[0].filename,"FileName which is shared by u1 not retrived successfully");
    asserted.equal('u1',result_final[0].sender,"Sender not retrived successfully");

  })
    


  })
})
