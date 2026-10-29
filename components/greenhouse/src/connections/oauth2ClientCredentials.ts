import { OAuth2Type, oauth2Connection } from "@prismatic-io/spectral";
import { V3_AUTH_BASE_URL } from "../constants";

export const oauth2ClientCredentials = oauth2Connection({
  key: "oauth2ClientCredentials",
  display: {
    label: "OAuth 2.0 Client Credentials (Harvest V3)",
    description:
      "Authenticate requests to Greenhouse using OAuth 2.0 client credentials.",
  },
  oauth2Type: OAuth2Type.ClientCredentials,
  inputs: {
    tokenUrl: {
      label: "Token URL",
      placeholder: "Token URL",
      type: "string",
      required: true,
      shown: false,
      default: `${V3_AUTH_BASE_URL}/token`,
      comments: "The OAuth token URL.",
    },
    scopes: {
      label: "Scopes",
      placeholder: "Scopes",
      type: "string",
      required: false,
      shown: false,
      comments:
        "Permissions are configured on the credential in Greenhouse, not requested via OAuth scopes.",
    },
    clientId: {
      label: "Client ID",
      placeholder: "Enter client ID",
      type: "string",
      required: true,
      shown: true,
      comments:
        "The client ID of your Greenhouse custom integration. Credentials can be created in Greenhouse under API Credentials by selecting Harvest V3 (OAuth).",
      example: "abcdef1234567890abcdef1234567890",
    },
    clientSecret: {
      label: "Client Secret",
      placeholder: "Enter client secret",
      type: "password",
      required: true,
      shown: true,
      comments: "The client secret of your Greenhouse custom integration.",
      example: "1234567890abcdef1234567890abcdef",
    },
  },
});
