import data from "./../../smart_contracts/build/contracts/CryptoDrive";
const CryptoDriveABI = JSON.parse(JSON.stringify(data), "utf8").abi;
const CryptoDriveAddress = "0xcc7d4ca1f3961d2f0C2B0374d59A6e4D3f014560";

const ContractConnect = async () => {
  const CryptoDrive = await new window.web3.eth.Contract(
    CryptoDriveABI,
    CryptoDriveAddress
  );
  return CryptoDrive;
};

export default ContractConnect;
