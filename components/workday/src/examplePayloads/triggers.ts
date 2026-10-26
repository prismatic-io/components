import type { TriggerPayload } from "@prismatic-io/spectral";
const triggerPayloadEnvelope: Omit<TriggerPayload, "body"> = {
  headers: {},
  queryParameters: {},
  rawBody: { data: null },
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
  flow: { id: "testFlowId", stableId: "testFlowStableId", name: "Test Flow" },
  startedAt: "2024-01-15T00:00:00.000Z",
  globalDebug: false,
};
export const raasReportPollingTriggerExamplePayload: {
  payload: TriggerPayload;
} = {
  payload: {
    ...triggerPayloadEnvelope,
    body: {
      data: {
        changed: [
          {
            Employee_ID: "21001",
            Worker: "Logan McNeil",
            Business_Title: "Vice President, Human Resources",
            Supervisory_Organization: "Human Resources (Logan McNeil)",
            Last_Updated: "2026-10-15T11:58:42.000-07:00",
          },
        ],
      },
    },
  },
};
export const wqlQueryPollingTriggerExamplePayload: {
  payload: TriggerPayload;
} = {
  payload: {
    ...triggerPayloadEnvelope,
    body: {
      data: {
        changed: [
          {
            workdayID: "c4f78be1a8f14da0ab49ce1162348a5e",
            approvalDate: "2026-10-15",
          },
        ],
      },
    },
  },
};
export const newEventStepsPollingTriggerExamplePayload: {
  payload: TriggerPayload;
} = {
  payload: {
    ...triggerPayloadEnvelope,
    body: {
      data: {
        created: [
          {
            id: "8f2a6c1e9b7d4e3fa1c05d2b6e4f7a90",
            descriptor: "Review Time Off Request: Logan McNeil",
            creationDate: "2026-10-15",
            dueDate: "2026-10-17",
            order: "b",
            stepType: {
              id: "d9e4223e446c11de98360015c5e6daf6",
              descriptor: "Approval",
            },
            businessProcess: {
              id: "3cb0fdb7e3354a05b0a5e1c8a9d0f4b2",
              descriptor: "Request Time Off",
            },
            status: {
              id: "d9e41a8c446c11de98360015c5e6daf6",
              descriptor: "Awaiting Action",
            },
            event: {
              id: "1b6e9a4c2f8d4b7e9c3a5d0f2e6b8a14",
              descriptor: "Request Time Off: Logan McNeil on 10/20/2026",
            },
            awaitingPersons: [
              {
                id: "3aa5550b7fe348b98d7b5741afc65534",
                descriptor: "Logan McNeil",
              },
            ],
          },
        ],
      },
    },
  },
};
