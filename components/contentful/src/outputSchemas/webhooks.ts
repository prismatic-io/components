import { emptyResultSchema, linkSchema } from "./shared";
const webhookSchema = {
  type: "object" as const,
  properties: {
    active: { type: "boolean" },
    filters: { type: "array" },
    headers: {
      type: "array",
      items: {
        type: "object" as const,
        properties: {
          key: { type: "string" },
          value: { type: "string" },
        },
      },
    },
    httpBasicUsername: { type: "string" },
    name: { type: "string" },
    sys: {
      type: "object" as const,
      properties: {
        createdAt: { type: "string", format: "date-time" },
        createdBy: linkSchema,
        id: { type: "string" },
        space: linkSchema,
        type: { type: "string" },
        updatedAt: { type: "string", format: "date-time" },
        updatedBy: linkSchema,
        version: { type: "number" },
      },
    },
    topics: { type: "array", items: { type: "string" } },
    url: { type: "string" },
  },
};
export const createWebhookOutputSchema = webhookSchema;
export const getWebhookOutputSchema = webhookSchema;
export const updateWebhookOutputSchema = webhookSchema;
export const listWebhooksOutputSchema = {
  type: "array" as const,
  items: webhookSchema,
};
export const deleteWebhookOutputSchema = emptyResultSchema;
export const deleteInstancedWebhooksOutputSchema = {
  type: "object" as const,
  properties: {
    webhooksDeleted: { type: "number" },
  },
  required: ["webhooksDeleted"],
};
