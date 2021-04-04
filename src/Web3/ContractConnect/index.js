import data from "./../../smart_contracts/build/contracts/CryptoDrive";
const CryptoDriveABI = JSON.parse(JSON.stringify(data), "utf8").abi;
const CryptoDriveAddress = "0x71F0383F6b3888B5cb415e5691486C24f7De0aB3";

const ContractConnect = async () => {
  const CryptoDrive = await new window.web3.eth.Contract(
    CryptoDriveABI,
    CryptoDriveAddress
  );
  return CryptoDrive;
};

export default ContractConnect;
