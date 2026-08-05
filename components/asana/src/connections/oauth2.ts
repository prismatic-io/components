import { OAuth2Type, oauth2Connection } from "@prismatic-io/spectral";
export const asanaOAuthConnection = oauth2Connection({
  oauth2Type: OAuth2Type.AuthorizationCode,
  key: "oauth2",
  display: {
    label: "OAuth 2.0",
    description: "Authenticate using OAuth 2.0.",
  },
  inputs: {
    authorizeUrl: {
      label: "Authorize URL",
      placeholder: "Enter authorize URL",
      type: "string",
      required: true,
      shown: false,
      comments: "The OAuth 2.0 authorization URL for Asana.",
      default: "https://app.asana.com/-/oauth_authorize",
    },
    tokenUrl: {
      label: "Token URL",
      placeholder: "Enter token URL",
      type: "string",
      required: true,
      shown: false,
      comments: "The OAuth 2.0 token URL for Asana.",
      default: "https://app.asana.com/-/oauth_token",
    },
    scopes: {
      label: "Scopes",
      placeholder: "Enter space-separated scopes",
      example: "tasks:read projects:read users:read",
      type: "string",
      required: false,
      shown: true,
      comments:
        "A space-separated list of OAuth scopes using the format `<resource>:<action>` (e.g., tasks:read, projects:write). Leave blank for full access. See [Asana OAuth scopes](https://developers.asana.com/docs/oauth-scopes) for available values.",
      default: "",
    },
    clientId: {
      label: "Client ID",
      placeholder: "Enter client ID",
      type: "string",
      required: true,
      shown: true,
      comments:
        "The OAuth 2.0 client ID. Generate one from the [Asana Developer Portal](https://app.asana.com/0/my-apps).",
    },
    clientSecret: {
      label: "Client Secret",
      placeholder: "Enter client secret",
      type: "password",
      required: true,
      shown: true,
      comments:
        "The OAuth 2.0 client secret. Generate one from the [Asana Developer Portal](https://app.asana.com/0/my-apps).",
    },
  },
});
