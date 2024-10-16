// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract SimpleStorage {
    uint256 private value;

    // 设置值
    function setValue(uint256 _value) public {
        value = _value;
    }

    // 获取值
    function getValue() public view returns (uint256) {
        return value;
    }
}