import React, { StrictMode } from "react";
import ReactDOM from "react-dom";
import { App } from "./App";
import "./index.css";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";

/** Get your free Moralis Account https://moralis.io/ */

// const APP_ID = process.env.REACT_APP_MORALIS_APPLICATION_ID;
// const SERVER_URL = process.env.REACT_APP_MORALIS_SERVER_URL;

const Application = () => {
  //Validate
  // if (!APP_ID || !SERVER_URL)
  //   throw new Error(
  //     "Missing Moralis Application ID or Server URL. Make sure to set your .env file."
  //   );
  // if (isServerInfo)
  //   return (
  //     <MoralisProvider appId={APP_ID} serverUrl={SERVER_URL}>
  //       <DemoApp isServerInfo />
  //     </MoralisProvider>
  //   );
  // else {
    return (
      <div style={{ display: "flex", justifyContent: "center" }}>
        <App />
      </div>
    );
  // }
};

ReactDOM.render(
  <StrictMode>
    <Application />,
  </StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register();
