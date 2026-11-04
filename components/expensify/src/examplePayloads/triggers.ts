import type { TriggerPayload } from "@prismatic-io/spectral";

export const pollChangesTriggerExamplePayload: { payload: TriggerPayload } = {
  payload: {
    headers: {},
    queryParameters: {},
    rawBody: { data: null },
    body: {
      data: {
        created: [
          {
            outputCurrency: "USD",
            owner: "admin@acmecorp.com",
            role: "user",
            name: "Acme Corp USA Policy",
            id: "DEADBEEF12345678",
            type: "corporate",
          },
        ],
        updated: [],
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
    startedAt: "2024-01-15T00:00:00.000Z",
    globalDebug: false,
  },
};
