


import type { TriggerPayload } from "@prismatic-io/spectral";










export const squareWebhookTriggerExamplePayload = {
  payload: {
    headers: {
      "Content-Type": "application/json",
      "X-Square-HmacSha256-Signature": "EXAMPLE_SIGNATURE_BASE64==",
      "Square-Initial-Delivery-Timestamp": "2026-05-20T14:25:28.000Z",
      "User-Agent": "Square-Webhooks",
    },
    queryParameters: {},
    rawBody: {
      data: "",
      contentType: "application/json",
    },
    body: {
      data: {
        merchant_id: "ML82H4QPKMGXY",
        type: "payment.created",
        event_id: "00000000-0000-0000-0000-000000000001",
        created_at: "2026-05-20T14:25:28.000Z",
        data: {
          type: "payment",
          id: "KkAkhdMsgzn59SM8A89WgKwekxLZY",
          object: {
            payment: {
              id: "KkAkhdMsgzn59SM8A89WgKwekxLZY",
              created_at: "2026-05-20T14:25:27.000Z",
              updated_at: "2026-05-20T14:25:28.000Z",
              amount_money: {
                amount: 200,
                currency: "USD",
              },
              status: "COMPLETED",
              source_type: "CARD",
              location_id: "L88917AVBK2S5",
              order_id: "CAISENgvhpdP05f1DWG9H8yMn4kZY",
              total_money: {
                amount: 200,
                currency: "USD",
              },
              approved_money: {
                amount: 200,
                currency: "USD",
              },
              version_token: "zpCBiO0YgSg5cCEqjUxHQGEuZA9SJBdp1WwI",
            },
          },
        },
      },
      contentType: "application/json",
    },
    pathFragment: "",
    webhookUrls: {
      "Webhook Flow": "https://hooks.example.com/trigger/EXAMPLE",
    },
    webhookApiKeys: {
      "Webhook Flow": ["example-api-key"],
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
  response: {
    statusCode: 200,
    contentType: "application/json",
  },
  branch: "Notification",
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
            id: "NewPaymentId000000000000001",
            created_at: "2026-05-20T14:00:00.000Z",
            updated_at: "2026-05-20T14:00:00.000Z",
            amount_money: {
              amount: 500,
              currency: "USD",
            },
            status: "COMPLETED",
            source_type: "CARD",
            location_id: "L88917AVBK2S5",
            order_id: "CAISENgvhpdP05f1DWG9H8yMn4kZY",
            total_money: {
              amount: 500,
              currency: "USD",
            },
            approved_money: {
              amount: 500,
              currency: "USD",
            },
            receipt_number: "NEWP",
            receipt_url: "https://squareup.com/receipt/preview/NewPaymentId000000000000001",
            version_token: "v1NewPaymentTokenAAA",
          },
        ],
        updated: [
          {
            id: "KkAkhdMsgzn59SM8A89WgKwekxLZY",
            created_at: "2026-05-19T10:00:00.000Z",
            updated_at: "2026-05-20T15:00:00.000Z",
            amount_money: {
              amount: 200,
              currency: "USD",
            },
            status: "COMPLETED",
            source_type: "CARD",
            location_id: "L88917AVBK2S5",
            order_id: "CAISENgvhpdP05f1DWG9H8yMn4kZY",
            total_money: {
              amount: 200,
              currency: "USD",
            },
            approved_money: {
              amount: 200,
              currency: "USD",
            },
            receipt_number: "KkAk",
            receipt_url: "https://squareup.com/receipt/preview/KkAkhdMsgzn59SM8A89WgKwekxLZY",
            version_token: "v2UpdatedPaymentTokenBBB",
          },
        ],
      },
      contentType: "application/json",
    },
    pathFragment: "",
    webhookUrls: {
      "Polling Flow": "https://hooks.example.com/trigger/EXAMPLE",
    },
    webhookApiKeys: {
      "Polling Flow": ["example-api-key"],
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
  polledNoChanges: false,
};
