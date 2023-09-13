// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Points is ERC20, Ownable {
    uint256 public constant INITIAL_SUPPLY = 1000000 * (10 ** uint256(18));  // 1 million points
    uint256 public constant ETH_TO_USD = 163249;  // 1ETH = $1632.49

    constructor() ERC20("Points", "PTS") {
        _mint(msg.sender, INITIAL_SUPPLY);
    }

    uint256 private ptsPriceInCents = 1; // 1 PTS = $0.001

    function setPTSPriceInCents(uint256 _priceInCents) external {
        ptsPriceInCents = _priceInCents;
    }

    function getCurrentPrice() external view returns (uint256) {
        return ETH_TO_USD / ptsPriceInCents;
    }

    function addPointsToAddress(address _recipient, uint256 _amount) external onlyOwner {
        _mint(_recipient, _amount);
    }

    function removePointsFromAddress(address _recipient, uint256 _amount) external onlyOwner {
        _burn(_recipient, _amount);
    }
}
