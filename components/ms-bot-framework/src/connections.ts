import { connection, oauth2Connection, OAuth2Type } from "@prismatic-io/spectral";

export const clientCredentials = oauth2Connection({
  key: "clientCredentials",
  oauth2Type: OAuth2Type.ClientCredentials,
  display: {
    label: "OAuth 2.0 Client Credentials",
    description: "OAuth 2.0 Client Credentials Connectivity for Microsoft Bot Framework",
  },
  inputs: {
    tokenUrl: {
      label: "Token URL",
      placeholder: "Token URL",
      type: "string",
      required: true,
      shown: true,
      comments:
        "The OAuth 2.0 Token URL for Microsoft Bot Framework. Use the default for Multi-Tenant bots and `https://login.microsoftonline.com/<tenant_id>/oauth2/v2.0/token` for Single-Tenant.",
      default: "https://login.microsoftonline.com/botframework.com/oauth2/v2.0/token",
    },
    scopes: {
      label: "Scopes",
      placeholder: "Scopes",
      type: "string",
      required: true,
      shown: false,
      comments: "Scopes for Microsoft Bot Framework and Microsoft Graph.",
      default: "https://api.botframework.com/.default",
    },
    clientId: {
      label: "Client ID",
      placeholder: "Enter Client ID",
      type: "string",
      required: true,
      shown: true,
      comments: "The Client ID (Application ID) from your Azure Bot registration.",
      example: "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
    },
    clientSecret: {
      label: "Client Secret Value",
      placeholder: "Enter Client Secret value",
      type: "password",
      required: true,
      shown: true,
      comments:
        "The Client Secret value from your Azure Bot registration under 'Certificates & Secrets'.",
      example: "a1B~2cD3eF4gH5iJ6kL7mN8oP9qR0sT1uV2wX",
    },
  },
});

export const directLine = connection({
  key: "directLine",
  display: {
    label: "Direct Line",
    description: "Direct Line connection for Microsoft Bot Framework",
  },
  inputs: {
    directLineSecret: {
      label: "Direct Line Secret",
      type: "password",
      placeholder: "Direct Line Secret Value",
      required: true,
      comments: "The Direct Line secret value for your bot.",
    },
  },
});

export default [clientCredentials, directLine];
