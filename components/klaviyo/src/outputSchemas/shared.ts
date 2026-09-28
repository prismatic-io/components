export const collectionLinksSchema = {
  type: "object" as const,
  properties: {
    self: { type: "string" },
    first: { type: "string" },
    last: { type: "string" },
    prev: { type: "string" },
    next: { type: "string" },
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
