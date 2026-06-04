import { OAuth2Type, oauth2Connection } from "@prismatic-io/spectral";

export const googleConnection = oauth2Connection({
  oauth2Type: OAuth2Type.AuthorizationCode,
  key: "oauth2",
  display: {
    label: "Google Analytics OAuth 2.0",
    description:
      "Authenticate requests to Google Analytics using values obtained from the Google Cloud Platform.",
    icons: {
      oauth2ConnectionIconPath: "oauth-button.png",
    },
  },
  inputs: {
    authorizeUrl: {
      label: "Authorize URL",
      placeholder: "Authorize URL",
      type: "string",
      required: true,
      shown: false,
      comments: "The OAuth 2.0 Authorization URL for Google Calendar",
      default:
        "https://accounts.google.com/o/oauth2/v2/auth?access_type=offline&prompt=consent",
    },
    tokenUrl: {
      label: "Token URL",
      placeholder: "Token URL",
      type: "string",
      required: true,
      shown: false,
      comments: "The OAuth 2.0 Token URL for Google Analytics",
      default: "https://oauth2.googleapis.com/token",
    },
    scopes: {
      label: "Scopes",
      placeholder: "Scopes",
      type: "string",
      required: true,
      shown: true,
      comments:
        "A space-delimited set of one or more scopes to get the user's permission to access.",
      default:
        "https://www.googleapis.com/auth/analytics https://www.googleapis.com/auth/analytics.manage.users https://www.googleapis.com/auth/analytics.edit https://www.googleapis.com/auth/analytics.readonly",
    },
    clientId: {
      label: "Client ID",
      placeholder: "Client ID",
      type: "string",
      required: true,
      comments:
        "Provide a string value for the client Id of your OAuth 2.0 application.",
      shown: true,
    },
    clientSecret: {
      label: "Client Secret",
      placeholder: "Client Secret",
      type: "password",
      comments:
        "Provide a string value for the client secret of your OAuth 2.0 application.",
      required: true,
      shown: true,
    },
  },
});

export default [googleConnection];
