import {
  Box,
  Button,
  CircularProgress,
  Grid,
  Stack,
  styled,
  Typography,
} from "@mui/material";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import React from "react";
import { useHistory } from "react-router-dom";
import { AppRoute } from "../config/routes";
import { ClaimPageState, useClaimPage } from "../hooks/useClaimPage";
import { tokenValue } from "../helpers/formatters";

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

interface ClaimTokenProps {
  amountToBeClaimed: number;
  symbol: string;
}

const ClaimToken: React.FC<ClaimTokenProps> = ({
  amountToBeClaimed,
  symbol,
}) => {
  return (
    <CenterGrid container spacing={3}>
      <Grid item xs={12}>
        <Message>Here is your token details below</Message>
      </Grid>
      <Grid item xs={12}>
        <Stack
          direction="row"
          justifyContent="center"
          alignItems="center"
          spacing={2}
        >
          <span>
            {amountToBeClaimed} {symbol}
          </span>
          <ArrowRightAltIcon sx={{ fontSize: 40 }} />
          {/* eslint-disable-next-line no-console */}
          <Button onClick={() => console.log}>Claim Tokens</Button>
        </Stack>
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
  const { currentState, amountToBeClaimed, tokenSymbol, tokenDecimals } =
    useClaimPage();

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
    case ClaimPageState.ClaimTokenState:
      return (
        <ClaimToken
          amountToBeClaimed={tokenValue(amountToBeClaimed, tokenDecimals)}
          symbol={tokenSymbol}
        />
      );
    case ClaimPageState.TokenClaimedState:
      return (
        <TokenClaimed
          amountClaimed={tokenValue(amountToBeClaimed, tokenDecimals)}
          symbol={tokenSymbol}
        />
      );
    default:
      return <>Unknown State 😜</>;
  }
};
