// SPDX-License-Identifier: MIT
import "./Aura.sol";
import "./AuSys.sol";
import "./AuraGoat.sol";
pragma solidity 0.8.17;

contract AurumNodeManager {
    struct Location {
        string lat;
        string lng;
    }
    struct LocationData {
        Location startLocation;
        Location endLocation;
        string startName;
        string endName;

        //add customer?
        //add driver?
        //add box
    }
    struct Node {
        string location;
        //stteal ausys location struct
        address owner;
        string[] supportedAssets;
        bytes1 status;
        uint capacity;
    }
    struct Item {
        string category;
        string subCategory;
        string Type;
    }
    uint public nodeIdCounter = 0;
    mapping(address => address[]) ownedNodes;
    mapping(address => Node) public AllNodes;
    locationContract ausys;
    AuraGoat auraGoat; 
    constructor(locationContract _ausys, AuraGoat _auraGoat) {
        ausys = _ausys;
        auraGoat = _auraGoat;
    }


    function registerNode(Node memory node) public returns (address id) {
        aurumNode NodeContract = new aurumNode(node.owner,ausys,auraGoat);
        AllNodes[address(NodeContract)] = node;
        updateOwner(node.owner, id);
    }

    //require both parties to sign on item addition
    //create a node package sign function that mints to the node from aura when
    // thhe node succesfully calls hand off
    event eventUpdateOwner(address owner, address node);

    function updateOwner(address owner, address node) public {
        AllNodes[node].owner = owner;
        ownedNodes[owner].push(node);
        emit eventUpdateOwner(owner, node);
    }

    event eventUpdateLocation(string location, address node);

    function updateLocation(string memory location, address node) public {
        AllNodes[node].location = location;
        emit eventUpdateLocation(location, node);
    }

    event eventUpdateStatus(bytes1 status, address node);

    function updateStatus(bytes1 status, address node) public {
        AllNodes[node].status = status;
        emit eventUpdateStatus(status, node);
    }

    event eventUpdateSupportedAssets(string[] supportedAssets, address node);

    function updateSupportedAssets(
        string[] memory supportedAssets,
        address node
    ) public {
        AllNodes[node].supportedAssets = supportedAssets;
        emit eventUpdateSupportedAssets(supportedAssets, node);
    }

    function nodeHandoff(address driver, address reciever, bytes32 id) public {
        ausys.handOff(driver, reciever, id);
        //implement node tax (so take a cut from the protocol fee and)
        // job creator has to pay this (if job creator is a node he only has to pay the burnt part)
    }
    //WHENEVER A NODE TRIGGERS HAND OFF IT GETS PAID OUT (WHAT ABOUT LOOPS WHERE PEOPLE SEND THE SAME PKG BACK AND FORTH)
    //capacity
    //handshake
    // add new item (tokenise)
    //mint token with added item so onchain rep
    // erc1155 with unique id for goat grae and multiple stuff in  ID
    //delete item
}

contract aurumNode {
    address public owner;
    locationContract ausys;
    AuraGoat auraGoat;
    constructor(address _owner, locationContract _ausys, AuraGoat _auraGoat) {
        owner = _owner;
        ausys = _ausys;
        auraGoat = _auraGoat;
    }

    function nodeHandoff(address driver, address reciever, bytes32 id) public {
        ausys.handOff(driver, reciever, id);
        //implement node tax (so take a cut from the protocol fee and)
        // job creator has to pay this (if job creator is a node he only has to pay the burnt part)
    }
    function nodeHandOn(address driver, address reciever, bytes32 id) public {
       ausys.handOn(driver, reciever, id);
    }
    function nodeSign(address node, address driver, bytes32 jobid) public {
        ausys.packageSign(address driver,address node,bytes32 jobid)
    }
    function addItem(
        address itemOwner,
        bytes32 id,
        uint weight,
        uint amount,
        address item,
        bytes memory data
    ) public {
        auraGoat.nodeMint(itemOwner, weight, amount, data);
        //add the item to the node
        // data should be a abi.encode of the entire data struct of an asset
        // data should be decoded in the mint function of the desired asset
        //unpack data
        // mint goat tokens to node and have them transferred wherver the package goes
        //(bool success, bytes memory result) = item.call(
        //    abi.encodeWithSignature("mint(adress,bytes)", itemOwner, data)
        //);
   //     AllNodes[id].capacity -= quantity;
        //require(success);
        //(bool success, bytes memory result) = addr.call(abi.encodeWithSignature("myFunction(uint,address)", 10, msg.sender));
    }
}
