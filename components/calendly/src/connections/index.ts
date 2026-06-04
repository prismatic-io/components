import { oauth2Connection, OAuth2Type } from "@prismatic-io/spectral";
import { LIVE_AUTH_URL } from "../constants";

export const calendlyOauth2Connection = oauth2Connection({
  key: "calendlyOauth2Connection",
  display: {
    description: "Authenticate using OAuth 2.0",
    label: "OAuth 2.0",
  },
  oauth2Type: OAuth2Type.AuthorizationCode,
  inputs: {
    authorizeUrl: {
      label: "Authorize URL",
      placeholder: "Enter authorize URL",
      type: "string",
      default: `${LIVE_AUTH_URL}/oauth/authorize`,
      required: true,
      shown: true,
      comments: "The OAuth 2.0 Authorization URL for the Calendly API.",
    },
    tokenUrl: {
      label: "Token URL",
      placeholder: "Enter token URL",
      type: "string",
      default: `${LIVE_AUTH_URL}/oauth/token`,
      required: true,
      shown: true,
      comments: "The OAuth 2.0 Token URL for the Calendly API.",
    },
    scopes: {
      label: "Scopes",
      placeholder: "Enter OAuth scopes",
      type: "string",
      required: false,
      shown: true,
      default: "default",
      comments: "Space-separated list of OAuth permission scopes.",
    },
    clientId: {
      label: "Client ID",
      placeholder: "Enter client ID",
      type: "string",
      required: true,
      shown: true,
      comments: "The Client ID from the OAuth application credentials.",
    },
    clientSecret: {
      label: "Client Secret",
      placeholder: "Enter client secret",
      type: "password",
      required: true,
      shown: true,
      comments: "The Client Secret from the OAuth application credentials.",
    },
    useLiveServer: {
      label: "Use Live Server",
      type: "boolean",
      required: true,
      comments:
        "When true, uses the live server. When false, uses the mock server.",
    },
  },
});

export default [calendlyOauth2Connection];
