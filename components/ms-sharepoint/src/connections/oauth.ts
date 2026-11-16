import { type ConnectionInput, oauth2Connection, OAuth2Type } from "@prismatic-io/spectral";
import { ConnectionKeys } from "ms-utils";
import { BASE_URL, DEFAULT_SCOPES } from "../constants";

export const source: ConnectionInput = {
  label: "Source",
  type: "string",
  required: true,
  shown: false,
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
      example: BASE_URL,
      default: BASE_URL,
      type: "string",
      required: true,
      shown: true,
      comments:
        "The base URL for the Microsoft Graph API. National cloud deployments use a different root endpoint; see [Microsoft Graph national cloud deployments](https://learn.microsoft.com/en-us/graph/deployments#microsoft-graph-and-graph-explorer-service-root-endpoints).",
    },
    authorizeUrl: {
      label: "Authorize URL",
      placeholder: "Enter authorize URL",
      type: "string",
      required: true,
      shown: true,
      comments: "Provide a tenant specific OAuth 2.0 authorize endpoint.",
      default: "https://login.microsoftonline.com/common/oauth2/v2.0/authorize",
    },
    tokenUrl: {
      label: "Token URL",
      placeholder: "Enter token URL",
      type: "string",
      required: true,
      shown: true,
      comments: "Provide a tenant specific OAuth 2.0 token endpoint.",
      default: "https://login.microsoftonline.com/common/oauth2/v2.0/token",
    },
    scopes: {
      label: "Scopes",
      placeholder: "Enter space-separated scopes",
      type: "string",
      required: true,
      shown: true,
      comments: "Space separated OAuth 2.0 permission scopes.",
      default: DEFAULT_SCOPES,
    },
    clientId: {
      label: "Client ID",
      placeholder: "Enter Client ID",
      type: "string",
      required: true,
      shown: true,
      comments: "Client ID of the Azure application.",
    },
    clientSecret: {
      label: "Client Secret",
      placeholder: "Enter Client Secret",
      type: "password",
      required: true,
      shown: true,
      comments: "Client Secret generated under 'Certificates & Secrets' in the Azure application.",
    },
    source,
  },
});
