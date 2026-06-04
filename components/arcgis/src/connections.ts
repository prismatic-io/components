import { OAuth2Type, oauth2Connection } from "@prismatic-io/spectral";

export const arcgisOAuth2Connection = oauth2Connection({
  key: "arcgisOAuth2Connection",
  display: {
    label: "OAuth 2.0",
    description: "OAuth 2.0 connection for ArcGIS",
  },
  oauth2Type: OAuth2Type.AuthorizationCode,
  inputs: {
    authorizeUrl: {
      label: "Authorize URL",
      placeholder: "Authorize URL",
      type: "string",
      default: "https://www.arcgis.com/sharing/rest/oauth2/authorize",
      required: true,
      shown: true,
      comments:
        "If you want to use ArcGIS Enterprise, you can change this to http://<host>:<port>/arcgis/sharing/rest/oauth2/authorize",
    },
    tokenUrl: {
      label: "Token URL",
      placeholder: "Token URL",
      type: "string",
      default: "https://www.arcgis.com/sharing/rest/oauth2/token/",
      required: true,
      shown: true,
      comments:
        "If you want to use ArcGIS Enterprise, you can change this to http://<host>:<port>/arcgis/sharing/rest/oauth2/token/",
    },
    scopes: {
      label: "Scopes",
      placeholder: "Scopes",
      type: "string",
      required: false,
      shown: false,
      comments: "Space separated OAuth 2.0 permission scopes for the API",
      default: "",
    },
    clientId: {
      label: "Client ID",
      placeholder: "Client ID",
      type: "string",
      required: true,
      shown: true,
      comments: "Client Identifier of your app for the API",
    },
    clientSecret: {
      label: "Client Secret",
      placeholder: "Client Secret",
      type: "password",
      required: true,
      shown: true,
      comments: "Client Secret of your app for the API",
    },
    headers: {
      label: "Headers",
      type: "string",
      collection: "keyvaluelist",
      required: false,
      shown: false,
      comments: "Additional header to supply to authorization requests",
    },
  },
});

export default [arcgisOAuth2Connection];
