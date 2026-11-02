import { OAuth2Type, oauth2Connection } from "@prismatic-io/spectral";
import {
  DEFAULT_TOKEN_URL,
  SERVER_TO_SERVER_CONNECTION_KEY,
} from "../constants";

export const aemOAuthServerToServer = oauth2Connection({
  key: SERVER_TO_SERVER_CONNECTION_KEY,
  display: {
    label: "OAuth 2.0 Client Credentials",
    description:
      "Authenticate to AEM as a Cloud Service with an OAuth Server-to-Server credential from the Adobe Developer Console.",
  },
  oauth2Type: OAuth2Type.ClientCredentials,
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
        "The Client ID of the OAuth Server-to-Server credential in the [Adobe Developer Console](https://developer.adobe.com/console) project. Also sent as the X-Api-Key header.",
      example: "a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6",
    },
    clientSecret: {
      label: "Client Secret",
      placeholder: "Enter client secret",
      type: "password",
      required: true,
      shown: true,
      comments:
        "The Client Secret of the OAuth Server-to-Server credential in the Adobe Developer Console project.",
    },
    scopes: {
      label: "Scopes",
      placeholder: "Enter scopes",
      type: "string",
      required: true,
      shown: true,
      comments:
        "The space or comma separated scopes listed on the OAuth Server-to-Server credential in the Adobe Developer Console. Copy them exactly as shown.",
      example: "openid, AdobeID",
    },
    tokenUrl: {
      label: "Token URL",
      placeholder: "Enter token URL",
      type: "string",
      required: true,
      shown: true,
      comments:
        "The Adobe IMS token endpoint. Change only when Adobe directs a different region.",
      example: DEFAULT_TOKEN_URL,
      default: DEFAULT_TOKEN_URL,
    },
  },
});
