pragma solidity ^0.8.0;

contract FungibleToken {
    mapping(address => uint256) public balanceOf;
    address public owner;

    constructor() {
        owner = msg.sender;
    }

    function mint(address _to, uint256 _value) public {
        require(msg.sender == owner, "Only owner can mint tokens.");
        balanceOf[_to] += _value;
    }

    function transfer(address _to, uint256 _value) public {
        require(balanceOf[msg.sender] >= _value, "Not enough tokens.");
        balanceOf[msg.sender] -= _value;
        balanceOf[_to] += _value;
    }
}
