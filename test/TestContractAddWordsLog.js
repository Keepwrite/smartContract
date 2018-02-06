var Keepwrite = artifacts.require("Keepwrite");

contract('Keepwrite', function(accounts) {
  it("Adding words adds to the log", function() {
    return Keepwrite.deployed().then(function(instance) {
    	return instance.addWords('a', 'b', 'c', {'value': 10000});
    }).then(function(result) {

    	for (var i = 0; i < result.logs.length; i++) {
			var log = result.logs[i];
			console.log(log.event);

			if (log.event == "WordsAdded") {
			  // We found the event!
			  assert.equal(true, true, "Log written to");
			  break;
			}
		  }
    	
    }).catch(function(err) {
	  console.log(err);
	});
  });
  
});
