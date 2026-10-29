import {
  connection,
  OAuth2Type,
  oauth2Connection,
} from "@prismatic-io/spectral";

export const intercomConnection = oauth2Connection({
  key: "intercom",
  display: {
    label: "OAuth 2.0",
    description: "OAuth 2.0 connection for Intercom",
  },
  oauth2Type: OAuth2Type.AuthorizationCode,
  inputs: {
    authorizeUrl: {
      label: "Authorize URL",
      type: "string",
      required: true,
      shown: false,
      default: "https://app.intercom.com/oauth",
      comments: "Authorization URL for Intercom",
    },
    tokenUrl: {
      label: "Token URL",
      type: "string",
      required: true,
      shown: false,
      default: "https://api.intercom.io/auth/eagle/token",
      comments: "Token URL for Intercom",
    },
    scopes: {
      label: "Scopes",
      type: "string",
      required: false,
      shown: false,
      default: "",
      comments: "Space delimited scopes",
    },
    clientId: {
      label: "Client ID",
      type: "string",
      required: true,
      comments: "Client ID of your Intercom app",
    },
    clientSecret: {
      label: "Client Secret",
      type: "password",
      required: true,
      comments: "Client Secret of your Intercom app",
    },
  },
});

export const accessTokenAuth = connection({
  key: "intercomAccesssToken",
  display: {
    label: "Access Token",
    description: "Access Token connection for Intercom",
  },
  inputs: {
    accessToken: {
      label: "Access Token",
      type: "password",
      required: true,
      comments: "Access Token for Intercom",
    },
  },
});

export default [intercomConnection, accessTokenAuth];
