import { OAuth2Type, oauth2Connection } from "@prismatic-io/spectral";

export const oauth = oauth2Connection({
  key: "oauth",
  display: {
    label: "OAuth 2.0",
    description: "OAuth 2.0 flow",
  },
  oauth2Type: OAuth2Type.AuthorizationCode,
  inputs: {
    authorizeUrl: {
      label: "Authorize URL",
      placeholder: "Authorize URL",
      type: "string",
      required: true,
      shown: false,
      default: "https://rest.tsheets.com/api/v1/authorize",
      comments: "The OAuth 2.0 Authorization URL for Quickbooks Time",
    },
    tokenUrl: {
      label: "Token URL",
      placeholder: "Token URL",
      type: "string",
      required: true,
      shown: false,
      default: "https://rest.tsheets.com/api/v1/grant",
      comments: "The OAuth 2.0 Token URL for Quickbooks Time",
    },
    
    scopes: {
      label: "Scopes",
      placeholder: "Scopes",
      type: "string",
      required: false,
      shown: false,
      comments: "Space separated OAuth 2.0 permission scopes for Quickbooks Time",
      default: "",
    },
    clientId: {
      label: "Client ID",
      placeholder: "Client ID",
      type: "string",
      required: true,
      shown: true,
      comments: "Client Identifier of your app for Quickbooks Time",
    },
    clientSecret: {
      label: "Client Secret",
      placeholder: "Client Secret",
      type: "password",
      required: true,
      shown: true,
      comments: "Client Secret of your app for Quickbooks Time",
    },
  },
});

export default [oauth];
