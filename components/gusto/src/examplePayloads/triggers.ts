import type { TriggerPayload } from "@prismatic-io/spectral";

const triggerPayloadBase: Omit<TriggerPayload, "headers" | "body"> = {
  queryParameters: {},
  rawBody: { data: null },
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
};

export const gustoWebhookTriggerExamplePayload: {
  payload: TriggerPayload;
  response: { statusCode: number; contentType: string };
  branch: string;
} = {
  payload: {
    ...triggerPayloadBase,
    headers: {
      "content-type": "application/json",
      "x-gusto-signature": "sha256=abc123def456",
      "x-gusto-timestamp": "1705312200",
    },
    body: {
      contentType: "application/json" as const,
      data: {
        uuid: "evt_abc123-def456",
        event_type: "payroll.paid",
        resource_type: "Company",
        entity_type: "Payroll",
        entity_uuid: "pay_xyz789",
        timestamp: 1705312200,
        partner_uuid: "partner_abc123",
        company_uuid: "company_def456",
      },
    },
  },
  response: { statusCode: 200, contentType: "text/plain" },
  branch: "Notification",
};
