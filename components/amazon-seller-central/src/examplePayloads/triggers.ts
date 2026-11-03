import type { TriggerPayload } from "@prismatic-io/spectral";

export const pollChangesTriggerExamplePayload: { payload: TriggerPayload } = {
  payload: {
    headers: {},
    queryParameters: {},
    rawBody: {
      data: {
        created: [
          {
            AmazonOrderId: "902-3159896-1390916",
            PurchaseDate: "2024-01-15T10:30:45.123Z",
            LastUpdateDate: "2024-01-15T14:22:10.456Z",
            OrderStatus: "Unshipped",
            MarketplaceId: "ATVPDKIKX0DER",
          },
        ],
        updated: [
          {
            AmazonOrderId: "112-7628145-8392418",
            PurchaseDate: "2024-01-10T08:15:30.000Z",
            LastUpdateDate: "2024-01-15T14:22:10.456Z",
            OrderStatus: "Shipped",
            MarketplaceId: "ATVPDKIKX0DER",
          },
        ],
      },
      contentType: "application/json",
    },
    body: {
      data: {
        created: [
          {
            AmazonOrderId: "902-3159896-1390916",
            PurchaseDate: "2024-01-15T10:30:45.123Z",
            LastUpdateDate: "2024-01-15T14:22:10.456Z",
            OrderStatus: "Unshipped",
            MarketplaceId: "ATVPDKIKX0DER",
          },
        ],
        updated: [
          {
            AmazonOrderId: "112-7628145-8392418",
            PurchaseDate: "2024-01-10T08:15:30.000Z",
            LastUpdateDate: "2024-01-15T14:22:10.456Z",
            OrderStatus: "Shipped",
            MarketplaceId: "ATVPDKIKX0DER",
          },
        ],
      },
      contentType: "application/json",
    },
    pathFragment: "",
    webhookUrls: {},
    webhookApiKeys: {},
    invokeUrl: "",
    executionId: "SW5zdGFuY2VFeGVjdXRpb25SZXN1bHQ6OTk5",
    customer: {
      id: "testCustomerId",
      name: "Test Customer",
      externalId: "ext-123",
    },
    instance: {
      id: "testInstanceId",
      name: "Test Instance",
    },
    user: {
      id: "testUserId",
      name: "Test User",
      email: "test@example.com",
      externalId: "ext-user-123",
    },
    integration: {
      id: "testIntegrationId",
      name: "Amazon Seller Central Integration",
      versionSequenceId: "",
      externalVersion: "",
    },
    flow: {
      id: "testFlowId",
      name: "Poll Changes",
      stableId: "example-stable-id",
    },
    startedAt: "2024-01-15T14:30:00.000Z",
    globalDebug: false,
  },
};
