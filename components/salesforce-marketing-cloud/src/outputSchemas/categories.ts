export const categoryOutputSchema = {
  type: "object" as const,
  properties: {
    id: { type: "integer" },
    name: { type: "string" },
    description: { type: "string" },
    categoryType: { type: "string" },
    parentId: { type: "number" },
    enterpriseId: { type: "number" },
    memberId: { type: "number" },
    sharingProperties: { type: "object", additionalProperties: true },
  },
  additionalProperties: true,
};
export const listCategoriesOutputSchema = {
  type: "object" as const,
  properties: {
    count: { type: "integer" },
    page: { type: "integer" },
    pageSize: { type: "integer" },
    links: { type: "object", additionalProperties: true },
    items: {
      type: "array",
      items: {
        type: "object",
        properties: {
          ...categoryOutputSchema.properties,
          meta: { type: "object", additionalProperties: true },
        },
        additionalProperties: true,
      },
    },
  },
  additionalProperties: true,
};
