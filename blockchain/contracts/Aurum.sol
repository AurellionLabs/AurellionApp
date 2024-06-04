// SPDX-License-Identifier: MIT

pragma solidity 0.8.17;

contract AuraNode {
    struct Node {
        string location;
        //stteal ausys location struct
        address owner;
        string[] supportedAssets;
        bytes1 status;
    }
    uint public nodeIdCounter = 0;
    mapping(address => bytes32[]) ownedNodes;
    mapping(bytes32 => Node) public AllNodes;

    function registerNode(Node memory node) public returns (bytes32 id) {
        id = getHashedJobId();
        AllNodes[id] = node;
        updateOwner(node.owner, id);
    }

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

    function getHashedJobId() private returns (bytes32) {
        return keccak256(abi.encode(nodeIdCounter += 1));
    }

    //capacity
    //handshake
    // add new item (tokenise)
    //mint token with added item so onchain rep
    // erc1155 with unique id for goat grae and multiple stuff in  ID
    //delete item

}
