import { connection, OAuth2Type, oauth2Connection } from "@prismatic-io/spectral";

export const googleConnection = oauth2Connection({
  key: "oauth2",
  display: {
    label: "OAuth2",
    description: "OAuth2 Connection",
  },
  oauth2Type: OAuth2Type.AuthorizationCode,
  iconPath: "oauth-button.png",
  inputs: {
    authorizeUrl: {
      label: "Authorize URL",
      placeholder: "Enter authorization URL",
      type: "string",
      required: true,
      shown: false,
      comments: "The authorization URL for Google Cloud Pub/Sub OAuth 2.0.",
      default: "https://accounts.google.com/o/oauth2/v2/auth?access_type=offline&prompt=consent",
    },
    tokenUrl: {
      label: "Token URL",
      placeholder: "Enter token URL",
      type: "string",
      required: true,
      shown: false,
      comments: "The token URL for Google Cloud Pub/Sub OAuth 2.0.",
      default: "https://oauth2.googleapis.com/token",
    },
    scopes: {
      label: "Scopes",
      placeholder: "Enter space-separated OAuth scopes",
      type: "string",
      required: true,
      comments:
        "Space-delimited list of OAuth 2.0 scopes. See [OAuth 2.0 Scopes for Google APIs](https://developers.google.com/identity/protocols/oauth2/scopes#pubsub) for more information.",
      default:
        "https://www.googleapis.com/auth/cloud-platform https://www.googleapis.com/auth/pubsub",
    },
    clientId: {
      label: "Client ID",
      placeholder: "Enter Client ID",
      type: "string",
      required: true,
      comments: "The Client ID from the Google Cloud OAuth 2.0 credentials.",
      example: "123456789012-abcdefghijklmnopqrstuvwxyz123456.apps.googleusercontent.com",
    },
    clientSecret: {
      label: "Client Secret",
      placeholder: "Enter Client Secret",
      type: "password",
      required: true,
      comments: "The Client Secret from the Google Cloud OAuth 2.0 credentials.",
      example: "GOCSPX-abcdefghijklmnopqrstuvwxyz",
    },
  },
});

export const googlePrivateKeyConnection = connection({
  key: "privateKey",
  display: {
    label: "Google Pub/Sub Private Key",
    description:
      "Authenticate requests to Google Cloud Storage using values obtained from the Google Cloud Platform.",
  },
  inputs: {
    clientEmail: {
      label: "Client Email",
      placeholder: "Enter service account email",
      type: "string",
      required: true,
      example: "my-service-account@my-project.iam.gserviceaccount.com",
      shown: true,
      comments:
        "The service account email address from the Google Cloud service account JSON key file.",
    },
    privateKey: {
      label: "Private Key",
      placeholder: "Enter private key from service account JSON",
      type: "text",
      required: true,
      shown: true,
      comments:
        "The private key from the Google Cloud service account JSON key file. This should be the entire key value including the BEGIN and END markers.",
    },
    projectId: {
      label: "Project ID",
      placeholder: "Enter project ID",
      type: "string",
      required: true,
      shown: true,
      example: "my-gcp-project-123456",
      comments: "The Google Cloud project ID that contains the Pub/Sub resources.",
    },
    scopes: {
      label: "Scopes",
      placeholder: "Enter space-separated OAuth scopes",
      type: "string",
      required: true,
      comments:
        "Space-delimited list of OAuth 2.0 scopes. See [OAuth 2.0 Scopes for Google APIs](https://developers.google.com/identity/protocols/oauth2/scopes#pubsub) for more information.",
      default:
        "https://www.googleapis.com/auth/cloud-platform https://www.googleapis.com/auth/pubsub",
    },
  },
});

export default [googleConnection, googlePrivateKeyConnection];
