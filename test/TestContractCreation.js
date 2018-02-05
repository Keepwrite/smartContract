var Keepwrite = artifacts.require("Keepwrite");

contract('Keepwrite', function(accounts) {
  it("should create a contract and the owner is the creator account", function() {
    return Keepwrite.deployed().then(function(instance) {
    	return instance.getOwner.call();
    }).then(function(owner) {
    	assert.equal(owner, accounts[0], "Owner should match");
    });
  });

});
