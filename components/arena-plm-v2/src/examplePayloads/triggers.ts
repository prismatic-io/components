import type { TriggerPayload } from "@prismatic-io/spectral";
export const pollChangesTriggerExamplePayload: {
  payload: TriggerPayload;
} = {
  payload: {
    headers: {},
    queryParameters: {},
    rawBody: { data: null },
    body: {
      data: {
        createdRecords: [
          {
            guid: "9OE00VN11OE22VN33OE44VN5",
            eventType: "CHANGE_EFFECTIVE",
            status: "COMPLETED",
            creationDateTime: "2026-03-21T08:40:00Z",
            reconciled: false,
            change: {
              guid: "CH1AB2CD3EF4GH5IJ6KL7MN8",
              number: "ECO-000512",
              title: "Update resistor tolerance on control board",
            },
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
      stableId: "testFlowStableId",
    },
    startedAt: "2024-01-15T00:00:00.000Z",
    globalDebug: false,
  },
};
