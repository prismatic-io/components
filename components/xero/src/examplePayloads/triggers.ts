import type { TriggerPayload } from "@prismatic-io/spectral";

const sampleCreatedContact = {
  ContactID: "a4c2f1e8-3d56-4b91-9f07-2e8a1c6d5b34",
  ContactStatus: "ACTIVE",
  Name: "Jane Smith",
  EmailAddress: "jane.smith@widgetco.com",
  Addresses: [
    {
      AddressType: "STREET",
      AddressLine1: "123 Main St",
      City: "Portland",
      Region: "OR",
      PostalCode: "97201",
      Country: "US",
    },
  ],
  Phones: [{ PhoneType: "DEFAULT", PhoneNumber: "503-555-0142" }],
  UpdatedDateUTC: "/Date(1650000000000+0000)/",
  ContactGroups: [],
  IsSupplier: false,
  IsCustomer: true,
  ContactPersons: [],
  HasAttachments: false,
  HasValidationErrors: false,
};

const sampleUpdatedContact = {
  ...sampleCreatedContact,
  ContactID: "b5d3a2f9-4e67-4c12-8a18-3f9b2d7e6c45",
  Name: "Acme Supplies Ltd",
  EmailAddress: "billing@acmesupplies.com",
  IsSupplier: true,
  IsCustomer: false,
  UpdatedDateUTC: "/Date(1650003600000+0000)/",
};

export const pollChangesTriggerExamplePayload: { payload: TriggerPayload } = {
  payload: {
    headers: {},
    queryParameters: {},
    rawBody: { data: null },
    body: {
      data: {
        created: [sampleCreatedContact],
        updated: [sampleUpdatedContact],
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

export const webhookExamplePayload: {
  response: { contentType: string; statusCode: number };
  payload: TriggerPayload;
} = {
  response: {
    contentType: "application/json; charset=UTF-8",
    statusCode: 200,
  },
  payload: {
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
      Host: "hooks.example.com",
      "x-xero-signature": "ubUJMsDNGuunnCBc/n1g0wc2SpjplAb",
    },
    body: {
      data: {
        events: null,
        firstEventSequence: 0,
        lastEventSequence: 0,
        entropy: "FMLHZNKCVK",
      },
      contentType: "application/json; charset=UTF-8",
    },
    rawBody: { data: Buffer.from("Example") },
    queryParameters: {},
    webhookUrls: {
      "Flow 1":
        "https://hooks.example.com/trigger/EXAMPLEGbG93Q29uZmlnOmRlNmNmNDMyLTliNWMtN0005NDMxLTRmYzA4ZjViODgxOA==",
    },
    webhookApiKeys: {
      "Flow 1": ["abc-123"],
    },
    customer: {
      externalId: "customer-example-external-id",
      name: "John Doe",
      id: "",
    },
    pathFragment: "",
    invokeUrl: "",
    executionId: "",
    instance: {
      id: "",
      name: "",
    },
    user: {
      id: "",
      name: "",
      email: "",
      externalId: "",
    },
    integration: {
      id: "",
      name: "",
      versionSequenceId: "",
      externalVersion: "",
    },
    flow: {
      id: "",
      name: "",
      stableId: "",
    },
    startedAt: "",
    globalDebug: false,
  },
};
