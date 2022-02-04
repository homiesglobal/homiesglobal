// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract AirDrop{
    address userAddr;
    mapping (address=>bool) listOfAddr;
    mapping(address => bool) claims;
    constructor(address _data){
      userAddr = _data;   
   }

   function claimToken(address _user )public{
    
       if(listOfAddr[_user] && !claims[_user]){

           emit SuccessEvent(msg.sender, "success", SuccessEventTYPE.CLAIMSUCCESS);
       }

   }

   enum SuccessEventTYPE{CLAIMSUCCESS, ADDSUCCESS, SWAPSUCCESS}

   event SuccessEvent(address indexed _from, string message, SuccessEventTYPE);

}