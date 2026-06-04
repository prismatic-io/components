import type { TriggerPayload } from "@prismatic-io/spectral";














export const pollChangesExamplePayload: { payload: TriggerPayload } = {
  payload: {
    headers: {},
    queryParameters: {},
    rawBody: { data: null },
    body: {
      data: {
        created: [
          {
            id: 14,
            name: "Acme Corporation",
            display_name: "Acme Corporation",
            email: "billing@acme.example.com",
            create_date: "2026-05-26 14:30:00",
            write_date: "2026-05-26 14:30:00",
          },
        ],
        updated: [
          {
            id: 9,
            name: "Fabrikam, Inc.",
            display_name: "Fabrikam, Inc.",
            email: "ap@fabrikam.example.com",
            create_date: "2026-04-12 09:00:00",
            write_date: "2026-05-26 15:45:00",
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
    flow: {
      id: "testFlowId",
      name: "Test Flow",
      stableId: "",
    },
    startedAt: "2024-01-15T00:00:00.000Z",
    globalDebug: false,
  },
};
