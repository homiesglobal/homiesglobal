import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Grid,
  Snackbar,
  Stack,
  styled,
  Typography,
} from "@mui/material";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import React from "react";
import { useHistory } from "react-router-dom";
import { AppRoute } from "../config/routes";
import {
  ClaimPageState,
  UseClaimPage,
  useClaimPage,
} from "../hooks/useClaimPage";
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

interface EligibleProps {
  onContinueClicked: () => void;
}

const Eligible: React.FC<EligibleProps> = ({ onContinueClicked }) => {
  return (
    <CenterGrid container spacing={3}>
      <Grid item xs={12}>
        <Title variant="h2">Congratulations Homie!</Title>
      </Grid>
      <Grid item xs={12}>
        <Message>You are eligible for this airdrop.</Message>
      </Grid>
      <Grid item xs={12}>
        <Button onClick={onContinueClicked}>Continue to Airdrop</Button>
      </Grid>
    </CenterGrid>
  );
};

interface ClaimTokenProps {
  amountToBeClaimed: number;
  symbol: string;
  onClaimTokensClicked: () => void;
}

const ClaimToken: React.FC<ClaimTokenProps> = ({
  amountToBeClaimed,
  symbol,
  onClaimTokensClicked,
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
          <Button onClick={onClaimTokensClicked}>Claim Tokens</Button>
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

const getComponentForPageState = (page: UseClaimPage): React.ReactElement => {
  const {
    currentState,
    amountToBeClaimed,
    tokenSymbol,
    tokenDecimals,
    toClaimTokenState,
    claimTokens,
  } = page;

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
      return <Eligible onContinueClicked={toClaimTokenState} />;
    case ClaimPageState.ClaimTokenState:
      return (
        <ClaimToken
          amountToBeClaimed={tokenValue(amountToBeClaimed, tokenDecimals)}
          symbol={tokenSymbol}
          onClaimTokensClicked={claimTokens}
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

export const ClaimPage: React.FC = () => {
  const claimPage = useClaimPage();
  const { error } = claimPage;
  const viewComponent = getComponentForPageState(claimPage);

  return (
    <>
      <Snackbar open={!!error}>
        <Alert sx={{ fontSize: 15 }} severity="error">
          {error}
        </Alert>
      </Snackbar>
      {viewComponent}
    </>
  );
};
