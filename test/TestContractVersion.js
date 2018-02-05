var Keepwrite = artifacts.require("Keepwrite");

contract('Keepwrite', function(accounts) {
  it("should have version 1", function() {
    return Keepwrite.deployed().then(function(instance) {
    	return instance.getVersion.call();
    }).then(function(version) {
    	assert.equal(version, 1, "Version 1");
    });
  });
  
});
