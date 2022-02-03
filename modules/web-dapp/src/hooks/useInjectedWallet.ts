import React, { useCallback } from "react";
import { UnsupportedChainIdError, useWeb3React } from "@web3-react/core";
import { injected, SupportedChainId } from "../config/connectors";
import {
  NetworkByChainId,
  NetworkParams,
  networkToWalletAddChainParams,
} from "../config/networks";

interface UseInjectedWallet {
  onInjectedWalletClicked: () => void;
  walletConnected: boolean;
}

interface Params {
  onWrongChainId: (supportedNetwork: NetworkParams) => void;
  onChainSetupError: (supportedNetwork: NetworkParams, error: Error) => void;
}

const trySetupSupportedNetwork = (
  supportedNetwork: NetworkParams,
  onChainSetupError: (net: NetworkParams, error: Error) => void
) => {
  injected.getProvider().then((provider) => {
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

export const useInjectedWallet = ({
  onWrongChainId,
  onChainSetupError,
}: Params): UseInjectedWallet => {
  const { activate, active } = useWeb3React();
  const onInjectedWalletClicked = useCallback(async () => {
    try {
      await activate(injected, null, true);
    } catch (e) {
      if (e instanceof UnsupportedChainIdError) {
        const supportedNetwork = NetworkByChainId[SupportedChainId];
        onWrongChainId(supportedNetwork);

        trySetupSupportedNetwork(supportedNetwork, onChainSetupError);
      } else {
        console.error(e);
      }
    }
  }, [activate, injected]);

  return {
    onInjectedWalletClicked,
    walletConnected: active,
  };
};
