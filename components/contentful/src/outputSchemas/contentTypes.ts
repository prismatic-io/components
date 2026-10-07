import { draftSysProperties } from "./shared";
const contentTypeSchema = {
  type: "object" as const,
  properties: {
    description: { type: "string" },
    displayField: { type: "string" },
    fields: {
      type: "array",
      items: {
        type: "object" as const,
        properties: {
          disabled: { type: "boolean" },
          id: { type: "string" },
          localized: { type: "boolean" },
          name: { type: "string" },
          omitted: { type: "boolean" },
          required: { type: "boolean" },
          type: { type: "string" },
          validations: { type: "array", items: { type: "object" as const } },
        },
      },
    },
    name: { type: "string" },
    sys: {
      type: "object" as const,
      properties: draftSysProperties,
    },
  },
};
export const listContentTypesOutputSchema = {
  type: "array" as const,
  items: contentTypeSchema,
};
export const createContentTypeOutputSchema = contentTypeSchema;
export const updateContentTypeOutputSchema = contentTypeSchema;
