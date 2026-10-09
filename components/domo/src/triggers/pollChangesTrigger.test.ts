import { defaultTriggerPayload } from "@prismatic-io/spectral/dist/testing";
import { getDomoClient } from "../client";
import type { DomoRecord, PollingState } from "../types";
import { lookBackDateClean, resolvePollingRecordChanges } from "../util";
import { pollChangesTrigger } from "./pollChangesTrigger";
vi.mock("../client", () => ({ getDomoClient: vi.fn() }));
const NOW = new Date("2026-03-01T12:00:00.000Z");
const created: DomoRecord = {
  id: "ds-1",
  createdAt: "2026-01-01T00:00:00.000Z",
  updatedAt: "2026-01-01T00:00:00.000Z",
};
const updated: DomoRecord = {
  id: "ds-2",
  createdAt: "2025-01-01T00:00:00.000Z",
  updatedAt: "2026-01-02T00:00:00.000Z",
};
describe("batching declaration", () => {
  test("New and Updated Records is opt-in batchable with a default batch size", () => {
    expect(pollChangesTrigger.triggerResolverSupport).toBe("valid");
    expect(pollChangesTrigger.batchConfig).toEqual({ batchSize: 50 });
    expect(pollChangesTrigger.triggerResolver?.resolveItems).toBeInstanceOf(
      Function,
    );
  });
  test("resolvePollingRecordChanges tags every record with how it changed", () => {
    expect(
      resolvePollingRecordChanges({ created: [created], updated: [updated] }),
    ).toEqual([
      { changeType: "created", record: created },
      { changeType: "updated", record: updated },
    ]);
  });
  test("resolvePollingRecordChanges returns [] for empty or undefined changes", () => {
    expect(resolvePollingRecordChanges({})).toEqual([]);
    expect(resolvePollingRecordChanges({ created: [], updated: [] })).toEqual(
      [],
    );
    expect(resolvePollingRecordChanges(undefined)).toEqual([]);
  });
  test("resolvePollingRecordChanges tolerates an absent array", () => {
    expect(resolvePollingRecordChanges({ created: [created] })).toEqual([
      { changeType: "created", record: created },
    ]);
    expect(resolvePollingRecordChanges({ updated: [updated] })).toEqual([
      { changeType: "updated", record: updated },
    ]);
  });
  test("resolveItems flattens the payload shape perform actually returns", () => {
    const payload = {
      ...defaultTriggerPayload(),
      body: { data: { created: [created], updated: [] } },
    };
    expect(
      pollChangesTrigger.triggerResolver?.resolveItems?.({} as never, {
        payload,
      }),
    ).toEqual([{ changeType: "created", record: created }]);
  });
});
describe("lookBackDateClean", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(NOW);
  });
  afterEach(() => {
    vi.useRealTimers();
  });
  test("returns an empty string for empty values", () => {
    expect(lookBackDateClean(undefined)).toBe("");
    expect(lookBackDateClean(null)).toBe("");
    expect(lookBackDateClean("  ")).toBe("");
  });
  test("returns the date as an ISO string", () => {
    expect(lookBackDateClean("2026-01-01")).toBe("2026-01-01T00:00:00.000Z");
  });
  test("rejects a wrong format, a non-calendar date, and a future date", () => {
    expect(() => lookBackDateClean("01/01/2026")).toThrow(/YYYY-MM-DD/);
    expect(() => lookBackDateClean("2026-02-31")).toThrow(/YYYY-MM-DD/);
    expect(() => lookBackDateClean("2026-03-02")).toThrow(/future/);
  });
});
describe("perform initial sync seed", () => {
  const records: DomoRecord[] = [created, updated];
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(NOW);
    vi.mocked(getDomoClient).mockResolvedValue({
      get: vi.fn().mockResolvedValue({ data: records }),
    } as never);
  });
  afterEach(() => {
    vi.useRealTimers();
  });
  const poll = async (
    initial: PollingState | undefined,
    params: {
      resourceType?: string;
      lookBackDate?: string;
      showNewRecords?: boolean;
      showUpdatedRecords?: boolean;
    },
  ) => {
    let state: PollingState | undefined = initial;
    const context = {
      debug: { enabled: false },
      logger: { debug: vi.fn() },
      polling: {
        getState: () => state,
        setState: (next: PollingState) => {
          state = next;
        },
      },
    };
    const result = await pollChangesTrigger.perform(
      context as never,
      defaultTriggerPayload(),
      {
        connection: {} as never,
        resourceType: "datasets",
        lookBackDate: "",
        showNewRecords: true,
        showUpdatedRecords: true,
        ...params,
      } as never,
    );
    return {
      data: result.payload.body.data as {
        created: DomoRecord[];
        updated: DomoRecord[];
      },
      state: state as PollingState,
    };
  };
  test("without a Look-back Date the first poll starts from now and returns nothing", async () => {
    const { data, state } = await poll(undefined, {});
    expect(data).toEqual({ created: [], updated: [] });
    expect(state.lastPolled).toBe(NOW.toISOString());
  });
  test("a Look-back Date seeds the first poll, ignoring the visibility filters", async () => {
    const { data, state } = await poll(undefined, {
      lookBackDate: "2025-12-31T00:00:00.000Z",
      showNewRecords: false,
      showUpdatedRecords: false,
    });
    expect(data.created).toEqual([created]);
    expect(data.updated).toEqual([updated]);
    expect(state.lastPolled).toBe(NOW.toISOString());
  });
  test("once a cursor exists the Look-back Date and the visibility filters apply as before", async () => {
    const { data } = await poll(
      { lastPolled: "2025-12-31T00:00:00.000Z" },
      {
        lookBackDate: "2020-01-01T00:00:00.000Z",
        showNewRecords: false,
      },
    );
    expect(data.created).toEqual([]);
    expect(data.updated).toEqual([updated]);
  });
  test("an id-based resource ignores the Look-back Date and still emits the full set on the first run", async () => {
    const { data, state } = await poll(undefined, {
      resourceType: "groups",
      lookBackDate: "2025-12-31T00:00:00.000Z",
    });
    expect(data.created).toEqual(records);
    expect(state.knownIds).toEqual(["ds-1", "ds-2"]);
  });
});
describe("input order", () => {
  test("Look-back Date sits directly below the required inputs", () => {
    const inputs = pollChangesTrigger.inputs as unknown;
    const keys = Array.isArray(inputs)
      ? inputs.map((i: { key: string }) => i.key)
      : Object.keys(inputs as object);
    expect(keys.slice(0, 3)).toEqual([
      "connection",
      "resourceType",
      "lookBackDate",
    ]);
  });
});
describe("dedup across sequential polls on one stateful store", () => {
  let store: PollingState | undefined;
  let records: DomoRecord[];
  beforeEach(() => {
    vi.useFakeTimers({ toFake: ["Date"] });
    vi.setSystemTime(NOW);
    store = undefined;
    records = [created, updated];
    vi.mocked(getDomoClient).mockResolvedValue({
      get: vi.fn().mockImplementation(async () => ({ data: records })),
    } as never);
  });
  afterEach(() => {
    vi.useRealTimers();
  });
  const poll = async (params: {
    resourceType?: string;
    lookBackDate?: string;
  }) => {
    const context = {
      debug: { enabled: false },
      logger: { debug: vi.fn() },
      polling: {
        getState: () => store,
        setState: (next: PollingState) => {
          store = next;
        },
      },
    };
    const result = await pollChangesTrigger.perform(
      context as never,
      defaultTriggerPayload(),
      {
        connection: {} as never,
        resourceType: "datasets",
        lookBackDate: "",
        showNewRecords: true,
        showUpdatedRecords: true,
        ...params,
      } as never,
    );
    return {
      data: result.payload.body.data as {
        created: DomoRecord[];
        updated: DomoRecord[];
      },
      polledNoChanges: result.polledNoChanges,
    };
  };
  test("timestamp resource: records seen on poll 1 are absent from poll 2 once the cursor advanced", async () => {
    const first = await poll({ lookBackDate: "2025-12-31T00:00:00.000Z" });
    expect(first.data.created).toEqual([created]);
    expect(first.data.updated).toEqual([updated]);
    vi.setSystemTime(new Date("2026-03-01T13:00:00.000Z"));
    const second = await poll({ lookBackDate: "2025-12-31T00:00:00.000Z" });
    expect(second.data).toEqual({ created: [], updated: [] });
    expect(second.polledNoChanges).toBe(true);
  });
  test("timestamp resource: poll 2 emits only the record created after the cursor", async () => {
    await poll({ lookBackDate: "2025-12-31T00:00:00.000Z" });
    const fresh: DomoRecord = {
      id: "ds-3",
      createdAt: "2026-03-01T12:30:00.000Z",
      updatedAt: "2026-03-01T12:30:00.000Z",
    };
    records = [created, updated, fresh];
    vi.setSystemTime(new Date("2026-03-01T13:00:00.000Z"));
    const second = await poll({ lookBackDate: "2025-12-31T00:00:00.000Z" });
    expect(second.data.created).toEqual([fresh]);
    expect(second.data.updated).toEqual([]);
  });
  test("id-based resource: poll 1 emits the full set, an identical poll 2 emits nothing", async () => {
    const first = await poll({ resourceType: "groups" });
    expect(first.data.created).toEqual([created, updated]);
    expect(store?.knownIds).toEqual(["ds-1", "ds-2"]);
    const second = await poll({ resourceType: "groups" });
    expect(second.data.created).toEqual([]);
    expect(second.polledNoChanges).toBe(true);
  });
  test("id-based resource: a non-empty knownIds in state filters to only the new ids", async () => {
    store = { lastPolled: "2026-02-01T00:00:00.000Z", knownIds: ["ds-1"] };
    const second = await poll({ resourceType: "groups" });
    expect(second.data.created).toEqual([updated]);
    expect(store?.knownIds).toEqual(["ds-1", "ds-2"]);
  });
  test("id-based resource: ids are compared as strings across numeric and string forms", async () => {
    records = [{ ...created, id: 7 as unknown as string }];
    store = { lastPolled: "2026-02-01T00:00:00.000Z", knownIds: ["7"] };
    const next = await poll({ resourceType: "groups" });
    expect(next.data.created).toEqual([]);
  });
});
