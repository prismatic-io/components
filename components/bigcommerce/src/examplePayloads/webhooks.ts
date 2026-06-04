










const webhookObject = {
  id: 18048287,
  client_id: "m9r6keqmo7h7f23btnpwernbez1kglkl",
  store_hash: "sftg45fsd",
  scope: "store/order/*",
  destination: "https://665b65a6.ngrok.io/webhooks",
  headers: {
    "custom-key": "developer-defined value",
  },
  is_active: true,
  created_at: 1561488106,
  updated_at: 1561488106,
};

const paginationMeta = {
  pagination: {
    count: 5,
    current_page: 1,
    per_page: 100,
    total: 5,
    total_pages: 1,
  },
};

export const getWebhooksExamplePayload = {
  data: {
    data: [webhookObject],
    meta: paginationMeta,
  },
};

export const createWebhookExamplePayload = {
  data: {
    data: webhookObject,
    meta: {},
  },
};

export const updateWebhookExamplePayload = {
  data: {
    data: webhookObject,
    meta: {},
  },
};

export const deleteWebhookExamplePayload = {
  data: webhookObject,
};

export const deleteInstancedWebhooksExamplePayload = {
  data: {
    message: "3 webhooks deleted.",
  },
};
