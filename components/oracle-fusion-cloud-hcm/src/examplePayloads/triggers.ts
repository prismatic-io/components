import type { TriggerPayload } from "@prismatic-io/spectral";
import type { AtomFeedEntry, Worker } from "../types";
const triggerPayloadWrapper: Omit<TriggerPayload, "body"> = {
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
  flow: { id: "testFlowId", name: "Test Flow", stableId: "testFlowStableId" },
  startedAt: "2024-01-15T00:00:00.000Z",
  globalDebug: false,
};
const newHireEntry: AtomFeedEntry = {
  id: "Workers-300100099990042-NewHire",
  feedName: "NewHire",
  updated: "2026-05-13T09:15:00.000Z",
  published: "2026-05-13T09:15:00.000Z",
  changedAttributes: [],
  content: {
    Workers: {
      PersonId: 300100099990042,
      PersonNumber: "EMP042",
      DisplayName: "Maria Garcia",
      FirstName: "Maria",
      LastName: "Garcia",
      FullName: "Garcia, Maria",
      WorkEmail: "maria.garcia@example.com",
      CreationDate: "2026-05-13T09:15:00.000Z",
      LastUpdateDate: "2026-05-13T09:15:00.000Z",
    },
  },
};
const employeeUpdateEntry: AtomFeedEntry = {
  id: "Workers-300100099990042-EmployeeUpdate",
  feedName: "EmployeeUpdate",
  updated: "2026-05-13T10:30:00.000Z",
  published: "2026-05-13T09:15:00.000Z",
  changedAttributes: ["WorkEmail", "DisplayName", "LastName"],
  content: {
    Workers: {
      PersonId: 300100099990042,
      PersonNumber: "EMP042",
      DisplayName: "Maria Garcia-Lopez",
      FirstName: "Maria",
      LastName: "Garcia-Lopez",
      FullName: "Garcia-Lopez, Maria",
      WorkEmail: "maria.garcia-lopez@example.com",
      CreationDate: "2026-05-13T09:15:00.000Z",
      LastUpdateDate: "2026-05-13T10:30:00.000Z",
    },
  },
};
export const pollChangesExamplePayload = {
  payload: {
    ...triggerPayloadWrapper,
    body: {
      data: {
        entries: [newHireEntry, employeeUpdateEntry] as AtomFeedEntry[],
      },
    },
  } as TriggerPayload,
  polledNoChanges: false,
};
const workerRecord: Worker = {
  PersonId: 300100099990042,
  PersonNumber: "EMP042",
  DisplayName: "Maria Garcia-Lopez",
  FirstName: "Maria",
  LastName: "Garcia-Lopez",
  FullName: "Garcia-Lopez, Maria",
  WorkEmail: "maria.garcia-lopez@example.com",
  CreationDate: "2026-05-13T09:15:00.000Z",
  LastUpdateDate: "2026-05-13T10:30:00.000Z",
};
export const pollRecordsExamplePayload = {
  payload: {
    ...triggerPayloadWrapper,
    body: {
      data: {
        records: [workerRecord] as Worker[],
        resourceType: "Workers",
      },
    },
  } as TriggerPayload,
  polledNoChanges: false,
};
