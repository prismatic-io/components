import type { TriggerPayload } from "@prismatic-io/spectral";

export const eventTypeSubscriptionExamplePayload = {
  payload: {
    headers: {
      "Content-Type": "application/json",
      "X-HubSpot-Signature-v3": "sha256=abc123",
      "X-HubSpot-Request-Timestamp": "1708986599647",
      "X-HubSpot-Signature-Version": "v3",
    },
    queryParameters: null,
    rawBody: { data: "" },
    body: {
      data: [
        {
          eventId: 567890123,
          subscriptionId: 234567,
          portalId: 12345678,
          appId: 987654,
          occurredAt: 1708986598741,
          subscriptionType: "contact.creation",
          attemptNumber: 0,
          objectId: 65059681032,
          changeFlag: "CREATED",
          changeSource: "CRM_UI",
          sourceId: "userId:45678",
        },
      ],
      contentType: "application/json",
    },
  },
};

export const pollChangesTriggerExamplePayload: { payload: TriggerPayload } = {
  payload: {
    headers: {},
    queryParameters: null,
    rawBody: { data: "" },
    body: {
      data: {
        createdRecords: [
          {
            id: "65059681027",
            properties: {
              createdate: "2024-01-10T08:30:15.234Z",
              hs_lastmodifieddate: "2024-01-10T08:30:15.234Z",
              hs_object_id: "65059681027",
            },
            createdAt: "2024-01-10T08:30:15.234Z",
            updatedAt: "2024-01-10T08:30:15.234Z",
            archived: false,
          },
        ],
        updatedRecords: [
          {
            id: "65059681028",
            properties: {
              createdate: "2024-01-05T10:20:30.456Z",
              hs_lastmodifieddate: "2024-01-15T14:22:10.789Z",
              hs_object_id: "65059681028",
            },
            createdAt: "2024-01-05T10:20:30.456Z",
            updatedAt: "2024-01-15T14:22:10.789Z",
            archived: false,
          },
        ],
      },
      contentType: "application/json",
    },
    pathFragment: "",
    webhookUrls: {},
    webhookApiKeys: {},
    invokeUrl: "",
    executionId: "",
    customer: undefined,
    instance: undefined,
    user: undefined,
    integration: undefined,
    flow: undefined,
    startedAt: "",
    globalDebug: false,
  },
};

export const pollChangesCustomObjectsTriggerExamplePayload =
  pollChangesTriggerExamplePayload;

export const webhookExamplePayload = {
  payload: {
    headers: {
      Accept: "*/*",
      "Content-Type": "application/json",
      Host: "hooks.example.com",
      "User-Agent":
        "HubSpot Connect 2.0 (http://dev.hubspot.com/) (namespace: webhooks-nio-http-client) - WebhooksExecutorDaemon-executor",
      "X-Amz-Cf-Id": "ABCDEFGHIJK1234567890",
      "X-Amzn-Trace-Id": "Root=1-65dd10e7-527c83667c3d96380250fd05",
      "X-Forwarded-For": "54.174.62.123, 15.158.50.45",
      "X-HubSpot-Request-Timestamp": "1708986599647",
      "X-HubSpot-Signature": "sha256=abc123def456",
      "X-HubSpot-Signature-v3": "sha256=xyz789",
      "X-HubSpot-Signature-Version": "v3",
      "X-HubSpot-Timeout-Millis": "10000",
      "X-Trace": "",
    },
    queryParameters: null,
    rawBody: { data: "" },
    body: {
      data: [
        {
          eventId: 567890123,
          subscriptionId: 234567,
          portalId: 12345678,
          appId: 987654,
          occurredAt: 1708986598741,
          subscriptionType: "contact.creation",
          attemptNumber: 0,
          objectId: 65059681032,
          changeFlag: "CREATED",
          changeSource: "CRM_UI",
          sourceId: "userId:45678",
        },
      ],
      contentType: "application/json",
    },
    pathFragment: "",
    webhookUrls: {
      Webhook: "https://hooks.example.com/trigger/abc123==",
    },
    webhookApiKeys: {
      Webhook: ["sample-api-key"],
    },
    invokeUrl: "https://hooks.example.com/trigger/abc123==",
    executionId: "exec_789456",
    customer: {
      id: "cust_12345",
      name: "Example Customer",
      externalId: "ext_cust_98765",
    },
    instance: {
      id: "inst_54321",
      name: "HubSpot - Webhook Integration",
    },
    user: {
      id: "user_67890",
      email: "admin@example.com",
      name: "Admin User",
      externalId: "ext_user_12345",
    },
    integration: {
      id: "intg_98765",
      name: "HubSpot - Webhook Integration",
      versionSequenceId: "v1.0.0",
    },
    flow: {
      id: "flow_45678",
      name: "Contact Created Webhook",
    },
  },
};
