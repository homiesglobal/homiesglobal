import { ethers } from "hardhat";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { expect } from "chai";
import { BigNumber } from "ethers";
import { AirDrop, HomieToken } from "..";

describe("Airdrop contract", async function () {
  let owner: SignerWithAddress;
  let addr1: SignerWithAddress;
  let addr2: SignerWithAddress;
  let addr3: SignerWithAddress;
  let airdrop: AirDrop;
  let homieToken: HomieToken;
  let amountToClaim: BigNumber;
  let totalAirdropTokens: BigNumber;

  before(async () => {
    [owner, addr1, addr2, addr3] = await ethers.getSigners();
  });

  beforeEach(async () => {
    amountToClaim = BigNumber.from(2000);

    const HomieToken = await ethers.getContractFactory("HomieToken");
    homieToken = await HomieToken.deploy();
    await homieToken.deployed();

    const Airdrop = await ethers.getContractFactory("AirDrop");
    airdrop = await Airdrop.deploy(homieToken.address, amountToClaim);
    await airdrop.deployed();

    // send money to contract
    totalAirdropTokens = BigNumber.from(50000000);
    await homieToken.transfer(airdrop.address, totalAirdropTokens);
  });

  // only admin should add recipient
  it("Should able to add recipient", async function () {
    await expect(airdrop.addRecipient(addr1.address))
      .to.emit(airdrop, "RecipientAdded")
      .withArgs(addr1.address);

    const allowed = airdrop.allowed;
    const isExist = await allowed(addr1.address);
    const notExist = await allowed(addr3.address);

    expect(isExist).to.be.true;
    expect(notExist).to.be.false;
  });

  it("should be able to add multiple recipients", async () => {
    await expect(airdrop.addRecipients([addr1.address, addr2.address]))
      .to.emit(airdrop, "RecipientAdded")
      .withArgs(addr1.address)
      .emit(airdrop, "RecipientAdded")
      .withArgs(addr2.address);

    expect(await airdrop.allowed(addr1.address)).to.be.true;
    expect(await airdrop.allowed(addr2.address)).to.be.true;
    expect(await airdrop.allowed(addr3.address)).to.be.false;
  });

  // should not claim token more than once
  it("should not claim token more than once", async function () {
    await airdrop.addRecipient(addr1.address);
    await airdrop.connect(addr1).claimToken();

    await expect(airdrop.connect(addr1).claimToken()).to.be.revertedWith(
      "tokens have been claimed"
    );
    expect(await homieToken.balanceOf(addr1.address)).to.equal(amountToClaim);
  });

  it("can revert tokens back to admin", async () => {
    await airdrop.revertTokensToAdmin(true);

    expect(await homieToken.balanceOf(airdrop.address)).to.equal(0);
    expect(await homieToken.balanceOf(owner.address)).to.equal(
      totalAirdropTokens
    );
  });
});
