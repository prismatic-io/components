import { input, util } from "@prismatic-io/spectral";
import { cleanStringInput } from "../../util";

export const metaFieldId = input({
  label: "Metafield ID",
  type: "string",
  required: true,
  comments: "The unique identifier for the metafield.",
  example: "534526895",
  placeholder: "Enter metafield ID",
  clean: util.types.toString,
});

export const namespace = input({
  label: "Namespace",
  type: "string",
  required: true,
  comments:
    "The container for a set of metafields. Grouping metafields within a namespace prevents conflicts with other metafields.",
  example: "my_fields",
  placeholder: "Enter namespace",
  clean: util.types.toString,
});

export const key = input({
  label: "Key",
  type: "string",
  required: true,
  comments: "The identifier for the metafield within its namespace.",
  example: "sponsor",
  placeholder: "Enter key",
  clean: util.types.toString,
});

export const value = input({
  label: "Value",
  type: "string",
  required: true,
  comments:
    "The data stored in the metafield. Must match the expected format for the metafield type.",
  example: "MyExample Sponsor",
  placeholder: "Enter value",
  clean: util.types.toString,
});

export const valueType = input({
  label: "Value Type",
  type: "string",
  required: true,
  comments: "The data type of the metafield value.",
  example: "string",
  model: [
    { label: "String", value: "string" },
    { label: "Integer", value: "integer" },
    { label: "Boolean", value: "boolean" },
  ],
  clean: util.types.toString,
});

export const type = input({
  label: "Metafield Type",
  type: "string",
  required: true,
  comments:
    "The metafield type definition. See [supported metafield types](https://shopify.dev/apps/metafields/types) for all available options.",
  example: "single_line_text_field",
  placeholder: "Enter metafield type",
  clean: util.types.toString,
});

export const description = input({
  label: "Description",
  type: "string",
  required: false,
  comments: "A human-readable description of the metafield for reference purposes.",
  example: "string",
  placeholder: "Enter description",
  clean: cleanStringInput,
});
