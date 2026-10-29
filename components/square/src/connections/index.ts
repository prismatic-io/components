import { OAuth2Type, oauth2Connection } from "@prismatic-io/spectral";

export const squareConnection = oauth2Connection({
  oauth2Type: OAuth2Type.AuthorizationCode,
  key: "oauth2",
  display: {
    label: "OAuth 2.0",
    description: "Authenticate using OAuth 2.0.",
  },
  inputs: {
    authorizeUrl: {
      label: "Authorize URL",
      placeholder: "Enter Authorize URL",
      type: "string",
      required: true,
      shown: true,
      comments:
        "The OAuth 2.0 Authorization URL for Square. Select Sandbox for testing or Production for live transactions.",
      default: "https://connect.squareup.com/oauth2/authorize",
      example: "https://connect.squareup.com/oauth2/authorize",
      model: [
        {
          label: "Sandbox",
          value: "https://connect.squareupsandbox.com/oauth2/authorize",
        },
        {
          label: "Production",
          value: "https://connect.squareup.com/oauth2/authorize",
        },
      ],
    },
    tokenUrl: {
      label: "Token URL",
      placeholder: "Enter Token URL",
      type: "string",
      required: true,
      shown: true,
      comments:
        "The OAuth 2.0 Token URL for Square. This must match the environment selected in the Authorize URL.",
      default: "https://connect.squareup.com/oauth2/token",
      example: "https://connect.squareup.com/oauth2/token",
      model: [
        {
          label: "Sandbox",
          value: "https://connect.squareupsandbox.com/oauth2/token",
        },
        {
          label: "Production",
          value: "https://connect.squareup.com/oauth2/token",
        },
      ],
    },
    scopes: {
      label: "Scopes",
      placeholder: "Enter OAuth scopes",
      type: "string",
      required: true,
      shown: true,
      default: "MERCHANT_PROFILE_READ PAYMENTS_READ PAYMENTS_WRITE",
      example: "MERCHANT_PROFILE_READ PAYMENTS_READ",
      comments:
        "A space-separated list of OAuth permission scopes. These scopes must be configured in the Square Application. See [Square OAuth Permissions](https://developer.squareup.com/docs/oauth-api/square-permissions) for available scopes.",
    },
    clientId: {
      label: "Application ID",
      placeholder: "Enter Application ID",
      type: "string",
      required: true,
      shown: true,
      comments:
        "The Application ID from the Square Developer Dashboard. Navigate to Applications > [App Name] > Credentials to find this value.",
      example: "sq0idp-XXXXXXXXXXXXXXXXXXXXXX",
    },
    clientSecret: {
      label: "Application Secret",
      placeholder: "Enter Application Secret",
      type: "password",
      required: true,
      shown: true,
      comments:
        "The Application Secret from the Square Developer Dashboard. Keep this value secure and never share it publicly.",
    },
    apiVersion: {
      label: "API Version",
      placeholder: "Enter API version",
      type: "string",
      required: false,
      shown: true,
      comments:
        "Override the default Square API version (2025-08-20). Leave blank to use the default version. See [Square API Versioning](https://developer.squareup.com/docs/build-basics/versioning-overview) for version details.",
      default: "",
      example: "2025-08-20",
    },
  },
});

export default [squareConnection];
