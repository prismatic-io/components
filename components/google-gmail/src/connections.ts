import { connection, oauth2Connection, OAuth2Type } from "@prismatic-io/spectral";

export const gmailOauth = oauth2Connection({
  key: "oauth2",
  display: {
    label: "OAuth 2.0",
    description: "OAuth2 Connection",
  },
  oauth2Type: OAuth2Type.AuthorizationCode,
  iconPath: "oauth-button.png",
  inputs: {
    authorizeUrl: {
      label: "Authorize URL",
      placeholder: "Enter Authorize URL",
      type: "string",
      required: true,
      shown: false,
      comments: "OAuth 2.0 authorization URL for Gmail authentication.",
      default: "https://accounts.google.com/o/oauth2/v2/auth?access_type=offline&prompt=consent",
      example: "https://accounts.google.com/o/oauth2/v2/auth?access_type=offline&prompt=consent",
    },
    tokenUrl: {
      label: "Token URL",
      placeholder: "Enter Token URL",
      type: "string",
      required: true,
      shown: false,
      comments: "OAuth 2.0 token URL for Gmail authentication.",
      default: "https://oauth2.googleapis.com/token",
      example: "https://oauth2.googleapis.com/token",
    },
    scopes: {
      label: "Scopes",
      placeholder: "Enter OAuth scopes (space-separated)",
      type: "string",
      required: true,
      comments:
        'Space-separated list of OAuth permission scopes. See <a href="https://developers.google.com/gmail/api/auth/scopes">Gmail API Scopes documentation</a> for available scopes.',
      default: "https://mail.google.com/ https://www.googleapis.com/auth/pubsub",
      example:
        "https://www.googleapis.com/auth/gmail.readonly https://www.googleapis.com/auth/gmail.send",
    },
    clientId: {
      label: "Client ID",
      placeholder: "Enter Client ID",
      type: "string",
      required: true,
      comments:
        "The Client ID from the Google Cloud Console. Navigate to APIs & Services > Credentials to find this value.",
      example: "123456789012-abc123def456ghi789jkl012mno345pqr.apps.googleusercontent.com",
    },
    clientSecret: {
      label: "Client Secret",
      placeholder: "Enter Client Secret",
      type: "password",
      required: true,
      comments:
        "The Client Secret from the Google Cloud Console. Navigate to APIs & Services > Credentials to find this value.",
    },
  },
});

export const gmailServiceAccountAuth = connection({
  key: "gmailServiceAccount",
  display: {
    label: "Service Account",
    description: "Service Account Connection",
  },
  inputs: {
    keyFile: {
      label: "Service Account Key File",
      placeholder: "Enter the JSON key file contents from service account",
      comments:
        "The JSON key file for the Google Service Account. Paste the entire contents of the downloaded JSON file including the BEGIN and END markers.",
      type: "text",
      required: true,
    },
    user: {
      label: "User",
      placeholder: "Enter user email address",
      type: "string",
      required: true,
      example: "support@yourcompany.com",
      comments:
        "The Google Workspace user email address to impersonate. This must be a valid user in the Workspace domain.",
    },
    scopes: {
      label: "Scopes",
      placeholder: "Enter OAuth scopes (space-separated)",
      type: "string",
      required: true,
      comments:
        'Space-separated list of OAuth permission scopes. See <a href="https://developers.google.com/gmail/api/auth/scopes">Gmail API Scopes documentation</a> for available scopes.',
      default: "https://mail.google.com/ https://www.googleapis.com/auth/pubsub",
      example:
        "https://www.googleapis.com/auth/gmail.readonly https://www.googleapis.com/auth/gmail.send",
    },
  },
});
