export const collectionLinksSchema = {
  type: "object" as const,
  properties: {
    self: { type: "string" },
    prev: { type: ["string", "null"] },
    next: { type: ["string", "null"] },
  },
  required: ["self"],
};

export const includedItemSchema = {
  type: "object" as const,
  properties: {
    type: { type: "string" },
    id: { type: "string" },
    attributes: { type: "object" as const },
    links: {
      type: "object" as const,
      properties: {
        self: { type: "string" },
      },
    },
  },
};

export const resourceLinksSchema = {
  type: "object" as const,
  properties: {
    self: { type: "string" },
  },
};

const relationshipLinksSchema = {
  type: "object" as const,
  properties: {
    self: { type: "string" },
    related: { type: "string" },
  },
  required: ["self", "related"],
};

const relationshipDataSchema = {
  type: "object" as const,
  properties: {
    type: { type: "string" },
    id: { type: "string" },
  },
  required: ["type", "id"],
};

export const toOneRelationshipSchema = {
  type: "object" as const,
  properties: {
    data: relationshipDataSchema,
    links: relationshipLinksSchema,
  },
};

export const toManyRelationshipSchema = {
  type: "object" as const,
  properties: {
    data: {
      type: "array" as const,
      items: relationshipDataSchema,
    },
    links: relationshipLinksSchema,
  },
};
