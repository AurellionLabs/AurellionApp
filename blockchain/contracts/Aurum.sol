// SPDX-License-Identifier: MIT
import "./Aura.sol";
import "./AuSys.sol";
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
        address nodeAddress;
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
    mapping(address => bytes32[]) ownedNodes;
    mapping(bytes32 => Node) public AllNodes;
    locationContract ausys;
    constructor(locationContract _ausys) {
        ausys = _ausys;
    }
    function getHashedJobId() private returns (bytes32) {
        return keccak256(abi.encode(nodeIdCounter += 1));
    }

    function registerNode(Node memory node) public returns (bytes32 id) {
        id = getHashedJobId();
        AllNodes[id] = node;
        updateOwner(node.owner, id);
    }

    function addItem(
        address itemOwner,
        bytes32 id,
        uint quantity,
        address item,
        bytes memory data
    ) public {
        //add the item to the node
        // data should be a abi.encode of the entire data struct of an asset
        // data should be decoded in the mint function of the desired asset
        //unpack data
        // mint goat tokens to node and have them transferred wherver the package goes
        (bool success, bytes memory result) = item.call(
            abi.encodeWithSignature("mint(adress,bytes)", itemOwner, data)
        );
        AllNodes[id].capacity -= quantity;
        require(success);
        //(bool success, bytes memory result) = addr.call(abi.encodeWithSignature("myFunction(uint,address)", 10, msg.sender));
    }

    //require both parties to sign on item addition
    //create a node package sign function that mints to the node from aura when
    // thhe node succesfully calls hand off
    event eventUpdateOwner(address owner, bytes32 node);

    function updateOwner(address owner, bytes32 node) public {
        AllNodes[node].owner = owner;
        ownedNodes[owner].push(node);
        emit eventUpdateOwner(owner, node);
    }

    event eventUpdateLocation(string location, bytes32 node);

    function updateLocation(string memory location, bytes32 node) public {
        AllNodes[node].location = location;
        emit eventUpdateLocation(location, node);
    }

    event eventUpdateStatus(bytes1 status, bytes32 node);

    function updateStatus(bytes1 status, bytes32 node) public {
        AllNodes[node].status = status;
        emit eventUpdateStatus(status, node);
    }

    event eventUpdateSupportedAssets(string[] supportedAssets, bytes32 node);

    function updateSupportedAssets(
        string[] memory supportedAssets,
        bytes32 node
    ) public {
        AllNodes[node].supportedAssets = supportedAssets;
        emit eventUpdateSupportedAssets(supportedAssets, node);
    }

    function nodeHandoff(
        address driver,
        address reciever,
        bytes32 id
    ) public {
        ausys.handOff(driver,reciever,id);
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

contract aurumNode{
    address public owner;
    locationContract ausys;
    constructor(address _owner, locationContract _ausys){
        owner = _owner;
        ausys = _ausys;
        
    }
    function nodeHandoff(
        address driver,
        address reciever,
        bytes32 id
    ) public {
        ausys.handOff(driver,reciever,id);
        //implement node tax (so take a cut from the protocol fee and)
        // job creator has to pay this (if job creator is a node he only has to pay the burnt part)
    }
}

