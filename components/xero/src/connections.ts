import { oauth2Connection, OAuth2Type } from "@prismatic-io/spectral";

export const xeroOAuth = oauth2Connection({
  oauth2Type: OAuth2Type.AuthorizationCode,
  key: "oauth2",
  display: {
    label: "OAuth 2.0",
    description: "OAuth 2.0 connection for Xero",
  },
  inputs: {
    authorizeUrl: {
      label: "Authorize URL",
      placeholder: "Authorize URL",
      type: "string",
      required: true,
      shown: false,
      comments: "The OAuth 2.0 Authorization URL for Xero",
      default: "https://login.xero.com/identity/connect/authorize",
    },
    tokenUrl: {
      label: "Token URL",
      placeholder: "Token URL",
      type: "string",
      required: true,
      shown: false,
      comments: "The OAuth 2.0 Token URL for Xero",
      default: "https://identity.xero.com/connect/token",
    },
    scopes: {
      label: "Scopes",
      placeholder: "Scopes",
      type: "string",
      required: true,
      shown: true,
      example: "accounting.contacts",
      default:
        "offline_access accounting.settings accounting.contacts accounting.attachments",
      comments:
        "A space-delimited set of one or more scopes to get the user's permission to access. You must specify 'offline_access' to enable automatic token refresh.",
    },
    clientId: {
      label: "Client ID",
      placeholder: "Client ID",
      type: "string",
      required: true,
      shown: true,
      comments:
        "Provide the Client Id you received from the Xero Developer Console.",
    },
    clientSecret: {
      label: "Client Secret",
      placeholder: "Client Secret",
      type: "password",
      required: true,
      shown: true,
      comments:
        "Provide the Client Secret you generated from the Xero Developer Console.",
    },
    tenant: {
      label: "Tenant Name",
      placeholder: "Tenant Name",
      type: "string",
      required: true,
      example: "Acme Inc.",
      shown: true,
      comments: "The name of the tenant you are requesting access to.",
    },
  },
});

export const xeroOAuthClientCredentials = oauth2Connection({
  key: "xeroOAuthClientCredentials",
  display: {
    label: "OAuth 2.0 Client Credentials",
    description: "OAuth 2.0 Client Credentials connection for Xero",
  },
  oauth2Type: OAuth2Type.ClientCredentials,
  inputs: {
    tokenUrl: {
      label: "Token URL",
      placeholder: "Token URL",
      type: "string",
      required: true,
      shown: false,
      comments: "The OAuth 2.0 Token URL for Xero",
      default: "https://identity.xero.com/connect/token",
    },

    scopes: {
      label: "Scopes",
      placeholder: "Scopes",
      type: "string",
      required: true,
      shown: true,
      example: "accounting.contacts",
      default: "accounting.settings accounting.contacts accounting.attachments",
      comments:
        "A space-delimited set of one or more scopes to get the user's permission to access. Don't specify 'offline_access' as this is a client credentials flow.",
    },
    clientId: {
      label: "Client ID",
      placeholder: "Client ID",
      type: "string",
      required: true,
      shown: true,
      comments:
        "Provide the Client Id you received from the Xero Developer Console.",
    },
    clientSecret: {
      label: "Client Secret",
      placeholder: "Client Secret",
      type: "password",
      required: true,
      shown: true,
      comments:
        "Provide the Client Secret you generated from the Xero Developer Console.",
    },
  },
});

export default [xeroOAuth, xeroOAuthClientCredentials];
