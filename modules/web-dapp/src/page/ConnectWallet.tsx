import React, { useEffect } from "react";
import { Row, Col, Modal } from "antd";
import { useHistory } from "react-router-dom";
import { useWeb3React } from "@web3-react/core";
import { SelectWalletDialog } from "../components/Wallet/SelectWalletDialog";
import { AppRoute } from "../config/routes";

export const ConnectWallet: React.FC = () => {
  const history = useHistory();
  const { active, account } = useWeb3React();

  useEffect(() => {
    // watch connected wallet and redirect back to home for now
    if (active) {
      Modal.info({
        content: `Wallet Connected: ${account}`,
      });
      history.replace(AppRoute.Home);
    }
  }, [active]);

  return (
    <Row justify="center">
      <Col sm={{ span: 24 }} md={{ span: 12 }}>
        <SelectWalletDialog
          visible={true}
          onClose={() => {
            history.replace(AppRoute.Home);
          }}
        />
      </Col>
    </Row>
  );
};
