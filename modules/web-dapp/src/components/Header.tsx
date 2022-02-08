import React from "react";
import { Layout, Typography } from "antd";
import { Logo } from "./Icons/Logo";
import { AppRoute } from "../config/routes";

const { Header: LayoutHeader } = Layout;
const { Link } = Typography;

const styles = {
  header: {
    width: "100%",
    background: "transparent",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    fontFamily: "Open Sans",
    padding: "5rem 3rem",
  },
  aboutLink: {
    fontFamily: "Open Sans",
    fontStyle: "normal",
    fontWeight: "bold",
    fontSize: "2.4rem",
    lineHeight: "3.8rem",
    color: "#0046AF",
  },
};

export const Header: React.FC = () => {
  return (
    <LayoutHeader style={styles.header}>
      <Link href={AppRoute.Home}>
        <Logo />
      </Link>
      <Link
        href={
          "https://getjamtech.notion.site/HOMIE-Token-and-Airdrop-App-Project-Planning-3b1a1557f5cf46a6a0d9c689c361cea7"
        }
        target="_blank"
        style={styles.aboutLink}
      >
        About Homie
      </Link>
    </LayoutHeader>
  );
};
