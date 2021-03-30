const signup=async(contract,username,passhash,publichash)=>{
    const web3=window.web3;
    const account = (await web3.eth.getAccounts())[0];
    const result= await contract.methods.SignUp(username,passhash,publichash).send({from : account});
    return result;
}

module.exports = signup;