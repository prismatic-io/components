import { type ConnectionInput, oauth2Connection, OAuth2Type } from "@prismatic-io/spectral";
import { ConnectionKeys } from "ms-utils";
import { BASE_URL, DEFAULT_SCOPES } from "../constants";

export const source: ConnectionInput = {
  label: "Source",
  placeholder: "SharePoint",
  type: "string",
  required: true,
  shown: false,
  example: "SharePoint",
  default: "SharePoint",
};

export const oauth = oauth2Connection({
  key: ConnectionKeys.SharedOauth,
  display: {
    label: "OAuth 2.0 (Deprecated)",
    description: "Authenticate requests to Microsoft SharePoint using OAuth 2.0.",
  },
  oauth2Type: OAuth2Type.AuthorizationCode,
  inputs: {
    baseUrl: {
      label: "Base URL",
      placeholder: BASE_URL,
      type: "string",
      required: true,
      shown: true,
      comments:
        "The base URL for the Microsoft Graph API. National cloud deployments use a different root endpoint; see [Microsoft Graph national cloud deployments](https://learn.microsoft.com/en-us/graph/deployments#microsoft-graph-and-graph-explorer-service-root-endpoints).",
      example: BASE_URL,
      default: BASE_URL,
    },
    authorizeUrl: {
      label: "Authorize URL",
      placeholder: "Enter authorize URL",
      type: "string",
      required: true,
      shown: true,
      comments:
        "The OAuth 2.0 authorization endpoint of the Microsoft identity platform. Replace common with the directory (tenant) ID to restrict sign-in to one tenant. Find it on the app registration's Endpoints page in the Microsoft Entra admin center; see [Endpoints](https://learn.microsoft.com/en-us/entra/identity-platform/v2-protocols#endpoints).",
      default: "https://login.microsoftonline.com/common/oauth2/v2.0/authorize",
    },
    tokenUrl: {
      label: "Token URL",
      placeholder: "Enter token URL",
      type: "string",
      required: true,
      shown: true,
      comments:
        "The OAuth 2.0 token endpoint of the Microsoft identity platform. Replace common with the directory (tenant) ID to restrict sign-in to one tenant. Find it on the app registration's Endpoints page in the Microsoft Entra admin center; see [Endpoints](https://learn.microsoft.com/en-us/entra/identity-platform/v2-protocols#endpoints).",
      default: "https://login.microsoftonline.com/common/oauth2/v2.0/token",
    },
    scopes: {
      label: "Scopes",
      placeholder: "Enter space-separated scopes",
      type: "string",
      required: true,
      shown: true,
      comments:
        "Space-separated Microsoft Graph permission scopes to request. Add each scope under API permissions on the app registration in the Microsoft Entra admin center; see the [Microsoft Graph permissions reference](https://learn.microsoft.com/en-us/graph/permissions-reference).",
      default: DEFAULT_SCOPES,
    },
    clientId: {
      label: "Client ID",
      placeholder: "Enter Client ID",
      type: "string",
      required: true,
      shown: true,
      comments:
        "The Application (client) ID shown on the app registration's Overview page in the Microsoft Entra admin center; see [Register an application](https://learn.microsoft.com/en-us/entra/identity-platform/quickstart-register-app).",
    },
    clientSecret: {
      label: "Client Secret",
      placeholder: "Enter Client Secret",
      type: "password",
      required: true,
      shown: true,
      comments:
        "The client secret value generated under Certificates & secrets on the app registration in the Microsoft Entra admin center; see [Add a client secret](https://learn.microsoft.com/en-us/entra/identity-platform/how-to-add-credentials).",
    },
    source,
  },
});
