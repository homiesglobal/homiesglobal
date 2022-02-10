export interface NetworkParams {
  chainId: number;
  chainName: string;
  nativeCurrency: {
    name: string;
    symbol: string;
    decimals: number;
  };
  rpcUrls: string[];
  blockExplorerUrls?: string[];
  isTest: boolean;
}

export const BscMainnetParams: NetworkParams = {
  chainId: 56,
  chainName: "Binance Smart Chain Mainnet",
  nativeCurrency: {
    name: "Binance Coin",
    symbol: "BNB",
    decimals: 18,
  },
  rpcUrls: ["https://bsc-dataseed.binance.org/"],
  blockExplorerUrls: ["https://bscscan.com/"],
  isTest: false,
};

export const BscTestnetParams: NetworkParams = {
  chainId: 97,
  chainName: "Binance Smart Chain Testnet",
  nativeCurrency: {
    name: "Binance Coin",
    symbol: "BNB",
    decimals: 18,
  },
  rpcUrls: ["https://data-seed-prebsc-1-s1.binance.org:8545/"],
  blockExplorerUrls: ["https://testnet.bscscan.com/"],
  isTest: true,
};

export const LocalNetworkParams: NetworkParams = {
  chainId: 31337,
  chainName: "Local Hardhat Network",
  nativeCurrency: { decimals: 18, name: "Ethers", symbol: "ETH" },
  rpcUrls: ["http://localhost:8545/"],
  isTest: true,
};

export const NetworkByChainId = {
  [BscMainnetParams.chainId]: BscMainnetParams,
  [BscTestnetParams.chainId]: BscTestnetParams,
  [LocalNetworkParams.chainId]: LocalNetworkParams,
};

type WalletAddChainParams = Omit<NetworkParams, "isTest" | "chainId"> & {
  chainId: string;
};

// picks parameters required to add network to a wallet provider
export const networkToWalletAddChainParams = (
  network: NetworkParams
): WalletAddChainParams => {
  return {
    chainId: `0x${network.chainId.toString(16)}`,
    chainName: network.chainName,
    nativeCurrency: network.nativeCurrency,
    rpcUrls: network.rpcUrls,
    blockExplorerUrls: network.blockExplorerUrls,
  };
};
