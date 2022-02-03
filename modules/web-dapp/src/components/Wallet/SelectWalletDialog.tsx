import React from "react";
import { Button, Col, Modal, Row, Typography } from "antd";
import MetaMaskIcon from "../../assets/metamask-icon.svg";
import { useInjectedWallet } from "../../hooks/useInjectedWallet";
import { InjectectedWalletSetupError } from "./InjectedWalletSetupError";

const styles = {
  walletSection: {
    margin: "2rem 0",
  },
  walletIcon: {
    width: "1rem",
    height: "1rem",
    margin: "1 1 0 0",
  },
};

interface Props {
  visible: boolean;
  onClose: () => void;
}

export const SelectWalletDialog: React.FC<Props> = ({ visible, onClose }) => {
  let unsupportedNetworkModal;
  const { onInjectedWalletClicked } = useInjectedWallet({
    onWrongChainId: (supportedNetwork) => {
      unsupportedNetworkModal = Modal.warn({
        title: "Unsupported Chain",
        content: `Your account is on the wrong network. We will try and add the correct network (${supportedNetwork.chainName} to your wallet.`,
      });
    },
    onChainSetupError: (supportedNetwork) => {
      const update = {
        title: "Unsupported Chain",
        content: (
          <>
            <InjectectedWalletSetupError network={supportedNetwork} />
          </>
        ),
      };
      unsupportedNetworkModal.update(update);
    },
  });

  return (
    <Modal
      title={<>Select a Wallet</>}
      centered
      visible={visible}
      onCancel={onClose}
      footer={null}
    >
      <Row>
        <Col>
          <Typography>Please connect a wallet to this dApp</Typography>
        </Col>
      </Row>
      <Row style={styles.walletSection}>
        <Col span={12}>
          <Button onClick={onInjectedWalletClicked}>
            <Row align="middle">
              <Col span={4}>
                <img
                  style={styles.walletIcon}
                  src={MetaMaskIcon}
                  title={"Metamask Icon"}
                />{" "}
              </Col>
              <Col span={5} offset={1}>
                Metamask
              </Col>
            </Row>
          </Button>
        </Col>
        <Col span={12}>
          <Button>WalletConnect TBD</Button>
        </Col>
      </Row>
    </Modal>
  );
};
