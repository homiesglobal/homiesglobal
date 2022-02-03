import React from "react";
import Text from "antd/lib/typography/Text";
import { Layout } from "antd";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { QuickStart } from "./components/QuickStart";
import "./App.css";
import { Logo } from "./components/Logo";
import { WalletLoginButton } from "./components/WalletLoginButton";

const { Header, Footer } = Layout;

const styles = {
  content: {
    // display: "flex",
    justifyContent: "center",
    fontFamily: "Roboto, sans-serif",
    color: "#041836",
    marginTop: "130px",
    padding: "10px",
  },
  header: {
    position: "fixed" as const,
    zIndex: 1,
    width: "100%",
    background: "#fff",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    fontFamily: "Roboto, sans-serif",
    borderBottom: "2px solid rgba(0, 0, 0, 0.06)",
    padding: "0 10px",
    boxShadow: "0 1px 10px rgb(151 164 175 / 10%)",
  },
  headerRight: {
    display: "flex",
    gap: "20px",
    alignItems: "center",
    fontSize: "15px",
    fontWeight: "600",
  },
};

export const App: React.FC = () => {
  return (
    <Layout style={{ height: "100vh", overflow: "auto" }}>
      <Router>
        <Header style={styles.header}>
          <Logo />
          <WalletLoginButton />
        </Header>
        <div style={styles.content}>
          <Switch>
            <Route exact path="">
              <QuickStart />
            </Route>
          </Switch>
        </div>
      </Router>
      <Footer style={{ textAlign: "center" }}>
        <Text style={{ display: "block" }}>
          ⭐️ Please star the{" "}
          <a
            href="https://github.com/homiesglobal/homiesglobal/"
            target="_blank"
            rel="noopener noreferrer"
          >
            homiesglobal repository
          </a>
          , every star makes us very happy!
        </Text>
      </Footer>
    </Layout>
  );
};
