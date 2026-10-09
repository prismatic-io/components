import { defaultTriggerPayload } from "@prismatic-io/spectral/dist/testing";
import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";
import { createClient } from "../client";
import type { GongRecord, PollingState } from "../types";
import { lookBackDateClean, resolvePollingRecordChanges } from "../util";
import { pollChangesTrigger } from "./pollChangesTrigger";
vi.mock("../client", () => ({ createClient: vi.fn() }));
const NOW = new Date("2026-03-01T12:00:00.000Z");
const created: GongRecord = { id: "call-1", started: "2026-01-01T00:00:00Z" };
const other: GongRecord = { id: "call-2", started: "2026-01-02T00:00:00Z" };
describe("batching declaration", () => {
  test("New Records is opt-in batchable with a default batch size", () => {
    expect(pollChangesTrigger.triggerResolverSupport).toBe("valid");
    expect(pollChangesTrigger.batchConfig).toEqual({ batchSize: 50 });
    expect(pollChangesTrigger.triggerResolver?.resolveItems).toBeInstanceOf(
      Function,
    );
  });
  test("resolvePollingRecordChanges tags every record with how it changed", () => {
    expect(
      resolvePollingRecordChanges({ created: [created], updated: [other] }),
    ).toEqual([
      { changeType: "created", record: created },
      { changeType: "updated", record: other },
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
    expect(resolvePollingRecordChanges({ updated: [other] })).toEqual([
      { changeType: "updated", record: other },
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
  const get = vi.fn();
  let store: PollingState | undefined;
  beforeEach(() => {
    vi.useFakeTimers({ toFake: ["Date"] });
    vi.setSystemTime(NOW);
    store = undefined;
    get.mockReset();
    vi.mocked(createClient).mockReturnValue({ get } as never);
  });
  afterEach(() => {
    vi.useRealTimers();
  });
  const poll = async (params: {
    resourceType?: string;
    lookBackDate?: string;
    showNewRecords?: boolean;
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
        resourceType: "calls",
        lookBackDate: "",
        showNewRecords: true,
        ...params,
      } as never,
    );
    return {
      data: result.payload.body.data as {
        created: GongRecord[];
        updated: GongRecord[];
      },
      polledNoChanges: result.polledNoChanges,
    };
  };
  test("calls without a Look-back Date start the window at now", async () => {
    get.mockResolvedValue({ data: { calls: [] } });
    await poll({});
    expect(get).toHaveBeenCalledWith("/v2/calls", {
      params: {
        fromDateTime: NOW.toISOString(),
        toDateTime: NOW.toISOString(),
        cursor: undefined,
      },
    });
    expect(store?.lastPolledAt).toBe(NOW.toISOString());
  });
  test("a Look-back Date seeds the first calls window and ignores Show New Records", async () => {
    get.mockResolvedValue({ data: { calls: [created, other] } });
    const { data } = await poll({
      lookBackDate: "2025-12-31T00:00:00.000Z",
      showNewRecords: false,
    });
    expect(get).toHaveBeenCalledWith("/v2/calls", {
      params: {
        fromDateTime: "2025-12-31T00:00:00.000Z",
        toDateTime: NOW.toISOString(),
        cursor: undefined,
      },
    });
    expect(data.created).toEqual([created, other]);
    expect(store?.lastPolledAt).toBe(NOW.toISOString());
  });
  test("once a cursor exists the Look-back Date is ignored and Show New Records applies", async () => {
    store = { lastPolledAt: "2026-02-01T00:00:00.000Z" };
    get.mockResolvedValue({ data: { calls: [created] } });
    const { data } = await poll({
      lookBackDate: "2020-01-01T00:00:00.000Z",
      showNewRecords: false,
    });
    expect(get).toHaveBeenCalledWith("/v2/calls", {
      params: {
        fromDateTime: "2026-02-01T00:00:00.000Z",
        toDateTime: NOW.toISOString(),
        cursor: undefined,
      },
    });
    expect(data.created).toEqual([]);
  });
  test("users ignore the Look-back Date: the first poll stores a baseline and returns nothing", async () => {
    get.mockResolvedValue({ data: { users: [created, other] } });
    const first = await poll({
      resourceType: "users",
      lookBackDate: "2025-12-31T00:00:00.000Z",
    });
    expect(first.data).toEqual({ created: [], updated: [] });
    expect(first.polledNoChanges).toBe(true);
    expect(store?.knownIds).toEqual(["call-1", "call-2"]);
  });
  test("users: a later poll emits only ids absent from the baseline", async () => {
    store = { lastPolledAt: "2026-02-01T00:00:00.000Z", knownIds: ["call-1"] };
    get.mockResolvedValue({ data: { users: [created, other] } });
    const { data } = await poll({ resourceType: "users" });
    expect(data.created).toEqual([other]);
    expect(store?.knownIds).toEqual(["call-1", "call-2"]);
  });
});
describe("input order", () => {
  test("Look-back Date leads the optional tier, directly below the required inputs", () => {
    const inputs = pollChangesTrigger.inputs as unknown;
    const keys = Array.isArray(inputs)
      ? inputs.map((i: { key: string }) => i.key)
      : Object.keys(inputs as object);
    expect(keys.slice(0, 4)).toEqual([
      "connection",
      "resourceType",
      "showNewRecords",
      "lookBackDate",
    ]);
  });
});
