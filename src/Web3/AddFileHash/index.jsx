const AddFile=async (contract,username,filehash,filename)=>{
    const web3=window.web3;
    const account = (await web3.eth.getAccounts())[0];
    const result= await contract.methods.AddFileHash(username,filehash,filename).send({from : account});
    return result;
};

export default AddFile;