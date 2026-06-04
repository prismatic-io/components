import {
  connection,
  OAuth2Type,
  oauth2Connection,
} from "@prismatic-io/spectral";

export const googleConnection = oauth2Connection({
  key: "oauth2",
  display: {
    label: "OAuth 2.0",
    description: "Authenticate using OAuth 2.0",
  },
  oauth2Type: OAuth2Type.AuthorizationCode,
  iconPath: "oauth-button.png",
  inputs: {
    authorizeUrl: {
      label: "Authorize URL",
      placeholder: "Authorization URL",
      type: "string",
      required: true,
      shown: false,
      comments: "The Authorization URL for Google BigQuery.",
      default:
        "https://accounts.google.com/o/oauth2/v2/auth?access_type=offline&prompt=consent",
    },
    tokenUrl: {
      label: "Token URL",
      placeholder: "Token URL",
      type: "string",
      required: true,
      shown: false,
      comments: "The Token URL for Google BigQuery.",
      default: "https://oauth2.googleapis.com/token",
    },
    scopes: {
      label: "Scopes",
      placeholder: "Scopes",
      type: "string",
      required: true,
      comments:
        "Space delimited listing of scopes. https://developers.google.com/identity/protocols/oauth2/scopes#bigquery",
      default:
        "https://www.googleapis.com/auth/bigquery https://www.googleapis.com/auth/bigquery.insertdata https://www.googleapis.com/auth/cloud-platform https://www.googleapis.com/auth/cloud-platform.read-only https://www.googleapis.com/auth/devstorage.full_control	https://www.googleapis.com/auth/devstorage.read_only https://www.googleapis.com/auth/devstorage.read_write",
    },
    clientId: {
      label: "Client ID",
      placeholder: "Client Identifier",
      type: "string",
      required: true,
      comments: "The Google BigQuery app's Client Identifier.",
    },
    clientSecret: {
      label: "Client Secret",
      placeholder: "Client Secret",
      type: "password",
      required: true,
      comments: "The Google BigQuery app's Client Secret.",
    },
  },
});

export const googleServiceAccount = connection({
  key: "googleServiceAccount",
  display: {
    label: "Private Key",
    description: "Authenticate using a private key",
  },
  inputs: {
    clientEmail: {
      label: "Client Email",
      placeholder: "Client Email",
      type: "string",
      required: true,
      example: "someone@example.com",
      shown: true,
      comments: "The email address of the client to connect.",
    },
    privateKey: {
      label: "Private Key",
      placeholder: "Private Key",
      type: "text",
      required: true,
      shown: true,
      comments: "The private key of the client to connect.",
    },
    scopes: {
      label: "Scopes",
      placeholder: "Scopes",
      type: "string",
      required: true,
      example:
        "https://www.googleapis.com/auth/bigquery https://www.googleapis.com/auth/cloud-platform https://www.googleapis.com/auth/cloud-platform.read-only",
      default:
        "https://www.googleapis.com/auth/bigquery https://www.googleapis.com/auth/cloud-platform https://www.googleapis.com/auth/cloud-platform.read-only",
      shown: false,
      comments:
        "Space delimited listing of scopes. https://developers.google.com/identity/protocols/oauth2/scopes#bigquery",
    },
  },
});

export default [googleConnection, googleServiceAccount];
