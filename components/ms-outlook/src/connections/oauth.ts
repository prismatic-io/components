import { OAuth2Type, oauth2Connection } from "@prismatic-io/spectral";

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
      comments:
        "Application (client) ID from the [Microsoft Entra App Registration](https://learn.microsoft.com/en-us/entra/identity-platform/quickstart-register-app).",
      example: "12345678-1234-1234-1234-123456789abc",
    },
    clientSecret: {
      label: "Client Secret",
      placeholder: "Enter Client Secret",
      type: "password",
      required: true,
      shown: true,
      comments:
        "Client secret value from the [Microsoft Entra App Registration](https://learn.microsoft.com/en-us/entra/identity-platform/quickstart-register-app). This value is only shown once when created.",
    },
  },
});
