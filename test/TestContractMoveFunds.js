var Keepwrite = artifacts.require("Keepwrite");

contract('Keepwrite', function(accounts) {

  it("Move funds", function() {
  	var initial = web3.eth.getBalance(accounts[1]).toNumber();
    return Keepwrite.deployed().then(function(instance) {
    	instance.addWords('c', 'd', {'value': 10000});
    	return instance;
    }).then(function(instance) {
    	instance.moveFunds(accounts[1], 500, {'from': accounts[0]});
    	return instance;
    }).then(function(instance) {
    	return web3.eth.getBalance(accounts[1]).toNumber();
    }).then(function(balance) {
    	assert.equal(balance+initial, 500, "Balance");
    });
  });
  
});
