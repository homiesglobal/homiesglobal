// // import { expect } from "chai";
// import AirdropArtifact from "../artifacts/contracts/AirDrop.sol/AirDrop.json";
// import { deployContract } from "ethereum-waffle";
// import { ethers } from "hardhat";

// describe("Airdrop contract", function () {
//   it.only("Should able to claim token ", async function () {
//     const accounts = await ethers.getSigners();
//     for (const account of accounts) {
//       console.log(account.address);
//     }

//     const HomieToken = await ethers.getContractFactory("HomieToken");
//     const homieToken = await HomieToken.deploy();

//     // const Airdrop = await ethers.getContractFactory("AirDrop");
//     const airdrop = await deployContract(accounts[2], AirdropArtifact, [
//       homieToken.address,
//     ]);

//     const accounts = await ethers.getSigners();
//     for (const account of accounts) {
//       console.log(account.address);
//     }
//     const airdrop = await Airdrop.deploy();
//     await airdrop.deployed();
//     console.log("airdrop deployed at:::::", airdrop.address);

//     await homieToken.deployed();

//     console.log("owner address::::", accounts[0].address);
//     console.log("airdrop deployed at:::::", airdrop.address);
//     console.log("homie deployed at:::::", homieToken.address);

//     await airdrop.connect(accounts[1]).setAmountToBeClaimed(5000000);

//     // send money from token to airdrop address
//     // await homieToken.transfer(airdrop.address, 25000000);
//     // const claimBalance = await homieToken.balanceOf(airdrop.address);
//     // console.log("claim balance:::::::::", claimBalance);
//     // // check balance of recipient before
//     // const recipientBalance = await homieToken.balanceOf(addr.address);
//     // console.log("recipient balance before::::::", recipientBalance);

//     // await airdrop.AddRecipient(addr[3].address);
//     // await airdrop.AddRecipient(addr2);
//     // await airdrop.AddRecipient(addr3);
//     // await airdrop.ClaimToken(addr[3].address);

//     // expect(await homieToken.balanceOf(addr[3].address)).to.equal(25000000);
//   });
// });
