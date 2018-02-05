
var Keepwrite = artifacts.require("Keepwrite");

contract('Keepwrite', function(accounts) {
  it("should create a contract and the owner is the creator account", function() {
    return Keepwrite.deployed().then(function(instance) {
    	assert.equal(instance.getOwner(), accounts[0], "Owner should match");
    });
  });
  
  it("should have version 1", function() {
    return Keepwrite.deployed().then(function(instance) {
    	assert.equal(instance.getVersion.call(accounts[0]), 1, "Version 1");
    });
  });
  
});

// contract('Keepwrite', function(accounts) {
//   it("should create a contract and the owner is the creator account", function() {
//     return MetaCoin.deployed().then(function(instance) {
//       return instance.getBalance.call(accounts[0]);
//     }).then(function(balance) {
//       assert.equal(balance.valueOf(), 10000, "10000 wasn't in the first account");
//     });
//   });
// });