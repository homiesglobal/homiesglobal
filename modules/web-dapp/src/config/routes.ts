export const AppRoute = {
  Home: "/",
  ConnectWallet: "/connect",
  LoggedIn: "/in",
  // ensure nested login paths have prefixes of '/in'
  // so their content will be within the login modal
  ClaimTokens: "/in/claim-tokens",
};
