// Default Address when deployed through hardhats local accounts via the `npx hardhat run --network localhost` command
const DefaultLocalGreeterContractAddress =
  "0x5FbDB2315678afecb367f032d93F642f64180aa3";

const DefaultLocalAirdropContractAddress =
  "0x9fe46736679d2d9a65f0992f2272de9f3c7fa6e0";

export const GreeterContractAddress =
  process.env.REACT_APP_GREETER_CONTRACT_ADDRESS ||
  DefaultLocalGreeterContractAddress;

export const AirdropContractAddress =
  process.env.REACT_APP_AIRDROP_CONTRACT_ADDRESS ||
  DefaultLocalAirdropContractAddress;
