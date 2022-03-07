import {
  Box,
  Button,
  CircularProgress,
  Grid,
  styled,
  Typography,
} from "@mui/material";
import React from "react";
import { useHistory } from "react-router-dom";
import { AppRoute } from "../config/routes";
import { ClaimPageState, useClaimPage } from "../hooks/useClaimPage";

// CenterGrid is a styled mui Grid that centers aligns its
// children center. Useful in this page components.
const CenterGrid = styled(Grid)(() => ({
  textAlign: "center",
}));

const Title = styled(Typography)(() => ({
  fontWeight: 700,
}));

const Message = styled(Typography)(({ theme }) => ({
  fontWeight: 600,
  fontSize: theme.spacing(2),
  lineHeight: theme.spacing(3.813),
}));

const NotEligible: React.FC = () => {
  const history = useHistory();
  return (
    <CenterGrid container spacing={3}>
      <Grid item xs={12}>
        <Title variant="h2">Oops!</Title>
      </Grid>
      <Grid item xs={12}>
        <Message>You are not eligible for this airdrop.</Message>
      </Grid>
      <Grid item xs={12}>
        <Button
          onClick={() => {
            history.push(AppRoute.Home);
          }}
        >
          Back to Home
        </Button>
      </Grid>
    </CenterGrid>
  );
};

const Eligible: React.FC = () => {
  return (
    <CenterGrid container spacing={3}>
      <Grid item xs={12}>
        <Title variant="h2">Congratulations Homie!</Title>
      </Grid>
      <Grid item xs={12}>
        <Message>You are eligible for this airdrop.</Message>
      </Grid>
      <Grid item xs={12}>
        {/* eslint-disable-next-line no-console */}
        <Button onClick={() => console.log}>Continue to Airdrop</Button>
      </Grid>
    </CenterGrid>
  );
};

interface TokenClaimedProps {
  amountClaimed: number;
  symbol: string;
}

const TokenClaimed: React.FC<TokenClaimedProps> = ({
  amountClaimed,
  symbol,
}) => {
  const history = useHistory();
  return (
    <CenterGrid container spacing={3}>
      <Grid item xs={12}>
        <Message>
          Your token of {amountClaimed} {symbol} has been claimed successfully
          and added to your wallet for being a member of the Homies community.
          Use your influence with wisdom.
        </Message>
      </Grid>
      <Grid item xs={12}>
        <Button
          onClick={() => {
            history.push(AppRoute.Home);
          }}
        >
          Go Home
        </Button>
      </Grid>
    </CenterGrid>
  );
};

export const ClaimPage: React.FC = () => {
  const { currentState } = useClaimPage();

  switch (currentState) {
    case ClaimPageState.LoadingState:
      return (
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <CircularProgress />
        </Box>
      );
    case ClaimPageState.NotEligibleState:
      return <NotEligible />;
    case ClaimPageState.EligibleState:
      return <Eligible />;
    case ClaimPageState.TokenClaimedState:
      return <TokenClaimed amountClaimed={5000} symbol="HOMIE" />;
    default:
      return <>Unknown State 😜</>;
  }
};
