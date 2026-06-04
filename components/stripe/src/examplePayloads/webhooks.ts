export const getWebhookExamplePayload = {
  data: {
    id: "we_1Mr5jULkdIwHu7ix1ibLTM0x",
    object: "webhook_endpoint",
    api_version: null,
    application: null,
    created: 1680122196,
    description: null,
    enabled_events: ["charge.succeeded", "charge.failed"],
    livemode: false,
    metadata: {},
    status: "enabled",
    url: "https://example.com/my/webhook/endpoint",
  },
};

export const deleteWebhookExamplePayload = {
  data: {
    id: "we_1Mr5jULkdIwHu7ix1ibLTM0x",
    object: "webhook_endpoint",
    deleted: true,
  },
};

export const deleteWebhooksExamplePayload = {
  data: [
    {
      id: "we_1R4SQ1PReauCNCFGKkIBX5LR",
      object: "webhook_endpoint",
      deleted: true,
    },
    {
      id: "we_1R4SPzPReauCNCFGhGcd9yT2",
      object: "webhook_endpoint",
      deleted: true,
    },
    {
      id: "we_1R4NtSPReauCNCFGJPT9mffI",
      object: "webhook_endpoint",
      deleted: true,
    },
  ],
};

export const listWebhooksExamplePayload = {
  data: {
    data: [getWebhookExamplePayload.data],
    has_more: false,
    url: "/v1/webhook_endpoints",
    object: "list",
  },
};
