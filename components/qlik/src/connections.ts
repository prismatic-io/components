import {
  connection,
  OAuth2PkceMethod,
  OAuth2Type,
  oauth2Connection,
} from "@prismatic-io/spectral";

export const apiKey = connection({
  key: "apiKey",
  display: {
    label: "API Key",
    description: "API Key connection for Qlik",
  },
  inputs: {
    apiKey: {
      label: "API Key",
      placeholder:
        "eyJhbGciOiJFUzM4NCIsImtpZCI6IjQ2ZDg0MTkxLTgxMzYtNGE3NS1hMTI2LTFjNWU5MjcwODI2ZCIsInR5cCI6IkpXVCJ9.eyJzdWJUeXBlIjoidXNlciIsInRlbmFudElkIjoic1Q1TTgtc0RhRVFjb1ZVOFVmUVA5OGNTOXc3R0hSSGwiLCJqdGkiOiI0NmQ4NDE5MS04MTM2LTRhNzUtYTEyNi0xYzVlOTI3MDgyNmQiLCJhdWQiOiJxbGlrLmFwaSIsImlzcyI6InFsaWsuYXBpL2FwaS1rZXlzIiwic3ViIjoiNjRiNmUwY2Q0ZWNiY2Q3NWE1NGU3NjY3In0._oemBbUrOmB93PNOtEUvNHcMFGO08wQGL79smL0sPm4TTptNMeZlYh4vbY_H6_xTGdRFk0nOCDa8WxtckdGSliq09LiYlCCZcMYiDKqCywe7ppNiRUXdE2wkL2fgDKa6",
      type: "password",
      required: true,
      comments: "API Key for your Qlik User",
    },
    tenant: {
      label: "Tenant",
      placeholder: "v34wwyjhxohtob1.us.qlikcloud.com",
      type: "string",
      required: true,
      comments:
        "The tenant of your Qlik account, the first part of your URL: v34wwyjhxohtob1.us.qlikcloud.com",
      example: "v34wwyjhxohtob1",
    },
  },
});

export const oauth = oauth2Connection({
  key: "oauth2",
  display: {
    label: "OAuth 2.0",
    description:
      "Allows a client application to use an OAuth flow to request user authorization.",
  },
  oauth2Type: OAuth2Type.AuthorizationCode,
  oauth2PkceMethod: OAuth2PkceMethod.S256,
  inputs: {
    authorizeUrl: {
      label: "Authorize URL",
      placeholder: "Authorize URL",
      type: "string",
      required: true,
      shown: true,
      default: "https://<your-tenant>.us.qlikcloud.com/oauth/authorize",
      comments: "The OAuth 2.0 Authorization URL for Qlik",
    },
    tokenUrl: {
      label: "Token URL",
      placeholder: "Token URL",
      type: "string",
      required: true,
      shown: true,
      default: "https://<your-tenant>.us.qlikcloud.com/oauth/token",
      comments: "The OAuth 2.0 Token URL for Sage",
    },
    scopes: {
      label: "Scopes",
      placeholder: "Scopes",
      type: "string",
      required: true,
      shown: true,
      comments: "Space separated OAuth 2.0 permission scopes for Sage",
      default: "user_default online_access",
    },
    clientId: {
      label: "Client ID",
      placeholder: "Client ID",
      type: "string",
      required: true,
      shown: true,
      comments: "Client Identifier of your app for Sage",
    },
    clientSecret: {
      label: "Client Secret",
      placeholder: "Client Secret",
      type: "password",
      required: true,
      shown: true,
      comments: "Client Secret of your app for Sage",
    },
  },
});




















































export default [apiKey, oauth];
