import {
  connection,
  OAuth2Type,
  oauth2Connection,
} from "@prismatic-io/spectral";

export const bearerApiKey = connection({
  key: "bearerApiKey",
  display: {
    label: "Bearer API Key",
    description:
      "If using Rippling's API to access endpoints on behalf of your own company, use your API key.",
  },
  inputs: {
    apiKey: {
      label: "API Key",
      type: "password",
      required: true,
      placeholder: "Enter API key",
      comments:
        "API key from the Rippling admin console. Navigate to <strong>Admin > Settings > API</strong> in Rippling to generate your API key. [Learn more](https://developer.rippling.com/documentation/rest-api)",
    },
  },
});

export const authorizationCode = oauth2Connection({
  key: "authorizationCode",
  display: {
    label: "OAuth 2.0",
    description:
      "Authenticate using OAuth 2.0 Authorization Code flow for partner apps requiring user delegation.",
  },
  oauth2Type: OAuth2Type.AuthorizationCode,
  inputs: {
    authorizeUrl: {
      label: "Authorization URL",
      type: "string",
      required: true,
      shown: true,
      placeholder: "Enter authorization URL",
      example: "https://app.rippling.com/apps/PLATFORM/YourAppName",
      comments:
        "The OAuth 2.0 authorization URL for your Rippling app. Replace {AppName} with your actual app name. [Learn more](https://developer.rippling.com/documentation/rest-api)",
    },
    tokenUrl: {
      label: "Token URL",
      type: "string",
      required: true,
      shown: false,
      default: "https://app.rippling.com/api/o/token/",
      comments: "The OAuth 2.0 token URL for Rippling's API.",
    },
    scopes: {
      label: "Scopes",
      type: "string",
      required: true,
      shown: true,
      placeholder: "Enter scopes",
      example: "employees:read departments:read teams:read",
      comments:
        "Space-separated list of OAuth permission scopes. Scopes are configured in your Rippling app settings and determine which resources your integration can access.",
    },
    clientId: {
      label: "Client ID",
      type: "string",
      required: true,
      shown: true,
      placeholder: "Enter client ID",
      comments:
        "The OAuth 2.0 client ID for your Rippling partner app. Found in your app configuration in the Rippling admin console.",
    },
    clientSecret: {
      label: "Client Secret",
      type: "password",
      required: true,
      shown: true,
      placeholder: "Enter client secret",
      comments:
        "The OAuth 2.0 client secret for your Rippling partner app. Keep this value secure and do not share it.",
    },
  },
});

export default [authorizationCode, bearerApiKey];
