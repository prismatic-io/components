import { input, structuredObjectInput, util } from "@prismatic-io/spectral";
import {
  LIST_CUSTOMERS_DATASOURCE_REFERENCE,
  LIST_LOCATIONS_DATASOURCE_REFERENCE,
  LIST_ORDERS_DATASOURCE_REFERENCE,
  LIST_PRODUCTS_DATASOURCE_REFERENCE,
} from "../../constants";
import { connectionInput } from "../../inputs";
import {
  cleanCodeInputEmptyObject,
  cleanCustomerId,
  cleanLocationId,
  cleanOptionalBooleanInput,
  cleanOrderId,
  cleanProductId,
  cleanStringInput,
  cleanValueListInput,
} from "../../util";
export const shopifyConnection = connectionInput;
export const getAlldata = input({
  label: "Fetch All",
  type: "boolean",
  required: false,
  default: "false",
  comments:
    "When true, automatically fetches all pages of results using pagination. The API is limited to 250 records per page max.",
  clean: util.types.toBool,
});
export const productId = input({
  label: "Product ID",
  type: "string",
  required: true,
  example: "108828309 or gid://shopify/Product/108828309",
  placeholder: "Enter product ID",
  comments: "The unique identifier for the product.",
  clean: cleanProductId,
  dataSource: LIST_PRODUCTS_DATASOURCE_REFERENCE,
});
export const limit = input({
  label: "Limit",
  type: "string",
  required: false,
  comments: "The maximum number of results to return per page. Maximum: 250.",
  example: "20",
  placeholder: "Enter limit",
  clean: util.types.toNumber,
});
export const endCursor = input({
  label: "Page Offset Cursor",
  type: "string",
  required: false,
  comments:
    "Cursor for pagination. Use the value from the previous response to retrieve the next page of results.",
  example:
    "eyJkaXJlY3Rpb24iOiJwcmV2IiwibGFzdF9pZCI6OTAyOTk2ODAwMzM1NCwibGFzdF92YWx1ZSI6IlRoZSBDb2xsZWN0aW9uIFNub3dib2FyZDogTGlxdWlkIn0",
  placeholder: "Enter page cursor",
  clean: cleanStringInput,
});
export const pagination = structuredObjectInput({
  label: "Pagination",
  required: false,
  comments: "Page and page-size controls.",
  inputs: {
    limit: {
      ...limit,
      comments:
        "The maximum number of results to return per page. Maximum: 250.",
    },
    endCursor,
  },
});
export const orderId = input({
  label: "Order ID",
  type: "string",
  required: true,
  example: "10079785100 or gid://shopify/Order/10079785100",
  placeholder: "Enter order ID",
  comments: "The unique identifier for the order.",
  clean: cleanOrderId,
  dataSource: LIST_ORDERS_DATASOURCE_REFERENCE,
});
export const locationId = input({
  label: "Location ID",
  type: "string",
  required: true,
  comments: "The ID of the location that the inventory level belongs to.",
  example: "346779380 or gid://shopify/Location/346779380",
  placeholder: "Enter location ID",
  clean: cleanLocationId,
  dataSource: LIST_LOCATIONS_DATASOURCE_REFERENCE,
});
export const customerIdGql = input({
  label: "Customer",
  type: "string",
  required: true,
  example: "5940139491234 or gid://shopify/Customer/5940139491234",
  comments: "The unique identifier for the customer.",
  placeholder: "Enter customer ID",
  clean: cleanCustomerId,
  dataSource: LIST_CUSTOMERS_DATASOURCE_REFERENCE,
});
export const tags = input({
  label: "Tags",
  type: "string",
  required: false,
  collection: "valuelist",
  example: "Style",
  placeholder: "Enter tag",
  comments: "For each list item, provide a string to tag the product with.",
  clean: cleanValueListInput,
});
export const additionalFields = input({
  label: "Additional Fields",
  type: "code",
  language: "json",
  required: false,
  comments:
    "Additional fields that might not be covered by the standard inputs. This is a JSON object.",
  example: JSON.stringify({
    note: "This is an example note.",
    tags: ["Style"],
  }),
  clean: (value) => cleanCodeInputEmptyObject(value, "Additional Fields"),
});
export const taxExempt = input({
  label: "Tax Exempt",
  type: "boolean",
  required: false,
  comments: "Determines if the customer is tax exempt.",
  default: "false",
  clean: util.types.toBool,
});
export const optionalBoolean = input({
  label: "Optional Boolean",
  type: "string",
  required: false,
  model: [
    {
      label: "True",
      value: "true",
    },
    {
      label: "False",
      value: "false",
    },
  ],
  default: undefined,
  clean: cleanOptionalBooleanInput,
});
export const query = input({
  label: "Query",
  type: "string",
  required: false,
  comments: "The query to filter the inventory items.",
  example: "id:>=30322695",
  placeholder: "Enter query filter",
  clean: cleanStringInput,
});
export const callbackUrl = input({
  label: "Callback URL",
  type: "string",
  required: true,
  example: "https://example.com",
  placeholder: "Enter callback URL",
  comments:
    "The callback URL that the fulfillment service has registered for request.",
  clean: util.types.toString,
});
export const itemId = input({
  label: "Inventory Item ID",
  type: "string",
  required: true,
  comments: "The unique identifier for the inventory item.",
  example: "gid://shopify/InventoryItem/43933612241234",
  placeholder: "Enter inventory item ID",
  clean: util.types.toString,
});
