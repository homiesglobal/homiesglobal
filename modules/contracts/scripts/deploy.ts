// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
import { BigNumber } from "ethers";
import { ethers } from "hardhat";

async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');

  // NOTE: Do not delete the Greeter contract
  // AND Kindly ensure this is always the first contract to be deployed, so the
  // address of the contract deployed to hardhats local console never changes.
  const Greeter = await ethers.getContractFactory("Greeter");
  const greeter = await Greeter.deploy("Hello, HOMIE!");

  const HomieToken = await ethers.getContractFactory("HomieToken");
  const homieToken = await HomieToken.deploy();

  await greeter.deployed();
  await homieToken.deployed();

  const Airdrop = await ethers.getContractFactory("AirDrop");

  // cannot remember the actual amount to be claimed
  // we're 39 on the homies group so...
  const airdrop = await Airdrop.deploy(
    homieToken.address,
    BigNumber.from(500000)
  );

  await airdrop.deployed();
  // transfer to airdrop address on deployment
  // total supplyof token is 50000000
  homieToken.transfer(airdrop.address, BigNumber.from(25000000));

  console.log("Greeter deployed to:", greeter.address);
  console.log("HomieToken deployed to:", homieToken.address);
  console.log("Airdrop deployed to:", airdrop.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
