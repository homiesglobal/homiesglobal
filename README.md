# HOMIE Experiment

This is the main code repository for the Homiesglobal social crypto experiment.


## Project Structure

This project is largely a mono repository that is using the [npm workspaces](https://docs.npmjs.com/cli/v7/using-npm/workspaces) feature
to manage the different aspects of the repository.
Currently, these various aspects (or services) be found in the `/modules` directory and any shared assets or components 
will be put in the `/shared/` directory.

Here are the modules:
1. `/modules/contracts`:`@homiesglobal/contracts` - Contains smart contract code, tests and build logic.
2. `/modules/web-dapp`:`@homiesglobal/web-dapp` - Contains frontend react code for the web app.

View each of the modules README to understand more about how they work.


## Development Guide

Guide on getting started and contributing to the codebase.
There will be more specific details about each module in their own readme, so be sure to check those
after going through the list below.

### 1. Requirements

The following dependencies are required to successfully run this codebase project:

1. Node.js `>= 16.3.0` and Npm `>= 7.X`. You can visit [here](https://nodejs.org/en/download/) to install on your computer. 
For easier control on your Node.js installation versions, I recommend you use [NVM to install](https://github.com/nvm-sh/nvm#installing-and-updating) node.js. 

### 2. Clone or fork the repository:
```sh
git clone https://github.com/homiesglobal/homiesglobal.git
```

### 3. Install Dependencies and Build Modules

After cloning the repository. Run the following command to install all dependencies:

```shell
npm install
```

Next build all workspace modules. This is recommended at least once each time a fresh copy/commit of the repository is pulled.

```shell
npm run build
```

Now you are set up to start running aspects of the project.

### 4. Running the whole platform locally

First run, the smart contracts deployed to a local network with:

```shell
npm run start -w @homiesglobal/contracts
```

Next, run the dApp web App. In another terminal session run:

```shell
npm run start -w @homiesglobal/web-dapp
```

Now, if you visit: http://localhost:3000, you should be able to access the dApp and interact with the
smart contract through the app.

### 5. Running tests

Running the following command should run tests across all the modules:

```shell
CI=true npm run test
```

## LICENSE

MIT
