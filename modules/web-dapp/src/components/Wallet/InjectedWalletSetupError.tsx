import React from "react";
import { Row } from "antd";
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
      <Row>Try adding the following network to your Browser Wallet:</Row>
      <Row style={styles.codeBlock}>
        <pre>
          {JSON.stringify(networkToWalletAddChainParams(network), null, 1)}
        </pre>
      </Row>
    </div>
  );
};
