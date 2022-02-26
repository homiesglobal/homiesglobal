import React from "react";
import { Col, Modal, Row } from "antd";
import Icon from "@ant-design/icons";
import { Button } from "@mui/material";
import { useConnectWallet } from "../../hooks/useConnectWallet";
import { InjectectedWalletSetupError } from "./InjectedWalletSetupError";
import styles from "./SelectWalletDialog.module.css";
import { WalletIcon } from "../Icons/WalletIcon";
import { MetamaskIcon } from "../Icons/MetamaskIcon";
import { WalletConnectIcon } from "../Icons/WalletConnectIcon";
import { CloseIcon } from "../Icons/CloseIcon";
import { injected, walletConnect } from "../../config/connectors";

interface Props {
  visible: boolean;
  onClose?: () => void;
}

export const SelectWalletDialog: React.FC<Props> = ({ visible, onClose }) => {
  let unsupportedNetworkModal;
  const { onConnectToWallet: onInjectedWalletClicked } = useConnectWallet(
    injected,
    {
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
    }
  );

  const { onConnectToWallet: onWalletConnectClicked } = useConnectWallet(
    walletConnect,
    {
      onWrongChainId: (supportedNetwork) => {
        unsupportedNetworkModal = Modal.warn({
          title: "Unsupported Chain",
          content: `Your account is on the wrong network. This dapp requires a (${supportedNetwork.chainName} account.`,
        });
      },
    }
  );

  return (
    <Modal
      title={
        <>
          <WalletIcon /> Select a Wallet
        </>
      }
      centered
      visible={visible}
      onCancel={onClose}
      closeIcon={<Icon component={CloseIcon} />}
      maskClosable={false}
      mask={false}
      footer={null}
    >
      <Row>
        <Col>
          <p className={styles.instruction}>
            Please connect a wallet to this dapp
          </p>
        </Col>
      </Row>
      <Row gutter={[8, 16]} className={styles.walletSection}>
        <Col md={{ span: 12 }} sm={{ span: 24 }}>
          <Button
            startIcon={<Icon component={MetamaskIcon} />}
            onClick={onInjectedWalletClicked}
          >
            Metamask
          </Button>
        </Col>
        <Col md={{ span: 12 }} sm={{ span: 24 }}>
          <Button
            startIcon={<Icon component={WalletConnectIcon} />}
            onClick={onWalletConnectClicked}
          >
            WalletConnect
          </Button>
        </Col>
      </Row>
    </Modal>
  );
};
