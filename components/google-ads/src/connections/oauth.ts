import { OAuth2Type, oauth2Connection } from "@prismatic-io/spectral";
import { GOOGLE_ADS_API_VERSION } from "../constants";

export const oauth = oauth2Connection({
  key: "oauth",
  display: {
    label: "OAuth 2.0",
    description: "Authenticate using OAuth 2.0.",
  },
  oauth2Type: OAuth2Type.AuthorizationCode,
  iconPath: "oauth-button.png",
  inputs: {
    authorizeUrl: {
      label: "Authorize URL",
      placeholder: "https://accounts.google.com/o/oauth2/v2/auth",
      type: "string",
      required: true,
      shown: false,
      default:
        "https://accounts.google.com/o/oauth2/v2/auth?access_type=offline&prompt=consent",
      comments:
        "The OAuth 2.0 Authorization URL for the Google Ads API. See [OAuth 2.0 documentation](https://developers.google.com/identity/protocols/oauth2).",
    },
    tokenUrl: {
      label: "Token URL",
      placeholder: "https://oauth2.googleapis.com/token",
      type: "string",
      required: true,
      shown: false,
      default: "https://oauth2.googleapis.com/token",
      comments:
        "The OAuth 2.0 Token URL for the Google Ads API. See [OAuth 2.0 documentation](https://developers.google.com/identity/protocols/oauth2).",
    },
    scopes: {
      label: "Scopes",
      placeholder: "https://www.googleapis.com/auth/adwords",
      type: "string",
      required: true,
      shown: false,
      comments:
        "Space-separated OAuth 2.0 permission scopes for the Google Ads API. See [OAuth scopes documentation](https://developers.google.com/identity/protocols/oauth2/scopes).",
      default: "https://www.googleapis.com/auth/adwords",
    },
    clientId: {
      label: "Client ID",
      placeholder: "Enter client ID",
      type: "string",
      required: true,
      shown: true,
      comments:
        "The Client ID for the Google Ads API application. Obtain from the [Google Cloud Console](https://console.cloud.google.com/apis/credentials).",
      example:
        "123456789012-abcdefghijklmnopqrstuvwxyz123456.apps.googleusercontent.com",
    },
    clientSecret: {
      label: "Client Secret",
      placeholder: "Enter client secret",
      type: "password",
      required: true,
      shown: true,
      comments:
        "The Client Secret for the Google Ads API application. Obtain from the [Google Cloud Console](https://console.cloud.google.com/apis/credentials).",
      example: "GOCSPX-abcdefghijklmnopqrstuvwxyz",
    },
    developerToken: {
      label: "Developer Token",
      placeholder: "Enter developer token",
      type: "password",
      required: true,
      shown: true,
      comments:
        "The Developer Token for the Google Ads Manager account. Obtain from the [Google Ads API Center](https://ads.google.com/aw/apicenter).",
      example: "ABcdeFGH93KL-NOPQ_RsTuv",
    },
    apiVersion: {
      label: "API Version",
      type: "string",
      required: false,
      shown: true,
      placeholder: "Enter API version",
      example: GOOGLE_ADS_API_VERSION,
      default: GOOGLE_ADS_API_VERSION,
      comments: `The version of the Google Ads API to use. Defaults to ${GOOGLE_ADS_API_VERSION}. Older versions (v21, v22) are supported by specifying the version explicitly. Note: v20 sunsets in June 2026. See [API versions documentation](https://developers.google.com/google-ads/api/docs/release-notes).`,
    },
  },
});
