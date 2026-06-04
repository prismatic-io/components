import { oauth2Connection, OAuth2Type } from "@prismatic-io/spectral";

export const oauth2 = oauth2Connection({
  key: "oauth2",
  display: {
    label: "OAuth 2.0",
    description: "Authenticate using OAuth 2.0.",
  },
  oauth2Type: OAuth2Type.AuthorizationCode,
  inputs: {
    authorizeUrl: {
      type: "string",
      required: true,
      shown: true,
      default: "https://oauth.pipedrive.com/oauth/authorize",
      label: "Authorization URL",
      comments: "OAuth 2.0 Authorization URL for Pipedrive authentication.",
      example: "https://oauth.pipedrive.com/oauth/authorize",
      placeholder: "Enter Authorization URL",
    },
    tokenUrl: {
      type: "string",
      required: true,
      shown: true,
      default: "https://oauth.pipedrive.com/oauth/token",
      label: "Token URL",
      comments: "OAuth 2.0 Token URL for Pipedrive authentication.",
      example: "https://oauth.pipedrive.com/oauth/token",
      placeholder: "Enter Token URL",
    },
    scopes: {
      type: "string",
      required: false,
      shown: false,
      default: "",
      label: "Scopes",
      comments: "Space-delimited OAuth permission scopes.",
      placeholder: "Enter OAuth scopes",
    },
    clientId: {
      type: "string",
      required: true,
      shown: true,
      label: "Client ID",
      comments:
        "The Client ID from the Pipedrive OAuth app. Find this in Pipedrive Settings > Marketplace > Your Apps.",
      example: "abc123def456",
      placeholder: "Enter Client ID",
    },
    clientSecret: {
      type: "password",
      required: true,
      shown: true,
      label: "Client Secret",
      comments: "The Client Secret from the Pipedrive OAuth app. Keep this value secure.",
      placeholder: "Enter Client Secret",
    },
  },
});

export default [oauth2];
