import { responseHeadersSchema } from "./shared";

export const webhookSubscriptionSchema = {
  type: "object" as const,
  properties: {
    uuid: { type: "string" },
    url: { type: "string" },
    status: { type: "string" },
    subscription_types: { type: "array", items: { type: "string" } },
  },
  required: ["uuid"],
};

export const webhookEventSchema = {
  type: "object" as const,
  properties: {
    uuid: { type: "string" },
    event_type: { type: "string" },
    resource_type: { type: "string" },
    resource_uuid: { type: "string" },
    entity_type: { type: "string" },
    entity_uuid: { type: "string" },
    timestamp: { type: "number" },
  },
  required: ["uuid"],
};

export const listWebhookSubscriptionsOutputSchema = {
  type: "object" as const,
  properties: {
    data: { type: "array", items: webhookSubscriptionSchema },
    headers: responseHeadersSchema,
  },
  required: ["data"],
};

export const getWebhookSubscriptionOutputSchema = {
  type: "object" as const,
  properties: {
    data: webhookSubscriptionSchema,
    headers: responseHeadersSchema,
  },
  required: ["data"],
};

export const createWebhookSubscriptionOutputSchema = {
  type: "object" as const,
  properties: {
    data: webhookSubscriptionSchema,
    headers: responseHeadersSchema,
  },
  required: ["data"],
};

export const updateWebhookSubscriptionOutputSchema = {
  type: "object" as const,
  properties: {
    data: webhookSubscriptionSchema,
    headers: responseHeadersSchema,
  },
  required: ["data"],
};

export const deleteWebhookSubscriptionOutputSchema = {
  type: "object" as const,
  properties: {
    message: { type: "string" },
  },
  required: ["message"],
};

export const getWebhookEventsOutputSchema = {
  type: "object" as const,
  properties: {
    data: { type: "array", items: webhookEventSchema },
    headers: responseHeadersSchema,
  },
  required: ["data"],
};
