import {
  connection,
  input,
  OAuth2Type,
  oauth2Connection,
  templateConnectionInputs,
} from "@prismatic-io/spectral";
import { DEFAULT_SHOPIFY_GRAPHQL_API_VERSION } from "../constants";

const apiVersionInput = input({
  label: "API Version",
  placeholder: "Enter API Version",
  type: "string",
  default: DEFAULT_SHOPIFY_GRAPHQL_API_VERSION,
  example: DEFAULT_SHOPIFY_GRAPHQL_API_VERSION,
  comments:
    "Shopify API version to use. See [Shopify API versioning](https://shopify.dev/docs/api/usage/versioning) for available versions.",
  required: false,
  shown: true,
});

const hostInput = input({
  label: "Host",
  placeholder: "Enter Shopify domain",
  type: "string",
  default: "YOUR-SHOPIFY-DOMAIN.myshopify.com",
  example: "my-store.myshopify.com",
  comments: "The domain of the Shopify store without https:// (e.g., my-store.myshopify.com).",
  required: true,
  shown: true,
});

const scopeInput = input({
  label: "Scopes",
  placeholder: "Enter space-separated scopes",
  example: "read_customers read_draft_orders read_fulfillments read_orders",
  type: "string",
  required: false,
  shown: true,
  default: [
    "read_customers",
    "read_draft_orders",
    "read_fulfillments",
    "read_inventory",
    "read_orders",
    "read_products",
    "read_locations",
    "write_customers",
    "write_draft_orders",
    "write_fulfillments",
    "write_inventory",
    "write_orders",
    "write_products",
    "write_locations",
  ].join(" "),
  comments:
    "Space-separated list of OAuth permission scopes. See [Shopify access scopes](https://shopify.dev/api/usage/access-scopes#authenticated-access-scopes) for all available scopes.",
});

const clientIdInput = input({
  label: "Client ID (API Key)",
  placeholder: "Enter Client ID",
  type: "string",
  required: true,
  shown: true,
  comments: "The Client ID (also called API Key) from the Shopify app credentials.",
  example: "a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6",
});

const clientSecretInput = input({
  label: "Client Secret (API Secret)",
  placeholder: "Enter API Secret",
  type: "password",
  required: true,
  shown: true,
  comments: "The Client Secret (also called API Secret) from the Shopify app credentials.",
  example: "shpss_a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6",
});

const shopifyTemplatedConnection = oauth2Connection({
  oauth2Type: OAuth2Type.AuthorizationCode,
  key: "oauth2-dynamic-inputs",
  display: {
    label: "OAuth 2.0",
    description:
      "Authenticate requests to Shopify using values obtained from the Developer Console. Allows for using a single domain input instead of entering separate authorization URLs.",
  },
  inputs: templateConnectionInputs(
    {
      domain: {
        label: "Shop Name",
        placeholder: "Enter shop name",
        example: "my-store",
        type: "string",
        required: true,
        shown: true,
        comments: "The Shopify shop name without the .myshopify.com suffix (e.g., my-store).",
      },
      scopes: scopeInput,
      clientId: clientIdInput,
      clientSecret: clientSecretInput,
      apiVersion: apiVersionInput,
    },
    {
      authorizeUrl: {
        label: "Authorize URL",
        placeholder: "Enter Authorize URL",
        type: "template",
        comments: "The OAuth 2.0 Authorization URL for Shopify.",
        templateValue: "https://{{#domain}}.myshopify.com/admin/oauth/authorize/",
      },
      tokenUrl: {
        label: "Token URL",
        placeholder: "Enter Token URL",
        type: "template",
        templateValue: "https://{{#domain}}.myshopify.com/admin/oauth/access_token",
        comments: "The OAuth 2.0 Token URL for Shopify.",
      },
      host: {
        label: "Host",
        placeholder: "Enter Host",
        type: "template",
        templateValue: "{{#domain}}.myshopify.com",
        comments: "The domain of the Shopify store without the https:// prefix.",
      },
    },
    OAuth2Type.AuthorizationCode,
  ),
});

export const shopifyConnection = oauth2Connection({
  oauth2Type: OAuth2Type.AuthorizationCode,
  key: "oauth2",
  display: {
    label: "OAuth 2.0 (Deprecated)",
    description:
      "Authenticate requests to Shopify using values obtained from the Developer Console.",
  },
  inputs: {
    authorizeUrl: {
      label: "Authorize URL",
      placeholder: "Enter Authorize URL",
      type: "string",
      required: true,
      shown: true,
      comments: "The OAuth 2.0 Authorization URL for Shopify.",
      default: "https://YOUR-SHOPIFY-DOMAIN.myshopify.com/admin/oauth/authorize",
    },
    tokenUrl: {
      label: "Token URL",
      placeholder: "Enter Token URL",
      type: "string",
      required: true,
      shown: true,
      default: "https://YOUR-SHOPIFY-DOMAIN.myshopify.com/admin/oauth/access_token",
      comments: "The OAuth 2.0 Token URL for Shopify.",
    },
    scopes: scopeInput,
    clientId: clientIdInput,
    clientSecret: clientSecretInput,
    host: hostInput,
    apiVersion: apiVersionInput,
  },
});

const adminApiAccessToken = connection({
  key: "adminApiAccessToken",
  display: {
    label: "Access Token",
    description: "Authenticate requests to Shopify using an Admin API access token.",
  },
  inputs: {
    adminApiAccessToken: input({
      label: "Admin API Access Token",
      type: "password",
      required: true,
      placeholder: "Enter Admin API Access Token",
      comments:
        "Generate from the 'API credentials' tab of a private Shopify app. Learn more at [Shopify Admin API](https://shopify.dev/docs/api/admin-rest#authentication).",
      example: "shpat_a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6",
    }),
    host: hostInput,
    apiVersion: apiVersionInput,
  },
});

export default [shopifyTemplatedConnection, shopifyConnection, adminApiAccessToken];
