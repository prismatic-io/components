import { oauth2Connection, OAuth2Type } from "@prismatic-io/spectral";

export const googleConnection = oauth2Connection({
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
      placeholder: "Enter Authorize URL",
      type: "string",
      required: true,
      shown: false,
      comments: "OAuth 2.0 authorization endpoint for Google Content API authentication.",
      default:
        "https://accounts.google.com/o/oauth2/v2/auth?access_type=offline&prompt=consent",
    },
    tokenUrl: {
      label: "Token URL",
      placeholder: "Enter Token URL",
      type: "string",
      required: true,
      shown: false,
      comments: "OAuth 2.0 token endpoint for exchanging authorization codes for access tokens.",
      default: "https://oauth2.googleapis.com/token",
    },
    scopes: {
      label: "Scopes",
      placeholder: "Enter OAuth scopes",
      type: "string",
      required: true,
      comments:
        "Space-separated OAuth permission scopes. See <a href=\"https://developers.google.com/identity/protocols/oauth2/scopes#content\">Google Content API scopes documentation</a> for available scopes.",
      default: "https://www.googleapis.com/auth/content",
    },
    clientId: {
      label: "Client ID",
      placeholder: "Enter Client ID",
      type: "string",
      required: true,
      comments: "The Client ID from your Google Cloud Console OAuth 2.0 credentials. Navigate to APIs & Services > Credentials to find this value.",
      example: "123456789012-abc123def456ghi789jkl012mno345pq.apps.googleusercontent.com",
    },
    clientSecret: {
      label: "Client Secret",
      placeholder: "Enter Client Secret",
      type: "password",
      required: true,
      comments: "The Client Secret from your Google Cloud Console OAuth 2.0 credentials. Keep this value secure.",
    },
  },
});
