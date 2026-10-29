import {
  collectionLinksSchema,
  includedItemSchema,
  resourceLinksSchema,
  toManyRelationshipSchema,
} from "./shared";

const segmentResourceObject = {
  type: "object" as const,
  properties: {
    type: { type: "string" },
    id: { type: "string" },
    attributes: {
      type: "object" as const,
      properties: {
        name: { type: ["string", "null"] },
        definition: {
          type: "object" as const,
          properties: {
            conditionGroups: {
              type: "array" as const,
              items: { type: "object" as const },
            },
          },
        },
        created: { type: ["string", "null"], format: "date-time" },
        updated: { type: ["string", "null"], format: "date-time" },
        isActive: { type: "boolean" },
        isProcessing: { type: "boolean" },
        isStarred: { type: "boolean" },
      },
    },
    relationships: {
      type: "object" as const,
      properties: {
        profiles: toManyRelationshipSchema,
        tags: toManyRelationshipSchema,
        flowTriggers: toManyRelationshipSchema,
      },
    },
    links: resourceLinksSchema,
  },
  required: ["type", "id", "attributes", "links"],
};

export const createSegmentOutputSchema = {
  type: "object" as const,
  properties: {
    data: segmentResourceObject,
    links: resourceLinksSchema,
  },
  required: ["data"],
};

export const getSegmentOutputSchema = {
  type: "object" as const,
  properties: {
    data: segmentResourceObject,
    included: {
      type: "array" as const,
      items: includedItemSchema,
    },
    links: resourceLinksSchema,
  },
  required: ["data"],
};

export const listSegmentsOutputSchema = {
  type: "object" as const,
  properties: {
    data: {
      type: "array" as const,
      items: segmentResourceObject,
    },
    links: collectionLinksSchema,
    included: {
      type: "array" as const,
      items: includedItemSchema,
    },
  },
  required: ["data", "links"],
};

export const updateSegmentOutputSchema = createSegmentOutputSchema;

export const deleteSegmentOutputSchema = {
  type: "string" as const,
};
