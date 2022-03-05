import React from "react";
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  Stack,
  styled,
  Typography,
} from "@mui/material";
import { useConfirm } from "material-ui-confirm";
import { useConnectWallet } from "../../hooks/useConnectWallet";
import { InjectectedWalletSetupError } from "./InjectedWalletSetupError";
import { WalletIcon } from "../Icons/WalletIcon";
import { MetamaskIcon } from "../Icons/MetamaskIcon";
import { WalletConnectIcon } from "../Icons/WalletConnectIcon";
import { CloseIcon } from "../Icons/CloseIcon";
import { injected, walletConnect } from "../../config/connectors";

const WalletButton = styled(Button)({
  fontWeight: 700,
});

const Instruction = styled(Typography)(({ theme }) => ({
  fontSize: theme.spacing(2),
}));

const Title = styled(Typography)(({ theme }) => ({
  fontSize: theme.spacing(1.8),
  fontWeight: 600,
}));

interface Props {
  visible: boolean;
  onClose?: () => void;
}

export const SelectWalletDialog: React.FC<Props> = ({ visible, onClose }) => {
  const confirmModal = useConfirm();
  const { onConnectToWallet: onInjectedWalletClicked } = useConnectWallet(
    injected,
    {
      onWrongChainId: (supportedNetwork) => {
        confirmModal({
          title: "Unsupported Chain",
          content: `Your account is on the wrong network. Will try and add the correct network (${supportedNetwork.chainName} to your wallet.`,
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
        confirmModal(update);
      },
    }
  );

  const { onConnectToWallet: onWalletConnectClicked } = useConnectWallet(
    walletConnect,
    {
      onWrongChainId: (supportedNetwork) => {
        confirmModal({
          title: "Unsupported Chain",
          content: `Your account is on the wrong network. This dapp requires a (${supportedNetwork.chainName} account.`,
        });
      },
    }
  );

  return (
    <Dialog open={visible} onClose={onClose}>
      <DialogTitle>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Title>
            <WalletIcon /> Select a Wallet
          </Title>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Stack>
      </DialogTitle>
      <DialogContent sx={{ marginY: "35px" }}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Instruction>Please connect a wallet to this dapp</Instruction>
          </Grid>
          <Grid item md={6} sm={12}>
            <WalletButton
              startIcon={<MetamaskIcon />}
              onClick={onInjectedWalletClicked}
            >
              Metamask
            </WalletButton>
          </Grid>
          <Grid item md={6} sm={12}>
            <WalletButton
              startIcon={<WalletConnectIcon />}
              onClick={onWalletConnectClicked}
            >
              WalletConnect
            </WalletButton>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
};
