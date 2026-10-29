import { OAuth2Type, oauth2Connection } from "@prismatic-io/spectral";

export const adobeAnalyticsOauth = oauth2Connection({
  key: "adobeAnalyticsOauth",
  display: {
    label: "OAuth 2.0",
    description: "Authenticate using OAuth 2.0.",
  },
  oauth2Type: OAuth2Type.AuthorizationCode,
  inputs: {
    authorizeUrl: {
      label: "Authorize URL",
      placeholder: "Enter authorize URL",
      type: "string",
      required: true,
      shown: true,
      default: "https://ims-na1.adobelogin.com/ims/authorize/v2",
      comments: "The OAuth 2.0 authorization URL for Adobe.",
    },
    tokenUrl: {
      label: "Token URL",
      placeholder: "Enter token URL",
      type: "string",
      required: true,
      shown: true,
      default: "https://ims-na1.adobelogin.com/ims/token/v3",
      comments: "The OAuth 2.0 token URL for Adobe.",
    },
    scopes: {
      label: "Scopes",
      placeholder: "Enter scopes",
      type: "string",
      required: true,
      shown: true,
      comments: "The space-delimited OAuth scopes required for API access.",
      default:
        "openid AdobeID read_organizations additional_info.projectedProductContext additional_info.job_function",
    },
    clientId: {
      label: "Client ID",
      placeholder: "Enter client ID",
      type: "string",
      required: true,
      shown: true,
      comments: "The client ID for the Adobe Developer Console project.",
    },
    clientSecret: {
      label: "Client Secret",
      placeholder: "Enter client secret",
      type: "password",
      required: true,
      shown: true,
      comments: "The client secret for the Adobe Developer Console project.",
    },
  },
});

export default [adobeAnalyticsOauth];
