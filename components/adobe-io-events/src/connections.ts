import { OAuth2Type, oauth2Connection } from "@prismatic-io/spectral";

export const adobeIOConnection = oauth2Connection({
  key: "adobeIOConnection",
  display: {
    label: "Adobe I/O Connection",
    description: "Adobe I/O Connection",
  },
  oauth2Type: OAuth2Type.ClientCredentials,
  inputs: {
    tokenUrl: {
      label: "Token URL",
      placeholder: "Token URL",
      type: "string",
      required: true,
      shown: true,
      comments: "The OAuth 2.0 Token URL for the Adobe I/O Connection",
      default: "https://ims-na1.adobelogin.com/ims/token/v3",
    },
    scopes: {
      label: "Scopes",
      placeholder: "Scopes",
      type: "string",
      required: false,
      shown: true,
      comments:
        "Space separated OAuth 2.0 permission scopes for the Adobe I/O Connection",
      default: "adobeio_api, openid, AdobeID, read_organizations",
    },
    clientId: {
      label: "Client ID",
      placeholder: "Client ID",
      type: "string",
      required: true,
      shown: true,
      comments: "Client Identifier of your app for the Adobe I/O Connection",
    },
    clientSecret: {
      label: "Client Secret",
      placeholder: "Client Secret",
      type: "password",
      required: true,
      shown: true,
      comments: "Client Secret of your app for the Adobe I/O Connection",
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

export default [adobeIOConnection];
