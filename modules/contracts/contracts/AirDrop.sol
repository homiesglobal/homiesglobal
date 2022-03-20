//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "hardhat/console.sol";

contract AirDrop {
    mapping(address => bool) public allowed;
    mapping(address => bool) public claims;
    address public admin;
    uint256 public amountToBeClaimed;

    modifier onlyOwner() {
        require(msg.sender == admin, "only admin can call function");
        _;
    }

    event TokenClaimed(address indexed recipient);
    event RecipientAdded(address indexed recipient);

    IERC20 private homieToken;

    constructor(address _tokenAddress, uint256 _amountToBeClaimed) {
        homieToken = IERC20(_tokenAddress);
        amountToBeClaimed = _amountToBeClaimed;
        admin = msg.sender;
    }

    function addRecipient(address recipient) external onlyOwner {
        _addRecipient(recipient);
    }

    function addRecipients(address[] calldata recipients) external onlyOwner {
        for (uint256 i = 0; i < recipients.length; i++) {
            _addRecipient(recipients[i]);
        }
    }

    function _addRecipient(address recipient) private {
        allowed[recipient] = true;
        emit RecipientAdded(recipient);
    }

    function claimToken() public {
        require(allowed[msg.sender], "only allowed address");
        require(!claims[msg.sender], "tokens have been claimed");
        // this prevents recipient from claiming token more than once

        uint256 airdropBalance = homieToken.balanceOf(address(this));
        require(airdropBalance >= amountToBeClaimed, "airdrop balance low");
        claims[msg.sender] = true;

        require(
            homieToken.transfer(msg.sender, amountToBeClaimed),
            "airdrop transfer failed"
        );
        emit TokenClaimed(msg.sender);
    }
}
