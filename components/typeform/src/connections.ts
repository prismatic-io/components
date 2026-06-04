import {
  connection,
  oauth2Connection,
  OAuth2Type,
} from "@prismatic-io/spectral";

export const oauth2 = oauth2Connection({
  oauth2Type: OAuth2Type.AuthorizationCode,
  key: "typeform-oauth2",
  display: {
    label: "OAuth 2.0",
    description:
      "This connection allows you to authenticate with Typeform using OAuth 2.0.",
  },
  inputs: {
    authorizeUrl: {
      label: "Authorize URL",
      placeholder: "Authorize URL",
      type: "string",
      required: true,
      shown: false,
      comments: "The OAuth 2.0 Authorization URL for Typeform",
      default: "https://api.typeform.com/oauth/authorize",
    },
    tokenUrl: {
      label: "Token URL",
      placeholder: "Token URL",
      type: "string",
      required: true,
      shown: false,
      comments: "The OAuth 2.0 Token URL for Typeform",
      default: "https://api.typeform.com/oauth/token",
    },
    scopes: {
      label: "Scopes",
      placeholder: "Scopes",
      type: "string",
      required: true,
      shown: true,
      default:
        "offline accounts:read forms:write forms:read	images:write images:write images:read themes:write themes:read responses:read responses:write webhooks:read	webhooks:write workspaces:read workspaces:write",
      comments:
        "A comma-delimited set of one or more scopes to get the user's permission to access. Refer to https://www.typeform.com/developers/get-started/scopes/",
    },
    clientId: {
      label: "Client ID",
      placeholder: "Client ID",
      type: "string",
      required: true,
      shown: true,
    },
    clientSecret: {
      label: "Client Secret",
      placeholder: "Client Secret",
      type: "password",
      required: true,
      shown: true,
    },
  },
});

export const personalToken = connection({
  key: "typeform-personal-token",
  display: {
    label: "Personal Token",
    description: "Personal Token for Typeform",
  },
  inputs: {
    personalToken: {
      label: "Personal Token",
      placeholder: "Personal Token",
      type: "password",
      required: true,
      comments: "Personal Token for Typeform",
    },
  },
});

export default [oauth2, personalToken];
