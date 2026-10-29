import { oauth2Connection, OAuth2Type } from "@prismatic-io/spectral";

export const gustoOauth = oauth2Connection({
  key: "gustoOauth",
  display: {
    label: "OAuth 2.0",
    description: "OAuth 2.0 connection for Gusto",
  },
  oauth2Type: OAuth2Type.AuthorizationCode,
  inputs: {
    authorizeUrl: {
      label: "Authorize URL",
      placeholder: "Authorize URL",
      type: "string",
      required: true,
      shown: true,
      default: "https://api.gusto.com/oauth/authorize",
      model: [
        {
          label: "Production (https://api.gusto.com/oauth/authorize)",
          value: "https://api.gusto.com/oauth/authorize",
        },
        {
          label:
            "Developer Sandbox (https://api.gusto-demo.com/oauth/authorize)",
          value: "https://api.gusto-demo.com/oauth/authorize",
        },
      ],
      comments: "The OAuth 2.0 Authorization URL for Gusto",
    },
    tokenUrl: {
      label: "Token URL",
      placeholder: "Token URL",
      type: "string",
      required: true,
      shown: true,
      default: "https://api.gusto.com/oauth/token",
      model: [
        {
          label: "Production (https://api.gusto.com/oauth/token)",
          value: "https://api.gusto.com/oauth/token",
        },
        {
          label: "Developer Sandbox (https://api.gusto-demo.com/oauth/token)",
          value: "https://api.gusto-demo.com/oauth/token",
        },
      ],
      comments: "The OAuth 2.0 Token URL for Gusto",
    },
    scopes: {
      label: "Scopes",
      placeholder: "Scopes",
      type: "string",
      required: false,
      shown: false,
      comments: "Scopes are not used for Gusto",
      default: "",
    },
    clientId: {
      label: "Client ID",
      placeholder: "Client ID",
      type: "string",
      required: true,
      shown: true,
      comments: "Client Identifier of your app for the API",
      example: "Client ID",
    },
    clientSecret: {
      label: "Client Secret",
      placeholder: "Client Secret",
      type: "password",
      required: true,
      shown: true,
      comments: "Client Secret of your app for the API",
      example: "Client Secret",
    },
  },
});

export default [gustoOauth];
