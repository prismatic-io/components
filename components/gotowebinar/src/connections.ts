import { oauth2Connection, OAuth2Type } from "@prismatic-io/spectral";

export const gotoWebinarOAuth2Connection = oauth2Connection({
  key: "gotoWebinarOAuth2Connection",
  oauth2Type: OAuth2Type.AuthorizationCode,
  display: {
    label: "OAuth 2.0",
    description: "GoTo Webinar OAuth2 Connection",
  },
  inputs: {
    authorizeUrl: {
      label: "Authorize URL",
      comments: "The OAuth2 Authorize URL for GoTo Webinar.",
      type: "string",
      required: true,
      shown: false,
      default: "https://authentication.logmeininc.com/oauth/authorize",
    },
    tokenUrl: {
      label: "Token URL",
      comments: "The OAuth2 Token URL for GoTo Webinar",
      type: "string",
      required: true,
      shown: false,
      default: "https://authentication.logmeininc.com/oauth/token",
    },
    scopes: {
      label: "Scopes",
      comments: "Space separated list of OAuth2 scopes for GoTo Webinar.",
      type: "string",
      required: true,
      shown: true,
      default: "identity:scim.me collab:",
    },
    clientId: {
      label: "Client ID",
      comments: "The OAuth2 Client ID for GoTo Webinar.",
      type: "string",
      required: true,
      shown: true,
    },
    clientSecret: {
      label: "Client Secret",
      comments: "The OAuth2 Client Secret for GoTo Webinar.",
      type: "string",
      required: true,
      shown: true,
    },
    organizerKey: {
      label: "Organizer Key",
      comments: "The GoTo Webinar Organizer Key.",
      type: "string",
      required: true,
      shown: true,
    },
  },
});

export default [gotoWebinarOAuth2Connection];
