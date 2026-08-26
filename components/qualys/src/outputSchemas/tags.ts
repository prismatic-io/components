export const listTagsOutputSchema = {
  type: "object" as const,
  properties: {
    ServiceResponse: {
      type: "object",
      properties: {
        responseCode: { type: "string" },
        count: { type: "number" },
        data: {
          type: "array",
          items: {
            type: "object",
            properties: {
              Tag: {
                type: "object",
                properties: {
                  id: { type: "number" },
                  name: { type: "string" },
                  color: { type: "string" },
                  criticalityScore: { type: "number" },
                  ruleType: { type: "string" },
                  ruleText: { type: "string" },
                  parentTagId: { type: "number" },
                },
              },
            },
          },
        },
      },
    },
  },
};
const qpsSingleTagResponseSchema = {
  type: "object" as const,
  properties: {
    ServiceResponse: {
      type: "object",
      properties: {
        responseCode: { type: "string" },
        count: { type: "string" },
        data: {
          type: "object",
          properties: {
            Tag: {
              type: "object",
              properties: {
                id: { type: "string" },
                name: { type: "string" },
                tagUuid: { type: "string" },
                parentTagUuid: { type: "string" },
                parentTagId: { type: "string" },
                created: { type: "string" },
                modified: { type: "string" },
                color: { type: "string" },
                ruleType: { type: "string" },
                ruleText: { type: "string" },
                criticalityScore: { type: "string" },
                isSubUserScopedTag: { type: "string" },
              },
            },
          },
        },
      },
    },
  },
};
export const createTagOutputSchema = qpsSingleTagResponseSchema;
export const updateTagOutputSchema = {
  type: "object" as const,
  properties: {
    ServiceResponse: {
      type: "object",
      properties: {
        responseCode: { type: "string" },
        count: { type: "string" },
        data: {
          type: "object",
          properties: {
            Tag: {
              type: "object",
              properties: {
                id: { type: "string" },
              },
            },
          },
        },
      },
    },
  },
};
