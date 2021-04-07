import Web3 from "web3";
import data from "./contractABI";

// Function LoadWeb3 used to laod the web3 in the browser and checking whether the web3 has etheruem access or not
// If not it returns a alert stating the metamask is not present

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

// Function COntractCOnnect used to connect the smart contract and the web3 provider like metamask

const ContractConnect = async () => {
    const CryptoDriveABI = JSON.parse(JSON.stringify(data), "utf8").abi;
    const CryptoDriveAddress = "0x71F0383F6b3888B5cb415e5691486C24f7De0aB3";
    const CryptoDrive = await new window.web3.eth.Contract(
      CryptoDriveABI,
      CryptoDriveAddress
    );
    return CryptoDrive;
  };

// Function SignUp is used to store the username,passhash,publichash to the smart contract to register the particular user

const signup=async(contract,username,passhash,publichash)=>{
    const web3=window.web3;
    const account = (await web3.eth.getAccounts())[0];
    const result= await contract.methods.SignUp(username,passhash,publichash).send({from : account});
    return result;
};

// Function AddFile is used to store the filename and filehash of the uploaded file in ipfs and storing in Smart Contract Array linked with key as username

const AddFile=async (contract,username,filehash,filename)=>{
    const web3=window.web3;
    const account = (await web3.eth.getAccounts())[0];
    const result= await contract.methods.AddFileHash(username,filehash,filename).send({from : account});
    return result;
};

// Function AddShareFile used to add the shared details for the file shared like receiver username, sender username, filehash shared and filename uploaded

const AddShareFile=async (contract,receiver,filehasharray)=>{
    const web3=window.web3;
    const account = (await web3.eth.getAccounts())[0];
    const result= await contract.methods.AddShareFile(receiver,filehasharray).send({from : account});
    return result;
};

// Function to get the file hash by taking username as input

const GetFileHash=async(contract,username)=>{
    const result= await contract.methods.GetFilehash(username).call();
    return result;
};

// Function to get the pass hash by taking the username as input

const GetPassHash=async(contract,username)=>{
    const result= await contract.methods.GetPassHash(username).call();
    return result;
};

// Function to get the public key by taking the username as input
const GetPublic=async(contract,username)=>{
    const result= await contract.methods.getPublicKey(username).call();
    return result;
};

// Function to get the shared files list for a particular user by taking the username as input

const GetShareFiles=async(contract,username)=>{
    const result= await contract.methods.GetShareDetails(username).call();
    return result;
};

// Exporting all the functions

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