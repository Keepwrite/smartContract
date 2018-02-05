var Migrations = artifacts.require("./Migrations.sol");
var Keepwrite = artifacts.require("./Keepwrite.sol");

module.exports = function(deployer) {
  deployer.deploy(Migrations);
  deployer.deploy(Keepwrite);
};
