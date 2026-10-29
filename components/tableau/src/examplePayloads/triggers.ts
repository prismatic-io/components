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
            id: "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
            name: "Q2 Sales Dashboard",
            contentUrl: "Q2SalesDashboard",
            createdAt: "2026-05-26T14:30:00Z",
            updatedAt: "2026-05-26T14:30:00Z",
            project: {
              id: "1f2f3e4e-5d6d-7c8c-9b0b-1a2a3f4f5e6e",
              name: "Marketing Analytics",
            },
            owner: { id: "abc12e4e-5d6d-7c8c-9b0b-1a2a3f4f5e90" },
          },
        ],
        updated: [
          {
            id: "f1e2d3c4-b5a6-9870-fedc-ba0987654321",
            name: "Pipeline Overview",
            contentUrl: "PipelineOverview",
            createdAt: "2026-04-12T09:00:00Z",
            updatedAt: "2026-05-26T15:45:00Z",
            project: {
              id: "1f2f3e4e-5d6d-7c8c-9b0b-1a2a3f4f5e6e",
              name: "Marketing Analytics",
            },
            owner: { id: "abc12e4e-5d6d-7c8c-9b0b-1a2a3f4f5e90" },
          },
        ],
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
