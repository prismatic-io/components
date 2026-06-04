import { input, util } from "@prismatic-io/spectral";
import { toOptionalNumber, toOptionalString } from "../util";
import {
  beginTime,
  cursor,
  idempotencyKey,
  limit,
  sortOrder,
  squareConnection,
  validateJSON,
} from "./common";

const types = input({
  label: "Types",
  type: "string",
  required: false,
  placeholder: "Enter catalog object types (comma-separated)",
  comments:
    "An optional case-insensitive, comma-separated list of object types to retrieve. Valid values are defined in the CatalogObjectType enum, for example, ITEM, ITEM_VARIATION, CATEGORY, DISCOUNT, TAX, MODIFIER, MODIFIER_LIST, IMAGE.",
  default: "ITEM, ITEM_VARIATION, CATEGORY, DISCOUNT, TAX, MODIFIER, MODIFIER_LIST, IMAGE",
  example: "ITEM, CATEGORY, TAX",
  clean: toOptionalString,
});

const catalogVersion = input({
  label: "Catalog Version",
  type: "string",
  placeholder: "Enter catalog version",
  example: "1234567890123",
  comments:
    "The specific version of the catalog objects to include in the response. Used to retrieve historical versions of objects. The value is matched against the CatalogObject version attribute.",
  clean: toOptionalNumber,
});

const textFilter = input({
  label: "Text Filter",
  type: "string",
  placeholder: "Enter search text",
  example: "coffee mug",
  comments:
    "The text filter expression used to return items or item variations containing the specified text.",
  clean: toOptionalString,
});

const categoryIds = input({
  label: "Category IDs",
  type: "code",
  language: "json",
  default: JSON.stringify(["W62UWFY35CWMYGVWK6TWJDNI", "X73VXGZ46DXNZHXWL7UXKENJ"], null, 2),
  comments: "An array of category IDs in JSON format used to filter items by category.",
  clean: (input) => validateJSON(input),
});

const stockLevels = input({
  label: "Stock Levels",
  type: "code",
  language: "json",
  default: JSON.stringify(["OUT", "LOW"], null, 2),
  comments: "An array of stock levels in JSON format used to filter items. Options: OUT, LOW.",
  clean: (input) => validateJSON(input),
});

const enabledLocationIds = input({
  label: "Enabled Location IDs",
  type: "code",
  language: "json",
  default: JSON.stringify(["LH2G9VFHJRWKR", "LK3H8WGIKSMLA"], null, 2),
  comments: "An array of location IDs in JSON format used to filter items by enabled locations.",
  clean: (input) => validateJSON(input),
});

const productTypes = input({
  label: "Product Types",
  type: "code",
  language: "json",
  default: JSON.stringify(["REGULAR", "APPOINTMENTS_SERVICE"], null, 2),
  comments:
    "An array of product types in JSON format used to filter items. Options: REGULAR, APPOINTMENTS_SERVICE.",
  clean: (input) => validateJSON(input),
});

const customAttributeFilters = input({
  label: "Custom Attribute Filters",
  type: "code",
  language: "json",
  default: JSON.stringify(
    [
      {
        custom_attribute_definition_id: "W62UWFY35CWMYGVWK6TWJDNI",
        key: "color",
        string_filter: "blue",
        bool_filter: true,
      },
    ],
    null,
    2,
  ),
  comments:
    "An array of custom attribute filters in JSON format used to match items with specific custom attributes.",
  clean: (input) => validateJSON(input),
});

const objectTypes = input({
  label: "Object Types",
  type: "text",
  placeholder: "Enter object types (comma-separated)",
  example: "ITEM,CATEGORY,TAX",
  comments:
    "A comma-separated list of catalog object types to include in the search results. Options: ITEM, CATEGORY, TAX, DISCOUNT, MODIFIER_LIST.",
  required: true,
  clean: util.types.toString,
});

const includeDeletedObjects = input({
  label: "Include Deleted Objects",
  type: "boolean",
  comments: "When true, deleted objects are included in the results.",
  required: true,
  clean: util.types.toBool,
});

const includeRelatedObjects = input({
  label: "Include Related Objects",
  type: "boolean",
  comments:
    "When true, the response includes additional objects that are related to the requested objects.",
  required: true,
  clean: util.types.toBool,
});

