const Migrations = artifacts.require("Migrations");
// Module used to deploy initial transformations
module.exports = function (deployer) {
  deployer.deploy(Migrations);
};
