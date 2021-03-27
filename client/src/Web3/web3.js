import Web3 from "web3";
import data from "./../smart_contracts/build/contracts/CryptoDrive";
const CryptoDriveABI = JSON.parse(JSON.stringify(data), "utf8").abi;
const CryptoDriveAddress = "0x0ef3e8Fe9251068f73E93BEe1c1Dc9247c803d50";


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

  }

loadWeb3();

const web3 = window.web3;

export default web3;