const catalogQuery = input({
  label: "Catalog Query",
  type: "code",
  language: "json",
  default: JSON.stringify(
    {
      sorted_attribute_query: {
        attribute_name: "name",
        initial_attribute_value: "A",
        sort_order: "ASC",
      },
      exact_query: {
        attribute_name: "type",
        attribute_value: "ITEM",
      },
    },
    null,
    2,
  ),
  comments:
    "Query to filter or sort catalog results in JSON format. See [Square Catalog Query](https://developer.squareup.com/reference/square/objects/CatalogQuery) for query options.",
  required: true,
  clean: validateJSON,
});

const objectIds = input({
  label: "Object IDs",
  type: "code",
  language: "json",
  default: JSON.stringify(
    ["W62UWFY35CWMYGVWK6TWJDNI", "X73VXGZ46DXNZHXWL7UXKENJ", "Y84WHHA57EYOAIYWM8VYLOFK"],
    null,
    2,
  ),
  comments: "Array of catalog object IDs to retrieve in JSON format.",
  required: true,
  clean: validateJSON,
});

const catalogObject = input({
  label: "Catalog Object",
  type: "code",
  language: "json",
  default: JSON.stringify(
    {
      type: "ITEM",
      id: "#temp-item-id",
      item_data: {
        name: "Coffee Mug",
        description: "Ceramic coffee mug - 12oz capacity",
        abbreviation: "MUG",
        category_id: "W62UWFY35CWMYGVWK6TWJDNI",
        variations: [
          {
            type: "ITEM_VARIATION",
            id: "#temp-variation-id",
            item_variation_data: {
              item_id: "#temp-item-id",
              name: "Regular",
              pricing_type: "FIXED_PRICING",
              price_money: {
                amount: 1500,
                currency: "USD",
              },
            },
          },
        ],
      },
    },
    null,
    2,
  ),
  comments:
    "Catalog object data in JSON format. See [Square Catalog Object](https://developer.squareup.com/reference/square/objects/CatalogObject) for field details.",
  required: true,
  clean: validateJSON,
});

const batches = input({
  label: "Batches",
  type: "code",
  language: "json",
  default: JSON.stringify(
    [
      {
        objects: [
          {
            type: "ITEM",
            id: "#coffee-mug",
            item_data: {
              name: "Coffee Mug",
              description: "Ceramic coffee mug",
            },
          },
        ],
      },
    ],
    null,
    2,
  ),
  comments:
    "Array of batches containing catalog objects in JSON format. Each batch may contain up to 1,000 objects. Maximum 10,000 objects total across all batches.",
  required: true,
  clean: validateJSON,
});

const objectId = input({
  label: "Object ID",
  type: "string",
  placeholder: "Enter Catalog Object ID",
  example: "W62UWFY35CWMYGVWK6TWJDNI",
  comments: "The unique identifier for the catalog object.",
  clean: util.types.toString,
});

export const listCatalogInputs = {
  squareConnection,
  cursor,
  types,
  catalogVersion,
};

export const searchCatalogItemsInputs = {
  squareConnection,
  cursor,
  limit,
  textFilter,
  categoryIds,
  stockLevels,
  enabledLocationIds,
  sortOrder,
  productTypes,
  customAttributeFilters,
};

export const searchCatalogObjectsInputs = {
  squareConnection,
  objectTypes,
  includeDeletedObjects,
  includeRelatedObjects,
  beginTime,
  catalogQuery,
  cursor,
  limit,
};

export const batchRetrieveCatalogObjectsInputs = {
  squareConnection,
  objectIds,
  includeRelatedObjects,
  includeDeletedObjects,
  catalogVersion,
};

export const upsertCatalogObjectInputs = {
  squareConnection,
  idempotencyKey,
  catalogObject,
};

export const batchUpsertCatalogObjectsInputs = {
  squareConnection,
  idempotencyKey,
  batches,
};

export const retrieveCatalogObjectInputs = {
  squareConnection,
  objectId,
  includeRelatedObjects,
  catalogVersion,
};

export const deleteCatalogObjectInputs = {
  squareConnection,
  objectId,
};

export const batchDeleteCatalogObjectsInputs = {
  squareConnection,
  objectIds,
};


export { catalogVersion, types };
