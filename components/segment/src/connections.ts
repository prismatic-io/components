import {
  connection,
  OAuth2Type,
  oauth2Connection,
} from "@prismatic-io/spectral";

export const segmentOAuth = oauth2Connection({
  oauth2Type: OAuth2Type.AuthorizationCode,
  key: "oauth2",
  display: {
    label: "Segment OAuth 2.0",
    description:
      "Authenticate requests to Segment using values obtained from the developer console.",
  },
  inputs: {
    authorizeUrl: {
      label: "Authorize URL",
      placeholder: "Authorize URL",
      type: "string",
      required: true,
      shown: true,
      comments: "The OAuth 2.0 Authorization URL for Salesforce",
      default: "https://login.salesforce.com/services/oauth2/authorize",
    },
    tokenUrl: {
      label: "Token URL",
      placeholder: "Token URL",
      type: "string",
      required: true,
      shown: true,
      comments: "The OAuth 2.0 Token URL for Salesforce",
      default: "https://login.salesforce.com/services/oauth2/token",
    },
    revokeUrl: {
      label: "Revoke URL",
      placeholder: "Revoke URL",
      type: "string",
      required: true,
      shown: true,
      comments: "The OAuth 2.0 Revocation URL for Salesforce",
      default: "https://login.salesforce.com/services/oauth2/revoke",
    },
    scopes: {
      label: "Scopes",
      placeholder: "Scopes",
      type: "string",
      required: false,
      shown: false,
      default: "",
      comments:
        "A space-delimited set of one or more scopes to get the user's permission to access.",
    },
    clientId: {
      label: "Consumer Key",
      placeholder: "Consumer Key",
      type: "string",
      required: true,
      shown: true,
    },
    clientSecret: {
      label: "Consumer Secret",
      placeholder: "Consumer Secret",
      type: "password",
      required: true,
      shown: true,
    },
  },
});

export const apiKey = connection({
  key: "apiKey",
  display: {
    label: "API Key",
    description: "Authenticate requests to Segment using an API Key.",
  },
  inputs: {
    apiKey: {
      label: "API Key",
      placeholder: "a7183e1b7e9ab09b8a5cfa87d1934c3c",
      type: "password",
      required: true,
      comments: "API Key for your Segment account",
    },
    subdomain: {
      label: "Subdomain",
      placeholder: "acme",
      type: "string",
      required: true,
      comments: "The subdomain name of your Segment account",
    },
  },
});

export default [apiKey];
