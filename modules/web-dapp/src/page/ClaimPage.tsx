import { Button, Grid, styled, Typography } from "@mui/material";
import React from "react";
import { useHistory } from "react-router-dom";
import { AppRoute } from "../config/routes";

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
        <Message>You are not eligible for this Airdrop!</Message>
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

export const ClaimPage: React.FC = () => {
  return <NotEligible />;
};
