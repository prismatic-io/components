import { input, util } from "@prismatic-io/spectral";
import { jsonInputClean, toOptionalString } from "../../util";
import {
  account,
  connectionInput,
  connectionOnlyInputs,
  paginationGroupedInputs,
  updateMask,
} from "./common";
const dataSource = input({
  label: "Data Source",
  type: "string",
  clean: util.types.toString,
  comments:
    "The API data source that owns the product input. Accepts a data source id or a full resource name (e.g. accounts/123/dataSources/456). Product writes require a data source of type `API`.",
  example: "456",
  placeholder: "Enter Data Source ID",
  required: true,
});
const offerId = input({
  label: "Offer ID",
  type: "string",
  clean: util.types.toString,
  comments:
    "A unique identifier for the item. Leading and trailing whitespaces are stripped and multiple whitespaces are replaced by a single whitespace upon submission. Only valid unicode characters are accepted.",
  example: "SKU-12345",
  placeholder: "Enter Offer ID",
  required: true,
});
const contentLanguage = input({
  label: "Content Language",
  type: "string",
  clean: util.types.toString,
  comments: "The two-letter ISO 639-1 language code for the item.",
  example: "en",
  placeholder: "Enter Language Code",
  required: true,
});
const feedLabel = input({
  label: "Feed Label",
  type: "string",
  clean: toOptionalString,
  comments:
    "Feed label for the item. Either targetCountry or feedLabel is required. Must be less than or equal to 20 uppercase letters (A-Z), numbers (0-9), and dashes (-).",
  example: "US-FEED-001",
  placeholder: "Enter Feed Label",
  required: false,
});
const attributes = input({
  label: "Attributes",
  type: "code",
  language: "json",
  comments:
    'The product attributes as a JSON object. Prices use the Merchant API format { amountMicros, currencyCode } (e.g. 15.99 USD = amountMicros "15990000").',
  example: JSON.stringify(
    {
      title: "Men's Organic Cotton T-Shirt - Blue",
      description: "100% organic cotton t-shirt with crew neck.",
      link: "https://www.example.com/products/tshirt-blue",
      imageLink: "https://www.example.com/images/tshirt-blue.jpg",
      availability: "in_stock",
      condition: "new",
      price: {
        amountMicros: "15990000",
        currencyCode: "USD",
      },
    },
    null,
    2,
  ),
  clean: jsonInputClean,
  required: false,
});
const customAttributes = input({
  label: "Custom Attributes",
  type: "code",
  language: "json",
  comments:
    "A list of custom (merchant-provided) attributes. It can also be used for submitting any attribute of the feed specification in its generic form (for example, { 'name': 'size type', 'value': 'regular' }). This is useful for submitting attributes not explicitly exposed by the API, such as additional attributes used for Buy on Google (formerly known as Shopping Actions).",
  example: JSON.stringify([
    {
      name: "string",
      value: "string",
      groupValues: [
        {
          name: "string",
          value: "string",
        },
      ],
    },
  ]),
  clean: jsonInputClean,
});
const productInputEntries = input({
  label: "Product Inputs",
  type: "code",
  language: "json",
  comments:
    "Array of product input objects to upsert. Each entry must include offerId, contentLanguage, feedLabel, and an attributes object. Items are submitted as parallel inserts.",
  example: JSON.stringify(
    [
      {
        offerId: "SKU-12345",
        contentLanguage: "en",
        feedLabel: "US",
        productAttributes: {
          title: "Men's Organic Cotton T-Shirt - Blue",
          price: { amountMicros: "15990000", currencyCode: "USD" },
        },
      },
    ],
    null,
    2,
  ),
  clean: jsonInputClean,
  required: true,
});
export const productIdentifierInputs = {
  contentLanguage,
  feedLabel: { ...feedLabel, clean: util.types.toString, required: true },
  offerId: { ...offerId, dataSource: "selectProductMerchant" },
};
export const batchProductInputs = {
  ...connectionOnlyInputs,
  account,
  dataSource,
  entries: productInputEntries,
};
export const createProductInputs = {
  ...connectionOnlyInputs,
  account,
  dataSource,
  ...productIdentifierInputs,
  offerId,
  attributes,
  customAttributes: { ...customAttributes, required: false },
};
export const deleteProductInputs = {
  ...connectionOnlyInputs,
  account,
  dataSource,
  ...productIdentifierInputs,
};
export const getProductInputs = {
  ...connectionOnlyInputs,
  account,
  ...productIdentifierInputs,
};
export const listProductsInputs = {
  ...connectionOnlyInputs,
  account,
  ...paginationGroupedInputs,
};
export const updateProductInputs = {
  ...connectionOnlyInputs,
  account,
  dataSource,
  ...productIdentifierInputs,
  attributes,
  customAttributes: { ...customAttributes, required: false },
  updateMask: {
    ...updateMask,
    comments:
      "Comma-separated list of fields to update (e.g. productAttributes.title,productAttributes.price). Fields omitted from the mask are left unchanged.",
    example: "productAttributes.title,productAttributes.price",
  },
};
export const selectProductMerchantInputs = {
  connection: connectionInput,
  account: { ...account, dataSource: undefined },
};
