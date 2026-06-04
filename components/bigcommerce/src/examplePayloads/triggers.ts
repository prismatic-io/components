import type { TriggerPayload } from "@prismatic-io/spectral";













export const myTriggerExamplePayload = {
  payload: {
    headers: {
      "Content-Type": "application/json",
      "X-BC-Webhook-Id": "18048287",
      "X-BC-Webhook-Signature":
        "v1=1d6207f8818f063890758a32d3833914754ba788cb2993b04ac8eb064fef0fcd",
    },
    queryParameters: {},
    rawBody: {
      data: "",
      contentType: "application/json",
    },
    body: {
      data: {
        scope: "store/order/created",
        store_id: "11111",
        data: {
          type: "order",
          id: 250,
        },
        hash: "5e9d7e9b1a6e7e9d7e9b1a6e7e9d7e9b1a6e7e9d",
        created_at: 1561488106,
        producer: "stores/abc123",
      },
      contentType: "application/json",
    },
    pathFragment: "",
    webhookUrls: {
      Webhook: "https://hooks.example.com/trigger/EXAMPLE",
    },
    webhookApiKeys: {
      Webhook: ["example-api-key"],
    },
    invokeUrl: "https://hooks.example.com/trigger/EXAMPLE",
    executionId: "SW5zdGFuY2VFeGVjdXRpb246MTIzNDU=",
    customer: {
      id: "Q3VzdG9tZXI6MTIzNDU=",
      externalId: "example-customer-external-id",
      name: "Example Customer",
    },
    instance: {
      id: "SW5zdGFuY2U6MTIzNDU=",
      name: "Example Instance",
    },
    user: {
      id: "VXNlcjoxMjM0NQ==",
      externalId: "example-user-external-id",
      name: "Example User",
      email: "user@example.com",
    },
  } as unknown as TriggerPayload,
};








export const pollChangesTriggerExamplePayload = {
  payload: {
    headers: {},
    queryParameters: {},
    rawBody: {
      data: "",
      contentType: "application/json",
    },
    body: {
      data: {
        created: [
          {
            id: 101,
            status: "Pending",
            status_id: 1,
            date_created: "Thu, 19 May 2026 14:20:00 +0000",
            date_modified: "Thu, 19 May 2026 14:25:00 +0000",
            total_inc_tax: "29.99",
            currency_code: "USD",
          },
        ],
        updated: [
          {
            id: 87,
            status: "Shipped",
            status_id: 2,
            date_created: "Mon, 12 May 2026 09:00:00 +0000",
            date_modified: "Thu, 19 May 2026 13:15:00 +0000",
            total_inc_tax: "199.50",
            currency_code: "USD",
          },
        ],
      },
      contentType: "application/json",
    },
    pathFragment: "",
    webhookUrls: {
      "New and Updated Orders": "https://hooks.example.com/trigger/EXAMPLE",
    },
    webhookApiKeys: {
      "New and Updated Orders": ["example-api-key"],
    },
    invokeUrl: "https://hooks.example.com/trigger/EXAMPLE",
    executionId: "SW5zdGFuY2VFeGVjdXRpb246MTIzNDU=",
    customer: {
      id: "Q3VzdG9tZXI6MTIzNDU=",
      externalId: "example-customer-external-id",
      name: "Example Customer",
    },
    instance: {
      id: "SW5zdGFuY2U6MTIzNDU=",
      name: "Example Instance",
    },
    user: {
      id: "VXNlcjoxMjM0NQ==",
      externalId: "example-user-external-id",
      name: "Example User",
      email: "user@example.com",
    },
  } as unknown as TriggerPayload,
};
