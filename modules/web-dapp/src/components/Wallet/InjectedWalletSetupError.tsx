import React from "react";
import {
  NetworkParams,
  networkToWalletAddChainParams,
} from "../../config/networks";

const styles = {
  codeBlock: {
    marginTop: "1rem",
  },
};

interface Props {
  network: NetworkParams;
}

export const InjectectedWalletSetupError: React.FC<Props> = ({ network }) => {
  return (
    <div>
      We couldn&apos;t setup the network on your wallet.
      <div>Try adding the following network to your Browser Wallet:</div>
      <div style={styles.codeBlock}>
        <pre>
          {JSON.stringify(networkToWalletAddChainParams(network), null, 1)}
        </pre>
      </div>
    </div>
  );
};
