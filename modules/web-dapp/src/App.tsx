import React from "react";
import { Layout } from "antd";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ClaimPage } from "./page/ClaimPage";
import { theme } from "./config/theme";
import { QuickStart } from "./components/QuickStart";
import { Home } from "./page/Home";
import { Header } from "./components/Header";
import { AppRoute } from "./config/routes";
import { ConnectWallet } from "./page/ConnectWallet";
import { LoggedInModal } from "./components/Layout/LoggedInModal";

const styles = {
  content: {
    justifyContent: "center",
  },
  layout: {
    height: "100vh",
    overflow: "auto",
    background: "linear-gradient(180deg, #D5F2F2 0%, #0B52B4 100%)",
  },
};

export const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Layout style={styles.layout}>
        <Router>
          <Header />
          <div className="body-layout" style={styles.content}>
            <Switch>
              <Route exact path="/quickstart">
                <QuickStart />
              </Route>
              <Route exact path={AppRoute.ConnectWallet}>
                <ConnectWallet />
              </Route>
              <Route path={AppRoute.LoggedIn}>
                <LoggedInModal>
                  <Route exact path={AppRoute.ClaimTokens}>
                    <ClaimPage />
                  </Route>
                </LoggedInModal>
              </Route>
              <Route path="">
                <Home />
              </Route>
            </Switch>
          </div>
        </Router>
      </Layout>
    </ThemeProvider>
  );
};
