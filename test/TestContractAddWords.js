var Keepwrite = artifacts.require("Keepwrite");

contract('Keepwrite', function(accounts) {
  it("Adding words increases the contract balance", function() {
    return Keepwrite.deployed().then(function(instance) {
    	instance.addWords(guid(), guid(), {'value': 10000});
    	return instance;
    }).then(function(instance) {
    	return instance.getContractBalance.call();
    }).then(function(contractBalance) {
    	assert.equal(contractBalance, 10000, "Contract balance should have increased");
    });
  });
  
  it("Adding words adds to map", function() {
  	var first = null;
    return Keepwrite.deployed().then(function(instance) {
    	first = guid()
    	instance.addWords(first, guid(), {'value': 10000});
    	return instance;
    }).then(function(instance) {
    	return instance.containsWords(first);
    }).then(function(contains) {
    	assert.equal(contains, true, "Words should exist");
    });
  });
  
  it("Unadded words do not exist", function() {
    return Keepwrite.deployed().then(function(instance) {
    	return instance.containsWords('e');
    }).then(function(contains) {
    	assert.equal(contains, false, "Words should not exist");
    });
  });
  
});

/**
Create a random looking fake guid
*/
function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
    s4() + '-' + s4() + s4() + s4();
}