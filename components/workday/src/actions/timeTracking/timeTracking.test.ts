import { invoke } from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import {
  deleteTimeClockEventsByIdExamplePayload,
  deleteWorkerTimeBlockExamplePayload,
  getTimeClockEventsByIdExamplePayload,
  getTimeClockEventsExamplePayload,
  getWorkerByIdExamplePayload,
  getWorkersExamplePayload,
  postWorkerTimeBlockExamplePayload,
  updateTimeClockEventsByIdExamplePayload,
  updateWorkerTimeBlockExamplePayload,
} from "../../examplePayloads";
import { oauthTestConnection, TEST_HOST } from "../../testHelpers";
import { deleteTimeClockEventsById } from "./deleteTimeClockEventsById";
import { deleteWorkerTimeBlock } from "./deleteWorkerTimeBlock";
import { getTimeClockEvents } from "./getTimeClockEvents";
import { getTimeClockEventsById } from "./getTimeClockEventsById";
import { getWorkerById } from "./getWorkerById";
import { getWorkers } from "./getWorkers";
import { postWorkerTimeBlock } from "./postWorkerTimeBlock";
import { updateTimeClockEventsById } from "./updateTimeClockEventsById";
import { updateWorkerTimeBlock } from "./updateWorkerTimeBlock";

const SERVICE = "/ccx/timeTracking/v7";

const timeBlockBody = {
  doNotBill: true,
  comment: "Client visit",
  id: "tb-1",
  descriptor: "Time Block",
  project: { id: "proj-1" },
};

beforeAll(() => nock.disableNetConnect());
afterAll(() => nock.enableNetConnect());
afterEach(() => {
  expect(nock.isDone()).toBe(true);
  nock.cleanAll();
});

describe("deleteTimeClockEventsById", () => {
  const params = {
    connection: oauthTestConnection(),
    timeClockEventId: "tce-1",
  };

  it("deletes the time clock event", async () => {
    nock(TEST_HOST)
      .delete(`${SERVICE}/timeClockEvents/tce-1`)
      .reply(200, deleteTimeClockEventsByIdExamplePayload.data);

    const { result } = await invoke(deleteTimeClockEventsById, params);
    expect(result).toEqual(deleteTimeClockEventsByIdExamplePayload);
  });

  it("surfaces a Workday error", async () => {
    nock(TEST_HOST)
      .delete(`${SERVICE}/timeClockEvents/tce-1`)
      .reply(404, { error: "not found" });

    await expect(invoke(deleteTimeClockEventsById, params)).rejects.toThrow();
  });
});

describe("deleteWorkerTimeBlock", () => {
  const params = {
    connection: oauthTestConnection(),
    workerId: "w-1",
    workerTimeBlockId: "tb-1",
  };

  it("deletes the worker time block", async () => {
    nock(TEST_HOST)
      .delete(`${SERVICE}/workers/w-1/workerTimeBlock/tb-1`)
      .reply(200, deleteWorkerTimeBlockExamplePayload.data);

    const { result } = await invoke(deleteWorkerTimeBlock, params);
    expect(result).toEqual(deleteWorkerTimeBlockExamplePayload);
  });

  it("surfaces a Workday error", async () => {
    nock(TEST_HOST)
      .delete(`${SERVICE}/workers/w-1/workerTimeBlock/tb-1`)
      .reply(404, { error: "not found" });

    await expect(invoke(deleteWorkerTimeBlock, params)).rejects.toThrow();
  });
});

