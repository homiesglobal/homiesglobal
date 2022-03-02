import { ethers } from "hardhat";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { expect } from "chai";
import { BigNumber } from "ethers";

describe.only("Airdrop contract", async function () {
  let addr1: SignerWithAddress;
  let addr3: SignerWithAddress;

  before(async () => {
    [addr1, addr3] = await ethers.getSigners();
  });

  // only admin should add recipient
  it("Should able to add recipient", async function () {
    const amount = BigNumber.from(2000);
    const HomieToken = await ethers.getContractFactory("HomieToken");
    const homieToken = await HomieToken.deploy();
    await homieToken.deployed();
    const Airdrop = await ethers.getContractFactory("AirDrop");
    const airdrop = await Airdrop.deploy(homieToken.address, amount);
    await airdrop.deployed();

    await airdrop.addRecipient(addr1.address);
    console.log("Ask Talabi...");
    const allowed = airdrop.allowed;
    const isExist = await allowed(addr1.address);
    const notExist = await allowed(addr3.address);
    // eslint-disable-next-line no-unused-expressions
    expect(isExist).to.be.true;
    // eslint-disable-next-line no-unused-expressions
    expect(notExist).to.be.false;
  });

  // should not claim token more than once
  it("should not claim token more than once", async function () {
    const amount = BigNumber.from(2000);
    const HomieToken = await ethers.getContractFactory("HomieToken");
    const homieToken = await HomieToken.deploy();
    await homieToken.deployed();
    const Airdrop = await ethers.getContractFactory("AirDrop");
    const airdrop = await Airdrop.deploy(homieToken.address, amount);
    await airdrop.deployed();

    // send money to contract
    homieToken.transfer(airdrop.address, BigNumber.from(50000000));

    await airdrop.addRecipient(addr1.address);
    await airdrop.connect(addr1).claimToken();

    await expect(airdrop.connect(addr1).claimToken()).to.be.revertedWith(
      "tokens have been claimed"
    );
    expect(await homieToken.balanceOf(addr1.address)).to.equal(amount);
  });
});
