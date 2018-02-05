pragma solidity 0.4.19;

/*
Keepwrite
*/
contract Keepwrite {
    
    // MARK:- Structs
    
    struct Words {
 	    bytes32 wordsHash;  // Words Hash
 	    bytes32 jsonHash;   // JSON Hash
 	    bool exists;        // Exists
    }

	// MARK:- Modifiers

    /*
    Is the actor the owner of this contract?
    */
    modifier isOwner() {
        require(msg.sender == owner);
        _;
    }
    
    /*
    Is the actor part of the admin group, or are they the owner?
    */
    modifier isAdminGroupOwnerOrCreator(address _creatorAddress) {
        require(containsAdmin(msg.sender) || msg.sender == owner || msg.sender == _creatorAddress);
        _;
    }

	// MARK:- Properties
	
	uint constant version = 1;                  // Version
	uint256 contractBalance = 0;				// Contract balance
	address owner;                              // Creator of the contract
	mapping(bytes32 => Words) words; 			// Words
	mapping(address => address) administrators; // Administrators
    
    // MARK:- Events
	event AdminAdded(address _adminAddress);
	event AdminDeleted(address _adminAddress);
	event WordsAdded(address _fromAddress, bytes32 _wordsHash);

    // MARK:- Methods
    
    /*
    Constructor
    */
    function Keepwrite() public {
       owner = msg.sender;
    } 
    
    /*
	Get contract owner
	*/
	function getOwner() public constant returns (address) {
		return owner;
	}
    
    /*
	Get contract version
	*/
	function getVersion() public constant returns (uint) {
		return version;
	}
	
	/*
	Get contract balance
	*/
	function getContractBalance() public constant returns (uint256) {
		return contractBalance;
	}
        
    // MARK:- Admin
    
    /*
    Add an administrator
    */
    function addAdmin(address _adminAddress) public isOwner {
        administrators[_adminAddress] = _adminAddress;
        AdminAdded(_adminAddress);
    }
    
    /*
    Delete an administrator
    */
    function deleteAdmin(address _adminAddress) public isOwner {
        delete administrators[_adminAddress];
        AdminDeleted(_adminAddress);
    }
    
    /*
    Check if an address is an administrator
    */
    function containsAdmin(address _adminAddress) public constant returns (bool) {
        return administrators[_adminAddress] != 0;
    }
    
    /*
    Transfer funds out of contract
    */
    function moveFunds(address _toAddress, uint256 value) public isOwner {
    	contractBalance -= value;
        _toAddress.transfer(value);
    }
    
    /*
    Add words
    */
    function addWords(bytes32 _wordsHash, bytes32 _jsonHash) public payable {
        
        // Ensure words not already created
        require(words[_wordsHash].exists == false);
        
        contractBalance += msg.value;
        
        // Create words
        var word = Words(_wordsHash, _jsonHash, true);
        words[_wordsHash] = word;

        WordsAdded(msg.sender, _wordsHash);
    }
    
    /*
    Check if words exist
    */
    function containsWords(bytes32 _wordsHash) public constant returns (bool) {
    	var word = words[_wordsHash];
        return word.exists;
    }
    
    function() public payable {
    }
    
}
