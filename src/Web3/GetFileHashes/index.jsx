const GetFileHash=async(contract,username)=>{
    const web3=window.web3;
    const account = (await web3.eth.getAccounts())[0];
    const result= await contract.methods.GetFilehash(username).call();
    console.log(result)
    return result;
}

export default GetFileHash;