import { OAuth2Type, oauth2Connection } from "@prismatic-io/spectral";
import { applicationKey, environment, tenant } from "./inputs";

export const serviceTitanConnection = oauth2Connection({
  key: "serviceTitanConnection",
  display: {
    description: "Connect to Service Titan using OAuth 2.0",
    label: "OAuth 2.0",
  },
  oauth2Type: OAuth2Type.ClientCredentials,
  inputs: {
    authorizeUrl: {
      label: "Authorize URL",
      placeholder: "Authorize URL",
      type: "string",
      required: false,
      shown: false,
      comments: "The OAuth 2.0 Authorization URL for the API",
    },
    tokenUrl: {
      label: "Token URL",
      placeholder: "Token URL",
      type: "string",
      required: true,
      shown: true,
      comments: "The OAuth 2.0 Token URL for the API",
      model: [
        {
          label: "Token URL (Production)",
          value: "https://auth.servicetitan.io/connect/token",
        },
        {
          label: "Token URL (Integration)",
          value: "https://auth-integration.servicetitan.io/connect/token ",
        },
      ],
    },
    scopes: {
      label: "Scopes",
      placeholder: "Scopes",
      type: "string",
      required: false,
      shown: false,
      comments: "Space separated OAuth 2.0 permission scopes for the API",
      default: "",
    },
    clientId: {
      label: "Client ID",
      placeholder: "Client ID",
      type: "string",
      required: true,
      shown: true,
      comments: "Client Identifier of your app for the API",
    },
    clientSecret: {
      label: "Client Secret",
      placeholder: "Client Secret",
      type: "password",
      required: true,
      shown: true,
      comments: "Client Secret of your app for the API",
    },
    tenant,
    applicationKey,
    environment,
  },
});

export default [serviceTitanConnection];
