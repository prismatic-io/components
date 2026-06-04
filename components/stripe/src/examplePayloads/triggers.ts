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
            id: "evt_1Ozr8j2eZvKYlo2C9X1zHnGw",
            object: "event",
            api_version: "2025-04-30.basil",
            created: 1716397800,
            type: "customer.created",
            data: {
              object: {
                id: "cus_NffrFeUfNV2Hib",
                object: "customer",
                email: "jenny.rosen@example.com",
                name: "Jenny Rosen",
                created: 1716397800,
              },
            },
            livemode: false,
            pending_webhooks: 1,
          },
        ],
        updated: [
          {
            id: "evt_1Ozr8k2eZvKYlo2C9X1zHnHx",
            object: "event",
            api_version: "2025-04-30.basil",
            created: 1716397900,
            type: "invoice.paid",
            data: {
              object: {
                id: "in_1MtHbELkdIwHu7ixl4OzzPMv",
                object: "invoice",
                amount_paid: 5000,
                currency: "usd",
                customer: "cus_NffrFeUfNV2Hib",
                status: "paid",
                created: 1716397800,
              },
            },
            livemode: false,
            pending_webhooks: 1,
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
