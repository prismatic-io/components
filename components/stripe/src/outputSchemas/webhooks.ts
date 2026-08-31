export const webhookEndpointOutputSchema = {
  type: "object" as const,
  properties: {
    api_version: {
      type: ["string", "null"],
    },
    application: {
      type: ["string", "null"],
    },
    created: {
      type: "integer",
      format: "unix-time",
    },
    description: {
      type: ["string", "null"],
    },
    enabled_events: {
      type: "array",
      items: {
        type: "string",
      },
    },
    id: {
      type: "string",
    },
    livemode: {
      type: "boolean",
    },
    metadata: {
      type: "object" as const,
      additionalProperties: {
        type: "string",
      },
    },
    object: {
      type: "string",
      enum: ["webhook_endpoint"],
    },
    secret: {
      type: "string",
    },
    status: {
      type: "string",
    },
    url: {
      type: "string",
    },
  },
  required: [
    "created",
    "enabled_events",
    "id",
    "livemode",
    "metadata",
    "object",
    "status",
    "url",
  ],
};
export const listWebhooksOutputSchema = {
  type: "object" as const,
  properties: {
    object: { type: "string", enum: ["list"] },
    data: { type: "array", items: webhookEndpointOutputSchema },
    has_more: { type: "boolean" },
    url: { type: "string" },
  },
  required: ["object", "data", "has_more", "url"],
};
export const deletedWebhookEndpointOutputSchema = {
  type: "object" as const,
  properties: {
    deleted: {
      type: "boolean",
      enum: [true],
    },
    id: {
      type: "string",
    },
    object: {
      type: "string",
      enum: ["webhook_endpoint"],
    },
  },
  required: ["deleted", "id", "object"],
};
export const deleteWebhooksOutputSchema = {
  type: "array",
  items: {
    type: "object" as const,
    properties: {
      deleted: {
        type: "boolean",
        enum: [true],
      },
      id: {
        type: "string",
      },
      object: {
        type: "string",
        enum: ["webhook_endpoint"],
      },
    },
    required: ["deleted", "id", "object"],
  },
};
