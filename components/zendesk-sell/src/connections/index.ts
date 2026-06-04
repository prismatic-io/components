import { OAuth2Type, oauth2Connection } from "@prismatic-io/spectral";

export const oauthConnection = oauth2Connection({
  key: "oauth",
  display: {
    label: "OAuth 2.0",
    description: "Authenticate using OAuth 2.0.",
  },
  oauth2Type: OAuth2Type.AuthorizationCode,
  inputs: {
    authorizeUrl: {
      label: "Authorize URL",
      placeholder: "Enter authorize URL",
      type: "string",
      required: true,
      shown: true,
      comments: "The OAuth 2.0 authorization endpoint for Zendesk Sell.",
      default: "https://api.getbase.com/oauth2/authorize",
      example: "https://api.getbase.com/oauth2/authorize",
    },
    tokenUrl: {
      label: "Token URL",
      placeholder: "Enter token URL",
      type: "string",
      required: true,
      shown: true,
      comments: "The OAuth 2.0 token endpoint for Zendesk Sell.",
      default: "https://api.getbase.com/oauth2/token",
      example: "https://api.getbase.com/oauth2/token",
    },
    scopes: {
      label: "Scopes",
      placeholder: "Enter scopes",
      type: "string",
      required: false,
      shown: true,
      comments:
        "The space-delimited OAuth 2.0 scopes to request. Defaults to read, write, and profile access.",
      example: "read write profile",
      default: "read write profile",
    },
    clientId: {
      label: "Client ID",
      placeholder: "Enter client ID",
      type: "string",
      required: true,
      shown: true,
      comments:
        "The client ID obtained from the Zendesk Sell OAuth application settings.",
    },
    clientSecret: {
      label: "Client Secret",
      placeholder: "Enter client secret",
      type: "password",
      required: true,
      shown: true,
      comments:
        "The client secret obtained from the Zendesk Sell OAuth application settings.",
    },
  },
});

export default [oauthConnection];
