const restWebhookSchema = {
  type: "object" as const,
  properties: {
    id: { type: "number" as const },
    address: { type: "string" as const },
    topic: { type: "string" as const },
    created_at: { type: "string" as const },
    updated_at: { type: "string" as const },
    format: { type: "string" as const },
    fields: { type: "array" as const, items: { type: "string" as const } },
    metafield_namespaces: {
      type: "array" as const,
      items: { type: "string" as const },
    },
    api_version: { type: "string" as const },
    private_metafield_namespaces: {
      type: "array" as const,
      items: { type: "string" as const },
    },
  },
};
export const createWebhookOutputSchema = {
  type: "object" as const,
  properties: {
    webhook: restWebhookSchema,
  },
};
export const listWebhooksOutputSchema = {
  type: "array" as const,
  items: restWebhookSchema,
};
export const deleteWebhookOutputSchema = {
  type: "object" as const,
  properties: {},
};
export const deleteInstanceWebhooksOutputSchema = {
  type: "object" as const,
  properties: {},
};
export const listWebhooksGqlOutputSchema = {
  type: "array" as const,
  items: restWebhookSchema,
};
export const createWebhookGqlOutputSchema = createWebhookOutputSchema;
export const deleteWebhookGqlOutputSchema = deleteWebhookOutputSchema;
export const deleteInstanceWebhooksGqlOutputSchema =
  deleteInstanceWebhooksOutputSchema;
