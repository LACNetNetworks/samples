pragma solidity >=0.5.0 <0.7.0;

import "./BaseRelayRecipient.sol";

/**
 * @title Storage
 * @dev Store & retreive value in a variable
 */
contract Storage is BaseRelayRecipient{

    uint256 number;
    address owner;

    constructor() public {
        owner = _msgSender();
    }

    /**
     * @dev Store value in variable
     * @param num value to store
     */
    function store(uint256 num) public {
        number = num;

        emit ValueSeted(_msgSender(),num);
    }

    /**
     * @dev Return value 
     * @return value of 'number'
     */
    function retreive() public view returns (uint256){
        return number;
    }

    function getOwner() public view returns (address){
        return owner;
    }

    event ValueSeted(address sender, uint256 value);
}