import {
  defaultTriggerPayload,
  loggerMock,
} from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import { vi } from "vitest";
import { pollChangesTriggerExamplePayload } from "../examplePayloads";
import { api, connection, prefix } from "../testHelpers";
import type {
  PollingChangesObject,
  PollingRecordChange,
  PollingState,
  ServiceTitanRecord,
} from "../types";
import { resolvePollingRecordChanges } from "../util";
import { pollChangesTrigger } from "./pollChangesTrigger";
const createdJob: ServiceTitanRecord = {
  id: 24815,
  jobNumber: "24815",
  createdOn: "2026-08-19T14:02:11.000Z",
  modifiedOn: "2026-08-19T14:02:11.000Z",
};
const createdJobTwo: ServiceTitanRecord = {
  id: 24816,
  jobNumber: "24816",
  createdOn: "2026-08-19T14:03:44.000Z",
  modifiedOn: "2026-08-19T14:03:44.000Z",
};
const updatedJob: ServiceTitanRecord = {
  id: 24790,
  jobNumber: "24790",
  createdOn: "2026-08-17T09:15:04.000Z",
  modifiedOn: "2026-08-19T13:42:07.000Z",
};
const updatedJobTwo: ServiceTitanRecord = {
  id: 24791,
  jobNumber: "24791",
  createdOn: "2026-08-17T10:01:00.000Z",
  modifiedOn: "2026-08-19T13:45:19.000Z",
};
describe("pollChangesTrigger batching declaration", () => {
  test("New and Updated Records declares opt-in batching with a default batch size", () => {
    expect(pollChangesTrigger.triggerResolverSupport).toBe("valid");
    expect(pollChangesTrigger.batchConfig).toEqual({ batchSize: 50 });
    expect(pollChangesTrigger.triggerResolver?.resolveItems).toBeInstanceOf(
      Function,
    );
  });
});
describe("resolvePollingRecordChanges", () => {
  test("tags every record with how it changed", () => {
    expect(
      resolvePollingRecordChanges({
        created: [createdJob],
        updated: [updatedJob],
      }),
    ).toEqual<PollingRecordChange[]>([
      { changeType: "created", record: createdJob },
      { changeType: "updated", record: updatedJob },
    ]);
  });
  test("emits created records before updated records, preserving source order", () => {
    expect(
      resolvePollingRecordChanges({
        created: [createdJob, createdJobTwo],
        updated: [updatedJob, updatedJobTwo],
      }),
    ).toEqual<PollingRecordChange[]>([
      { changeType: "created", record: createdJob },
      { changeType: "created", record: createdJobTwo },
      { changeType: "updated", record: updatedJob },
      { changeType: "updated", record: updatedJobTwo },
    ]);
  });
  test("returns [] for an empty or undefined changes object", () => {
    expect(resolvePollingRecordChanges({ created: [], updated: [] })).toEqual(
      [],
    );
    expect(resolvePollingRecordChanges(undefined)).toEqual([]);
  });
  test("emits only the enabled change type when a toggle empties the other array", () => {
    expect(
      resolvePollingRecordChanges({ created: [createdJob], updated: [] }),
    ).toEqual<PollingRecordChange[]>([
      { changeType: "created", record: createdJob },
    ]);
    expect(
      resolvePollingRecordChanges({ created: [], updated: [updatedJob] }),
    ).toEqual<PollingRecordChange[]>([
      { changeType: "updated", record: updatedJob },
    ]);
  });
});
describe("pollChangesTrigger resolveItems", () => {
  test("flattens the payload shape perform actually returns", () => {
    const payload = {
      ...pollChangesTriggerExamplePayload.payload,
      body: { data: { created: [createdJob], updated: [updatedJob] } },
    };
    expect(
      pollChangesTrigger.triggerResolver?.resolveItems?.({} as never, {
        payload,
      }),
    ).toEqual<PollingRecordChange[]>([
      { changeType: "created", record: createdJob },
      { changeType: "updated", record: updatedJob },
    ]);
  });
  test("returns [] for the no-changes payload perform emits alongside polledNoChanges", () => {
    const payload = {
      ...pollChangesTriggerExamplePayload.payload,
      body: { data: { created: [], updated: [] } },
    };
    expect(
      pollChangesTrigger.triggerResolver?.resolveItems?.({} as never, {
        payload,
      }),
    ).toEqual([]);
  });
});
type PerformContext = Parameters<typeof pollChangesTrigger.perform>[0];
type PerformPayload = Parameters<typeof pollChangesTrigger.perform>[1];
const JPM_PREFIX = prefix("jpm");
const listPage = (records: ServiceTitanRecord[]) => ({
  data: records,
  hasMore: false,
});
const pollingContext = (store: PollingState): PerformContext =>
  ({
    logger: loggerMock(),
    debug: { enabled: false },
    polling: {
      getState: () => store,
      setState: (state: PollingState) => {
        for (const key of Object.keys(store)) {
          delete store[key];
        }
        Object.assign(store, state);
      },
    },
  }) as unknown as PerformContext;
