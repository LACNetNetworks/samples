// SPDX-License-Identifier: Apache-2.0

pragma solidity >0.6.2;

/**
 * A base contract to be inherited by any contract that want to receive relayed transactions
 * A subclass must use "_msgSender()" instead of "msg.sender"
 */
abstract contract BaseRelayRecipient{

    /*
     * Forwarder singleton we accept calls from
     */
    //address internal trustedForwarder = 0xf2940f1Fe83Aac47748c62fc51b8Fc0B6Ebbc060;  //david19
    address internal trustedForwarder = 0xa4B5eE2906090ce2cDbf5dfff944db26f397037D; //local

    /**
     * return the sender of this call.
     * if the call came through our Relay Hub, return the original sender.
     * should be used in the contract anywhere instead of msg.sender
     */
    function _msgSender() internal virtual returns (address sender) {
        bytes memory bytesRelayHub;
        (,bytesRelayHub) = trustedForwarder.call(abi.encodeWithSignature("getRelayHub()"));

        if (msg.sender == abi.decode(bytesRelayHub, (address))){ //sender is RelayHub then return origin sender
            bytes memory bytesSender;
            (,bytesSender) = trustedForwarder.call(abi.encodeWithSignature("getMsgSender()"));
        
            return abi.decode(bytesSender, (address));
        } else { //sender is not RelayHub, so it is another smart contract 
            return msg.sender;
        }
    }
}