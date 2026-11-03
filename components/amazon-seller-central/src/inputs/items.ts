import { input, structuredObjectInput, util } from "@prismatic-io/spectral";
import { jsonInputClean, valueListStringInputClean } from "../util";
import { connectionInput, MarketplaceIds, pageSize } from "./common";

const identifiers = input({
  label: "Identifiers",
  type: "string",
  placeholder: "Enter product identifiers",
  comments:
    "List of product identifiers to search the Amazon catalog for. <strong>Important:</strong> Cannot be used with keywords.",
  collection: "valuelist",
  required: false,
  clean: valueListStringInputClean,
  example: "B07H65KP63",
});

const identifiersType = input({
  label: "Identifiers Type",
  type: "string",
  placeholder: "Select identifier type",
  comments:
    "Type of product identifiers to search the Amazon catalog for. <strong>Important:</strong> Required when identifiers are provided.",
  model: [
    {
      label: "ASIN",
      value: "ASIN",
    },
    {
      label: "EAN",
      value: "EAN",
    },
    {
      label: "GTIN",
      value: "GTIN",
    },
    {
      label: "ISBN",
      value: "ISBN",
    },
    {
      label: "JAN",
      value: "JAN",
    },
    {
      label: "MINSAN",
      value: "MINSAN",
    },
    {
      label: "SKU",
      value: "SKU",
    },
    {
      label: "UPC",
      value: "UPC",
    },
    {
      label: "",
      value: "",
    },
  ],
  default: "",
  clean: util.types.toString,
});

const includedData = input({
  label: "Included Data",
  type: "string",
  collection: "valuelist",
  placeholder: "Select data sets to include",
  comments: "List of data sets to include in the response. Default: summaries.",
  model: [
    {
      label: "attributes",
      value: "attributes",
    },
    {
      label: "dimensions",
      value: "dimensions",
    },
    {
      label: "identifiers",
      value: "identifiers",
    },
    {
      label: "images",
      value: "images",
    },
    {
      label: "productTypes",
      value: "productTypes",
    },
    {
      label: "relationships",
      value: "relationships",
    },
    {
      label: "salesRanks",
      value: "salesRanks",
    },
    {
      label: "summaries",
      value: "summaries",
    },
    {
      label: "vendorDetails",
      value: "vendorDetails",
    },
  ],
  clean: util.types.toString,
});

const locale = input({
  label: "Locale",
  type: "string",
  placeholder: "Enter locale",
  comments:
    "Locale for retrieving localized summaries. Defaults to the primary locale of the marketplace.",
  required: false,
  clean: util.types.toString,
  example: "en_US",
});

const sellerId = input({
  label: "Seller ID",
  type: "string",
  placeholder: "Enter seller ID",
  comments:
    "A selling partner identifier, such as a seller account or vendor code. <strong>Important:</strong> Required when identifiersType is SKU.",
  required: false,
  clean: util.types.toString,
  example: "A2EXAMPLE123456",
});

const keywords = input({
  label: "Keywords",
  type: "string",
  placeholder: "Enter keywords",
  comments:
    "List of words to search the Amazon catalog for. <strong>Important:</strong> Cannot be used with identifiers.",
  collection: "valuelist",
  required: false,
  clean: valueListStringInputClean,
  example: "laptop",
});

const brandNames = input({
  label: "Brand Names",
  type: "string",
  placeholder: "Enter brand names",
  comments:
    "List of brand names to limit the search for keywords-based queries. <strong>Important:</strong> Cannot be used with identifiers.",
  collection: "valuelist",
  required: false,
  clean: valueListStringInputClean,
  example: "Samsung",
});

const classificationsIds = input({
  label: "Classification IDs",
  type: "string",
  placeholder: "Enter classification IDs",
  comments:
    "List of classification identifiers to limit the search for keywords-based queries. <strong>Important:</strong> Cannot be used with identifiers.",
  collection: "valuelist",
  required: false,
  clean: valueListStringInputClean,
  example: "12345678",
});

const keywordsLocale = input({
  label: "Keywords Locale",
  type: "string",
  required: false,
  placeholder: "Enter keywords locale",
  comments:
    "The language of the keywords provided for keywords-based queries. Defaults to the primary locale of the marketplace. <strong>Important:</strong> Cannot be used with identifiers.",
  example: "en_US",
  clean: util.types.toString,
});

