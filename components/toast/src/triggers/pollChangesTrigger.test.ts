import {
  defaultTriggerPayload,
  loggerMock,
} from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import type { ToastChangesObject, ToastTimeEntryRecord } from "../interfaces";
import { resolvePollingRecordChanges } from "../utils";
import { pollChangesTrigger } from "./pollChangesTrigger";
const createdRecord: ToastTimeEntryRecord = {
  createdDate: "2026-05-27T10:30:00.000Z",
  modifiedDate: "2026-05-27T10:30:00.000Z",
  guid: "abc-123",
};
const updatedRecord: ToastTimeEntryRecord = {
  createdDate: "2026-05-20T09:00:00.000Z",
  modifiedDate: "2026-05-27T14:22:00.000Z",
  guid: "def-456",
};
const API_HOST = "https://toast-api-test.example.com";
const testConnection = {
  key: "toastClientCredentials",
  fields: {
    clientId: "test-client-id",
    clientSecret: "test-client-secret",
    apiUrl: API_HOST,
  },
} as unknown as Parameters<typeof pollChangesTrigger.perform>[2]["connection"];
const createPollingStore = (initial: Record<string, unknown> = {}) => {
  let state = { ...initial };
  const writes: Record<string, unknown>[] = [];
  return {
    getState: () => state,
    setState: (next: Record<string, unknown>) => {
      state = { ...next };
      writes.push({ ...next });
    },
    currentState: () => state,
    writes,
  };
};
type PollingStore = ReturnType<typeof createPollingStore>;
const makeContext = (store: PollingStore, debugEnabled = false) =>
  ({
    debug: { enabled: debugEnabled },
    logger: loggerMock(),
    polling: {
      getState: store.getState,
      setState: store.setState,
    },
  }) as unknown as Parameters<typeof pollChangesTrigger.perform>[0];
const baseParams = (overrides: Record<string, unknown> = {}) =>
  ({
    connection: testConnection,
    restaurantExternalId: "rest-ext-001",
    showNewRecords: true,
    showUpdatedRecords: true,
    lookBackDate: "",
    ...overrides,
  }) as unknown as Parameters<typeof pollChangesTrigger.perform>[2];
const mockAuth = () =>
  nock(API_HOST)
    .post("/authentication/v1/authentication/login")
    .reply(200, { token: { accessToken: "test-bearer-token" } });
const mockTimeEntries = (records: ToastTimeEntryRecord[]) =>
  nock(API_HOST).get("/labor/v1/timeEntries").query(true).reply(200, records);
