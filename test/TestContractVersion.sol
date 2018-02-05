import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/Keepwrite.sol";

contract TestContractVersion {

  function testVersion() {
    //Keepwrite meta = new Keepwrite();
    Keepwrite meta = Keepwrite(DeployedAddresses.Keepwrite());

    Assert.equal(meta.getVersion(), 1, "Should read version");
  }
}