// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract HomieToken is ERC20 {
    constructor() ERC20("Homie", "HOMIE") {
        _mint(msg.sender, 500000 * (10**uint8(decimals())));
    }

    function decimals() public pure override returns (uint8) {
        return 2;
    }
}
