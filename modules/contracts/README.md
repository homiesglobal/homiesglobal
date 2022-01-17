# Advanced Sample Hardhat Project

This module contains the smart contract solidity code for the HOMIE projects.

> NOTE: This module was bootstrapped using the [Hardhat](https://hardhat.org/) framework. The readme will be updated soon
> with more project specific information once the project starts.

## 🚀 Quick Start

The quickest way to ensure everything is working is by running the tests in the

```sh
npm run test
```

## Deploying Contracts Locally

Hardhat has the ability to run a local EVM node, that you can deploy contracts to locally for testing.

First, run the local EVM node with:

```shell
npx hardhat node
```
This will start a local node with an rpc endpoint on http://localhost:8545.

Next, to deploy your contract, run the deploy.ts script like:

```shell
npx hardhat run --network localhost scripts/deploy.ts
```

If you've added new solidity smart contract to the `contracts/` directory, then be sure to update the `scripts/deploy.ts` script
to ensure that your new contract is deployed correctly.

## Deploying Contracts to Testnet/Mainnet

> TODO: Add details about deploying to testnet

## Some usefull hardhat commands

Try running some of the following tasks:

```shell
npx hardhat accounts
npx hardhat compile
npx hardhat clean
npx hardhat test
npx hardhat node
npx hardhat help
REPORT_GAS=true npx hardhat test
npx hardhat coverage
npx hardhat run scripts/deploy.ts
TS_NODE_FILES=true npx ts-node scripts/deploy.ts
npx eslint '**/*.{js,ts}'
npx eslint '**/*.{js,ts}' --fix
npx prettier '**/*.{json,sol,md}' --check
npx prettier '**/*.{json,sol,md}' --write
npx solhint 'contracts/**/*.sol'
npx solhint 'contracts/**/*.sol' --fix
```

# Etherscan verification

To try out Etherscan verification, you first need to deploy a contract to an Ethereum network that's supported by Etherscan, such as Ropsten.

In this project, copy the .env.example file to a file named .env, and then edit it to fill in the details. Enter your Etherscan API key, your Ropsten node URL (eg from Alchemy), and the private key of the account which will send the deployment transaction. With a valid .env file in place, first deploy your contract:

```shell
hardhat run --network ropsten scripts/sample-script.ts
```

Then, copy the deployment address and paste it in to replace `DEPLOYED_CONTRACT_ADDRESS` in this command:

```shell
npx hardhat verify --network ropsten DEPLOYED_CONTRACT_ADDRESS "Hello, Hardhat!"
```

# Performance optimizations

For faster runs of your tests and scripts, consider skipping ts-node's type checking by setting the environment variable `TS_NODE_TRANSPILE_ONLY` to `1` in hardhat's environment. For more details see [the documentation](https://hardhat.org/guides/typescript.html#performance-optimizations).
