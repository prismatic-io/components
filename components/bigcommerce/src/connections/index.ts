import { OAuth2Type, oauth2Connection } from "@prismatic-io/spectral";

export const bigCommerceConnection = oauth2Connection({
  oauth2Type: OAuth2Type.AuthorizationCode,
  key: "oauth2bigcommerce",
  display: {
    label: "OAuth 2.0",
    description: "Authenticate using OAuth 2.0.",
  },
  comments:
    "Authenticate requests to BigCommerce using OAuth 2.0 credentials. Obtain these from the [BigCommerce Developer Portal](https://docs.bigcommerce.com/developer/docs/integrations/apps/guide/auth) > My Apps > Create an App.",
  inputs: {
    authorizeUrl: {
      label: "Authorize URL",
      type: "string",
      required: true,
      shown: false,
      comments: "The OAuth 2.0 Authorization URL for BigCommerce.",
      example: "https://login.bigcommerce.com/oauth2/authorize",
      default: "https://login.bigcommerce.com/oauth2/authorize",
    },
    tokenUrl: {
      label: "Token URL",
      type: "string",
      required: true,
      shown: false,
      comments: "The OAuth 2.0 Token URL for BigCommerce.",
      example: "https://login.bigcommerce.com/oauth2/token",
      default: "https://login.bigcommerce.com/oauth2/token",
    },
    scopes: {
      label: "Scopes",
      type: "string",
      required: true,
      shown: true,
      default: "store_v2_default",
      example: "store_v2_products store_v2_orders",
      comments:
        "Space-delimited list of OAuth scopes. Configure these in the BigCommerce app settings to match required permissions. See [BigCommerce OAuth scopes documentation](https://docs.bigcommerce.com/developer/docs/overview/api-fundamentals/api-accounts) for available scopes.",
    },
    clientId: {
      label: "Client ID",
      type: "string",
      required: true,
      shown: true,
      example: "abc123def456ghi789jkl012",
      comments:
        "The Client ID from the BigCommerce app. Find this in Developer Portal > My Apps > [App] > View Client ID.",
    },
    clientSecret: {
      label: "Client Secret",
      type: "password",
      required: true,
      shown: true,
      comments:
        "The Client Secret from the BigCommerce app. Keep this value secure and never share it publicly.",
    },
    baseUrl: {
      label: "Base URL",
      type: "string",
      required: true,
      shown: false,
      comments: "The base URL for BigCommerce's API.",
      example: "https://api.bigcommerce.com",
      default: "https://api.bigcommerce.com",
    },
  },
});

export default [bigCommerceConnection];
