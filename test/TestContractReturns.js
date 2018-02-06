var Keepwrite = artifacts.require("Keepwrite");

contract('Keepwrite', function(accounts) {

  it("Should return words for input", function() {
  	var inst = null;
  	var data = 'some data';
    return Keepwrite.deployed().then(function(instance) {
    	inst = instance;
    	console.log("Write: " + data);
    	return instance.addWords("0xff", "0xff", data, {'value': 1000000000, 'from': accounts[6]});
    }).then(function(instance) {
    	console.log(instance.receipt);
    	//return inst.sayHello(); // This works
    	return inst.getWords("0xff"); // This doesn't
    }).then(function(words) {
    	console.log("Words: " + words);
    	assert.equal(words, 'some data', "Words should match");
    });
  });
  
});
