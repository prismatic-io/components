const createWebhookRaw = {
  webhook: {
    id: "01GK8E6BKWMJZD2T8Y5AXJQMG5",
    name: "Test from Acme",
    status: "active",
    subscriptions: ["conditional_ticket_events"],
    created_at: "2022-12-02T03:31:00Z",
    created_by: "7272236579355",
    endpoint: "https://hooks.example.com/trigger/EXAMPLE",
    http_method: "POST",
    request_format: "json",
  },
};
const listWebhooksRaw = [createWebhookRaw.webhook];
const deleteWebhookRaw = "";
const deleteInstanceWebhooksRaw = null;
export const createWebhookExamplePayload = { data: createWebhookRaw };
export const deleteInstanceWebhooksExamplePayload = {
  data: deleteInstanceWebhooksRaw,
};
export const deleteWebhookExamplePayload = { data: deleteWebhookRaw };
export const listWebhooksExamplePayload = { data: listWebhooksRaw as unknown };
