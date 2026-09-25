import { webhookFilterSchema } from "./shared";
export const webhookResponseSchema = {
  type: "object" as const,
  properties: {
    data: {
      type: "object" as const,
      properties: {
        gid: { type: "string" },
        resource_type: { type: "string" },
        active: { type: "boolean" },
        resource: {
          type: "object" as const,
          properties: {
            gid: { type: "string" },
            resource_type: { type: "string" },
            name: { type: ["string", "null"] },
          },
          additionalProperties: true,
        },
        target: { type: "string" },
        created_at: { type: ["string", "null"], format: "date-time" },
        last_failure_at: {
          type: ["string", "null"],
          format: "date-time",
        },
        last_failure_content: { type: ["string", "null"] },
        last_success_at: {
          type: ["string", "null"],
          format: "date-time",
        },
        delivery_retry_count: { type: "integer" },
        next_attempt_after: {
          type: ["string", "null"],
          format: "date-time",
        },
        failure_deletion_timestamp: {
          type: ["string", "null"],
          format: "date-time",
        },
        filters: {
          type: ["array", "null"],
          items: webhookFilterSchema,
        },
      },
      required: [] as string[],
      additionalProperties: true,
    },
  },
  required: [] as string[],
  additionalProperties: true,
};
export const listWebhooksOutputSchema = {
  type: "array" as const,
  items: {
    type: "object" as const,
    properties: {
      gid: { type: "string" },
      resource_type: { type: "string" },
      active: { type: "boolean" },
      resource: {
        type: "object" as const,
        properties: {
          gid: { type: "string" },
          resource_type: { type: "string" },
          name: { type: ["string", "null"] },
        },
        additionalProperties: true,
      },
      target: { type: "string" },
      created_at: { type: ["string", "null"], format: "date-time" },
      last_failure_at: {
        type: ["string", "null"],
        format: "date-time",
      },
      last_failure_content: { type: ["string", "null"] },
      last_success_at: {
        type: ["string", "null"],
        format: "date-time",
      },
      delivery_retry_count: { type: "integer" },
      next_attempt_after: {
        type: ["string", "null"],
        format: "date-time",
      },
      failure_deletion_timestamp: {
        type: ["string", "null"],
        format: "date-time",
      },
      filters: {
        type: ["array", "null"],
        items: webhookFilterSchema,
      },
    },
    additionalProperties: true,
  },
};
