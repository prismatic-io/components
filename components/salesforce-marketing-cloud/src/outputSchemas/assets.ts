export const assetOutputSchema = {
  type: "object" as const,
  properties: {
    id: { type: "integer" },
    objectID: { type: "string" },
    customerKey: { type: "string" },
    name: { type: "string" },
    description: { type: "string" },
    assetType: {
      type: "object",
      properties: {
        id: { type: "integer" },
        name: { type: "string" },
        displayName: { type: "string" },
      },
      additionalProperties: true,
    },
    status: {
      type: "object",
      properties: {
        id: { type: "integer" },
        name: { type: "string" },
      },
      additionalProperties: true,
    },
    contentType: { type: "string" },
    enterpriseId: { type: "number" },
    memberId: { type: "number" },
    modelVersion: { type: "number" },
    createdDate: { type: "string" },
    modifiedDate: { type: "string" },
    createdBy: { type: "object", additionalProperties: true },
    modifiedBy: { type: "object", additionalProperties: true },
    owner: { type: "object", additionalProperties: true },
    category: { type: "object", additionalProperties: true },
    fileProperties: { type: "object", additionalProperties: true },
    data: { type: "object", additionalProperties: true },
    availableViews: { type: "array" },
    tags: { type: "array" },
  },
  additionalProperties: true,
};
export const listAssetsOutputSchema = {
  type: "object" as const,
  properties: {
    count: { type: "integer" },
    page: { type: "integer" },
    pageSize: { type: "integer" },
    links: { type: "object", additionalProperties: true },
    items: { type: "array", items: assetOutputSchema },
  },
  additionalProperties: true,
};
export const queryAssetsOutputSchema = listAssetsOutputSchema;
