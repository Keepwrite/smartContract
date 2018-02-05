import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/Keepwrite.sol";

contract TestContractCreation {

  function testOwnerIsOwner() {
    //Keepwrite meta = new Keepwrite();
    Keepwrite meta = Keepwrite(DeployedAddresses.Keepwrite());

    Assert.equal(meta.getOwner(), DeployedAddresses.Keepwrite(), "Owner should be owner");
  }
}