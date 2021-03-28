import data from "./../../smart_contracts/build/contracts/CryptoDrive";
const CryptoDriveABI = JSON.parse(JSON.stringify(data), "utf8").abi;
const CryptoDriveAddress = "0x0ef3e8Fe9251068f73E93BEe1c1Dc9247c803d50";

const ContractConnect = async () => {
  const CryptoDrive = await new window.web3.eth.Contract(
    CryptoDriveABI,
    CryptoDriveAddress
  );
  return CryptoDrive;
};

export default ContractConnect;
