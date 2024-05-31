// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;
contract AuraNode{
    struct Node{
        string location;
        address owner;
        string[] supportedAssets;
        bytes active ;
    }
    uint public jobIdCounter = 0;
    mapping(address=>bytes32[]) ownedNodes;
    mapping(bytes32 => Node) AllNodes;
    function registerNode(Node memory node) public returns(bytes32 id){            
        id = getHashedJobId();
        AllNodes[id] = node;
        updateOwner(node.owner,id);
    }     
    function updateOwner(address owner,bytes32 node) public {
        AllNodes[node].owner = owner;
        ownedNodes[owner].push(node);
    } 
    function getHashedJobId() private returns (bytes32) {
        return keccak256(abi.encode(jobIdCounter += 1));
    }
}

