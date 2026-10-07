import { linkSchema } from "./shared";
const bulkActionSchema = {
  type: "object" as const,
  properties: {
    action: { type: "string" },
    error: {
      type: ["object", "null"],
      properties: {
        sys: {
          type: "object" as const,
          properties: {
            id: { type: "string" },
            type: { type: "string" },
          },
        },
      },
    },
    payload: {
      type: "object" as const,
      properties: {
        entities: {
          type: "object" as const,
          properties: {
            items: {
              type: "array",
              items: {
                type: "object" as const,
                properties: {
                  sys: {
                    type: "object" as const,
                    properties: {
                      id: { type: "string" },
                      linkType: { type: "string" },
                      type: { type: "string" },
                      version: { type: "number" },
                    },
                  },
                },
              },
            },
            sys: {
              type: "object" as const,
              properties: {
                type: { type: "string" },
              },
            },
          },
        },
      },
    },
    sys: {
      type: "object" as const,
      properties: {
        createdAt: { type: "string", format: "date-time" },
        createdBy: linkSchema,
        environment: linkSchema,
        id: { type: "string" },
        space: linkSchema,
        status: { type: "string" },
        type: { type: "string" },
        updatedAt: { type: "string", format: "date-time" },
      },
    },
  },
};
export const getBulkActionOutputSchema = bulkActionSchema;
export const publishBulkActionOutputSchema = bulkActionSchema;
export const unpublishBulkActionOutputSchema = bulkActionSchema;
