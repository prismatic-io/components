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
            sys: {
              id: "5KsDBWseXY6QegucYAoacS",
              type: "Entry",
              version: 1,
              createdAt: "2026-05-26T14:30:00.000Z",
              updatedAt: "2026-05-26T14:30:00.000Z",
              contentType: {
                sys: { type: "Link", linkType: "ContentType", id: "blogPost" },
              },
            },
            fields: {
              title: { "en-US": "Launch announcement" },
              body: { "en-US": "We are live!" },
            },
          },
        ],
        updated: [
          {
            sys: {
              id: "2cOd0Aho4dInhwh5cgY9rj",
              type: "Entry",
              version: 7,
              createdAt: "2026-04-12T09:00:00.000Z",
              updatedAt: "2026-05-26T15:45:00.000Z",
              contentType: {
                sys: { type: "Link", linkType: "ContentType", id: "blogPost" },
              },
            },
            fields: {
              title: { "en-US": "Pricing update (revised)" },
              body: { "en-US": "New tiers effective June 1." },
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
    flow: { id: "testFlowId", name: "Test Flow" },
    startedAt: "2024-01-15T00:00:00.000Z",
    globalDebug: false,
  },
};
