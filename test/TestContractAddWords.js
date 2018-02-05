var Keepwrite = artifacts.require("Keepwrite");

contract('Keepwrite', function(accounts) {
  it("Adding words increases the contract balance", function() {
    return Keepwrite.deployed().then(function(instance) {
    	instance.addWords('a', 'b', {'value': 10000});
    	return instance;
    }).then(function(instance) {
    	return instance.getContractBalance.call();
    }).then(function(contractBalance) {
    	assert.equal(contractBalance, 10000, "Contract balance should have increased");
    });
  });
  
  it("Adding words adds to map", function() {
    return Keepwrite.deployed().then(function(instance) {
    	instance.addWords('c', 'd', {'value': 10000});
    	return instance;
    }).then(function(instance) {
    	return instance.containsWords('c');
    }).then(function(contains) {
    	assert.equal(contains, true, "Words should exist");
    });
  });
  
});
