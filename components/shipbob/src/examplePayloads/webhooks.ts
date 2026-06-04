










const webhookData = {
  id: 74219,
  topic: "order_shipped",
  subscription_url: "https://hooks.example.com/shipbob/order-shipped",
  created_at: "2024-06-10T09:15:00Z",
};

export const listWebhooksExamplePayload = {
  data: [webhookData],
};

export const createWebhookExamplePayload = {
  data: webhookData,
};

export const deleteWebhookExamplePayload = {
  data: null,
};

export const deleteAllWebhooksExamplePayload = {
  data: {
    subscriptionsRemoved: [74219, 74220],
  },
} as { data: Record<string, unknown> };
