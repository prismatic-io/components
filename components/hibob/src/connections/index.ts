import {
  connection,
  OAuth2Type,
  oauth2Connection,
} from "@prismatic-io/spectral";

export const hiBobOAuthConnection = oauth2Connection({
  key: "hibob-oauth2",
  display: {
    label: "OAuth 2.0",
    description: "Authenticate using OAuth 2.0.",
  },
  oauth2Type: OAuth2Type.AuthorizationCode,
  inputs: {
    authorizeUrl: {
      label: "Authorize URL",
      placeholder: "Enter the app installation URL",
      example: "https://app.hibob.com/app-marketplace/install/...",
      type: "string",
      required: true,
      shown: true,
      comments:
        "The App Installation URL from the HiBob Developer Portal. Navigate to the app's OAuth section to find this URL.",
    },
    tokenUrl: {
      label: "Token URL",
      placeholder: "Enter token URL",
      type: "string",
      required: true,
      shown: false,
      default: "https://auth.app.hibob.com/oauth2/v1/apps/token",
      comments: "The OAuth 2.0 Token URL for HiBob.",
    },
    scopes: {
      label: "Scopes",
      placeholder: "Enter space-separated scopes",
      example: "read.people read.time-off write.people",
      type: "string",
      required: false,
      shown: true,
      comments:
        "Space-separated OAuth 2.0 scopes. Configure in the HiBob Developer Portal under Manage Scopes.",
      default: "",
    },
    clientId: {
      label: "Client ID",
      placeholder: "Enter client ID",
      type: "string",
      required: true,
      shown: true,
      comments: "The Client ID from the HiBob Developer Portal.",
    },
    clientSecret: {
      label: "Client Secret",
      placeholder: "Enter client secret",
      type: "password",
      required: true,
      shown: true,
      comments: "The Client Secret from the HiBob Developer Portal.",
    },
    useSandbox: {
      label: "Use Sandbox",
      type: "boolean",
      required: true,
      shown: true,
      default: "false",
      comments:
        "When true, connects to the HiBob sandbox environment instead of production.",
    },
  },
});

export const hiBobConnection = connection({
  key: "hibob-connection",
  display: {
    label: "Basic Authentication",
    description: "Authenticate using basic authentication.",
  },
  inputs: {
    serviceUserId: {
      label: "Service User ID",
      placeholder: "Enter service user ID",
      example: "api-user@company.com",
      type: "string",
      required: true,
      comments: "The HiBob API Service User ID.",
    },
    token: {
      label: "Token",
      placeholder: "Enter token",
      example: "abc123...",
      type: "password",
      required: true,
      comments: "The HiBob API token.",
    },
    useSandbox: {
      label: "Use Sandbox",
      type: "boolean",
      required: true,
      default: "false",
      comments:
        "When true, connects to the HiBob sandbox environment instead of production.",
    },
  },
});

export default [hiBobOAuthConnection, hiBobConnection];
