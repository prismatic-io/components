import { OAuth2Type, oauth2Connection } from "@prismatic-io/spectral";

export const googleConnection = oauth2Connection({
  oauth2Type: OAuth2Type.AuthorizationCode,
  key: "oauth2",
  display: {
    label: "OAuth 2.0",
    description: "OAuth 2.0 connection for Google Calendar",
  },
  iconPath: "oauth-button.png",
  inputs: {
    authorizeUrl: {
      label: "Authorize URL",
      placeholder: "Enter OAuth 2.0 Authorization URL",
      type: "string",
      required: true,
      shown: false,
      comments: "The OAuth 2.0 Authorization URL for Google Calendar API.",
      default:
        "https://accounts.google.com/o/oauth2/v2/auth?access_type=offline&prompt=consent",
    },
    tokenUrl: {
      label: "Token URL",
      placeholder: "Enter OAuth 2.0 Token URL",
      type: "string",
      required: true,
      shown: false,
      comments: "The OAuth 2.0 Token URL for Google Calendar API.",
      default: "https://oauth2.googleapis.com/token",
    },
    scopes: {
      label: "Scopes",
      placeholder: "Enter OAuth scopes (space-delimited)",
      type: "string",
      required: false,
      shown: true,
      comments:
        "Space-delimited list of OAuth 2.0 scopes. See [Google Calendar API scopes](https://developers.google.com/calendar/api/auth) for available options.",
      default: "https://www.googleapis.com/auth/calendar",
    },
    clientId: {
      label: "Client ID",
      placeholder: "Enter Client ID",
      type: "string",
      required: true,
      example:
        "123456789012-abc123def456ghi789jkl012mno345pq.apps.googleusercontent.com",
      comments:
        "Client ID from your Google Cloud Platform OAuth 2.0 credentials.",
      shown: true,
    },
    clientSecret: {
      label: "Client Secret",
      placeholder: "Enter Client Secret",
      type: "password",
      example: "GOCSPX-abcd1234efgh5678ijkl",
      comments:
        "Client Secret from your Google Cloud Platform OAuth 2.0 credentials.",
      required: true,
      shown: true,
    },
  },
});

export default [googleConnection];
