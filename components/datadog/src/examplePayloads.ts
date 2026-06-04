





import type { WebhooksIntegration } from "./types";

export const submitMetricsExample = {
  data: {
    errors: [],
  },
};

export const listMetricsExample = {
  data: {
    metrics: [
      "system.cpu.idle",
      "system.cpu.user",
      "system.disk.free",
      "system.load.1",
      "system.mem.free",
    ],
    from: "1636629071",
  },
};

export const searchMetricsExample = {
  data: {
    results: {
      metrics: [
        "system.cpu.idle",
        "system.cpu.iowait",
        "system.cpu.system",
        "system.cpu.user",
      ],
    },
  },
};

export const webhookExample: { data: WebhooksIntegration } = {
  data: {
    name: "WEBHOOK_NAME",
    url: "https://example.com/webhook",
    custom_headers: null,
    encode_as: "json",
    payload: null,
  },
};

export const deleteWebhookExample = {
  data: null,
};

export const webhookTriggerPayloadExample = {
  payload: {
    body: {
      data: {
        ALERT_ID: "12345678",
        ALERT_METRIC: "system.load.1",
        ALERT_QUERY: "avg(last_5m):avg:system.load.1{host:my-host} > 5",
        ALERT_SCOPE: "host:my-host",
        ALERT_STATUS: "Triggered",
        ALERT_TITLE: "CPU load is high on my-host",
        ALERT_TRANSITION: "Triggered",
        ALERT_TYPE: "metric alert",
        DATE: "2024-01-15 10:30:00 UTC",
        EVENT_MSG: "CPU load exceeded threshold",
        HOSTNAME: "my-host",
        ID: "12345678",
        LAST_UPDATED: "2024-01-15 10:30:00 UTC",
        LINK: "https://app.datadoghq.com/monitors/12345678",
        ORG_ID: "123456",
        ORG_NAME: "My Organization",
        TAGS: "environment:production,region:us-east-1",
      },
    },
  },
};
