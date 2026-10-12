const webhookRecord = {
  id: 1,
  company_id: 12882925,
  owner_id: 18487521,
  user_id: 18487521,
  event_action: "*",
  event_object: "*",
  subscription_url: "https://example.com/webhooks/pipedrive",
  is_active: 1,
  add_time: "2024-09-27 14:30:00",
  remove_time: null,
  type: "general",
  http_auth_user: null,
  http_auth_password: null,
  admin_id: 18487521,
  last_delivery_time: "2024-09-27 14:35:00",
  last_http_status: 200,
  version: "1.0",
};
export const createWebhookExamplePayload = {
  data: {
    status: "ok",
    success: true,
    data: webhookRecord,
  },
};
export const deleteWebhookExamplePayload = {
  data: {
    success: true,
    data: {
      id: 1,
    },
  },
};
export const listWebhooksExamplePayload = {
  data: {
    status: "ok",
    success: true,
    data: [webhookRecord],
  },
};
