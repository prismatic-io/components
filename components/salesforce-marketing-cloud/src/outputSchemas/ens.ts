export const createCallbackOutputSchema = {
  type: "array" as const,
  items: {
    type: "object",
    properties: {
      callbackName: { type: "string" },
      callbackId: { type: "string" },
      url: { type: "string" },
      signatureKey: { type: "string" },
      maxBatchSize: { type: "integer" },
    },
    additionalProperties: true,
  },
};
export const listCallbacksOutputSchema = {
  type: "array" as const,
  items: {
    type: "object",
    properties: {
      callbackId: { type: "string" },
      callbackName: { type: "string" },
      url: { type: "string" },
      maxBatchSize: { type: "number" },
      status: { type: "string" },
      statusReason: { type: "string" },
    },
    additionalProperties: true,
  },
};
export const updateCallbackOutputSchema = {
  type: "array" as const,
  items: {
    type: "object",
    properties: {
      callbackId: { type: "string" },
      callbackName: { type: "string" },
      url: { type: "string" },
      maxBatchSize: { type: "integer" },
    },
    additionalProperties: true,
  },
};
export const createSubscriptionOutputSchema = {
  type: "array" as const,
  items: {
    type: "object",
    properties: {
      callbackId: { type: "string" },
      callbackName: { type: "string" },
      subscriptionName: { type: "string" },
      eventCategoryTypes: { type: "array", items: { type: "string" } },
      subscriptionId: { type: "string" },
      filters: { type: "array", items: { type: "string" } },
      status: { type: "string" },
    },
    additionalProperties: true,
  },
};
export const getSubscriptionOutputSchema = {
  type: "object" as const,
  properties: {
    callbackId: { type: "string" },
    callbackName: { type: "string" },
    url: { type: "string" },
    maxBatchSize: { type: "number" },
    subscriptionName: { type: "string" },
    eventCategoryTypes: { type: "array", items: { type: "string" } },
    subscriptionId: { type: "string" },
    filters: { type: "array", items: { type: "string" } },
    status: { type: "string" },
    statusReason: { type: "string" },
  },
  additionalProperties: true,
};
export const updateSubscriptionOutputSchema = {
  type: "array" as const,
  items: {
    type: "object",
    properties: {
      callbackId: { type: "string" },
      callbackName: { type: "string" },
      url: { type: "string" },
      maxBatchSize: { type: "number" },
      status: { type: "string" },
      statusReason: { type: "string" },
      subscriptionName: { type: "string" },
      eventCategoryTypes: { type: "array", items: { type: "string" } },
      subscriptionId: { type: "string" },
      filters: { type: "array", items: { type: "string" } },
    },
    additionalProperties: true,
  },
};
