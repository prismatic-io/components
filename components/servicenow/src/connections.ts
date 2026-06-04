import {
  connection,
  OAuth2Type,
  oauth2Connection,
} from "@prismatic-io/spectral";

export const basic = connection({
  key: "basic",
  display: {
    label: "Basic Username/Password",
    description: "Basic Username and Password connection",
  },
  inputs: {
    username: {
      label: "Username",
      placeholder: "Username",
      type: "string",
      required: true,
      shown: true,
      comments: "Username",
    },
    password: {
      label: "Password",
      placeholder: "Password",
      type: "password",
      required: true,
      shown: true,
      comments: "Password",
    },
  },
});

export const authorizationCode = oauth2Connection({
  key: "authorizationCode",
  display: {
    label: "OAuth 2.0 Authorization Code",
    description: "OAuth 2.0 Authorization Code flow",
  },
  oauth2Type: OAuth2Type.AuthorizationCode,
  inputs: {
    authorizeUrl: {
      label: "Authorize URL",
      placeholder: "Authorize URL",
      type: "string",
      required: true,
      shown: true,
      example: "https://dev12345.service-now.com/oauth_auth.do",
      comments: "The OAuth 2.0 Authorization URL for ServiceNow",
    },
    tokenUrl: {
      label: "Token URL",
      placeholder: "Token URL",
      type: "string",
      required: true,
      shown: true,
      example: "https://dev12345.service-now.com/oauth_token.do",
      comments: "The OAuth 2.0 Token URL for ServiceNow",
    },
    scopes: {
      label: "Scopes",
      placeholder: "Scopes",
      type: "string",
      required: false,
      shown: true,
      comments: "Space separated OAuth 2.0 permission scopes for ServiceNow",
      default: "",
    },
    clientId: {
      label: "Client ID",
      placeholder: "Client ID",
      type: "string",
      required: true,
      shown: true,
      comments: "Client Identifier of your app for ServiceNow",
    },
    clientSecret: {
      label: "Client Secret",
      placeholder: "Client Secret",
      type: "password",
      required: true,
      shown: true,
      comments: "Client Secret of your app for ServiceNow",
    },
  },
});

export default [authorizationCode, basic];
