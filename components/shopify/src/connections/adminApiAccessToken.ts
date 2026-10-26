import { connection, input } from "@prismatic-io/spectral";
import { DEFAULT_SHOPIFY_GRAPHQL_API_VERSION } from "../constants";
export const adminApiAccessToken = connection({
  key: "adminApiAccessToken",
  display: {
    label: "Access Token",
    description:
      "Authenticate requests to Shopify using an Admin API access token.",
  },
  inputs: {
    adminApiAccessToken: input({
      label: "Admin API Access Token",
      type: "password",
      required: true,
      placeholder: "Enter Admin API Access Token",
      comments:
        "Generate from the 'API credentials' tab of an admin-created custom app. Learn more at [Shopify admin-created custom apps](https://shopify.dev/docs/apps/build/authentication-authorization/legacy/admin-custom-apps).",
      example: "shpat_a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6",
    }),
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