describe("pollChangesTrigger batching", () => {
  test("New and Updated Time Entries is opt-in batchable with a default batch size", () => {
    expect(pollChangesTrigger.triggerResolverSupport).toBe("valid");
    expect(pollChangesTrigger.batchConfig).toEqual({ batchSize: 50 });
    expect(pollChangesTrigger.triggerResolver?.resolveItems).toBeInstanceOf(
      Function,
    );
  });
  test("resolvePollingRecordChanges tags every record with how it changed", () => {
    expect(
      resolvePollingRecordChanges({
        created: [createdRecord],
        updated: [updatedRecord],
      }),
    ).toEqual([
      { changeType: "created", record: createdRecord },
      { changeType: "updated", record: updatedRecord },
    ]);
  });
  test("resolvePollingRecordChanges returns [] for empty or undefined changes", () => {
    expect(resolvePollingRecordChanges({} as ToastChangesObject)).toEqual([]);
    expect(resolvePollingRecordChanges(undefined)).toEqual([]);
  });
  test("resolvePollingRecordChanges tolerates an absent array", () => {
    expect(resolvePollingRecordChanges({ created: [createdRecord] })).toEqual([
      { changeType: "created", record: createdRecord },
    ]);
    expect(resolvePollingRecordChanges({ updated: [updatedRecord] })).toEqual([
      { changeType: "updated", record: updatedRecord },
    ]);
  });
  test("resolveItems flattens the payload shape perform actually returns", () => {
    const payload = {
      ...defaultTriggerPayload(),
      body: { data: { created: [createdRecord] } },
    };
    expect(
      pollChangesTrigger.triggerResolver?.resolveItems?.({} as never, {
        payload,
      }),
    ).toEqual([{ changeType: "created", record: createdRecord }]);
  });
});
describe("pollChangesTrigger perform", () => {
  afterEach(() => {
    nock.cleanAll();
    vi.useRealTimers();
  });
  test("advances lastPolledAt cursor after a successful poll", async () => {
    const FROZEN_NOW = "2026-06-01T12:00:00.000Z";
    vi.useFakeTimers({ toFake: ["Date"] });
    vi.setSystemTime(new Date(FROZEN_NOW));
    const SEED_CURSOR = "2026-05-25T00:00:00.000Z";
    const store = createPollingStore({ lastPolledAt: SEED_CURSOR });
    const context = makeContext(store);
    const payload = defaultTriggerPayload();
    const newRecord: ToastTimeEntryRecord = {
      guid: "new-1",
      createdDate: "2026-05-28T08:00:00.000Z",
      modifiedDate: "2026-05-28T08:00:00.000Z",
    };
    mockAuth();
    mockTimeEntries([newRecord]);
    const result = await pollChangesTrigger.perform(
      context,
      payload,
      baseParams({ lookBackDate: "" }),
    );
    expect(store.currentState()).toEqual({ lastPolledAt: FROZEN_NOW });
    const data = result.payload.body.data as ToastChangesObject;
    expect(data.created).toEqual([newRecord]);
    expect(data.updated).toEqual([]);
    expect(result.polledNoChanges).toBe(false);
  });
  test("classifies records: created beats updated when both timestamps are after the cursor", async () => {
    const FROZEN_NOW = "2026-06-01T12:00:00.000Z";
    vi.useFakeTimers({ toFake: ["Date"] });
    vi.setSystemTime(new Date(FROZEN_NOW));
    const SEED_CURSOR = "2026-05-20T00:00:00.000Z";
    const store = createPollingStore({ lastPolledAt: SEED_CURSOR });
    const context = makeContext(store);
    const payload = defaultTriggerPayload();
    const bothNew: ToastTimeEntryRecord = {
      guid: "both-new",
      createdDate: "2026-05-22T10:00:00.000Z",
      modifiedDate: "2026-05-25T14:00:00.000Z",
    };
    const onlyModified: ToastTimeEntryRecord = {
      guid: "only-modified",
      createdDate: "2026-05-10T09:00:00.000Z",
      modifiedDate: "2026-05-25T14:00:00.000Z",
    };
    const stale: ToastTimeEntryRecord = {
      guid: "stale",
      createdDate: "2026-05-01T00:00:00.000Z",
      modifiedDate: "2026-05-02T00:00:00.000Z",
    };
    mockAuth();
    mockTimeEntries([bothNew, onlyModified, stale]);
    const result = await pollChangesTrigger.perform(
      context,
      payload,
      baseParams(),
    );
    const data = result.payload.body.data as ToastChangesObject;
    expect(data.created).toEqual([bothNew]);
    expect(data.updated).toEqual([onlyModified]);
    expect(result.polledNoChanges).toBe(false);
  });
  test("dedup: second poll does not re-emit records older than the advanced cursor", async () => {
    const T1 = "2026-06-01T12:00:00.000Z";
    const T2 = "2026-06-01T13:00:00.000Z";
    const SEED = "2026-05-25T00:00:00.000Z";
    const recordA: ToastTimeEntryRecord = {
      guid: "rec-a",
      createdDate: "2026-05-28T08:00:00.000Z",
      modifiedDate: "2026-05-28T08:00:00.000Z",
    };
    const store = createPollingStore({ lastPolledAt: SEED });
    const payload = defaultTriggerPayload();
    const params = baseParams();
    vi.useFakeTimers({ toFake: ["Date"] });
    vi.setSystemTime(new Date(T1));
    mockAuth();
    mockTimeEntries([recordA]);
    const result1 = await pollChangesTrigger.perform(
      makeContext(store),
      payload,
      params,
    );
    const data1 = result1.payload.body.data as ToastChangesObject;
    expect(data1.created).toEqual([recordA]);
    expect(store.currentState()).toEqual({ lastPolledAt: T1 });
    vi.setSystemTime(new Date(T2));
    mockAuth();
    mockTimeEntries([recordA]);
    const result2 = await pollChangesTrigger.perform(
      makeContext(store),
      payload,
      params,
    );
    const data2 = result2.payload.body.data as ToastChangesObject;
    expect(data2.created).toEqual([]);
    expect(data2.updated).toEqual([]);
    expect(result2.polledNoChanges).toBe(true);
    expect(store.currentState()).toEqual({ lastPolledAt: T2 });
  });
  test("uses lookBackDate as initial cursor when no prior state exists", async () => {
    const FROZEN_NOW = "2026-06-01T12:00:00.000Z";
    vi.useFakeTimers({ toFake: ["Date"] });
    vi.setSystemTime(new Date(FROZEN_NOW));
    const store = createPollingStore({});
    const context = makeContext(store);
    const payload = defaultTriggerPayload();
    const record: ToastTimeEntryRecord = {
      guid: "lb-1",
      createdDate: "2026-05-15T10:00:00.000Z",
      modifiedDate: "2026-05-15T10:00:00.000Z",
    };
    mockAuth();
    mockTimeEntries([record]);
    const result = await pollChangesTrigger.perform(
      context,
      payload,
      baseParams({ lookBackDate: "2026-05-01T00:00:00.000Z" }),
    );
    const data = result.payload.body.data as ToastChangesObject;
    expect(data.created).toEqual([record]);
    expect(store.currentState()).toEqual({ lastPolledAt: FROZEN_NOW });
  });
  test("initial sync ignores the visibility filters", async () => {
    const FROZEN_NOW = "2026-06-01T12:00:00.000Z";
    vi.useFakeTimers({ toFake: ["Date"] });
    vi.setSystemTime(new Date(FROZEN_NOW));
    const store = createPollingStore({});
    const context = makeContext(store);
    const payload = defaultTriggerPayload();
    mockAuth();
    mockTimeEntries([createdRecord, updatedRecord]);
    const result = await pollChangesTrigger.perform(
      context,
      payload,
      baseParams({
        lookBackDate: "2026-05-25T00:00:00.000Z",
        showNewRecords: false,
        showUpdatedRecords: false,
      }),
    );
    const data = result.payload.body.data as ToastChangesObject;
    expect(data.created).toEqual([createdRecord]);
    expect(data.updated).toEqual([updatedRecord]);
    expect(store.currentState()).toEqual({ lastPolledAt: FROZEN_NOW });
  });
  test("later recurrences still apply the visibility filters", async () => {
    const FROZEN_NOW = "2026-06-01T12:00:00.000Z";
    vi.useFakeTimers({ toFake: ["Date"] });
    vi.setSystemTime(new Date(FROZEN_NOW));
    const store = createPollingStore({
      lastPolledAt: "2026-05-25T00:00:00.000Z",
    });
    const context = makeContext(store);
    const payload = defaultTriggerPayload();
    mockAuth();
    mockTimeEntries([createdRecord, updatedRecord]);
    const result = await pollChangesTrigger.perform(
      context,
      payload,
      baseParams({
        lookBackDate: "2026-05-01T00:00:00.000Z",
        showNewRecords: false,
        showUpdatedRecords: false,
      }),
    );
    const data = result.payload.body.data as ToastChangesObject;
    expect(data.created).toEqual([]);
    expect(data.updated).toEqual([]);
    expect(result.polledNoChanges).toBe(true);
  });
  test("reports polledNoChanges when API returns no records", async () => {
    const FROZEN_NOW = "2026-06-01T12:00:00.000Z";
    vi.useFakeTimers({ toFake: ["Date"] });
    vi.setSystemTime(new Date(FROZEN_NOW));
    const store = createPollingStore({
      lastPolledAt: "2026-05-25T00:00:00.000Z",
    });
    const context = makeContext(store);
    const payload = defaultTriggerPayload();
    mockAuth();
    mockTimeEntries([]);
    const result = await pollChangesTrigger.perform(
      context,
      payload,
      baseParams(),
    );
    const data = result.payload.body.data as ToastChangesObject;
    expect(data.created).toEqual([]);
    expect(data.updated).toEqual([]);
    expect(result.polledNoChanges).toBe(true);
  });
});
