// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract HomieToken is ERC20, Ownable {
    constructor() ERC20("Homie", "HOMIE") Ownable() {
        _mint(msg.sender, 500000 * (10**uint8(decimals())));
    }

    function decimals() public pure override returns (uint8) {
        return 2;
    }

    function withdrawEth() public onlyOwner {
        payable(owner()).transfer(address(this).balance);
    }
}
