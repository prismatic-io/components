import type { TriggerPayload } from "@prismatic-io/spectral";














export const pollChangesExamplePayload: { payload: TriggerPayload } = {
  payload: {
    headers: {},
    queryParameters: {},
    rawBody: { data: null },
    body: {
      data: {
        created: [
          {
            Id: "61",
            SyncToken: "0",
            DisplayName: "Acme Corporation",
            CompanyName: "Acme Corporation",
            PrimaryEmailAddr: { Address: "billing@acme.example.com" },
            Active: true,
            Balance: 0,
            domain: "QBO",
            sparse: false,
            MetaData: {
              CreateTime: "2026-05-25T14:30:00-07:00",
              LastUpdatedTime: "2026-05-25T14:30:00-07:00",
            },
          },
        ],
        updated: [
          {
            Id: "55",
            SyncToken: "3",
            DisplayName: "Fabrikam, Inc.",
            CompanyName: "Fabrikam, Inc.",
            PrimaryEmailAddr: { Address: "ap@fabrikam.example.com" },
            Active: true,
            Balance: 1250.5,
            domain: "QBO",
            sparse: false,
            MetaData: {
              CreateTime: "2026-04-12T09:00:00-07:00",
              LastUpdatedTime: "2026-05-25T15:45:00-07:00",
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