describe("getTimeClockEvents", () => {
  const params = {
    connection: oauthTestConnection(),
    fetchAll: false,
    pagination: { limit: 10, offset: 20 },
    extraParameters: { worker: "w-1" },
  };

  it("returns one page with the query parameters", async () => {
    nock(TEST_HOST)
      .get(`${SERVICE}/timeClockEvents`)
      .query({ worker: "w-1", limit: 10, offset: 20 })
      .reply(200, getTimeClockEventsExamplePayload.data);

    const { result } = await invoke(getTimeClockEvents, params);
    expect(result).toEqual(getTimeClockEventsExamplePayload);
  });

  it("reads every page with Fetch All", async () => {
    const [event] = getTimeClockEventsExamplePayload.data.data;
    nock(TEST_HOST)
      .get(`${SERVICE}/timeClockEvents`)
      .query({ worker: "w-1", limit: 1, offset: 0 })
      .reply(200, { total: 2, data: [event] })
      .get(`${SERVICE}/timeClockEvents`)
      .query({ worker: "w-1", limit: 1, offset: 1 })
      .reply(200, { total: 2, data: [event] });

    const { result } = await invoke(getTimeClockEvents, {
      ...params,
      fetchAll: true,
      pagination: { limit: 1, offset: undefined },
    });
    expect(result).toEqual({ data: [event, event] });
  });

  it("surfaces a Workday error", async () => {
    nock(TEST_HOST)
      .get(`${SERVICE}/timeClockEvents`)
      .query(true)
      .reply(500, { error: "server error" });

    await expect(invoke(getTimeClockEvents, params)).rejects.toThrow();
  });
});

describe("getTimeClockEventsById", () => {
  const params = {
    connection: oauthTestConnection(),
    timeClockEventId: "tce-1",
  };

  it("returns the time clock event", async () => {
    nock(TEST_HOST)
      .get(`${SERVICE}/timeClockEvents/tce-1`)
      .reply(200, getTimeClockEventsByIdExamplePayload.data);

    const { result } = await invoke(getTimeClockEventsById, params);
    expect(result).toEqual(getTimeClockEventsByIdExamplePayload);
  });

  it("surfaces a Workday error", async () => {
    nock(TEST_HOST)
      .get(`${SERVICE}/timeClockEvents/tce-1`)
      .reply(404, { error: "not found" });

    await expect(invoke(getTimeClockEventsById, params)).rejects.toThrow();
  });
});

describe("getWorkerById", () => {
  const params = { connection: oauthTestConnection(), workerId: "w-1" };

  it("returns the worker", async () => {
    nock(TEST_HOST)
      .get(`${SERVICE}/workers/w-1`)
      .reply(200, getWorkerByIdExamplePayload.data);

    const { result } = await invoke(getWorkerById, params);
    expect(result).toEqual(getWorkerByIdExamplePayload);
  });

  it("surfaces a Workday error", async () => {
    nock(TEST_HOST)
      .get(`${SERVICE}/workers/w-1`)
      .reply(404, { error: "not found" });

    await expect(invoke(getWorkerById, params)).rejects.toThrow();
  });
});

describe("getWorkers", () => {
  const params = {
    connection: oauthTestConnection(),
    fetchAll: false,
    pagination: { limit: 10, offset: 20 },
    extraParameters: { search: "Logan" },
  };

  it("returns one page with the query parameters", async () => {
    nock(TEST_HOST)
      .get(`${SERVICE}/workers`)
      .query({ search: "Logan", limit: 10, offset: 20 })
      .reply(200, getWorkersExamplePayload.data);

    const { result } = await invoke(getWorkers, params);
    expect(result).toEqual(getWorkersExamplePayload);
  });

  it("surfaces a Workday error", async () => {
    nock(TEST_HOST)
      .get(`${SERVICE}/workers`)
      .query(true)
      .reply(500, { error: "server error" });

    await expect(invoke(getWorkers, params)).rejects.toThrow();
  });
});

