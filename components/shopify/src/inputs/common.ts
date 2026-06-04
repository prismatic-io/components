import { input, util } from "@prismatic-io/spectral";
import {
  DEFAULT_SHOPIFY_VERSION,
  GRAPHQL_EXAMPLE,
  LIST_CUSTOMERS_DATASOURCE_REFERENCE,
  LIST_LOCATIONS_DATASOURCE_REFERENCE,
  LIST_ORDERS_DATASOURCE_REFERENCE,
  LIST_PRODUCTS_DATASOURCE_REFERENCE,
  LIST_VARIANTS_DATASOURCE_REFERENCE,
} from "../constants";
import { cleanCodeInput, cleanKeyValueListInput, cleanStringInput } from "../util";
import shopifyEvents from "../webhook_events.json";

export const connectionInput = input({
  label: "Connection",
  type: "connection",
  required: true,
  comments: "The Shopify connection to use.",
});

export const returnHeaders = input({
  label: "Return Headers",
  type: "boolean",
  required: false,
  comments: "When true, response headers will be included in the output object.",
  clean: util.types.toBool,
});

export const apiVersion = input({
  label: "API Version",
  type: "string",
  required: true,
  default: DEFAULT_SHOPIFY_VERSION,
  comments:
    "Shopify versions its API. See [Shopify API release notes](https://shopify.dev/docs/api/release-notes) for a list of available versions.",
  clean: util.types.toString,
});

export const getAlldata = input({
  label: "Get All Data",
  type: "boolean",
  required: false,
  comments:
    "When true, fetches all data from all pages (API is limited to 250 records per page max). The limit input will be ignored when enabled.",
  clean: util.types.toBool,
});

export const limit = input({
  label: "Limit",
  type: "string",
  required: false,
  comments: "The maximum number of results to return per page. Maximum: 250.",
  example: "20",
  placeholder: "Enter limit",
  clean: cleanStringInput,
});

export const pageInfo = input({
  label: "Page Offset Token",
  type: "string",
  required: false,
  comments:
    "Cursor for pagination. Use the value from the previous response to retrieve the next page of results.",
  example:
    "eyJkaXJlY3Rpb24iOiJwcmV2IiwibGFzdF9pZCI6OTAyOTk2ODAwMzM1NCwibGFzdF92YWx1ZSI6IlRoZSBDb2xsZWN0aW9uIFNub3dib2FyZDogTGlxdWlkIn0",
  placeholder: "Enter page cursor",
  clean: cleanStringInput,
});

export const customerId = input({
  label: "Customer",
  type: "string",
  required: true,
  example: "207119551",
  comments: "The unique ID of the customer.",
  placeholder: "Enter customer ID",
  clean: util.types.toString,
  dataSource: LIST_CUSTOMERS_DATASOURCE_REFERENCE,
});

export const productId = input({
  label: "Product ID",
  type: "string",
  required: true,
  example: "74020090",
  placeholder: "Enter product ID",
  comments: "The unique ID of the product.",
  clean: util.types.toString,
  dataSource: LIST_PRODUCTS_DATASOURCE_REFERENCE,
});

export const orderId = input({
  label: "Order ID",
  type: "string",
  required: true,
  example: "450789469",
  placeholder: "Enter order ID",
  comments: "The unique ID of the order.",
  clean: util.types.toString,
  dataSource: LIST_ORDERS_DATASOURCE_REFERENCE,
});

export const fieldValues = input({
  label: "Values",
  placeholder: "Enter key-value pairs",
  type: "string",
  collection: "keyvaluelist",
  required: false,
  comments:
    "Key-value pairs for creating or updating a record. Specify any property key and value.",
  clean: cleanKeyValueListInput,
});

export const tags = input({
  label: "Tags",
  type: "string",
  required: false,
  collection: "valuelist",
  example: "Style",
  placeholder: "Enter tag",
  comments: "Tags for the product. Each list item is a tag string.",
  clean: util.types.toString,
});

export const itemId = input({
  label: "Inventory Item ID",
  type: "string",
  required: true,
  comments: "The unique identifier for the inventory item.",
  example: "r84963704502935",
  placeholder: "Enter inventory item ID",
  clean: util.types.toString,
});

export const locationId = input({
  label: "Location ID",
  type: "string",
  required: true,
  comments: "The ID of the location that the inventory level belongs to.",
  example: "844681632",
  placeholder: "Enter location ID",
  clean: util.types.toString,
  dataSource: LIST_LOCATIONS_DATASOURCE_REFERENCE,
});

export const sku = input({
  label: "SKU",
  type: "string",
  required: false,
  example: "97802837847",
  placeholder: "Enter SKU",
  comments: "The SKU (stock-keeping unit) for the variant.",
  clean: util.types.toString,
});

export const updatePrice = input({
  label: "Price",
  type: "string",
  required: false,
  example: "19.99",
  placeholder: "Enter price",
  comments: "The price of the variant.",
  clean: cleanStringInput,
});

export const updatedAtMin = input({
  label: "Updated At Min",
  type: "string",
  required: false,
  comments:
    "Show orders last updated at or after date. ISO 8601 format like 2021-10-01 or 2021-10-01T00:00:00-04:00 for exact time.",
  example: "2021-10-01",
  placeholder: "Enter date (YYYY-MM-DD)",
  clean: cleanStringInput,
});

export const secretKey = input({
  label: "Secret Key",
  type: "password",
  required: true,
  comments: "The Shopify app's client secret, viewable from the Partner Dashboard.",
  placeholder: "Enter secret key",
  clean: util.types.toString,
});

export const webhookTopic = input({
  label: "Webhook Topic",
  type: "string",
  required: true,
  example: "products/create",
  placeholder: "Select webhook topic",
  model: shopifyEvents.map((topic) => ({
    label: topic.event_name,
    value: topic.event_name,
  })),
  comments:
    "The event topic for the webhook. See [Shopify webhook topics](https://shopify.dev/docs/api/admin-rest/2023-04/resources/webhook#event-topics) for all available topics.",
  clean: (value: unknown) => {
    if (Array.isArray(value)) {
      return value;
    }
    return [value];
  },
});

const query = input({
  label: "Query or Mutation",
  type: "code",
  required: true,
  language: "graphql",
  comments:
    "GraphQL query or mutation. See Shopify's GraphQL API documentation for examples. Ex: { shop { name } }",
  example: GRAPHQL_EXAMPLE,
  clean: util.types.toString,
});

const variables = input({
  label: "Variables",
  type: "string",
  required: false,
  collection: "keyvaluelist",
  comments: "Variables to pass to the query or mutation.",
  example: "key1: value1, key2: value2",
  placeholder: "key1: value1, key2: value2",
  clean: cleanKeyValueListInput,
});

const variablesObject = input({
  label: "Variables Object",
  type: "code",
  comments: "Variables to pass to the query or mutation.",
  example: JSON.stringify({ key1: "value1", key2: "value2" }, null, 2),
  language: "json",
  required: false,
  clean: cleanCodeInput,
});

export const graphQlRawRequestInputs = {
  connection: connectionInput,
  apiVersion,
  query,
  variables,
  variablesObject,
};
