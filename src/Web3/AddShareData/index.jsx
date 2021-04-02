const AddShareFile=async (contract,receiver,filehash,filename,sender)=>{
    const web3=window.web3;
    const account = (await web3.eth.getAccounts())[0];
    console.log(receiver,filehash,filename,sender)
    const result= await contract.methods.AddShareFile(receiver,filehash,filename,sender).send({from : account});
    return result;
};

export default AddShareFile;