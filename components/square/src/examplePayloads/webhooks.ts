










export const listWebhookSubscriptionsExamplePayload = {
  data: {
    subscriptions: [
      {
        id: "wbhk_b35f6b3145074cf9ad513610786c19d5",
        name: "Example Webhook Subscription",
        enabled: true,
        event_types: ["payment.created", "payment.updated"],
        notification_url: "https://example.com/webhook",
        api_version: "2023-05-17",
        created_at: "2023-05-15T10:00:00.000Z",
        updated_at: "2023-05-15T10:00:00.000Z",
      },
    ],
    cursor: "MTY1Njk2OTU5NjEzMjAwMDAwMA==",
  },
};






export const retrieveWebhookSubscriptionExamplePayload = {
  data: {
    subscription: {
      id: "wbhk_b35f6b3145074cf9ad513610786c19d5",
      name: "Example Webhook Subscription",
      enabled: true,
      event_types: ["payment.created", "payment.updated", "refund.created", "refund.updated"],
      notification_url: "https://example.com/webhook",
      api_version: "2023-05-17",
      signature_key: "1k9bIJKhi0QQ...",
      created_at: "2023-05-15T10:00:00.000Z",
      updated_at: "2023-05-15T10:00:00.000Z",
    },
  },
};






export const createWebhookSubscriptionExamplePayload = {
  data: {
    subscription: {
      id: "wbhk_c46g7c4256185dg0be624721897d20e6",
      name: "New Webhook Subscription",
      enabled: true,
      event_types: ["order.created", "order.updated"],
      notification_url: "https://example.com/webhook/orders",
      api_version: "2023-05-17",
      signature_key: "2m0cJLLji1RR...",
      created_at: "2023-05-16T14:00:00.000Z",
      updated_at: "2023-05-16T14:00:00.000Z",
    },
  },
};






export const updateWebhookSubscriptionExamplePayload = {
  data: {
    subscription: {
      id: "wbhk_b35f6b3145074cf9ad513610786c19d5",
      name: "Updated Webhook Subscription",
      enabled: true,
      event_types: ["payment.created", "payment.updated", "order.created"],
      notification_url: "https://example.com/webhook/updated",
      api_version: "2023-05-17",
      signature_key: "1k9bIJKhi0QQ...",
      created_at: "2023-05-15T10:00:00.000Z",
      updated_at: "2023-05-17T09:00:00.000Z",
    },
  },
};







export const deleteWebhookSubscriptionExamplePayload = {
  data: {},
};






export const deleteInstanceWebhooksExamplePayload = {
  data: "All webhooks deleted",
};
