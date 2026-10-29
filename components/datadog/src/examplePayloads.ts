import type { Element, TriggerPayload } from "@prismatic-io/spectral";
import type { WebhooksIntegration } from "./types";

export const submitMetricsExamplePayload = {
  data: {
    errors: [],
  },
};

export const submitSingleMetricExamplePayload = submitMetricsExamplePayload;

export const listMetricsExamplePayload = {
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

export const searchMetricsExamplePayload = {
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

export const getWebhookExamplePayload: { data: WebhooksIntegration } = {
  data: {
    name: "datadog-alert-webhook",
    url: "https://example.com/webhook",
    custom_headers: null,
    encode_as: "json",
    payload: null,
  },
};

export const createWebhookExamplePayload = getWebhookExamplePayload;

export const updateWebhookExamplePayload = getWebhookExamplePayload;

export const deleteWebhookExamplePayload = {
  data: null,
};

export const selectMetricExamplePayload: { result: Element[] } = {
  result: [
    { label: "system.cpu.idle", key: "system.cpu.idle" },
    { label: "system.cpu.user", key: "system.cpu.user" },
    { label: "system.disk.free", key: "system.disk.free" },
    { label: "system.load.1", key: "system.load.1" },
  ],
};

export const webhookExamplePayload: { payload: TriggerPayload } = {
  payload: {
    headers: { "Content-Type": "application/json" },
    queryParameters: {},
    rawBody: {
      data: '{"ALERT_ID":"12345678","ALERT_METRIC":"system.load.1","ALERT_QUERY":"avg(last_5m):avg:system.load.1{host:my-host} > 5","ALERT_SCOPE":"host:my-host","ALERT_STATUS":"Triggered","ALERT_TITLE":"CPU load is high on my-host","ALERT_TRANSITION":"Triggered","ALERT_TYPE":"metric alert","DATE":"2024-01-15 10:30:00 UTC","EVENT_MSG":"CPU load exceeded threshold","HOSTNAME":"my-host","ID":"12345678","LAST_UPDATED":"2024-01-15 10:30:00 UTC","LINK":"https://app.datadoghq.com/monitors/12345678","ORG_ID":"123456","ORG_NAME":"My Organization","TAGS":"environment:production,region:us-east-1"}',
      contentType: "application/json",
    },
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
      contentType: "application/json",
    },
    pathFragment: "",
    webhookUrls: {},
    webhookApiKeys: {},
    invokeUrl: "",
    executionId: "RXhhbXBsZUV4ZWN1dGlvblJlc3VsdElk",
    customer: {
      id: "testCustomerId",
      name: "Test Customer",
      externalId: "testExternalId",
    },
    instance: { id: "testInstanceId", name: "Test Instance" },
    user: {
      id: "testUserId",
      email: "user@example.com",
      name: "Test User",
      externalId: "testUserExternalId",
    },
    integration: {
      id: "testIntegrationId",
      name: "Test Integration",
      versionSequenceId: "1",
      externalVersion: "",
    },
    flow: { id: "testFlowId", name: "Test Flow", stableId: "testFlowStableId" },
    startedAt: "2024-01-15T00:00:00.000Z",
    globalDebug: false,
  },
};
