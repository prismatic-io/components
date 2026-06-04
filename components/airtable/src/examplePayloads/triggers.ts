import type { TriggerPayload } from "@prismatic-io/spectral";














export const webhookTriggerExamplePayload = {
  payload: {
    headers: {
      Accept: "*/*",
      "Content-Type": "application/json",
      Host: "hooks.example.com",
      "User-Agent": "Airtable Webhooks",
      "X-Airtable-Content-MAC": "hmacSHA256=abc123...",
    },
    queryParameters: {},
    rawBody: {
      data: "<data (547 bytes)>",
    },
    body: {
      data: [
        {
          id: "recZ6qSLw0OCA6Xul",
          fields: {
            Name: "Example Record",
            Status: "Active",
            Priority: "High",
          },
          createdTime: "2023-01-01T00:00:00.000Z",
        },
      ],
      contentType: "application/json",
    },
    pathFragment: "",
    webhookUrls: {
      "Flow 1": "https://hooks.example.com/trigger/EXAMPLE_TRIGGER_ID_1",
    },
    webhookApiKeys: {
      "Flow 1": ["example-api-key-1"],
      "Airtable Flow": ["example-api-key-2"],
    },
    invokeUrl: "https://hooks.example.com/trigger/EXAMPLE_TRIGGER_ID_1",
    executionId: "ExecutionResult:example-execution-id-1234",
    customer: {
      id: "Q3VzdG9tZXI6ZXhhbXBsZS1jdXN0b21lci1pZA==",
      name: "Example Customer",
      externalId: "customer-12345",
    },
    instance: {
      id: "SW5zdGFuY2U6ZXhhbXBsZS1pbnN0YW5jZS1pZA==",
      name: "Example Instance",
    },
    user: {
      id: "VXNlcjpleGFtcGxlLXVzZXItaWQ=",
      email: "user@example.com",
      name: "Jane Doe",
      externalId: "user-67890",
    },
    integration: {
      name: "Airtable Integration",
      id: "SW50ZWdyYXRpb246YWlydGFibGUtaW50ZWdyYXRpb24=",
      versionSequenceId: "1",
      externalVersion: "1.0.0",
    },
    flow: {
      name: "Airtable Webhook Flow",
      id: "Rmxvdzp3ZWJob29rLWZsb3c=",
    },
    startedAt: "2023-01-01T00:00:00.000Z",
    globalDebug: false,
  },
};










export const baseChangesTriggerExamplePayload = {
  payload: {
    headers: {
      Accept: "*/*",
      "Content-Type": "application/json",
      Host: "hooks.example.com",
      "User-Agent": "Airtable Webhooks",
      "X-Airtable-Content-MAC": "hmacSHA256=abc123def456...",
    },
    queryParameters: {},
    rawBody: {
      data: "<data (1024 bytes)>",
    },
    body: {
      data: {
        expirationTime: "2023-02-15T10:30:00.000Z",
        message: "Webhook notification received",
      },
    },
    pathFragment: "",
    webhookUrls: {
      "Base Changes Flow":
        "https://hooks.example.com/trigger/BASE_CHANGES_TRIGGER",
    },
    webhookApiKeys: {
      "Base Changes Flow": ["api-key-base-changes"],
    },
    invokeUrl: "https://hooks.example.com/trigger/BASE_CHANGES_TRIGGER",
    executionId: "ExecutionResult:base-changes-execution-456",
    customer: {
      id: "Q3VzdG9tZXI6ZXhhbXBsZS1jdXN0b21lci1pZA==",
      name: "Example Customer",
      externalId: "customer-12345",
    },
    instance: {
      id: "SW5zdGFuY2U6ZXhhbXBsZS1pbnN0YW5jZS1pZA==",
      name: "Airtable Base Monitor Instance",
    },
    user: {
      id: "VXNlcjpleGFtcGxlLXVzZXItaWQ=",
      email: "user@example.com",
      name: "Jane Doe",
      externalId: "user-67890",
    },
    integration: {
      name: "Airtable Base Changes",
      id: "SW50ZWdyYXRpb246YWlydGFibGUtYmFzZS1jaGFuZ2Vz",
      versionSequenceId: "1",
      externalVersion: "1.0.0",
    },
    flow: {
      name: "Monitor Base Changes",
      id: "RmxvdzpiYXNlLWNoYW5nZXM=",
    },
    startedAt: "2023-01-15T10:30:00.000Z",
    globalDebug: false,
  },
  branch: "Notification",
};



















export const pollChangesTriggerExamplePayload: { payload: TriggerPayload } = {
  payload: {
    headers: {},
    queryParameters: {},
    rawBody: { data: null },
    body: {
      data: {
        created: [
          {
            id: "recABCDEFGHIJ1234",
            createdTime: "2026-05-25T14:30:00.000Z",
            fields: {
              Name: "Acme Spring Launch",
              Status: "Active",
              Notes: "Newly created campaign record.",
            },
          },
        ],
        updated: [
          {
            id: "recXYZWVUTSR5678",
            createdTime: "2026-04-10T09:15:00.000Z",
            fields: {
              Name: "Q1 Holiday Campaign",
              Status: "Completed",
              Notes: "Existing record, modified after last poll.",
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
