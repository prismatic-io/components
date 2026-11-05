import { OAuth2Type, oauth2Connection } from "@prismatic-io/spectral";

export const oauth = oauth2Connection({
  key: "oauth",
  display: {
    label: "OAuth 2.0",
    description: "OAuth 2.0 Connectivity for Microsoft Power BI",
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
        "The OAuth 2.0 Authorization URL. Use tenant-specific endpoint for single-tenant apps: https://login.microsoftonline.com/{TENANT-ID}/oauth2/authorize",
      default: "https://login.microsoftonline.com/common/oauth2/authorize",
      example: "https://login.microsoftonline.com/common/oauth2/authorize",
    },
    tokenUrl: {
      label: "Token URL",
      placeholder: "Enter Token URL",
      type: "string",
      required: true,
      shown: true,
      comments:
        "The OAuth 2.0 Token URL. Use tenant-specific endpoint for single-tenant apps: https://login.microsoftonline.com/{TENANT-ID}/oauth2/v2.0/token",
      default: "https://login.microsoftonline.com/common/oauth2/v2.0/token",
      example: "https://login.microsoftonline.com/common/oauth2/v2.0/token",
    },
    scopes: {
      label: "Scopes",
      placeholder: "Enter scopes (space-separated)",
      type: "string",
      required: false,
      shown: true,
      comments:
        "Space-separated list of Power BI OAuth scopes. Must include 'offline_access' for refresh tokens. See [Microsoft Graph permissions reference](https://docs.microsoft.com/en-us/graph/permissions-reference) for available scopes.",
      default: "https://analysis.windows.net/powerbi/api/Dataset.ReadWrite.All offline_access",
      example: "https://analysis.windows.net/powerbi/api/Dataset.ReadWrite.All offline_access",
    },
    clientId: {
      label: "Client ID",
      placeholder: "Enter Client ID",
      type: "string",
      required: true,
      shown: true,
      comments:
        "The Application (client) ID from the Azure Portal. Navigate to Azure Active Directory > App registrations to find this value.",
      example: "12345678-1234-1234-1234-123456789abc",
    },
    clientSecret: {
      label: "Client Secret",
      placeholder: "Enter Client Secret",
      type: "password",
      required: true,
      shown: true,
      comments:
        "The Client Secret from the Azure Portal. Navigate to Certificates & secrets to generate a new client secret.",
    },
  },
});

export default [oauth];
