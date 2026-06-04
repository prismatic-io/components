import {
  connection,
  oauth2Connection,
  OAuth2PkceMethod,
  OAuth2Type,
} from "@prismatic-io/spectral";

export const klaviyoOAuth2Connection = oauth2Connection({
  oauth2Type: OAuth2Type.AuthorizationCode,
  oauth2PkceMethod: OAuth2PkceMethod.S256,
  key: "klaviyoOAuth2Connection",
  display: {
    label: "OAuth 2.0",
    description: "Connection to Klaviyo using OAuth 2.0.",
  },
  inputs: {
    authorizeUrl: {
      label: "Authorize URL",
      type: "string",
      required: true,
      shown: false,
      default: "https://www.klaviyo.com/oauth/authorize",
    },
    tokenUrl: {
      label: "Token URL",
      type: "string",
      required: true,
      shown: false,
      default: "https://a.klaviyo.com/oauth/token",
    },
    scopes: {
      label: "Scopes",
      type: "string",
      required: false,
      shown: true,
      comments: "Space separated list of scopes if needed",
    },
    clientId: {
      label: "Client ID",
      type: "string",
      required: true,
      shown: true,
    },
    clientSecret: {
      label: "Client secret",
      type: "password",
      required: true,
      shown: true,
    },
  },
});

export const klaviyoApiKeyConnection = connection({
  key: "klaviyoApiKeyConnection",
  display: {
    label: "API Key",
    description: "Connection to Klaviyo using an API Key.",
  },
  comments: "Connection to Klaviyo using an API Key.",
  inputs: {
    apiKey: {
      label: "API Key",
      type: "password",
      required: true,
      comments: "Your API Key for Klaviyo",
    },
  },
});

export default [klaviyoApiKeyConnection, klaviyoOAuth2Connection];
