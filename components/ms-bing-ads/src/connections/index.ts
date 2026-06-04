import { oauth2Connection, OAuth2Type } from "@prismatic-io/spectral";

export const oauth = oauth2Connection({
  key: "oauth",
  display: {
    label: "OAuth 2.0",
    description: "Authenticate using OAuth 2.0.",
  },
  oauth2Type: OAuth2Type.AuthorizationCode,
  inputs: {
    authorizeUrl: {
      comments: "The OAuth 2.0 Authorization URL for Microsoft Bing Ads.",
      default: "https://login.microsoftonline.com/common/oauth2/v2.0/authorize",
      label: "Authorize URL",
      placeholder: "Enter authorize URL",
      required: true,
      shown: false,
      type: "string",
    },
    tokenUrl: {
      comments: "The OAuth 2.0 Token URL for Microsoft Bing Ads.",
      default: "https://login.microsoftonline.com/common/oauth2/v2.0/token",
      label: "Token URL",
      placeholder: "Enter token URL",
      required: true,
      shown: false,
      type: "string",
    },
    scopes: {
      comments:
        "The permission scopes for the Microsoft Bing Ads OAuth application.",
      default: "https://ads.microsoft.com/msads.manage offline_access",
      label: "Scopes",
      placeholder: "Enter scopes",
      required: false,
      shown: false,
      type: "string",
    },
    clientId: {
      comments:
        "The client ID of the registered OAuth application for Microsoft Bing Ads.",
      label: "Client ID",
      placeholder: "Enter client ID",
      required: true,
      shown: true,
      type: "string",
    },
    clientSecret: {
      comments:
        "The client secret value of the registered OAuth application for Microsoft Bing Ads.",
      label: "Client Secret Value",
      placeholder: "Enter client secret value",
      required: true,
      shown: true,
      type: "password",
    },
    developerToken: {
      comments:
        "The developer token from the Account Manager account used for API authentication.",
      label: "Developer Token",
      placeholder: "Enter developer token",
      required: true,
      shown: true,
      type: "password",
    },
    useSandbox: {
      comments:
        "When true, uses the Microsoft Advertising sandbox environment (api.sandbox.bingads.microsoft.com) instead of production.",
      label: "Use Sandbox",
      type: "boolean",
      required: false,
      shown: true,
      default: "false",
    },
  },
});

export default [oauth];