const asin = input({
  label: "Amazon Standard Identification Number (ASIN)",
  type: "string",
  placeholder: "Enter ASIN",
  comments: "The Amazon Standard Identification Number (ASIN) of the item.",
  required: true,
  clean: util.types.toString,
  example: "B07H65KP63",
});

const sku = input({
  label: "Stock Keeping Unit (SKU)",
  type: "string",
  placeholder: "Enter SKU",
  comments: "A selling partner provided identifier for an Amazon listing.",
  required: true,
  clean: util.types.toString,
  example: "MY-PRODUCT-SKU-001",
});

const issueLocale = input({
  label: "Issue Locale",
  type: "string",
  placeholder: "Enter issue locale",
  comments:
    "A locale for localization of issues. When not provided, the default language code of the first marketplace is used. Examples: 'en_US', 'fr_CA', 'fr_FR'. Localized messages default to 'en_US' when a localization is not available in the specified locale.",
  required: false,
  clean: util.types.toString,
  example: "en_US",
});

const productType = input({
  label: "Product Type",
  type: "string",
  placeholder: "Enter product type",
  comments: "The Amazon product type of the listings item.",
  required: true,
  example: "LUGGAGE",
  clean: util.types.toString,
});

const requirements = input({
  label: "Requirements",
  type: "string",
  placeholder: "Select requirements set",
  comments: "The name of the requirements set for the provided data.",
  model: [
    {
      label: "LISTING",
      value: "LISTING",
    },
    {
      label: "LISTING_PRODUCT_ONLY",
      value: "LISTING_PRODUCT_ONLY",
    },
    {
      label: "LISTING_OFFER_ONLY",
      value: "LISTING_OFFER_ONLY",
    },
    {
      label: "",
      value: "",
    },
  ],
  default: "",
  clean: util.types.toString,
});

const attributes = input({
  label: "Attributes",
  type: "code",
  language: "json",
  comments:
    "JSON object containing structured listings item attribute data keyed by attribute name.",
  example: JSON.stringify(
    {
      condition_type: [{ value: "new_new", marketplace_id: "ATVPDKIKX0DER" }],
      item_name: [
        { value: "Example Product Name", marketplace_id: "ATVPDKIKX0DER" },
      ],
    },
    null,
    2,
  ),
  clean: jsonInputClean,
  required: true,
});

const patches = input({
  label: "Patches",
  type: "code",
  language: "json",
  comments:
    "One or more JSON Patch operations to perform on the listings item.",
  example: JSON.stringify(
    [
      {
        op: "replace",
        path: "/attributes/fulfillment_availability",
        value: [{ fulfillment_channel_code: "DEFAULT", quantity: 10 }],
      },
    ],
    null,
    2,
  ),
  clean: jsonInputClean,
  required: true,
});

const pageToken = input({
  label: "Page Token",
  type: "string",
  required: false,
  placeholder: "Enter page token",
  comments:
    "Token to fetch a certain page when there are multiple pages worth of results.",
  example: "amzn1.page.12345678-90ab-cdef-1234-567890abcdef",
  clean: util.types.toString,
});

const searchCatalogItemPagination = structuredObjectInput({
  label: "Pagination",
  required: false,
  comments: "Page size and continuation token for paginated results.",
  inputs: { pageSize, pageToken },
});

export const searchCatalogItemInputs = {
  connectionInput,
  marketplaceIds: MarketplaceIds,
  identifiers,
  identifiersType,
  includedData,
  locale,
  sellerId,
  keywords,
  brandNames,
  classificationsIds,
  keywordsLocale,
  pagination: searchCatalogItemPagination,
};

export const getCatalogItemInputs = {
  connectionInput,
  asin,
  marketplaceIds: MarketplaceIds,
  includedData,
  locale,
};

export const getListingsItemInputs = {
  connectionInput,
  sellerId: {
    ...sellerId,
    required: true,
    comments:
      "A selling partner identifier, such as a merchant account or vendor code.\t",
  },
  sku,
  marketplaceIds: MarketplaceIds,
  issueLocale,
  includedData,
};

export const createListingsItemInputs = {
  connectionInput,
  sellerId,
  sku,
  marketplaceIds: MarketplaceIds,
  productType,
  requirements,
  attributes,
  issueLocale,
};

export const updateListingsItemInputs = {
  connectionInput,
  sellerId,
  sku,
  marketplaceIds: MarketplaceIds,
  productType,
  issueLocale,
  patches,
};

export const deleteListingsItemInputs = {
  connectionInput,
  sellerId,
  sku,
  marketplaceIds: MarketplaceIds,
  issueLocale,
};
