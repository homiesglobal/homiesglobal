# HOMIE Experiment

This is the main code repository for the Homiesglobal social crypto experiment.

## Project Structure

This project is largely a mono repository that is using the [npm workspaces](https://docs.npmjs.com/cli/v7/using-npm/workspaces) feature
to manage the different aspects of the repository.
Currently, these various aspects (or services) be found in the `/modules` directory and any shared assets or components 
will be put in the `/shared/` directory.

Here are the modules:
1. `/contracts`: Contains smart contract code, tests and build logic.
2. `/web-dapp`: Contains frontend react code for the web app.

View each of the modules README to understand more about how they work.


## Development Guide

Guide on getting started and contributing to the codebase.
There will be more specific details about each module in their own readme, so be sure to check those
after going through the list below.

### 1. Requirements

The following dependencies are required to successfully run this codebase project:

1. Node.js `>= 12.0.0`. You can visit [here](https://nodejs.org/en/download/) to install on your computer. 
For easier control on your Node.js installation versions, I recommend you use [NVM to install](https://github.com/nvm-sh/nvm#installing-and-updating) node.js. 


### 2. Setup

After cloning the repository. Run the following command to install all dependencies:

```shell
npm install
```

Now you are setup to start running aspects of the project.

### 2. Running the whole platform

> TODO: npm run dev

### 3. Running tests

Running the following command should run tests across all the modules:

```shell
npm run test
```

## LICENSE

MIT
