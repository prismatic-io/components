const webhookSubscriptionResource = {
  type: "object",
  properties: {
    uri: { type: "string" },
    callback_url: { type: "string" },
    created_at: { type: "string", format: "date-time" },
    updated_at: { type: "string", format: "date-time" },
    retry_started_at: {
      type: ["string", "null"],
      format: "date-time",
    },
    state: { type: "string" },
    events: {
      type: "array",
      items: { type: "string" },
    },
    scope: { type: "string" },
    organization: { type: "string" },
    user: { type: ["string", "null"] },
    creator: { type: ["string", "null"] },
  },
  required: [
    "uri",
    "callback_url",
    "created_at",
    "updated_at",
    "state",
    "events",
    "scope",
    "organization",
  ],
};
export const createWebhookSubscriptionOutputSchema = {
  type: "object",
  properties: {
    resource: webhookSubscriptionResource,
  },
  required: ["resource"],
};
export const getWebhookSubscriptionOutputSchema = {
  type: "object",
  properties: {
    resource: webhookSubscriptionResource,
  },
  required: ["resource"],
};
export const listWebhookSubscriptionOutputSchema = {
  type: "array",
  items: webhookSubscriptionResource,
};
export const deleteWebhookSubscriptionOutputSchema = {
  type: "object",
  properties: {},
};
export const deleteInstancedWebhooksOutputSchema = {
  type: "object",
  properties: {},
};
