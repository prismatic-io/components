import { OAuth2Type, oauth2Connection } from "@prismatic-io/spectral";
import { DEFAULT_SCOPES } from "../constants";

export const oauth = oauth2Connection({
  key: "bynder-oauth",
  oauth2Type: OAuth2Type.AuthorizationCode,
  display: {
    description: "OAuth 2.0",
    label: "OAuth 2.0",
  },
  comments: "Bynder OAuth connection",
  inputs: {
    authorizeUrl: {
      label: "Authorize URL",
      type: "string",
      shown: true,
      required: true,
      comments: "The OAuth 2.0 authorization URL for the Bynder domain.",
      example: "https://portal.bynder.com/v6/authentication/oauth2/auth",
      placeholder: "Enter Authorize URL",
    },
    tokenUrl: {
      label: "Token URL",
      type: "string",
      shown: true,
      required: true,
      comments:
        "The OAuth 2.0 token URL used to exchange the authorization code for an access token.",
      example: "https://portal.bynder.com/v6/authentication/oauth2/token",
      placeholder: "Enter Token URL",
    },
    scopes: {
      label: "Scopes",
      type: "string",
      shown: true,
      required: true,
      comments:
        "Space-separated list of OAuth permission scopes granted to the access token.",
      example: DEFAULT_SCOPES,
      placeholder: "Enter OAuth scopes",
      default: DEFAULT_SCOPES,
    },
    clientId: {
      label: "Client ID",
      type: "string",
      shown: true,
      required: true,
      comments: "The Client ID from the Bynder OAuth application credentials.",
      example: "12345678-1234-1234-1234-123456789abc",
      placeholder: "Enter Client ID",
    },
    clientSecret: {
      label: "Client Secret",
      type: "password",
      shown: true,
      required: true,
      comments:
        "The Client Secret from the Bynder OAuth application credentials.",
      placeholder: "Enter Client Secret",
    },
  },
});

export const oauthCredentials = oauth2Connection({
  key: "bynder-client-credentials-oauth",
  oauth2Type: OAuth2Type.ClientCredentials,
  display: {
    description: "Client Credentials OAuth 2.0",
    label: "OAuth 2.0 Client Credentials",
  },
  comments: "Bynder Client Credentials OAuth connection",
  inputs: {
    tokenUrl: {
      label: "Token URL",
      type: "string",
      shown: true,
      required: true,
      comments:
        "The OAuth 2.0 token URL used to exchange the client credentials for an access token.",
      example: "https://portal.bynder.com/v6/authentication/oauth2/token",
      placeholder: "Enter Token URL",
    },
    scopes: {
      label: "Scopes",
      type: "string",
      shown: true,
      required: true,
      comments:
        "Space-separated list of OAuth permission scopes granted to the access token.",
      example: DEFAULT_SCOPES,
      placeholder: "Enter OAuth scopes",
      default: DEFAULT_SCOPES,
    },
    clientId: {
      label: "Client ID",
      type: "string",
      shown: true,
      required: true,
      comments: "The Client ID from the Bynder OAuth application credentials.",
      example: "12345678-1234-1234-1234-123456789abc",
      placeholder: "Enter Client ID",
    },
    clientSecret: {
      label: "Client Secret",
      type: "password",
      shown: true,
      required: true,
      comments:
        "The Client Secret from the Bynder OAuth application credentials.",
      placeholder: "Enter Client Secret",
    },
  },
});

export default [oauth, oauthCredentials];
