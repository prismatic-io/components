import { connection, OAuth2Type, oauth2Connection } from "@prismatic-io/spectral";

export const clickUpOauth2Connection = oauth2Connection({
  key: "clickUpOauth2Connection",
  display: {
    label: "OAuth 2.0",
    description: "Authenticate using OAuth 2.0.",
  },
  oauth2Type: OAuth2Type.AuthorizationCode,
  inputs: {
    authorizeUrl: {
      label: "Authorize URL",
      placeholder: "Enter Authorize URL",
      type: "string",
      required: true,
      shown: false,
      comments: "The OAuth 2.0 Authorization URL for ClickUp.",
      example: "https://app.clickup.com/api",
      default: "https://app.clickup.com/api",
    },
    tokenUrl: {
      label: "Token URL",
      placeholder: "Enter Token URL",
      type: "string",
      required: true,
      shown: false,
      comments: "The OAuth 2.0 Token URL for ClickUp.",
      example: "https://api.clickup.com/api/v2/oauth/token",
      default: "https://api.clickup.com/api/v2/oauth/token",
    },
    scopes: {
      label: "Scopes",
      placeholder: "Enter scopes",
      type: "string",
      required: false,
      shown: false,
      comments: "ClickUp does not support granular scopes.",
      default: "",
    },
    clientId: {
      label: "Client ID",
      placeholder: "Enter Client ID",
      type: "string",
      required: true,
      shown: true,
      example: "ABC123DEF456GHI789",
      comments:
        "The Client ID from the ClickUp OAuth app. Create an OAuth app via the [ClickUp Developer Portal](https://developer.clickup.com/docs/authentication).",
    },
    clientSecret: {
      label: "Client Secret",
      placeholder: "Enter Client Secret",
      type: "password",
      required: true,
      shown: true,
      comments:
        "The Client Secret from the ClickUp OAuth app. Create an OAuth app via the [ClickUp Developer Portal](https://developer.clickup.com/docs/authentication).",
    },
    headers: {
      label: "Headers",
      type: "string",
      collection: "keyvaluelist",
      required: false,
      shown: false,
      example: '{"X-Custom-Header": "value"}',
      comments: "Additional headers to supply to authorization requests.",
    },
  },
});

export const clickUpApiKeyConnection = connection({
  key: "apiKey",
  display: {
    label: "Personal Access Token",
    description: "Authenticate using a personal access token.",
  },
  inputs: {
    apiKey: {
      label: "Personal Access Token",
      placeholder: "Enter Personal Access Token",
      type: "password",
      required: true,
      shown: true,
      example: "pk_123456_ABC123DEF456GHI789",
      comments:
        "The ClickUp Personal Access Token used to authenticate API requests. Generate one in ClickUp Settings > Apps > API Token. See the [ClickUp Authentication docs](https://developer.clickup.com/docs/authentication) for details.",
    },
  },
});

export default [clickUpOauth2Connection, clickUpApiKeyConnection];
