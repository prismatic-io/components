export const triggerSchema = {
  type: "object" as const,
  properties: {
    actions: {
      type: "array",
      items: {
        type: "object",
        properties: {
          field: { type: "string" },
          value: {
            type: ["string", "integer", "array"],
            items: { type: ["string", "integer"] },
          },
        },
      },
    },
    active: { type: "boolean" },
    all: {
      type: "array",
      items: {
        type: "object",
        properties: {
          field: { type: "string" },
          operator: { type: "string" },
          value: {
            type: ["string", "integer", "array", "null"],
            items: { type: ["string", "integer"] },
          },
        },
      },
    },
    any: {
      type: "array",
      items: {
        type: "object",
        properties: {
          field: { type: "string" },
          operator: { type: "string" },
          value: {
            type: ["string", "integer", "array", "null"],
            items: { type: ["string", "integer"] },
          },
        },
      },
    },
    brand_id: { type: "integer", format: "int64" },
    category: {
      type: "object",
      properties: { name: { type: "string" }, position: { type: "integer" } },
    },
    category_id: { type: ["string", "null"] },
    conditions: {
      type: "object",
      properties: {
        all: {
          type: ["array", "null"],
          items: {
            type: "object",
            properties: {
              field: { type: "string" },
              operator: { type: "string" },
              value: {
                type: ["string", "integer", "array", "null"],
                items: { type: ["string", "integer"] },
              },
            },
          },
        },
        any: {
          type: ["array", "null"],
          items: {
            type: "object",
            properties: {
              field: { type: "string" },
              operator: { type: "string" },
              value: {
                type: ["string", "integer", "array", "null"],
                items: { type: ["string", "integer"] },
              },
            },
          },
        },
      },
    },
    created_at: { type: "string" },
    default: { type: "boolean" },
    description: { type: ["string", "null"] },
    id: { type: "integer", format: "int64" },
    position: { type: "integer" },
    raw_title: { type: "string" },
    restriction: { type: ["object", "null"], additionalProperties: true },
    title: { type: "string" },
    updated_at: { type: "string" },
    url: { type: "string" },
  },
  required: ["actions", "title"],
};
export const createWebhookTriggerOutputSchema = {
  type: "object" as const,
  properties: { trigger: triggerSchema },
  required: ["trigger"],
};
export const listTriggersOutputSchema = {
  type: "array" as const,
  items: triggerSchema,
};
