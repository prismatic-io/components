import { input, util } from "@prismatic-io/spectral";
import { cleanStringInput } from "../../util";
import { getAlldata, pagination, shopifyConnection } from "./common";
const resource = input({
  label: "Resource",
  type: "string",
  required: true,
  example: "gid://shopify/Product/20995642",
  placeholder: "Enter resource ID",
  comments: "The unique identifier for the resource.",
  clean: util.types.toString,
});
const key = input({
  label: "Key",
  type: "string",
  required: true,
  example: "myKey",
  placeholder: "Enter key",
  comments: "The key for the metafield.",
  clean: util.types.toString,
});
const value = input({
  label: "Value",
  type: "string",
  required: true,
  example: "myValue",
  placeholder: "Enter value",
  comments: "The value for the metafield.",
  clean: util.types.toString,
});
const ownerId = input({
  label: "Owner ID",
  type: "string",
  required: true,
  example: "gid://shopify/Product/20995642",
  placeholder: "Enter owner ID",
  comments: "The unique ID of the owner of the metafield.",
  clean: util.types.toString,
});
const type = input({
  label: "Type",
  type: "string",
  required: false,
  model: [
    { label: "Boolean", value: "boolean" },
    { label: "Color", value: "color" },
    { label: "Date", value: "date" },
    { label: "Date Time", value: "date_time" },
    { label: "Dimension", value: "dimension" },
    { label: "Id", value: "id" },
    { label: "Json", value: "json" },
    { label: "Link", value: "link" },
    { label: "Money", value: "money" },
    { label: "Multi Line Text Field", value: "multi_line_text_field" },
    { label: "Number Decimal", value: "number_decimal" },
    { label: "Number Integer", value: "number_integer" },
    { label: "Rating", value: "rating" },
    { label: "Rich Text Field", value: "rich_text_field" },
    { label: "Single Line Text Field", value: "single_line_text_field" },
    { label: "Url", value: "url" },
    { label: "Volume", value: "volume" },
    { label: "Weight", value: "weight" },
  ],
  example: "single_line_text_field",
  placeholder: "Select metafield type",
  comments:
    "Provide a type for the metafield. Required when there is no corresponding definition for the given namespace, key, and owner resource type.",
  clean: cleanStringInput,
});
const namespace = input({
  label: "Namespace",
  type: "string",
  required: false,
  example: "global",
  placeholder: "Enter namespace",
  comments: "The namespace for the metafield.",
  clean: cleanStringInput,
});
export const listMetafieldsInputs = {
  shopifyConnection,
  resource,
  getAlldata,
  pagination,
};
export const setMetafieldInputs = {
  shopifyConnection,
  key,
  value,
  ownerId,
  type,
  namespace,
};
export const deleteMetafieldInputs = {
  shopifyConnection,
  key: input({
    ...key,
    comments: "Provide the key of the metafield to delete.",
  }),
  ownerId: input({
    ...ownerId,
    comments: "Provide the owner ID of the metafield to delete.",
  }),
  namespace: input({
    ...namespace,
    comments: "Provide the namespace of the metafield to delete.",
    required: true,
    clean: util.types.toString,
  }),
};
