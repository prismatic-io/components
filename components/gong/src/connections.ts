import {
  connection,
  OAuth2Type,
  oauth2Connection,
  util,
} from "@prismatic-io/spectral";

export const gongConnection = oauth2Connection({
  oauth2Type: OAuth2Type.AuthorizationCode,
  key: "oauth2",
  display: {
    label: "OAuth 2.0",
    description: "Authenticate using oauth flow.",
  },
  inputs: {
    authorizeUrl: {
      label: "Authorize URL",
      placeholder: "Authorize URL",
      type: "string",
      required: true,
      shown: false,
      comments: "The OAuth 2.0 Authorization URL for Gong",
      default: "https://app.gong.io/oauth2/authorize",
    },
    tokenUrl: {
      label: "Token URL",
      placeholder: "Token URL",
      type: "string",
      required: true,
      shown: false,
      default: "https://app.gong.io/oauth2/generate-customer-token",
      comments: "The OAuth 2.0 Token URL for Gong",
    },
    scopes: {
      label: "Scopes",
      placeholder: "Scopes",
      type: "string",
      required: false,
      shown: true,
      comments:
        "A space-delimited set of one or more scopes to get the user's permission to access. A list of all scopes is available at https://app.gong.io/settings/api/documentation#overview",
      default: "api:calls:create api:calls:read:basic",
    },
    clientId: {
      label: "API Key",
      placeholder: "API Key",
      type: "string",
      required: true,
      shown: true,
      comments: "Obtain this by creating an app at your Gong Dashboard",
    },
    clientSecret: {
      label: "API Secret",
      placeholder: "API Secret",
      type: "password",
      required: true,
      shown: true,
      comments: "Obtain this by creating an app at your Gong Dashboard",
    },
  },
});

export const gongApiKey = connection({
  key: "gongApiKey",
  display: {
    label: "API Key",
    description: "Generate by visiting Company Settings > Ecosystem > API.",
  },
  inputs: {
    baseUrl: {
      label: "Base URL",
      required: true,
      shown: true,
      type: "string",
      example: "https://us-0000.api.gong.io",
      comments: "The base URL for your Gong instance API.",
      clean: util.types.toString,
    },
    accessKey: {
      label: "Access Key",
      required: true,
      type: "string",
      comments: "The access key for authentication.",
      placeholder: "Enter access key",
      clean: util.types.toString,
    },
    accessKeySecret: {
      label: "Access Key Secret",
      required: true,
      shown: true,
      type: "password",
      comments: "The access key secret for authentication.",
    },
  },
});

export default [gongConnection, gongApiKey];
