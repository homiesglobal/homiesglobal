//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract AirDrop {
    mapping (address=>bool) allowed;
    mapping (address=>bool) claims;
    address public admin;
    uint256 amountToBeClaimed;

    modifier onlyAdmin() {
        require(msg.sender == admin, "only admin can call function");
        _;
    }

    event tokenClaimed(address indexed recipient, string message);
    event recipientAdded(address recipient, string message);

    IERC20 homieToken;

    constructor(address _tokenAddress) {
        homieToken = IERC20(_tokenAddress);
        admin == msg.sender;
    }

    function AddRecipient(address recipient) public onlyAdmin {
        allowed[recipient] = true;
        emit recipientAdded(recipient, "recipient added");
    }

    function setAmountToBeClaimed(uint256 amount) external onlyAdmin {
        amountToBeClaimed = amount;
    }

    function ClaimToken(address recipient) public payable {
        require(!allowed[recipient], "only allowed address");
        require(claims[recipient], "tokens have been claimed");
        // this prevents recipient from claiming token more than once
        allowed[recipient] = false;
        claims[recipient] = true;
        homieToken.transferFrom(msg.sender, recipient, amountToBeClaimed);
        emit tokenClaimed(recipient, "claimed token");
    }

}