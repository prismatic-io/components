import {
  connection,
  oauth2Connection,
  OAuth2Type,
} from "@prismatic-io/spectral";

export const notionOauth = oauth2Connection({
  key: "notionOauth",
  display: {
    label: "OAuth 2.0",
    description: "Connect to Notion via OAuth 2.0",
  },
  oauth2Type: OAuth2Type.AuthorizationCode,
  inputs: {
    authorizeUrl: {
      label: "Authorize URL",
      placeholder: "Enter Authorize URL",
      type: "string",
      required: true,
      shown: false,
      default: "https://api.notion.com/v1/oauth/authorize?owner=user",
      comments: "The OAuth 2.0 Authorization URL for Notion",
    },
    tokenUrl: {
      label: "Token URL",
      placeholder: "Enter Token URL",
      type: "string",
      required: true,
      shown: false,
      default: "https://api.notion.com/v1/oauth/token",
      comments: "The OAuth 2.0 Token URL for Notion",
    },
    scopes: {
      label: "Scopes",
      placeholder: "Enter scopes (not used for Notion)",
      type: "string",
      required: false,
      shown: false,
      comments: "Scopes are not used for Notion",
      default: "",
    },
    clientId: {
      label: "Client ID",
      placeholder: "Enter Client ID",
      type: "string",
      required: true,
      shown: true,
      comments:
        "Client ID of your Notion app. Find this in your [Notion integrations settings](https://www.notion.com/my-integrations).",
      example: "92a00a2f6f6a4f84bbaae2a991b0c0a2",
    },
    clientSecret: {
      label: "Client Secret",
      placeholder: "Enter Client Secret",
      type: "password",
      required: true,
      shown: true,
      comments:
        "Client Secret of your Notion app. Find this in your [Notion integrations settings](https://www.notion.com/my-integrations).",
      example: "secret_a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3",
    },
  },
});

export const notionInternalIntegration = connection({
  key: "notionInternalIntegration",
  display: {
    label: "Internal Integration Secret",
    description: "Connect to Notion using an Internal Integration Secret",
  },
  inputs: {
    apiKey: {
      label: "Internal Integration Secret",
      placeholder: "Enter Internal Integration Secret",
      type: "password",
      required: true,
      shown: true,
      comments:
        "Your Notion Internal Integration Secret. Create an integration in your [Notion integrations settings](https://www.notion.com/my-integrations) to obtain this token.",
      example: "secret_a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3",
    },
  },
});

export default [notionOauth, notionInternalIntegration];
