import type { TriggerPayload } from "@prismatic-io/spectral";
import { listTicketsRaw } from "./tickets";
export const webhookExamplePayload = {
  payload: {
    headers: {
      "Content-Type": "application/json",
      "User-Agent": "Zendesk Webhook",
      "X-Zendesk-Webhook-Id": "01GK8E6BKWMJZD2T8Y5AXJQMG5",
      "X-Zendesk-Webhook-Signature":
        "wxL5Lkx5pktp+TKZyXluPgN3pSKWX2eaP1zhMfh+J6c=",
      "X-Zendesk-Webhook-Signature-Timestamp": "2024-04-17T17:18:10Z",
    },
    queryParameters: {},
    rawBody: {
      data: JSON.stringify({
        type: "zen:event-type:ticket.created",
        account_id: 88888888,
        id: "01HNXXXX-CTEXAMPLE",
        time: "2024-04-17T17:18:10Z",
        zendesk_event_version: "2022-11-06",
        subject: "zen:ticket:35436",
        detail: {
          id: "35436",
          status: "Open",
          via: { channel: "web" },
          created_at: "2024-04-17T17:18:10Z",
          updated_at: "2024-04-17T17:18:10Z",
        },
        event: {
          current: { status: "Open" },
        },
      }),
      contentType: "application/json",
    },
    body: {
      data: {
        type: "zen:event-type:ticket.created",
        account_id: 88888888,
        id: "01HNXXXX-CTEXAMPLE",
        time: "2024-04-17T17:18:10Z",
        zendesk_event_version: "2022-11-06",
        subject: "zen:ticket:35436",
        detail: {
          id: "35436",
          status: "Open",
          via: { channel: "web" },
          created_at: "2024-04-17T17:18:10Z",
          updated_at: "2024-04-17T17:18:10Z",
        },
        event: {
          current: { status: "Open" },
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
            ...listTicketsRaw[0],
            id: 35437,
            subject: "New ticket received",
            status: "new",
            created_at: "2026-05-20T14:00:00Z",
            updated_at: "2026-05-20T14:00:00Z",
          },
        ],
        updated: [
          {
            ...listTicketsRaw[0],
            id: 35436,
            status: "open",
            created_at: "2009-07-20T22:55:29Z",
            updated_at: "2026-05-20T15:00:00Z",
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
    integration: {
      id: "SW50ZWdyYXRpb246MTIzNDU=",
      name: "Example Integration",
      versionSequenceId: "SW50ZWdyYXRpb25WZXJzaW9uOjEyMzQ1",
      externalVersion: "1.0.0",
    },
    flow: {
      id: "SW50ZWdyYXRpb25GbG93OjEyMzQ1",
      name: "Polling Flow",
      stableId: "example-flow-stable-id",
    },
    startedAt: "2026-05-20T15:01:00.000Z",
    globalDebug: false,
  } as unknown as TriggerPayload,
  polledNoChanges: false,
};
