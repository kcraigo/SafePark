// import "isomorphic-fetch";
import { Client } from "@microsoft/microsoft-graph-client";
// import * as Msal from "msal";

import { UserAgentApplication } from "msal";

import { ImplicitMSALAuthenticationProvider } from "../../node_modules/@microsoft/microsoft-graph-client/lib/src/ImplicitMSALAuthenticationProvider";

import { MSALAuthenticationProviderOptions } from "../../node_modules/@microsoft/microsoft-graph-client/lib/src/MSALAuthenticationProviderOptions";

import config from "./config";

// An Optional options for initializing the MSAL @see https://github.com/AzureAD/microsoft-authentication-library-for-js/wiki/MSAL-basics#configuration-options
const msalConfig = {
  auth: {
    clientId: config().appID, // Client Id of the registered application
    redirectUri: config().redirectUri
  }
};
const graphScopes = config().scopes; // An array of graph scopes

// Important Note: This library implements loginPopup and acquireTokenPopup flow, remember this while initializing the msal
// Initialize the MSAL @see https://github.com/AzureAD/microsoft-authentication-library-for-js#1-instantiate-the-useragentapplication
const msalApplication = new UserAgentApplication(msalConfig);
const options = new MSALAuthenticationProviderOptions(graphScopes);
const authProvider = new ImplicitMSALAuthenticationProvider(
  msalApplication,
  options
);
const authoptions = {
  authProvider // An instance created from previous step
};

const client = Client.initWithMiddleware(authoptions);

export async function graphAuthService(cEmp) {
  try {
    const userDetails = await client.api("/users/" + cEmp).get();

    return userDetails;
  } catch (error) {
    throw error;
  }
}

export async function getManager(cEmp) {
  try {
    const managerDetails = await client
      .api("/users/" + cEmp + "/manager")
      .get();

    console.log("GRPHSVC-MANAGER DETAILS: " + managerDetails.displayName);

    return managerDetails;
  } catch (error) {
    throw error;
  }
}
