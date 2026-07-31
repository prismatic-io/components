export const eventWebhookBaseProperties = {
  enabled: { type: "boolean" },
  url: { type: "string" },
  account_status_change: { type: "boolean" },
  group_resubscribe: { type: "boolean" },
  delivered: { type: "boolean" },
  group_unsubscribe: { type: "boolean" },
  spam_report: { type: "boolean" },
  bounce: { type: "boolean" },
  deferred: { type: "boolean" },
  unsubscribe: { type: "boolean" },
  processed: { type: "boolean" },
  open: { type: "boolean" },
  click: { type: "boolean" },
  dropped: { type: "boolean" },
  friendly_name: { type: ["string", "null"] },
  id: { type: "string" },
  oauth_client_id: { type: ["string", "null"] },
  oauth_token_url: { type: ["string", "null"] },
};
export const createWebhookOutputSchema = {
  type: "object" as const,
  properties: {
    ...eventWebhookBaseProperties,
    created_date: { type: ["string", "null"], format: "date-time" },
    updated_date: { type: "string", format: "date-time" },
  },
};
export const updateWebhookOutputSchema = createWebhookOutputSchema;
export const getWebhookOutputSchema = {
  type: "object" as const,
  properties: {
    ...eventWebhookBaseProperties,
    public_key: { type: "string" },
  },
};
export const listWebhooksOutputSchema = {
  type: "object" as const,
  properties: {
    max_allowed: { type: "number" },
    webhooks: {
      type: "array",
      items: {
        type: "object" as const,
        properties: {
          ...eventWebhookBaseProperties,
          created_date: { type: ["string", "null"], format: "date-time" },
          updated_date: { type: "string", format: "date-time" },
          public_key: { type: "string" },
        },
      },
    },
  },
};
export const toggleSignatureVerificationOutputSchema = {
  type: "object" as const,
  properties: {
    id: { type: "string" },
    public_key: { type: "string" },
  },
};
export const testWebhookOutputSchema = {
  type: "object" as const,
  properties: {
    success: { type: "boolean" },
    message: { type: "string" },
  },
  required: ["success", "message"],
};
export const deleteWebhookOutputSchema = {
  type: "object" as const,
  properties: {
    success: { type: "boolean" },
    message: { type: "string" },
  },
  required: ["success", "message"],
};
