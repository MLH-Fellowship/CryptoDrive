const CryptoDrive = artifacts.require("CryptoDrive");

// Module used to migrate the cryptodrive smart contract
module.exports = function (deployer) {
  deployer.deploy(CryptoDrive);
};
