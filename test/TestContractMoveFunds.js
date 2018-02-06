var Keepwrite = artifacts.require("Keepwrite");

contract('Keepwrite', function(accounts) {

  it("Move funds", function() {
  	var initialValue = 0;
  	var inst = null;
    return Keepwrite.deployed().then(function(instance) {
    	inst = instance
    	return web3.eth.getBalance(accounts[1]).toNumber();;
    }).then(function(value) {
    	initialValue = value;
    	console.log("Initial: " + initialValue);
    	const a = guid();
    	const b = guid();
    	return inst.addWords(a, b, 'c', {'value': 11000});
    }).then(function(instance) {
    	return inst.getContractBalance.call();
    }).then(function(contractBalance) {
		console.log("contract balance: " + contractBalance);
    	return inst;
    }).then(function(instance) {
    	return inst.moveFunds(accounts[1], 500, {'from': accounts[0]});
    }).then(function(instance) {
    	//console.log(instance.receipt);
    	return web3.eth.getBalance(accounts[1]).toNumber();
    }).then(function(balance) {
    	console.log("Result: " + balance)
    	assert.equal(balance, 100000000000000000500, "Balance");
    });
  });
  
  it("Can't move funds if not enough ether", function() {
  	var initialValue = 0;
  	var inst = null;
    return Keepwrite.deployed().then(function(instance) {
    	inst = instance
    	return web3.eth.getBalance(accounts[2]).toNumber();
    }).then(function(value) {
    	initialValue = value;
    	console.log("Initial: " + initialValue);
    	const a = guid();
    	const b = guid();
    	return inst.addWords(a, b, 'c', {'value': 11000});
    }).then(function(instance) {
    	return inst.getContractBalance.call();
    }).then(function(contractBalance) {
		console.log("contract balance: " + contractBalance);
    	return inst;
    }).then(function(instance) {
    	return inst.moveFunds(accounts[2], 12000, {'from': accounts[0]});
    }).then(function(instance) {
    	//console.log(instance.receipt);
    	return web3.eth.getBalance(accounts[1]).toNumber();
    }).then(function(balance) {
    	console.log("Result: " + balance)
    	assert.equal(balance, 100000000000000000000, "Balance");
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