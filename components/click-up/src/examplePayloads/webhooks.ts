













const webhookObject = {
  id: "4b67ac88-e506-4a29-9d42-26e504e3435e",
  userid: 81942673,
  team_id: 9012345,
  endpoint: "https://hooks.example.com/clickup/events",
  client_id: "ABCDEF1234567890ABCDEF",
  events: ["taskCreated", "taskUpdated", "taskDeleted"],
  task_id: null,
  list_id: null,
  folder_id: null,
  space_id: 790,
  health: {
    status: "active",
    fail_count: 0,
  },
  secret: "7x1PK3mISQG0jBqeNYuhWn8alZdRtf5E",
};

export const createWebhookExamplePayload = {
  data: {
    id: "4b67ac88-e506-4a29-9d42-26e504e3435e",
    webhook: webhookObject,
  },
};

export const getWebhooksExamplePayload = {
  data: {
    webhooks: [webhookObject],
  },
};

export const updateWebhookExamplePayload = {
  data: {
    id: "4b67ac88-e506-4a29-9d42-26e504e3435e",
    webhook: webhookObject,
  },
};

export const deleteWebhookExamplePayload = {
  data: null,
};
