import { oauth2Connection, OAuth2Type } from "@prismatic-io/spectral";

export const MarketoConnection = oauth2Connection({
  key: "oauth2",
  display: {
    label: "OAuth 2.0",
    description: "OAuth 2.0 connection for Marketo",
  },
  oauth2Type: OAuth2Type.ClientCredentials,
  inputs: {
    tokenUrl: {
      label: "Token URL",
      placeholder: "Token URL",
      type: "string",
      required: true,
      shown: true,
      default: "https://<ACCOUNT_ID>.mktorest.com/identity/oauth/token",
      comments:
        "The OAuth 2.0 Token URL for the Marketo API. Replace <ACCOUNT_ID> with your Account Id.",
    },
    scopes: {
      label: "Scopes",
      placeholder: "Scopes",
      type: "string",
      required: false,
      shown: false,
      comments:
        "Scopes for the Marketo API. The value is supplied by the API based on the authenticated client.",
    },
    clientId: {
      label: "Client ID",
      placeholder: "Client ID",
      type: "string",
      required: true,
      shown: true,
      comments: "Client Identifier of your app for the Marketo API",
    },
    clientSecret: {
      label: "Client Secret",
      placeholder: "Client Secret",
      type: "password",
      required: true,
      shown: true,
      comments: "Client Secret of your app for the Marketo API",
    },
  },
});

export default [MarketoConnection];
