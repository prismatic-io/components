import { OAuth2Type, oauth2Connection } from "@prismatic-io/spectral";
import { AUTHORIZE_URL, DEFAULT_SCOPES, TOKEN_URL } from "./constants";

export const oauth2 = oauth2Connection({
  oauth2Type: OAuth2Type.AuthorizationCode,
  key: "ramp-oauth2",
  display: {
    label: "OAuth 2.0",
    description: "Authenticate with Ramp using OAuth 2.0 authorization code flow.",
  },
  inputs: {
    authorizeUrl: {
      label: "Authorize URL",
      placeholder: "Authorize URL",
      type: "string",
      required: true,
      shown: true,
      comments: "The OAuth 2.0 Authorization URL for Ramp",
      model: AUTHORIZE_URL,
    },
    tokenUrl: {
      label: "Token URL",
      placeholder: "Token URL",
      type: "string",
      required: true,
      shown: true,
      comments: "The OAuth 2.0 Token URL for Ramp",
      model: TOKEN_URL,
    },
    scopes: {
      label: "Scopes",
      placeholder: "Scopes",
      type: "string",
      required: true,
      shown: true,
      default: DEFAULT_SCOPES,
      comments:
        "A comma-delimited set of one or more scopes to get the user's permission to access. Refer to https://docs.ramp.com/developer-api/v1/authorization/scopes",
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

export default [oauth2];
