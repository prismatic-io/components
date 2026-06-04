const webhookObject = {
  id: "c4d5e6f7-a8b9-0123-4567-89abcdef0123",
  name: "Prism - 4/2/2026 - WorkbookRefreshSucceeded",
  isEnabled: true,
  statusChangeReason: "",
  event: "WorkbookRefreshSucceeded",
  "webhook-destination": {
    "webhook-destination-http": {
      url: "https://hooks.example.com/tableau/webhook",
      method: "POST",
    },
  },
  owner: {
    id: "abc12e4e-5d6d-7c8c-9b0b-1a2a3f4f5e90",
    name: "jane.smith@example.com",
  },
};

export const listWebhooksExamplePayload = {
  data: {
    webhooks: {
      webhook: [webhookObject],
    },
  },
};

export const getWebhookExamplePayload = {
  data: {
    webhook: webhookObject,
  },
};

export const createWebhookExamplePayload = {
  data: {
    webhook: webhookObject,
  },
};

export const updateWebhookExamplePayload = {
  data: {
    webhook: webhookObject,
  },
};

export const deleteWebhookExamplePayload = {
  data: null,
};

export const testWebhookExamplePayload = {
  data: {
    webhookTestResult: {
      id: "c4d5e6f7-a8b9-0123-4567-89abcdef0123",
      statusCode: 200,
      body: "",
    },
  },
};
