import { InjectedConnector } from "@web3-react/injected-connector";
import { WalletConnectConnector } from "@web3-react/walletconnect-connector";
import { LocalNetworkParams, NetworkByChainId } from "./networks";

// allows us to configure the supported network for the dapp via environment variables
// and defaults to the local hardhart networks configuration
export const SupportedChainId = process.env.REACT_APP_SUPPORTED_CHAIN_ID
  ? Number.parseInt(process.env.REACT_APP_SUPPORTED_CHAIN_ID, 10)
  : LocalNetworkParams.chainId;

// injected connector attempts to resolves any browser wallet injected providers.
// This is typically used in conjuction with the useWeb3React hook
export const injected = new InjectedConnector({
  supportedChainIds: [SupportedChainId],
});

export const walletConnect = new WalletConnectConnector({
  rpc: { [SupportedChainId]: NetworkByChainId[SupportedChainId].rpcUrls[0] },
  supportedChainIds: [SupportedChainId],
  bridge: "https://bridge.walletconnect.org",
  qrcode: true,
});
