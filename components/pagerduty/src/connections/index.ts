import {
  connection,
  OAuth2Type,
  oauth2Connection,
} from "@prismatic-io/spectral";

export const apiKey = connection({
  key: "pagerduty-api-key",
  display: {
    label: "API Key",
    description: "Authenticate requests using an API key.",
  },
  inputs: {
    apiKey: {
      label: "Token",
      type: "password",
      required: true,
      comments: "The PagerDuty API token used to authenticate requests.",
    },
  },
});


export const oauth = oauth2Connection({
  key: "pagerduty-oauth",
  display: {
    label: "OAuth 2.0",
    description: "Authenticate requests using OAuth 2.0.",
  },
  oauth2Type: OAuth2Type.AuthorizationCode,
  inputs: {
    authorizeUrl: {
      label: "Authorize URL",
      placeholder: "Authorize URL",
      type: "string",
      required: true,
      shown: false,
      default: "https://identity.pagerduty.com/oauth/authorize",
      comments: "The OAuth 2.0 authorization URL for the PagerDuty code grant.",
    },
    tokenUrl: {
      label: "Token URL",
      placeholder: "Token URL",
      type: "string",
      required: true,
      shown: false,
      default: "https://identity.pagerduty.com/oauth/token",
      comments: "The OAuth 2.0 token URL for the PagerDuty code grant.",
    },
    scopes: {
      label: "Scopes",
      placeholder: "Scopes",
      type: "string",
      required: true,
      shown: true,
      comments:
        "The Classic User OAuth scope granting read or read/write access to all resources.",
      example: "write",
      default: "write",
    },
    clientId: {
      label: "Client ID",
      placeholder: "Client ID",
      type: "string",
      required: true,
      shown: true,
      comments: "The client ID of the PagerDuty OAuth application.",
    },
    clientSecret: {
      label: "Client Secret",
      placeholder: "Client Secret",
      type: "password",
      required: true,
      shown: true,
      comments: "The client secret of the PagerDuty OAuth application.",
    },
  },
});

export default [oauth, apiKey];
