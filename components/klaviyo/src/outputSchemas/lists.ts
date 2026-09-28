import {
  collectionLinksSchema,
  includedItemSchema,
  resourceLinksSchema,
} from "./shared";
const listResourceObject = {
  type: "object" as const,
  properties: {
    type: { type: "string" },
    id: { type: "string" },
    attributes: {
      type: "object" as const,
      properties: {
        name: { type: ["string", "null"] },
        created: { type: ["string", "null"], format: "date-time" },
        updated: { type: ["string", "null"], format: "date-time" },
        optInProcess: { type: ["string", "null"] },
      },
    },
    links: resourceLinksSchema,
  },
  required: ["type", "id", "attributes", "links"],
};
export const createListOutputSchema = {
  type: "object" as const,
  properties: {
    data: listResourceObject,
  },
  required: ["data"],
};
export const getListOutputSchema = {
  type: "object" as const,
  properties: {
    data: listResourceObject,
    included: {
      type: "array" as const,
      items: includedItemSchema,
    },
  },
  required: ["data"],
};
export const listListsOutputSchema = {
  type: "object" as const,
  properties: {
    data: {
      type: "array" as const,
      items: listResourceObject,
    },
    links: collectionLinksSchema,
    included: {
      type: "array" as const,
      items: includedItemSchema,
    },
  },
  required: ["data", "links"],
};
export const updateListOutputSchema = createListOutputSchema;
export const deleteListOutputSchema = {
  type: "string" as const,
};
export { listListProfilesOutputSchema } from "./profiles";
