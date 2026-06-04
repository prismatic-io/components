import {
  connection,
  oauth2Connection,
  OAuth2Type,
} from "@prismatic-io/spectral";

export const apiKey = connection({
  key: "apiKey",
  display: {
    label: "Developer Token",
    description: "Developer Token connection for Box",
  },
  comments: "Retrieve this from the developer console.",
  inputs: {
    apiKey: {
      label: "Developer Token",
      placeholder: "Enter developer token",
      type: "password",
      required: true,
      shown: true,
      comments:
        "A short-lived developer token for testing purposes. Obtain from [Box Developer Console](https://app.box.com/developers/console).",
      example: "ABCDEFGHIJKLMNOPQRSTUVWXYZ123456",
    },
  },
});

export const oauth2 = oauth2Connection({
  oauth2Type: OAuth2Type.AuthorizationCode,
  key: "oauth2",
  display: {
    label: "OAuth 2.0",
    description: "OAuth 2.0 connection for Box",
  },
  inputs: {
    authorizeUrl: {
      label: "Authorize URL",
      placeholder: "Enter authorization URL",
      type: "string",
      required: true,
      shown: false,
      comments: "The OAuth 2.0 Authorization URL for Box.",
      default: "https://account.box.com/api/oauth2/authorize",
    },
    tokenUrl: {
      label: "Token URL",
      placeholder: "Enter token URL",
      type: "string",
      required: true,
      shown: false,
      comments: "The OAuth 2.0 Token URL for Box.",
      default: "https://api.box.com/oauth2/token",
    },
    scopes: {
      label: "Scopes",
      placeholder: "Enter OAuth scopes",
      type: "string",
      required: false,
      shown: true,
      comments:
        "A space-delimited set of one or more scopes. Leave blank to use your app's configured default scopes. See [Box OAuth Scopes](https://developer.box.com/guides/api-calls/permissions-and-errors/scopes/) for available options.",
      default: "root_readwrite manage_webhook",
    },
    clientId: {
      label: "Client ID",
      placeholder: "Enter client ID",
      type: "string",
      required: true,
      shown: true,
      comments:
        "The OAuth 2.0 client ID from your Box app configuration. Obtain from [Box Developer Console](https://app.box.com/developers/console).",
      example: "abc123def456ghi789jkl012mno345pq",
    },
    clientSecret: {
      label: "Client Secret",
      placeholder: "Enter client secret",
      type: "password",
      required: true,
      shown: true,
      comments:
        "The OAuth 2.0 client secret from your Box app configuration. Obtain from [Box Developer Console](https://app.box.com/developers/console).",
    },
  },
});

export default [oauth2, apiKey];
