import { OAuth2Type, oauth2Connection } from "@prismatic-io/spectral";
import { GOOGLE_DATA_MANAGER_API_VERSION } from "../constants";
export const dataManagerOAuth = oauth2Connection({
  key: "dataManagerOAuth",
  display: {
    label: "Data Manager OAuth 2.0",
    description:
      "Authenticate to the Google Data Manager API using OAuth 2.0. Use this connection for the Ingest Offline Conversions action. A Developer Token is not required for this API.",
    icons: {
      oauth2ConnectionIconPath: "oauth-button.png",
    },
  },
  oauth2Type: OAuth2Type.AuthorizationCode,
  inputs: {
    authorizeUrl: {
      label: "Authorize URL",
      placeholder: "Enter authorize URL",
      type: "string",
      required: true,
      shown: false,
      comments:
        "The OAuth 2.0 Authorization URL for the Google Data Manager API. See [OAuth 2.0 documentation](https://developers.google.com/identity/protocols/oauth2).",
      default:
        "https://accounts.google.com/o/oauth2/v2/auth?access_type=offline&prompt=consent",
    },
    tokenUrl: {
      label: "Token URL",
      placeholder: "Enter token URL",
      type: "string",
      required: true,
      shown: false,
      comments:
        "The OAuth 2.0 Token URL for the Google Data Manager API. See [OAuth 2.0 documentation](https://developers.google.com/identity/protocols/oauth2).",
      default: "https://oauth2.googleapis.com/token",
    },
    scopes: {
      label: "Scopes",
      placeholder: "Enter OAuth scopes",
      type: "string",
      required: true,
      shown: false,
      comments:
        "Space-separated OAuth 2.0 permission scopes for the Google Data Manager API. See [OAuth scopes documentation](https://developers.google.com/identity/protocols/oauth2/scopes).",
      default: "https://www.googleapis.com/auth/datamanager",
    },
    clientId: {
      label: "Client ID",
      placeholder: "Enter client ID",
      type: "string",
      required: true,
      shown: true,
      comments:
        "The Client ID for the Google Data Manager API application. Obtain from the [Google Cloud Console](https://console.cloud.google.com/apis/credentials).",
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
        "The Client Secret for the Google Data Manager API application. Obtain from the [Google Cloud Console](https://console.cloud.google.com/apis/credentials).",
      example: "GOCSPX-abcdefghijklmnopqrstuvwxyz",
    },
    apiVersion: {
      label: "API Version",
      placeholder: "Enter API version",
      type: "string",
      required: false,
      shown: true,
      comments: `The version of the Google Data Manager API to use. Defaults to ${GOOGLE_DATA_MANAGER_API_VERSION}. See [API reference](https://developers.google.com/data-manager/api/reference/rest).`,
      example: GOOGLE_DATA_MANAGER_API_VERSION,
      default: GOOGLE_DATA_MANAGER_API_VERSION,
    },
  },
});
