import { OAuth2Type, oauth2Connection } from "@prismatic-io/spectral";
import {
  DEFAULT_AUTHORIZE_URL,
  DEFAULT_TOKEN_URL,
  WEB_APP_CONNECTION_KEY,
  WEB_APP_DEFAULT_SCOPES,
} from "../constants";

export const aemOAuthWebApp = oauth2Connection({
  key: WEB_APP_CONNECTION_KEY,
  display: {
    label: "OAuth 2.0",
    description:
      "Authenticate to AEM as a Cloud Service as an Adobe user with an OAuth Web App credential from the Adobe Developer Console. Requests run with that user's AEM permissions.",
  },
  oauth2Type: OAuth2Type.AuthorizationCode,
  inputs: {
    aemHost: {
      label: "AEM Author Host",
      placeholder: "Enter AEM author host",
      type: "string",
      required: true,
      shown: true,
      comments:
        "The host name of the AEM as a Cloud Service author environment, without https://. Shown in Cloud Manager as the author URL.",
      example: "author-p12345-e123456.adobeaemcloud.com",
    },
    clientId: {
      label: "Client ID",
      placeholder: "Enter client ID",
      type: "string",
      required: true,
      shown: true,
      comments:
        "The Client ID of the OAuth Web App credential in the [Adobe Developer Console](https://developer.adobe.com/console) project. Also sent as the X-Api-Key header.",
      example: "a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6",
    },
    clientSecret: {
      label: "Client Secret",
      placeholder: "Enter client secret",
      type: "password",
      required: true,
      shown: true,
      comments:
        "The Client Secret of the OAuth Web App credential in the Adobe Developer Console project.",
    },
    scopes: {
      label: "Scopes",
      placeholder: "Enter scopes",
      type: "string",
      required: true,
      shown: true,
      comments:
        "The comma separated scopes to request, exactly as the credential's Scopes tab in the Adobe Developer Console lists them. Adobe rejects the authorization when a scope the credential does not list is requested.",
      example: WEB_APP_DEFAULT_SCOPES,
      default: WEB_APP_DEFAULT_SCOPES,
    },
    authorizeUrl: {
      label: "Authorize URL",
      placeholder: "Enter authorize URL",
      type: "string",
      required: true,
      shown: true,
      comments:
        "The Adobe IMS authorization endpoint. Change only when Adobe directs a different region.",
      example: DEFAULT_AUTHORIZE_URL,
      default: DEFAULT_AUTHORIZE_URL,
    },
    tokenUrl: {
      label: "Token URL",
      placeholder: "Enter token URL",
      type: "string",
      required: true,
      shown: true,
      comments: "The Adobe IMS token endpoint. Change only when Adobe directs a different region.",
      example: DEFAULT_TOKEN_URL,
      default: DEFAULT_TOKEN_URL,
    },
  },
});
