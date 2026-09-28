import {
  collectionLinksSchema,
  includedItemSchema,
  resourceLinksSchema,
} from "./shared";
const eventResourceObject = {
  type: "object" as const,
  properties: {
    type: { type: "string" },
    id: { type: "string" },
    attributes: {
      type: "object" as const,
      properties: {
        timestamp: { type: ["number", "null"] },
        eventProperties: { type: ["object", "null"] },
        datetime: { type: ["string", "null"], format: "date-time" },
        uuid: { type: ["string", "null"] },
      },
    },
    links: resourceLinksSchema,
  },
  required: ["type", "id", "attributes", "links"],
};
export const getEventOutputSchema = {
  type: "object" as const,
  properties: {
    data: eventResourceObject,
    included: {
      type: "array" as const,
      items: includedItemSchema,
    },
  },
  required: ["data"],
};
export const listEventsOutputSchema = {
  type: "object" as const,
  properties: {
    data: {
      type: "array" as const,
      items: eventResourceObject,
    },
    links: collectionLinksSchema,
    included: {
      type: "array" as const,
      items: includedItemSchema,
    },
  },
  required: ["data", "links"],
};
export const createEventOutputSchema = {
  type: "string" as const,
};
export const bulkCreateEventsOutputSchema = {
  type: "string" as const,
};
