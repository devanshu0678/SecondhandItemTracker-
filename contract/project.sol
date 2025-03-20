// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract SecondhandItemTracker {
    struct Item {
        uint id;
        string name;
        string description;
        address currentOwner;
        address[] previousOwners;
    }

    uint private nextItemId;
    mapping(uint => Item) private items;
    event ItemRegistered(uint id, string name, address owner);
    event OwnershipTransferred(uint id, address from, address to);

    function registerItem(string memory name, string memory description) public {
        uint itemId = nextItemId++;
        items[itemId] = Item({
            id: itemId,
            name: name,
            description: description,
            currentOwner: msg.sender,
            previousOwners: new address[](0)
        });
        emit ItemRegistered(itemId, name, msg.sender);
    }

    function transferOwnership(uint itemId, address newOwner) public {
        require(items[itemId].currentOwner == msg.sender, "Only the owner can transfer ownership");
        items[itemId].previousOwners.push(msg.sender);
        items[itemId].currentOwner = newOwner;
        emit OwnershipTransferred(itemId, msg.sender, newOwner);
    }

    function getItem(uint itemId) public view returns (string memory, string memory, address, address[] memory) {
        require(itemId < nextItemId, "Item does not exist");
        Item storage item = items[itemId];
        return (item.name, item.description, item.currentOwner, item.previousOwners);
    }
}
