const AddShareFile=async (contract,receiver,filehasharray)=>{
    const web3=window.web3;
    const account = (await web3.eth.getAccounts())[0];
    console.log(receiver,filehash,filename,sender)
    const result= await contract.methods.AddShareFile(receiver,filehasharray).send({from : account});
    return result;
};

export default AddShareFile;