describe("postWorkerTimeBlock", () => {
  const params = {
    connection: oauthTestConnection(),
    workerId: "w-1",
    doNotBill: true,
    comment: "Client visit",
    instanceId: "tb-1",
    instanceDescriptor: "Time Block",
    extraBody: { project: { id: "proj-1" } },
  };

  it("sends the mapped body merged with Extra Body", async () => {
    nock(TEST_HOST)
      .post(`${SERVICE}/workers/w-1/workerTimeBlock`, timeBlockBody)
      .reply(200, postWorkerTimeBlockExamplePayload.data);

    const { result } = await invoke(postWorkerTimeBlock, params);
    expect(result).toEqual(postWorkerTimeBlockExamplePayload);
  });

  it("surfaces a Workday error", async () => {
    nock(TEST_HOST)
      .post(`${SERVICE}/workers/w-1/workerTimeBlock`)
      .reply(400, { error: "invalid" });

    await expect(invoke(postWorkerTimeBlock, params)).rejects.toThrow();
  });
});

describe("updateTimeClockEventsById", () => {
  const params = {
    connection: oauthTestConnection(),
    timeClockEventId: "tce-1",
    instanceDescriptor: "Clock In",
    instanceHref: "https://wd.example.com/tce-1",
    instanceId: "tce-1",
    clockEventOverrideRate: 45,
    referenceId: "ref-1",
    assignmentIds: {
      clockEventTimeEntryCodeId: "tec-1",
      clockEventProjectId: "proj-1",
      clockEventProjectPlanTaskId: "task-1",
    },
    clockEventComment: "Adjusted",
    extraBody: { position: { id: "pos-1" } },
  };

  it("sends the mapped body with PUT and returns the event", async () => {
    nock(TEST_HOST)
      .put(`${SERVICE}/timeClockEvents/tce-1`, {
        overrideRate: 45,
        reference_ID: "ref-1",
        timeEntryCode: { id: "tec-1" },
        projectPlanTask: { id: "task-1" },
        project: { id: "proj-1" },
        comment: "Adjusted",
        id: "tce-1",
        href: "https://wd.example.com/tce-1",
        descriptor: "Clock In",
        position: { id: "pos-1" },
      })
      .reply(200, updateTimeClockEventsByIdExamplePayload.data);

    const { result } = await invoke(updateTimeClockEventsById, params);
    expect(result).toEqual(updateTimeClockEventsByIdExamplePayload);
  });

  it("does not throw when assignmentIds is not set", async () => {
    const { assignmentIds: _unset, ...withoutKey } = params;
    nock(TEST_HOST)
      .put(`${SERVICE}/timeClockEvents/tce-1`)
      .reply(200, updateTimeClockEventsByIdExamplePayload.data);

    const { result } = await invoke(
      updateTimeClockEventsById,
      withoutKey as typeof params,
    );
    expect(result).toEqual(updateTimeClockEventsByIdExamplePayload);
  });

  it("surfaces a Workday error", async () => {
    nock(TEST_HOST)
      .put(`${SERVICE}/timeClockEvents/tce-1`)
      .reply(400, { error: "invalid" });

    await expect(invoke(updateTimeClockEventsById, params)).rejects.toThrow();
  });
});

describe("updateWorkerTimeBlock", () => {
  const params = {
    connection: oauthTestConnection(),
    workerId: "w-1",
    workerTimeBlockId: "tb-1",
    doNotBill: true,
    comment: "Client visit",
    instanceId: "tb-1",
    instanceDescriptor: "Time Block",
    extraBody: { project: { id: "proj-1" } },
  };

  it("sends the mapped body with PATCH and returns the time block", async () => {
    nock(TEST_HOST)
      .patch(`${SERVICE}/workers/w-1/workerTimeBlock/tb-1`, timeBlockBody)
      .reply(200, updateWorkerTimeBlockExamplePayload.data);

    const { result } = await invoke(updateWorkerTimeBlock, params);
    expect(result).toEqual(updateWorkerTimeBlockExamplePayload);
  });

  it("surfaces a Workday error", async () => {
    nock(TEST_HOST)
      .patch(`${SERVICE}/workers/w-1/workerTimeBlock/tb-1`)
      .reply(404, { error: "not found" });

    await expect(invoke(updateWorkerTimeBlock, params)).rejects.toThrow();
  });
});
