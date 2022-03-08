import React, { StrictMode } from "react";
import ReactDOM from "react-dom";
import { Web3ReactProvider } from "@web3-react/core";
import { providers } from "ethers";
import { ConfirmProvider } from "material-ui-confirm";
import { App } from "./App";
import "./index.css";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";

const getLibrary = (provider) => {
  return new providers.Web3Provider(provider);
};

const Application = () => {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <ConfirmProvider
        defaultOptions={{
          cancellationButtonProps: { sx: { display: "none" } },
        }}
      >
        <App />
      </ConfirmProvider>
    </Web3ReactProvider>
  );
};

ReactDOM.render(
  <StrictMode>
    <Application />
  </StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register();
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register();
