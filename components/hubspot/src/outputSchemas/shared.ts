export const stringArrayMapSchema = {
  type: "object" as const,
  additionalProperties: {
    type: "array" as const,
    items: { type: "string" },
  },
};
export const batchErrorSchema = {
  type: "object" as const,
  properties: {
    category: { type: "string" },
    context: stringArrayMapSchema,
    errors: {
      type: "array" as const,
      items: {
        type: "object" as const,
        properties: {
          code: { type: "string" },
          context: stringArrayMapSchema,
          in: { type: "string" },
          message: { type: "string" },
          subCategory: { type: "string" },
        },
        required: ["message"],
      },
    },
    id: { type: "string" },
    links: {
      type: "object" as const,
      additionalProperties: { type: "string" },
    },
    message: { type: "string" },
    status: { type: "string" },
    subCategory: { type: "object" as const },
  },
  required: ["category", "context", "errors", "links", "message", "status"],
};
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
    associations: {
      type: "object" as const,
      additionalProperties: {
        type: "object" as const,
        properties: {
          results: {
            type: "array" as const,
            items: {
              type: "object" as const,
              properties: {
                id: { type: "string" },
                type: { type: "string" },
              },
              required: ["id", "type"],
            },
          },
          paging: {
            type: "object" as const,
            properties: {
              next: {
                type: "object" as const,
                properties: {
                  after: { type: "string" },
                  link: { type: "string" },
                },
                required: ["after"],
              },
              prev: {
                type: "object" as const,
                properties: {
                  before: { type: "string" },
                  link: { type: "string" },
                },
                required: ["before"],
              },
            },
          },
        },
        required: ["results"],
      },
    },
    createdAt: { type: "string", format: "date-time" },
    updatedAt: { type: "string", format: "date-time" },
    archived: { type: "boolean" },
    archivedAt: { type: ["string", "null"] as string[], format: "date-time" },
    objectWriteTraceId: { type: "string" },
    url: { type: "string" },
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
          required: ["after"],
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
      items: batchErrorSchema,
    },
    links: {
      type: ["object", "null"] as string[],
      additionalProperties: { type: "string" },
    },
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
            link: { type: "string" },
          },
          required: ["after"],
        },
        prev: {
          type: "object" as const,
          properties: {
            before: { type: "string" },
            link: { type: "string" },
          },
          required: ["before"],
        },
      },
    },
  },
  required: ["total", "results"],
};
