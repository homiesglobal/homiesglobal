import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  Grid,
  IconButton,
  Stack,
  styled,
  Tooltip,
  Typography,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useWeb3React } from "@web3-react/core";
import { Redirect } from "react-router";
import { useHistory } from "react-router-dom";
import { AppRoute } from "../../config/routes";

const Modal = styled(Card)(({ theme }) => ({
  borderRadius: theme.spacing(2),
  minHeight: theme.spacing(20),
  marginTop: theme.spacing(20),
}));

const Account = styled(Typography)(({ theme }) => ({
  fontSize: theme.spacing(2),
  fontWeight: 700,
}));

// LoggedInModal displays a centered modal with the users connected wallet
// displayed in it's header. If no connected wallet, it redirect user back
// to the homepage.
export const LoggedInModal: React.FC = ({ children }) => {
  const history = useHistory();
  const { active, account } = useWeb3React();
  if (!active) {
    return <Redirect to={AppRoute.ConnectWallet} />;
  }

  return (
    <Grid container>
      <Grid item xs={1} md={3} />
      <Grid item xs={10} md={6}>
        <Modal>
          <CardHeader
            title={
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                spacing={2}
              >
                <IconButton onClick={() => history.goBack()}>
                  <ArrowBackIcon fontSize="large" />
                </IconButton>
                <Tooltip title={account}>
                  <Account>({account.substring(0, 5)}......)</Account>
                </Tooltip>
              </Stack>
            }
          />
          <CardContent>{children}</CardContent>
        </Modal>
      </Grid>
    </Grid>
  );
};
