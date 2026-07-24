import type { TriggerPayload } from "@prismatic-io/spectral";
export const pubSubWebhookExamplePayload: {
  payload: TriggerPayload;
} = {
  payload: {
    headers: {
      "content-type": "application/json",
      "user-agent":
        "APIs-Google; (+https://developers.google.com/webmasters/APIs-Google.html)",
      "x-goog-message-id": "2070443601311540",
      "x-goog-subscription-name":
        "projects/example-project/subscriptions/merchant-notifications-push",
    },
    queryParameters: {},
    rawBody: { data: null },
    body: {
      data: {
        message: {
          data: "eyJhY2NvdW50SWQiOiAiMTIzNDU2Nzg5IiwgImV2ZW50VGltZVVzZWMiOiAiMTczNzAyNTgzNTc0OTAwMCIsICJleHBpcmF0aW9uVGltZVVzZWMiOiAiMTczOTYxNzgzNTc0OTAwMCIsICJyZXNvdXJjZSI6ICJwcm9kdWN0cy9vbmxpbmU6ZW46VVM6MTExMTExMTExMSJ9",
          messageId: "2070443601311540",
          message_id: "2070443601311540",
          publishTime: "2025-01-16T10:30:35.749Z",
          publish_time: "2025-01-16T10:30:35.749Z",
          attributes: {
            registeredEvent: "PRODUCT_STATUS_CHANGE",
          },
        },
        subscription:
          "projects/example-project/subscriptions/merchant-notifications-push",
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
