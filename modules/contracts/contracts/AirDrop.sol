//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "hardhat/console.sol";

contract AirDrop {
    mapping (address=>bool) public allowed;
    mapping (address=>bool) claims;
    address public admin;
    uint256 public amountToBeClaimed;

    modifier onlyOwner() {
        console.log("msg.sender from modifier:::::", msg.sender);
        require(msg.sender == admin, "only admin can call function");
        _;
    }

    event tokenClaimed(address indexed recipient, string message);
    event recipientAdded(address recipient, string message);

    IERC20 homieToken;

    constructor(address _tokenAddress) {
        homieToken = IERC20(_tokenAddress);
        admin = msg.sender;
    }

    function AddRecipient(address recipient) public onlyOwner {
        allowed[recipient] = true;
        emit recipientAdded(recipient, "recipient added");
    }

    function getAmountToBeClaimed() external view returns (uint256) {
        console.log(msg.sender);
        console.log("admin::::", admin);
        require(msg.sender == admin, "msg.sender is not equal admin");
        return amountToBeClaimed;
    }

    function setAmountToBeClaimed(uint256 amount) public onlyOwner {
        amountToBeClaimed = amount;
    }

    function ClaimToken(address recipient) public payable {
        require(allowed[recipient], "only allowed address");
        require(!claims[recipient], "tokens have been claimed");
        // this prevents recipient from claiming token more than once
        allowed[recipient] = true;
        claims[recipient] = true;
        homieToken.transferFrom(msg.sender, recipient, amountToBeClaimed);
        emit tokenClaimed(recipient, "claimed token");
    }

}