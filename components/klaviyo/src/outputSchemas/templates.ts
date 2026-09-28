import { collectionLinksSchema, resourceLinksSchema } from "./shared";
const templateResourceObject = {
  type: "object" as const,
  properties: {
    type: { type: "string" },
    id: { type: "string" },
    attributes: {
      type: "object" as const,
      properties: {
        name: { type: "string" },
        editorType: { type: "string" },
        html: { type: "string" },
        text: { type: ["string", "null"] },
        created: { type: ["string", "null"], format: "date-time" },
        updated: { type: ["string", "null"], format: "date-time" },
      },
    },
    links: resourceLinksSchema,
  },
  required: ["type", "id", "attributes", "links"],
};
export const createTemplateOutputSchema = {
  type: "object" as const,
  properties: {
    data: templateResourceObject,
  },
  required: ["data"],
};
export const getTemplateOutputSchema = createTemplateOutputSchema;
export const listTemplatesOutputSchema = {
  type: "object" as const,
  properties: {
    data: {
      type: "array" as const,
      items: templateResourceObject,
    },
    links: collectionLinksSchema,
  },
  required: ["data", "links"],
};
export const updateTemplateOutputSchema = createTemplateOutputSchema;
export const deleteTemplateOutputSchema = {
  type: "string" as const,
};
