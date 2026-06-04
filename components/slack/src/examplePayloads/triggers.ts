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
            type: "message",
            user: "U012AB3CDE",
            text: "Heads up — deploy at 3pm.",
            ts: "1716397800.000200",
            team: "T012AB3C4",
          },
          {
            type: "message",
            user: "U987XY6Z5",
            text: "Got it, thanks.",
            ts: "1716397950.000100",
            team: "T012AB3C4",
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
    flow: { id: "testFlowId", name: "Test Flow" },
    startedAt: "2024-01-15T00:00:00.000Z",
    globalDebug: false,
  },
};
