import { expect } from "chai";
import { BigNumber, utils } from "ethers";
import { ethers } from "hardhat";

describe("HomieToken deployment", function () {
  it("Should return correct token total supply ", async function () {
    const [owner] = await ethers.getSigners();
    const HomieToken = await ethers.getContractFactory("HomieToken");
    const homieToken = await HomieToken.deploy();
    await homieToken.deployed();

    expect(await homieToken.balanceOf(owner.address)).to.equal(50000000);
  });
});

describe("HomieToken Transaction", function () {
  it("Should return correct balance after transfer of amount", async function () {
    // eslint-disable-next-line no-unused-vars
    const [owner, receiver] = await ethers.getSigners();
    const HomieToken = await ethers.getContractFactory("HomieToken");
    const homieToken = await HomieToken.deploy();
    await homieToken.deployed();

    const receiverBalance = await homieToken.balanceOf(receiver.address);

    // transfer from owner to receiver
    await homieToken.transfer(receiver.address, utils.parseUnits("89", 0));
    // check new balances
    const receiverNewBalance = await homieToken.balanceOf(receiver.address);

    expect(receiverNewBalance).to.equal(
      receiverBalance.add(BigNumber.from(89))
    );
  });
});
