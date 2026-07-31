export const createListOutputSchema = {
  type: "object" as const,
  properties: {
    id: { type: "string" },
    name: { type: "string" },
    contact_count: { type: "integer" },
    _metadata: { type: "object", properties: { self: { type: "string" } } },
  },
};
export const getAllListsOutputSchema = {
  type: "object" as const,
  properties: {
    result: {
      type: "array",
      items: {
        type: "object" as const,
        properties: {
          id: { type: "string" },
          name: { type: "string" },
          contact_count: { type: "integer" },
          _metadata: {
            type: "object",
            properties: { self: { type: "string" } },
          },
        },
      },
    },
    _metadata: {
      type: "object" as const,
      properties: {
        prev: { type: "string" },
        self: { type: "string" },
        next: { type: "string" },
        count: { type: "number" },
      },
    },
    pagination: {
      type: "object" as const,
      properties: {
        nextPageToken: { type: "string" },
        previousPageToken: { type: "string" },
        totalCount: { type: "number" },
      },
    },
  },
};
