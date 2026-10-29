const webhookRecordSchema = {
  type: "object",
  properties: {
    id: { type: "integer" },
    company_id: { type: "integer" },
    owner_id: { type: "integer" },
    user_id: { type: "integer" },
    event_action: { type: "string" },
    event_object: { type: "string" },
    subscription_url: { type: "string" },
    is_active: { type: "integer" },
    add_time: { type: "string" },
    remove_time: { type: "string" },
    type: { type: "string" },
    http_auth_user: { type: "string" },
    http_auth_password: { type: "string" },
    admin_id: { type: "integer" },
    last_delivery_time: { type: "string" },
    last_http_status: { type: "integer" },
    version: { type: "string" },
  },
};

export const createWebhookOutputSchema = {
  type: "object",
  properties: {
    data: {
      type: "object",
      properties: {
        status: { type: "string" },
        success: { type: "boolean" },
        data: webhookRecordSchema,
      },
    },
  },
};

export const deleteWebhookOutputSchema = {
  type: "object",
  properties: {
    data: {
      type: "object",
      properties: {
        success: { type: "boolean" },
        data: {
          type: "object",
          properties: {
            id: { type: "integer" },
          },
        },
      },
    },
  },
};

export const listWebhooksOutputSchema = {
  type: "object",
  properties: {
    data: {
      type: "object",
      properties: {
        status: { type: "string" },
        success: { type: "boolean" },
        data: { type: "array", items: webhookRecordSchema },
      },
    },
  },
};
