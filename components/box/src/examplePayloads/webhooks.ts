export const listWebhooksExamplePayload = {
  data: {
    next_marker: "ZmlQZS0xLTE%3D",
    entries: [
      {
        id: "1234",
        type: "webhook",
        target: { id: "22222", type: "folder" },
      },
      { id: "5678", type: "webhook", target: { id: "11111", type: "file" } },
    ],
    limit: 2,
  },
};
export const createWebhookExamplePayload = {
  data: {
    id: "1234",
    type: "webhook",
    target: { id: "22222", type: "folder" },
    created_by: {
      type: "user",
      id: "33333",
      name: "Example User",
      login: "user@example.com",
    },
    created_at: "2016-05-09T17:41:27-07:00",
    address: "https://example.com/webhook",
    triggers: ["FILE.DOWNLOADED", "FILE.UPLOADED"],
  },
  crossFlowState: { primarySignatureKey: "3T2eTfOvJbAIRoBpXsXPmq0gn8CmF5Q7" },
};
export const deleteWebhookExamplePayload = { data: null };
export const deleteInstanceWebhooksExamplePayload = {
  data: {},
};
