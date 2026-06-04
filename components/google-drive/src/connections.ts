import { oauth2Connection, OAuth2Type } from "@prismatic-io/spectral";

export const connection = oauth2Connection({
  key: "oauth2",
  display: {
    label: "OAuth2",
    description: "OAuth2 Connection",
  },
  oauth2Type: OAuth2Type.AuthorizationCode,
  iconPath: "oauth-button.png",
  inputs: {
    authorizeUrl: {
      label: "Authorize URL",
      placeholder: "Authorization URL",
      type: "string",
      required: true,
      shown: false,
      comments: "The Authorization URL for Google Drive.",
      default: "https://accounts.google.com/o/oauth2/v2/auth?access_type=offline&prompt=consent",
    },
    tokenUrl: {
      label: "Token URL",
      placeholder: "Token URL",
      type: "string",
      required: true,
      shown: false,
      comments: "The Token URL for Google Drive.",
      default: "https://oauth2.googleapis.com/token",
    },
    scopes: {
      label: "Scopes",
      placeholder: "Scopes",
      type: "string",
      required: true,
      comments:
        "Space delimited listing of scopes. https://developers.google.com/identity/protocols/oauth2/scopes#drive",
      default:
        "https://www.googleapis.com/auth/drive https://www.googleapis.com/auth/drive.activity.readonly",
    },
    clientId: {
      label: "Client ID",
      placeholder: "Enter Client ID",
      type: "string",
      required: true,
      comments:
        "The Client ID from the Google Cloud Console. Navigate to APIs & Services > Credentials to find this value.",
      example: "123456789012-abcdefghijklmnopqrstuvwxyz123456.apps.googleusercontent.com",
    },
    clientSecret: {
      label: "Client Secret",
      placeholder: "Enter Client Secret",
      type: "password",
      required: true,
      comments:
        "The Client Secret from the Google Cloud Console. This value is shown when creating OAuth 2.0 credentials.",
    },
  },
});
