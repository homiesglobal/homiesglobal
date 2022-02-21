// import { expect } from "chai";
import { ethers } from "hardhat";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { expect } from "chai";

describe.only("Airdrop contract", async function () {
  let owner: SignerWithAddress;
  let addr1: SignerWithAddress;
  let addr2: SignerWithAddress;
  let addr3: SignerWithAddress;

  before(async () => {
    [owner, addr1, addr2, addr3] = await ethers.getSigners();
  });

  // only admin should add user
  it("Should able to claim token", async function () {
    const HomieToken = await ethers.getContractFactory("HomieToken");
    const homieToken = await HomieToken.deploy();
    await homieToken.deployed();
    const Airdrop = await ethers.getContractFactory("AirDrop");
    const airdrop = await Airdrop.deploy(homieToken.address);
    await airdrop.deployed();

    await airdrop.AddRecipient(addr1.address);
    await airdrop.AddRecipient(addr2.address);
    console.log("Ask Talabi...");
    const allowed = airdrop.allowed;
    const isExist = await allowed(addr1.address);
    const notExist = await allowed(addr3.address);
    // eslint-disable-next-line no-unused-expressions
    expect(isExist).to.be.true;
    // eslint-disable-next-line no-unused-expressions
    expect(notExist).to.be.false;
  });

  // only admin should set amount
  it("Should able to set amount to be claimed", async function () {
    const HomieToken = await ethers.getContractFactory("HomieToken");
    const homieToken = await HomieToken.deploy();
    await homieToken.deployed();
    const Airdrop = await ethers.getContractFactory("AirDrop");
    const airdrop = await Airdrop.deploy(homieToken.address);
    await airdrop.deployed();
    let amountToBeClaimed = await airdrop.getAmountToBeClaimed();
    console.log("getAmountToBeClaimed::::::", amountToBeClaimed);

    await airdrop.connect(owner).setAmountToBeClaimed(5000000);
    amountToBeClaimed = await airdrop.getAmountToBeClaimed();

    console.log("getAmountToBeClaimed2::::::", amountToBeClaimed);
    expect(amountToBeClaimed).to.equal(5000000);
  });

  // should not claim token more than once
  it.only("should not claim token more than once", async function () {
    const HomieToken = await ethers.getContractFactory("HomieToken");
    const homieToken = await HomieToken.deploy();
    await homieToken.deployed();
    const Airdrop = await ethers.getContractFactory("AirDrop");
    const airdrop = await Airdrop.deploy(homieToken.address);
    await airdrop.deployed();

    await airdrop.AddRecipient(addr1.address);
    await airdrop.AddRecipient(addr2.address);
    const oldBalance = await homieToken.balanceOf(addr1.address);
    console.log("oldBalance::::", oldBalance);
    await airdrop.connect(addr1).ClaimToken(addr1.address);
    // const amount = await airdrop.amountToBeClaimed;
    // check user balance
    const newBalance = await homieToken.balanceOf(addr1.address);
    console.log("newBalance::::::", newBalance);

    await expect(
      airdrop.connect(addr1).ClaimToken(addr1.address)
    ).to.be.revertedWith("tokens have been claimed");
  });
});
