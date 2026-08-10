import { input, OAuth2Type, oauth2Connection } from "@prismatic-io/spectral";
export const oauth2ClientCredentialsConnection = oauth2Connection({
  key: "oauth2ClientCredentials",
  display: {
    label: "OAuth 2.0 Client Credentials",
    description:
      "Authenticate using OAuth 2.0 Client Credentials via Oracle Identity Domains. Recommended for production use.",
  },
  oauth2Type: OAuth2Type.ClientCredentials,
  inputs: {
    tokenUrl: input({
      label: "Token URL",
      type: "string",
      required: true,
      shown: true,
      comments: "The OAuth 2.0 token URL from the Oracle Identity Domain.",
      placeholder: "Enter token URL",
      example: "https://idcs-abc123.identity.oraclecloud.com/oauth2/v1/token",
    }),
    clientId: input({
      label: "Client ID",
      type: "string",
      required: true,
      shown: true,
      comments:
        "The Client ID from the confidential application in Oracle Identity Domains.",
      placeholder: "Enter client ID",
      example: "abc1234567890def1234567890abcdef",
    }),
    clientSecret: input({
      label: "Client Secret",
      type: "password",
      required: true,
      shown: true,
      comments:
        "The Client Secret from the confidential application in Oracle Identity Domains.",
      placeholder: "Enter client secret",
    }),
    scopes: input({
      label: "Scopes",
      type: "string",
      required: false,
      shown: true,
      default: "urn:opc:idm:__myscopes__",
      comments:
        "The OAuth 2.0 scopes. The default grants access to all Oracle HCM REST API resources.",
      placeholder: "Enter scopes",
      example: "urn:opc:idm:__myscopes__",
    }),
    serverUrl: input({
      label: "Server URL",
      type: "string",
      required: true,
      shown: true,
      comments: "The Oracle HCM Cloud instance URL.",
      placeholder: "Enter server URL",
      example: "https://acme.fa.us2.oraclecloud.com",
    }),
  },
});
