import type { TriggerPayload } from "@prismatic-io/spectral";

export const listWebhooksExamplePayload = {
  data: {
    max_allowed: 5,
    webhooks: [
      {
        enabled: true,
        url: "https://emailengagment.example.com",
        group_resubscribe: true,
        delivered: true,
        group_unsubscribe: true,
        spam_report: true,
        bounce: true,
        deferred: true,
        unsubscribe: true,
        processed: false,
        open: true,
        click: true,
        dropped: true,
        friendly_name: "Engagment Webhook",
        id: "77d4a5da-7015-11ed-a1eb-0242ac120002",
        oauth_client_id: "a835e7210bbb47edbfa71bdfc909b2d7",
        oauth_token_url: "https://oauthservice.example.com",
        public_key: "123publickeyabc",
        created_date: "2023-01-01T12:00:00Z",
        updated_date: "2023-02-15T10:00:00Z",
      },
    ],
  },
};

export const createWebhookExamplePayload = {
  data: {
    enabled: true,
    url: "https://example.com/webhook-endpoint",
    group_resubscribe: true,
    delivered: false,
    group_unsubscribe: true,
    spam_report: true,
    bounce: true,
    deferred: true,
    unsubscribe: true,
    processed: false,
    open: true,
    click: true,
    dropped: true,
    friendly_name: "Engagement Webhook",
    oauth_client_id: "a835e7210bbb47edbfa71bdfc909b2d7",
    oauth_token_url: "https://oauthservice.example.com",
    id: "77d4a5da-7015-11ed-a1eb-0242ac120002",
    created_date: "2023-01-01T12:00:00Z",
    updated_date: "2023-02-15T10:00:00Z",
  },
};

export const deleteWebhookExamplePayload = {
  data: {
    success: true,
    message: "Webhook deleted successfully",
  },
};

export const getWebhookExamplePayload = {
  data: {
    enabled: true,
    url: "https://emaildelivery.example.com",
    group_resubscribe: false,
    delivered: true,
    group_unsubscribe: false,
    spam_report: true,
    bounce: true,
    deferred: true,
    unsubscribe: true,
    processed: true,
    open: true,
    click: true,
    dropped: true,
    friendly_name: "Delivery Webhook",
    id: "77d4a5da-7015-11ed-a1eb-0242ac120002",
    oauth_client_id: "a835e7210bbb47edbfa71bdfc909b2d7",
    oauth_token_url: "https://oauthservice.example.com",
    public_key: "123publickeyabc",
    created_at: "2023-01-01T12:00:00Z",
    updated_at: "2023-02-15T10:00:00Z",
  },
};

export const testWebhookExamplePayload = {
  data: {
    success: true,
    message: "Test event sent successfully",
  },
};

export const toggleSignatureVerificationExamplePayload = {
  data: {
    id: "77d4a5da-7015-11ed-a1eb-0242ac120002",
    public_key: "123publickeyabc",
  },
};

export const updateWebhookExamplePayload = {
  data: {
    enabled: true,
    url: "https://emaildelivery.example.com",
    group_resubscribe: false,
    delivered: true,
    group_unsubscribe: false,
    spam_report: true,
    bounce: true,
    deferred: true,
    unsubscribe: true,
    processed: true,
    open: true,
    click: true,
    dropped: true,
    friendly_name: "Delivery Webhook",
    id: "77d4a5da-7015-11ed-a1eb-0242ac120002",
    oauth_client_id: "a835e7210bbb47edbfa71bdfc909b2d7",
    oauth_token_url: "https://oauthservice.example.com",
    created_date: "2023-01-01T12:00:00Z",
    updated_date: "2023-02-15T10:00:00Z",
  },
};

