//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "hardhat/console.sol";

contract AirDrop {
    mapping(address => bool) public allowed;
    mapping(address => bool) claims;
    address public admin;
    uint256 public amountToBeClaimed;

    modifier onlyOwner() {
        require(msg.sender == admin, "only admin can call function");
        _;
    }

    event TokenClaimed(address indexed recipient);
    event RecipientAdded(address recipient);

    IERC20 homieToken;

    constructor(address _tokenAddress, uint256 _amountToBeClaimed) {
        homieToken = IERC20(_tokenAddress);
        amountToBeClaimed = _amountToBeClaimed;
        admin = msg.sender;
    }

    function addRecipient(address recipient) public onlyOwner {
        allowed[recipient] = true;
        emit RecipientAdded(recipient);
    }

    function claimToken() public payable {
        require(allowed[msg.sender], "only allowed address");
        require(!claims[msg.sender], "tokens have been claimed");
        // this prevents recipient from claiming token more than once
        allowed[msg.sender] = true;
        claims[msg.sender] = true;
        uint256 airdropBalance = homieToken.balanceOf(address(this));
        homieToken.allowance(address(this), msg.sender);
        homieToken.approve(address(this), airdropBalance);
        homieToken.transferFrom(address(this), msg.sender, amountToBeClaimed);
        emit TokenClaimed(msg.sender);
    }
}
