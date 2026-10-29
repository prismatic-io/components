import { oauth2Connection, OAuth2Type } from "@prismatic-io/spectral";

export const teamviewerOauth = oauth2Connection({
  key: "teamviewer-oauth",
  display: {
    description: "Connect to TeamViewer to automate your remote support tasks.",
    label: "OAuth 2.0",
  },
  oauth2Type: OAuth2Type.AuthorizationCode,
  comments: "OAuth 2.0 Connectivity for TeamViewer",
  inputs: {
    authorizeUrl: {
      label: "Authorize URL",
      placeholder: "Authorize URL",
      type: "string",
      required: true,
      shown: false,
      comments: "The OAuth 2.0 Authorization URL for TeamViewer",
      default: "https://login.teamviewer.com/oauth2/authorize?display=popup",
    },
    tokenUrl: {
      label: "Token URL",
      placeholder: "Token URL",
      type: "string",
      required: true,
      shown: false,
      comments: "The OAuth 2.0 Token URL for TeamViewer",
      default: "https://webapi.teamviewer.com/api/v1/oauth2/token",
    },
    scopes: {
      label: "Scopes",
      type: "string",
      required: false,
      shown: false,
      comments: "TeamViewer Scopes.",
    },
    clientId: {
      label: "Client ID",
      placeholder: "Client ID",
      type: "string",
      required: true,
      shown: true,
      comments: "Client ID for the TeamViewer OAuth 2.0 connection",
    },
    clientSecret: {
      label: "Client Secret",
      placeholder: "Client Secret",
      type: "password",
      required: true,
      shown: true,
      comments: "Client Secret for the TeamViewer OAuth 2.0 connection",
    },
  },
});

export default [teamviewerOauth];
