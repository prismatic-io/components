import type { TriggerPayload } from "@prismatic-io/spectral";
import { getWorkbookExamplePayload } from "./workbooks";

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

export const tableauWebhookExamplePayload: { payload: TriggerPayload } = {
  payload: {
    headers: {},
    queryParameters: {},
    rawBody: { data: null },
    body: {
      data: {
        resource: "WORKBOOK",
        event_type: "WorkbookRefreshSucceeded",
        resource_name: "Sales Dashboard",
        site_luid: "8b2a95d8-52b9-40a4-8712-cd6da771bd1b",
        resource_luid: "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
        created_at: "2024-08-15T17:14:45Z",
        resourceInfo: getWorkbookExamplePayload.data,
      },
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
    startedAt: "2024-08-15T00:00:00.000Z",
    globalDebug: false,
  },
};
