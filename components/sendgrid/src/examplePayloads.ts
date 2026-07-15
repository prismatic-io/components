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
        friendly_name: "Engagement Webhook",
        id: "b4c46f7a-9012-4e8d-bc5f-7d3a1e8b9c0d",
        oauth_client_id: "a835e7210bbb47edbfa71bdfc909b2d7",
        oauth_token_url: "https://oauthservice.example.com",
        public_key: "MFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAE",
        created_date: "2024-03-15T09:30:00Z",
        updated_date: "2024-06-20T14:45:00Z",
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
    friendly_name: "Order Notifications Webhook",
    oauth_client_id: "a835e7210bbb47edbfa71bdfc909b2d7",
    oauth_token_url: "https://oauthservice.example.com",
    id: "c7e28f1b-4a35-4d9e-a6c8-2f5b9d0e1a3c",
    created_date: "2024-07-10T11:20:00Z",
    updated_date: "2024-07-10T11:20:00Z",
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
    friendly_name: "Delivery Status Webhook",
    id: "b4c46f7a-9012-4e8d-bc5f-7d3a1e8b9c0d",
    oauth_client_id: "a835e7210bbb47edbfa71bdfc909b2d7",
    oauth_token_url: "https://oauthservice.example.com",
    public_key: "MFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAE",
    created_at: "2024-03-15T09:30:00Z",
    updated_at: "2024-06-20T14:45:00Z",
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
    id: "b4c46f7a-9012-4e8d-bc5f-7d3a1e8b9c0d",
    public_key: "MFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAE",
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
    friendly_name: "Delivery Status Webhook",
    id: "b4c46f7a-9012-4e8d-bc5f-7d3a1e8b9c0d",
    oauth_client_id: "a835e7210bbb47edbfa71bdfc909b2d7",
    oauth_token_url: "https://oauthservice.example.com",
    created_date: "2024-03-15T09:30:00Z",
    updated_date: "2024-06-20T14:45:00Z",
  },
};
export const addOrUpdateContactExamplePayload = {
  data: {
    job_id: "d9f0c7e2-5a14-4b8e-9c3d-6f1e2a7b8c9d",
    _metadata: {
      self: "https://api.sendgrid.com/v3/marketing/contacts/imports/d9f0c7e2-5a14-4b8e-9c3d-6f1e2a7b8c9d",
    },
  },
};
export const getContactsByEmailsExamplePayload = {
  data: {
    result: {
      "jdoe@example.com": {
        contact: {
          address_line_1: "1451 Larimer Street",
          address_line_2: "Suite 200",
          alternate_emails: ["john.doe@work.example.com"],
          city: "Denver",
          country: "US",
          email: "jdoe@example.com",
          first_name: "John",
          id: "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
          last_name: "Doe",
          list_ids: ["f8e7d6c5-b4a3-9281-7654-321fedcba098"],
          postal_code: "80202",
          state_province_region: "CO",
          phone_number: "+13035551234",
          whatsapp: "+13035551234",
          line: "johndoe_line",
          facebook: "johndoe_fb",
          unique_name: "johndoe_unique",
          custom_fields: { loyalty_tier: "Gold" },
          created_at: "2024-01-15T08:30:00Z",
          updated_at: "2024-06-20T16:45:00Z",
          _metadata: {
            self: "https://api.sendgrid.com/v3/marketing/contacts/a1b2c3d4-e5f6-7890-abcd-ef1234567890",
          },
        },
      },
    },
  },
};
export const getImportStatusExamplePayload = {
  data: {
    id: "d9f0c7e2-5a14-4b8e-9c3d-6f1e2a7b8c9d",
    status: "completed",
    job_type: "upsert",
    results: {
      requested_count: 100,
      created_count: 80,
      updated_count: 20,
      deleted_count: 0,
      errored_count: 0,
      errors_url:
        "https://api.sendgrid.com/v3/marketing/contacts/imports/errors/d9f0c7e2-5a14-4b8e-9c3d-6f1e2a7b8c9d",
      started_at: "2024-08-01T10:00:00Z",
      finished_at: "2024-08-01T10:01:30Z",
    },
  },
};
export const initiateContactsImportExamplePayload = {
  data: {
    job_id: "e3a4b5c6-d7e8-9f01-2345-6789abcdef01",
    upload_uri:
      "https://sg-contacts-upload.s3.amazonaws.com/uploads/e3a4b5c6-d7e8-9f01-2345-6789abcdef01",
    upload_headers: [
      {
        header: "Content-Type",
        value: "text/csv",
      },
      {
        header: "x-amz-meta-job_id",
        value: "e3a4b5c6-d7e8-9f01-2345-6789abcdef01",
      },
    ],
    _metadata: {
      self: "https://api.sendgrid.com/v3/marketing/contacts/imports/e3a4b5c6-d7e8-9f01-2345-6789abcdef01",
    },
  },
};
export const getAllFieldDefinitionsExamplePayload = {
  data: {
    custom_fields: [
      {
        id: "w1",
        name: "loyalty_tier",
        field_type: "Text",
        _metadata: {
          self: "https://api.sendgrid.com/v3/marketing/field_definitions/w1",
        },
      },
    ],
    reserved_fields: [
      {
        id: "_rf1",
        name: "first_name",
        field_type: "Text",
        _metadata: {
          self: "https://api.sendgrid.com/v3/marketing/field_definitions/_rf1",
        },
      },
    ],
    _metadata: {
      count: 2,
      self: "https://api.sendgrid.com/v3/marketing/field_definitions",
    },
    pagination: {
      nextPageToken: "eyJsYXN0X2lkIjoidzIifQ==",
      previousPageToken: "eyJsYXN0X2lkIjoidzAifQ==",
      totalCount: 100,
    },
  },
};
export const sendEmailExamplePayload: {
  data: unknown;
} = {
  data: [{ body: { message: "success" }, statusCode: 202, headers: {} }, {}],
};
export const sendEmailWithDynamicTemplateExamplePayload: {
  data: unknown;
} = {
  data: [
    {
      body: { message: "success" },
      statusCode: 202,
      headers: {},
    },
    {},
  ],
};
export const sendMultipleEmailsExamplePayload: {
  data: unknown;
} = {
  data: [{ body: { message: "success" }, statusCode: 202, headers: {} }, {}],
};
export const createListExamplePayload = {
  data: {
    id: "a7b8c9d0-e1f2-3456-7890-abcdef123456",
    name: "Monthly Newsletter Subscribers",
    contact_count: 0,
    _metadata: {
      self: "https://api.sendgrid.com/v3/marketing/lists/a7b8c9d0-e1f2-3456-7890-abcdef123456",
    },
  },
};
export const getListByIdExamplePayload = {
  data: {
    id: "a7b8c9d0-e1f2-3456-7890-abcdef123456",
    name: "Monthly Newsletter Subscribers",
    contact_count: 42,
    contact_sample: [
      {
        id: "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
        email: "jdoe@example.com",
        first_name: "John",
        last_name: "Doe",
        created_at: "2024-01-15T08:30:00Z",
        updated_at: "2024-06-20T16:45:00Z",
      },
    ],
    _metadata: {
      self: "https://api.sendgrid.com/v3/marketing/lists/a7b8c9d0-e1f2-3456-7890-abcdef123456",
    },
  },
};
export const getAllListsExamplePayload = {
  data: {
    result: [
      {
        id: "a7b8c9d0-e1f2-3456-7890-abcdef123456",
        name: "Monthly Newsletter Subscribers",
        contact_count: 1000,
        _metadata: {
          self: "https://api.sendgrid.com/v3/marketing/lists/a7b8c9d0-e1f2-3456-7890-abcdef123456",
        },
      },
    ],
    _metadata: {
      count: 1,
      self: "https://api.sendgrid.com/v3/marketing/lists",
    },
    pagination: {
      nextPageToken: "eyJsYXN0X2lkIjoiYjJjM2Q0ZTUifQ==",
      previousPageToken: "eyJsYXN0X2lkIjoiYTFiMmMzZDQifQ==",
      totalCount: 100,
    },
  },
};
export const selectWebhookExamplePayload = {
  result: [
    {
      label: "Engagement Webhook",
      key: "77d4a5da-7015-11ed-a1eb-0242ac120002",
    },
  ],
};
export const sendGridListsDataSourceExamplePayload = {
  result: [
    { label: "Summer Newsletter (1020 contacts)", key: "abc-123" },
    { label: "Product Updates (50 contacts)", key: "def-456" },
  ],
};
export const pollChangesTriggerExamplePayload: {
  payload: TriggerPayload;
} = {
  payload: {
    headers: {},
    queryParameters: {},
    rawBody: { data: null },
    body: {
      data: {
        created: [],
        updated: [
          {
            msg_id: "abc12345.recvd-67890-XYZ-1-1234567-1.0",
            from_email: "sender@example.com",
            subject: "Hello from Acme!",
            to_email: "user@example.com",
            status: "delivered",
            opens_count: 0,
            clicks_count: 0,
            last_event_time: "2026-05-27T14:30:00Z",
            api_key_id: "abc12345defg67890hijkXYZ",
            template_id: "d-exampletemplateid1234567890abcdef",
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
    flow: {
      id: "testFlowId",
      name: "Test Flow",
      stableId: "example-stable-id",
    },
    startedAt: "2026-05-27T14:30:30.000Z",
    globalDebug: false,
  },
};
export const eventWebhookTriggerExamplePayload: {
  payload: TriggerPayload;
} = {
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
      stableId: "example-stable-id",
    },
    startedAt: "2025-12-24T20:04:23.776Z",
    globalDebug: true,
  },
};
export const webhookTriggerExamplePayload: {
  payload: TriggerPayload;
} = {
  payload: {
    headers: {
      "Content-Type": "application/json",
      "User-Agent": "SendGrid Event API",
    },
    queryParameters: {},
    rawBody: { data: null },
    body: {
      data: [
        {
          email: "user@example.com",
          event: "delivered",
          ip: "192.0.2.100",
          sg_event_id:
            "ZGVsaXZlcmVkLTAtMTIzNDU2NzgtRXhhbXBsZUV2ZW50SWQxMjM0NTY3ODkw",
          sg_message_id:
            "ExampleMessageId123.recvd-abc123def456-ghi789-1-12345678-9.0",
          "smtp-id": "<ExampleSmtpId123@example-server-01>",
          timestamp: 1700000000,
          tls: 1,
          response:
            "250 2.0.0 OK 1700000000 example123-abc456def789ghi012jkl345.123 - gsmtp",
        },
      ],
      contentType: "application/json",
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
    flow: {
      id: "testFlowId",
      name: "Test Flow",
      stableId: "example-stable-id",
    },
    startedAt: "2024-01-15T00:00:00.000Z",
    globalDebug: false,
  },
};
