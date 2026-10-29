import { oauth2Connection, OAuth2Type } from "@prismatic-io/spectral";

export const googleConnection = oauth2Connection({
  oauth2Type: OAuth2Type.AuthorizationCode,
  key: "oauth2",
  display: {
    label: "Google Sheets OAuth 2.0",
    description:
      "Authenticate requests to Google Sheets using values obtained from the Google Cloud Platform.",
  },
  inputs: {
    authorizeUrl: {
      label: "Authorize URL",
      placeholder: "Enter Authorize URL",
      type: "string",
      required: true,
      shown: false,
      comments: "The OAuth 2.0 Authorization URL for Google Sheets.",
      default:
        "https://accounts.google.com/o/oauth2/v2/auth?access_type=offline&prompt=consent",
    },
    tokenUrl: {
      label: "Token URL",
      placeholder: "Enter Token URL",
      type: "string",
      required: true,
      shown: false,
      comments: "The OAuth 2.0 Token URL for Google Sheets.",
      default: "https://oauth2.googleapis.com/token",
    },
    scopes: {
      label: "Scopes",
      placeholder: "Enter scopes",
      type: "string",
      required: false,
      shown: true,
      comments:
        "Space-delimited list of OAuth scopes to request. Common scopes include spreadsheets (read/write), drive.file (create/edit files), and drive.readonly. [Learn more](https://developers.google.com/identity/protocols/oauth2/scopes#sheets)",
      example:
        "https://www.googleapis.com/auth/spreadsheets https://www.googleapis.com/auth/drive.file https://www.googleapis.com/auth/drive.readonly",
      default:
        "https://www.googleapis.com/auth/spreadsheets https://www.googleapis.com/auth/drive.file https://www.googleapis.com/auth/drive.readonly",
    },
    clientId: {
      label: "Client ID",
      placeholder: "Enter Client ID",
      type: "string",
      required: true,
      shown: true,
      comments:
        "Client ID from your Google Cloud Console OAuth credentials. [Learn more](https://developers.google.com/workspace/guides/create-credentials#oauth-client-id)",
      example:
        "123456789012-abcdefghijklmnopqrstuvwxyz123456.apps.googleusercontent.com",
    },
    clientSecret: {
      label: "Client Secret",
      placeholder: "Enter Client Secret",
      type: "password",
      required: true,
      shown: true,
      comments:
        "Client Secret generated in your Google Cloud Console OAuth credentials. [Learn more](https://developers.google.com/workspace/guides/create-credentials#oauth-client-id)",
      example: "GOCSPX-abcdefghijklmnopqrstuvwxyz",
    },
  },
});

export default [googleConnection];
