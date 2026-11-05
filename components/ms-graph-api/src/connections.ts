import { oauth2Connection, OAuth2Type } from "@prismatic-io/spectral";
import { getMicrosoftOAuth2ClientCredentialsConnection } from "ms-utils";

const oauthClientCredentials = getMicrosoftOAuth2ClientCredentialsConnection({
  key: "oauthClientCredentials",
});

export const oauth = oauth2Connection({
  key: "oauth",
  display: {
    label: "OAuth 2.0 Authorization Code",
    description: "OAuth 2.0 Authorization Code Connectivity for Microsoft Graph API",
  },
  oauth2Type: OAuth2Type.AuthorizationCode,
  inputs: {
    authorizeUrl: {
      label: "Authorize URL",
      placeholder: "Enter Authorize URL",
      type: "string",
      required: true,
      shown: true,
      comments:
        "The OAuth 2.0 Authorization URL for Microsoft Graph API. For multi-tenant applications, use /common/ endpoints. For single-tenant apps, replace with tenant-specific URLs.",
      example: "https://login.microsoftonline.com/common/oauth2/v2.0/authorize",
      default: "https://login.microsoftonline.com/common/oauth2/v2.0/authorize",
    },
    tokenUrl: {
      label: "Token URL",
      placeholder: "Enter Token URL",
      type: "string",
      required: true,
      shown: true,
      comments:
        "The OAuth 2.0 Token URL for Microsoft Graph API. For multi-tenant applications, use /common/ endpoints. For single-tenant apps, replace with tenant-specific URLs.",
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
        "Space-separated list of OAuth permission scopes. Find available scopes at https://developer.microsoft.com/en-us/graph/graph-explorer",
      example: "https://graph.microsoft.com/User.Read.All offline_access",
      default: "https://graph.microsoft.com/User.Read.All offline_access",
    },
    clientId: {
      label: "Client ID",
      placeholder: "Enter Client ID",
      type: "string",
      required: true,
      shown: true,
      comments: "The Client ID from the Azure AD application registration.",
      example: "12345678-1234-1234-1234-123456789abc",
    },
    clientSecret: {
      label: "Client Secret",
      placeholder: "Enter Client Secret",
      type: "password",
      required: true,
      shown: true,
      comments: "This is the 'value' (not ID) of the client secret you generated in Azure Portal.",
    },
  },
});

export default [oauth, oauthClientCredentials];
