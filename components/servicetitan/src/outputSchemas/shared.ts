export const addressSchema = {
  type: "object" as const,
  properties: {
    street: {
      type: "string",
    },
    unit: {
      type: ["string", "null"],
    },
    city: {
      type: "string",
    },
    state: {
      type: "string",
    },
    zip: {
      type: "string",
    },
    country: {
      type: "string",
    },
    latitude: {
      type: ["number", "null"],
      format: "double",
    },
    longitude: {
      type: ["number", "null"],
      format: "double",
    },
  },
  required: ["street", "city", "state", "zip", "country"],
};
export const listEnvelope = <T>(items: T) => ({
  type: "object" as const,
  properties: {
    page: {
      type: "integer",
      format: "int32",
    },
    pageSize: {
      type: "integer",
      format: "int32",
    },
    hasMore: {
      type: "boolean",
    },
    totalCount: {
      type: ["integer", "null"],
      format: "int32",
    },
    data: {
      type: "array",
      items,
    },
  },
  required: ["page", "pageSize", "hasMore", "data"],
});
