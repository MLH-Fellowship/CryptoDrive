import Web3 from "web3";
import data from "../smart_contracts/build/contracts/CryptoDrive";


const loadWeb3=async ()=> {
    if (window.ethereum) {
			window.web3 = new Web3(window.ethereum);
			await window.ethereum.enable();
		}
		if (window.web3) {
			window.web3 = new Web3(window.web3.currentProvider);
		} else {
			window.alert("please use metamask");
		}

  };


const ContractConnect = async () => {
    const CryptoDriveABI = JSON.parse(JSON.stringify(data), "utf8").abi;
    const CryptoDriveAddress = "0x71F0383F6b3888B5cb415e5691486C24f7De0aB3";
    const CryptoDrive = await new window.web3.eth.Contract(
      CryptoDriveABI,
      CryptoDriveAddress
    );
    return CryptoDrive;
  };

const signup=async(contract,username,passhash,publichash)=>{
    const web3=window.web3;
    const account = (await web3.eth.getAccounts())[0];
    const result= await contract.methods.SignUp(username,passhash,publichash).send({from : account});
    return result;
};

const AddFile=async (contract,username,filehash,filename)=>{
    const web3=window.web3;
    const account = (await web3.eth.getAccounts())[0];
    console.log(username,filehash,filename)
    const result= await contract.methods.AddFileHash(username,filehash,filename).send({from : account});
    return result;
};


const AddShareFile=async (contract,receiver,filehasharray)=>{
    const web3=window.web3;
    const account = (await web3.eth.getAccounts())[0];
    const result= await contract.methods.AddShareFile(receiver,filehasharray).send({from : account});
    return result;
};

const GetFileHash=async(contract,username)=>{
    const web3=window.web3;
    const account = (await web3.eth.getAccounts())[0];
    const result= await contract.methods.GetFilehash(username).call();
    console.log(result)
    return result;
};

const GetPassHash=async(contract,username)=>{
    const web3=window.web3;
    const account = (await web3.eth.getAccounts())[0];
    const result= await contract.methods.GetPassHash(username).call();
    return result;
};

const GetPublic=async(contract,username)=>{
    const web3=window.web3;
    const account = (await web3.eth.getAccounts())[0];
    const result= await contract.methods.getPublicKey(username).call();
    return result;
};

const GetShareFiles=async(contract,username)=>{
    const web3=window.web3;
    const account = (await web3.eth.getAccounts())[0];
    const result= await contract.methods.GetShareDetails(username).call();
    console.log(result)
    return result;
};

export {
    loadWeb3,
    ContractConnect,
    signup,
    AddFile,
    AddShareFile,
    GetFileHash,
    GetPassHash,
    GetPublic,
    GetShareFiles
};