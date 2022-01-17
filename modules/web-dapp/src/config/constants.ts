// Default Address when deployed through hardhats local accounts via the `npx hardhat run --network localhost` command
const DefaultLocalGreeterContractAddress =
  "0x5FbDB2315678afecb367f032d93F642f64180aa3";

export const GreeterContractAddress =
  process.env.REACT_APP_GREETER_CONTRACT_ADDRESS ||
  DefaultLocalGreeterContractAddress;
