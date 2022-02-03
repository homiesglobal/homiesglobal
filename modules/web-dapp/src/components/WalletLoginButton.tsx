import React, { useCallback, useEffect, useState } from "react";
import { Button } from "antd";
import { useWeb3React } from "@web3-react/core";
import { SelectWalletDialog } from "./Wallet/SelectWalletDialog";

export const WalletLoginButton: React.FC = () => {
  const { deactivate, active: connected, account } = useWeb3React();
  const [showWalletSelection, setShowWalletSelection] = useState(false);

  useEffect(() => {
    if (connected) {
      setShowWalletSelection(false);
    }
  }, [connected]);

  const onConnectWalletClicked = useCallback(async () => {
    setShowWalletSelection(true);
  }, [setShowWalletSelection]);

  const onCloseWalletDialog = useCallback(() => {
    setShowWalletSelection(false);
  }, [setShowWalletSelection]);

  const onDisconnectWalletClicked = useCallback(async () => {
    try {
      await deactivate();
    } catch (e) {
      console.error(e);
    }
  }, [deactivate]);

  return (
    <>
      <SelectWalletDialog
        visible={showWalletSelection}
        onClose={onCloseWalletDialog}
      />
      {!connected && (
        <Button type="primary" onClick={onConnectWalletClicked}>
          Connect Wallet
        </Button>
      )}
      {connected && (
        <>
          <span>{account}</span>
          <Button onClick={onDisconnectWalletClicked} danger>
            Log Out
          </Button>
        </>
      )}
    </>
  );
};
