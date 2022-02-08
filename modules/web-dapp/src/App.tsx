import React from "react";
import { Layout } from "antd";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import { QuickStart } from "./components/QuickStart";
import { Home } from "./page/Home";
import { Header } from "./components/Header";
import { AppRoute } from "./config/routes";
import { ConnectWallet } from "./page/ConnectWallet";

const styles = {
  content: {
    justifyContent: "center",
    fontFamily: "Roboto, sans-serif",
    color: "#041836",
    marginTop: "130px",
    padding: "10px",
  },
  layout: {
    height: "100vh",
    overflow: "auto",
    background: "linear-gradient(180deg, #D5F2F2 0%, #0B52B4 100%)",
  },
};

export const App: React.FC = () => {
  return (
    <Layout style={styles.layout}>
      <Router>
        <Header />
        <div style={styles.content}>
          <Switch>
            <Route exact path="/quickstart">
              <QuickStart />
            </Route>
            <Route exact path={AppRoute.ConnectWallet}>
              <ConnectWallet />
            </Route>
            <Route path="">
              <Home />
            </Route>
          </Switch>
        </div>
      </Router>
    </Layout>
  );
};
