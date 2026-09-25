export const webhookSchema = {
  type: "object" as const,
  properties: {
    authentication: {
      type: "object",
      properties: {
        add_position: { type: "string" },
        data: { type: "object", additionalProperties: true },
        type: { type: "string" },
      },
    },
    created_at: { type: "string", format: "date-time" },
    created_by: { type: "string" },
    custom_headers: {
      type: "object",
      additionalProperties: { type: "string" },
    },
    endpoint: { type: "string" },
    http_method: { type: "string" },
    id: { type: "string" },
    name: { type: "string" },
    request_format: { type: "string" },
    status: { type: "string" },
    subscriptions: { type: "array", items: { type: "string" } },
    updated_at: { type: "string", format: "date-time" },
    updated_by: { type: "string" },
  },
};
export const createWebhookOutputSchema = {
  type: "object" as const,
  properties: { webhook: webhookSchema },
  required: ["webhook"],
};
export const deleteInstanceWebhooksOutputSchema = { type: "null" as const };
export const deleteWebhookOutputSchema = { type: "string" as const };
export const listWebhooksOutputSchema = {
  type: "array" as const,
  items: webhookSchema,
};
