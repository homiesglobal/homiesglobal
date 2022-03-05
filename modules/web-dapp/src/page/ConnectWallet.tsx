import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useWeb3React } from "@web3-react/core";
import { SelectWalletDialog } from "../components/Wallet/SelectWalletDialog";
import { AppRoute } from "../config/routes";

export const ConnectWallet: React.FC = () => {
  const history = useHistory();
  const { active } = useWeb3React();

  useEffect(() => {
    // watch connected wallet and redirect back to home for now
    if (active) {
      history.replace(AppRoute.ClaimTokens);
    }
  }, [active]);

  return (
    <SelectWalletDialog
      visible={true}
      onClose={() => {
        history.replace(AppRoute.Home);
      }}
    />
  );
};
