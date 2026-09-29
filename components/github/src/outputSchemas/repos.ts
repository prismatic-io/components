import { simpleUserSchema } from "./common";
export const webhookOutputSchema = {
  type: "object" as const,
  properties: {
    type: { type: "string" },
    id: { type: "integer" },
    name: { type: "string" },
    active: { type: "boolean" },
    events: {
      type: "array" as const,
      items: { type: "string" },
    },
    config: {
      type: "object" as const,
      properties: {
        url: { type: "string", format: "uri" },
        content_type: { type: "string" },
        secret: { type: "string" },
        insecure_ssl: { type: ["string", "number"] },
      },
    },
    updated_at: { type: "string", format: "date-time" },
    created_at: { type: "string", format: "date-time" },
    url: { type: "string", format: "uri" },
    test_url: { type: "string", format: "uri" },
    ping_url: { type: "string", format: "uri" },
    deliveries_url: { type: "string", format: "uri" },
    last_response: {
      type: "object" as const,
      properties: {
        code: { type: ["integer", "null"] },
        status: { type: ["string", "null"] },
        message: { type: ["string", "null"] },
      },
    },
  },
  required: [
    "type",
    "id",
    "name",
    "active",
    "events",
    "config",
    "updated_at",
    "created_at",
    "url",
    "test_url",
    "ping_url",
    "last_response",
  ],
};
export const reposCreateWebhookOutputSchema = webhookOutputSchema;
export const reposListWebhooksOutputSchema = {
  type: "array" as const,
  items: webhookOutputSchema,
};
export const reposListForOrgOutputSchema = {
  type: "array" as const,
  items: {
    type: "object" as const,
    properties: {
      id: { type: "integer" },
      node_id: { type: "string" },
      name: { type: "string" },
      full_name: { type: "string" },
      private: { type: "boolean" },
      owner: simpleUserSchema,
      html_url: { type: "string", format: "uri" },
      description: { type: ["string", "null"] },
      fork: { type: "boolean" },
      url: { type: "string", format: "uri" },
      created_at: { type: ["string", "null"], format: "date-time" },
      updated_at: { type: ["string", "null"], format: "date-time" },
      pushed_at: { type: ["string", "null"], format: "date-time" },
      default_branch: { type: "string" },
    },
    required: [
      "id",
      "node_id",
      "name",
      "full_name",
      "private",
      "owner",
      "html_url",
      "fork",
      "url",
    ],
  },
};
