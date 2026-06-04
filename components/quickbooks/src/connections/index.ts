import { OAuth2Type, oauth2Connection } from "@prismatic-io/spectral";

export const quickbooksConnection = oauth2Connection({
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
      comments: "The OAuth 2.0 Authorization URL for QuickBooks.",
      default: "https://appcenter.intuit.com/connect/oauth2",
    },
    tokenUrl: {
      label: "Token URL",
      placeholder: "Enter token URL",
      type: "string",
      required: true,
      shown: false,
      comments: "The OAuth 2.0 Token URL for QuickBooks.",
      default: "https://oauth.platform.intuit.com/oauth2/v1/tokens/bearer",
    },
    revokeUrl: {
      label: "Revoke URL",
      placeholder: "Enter revoke URL",
      type: "string",
      required: true,
      shown: false,
      comments: "The OAuth 2.0 Revocation URL for QuickBooks.",
      default: "https://developer.api.intuit.com/v2/oauth2/tokens/revoke",
    },
    scopes: {
      label: "Scopes",
      placeholder: "Enter scopes",
      type: "string",
      required: true,
      shown: true,
      default: "com.intuit.quickbooks.accounting",
      comments: "A space-delimited set of one or more scopes to request access to QuickBooks resources.",
    },
    clientId: {
      label: "Client ID",
      placeholder: "Enter Client ID",
      type: "string",
      required: true,
      shown: true,
      comments: "The client ID from the QuickBooks developer console, used to identify the application during OAuth authentication.",
    },
    clientSecret: {
      label: "Client Secret",
      placeholder: "Enter Client Secret",
      type: "password",
      required: true,
      shown: true,
      comments: "The client secret from the QuickBooks developer console, used to authenticate the application during OAuth token exchange.",
    },
    useSandbox: {
      label: "Use Sandbox",
      type: "boolean",
      required: true,
      shown: true,
      comments: "When true, requests are sent to the QuickBooks sandbox environment instead of production. Useful for integration testing.",
    },
  },
});

export default [quickbooksConnection];
