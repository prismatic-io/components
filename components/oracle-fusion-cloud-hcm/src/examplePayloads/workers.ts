import type { Element } from "@prismatic-io/spectral";
import type { OracleHcmListResponse, Worker, WorkerRecord } from "../types";
const workerExample: Worker = {
  PersonId: 100000012345678,
  PersonNumber: "955160008186257",
  DisplayName: "Jane Smith",
  FirstName: "Jane",
  LastName: "Smith",
  FullName: "Smith, Jane",
  WorkEmail: "jane.smith@example.com",
  CreationDate: "2023-01-15T10:00:00+00:00",
  LastUpdateDate: "2024-03-01T08:30:00+00:00",
};
const workerRecordExample: WorkerRecord = {
  PersonId: 100000012345678,
  PersonNumber: "955160008186257",
  DisplayName: "Jane Smith",
  FullName: "Smith, Jane",
  DateOfBirth: "1990-04-12",
  CreationDate: "2023-01-15T10:00:00+00:00",
  LastUpdateDate: "2024-03-01T08:30:00+00:00",
  workersUniqID: "00020000000EACED00057708000110F09B9C1A70",
};
export const listPublicWorkersExamplePayload: {
  data: OracleHcmListResponse<Worker>;
} = {
  data: {
    items: [workerExample],
    count: 1,
    hasMore: false,
    limit: 25,
    offset: 0,
  },
};
export const getPublicWorkerExamplePayload: {
  data: Worker;
} = {
  data: workerExample,
};
export const listWorkersExamplePayload: {
  data: OracleHcmListResponse<WorkerRecord>;
} = {
  data: {
    items: [workerRecordExample],
    count: 1,
    hasMore: false,
    limit: 25,
    offset: 0,
  },
};
export const getWorkerExamplePayload: {
  data: WorkerRecord;
} = {
  data: workerRecordExample,
};
export const createWorkerExamplePayload: {
  data: WorkerRecord;
} = {
  data: {
    ...workerRecordExample,
    PersonId: 100000098765432,
    PersonNumber: "955160009999999",
  },
};
export const updateWorkerExamplePayload: {
  data: WorkerRecord;
} = {
  data: { ...workerRecordExample, LastUpdateDate: "2024-06-01T12:00:00+00:00" },
};
export const selectPersonIdExamplePayload: {
  result: Element[];
} = {
  result: [{ key: "100000012345678", label: "955160008186257 - Jane Smith" }],
};
