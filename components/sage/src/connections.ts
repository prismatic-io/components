import { OAuth2Type, oauth2Connection } from "@prismatic-io/spectral";

export const oauth = oauth2Connection({
  key: "oauth",
  display: {
    description: "OAuth 2.0 Connection for Sage",
    label: "OAuth 2.0",
  },
  comments: "OAuth 2.0 flow",
  oauth2Type: OAuth2Type.AuthorizationCode,
  inputs: {
    authorizeUrl: {
      label: "Authorize URL",
      placeholder: "Authorize URL",
      type: "string",
      required: true,
      shown: false,
      default: "https://www.sageone.com/oauth2/auth/central?filter=apiv3.1",
      comments: "The OAuth 2.0 Authorization URL for Sage",
    },
    tokenUrl: {
      label: "Token URL",
      placeholder: "Token URL",
      type: "string",
      required: true,
      shown: false,
      default: "https://oauth.accounting.sage.com/token",
      comments: "The OAuth 2.0 Token URL for Sage",
    },
    scopes: {
      label: "Scopes",
      placeholder: "Scopes",
      type: "string",
      required: true,
      shown: true,
      comments: "Space separated OAuth 2.0 permission scopes for Sage",
      default: "full_access",
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

export default [oauth];
