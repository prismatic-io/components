export const linkSchema = {
  type: "object" as const,
  properties: {
    sys: {
      type: "object" as const,
      properties: {
        id: { type: "string" },
        linkType: { type: "string" },
        type: { type: "string" },
      },
    },
  },
};
export const tagsMetadataSchema = {
  type: "object" as const,
  properties: {
    tags: { type: "array", items: linkSchema },
  },
};
export const draftSysProperties = {
  createdAt: { type: "string", format: "date-time" },
  createdBy: linkSchema,
  environment: linkSchema,
  id: { type: "string" },
  space: linkSchema,
  type: { type: "string" },
  updatedAt: { type: "string", format: "date-time" },
  updatedBy: linkSchema,
  version: { type: "number" },
};
export const publishSysProperties = {
  firstPublishedAt: { type: "string", format: "date-time" },
  publishedAt: { type: "string", format: "date-time" },
  publishedBy: linkSchema,
  publishedCounter: { type: "number" },
  publishedVersion: { type: "number" },
};
export const emptyResultSchema = {
  type: "object" as const,
  properties: {},
  additionalProperties: false,
};
