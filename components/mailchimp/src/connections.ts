import {
  connection,
  oauth2Connection,
  OAuth2Type,
} from "@prismatic-io/spectral";

export const mailchimpOAuthConnection = oauth2Connection({
  oauth2Type: OAuth2Type.AuthorizationCode,
  key: "oauth2",
  display: {
    label: "OAuth 2.0",
    description: "OAuth 2.0 connection for Mailchimp",
  },
  inputs: {
    authorizeUrl: {
      label: "Authorize URL",
      placeholder: "Enter authorization URL",
      type: "string",
      required: true,
      shown: false,
      comments: "The OAuth 2.0 Authorization URL for Mailchimp.",
      default: "https://login.mailchimp.com/oauth2/authorize",
    },
    tokenUrl: {
      label: "Token URL",
      placeholder: "Enter token URL",
      type: "string",
      required: true,
      shown: false,
      comments: "The OAuth 2.0 Token URL for Mailchimp.",
      default: "https://login.mailchimp.com/oauth2/token",
    },
    scopes: {
      label: "Scopes",
      placeholder: "Enter OAuth scopes",
      type: "string",
      required: false,
      shown: false,
      comments: "Mailchimp does not support granular scopes. Leave empty.",
      default: "",
    },
    clientId: {
      label: "Client ID",
      placeholder: "Enter client ID",
      type: "string",
      required: true,
      shown: true,
      comments:
        "The Client ID from your Mailchimp OAuth app. Find this in your Mailchimp account at [Account > Extras > API Keys > OAuth 2.0](https://admin.mailchimp.com/account/oauth2/).",
      example: "123456789012",
    },
    clientSecret: {
      label: "Client Secret",
      placeholder: "Enter client secret",
      type: "password",
      required: true,
      shown: true,
      comments:
        "The Client Secret from your Mailchimp OAuth app. Keep this value secure and never share it.",
      example: "a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5",
    },
    debugRequest: {
      label: "Debug Request",
      comments:
        "When true, the component will log the request and response to the console.",
      type: "boolean",
      default: "false",
    },
  },
});

export const mailchimpConnection = connection({
  key: "apiKey",
  display: {
    label: "API Key",
    description: "API Key connection for Mailchimp",
  },
  inputs: {
    apiKey: {
      label: "API Key",
      placeholder: "Enter API key",
      type: "password",
      required: true,
      shown: true,
      comments:
        "The Mailchimp API Key. Generate one in your Mailchimp account at [Account > Extras > API Keys](https://admin.mailchimp.com/account/api/). The key includes a data center suffix.",
      example: "a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6-us21",
    },
    debugRequest: {
      label: "Debug Request",
      comments:
        "When true, the component will log the request and response to the console.",
      type: "boolean",
      default: "false",
    },
  },
});

export default [mailchimpOAuthConnection, mailchimpConnection];
