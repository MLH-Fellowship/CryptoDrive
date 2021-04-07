const CryptoDrive = artifacts.require('./../contracts/CryptoDrive.sol')
var asserted = require('assert');

contract('CryptoDrive', (accounts) => {
  let cryptodrive

  before(async () => {
    cryptodrive = await CryptoDrive.deployed()
  })

// Writing tests for the Deployment Phase in the Samrt Contract

  describe('deployment', async () => {

    // Checking whether the smart contract deployed successfully deployed or not

    it('deploys successfully', async () => {
      const address = await cryptodrive.address
      assert.notEqual(address, 0x0)
      assert.notEqual(address, '')
      assert.notEqual(address, null)
      assert.notEqual(address, undefined)
    });

    // Initialising the Sample Variables Values for further checks 
    // These Variables are for user 1

    const user_id="u1";
    const passhash="whdkwuxdhdrmi";
    const public_key="hhhhhhhhhhhssssssssseeee"

    // Tests for Signing Up User 1 Successfully or not

    it('Signup Successfully for user 1',async()=>{
        const result=await cryptodrive.SignUp(user_id,passhash,public_key);
    });

    // Tests to check the pass hash retrived by contract for user 1 matches or not

    it('Retrive Pass Hash for user 1',async()=>{
        const result=await cryptodrive.GetPassHash(user_id);
        asserted.equal(passhash,result,"Pass Hash not Retrived Successfully");
    });

    // Tests to check the public Key retrived by contract for user 1 matches or not

    it('Retrive the Public Key for user 1',async()=>{
        const result=await cryptodrive.getPublicKey(user_id);
        asserted.equal(public_key,result,"Public Key not Retrived Successfully");
    });
    
    // Initialising the Sample Variables Values for further checks 
    // These Variables are for file name and file hash for user 1

    const filehash="aaaaaaaawwwwwww0dddddd";
    const filename="name.txt"

    // Tests for uploading the file by user 1

    it('Add the file hashes by user 1', async () => {
        const result= await cryptodrive.AddFileHash(user_id,filehash,filename);
      });

    // Tests for getting the data from smart contract for uploaded file

    it('Getting the Files from user id u1',async()=>{
        const result=await cryptodrive.GetFilehash(user_id);
        asserted.equal(filehash,result[0]['filehash'],"File Hash not Successfully Retrived");
        asserted.equal(filename,result[0]['filename'],"File Name not Successfully Retrived");
    });

    // Initialising the Sample Variables Values for further checks 
    // These Variables are for user 2

    const user_id_2="u2";
    const passhash_2="aaawwwwaad";
    const public_key_2="kkkkaaaaaeeeeeddddcccccssss"

    // Tests for Signing Up User 2 Successfully or not

    it('Signup Successfully for user 2',async()=>{
      const result_2=await cryptodrive.SignUp(user_id_2,passhash_2,public_key_2);
  });

    // Tests to check the pass hash retrived by contract for user 2 matches or not

  it('Retrive Pass Hash for user 2',async()=>{
      const result_2=await cryptodrive.GetPassHash(user_id_2);
      asserted.equal(passhash_2,result_2,"Pass Hash not Retrived Successfully");
  });

    // Tests to check the public Key retrived by contract for user 1 matches or not

  it('Retrive the Public Key for user 2',async()=>{
      const result_2=await cryptodrive.getPublicKey(user_id_2);
      asserted.equal(public_key_2,result_2,"Public Key not Retrived Successfully");
  });

  // Sender u1 and receiver u2
  // Tests for checking whether the user 1 shared the file sucessfully to user 2 or not

  it('User u1 shares a file with User u2 successfully',async()=>{
    const result_final=await cryptodrive.AddShareFile(user_id_2,filehash,filename,user_id);
  });

  // Tests for checking the user 2 received the file from user 1 or not 

  it('Retrived the file sent by user id u1 to user id u2 successfully',async()=>{
    const result_final=await cryptodrive.GetShareDetails(user_id_2);
    asserted.equal(filehash,result_final[0].filehash,"FileHash which is shared by u1 not retrived successfully");
    asserted.equal(filename,result_final[0].filename,"FileName which is shared by u1 not retrived successfully");
    asserted.equal('u1',result_final[0].sender,"Sender not retrived successfully");

  })
    


  })
})