export const eventWebhookTriggerExamplePayload: { payload: TriggerPayload } = {
  payload: {
    headers: {
      "Accept-Encoding": "gzip",
      "Content-Type": "application/json;charset=utf-8",
      Host: "hooks.example.com",
      "User-Agent": "SendGrid Event API",
      "X-Amz-Cf-Id": "exampleCloudFrontId123456789abcdef==",
      "X-Amzn-Trace-Id": "Root=1-12345678-abcdef1234567890abcdef12",
      "X-Forwarded-For": "192.0.2.1, 198.51.100.1",
      "X-Twilio-Email-Event-Webhook-Signature":
        "MEQCIExampleSignatureBase64EncodedString1234567890abcdefghijklmnopqrstuvwxyz==",
      "X-Twilio-Email-Event-Webhook-Timestamp": "1700000000",
    },
    queryParameters: null,
    rawBody: { data: "<data (972 bytes)>" },
    body: {
      data: [
        {
          category: ["Marketing", "Newsletter", "Retail", "Promotional"],
          email: "user@example.com",
          event: "delivered",
          ip: "192.0.2.100",
          mc_pod_id: "1",
          mc_stats: "singlesend",
          phase_id: "send",
          response:
            "250 2.0.0 OK DMARC:Pass 1700000000 example123-abc456def789ghi012jkl345.123 - gsmtp",
          send_at: "1700000000",
          sg_event_id:
            "ZGVsaXZlcmVkLTAtMTIzNDU2NzgtRXhhbXBsZUV2ZW50SWQxMjM0NTY3ODkw",
          sg_message_id:
            "ExampleMessageId123.recvd-abc123def456-ghi789-1-12345678-9.0",
          sg_template_id: "d-exampletemplateid1234567890abcdef",
          sg_template_name: "Example Template Version 2024-01-01T00:00:00.000Z",
          singlesend_id: "abc12345-def6-7890-ghij-klmnopqrstuv",
          singlesend_name: "Example Marketing Campaign",
          "smtp-id": "<ExampleSmtpId123@example-server-01>",
          template_hash:
            "abcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890",
          template_id: "d-exampletemplateid1234567890abcdef",
          template_version_id: "12345678-90ab-cdef-1234-567890abcdef",
          timestamp: 1700000000,
          tls: 1,
        },
      ],
      contentType: "application/json;charset=utf-8",
    },
    pathFragment: "",
    webhookUrls: {
      "Flow 1":
        "https://hooks.example.com/trigger/SW5zdGFuY2VGbG93Q29uZmlnOmV4YW1wbGUxMjM0NTY3ODkwYWJjZGVmZ2hpams=",
      Receive:
        "https://hooks.example.com/trigger/SW5zdGFuY2VGbG93Q29uZmlnOmV4YW1wbGVSZWNlaXZlMTIzNDU2Nzg5MGFiY2Q=",
      Webhooks:
        "https://hooks.example.com/trigger/SW5zdGFuY2VGbG93Q29uZmlnOmV4YW1wbGVXZWJob29rczEyMzQ1Njc4OTBhYg==",
      "Event Webhook":
        "https://hooks.example.com/trigger/SW5zdGFuY2VGbG93Q29uZmlnOmV4YW1wbGVFdmVudFdlYmhvb2sxMjM0NTY3OA==",
      "Webhook Event":
        "https://hooks.example.com/trigger/SW5zdGFuY2VGbG93Q29uZmlnOmV4YW1wbGVXZWJob29rRXZlbnQxMjM0NTY3OA==",
    },
    webhookApiKeys: {
      "Flow 1": [],
      Receive: [],
      Webhooks: [],
      "Event Webhook": [],
      "Webhook Event": [],
    },
    invokeUrl:
      "https://hooks.example.com/trigger/SW5zdGFuY2VGbG93Q29uZmlnOmV4YW1wbGVJbnZva2VVcmwxMjM0NTY3ODkwYWI=",
    executionId:
      "SW5zdGFuY2VFeGVjdXRpb25SZXN1bHQ6ZXhhbXBsZUV4ZWN1dGlvbklkMTIzNDU2Nzg5MGFiY2RlZg==",
    customer: {
      id: "testCustomerId",
      name: "Test Customer",
      externalId: "testCustomerExternalId",
    },
    instance: {
      id: "SW5zdGFuY2U6ZXhhbXBsZUluc3RhbmNlSWQxMjM0NTY3ODkwYWJjZGVmZ2hpams=",
      name: "SendGrid - Example - Webhook Event",
    },
    user: {
      id: "testUserId",
      email: "testUserEmail@example.com",
      name: "Test User",
      externalId: "testUserExternalId",
    },
    integration: {
      id: "SW50ZWdyYXRpb246ZXhhbXBsZUludGVncmF0aW9uSWQxMjM0NTY3ODkwYWJjZA==",
      name: "SendGrid - Example",
      versionSequenceId: "exampleIntegrationVersionSequenceId123",
      externalVersion: "",
    },
    flow: {
      id: "SW50ZWdyYXRpb25GbG93OmV4YW1wbGVGbG93SWQxMjM0NTY3ODkwYWJjZGVmZ2g=",
      name: "Webhook Event",
    },
    startedAt: "2025-12-24 20:04:23.776311+00",
    globalDebug: true,
  },
};
