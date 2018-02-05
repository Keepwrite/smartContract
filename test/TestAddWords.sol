import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/Keepwrite.sol";

contract TestAddWords {

  function testAddWords() {
    //Keepwrite meta = new Keepwrite();
    Keepwrite meta = Keepwrite(DeployedAddresses.Keepwrite());
    
    meta.addWords('a', 'b');

    Assert.equal(meta.getVersion(), 1, "Should read version");
  }
}