import React from "react";
import { Link } from "react-router-dom";
import { Button, Grid, styled, Typography } from "@mui/material";
import { Logo } from "../components/Icons/Logo";
import { AppRoute } from "../config/routes";

const ConnectButton = styled(Button)(({ theme }) => ({
  color: "#0046AF",
  background: theme.palette.common.white,
}));

const Title = styled(Typography)(({ theme }) => ({
  color: theme.palette.common.white,
  fontWeight: "bold",
  marginTop: theme.spacing(2),
  marginBottom: theme.spacing(3.8),
}));

const Subtitle = styled(Typography)(({ theme }) => ({
  color: theme.palette.common.white,
  fontSize: theme.spacing(2),
  fontWeight: "bold",
  lineHeight: theme.spacing(3.4),
  marginBottom: theme.spacing(3.8),
}));

export const Home: React.FC = () => {
  return (
    <Grid container sx={{ textAlign: "center" }}>
      <Grid item xs={0} md={3} />
      <Grid item xs={12} md={6}>
        <Logo />
        <Title variant="h1">Claim HOMIE Token</Title>
        <Subtitle variant="subtitle1">
          With the launch of HOMIE and the DAO, the community will be empowered
          to govern the Homie Token
        </Subtitle>
        <Link to={AppRoute.ConnectWallet}>
          <ConnectButton>Connect Wallet</ConnectButton>
        </Link>
      </Grid>
    </Grid>
  );
};
