import { oauth2Connection, OAuth2Type } from "@prismatic-io/spectral";
import {
  getMicrosoftOAuth2AuthorizationCodeConnection,
  getMicrosoftOAuth2ClientCredentialsConnection,
} from "ms-utils";
import { scopesForAuthorizationCodeFlow } from "../constants";

export const templatedOauth = getMicrosoftOAuth2AuthorizationCodeConnection({
  key: "templatedOauth",
  defaultScopes: scopesForAuthorizationCodeFlow,
});

export const oauthClientCredentials = getMicrosoftOAuth2ClientCredentialsConnection({
  key: "oauthClientCredentials",
  additionalInputs: {
    userId: {
      label: "User ID",
      placeholder: "Enter User ID",
      type: "string",
      required: true,
      shown: true,
      example: "user@example.com",
      comments:
        "Unique identifier of the user whose data will be accessed. Required for client credentials authentication to work with user-specific endpoints.",
    },
  },
});

export const oauth = oauth2Connection({
  key: "oauth",
  display: {
    label: "OAuth 2.0 Authorization Code (Deprecated)",
    description: "Authenticate using OAuth 2.0 Authorization Code (Deprecated).",
  },
  oauth2Type: OAuth2Type.AuthorizationCode,
  inputs: {
    baseUrl: {
      label: "Base URL",
      placeholder: "Enter Base URL",
      example: "https://graph.microsoft.com",
      default: "https://graph.microsoft.com",
      type: "string",
      required: true,
      shown: true,
      comments:
        "Base URL for the Microsoft Graph API. Depending on the cloud environment, choose the correct endpoint from the [Microsoft Graph deployments documentation](https://learn.microsoft.com/en-us/graph/deployments#microsoft-graph-and-graph-explorer-service-root-endpoints).",
    },
    authorizeUrl: {
      label: "Authorize URL",
      placeholder: "Enter Authorize URL",
      type: "string",
      required: true,
      shown: true,
      comments: "OAuth 2.0 Authorization URL for Microsoft Outlook authentication.",
      example: "https://login.microsoftonline.com/common/oauth2/v2.0/authorize?prompt=consent",
      default: "https://login.microsoftonline.com/common/oauth2/v2.0/authorize?prompt=consent",
    },
    tokenUrl: {
      label: "Token URL",
      placeholder: "Enter Token URL",
      type: "string",
      required: true,
      shown: true,
      comments: "OAuth 2.0 Token URL for Microsoft Outlook authentication.",
      example: "https://login.microsoftonline.com/common/oauth2/v2.0/token",
      default: "https://login.microsoftonline.com/common/oauth2/v2.0/token",
    },
    scopes: {
      label: "Scopes",
      placeholder: "Enter OAuth scopes",
      type: "string",
      required: false,
      shown: true,
      comments:
        "List of OAuth permission scopes. These scopes should be configured in the Microsoft Entra App Registration.",
      example: "https://graph.microsoft.com/User.Read https://graph.microsoft.com/Mail.Read",
      default:
        "https://graph.microsoft.com/User.Read https://graph.microsoft.com/Calendars.ReadWrite https://graph.microsoft.com/Mail.ReadWrite https://graph.microsoft.com/Mail.Send offline_access",
    },
    clientId: {
      label: "Client ID",
      placeholder: "Enter Client ID",
      type: "string",
      required: true,
      shown: true,
      comments: "Application (client) ID from the Microsoft Entra App Registration.",
      example: "12345678-1234-1234-1234-123456789abc",
    },
    clientSecret: {
      label: "Client secret value",
      placeholder: "Enter Client Secret",
      type: "password",
      required: true,
      shown: true,
      comments:
        "Client secret value from the Microsoft Entra App Registration. This value is only shown once when created.",
    },
  },
});

export default [templatedOauth, oauthClientCredentials, oauth];
