import { oauth2Connection, OAuth2Type } from "@prismatic-io/spectral";

export const googleDocsOauth2 = oauth2Connection({
  key: "googleDocsOauth2",
  display: {
    label: "Google Docs OAuth2",
    description: "Google Docs OAuth2 Connection",
  },
  oauth2Type: OAuth2Type.AuthorizationCode,
  inputs: {
    authorizeUrl: {
      label: "Authorize URL",
      placeholder: "Authorize URL",
      type: "string",
      required: true,
      shown: false,
      comments: "The OAuth 2.0 Authorization URL for Google Docs",
      default:
        "https://accounts.google.com/o/oauth2/v2/auth?access_type=offline&prompt=consent",
    },
    tokenUrl: {
      label: "Token URL",
      placeholder: "Token URL",
      type: "string",
      required: true,
      shown: false,
      comments: "The OAuth 2.0 Token URL for Google Docs",
      default: "https://oauth2.googleapis.com/token",
    },
    scopes: {
      label: "Scopes",
      placeholder: "Scopes",
      type: "string",
      required: false,
      shown: true,
      comments:
        "Space delimited listing of scopes. See [Google Docs API documentation](https://developers.google.com/docs/api/auth#scopes) for available scopes.",
      default: "https://www.googleapis.com/auth/documents",
    },
    clientId: {
      label: "Client ID",
      placeholder: "Client ID",
      type: "string",
      required: true,
      shown: true,
      comments: "Your Google Docs App's Client ID",
    },
    clientSecret: {
      label: "Client Secret",
      placeholder: "Client Secret",
      type: "password",
      required: true,
      shown: true,
      comments: "Your Google Docs App's Client Secret",
    },
  },
});

export default [googleDocsOauth2];
