import React from "react";
import { Link, styled } from "@mui/material";
import { Logo } from "./Icons/Logo";
import { AppRoute } from "../config/routes";

const styles = {
  header: {
    width: "100%",
    background: "transparent",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "4rem 3rem",
  },
};

const AboutLink = styled(Link)(({ theme }) => ({
  fontWeight: 700,
  fontSize: theme.spacing(2.4),
  lineHeight: theme.spacing(3),
}));

export const Header: React.FC = () => {
  return (
    <div style={styles.header}>
      <Link href={AppRoute.Home} underline="none">
        <Logo />
      </Link>
      <AboutLink
        href={
          "https://getjamtech.notion.site/HOMIE-Token-and-Airdrop-App-Project-Planning-3b1a1557f5cf46a6a0d9c689c361cea7"
        }
        target="_blank"
        underline="none"
      >
        About Homie
      </AboutLink>
    </div>
  );
};
