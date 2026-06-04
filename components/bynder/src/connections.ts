import { OAuth2Type, oauth2Connection } from "@prismatic-io/spectral";
import { DEFAULT_SCOPES } from "./constants";

export const oauth = oauth2Connection({
  key: "bynder-oauth",
  oauth2Type: OAuth2Type.AuthorizationCode,
  display: {
    label: "OAuth 2.0",
    description: "OAuth 2.0 connection for Bynder",
  },
  comments: "Bynder OAuth connection",
  inputs: {
    authorizeUrl: {
      label: "Authorize URL",
      type: "string",
      shown: true,
      required: true,
      comments: "The URL to redirect the user to for authorization",
      example: "https://{your-bynder-domain}/v6/authentication/oauth2/auth",
      placeholder: "https://{your-bynder-domain}/v6/authentication/oauth2/auth",
    },
    tokenUrl: {
      label: "Token URL",
      type: "string",
      shown: true,
      required: true,
      comments:
        "The URL to exchange the authorization code for an access token",
      example: "https://{your-bynder-domain}/v6/authentication/oauth2/token",
      placeholder:
        "https://{your-bynder-domain}/v6/authentication/oauth2/token",
    },
    scopes: {
      label: "Scopes",
      type: "string",
      shown: true,
      required: true,
      comments: "The scopes for the access token",
      example: DEFAULT_SCOPES,
      placeholder: DEFAULT_SCOPES,
      default: DEFAULT_SCOPES,
    },
    clientId: {
      label: "Client ID",
      type: "string",
      shown: true,
      required: true,
      comments: "The client ID for the OAuth connection",
      example: "your-client-id",
      placeholder: "your-client-id",
    },
    clientSecret: {
      label: "Client Secret",
      type: "string",
      shown: true,
      required: true,
      comments: "The client secret for the OAuth connection",
      example: "your-client-secret",
      placeholder: "your-client-secret",
    },
  },
});

export const oauthCredentials = oauth2Connection({
  key: "bynder-client-credentials-oauth",
  oauth2Type: OAuth2Type.ClientCredentials,
  display: {
    label: "OAuth 2.0 Client Credentials",
    description: "OAuth 2.0 Client Credentials connection for Bynder",
  },
  comments: "Bynder Client Credentials OAuth connection",
  inputs: {
    tokenUrl: {
      label: "Token URL",
      type: "string",
      shown: true,
      required: true,
      comments:
        "The URL to exchange the authorization code for an access token",
      example: "https://{your-bynder-domain}/v6/authentication/oauth2/token",
      placeholder:
        "https://{your-bynder-domain}/v6/authentication/oauth2/token",
    },
    scopes: {
      label: "Scopes",
      type: "string",
      shown: true,
      required: true,
      comments: "The scopes for the access token",
      example: DEFAULT_SCOPES,
      placeholder: DEFAULT_SCOPES,
      default: DEFAULT_SCOPES,
    },
    clientId: {
      label: "Client ID",
      type: "string",
      shown: true,
      required: true,
      comments: "The client ID for the OAuth connection",
      example: "your-client-id",
      placeholder: "your-client-id",
    },
    clientSecret: {
      label: "Client Secret",
      type: "string",
      shown: true,
      required: true,
      comments: "The client secret for the OAuth connection",
      example: "your-client-secret",
      placeholder: "your-client-secret",
    },
  },
});

export default [oauth, oauthCredentials];
