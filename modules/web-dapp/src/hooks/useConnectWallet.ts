import { useCallback } from "react";
import { UnsupportedChainIdError, useWeb3React } from "@web3-react/core";
import { AbstractConnector } from "@web3-react/abstract-connector";
import { SupportedChainId } from "../config/connectors";
import {
  NetworkByChainId,
  NetworkParams,
  networkToWalletAddChainParams,
} from "../config/networks";

interface UseConnectWallet {
  onConnectToWallet: () => void;
  walletConnected: boolean;
}

interface Params {
  onWrongChainId: (supportedNetwork: NetworkParams) => void;
  onChainSetupError?: (supportedNetwork: NetworkParams, error: Error) => void;
}

const trySetupSupportedNetwork = (
  connector: AbstractConnector,
  supportedNetwork: NetworkParams,
  onChainSetupError: (net: NetworkParams, error: Error) => void
) => {
  connector.getProvider().then((provider) => {
    provider
      .request({
        method: "wallet_addEthereumChain",
        params: [networkToWalletAddChainParams(supportedNetwork)],
      })
      .catch((error) => {
        onChainSetupError(supportedNetwork, error);
      });
  });
};

export const useConnectWallet = (
  connector: AbstractConnector,
  { onWrongChainId, onChainSetupError }: Params
): UseConnectWallet => {
  const { activate, active } = useWeb3React();
  const onConnectToWallet = useCallback(async () => {
    try {
      await activate(connector, null, true);
    } catch (e) {
      if (e instanceof UnsupportedChainIdError) {
        const supportedNetwork = NetworkByChainId[SupportedChainId];
        onWrongChainId(supportedNetwork);

        if (onChainSetupError) {
          trySetupSupportedNetwork(
            connector,
            supportedNetwork,
            onChainSetupError
          );
        }
      } else {
        // eslint-disable-next-line no-console
        console.error(e);
      }
    }
  }, [activate, connector]);

  return {
    onConnectToWallet,
    walletConnected: active,
  };
};
