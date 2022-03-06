import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ClaimPage } from "./page/ClaimPage";
import { theme } from "./config/theme";
import { Home } from "./page/Home";
import { Header } from "./components/Header";
import { AppRoute } from "./config/routes";
import { ConnectWallet } from "./page/ConnectWallet";
import { LoggedInModal } from "./components/Layout/LoggedInModal";

const styles = {
  background: {
    height: "100vh",
    background: "linear-gradient(180deg, #D5F2F2 0%, #0B52B4 100%)",
  },
};

export const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div style={styles.background}>
        <Router>
          <Header />
          <Switch>
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
        </Router>
      </div>
    </ThemeProvider>
  );
};
