export const metaSchema = {
  type: "object" as const,
  properties: {
    page: { type: "integer" },
    pageSize: { type: "integer" },
    totalPages: { type: "integer" },
  },
};
