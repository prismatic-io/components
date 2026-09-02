export const crmObjectSchema = {
  type: "object" as const,
  properties: {
    id: { type: "string" },
    properties: {
      type: "object" as const,
      additionalProperties: { type: ["string", "null"] as string[] },
    },
    propertiesWithHistory: {
      type: ["object", "null"] as string[],
      additionalProperties: {
        type: "array" as const,
        items: {
          type: "object" as const,
          properties: {
            sourceId: { type: "string" },
            sourceType: { type: "string" },
            sourceLabel: { type: "string" },
            updatedByUserId: { type: "number" },
            value: { type: "string" },
            timestamp: { type: "string", format: "date-time" },
          },
        },
      },
    },
    createdAt: { type: "string", format: "date-time" },
    updatedAt: { type: "string", format: "date-time" },
    archived: { type: "boolean" },
    archivedAt: { type: ["string", "null"] as string[], format: "date-time" },
  },
  required: ["id", "properties", "createdAt", "updatedAt", "archived"],
};
export const paginatedListSchema = {
  type: "object" as const,
  properties: {
    results: {
      type: "array" as const,
      items: crmObjectSchema,
    },
    paging: {
      type: ["object", "null"] as string[],
      properties: {
        next: {
          type: "object" as const,
          properties: {
            after: { type: "string" },
            link: { type: "string" },
          },
          required: ["after", "link"],
        },
      },
    },
  },
  required: ["results"],
};
export const crmObjectArraySchema = {
  type: "array" as const,
  items: crmObjectSchema,
};
export const batchResponseSchema = {
  type: "object" as const,
  properties: {
    status: {
      type: "string",
      enum: ["CANCELED", "COMPLETE", "PENDING", "PROCESSING"],
    },
    results: {
      type: "array" as const,
      items: crmObjectSchema,
    },
    requestedAt: { type: ["string", "null"] as string[], format: "date-time" },
    startedAt: { type: "string", format: "date-time" },
    completedAt: { type: "string", format: "date-time" },
    numErrors: { type: ["integer", "null"] as string[] },
    errors: {
      type: ["array", "null"] as string[],
      items: {
        type: "object" as const,
        properties: {
          status: { type: "string" },
          category: { type: "string" },
          message: { type: "string" },
          context: { type: "object" as const },
        },
      },
    },
    links: { type: ["object", "null"] as string[] },
  },
  required: ["status", "results", "startedAt", "completedAt"],
};
export const batchArchiveResponseSchema = {
  type: "object" as const,
  properties: {
    status: {
      type: "string",
      enum: ["CANCELED", "COMPLETE", "PENDING", "PROCESSING"],
    },
    results: { type: "array" as const, items: { type: "object" as const } },
    requestedAt: { type: ["string", "null"] as string[], format: "date-time" },
    startedAt: { type: "string", format: "date-time" },
    completedAt: { type: "string", format: "date-time" },
    numErrors: { type: ["integer", "null"] as string[] },
    errors: { type: ["array", "null"] as string[] },
    links: { type: ["object", "null"] as string[] },
  },
  required: ["status", "results", "startedAt", "completedAt"],
};
export const searchResponseSchema = {
  type: "object" as const,
  properties: {
    total: { type: "integer" },
    results: {
      type: "array" as const,
      items: crmObjectSchema,
    },
    paging: {
      type: ["object", "null"] as string[],
      properties: {
        next: {
          type: "object" as const,
          properties: {
            after: { type: "string" },
          },
          required: ["after"],
        },
      },
    },
  },
  required: ["total", "results"],
};
