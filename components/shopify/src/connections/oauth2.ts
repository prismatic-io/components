import { OAuth2Type, oauth2Connection } from "@prismatic-io/spectral";
import { DEFAULT_SHOPIFY_GRAPHQL_API_VERSION } from "../constants";

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
      default:
        "https://YOUR-SHOPIFY-DOMAIN.myshopify.com/admin/oauth/authorize",
    },
    tokenUrl: {
      label: "Token URL",
      placeholder: "Enter Token URL",
      type: "string",
      required: true,
      shown: true,
      default:
        "https://YOUR-SHOPIFY-DOMAIN.myshopify.com/admin/oauth/access_token?expiring=1",
      comments: "The OAuth 2.0 Token URL for Shopify.",
    },
    scopes: {
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
        "Space-separated list of OAuth permission scopes. See [Shopify access scopes](https://shopify.dev/docs/api/usage/access-scopes) for all available scopes.",
    },
    clientId: {
      label: "Client ID (API Key)",
      placeholder: "Enter Client ID",
      type: "string",
      required: true,
      shown: true,
      comments:
        "The Client ID (also called API Key) from the Shopify app credentials.",
      example: "a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6",
    },
    clientSecret: {
      label: "Client Secret (API Secret)",
      placeholder: "Enter API Secret",
      type: "password",
      required: true,
      shown: true,
      comments:
        "The Client Secret (also called API Secret) from the Shopify app credentials.",
      example: "shpss_a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6",
    },
    host: {
      label: "Host",
      placeholder: "Enter Shopify domain",
      type: "string",
      default: "YOUR-SHOPIFY-DOMAIN.myshopify.com",
      example: "my-store.myshopify.com",
      comments:
        "The domain of the Shopify store without https:// (e.g., my-store.myshopify.com).",
      required: true,
      shown: true,
    },
    apiVersion: {
      label: "API Version",
      placeholder: "Enter API Version",
      type: "string",
      default: DEFAULT_SHOPIFY_GRAPHQL_API_VERSION,
      example: DEFAULT_SHOPIFY_GRAPHQL_API_VERSION,
      comments:
        "Shopify API version to use. See [Shopify API versioning](https://shopify.dev/docs/api/usage/versioning) for available versions.",
      required: false,
      shown: true,
    },
  },
});
