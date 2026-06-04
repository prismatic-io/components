import {
  connection,
  oauth2Connection,
  OAuth2PkceMethod,
  OAuth2Type,
} from "@prismatic-io/spectral";

export const oauth = oauth2Connection({
  oauth2Type: OAuth2Type.AuthorizationCode,
  oauth2PkceMethod: OAuth2PkceMethod.S256,
  key: "oauth",
  display: {
    label: "OAuth 2.0",
    description: "Authenticate requests to Airtable using OAuth 2.0.",
  },
  inputs: {
    authorizeUrl: {
      label: "Authorize URL",
      placeholder: "Enter Authorize URL",
      type: "string",
      required: true,
      shown: false,
      comments: "The OAuth 2.0 Authorization URL for Airtable",
      default: "https://airtable.com/oauth2/v1/authorize",
    },
    tokenUrl: {
      label: "Token URL",
      placeholder: "Enter Token URL",
      type: "string",
      required: true,
      shown: false,
      comments: "The OAuth 2.0 Token URL for Airtable",
      default: "https://airtable.com/oauth2/v1/token",
    },
    scopes: {
      label: "Scopes",
      placeholder: "Enter scopes",
      type: "string",
      required: true,
      shown: true,
      comments:
        "A space-delimited set of one or more scopes to get the user's permission to access.",
      default:
        "data.records:read data.records:write data.recordComments:read data.recordComments:write schema.bases:read schema.bases:write webhook:manage",
    },
    clientId: {
      label: "Client ID",
      placeholder: "Enter Client ID",
      type: "string",
      required: true,
      shown: true,
      comments:
        "Provide the Client ID you received from https://airtable.com/create/oauth.",
      example: "cli1234567890abcd",
    },
    clientSecret: {
      label: "Client Secret",
      placeholder: "Enter Client Secret",
      type: "password",
      required: true,
      shown: true,
      comments:
        "Provide the Client Secret you received from https://airtable.com/create/oauth.",
    },
  },
});

export const personalAccessToken = connection({
  key: "personalAccessToken",
  display: {
    label: "Personal Access Token",
    description:
      "Authenticate requests to Airtable using a personal access token.",
  },
  inputs: {
    apiKey: {
      label: "API Key",
      placeholder: "Enter Personal Access Token",
      type: "password",
      required: true,
      shown: true,
      comments:
        "You can generate an API key from https://airtable.com/create/tokens",
      example: "patAbCdEfGh1234567.1234567890abcdefghijklmnopqr",
    },
  },
});


export const apiKeyConnection = connection({
  key: "apiKey",
  display: {
    label: "API Key and Base ID (Deprecated)",
    description:
      "Authenticate requests to Airtable using an API key and base ID. This connection is deprecated as of February 1, 2024.",
  },
  inputs: {
    base: {
      label: "Airtable Base ID",
      placeholder: "Enter Airtable Base ID",
      type: "string",
      required: true,
      shown: true,
      comments:
        "Visit https://airtable.com/api and select your workspace. The ID of your base will be printed for you in green.",
      example: "appLkNDICXNqxSDhG",
    },
    apiKey: {
      label: "API Key",
      placeholder: "Enter API Key",
      type: "password",
      required: true,
      shown: true,
      comments:
        "You can generate an API key from https://airtable.com/account.",
      example: "keyvTlNCTqEXAMPLE",
    },
  },
});

export default [oauth, personalAccessToken, apiKeyConnection];