const params = (overrides: Record<string, unknown> = {}) =>
  ({
    connection,
    resourceType: "jobs",
    showNewRecords: true,
    showUpdatedRecords: true,
    ...overrides,
  }) as unknown as Parameters<typeof pollChangesTrigger.perform>[2];
const poll = (store: PollingState, overrides?: Record<string, unknown>) =>
  pollChangesTrigger.perform(
    pollingContext(store),
    defaultTriggerPayload() as PerformPayload,
    params(overrides),
  );
const changesOf = (result: {
  payload: {
    body: {
      data: unknown;
    };
  };
}) => result.payload.body.data as PollingChangesObject;
const T0 = "2026-08-19T12:00:00.000Z";
const T1 = "2026-08-19T13:00:00.000Z";
const T2 = "2026-08-19T14:00:00.000Z";
describe("pollChangesTrigger perform", () => {
  beforeEach(() => {
    vi.useFakeTimers({ toFake: ["Date"] });
  });
  afterEach(() => {
    vi.useRealTimers();
    nock.cleanAll();
  });
  test("sends the previous poll's cursor as the next poll's filter", async () => {
    const store: PollingState = { lastPolledAt: T0 };
    const sentFilters: (string | undefined)[] = [];
    const withFilterCapture = () =>
      api()
        .get(`${JPM_PREFIX}/jobs`)
        .query((q) => {
          sentFilters.push(q.modifiedOnOrAfter as string);
          return true;
        });
    withFilterCapture().reply(200, listPage([updatedJob]));
    withFilterCapture().reply(200, listPage([createdJobTwo]));
    vi.setSystemTime(new Date(T1));
    await poll(store);
    expect(store.lastPolledAt).toBe(updatedJob.modifiedOn);
    vi.setSystemTime(new Date(T2));
    await poll(store);
    expect(store.lastPolledAt).toBe(createdJobTwo.modifiedOn);
    expect(sentFilters).toEqual([T0, updatedJob.modifiedOn]);
  });
  test("holds the cursor when a poll returns no records", async () => {
    const store: PollingState = { lastPolledAt: T0 };
    api().get(`${JPM_PREFIX}/jobs`).query(true).reply(200, listPage([]));
    vi.setSystemTime(new Date(T2));
    await poll(store);
    expect(store.lastPolledAt).toBe(T0);
  });
  test("advances the cursor to the newest record it emitted, not to the wall clock", async () => {
    const store: PollingState = { lastPolledAt: T0 };
    api()
      .get(`${JPM_PREFIX}/jobs`)
      .query(true)
      .reply(200, listPage([updatedJob]));
    vi.setSystemTime(new Date(T2));
    await poll(store);
    expect(store.lastPolledAt).toBe(updatedJob.modifiedOn);
  });
  test("reports polledNoChanges on a second poll that returns nothing newer than the cursor", async () => {
    const store: PollingState = { lastPolledAt: T0 };
    const job: ServiceTitanRecord = {
      id: 24815,
      createdOn: "2026-08-19T12:30:00.000Z",
      modifiedOn: "2026-08-19T12:30:00.000Z",
    };
    api()
      .get(`${JPM_PREFIX}/jobs`)
      .query(true)
      .times(3)
      .reply(200, listPage([job]));
    vi.setSystemTime(new Date(T1));
    const first = await poll(store);
    expect(first.polledNoChanges).toBe(false);
    expect(changesOf(first).created).toEqual([job]);
    vi.setSystemTime(new Date(T2));
    const second = await poll(store);
    expect(second.polledNoChanges).toBe(true);
    expect(changesOf(second)).toEqual({ created: [], updated: [] });
    const third = await poll(store);
    expect(third.polledNoChanges).toBe(true);
    expect(changesOf(third)).toEqual({ created: [], updated: [] });
  });
  test("delivers a record at the cursor boundary that an earlier poll did not deliver", async () => {
    const store: PollingState = { lastPolledAt: T0 };
    const seen: ServiceTitanRecord = { id: 1, createdOn: T1, modifiedOn: T1 };
    const unseen: ServiceTitanRecord = { id: 2, createdOn: T1, modifiedOn: T1 };
    api()
      .get(`${JPM_PREFIX}/jobs`)
      .query(true)
      .reply(200, listPage([seen]));
    api()
      .get(`${JPM_PREFIX}/jobs`)
      .query(true)
      .times(2)
      .reply(200, listPage([seen, unseen]));
    vi.setSystemTime(new Date(T2));
    const first = await poll(store);
    expect(changesOf(first).created).toEqual([seen]);
    expect(store.lastPolledAt).toBe(T1);
    const second = await poll(store);
    expect(changesOf(second).created).toEqual([unseen]);
    const third = await poll(store);
    expect(third.polledNoChanges).toBe(true);
    expect(changesOf(third)).toEqual({ created: [], updated: [] });
  });
  test("orders the drain oldest-first so a bounded drain resumes where it stopped", async () => {
    let sentSort: string | undefined;
    api()
      .get(`${JPM_PREFIX}/jobs`)
      .query((q) => {
        sentSort = q.sort as string;
        return true;
      })
      .reply(200, listPage([]));
    await poll({ lastPolledAt: T0 });
    expect(sentSort).toBe("+ModifiedOn");
  });
  test("stops draining at the batched record limit instead of fetching every page", async () => {
    const page = (from: number): ServiceTitanRecord[] =>
      Array.from({ length: 500 }, (_, i) => ({
        id: from + i,
        createdOn: T1,
        modifiedOn: T1,
      }));
    let requests = 0;
    api()
      .get(`${JPM_PREFIX}/jobs`)
      .query(() => {
        requests += 1;
        return true;
      })
      .times(3)
      .reply(200, { data: page(requests * 1000), hasMore: true });
    const store: PollingState = { lastPolledAt: T0 };
    await pollChangesTrigger.perform(
      {
        ...pollingContext(store),
        batch: { enabled: true, batchSize: 50 },
      } as unknown as PerformContext,
      defaultTriggerPayload() as PerformPayload,
      params(),
    );
    expect(requests).toBe(2);
  });
  test("sends no sort and applies no cap for a resource with no documented sort parameter", async () => {
    const page = (from: number): ServiceTitanRecord[] =>
      Array.from({ length: 500 }, (_, i) => ({
        id: from + i,
        createdOn: T1,
        modifiedOn: T1,
      }));
    const sentSorts: (string | undefined)[] = [];
    let requests = 0;
    api()
      .get(`${prefix("settings")}/technicians`)
      .query((q) => {
        sentSorts.push(q.sort as string | undefined);
        requests += 1;
        return true;
      })
      .times(3)
      .reply(200, () => ({
        data: page(requests * 1000),
        hasMore: requests < 3,
      }));
    const store: PollingState = { lastPolledAt: T0 };
    await pollChangesTrigger.perform(
      {
        ...pollingContext(store),
        batch: { enabled: true, batchSize: 50 },
      } as unknown as PerformContext,
      defaultTriggerPayload() as PerformPayload,
      params({ resourceType: "technicians" }),
    );
    expect(sentSorts).toEqual([undefined, undefined, undefined]);
    expect(requests).toBe(3);
  });
  test("throws for a resource type with no polling configuration", async () => {
    await expect(
      poll({ lastPolledAt: T0 }, { resourceType: "widgets" }),
    ).rejects.toThrow("Unsupported resource type: widgets");
  });
  test("empties the created bucket when Show New Records is off, keeping both keys", async () => {
    const created: ServiceTitanRecord = {
      id: 24815,
      createdOn: "2026-08-19T12:30:00.000Z",
      modifiedOn: "2026-08-19T12:30:00.000Z",
    };
    const updated: ServiceTitanRecord = {
      id: 24790,
      createdOn: "2026-08-17T09:15:04.000Z",
      modifiedOn: "2026-08-19T12:45:00.000Z",
    };
    api()
      .get(`${JPM_PREFIX}/jobs`)
      .query(true)
      .reply(200, listPage([created, updated]));
    vi.setSystemTime(new Date(T1));
    const result = await poll({ lastPolledAt: T0 }, { showNewRecords: false });
    expect(changesOf(result)).toEqual({ created: [], updated: [updated] });
    expect(result.polledNoChanges).toBe(false);
  });
  test("empties the updated bucket when Show Updated Records is off, keeping both keys", async () => {
    const created: ServiceTitanRecord = {
      id: 24815,
      createdOn: "2026-08-19T12:30:00.000Z",
      modifiedOn: "2026-08-19T12:30:00.000Z",
    };
    const updated: ServiceTitanRecord = {
      id: 24790,
      createdOn: "2026-08-17T09:15:04.000Z",
      modifiedOn: "2026-08-19T12:45:00.000Z",
    };
    api()
      .get(`${JPM_PREFIX}/jobs`)
      .query(true)
      .reply(200, listPage([created, updated]));
    vi.setSystemTime(new Date(T1));
    const result = await poll(
      { lastPolledAt: T0 },
      { showUpdatedRecords: false },
    );
    expect(changesOf(result)).toEqual({ created: [created], updated: [] });
    expect(result.polledNoChanges).toBe(false);
  });
});
const LOOK_BACK = "2026-08-01T00:00:00.000Z";
const backfillUpdatedJob: ServiceTitanRecord = {
  id: 24700,
  jobNumber: "24700",
  createdOn: "2026-07-10T08:00:00.000Z",
  modifiedOn: "2026-08-15T11:30:00.000Z",
};
describe("pollChangesTrigger look-back initial sync", () => {
  beforeEach(() => {
    vi.useFakeTimers({ toFake: ["Date"] });
  });
  afterEach(() => {
    vi.useRealTimers();
    nock.cleanAll();
  });
  test("bootstraps the cursor to now and emits nothing historical without a look-back date", async () => {
    const store: PollingState = {};
    let sentFilter: string | undefined;
    api()
      .get(`${JPM_PREFIX}/jobs`)
      .query((q) => {
        sentFilter = q.modifiedOnOrAfter as string;
        return true;
      })
      .reply(200, listPage([backfillUpdatedJob]));
    vi.setSystemTime(new Date(T1));
    const result = await poll(store);
    expect(sentFilter).toBe(T1);
    expect(changesOf(result)).toEqual({ created: [], updated: [] });
    expect(result.polledNoChanges).toBe(true);
    expect(store.lastPolledAt).toBe(T1);
  });
  test("seeds the first poll's window from the look-back date and emits the backlog", async () => {
    const store: PollingState = {};
    let sentFilter: string | undefined;
    api()
      .get(`${JPM_PREFIX}/jobs`)
      .query((q) => {
        sentFilter = q.modifiedOnOrAfter as string;
        return true;
      })
      .reply(200, listPage([backfillUpdatedJob, createdJob]));
    vi.setSystemTime(new Date(T1));
    const result = await poll(store, { lookBackDate: LOOK_BACK });
    expect(sentFilter).toBe(LOOK_BACK);
    expect(changesOf(result)).toEqual({
      created: [createdJob],
      updated: [backfillUpdatedJob],
    });
    expect(store.lastPolledAt).toBe(createdJob.modifiedOn);
    expect(store.backfillActive).toBeUndefined();
  });
  test("the initial sync seeds a complete starting state, ignoring the visibility toggles", async () => {
    const store: PollingState = {};
    api()
      .get(`${JPM_PREFIX}/jobs`)
      .query(true)
      .reply(200, listPage([backfillUpdatedJob, createdJob]));
    vi.setSystemTime(new Date(T1));
    const result = await poll(store, {
      lookBackDate: LOOK_BACK,
      showNewRecords: false,
      showUpdatedRecords: false,
    });
    expect(changesOf(result)).toEqual({
      created: [createdJob],
      updated: [backfillUpdatedJob],
    });
  });
  test("ignores a look-back date once a cursor exists, so adding one later changes nothing", async () => {
    const store: PollingState = { lastPolledAt: T0 };
    let sentFilter: string | undefined;
    api()
      .get(`${JPM_PREFIX}/jobs`)
      .query((q) => {
        sentFilter = q.modifiedOnOrAfter as string;
        return true;
      })
      .reply(200, listPage([backfillUpdatedJob]));
    vi.setSystemTime(new Date(T1));
    const result = await poll(store, {
      lookBackDate: LOOK_BACK,
      showUpdatedRecords: false,
    });
    expect(sentFilter).toBe(T0);
    expect(changesOf(result)).toEqual({ created: [], updated: [] });
  });
  test("a truncated batched backfill keeps seed semantics until the drain completes", async () => {
    const store: PollingState = {};
    const pollBatched = (overrides?: Record<string, unknown>) =>
      pollChangesTrigger.perform(
        {
          ...pollingContext(store),
          batch: { enabled: true, batchSize: 50 },
        } as unknown as PerformContext,
        defaultTriggerPayload() as PerformPayload,
        params({
          lookBackDate: LOOK_BACK,
          showNewRecords: false,
          ...overrides,
        }),
      );
    const page = (from: number): ServiceTitanRecord[] =>
      Array.from({ length: 500 }, (_, i) => ({
        id: from + i,
        createdOn: T1,
        modifiedOn: T1,
      }));
    api()
      .get(`${JPM_PREFIX}/jobs`)
      .query(true)
      .times(2)
      .reply(200, () => ({ data: page(1000), hasMore: true }));
    vi.setSystemTime(new Date(T2));
    const first = await pollBatched();
    expect(changesOf(first).created).toHaveLength(1000);
    expect(store.backfillActive).toBe(true);
    const remainderJob: ServiceTitanRecord = {
      id: 30001,
      createdOn: T2,
      modifiedOn: T2,
    };
    api()
      .get(`${JPM_PREFIX}/jobs`)
      .query(true)
      .reply(200, listPage([remainderJob]));
    const second = await pollBatched();
    expect(changesOf(second).created).toEqual([remainderJob]);
    expect(store.backfillActive).toBeUndefined();
    const steadyJob: ServiceTitanRecord = {
      id: 30002,
      createdOn: "2026-08-19T15:00:00.000Z",
      modifiedOn: "2026-08-19T15:00:00.000Z",
    };
    api()
      .get(`${JPM_PREFIX}/jobs`)
      .query(true)
      .reply(200, listPage([steadyJob]));
    const third = await pollBatched();
    expect(changesOf(third)).toEqual({ created: [], updated: [] });
  });
});
