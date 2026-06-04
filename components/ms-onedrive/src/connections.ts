import { oauth2Connection, OAuth2Type } from "@prismatic-io/spectral";
import { ConnectionKeys } from "ms-utils";

export const oauth = oauth2Connection({
  key: ConnectionKeys.SharedOauth,
  display: {
    description: "OAuth 2.0 Connectivity for Microsoft One Drive",
    label: "OAuth 2.0",
  },
  oauth2Type: OAuth2Type.AuthorizationCode,
  inputs: {
    authorizeUrl: {
      label: "Authorize URL",
      placeholder: "Enter Authorize URL",
      type: "string",
      required: true,
      shown: true,
      comments: "The OAuth 2.0 Authorization URL for Microsoft OneDrive.",
      default: "https://login.microsoftonline.com/common/oauth2/v2.0/authorize",
    },
    tokenUrl: {
      label: "Token URL",
      placeholder: "Enter Token URL",
      type: "string",
      required: true,
      shown: true,
      comments: "The OAuth 2.0 Token URL for Microsoft OneDrive.",
      default: "https://login.microsoftonline.com/common/oauth2/v2.0/token",
    },
    scopes: {
      label: "Scopes",
      placeholder: "Enter scopes",
      type: "string",
      required: false,
      shown: false,
      comments:
        "Space-separated list of Microsoft Graph permission scopes. Scopes are configured on the Azure AD application registration. [Learn more](https://learn.microsoft.com/en-us/graph/permissions-reference).",
      default:
        "https://graph.microsoft.com/Files.Read https://graph.microsoft.com/Files.ReadWrite https://graph.microsoft.com/Sites.ReadWrite.All offline_access",
    },
    clientId: {
      label: "Client ID",
      placeholder: "Enter Client ID",
      type: "string",
      required: true,
      shown: true,
      comments:
        "The Application (client) ID from your Azure AD app registration. [Learn more](https://learn.microsoft.com/en-us/azure/active-directory/develop/quickstart-register-app).",
      example: "12345678-1234-1234-1234-123456789012",
    },
    clientSecret: {
      label: "Client Secret",
      placeholder: "Enter Client Secret",
      type: "password",
      required: true,
      shown: true,
      comments:
        "The client secret value generated in your Azure AD app registration. [Learn more](https://learn.microsoft.com/en-us/azure/active-directory/develop/quickstart-register-app#add-a-client-secret).",
    },
    
    source: {
      label: "Source",
      type: "string",
      required: true,
      shown: false,
      default: "OneDrive",
    },
  },
});

export default [oauth];
