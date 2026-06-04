import {
  connection,
  OAuth2Type,
  oauth2Connection,
} from "@prismatic-io/spectral";

export const apiKey = connection({
  key: "apiKey",
  display: {
    label: "API Key",
    description: "Authenticate requests using an API key.",
  },
  inputs: {
    apiKey: {
      label: "API Key",
      placeholder: "Enter API Key",
      type: "string",
      required: true,
      shown: true,
      comments:
        "The Monday.com API key used for authentication. Generate one from the Monday.com account settings.",
    },
  },
});

export const oauth = oauth2Connection({
  key: "oauth",
  display: {
    label: "OAuth 2.0",
    description: "Authenticate using OAuth 2.0.",
  },
  oauth2Type: OAuth2Type.AuthorizationCode,
  inputs: {
    authorizeUrl: {
      label: "Authorize URL",
      placeholder: "Enter Authorize URL",
      type: "string",
      required: true,
      shown: false,
      default: "https://auth.monday.com/oauth2/authorize",
      comments: "The OAuth 2.0 Authorization URL for Monday.",
    },
    tokenUrl: {
      label: "Token URL",
      placeholder: "Enter Token URL",
      type: "string",
      required: true,
      shown: false,
      default: "https://auth.monday.com/oauth2/token",
      comments: "The OAuth 2.0 Token URL for Monday.",
    },
    scopes: {
      label: "Scopes",
      placeholder: "Enter OAuth scopes",
      type: "string",
      required: false,
      shown: true,
      comments:
        "Space-separated list of OAuth 2.0 permission scopes for Monday. See [Monday.com OAuth scopes](https://developer.monday.com/apps/docs/oauth#set-up-permission-scopes).",
      example: "me:read boards:read",
      default:
        "account:read assets:read boards:read boards:write me:read notifications:write tags:read teams:read updates:read updates:write users:read users:write webhooks:read webhooks:write workspaces:read workspaces:write",
    },
    clientId: {
      label: "Client ID",
      placeholder: "Enter Client ID",
      type: "string",
      required: true,
      shown: true,
      comments:
        "The Client ID from the Monday.com OAuth application credentials.",
    },
    clientSecret: {
      label: "Client Secret",
      placeholder: "Enter Client Secret",
      type: "password",
      required: true,
      shown: true,
      comments:
        "The Client Secret from the Monday.com OAuth application credentials.",
    },
  },
});

export default [oauth, apiKey];
