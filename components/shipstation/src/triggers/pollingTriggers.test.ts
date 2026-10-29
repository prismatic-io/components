import type { ActionContext, Connection } from "@prismatic-io/spectral";
import { invokeTrigger } from "@prismatic-io/spectral/dist/testing";
import { afterEach, beforeEach, vi } from "vitest";
import type { PollingChangesObject, TimestampedRecord } from "../types";
import { lookBackDateClean } from "../util";
import {
  classifyRecords,
  resolvePollingRecordChanges,
  resolvePollWindow,
} from "./pollingUtils";
import { pollProducts } from "./pollProducts";
import { pollShipments } from "./pollShipments";

const getMock = vi.fn();
vi.mock("../client", () => ({
  createShipStationClient: () => ({ get: getMock }),
}));

const POLL_AT = "2026-06-01T12:00:00.000Z";
const LOOK_BACK = "2026-05-01T00:00:00.000Z";
const DAY_MS = 24 * 60 * 60 * 1000;

const testConnection = {
  key: "ShipStation",
  fields: {},
} as unknown as Connection;

type TestRecord = TimestampedRecord & { id: number };

const record = (
  id: number,
  createDate: string,
  modifyDate = createDate,
): TestRecord => ({ id, createDate, modifyDate });

const ids = (records: TimestampedRecord[]) =>
  records.map((r) => (r as TestRecord).id);

const createPollingStore = (
  seedState: { lastPolledAt?: string } | null = null,
) => {
  let state = seedState;
  const context = {
    polling: {
      getState: () => state,
      setState: (next: { lastPolledAt?: string }) => {
        state = next;
      },
    },
  } as unknown as Partial<ActionContext>;
  return { context, currentState: () => state };
};

const freezeClockAt = (iso: string) => {
  vi.useFakeTimers({ toFake: ["Date"] });
  vi.setSystemTime(new Date(iso));
};

interface PollResult {
  polledNoChanges?: boolean;
  payload: { body: { data: PollingChangesObject } };
}

const triggers = [
  [
    "pollShipments",
    pollShipments,
    "/shipments",
    "shipments",
    "createDateStart",
  ],
  ["pollProducts", pollProducts, "/products", "products", "startDate"],
] as const;

const poll = async (
  trigger: (typeof triggers)[number][1],
  context: Partial<ActionContext>,
  lookBackDate = "",
): Promise<PollResult> => {
  const { result } = await invokeTrigger(
    { perform: trigger.perform } as unknown as Parameters<
      typeof invokeTrigger
    >[0],
    context,
    undefined,
    { connection: testConnection, lookBackDate } as unknown as Parameters<
      typeof invokeTrigger
    >[3],
  );
  return result as unknown as PollResult;
};

const sentParams = (call = 0) => getMock.mock.calls[call][1].params;

beforeEach(() => {
  getMock.mockReset();
});

afterEach(() => {
  vi.useRealTimers();
});

describe.each(
  triggers,
)("%s", (_name, trigger, endpoint, dataKey, filterParam) => {
  test("a cold poll with no Look-back Date starts the window at now", async () => {
    const store = createPollingStore();
    freezeClockAt(POLL_AT);
    getMock.mockResolvedValue({ data: { [dataKey]: [] } });

    const result = await poll(trigger, store.context);

    expect(getMock.mock.calls[0][0]).toBe(endpoint);
    expect(sentParams()).toMatchObject({ [filterParam]: POLL_AT, page: 1 });
    expect(result.polledNoChanges).toBe(true);
    expect(store.currentState()).toEqual({ lastPolledAt: POLL_AT });
  });

  test("a stored position drives the window and the Look-back Date is ignored", async () => {
    const store = createPollingStore({
      lastPolledAt: "2026-05-30T00:00:00.000Z",
    });
    freezeClockAt(POLL_AT);
    getMock.mockResolvedValue({
      data: {
        [dataKey]: [
          record(1, "2026-05-31T10:00:00.0000000"),
          record(
            2,
            "2026-01-01T10:00:00.0000000",
            "2026-05-31T11:00:00.0000000",
          ),
          record(3, "2026-04-01T10:00:00.0000000"),
        ],
      },
    });

    const result = await poll(trigger, store.context, LOOK_BACK);

    expect(sentParams()[filterParam]).toBe("2026-05-30T00:00:00.000Z");
    expect(ids(result.payload.body.data.created)).toEqual([1]);
    expect(ids(result.payload.body.data.updated)).toEqual([2]);
    expect(store.currentState()).toEqual({ lastPolledAt: POLL_AT });
  });

  test("initial sync asks a day before the Look-back Date, then classifies against the exact instant", async () => {
    const store = createPollingStore();
    freezeClockAt(POLL_AT);
    getMock.mockResolvedValue({
      data: {
        [dataKey]: [
          record(1, "2026-04-30T12:00:00.0000000"),
          record(2, "2026-04-30T23:59:59.0000000"),
          record(3, "2026-05-01T00:00:00.0000000"),
          record(
            4,
            "2026-04-01T00:00:00.0000000",
            "2026-05-20T08:00:00.0000000",
          ),
          record(5, "2026-05-20T08:00:00.0000000"),
        ],
      },
    });

    const result = await poll(trigger, store.context, LOOK_BACK);

    expect(sentParams()[filterParam]).toBe(
      new Date(new Date(LOOK_BACK).getTime() - DAY_MS).toISOString(),
    );
    expect(ids(result.payload.body.data.created)).toEqual([3, 5]);
    expect(ids(result.payload.body.data.updated)).toEqual([4]);
    expect(store.currentState()).toEqual({ lastPolledAt: POLL_AT });
  });

  test("pages through every full page of 500", async () => {
    const store = createPollingStore({
      lastPolledAt: "2026-05-30T00:00:00.000Z",
    });
    freezeClockAt(POLL_AT);
    const full = Array.from({ length: 500 }, (_, i) =>
      record(i, "2026-05-31T10:00:00.0000000"),
    );
    getMock
      .mockResolvedValueOnce({ data: { [dataKey]: full } })
      .mockResolvedValueOnce({
        data: { [dataKey]: [record(900, "2026-05-31T10:00:00.0000000")] },
      });

    const result = await poll(trigger, store.context);

    expect(getMock).toHaveBeenCalledTimes(2);
    expect(sentParams(1).page).toBe(2);
    expect(result.payload.body.data.created).toHaveLength(501);
  });

  test("is opt-in batchable with a default batch size", () => {
    expect(trigger.triggerResolverSupport).toBe("valid");
    expect(trigger.batchConfig).toEqual({ batchSize: 50 });
    expect(trigger.triggerResolver?.resolveItems).toBeInstanceOf(Function);
  });

  test("resolveItems flattens the payload shape perform actually returns", async () => {
    const store = createPollingStore({
      lastPolledAt: "2026-05-30T00:00:00.000Z",
    });
    freezeClockAt(POLL_AT);
    const created = record(1, "2026-05-31T10:00:00.0000000");
    getMock.mockResolvedValue({ data: { [dataKey]: [created] } });
    const result = await poll(trigger, store.context);

    const items = trigger.triggerResolver?.resolveItems?.(
      {} as never,
      {
        payload: { body: { data: result.payload.body.data } },
      } as never,
    );
    expect(items).toEqual([{ changeType: "created", record: created }]);
  });

  test("resolveItems tolerates an absent or empty envelope and chunks by batchSize", async () => {
    const resolve = (data: unknown) =>
      trigger.triggerResolver?.resolveItems?.(
        {} as never,
        { payload: { body: { data } } } as never,
      );
    expect(resolve(undefined)).toEqual([]);
    expect(resolve({ created: [], updated: [] })).toEqual([]);

    const store = createPollingStore({
      lastPolledAt: "2026-05-30T00:00:00.000Z",
    });
    freezeClockAt(POLL_AT);
    const batchSize = trigger.batchConfig?.batchSize ?? 1;
    getMock.mockResolvedValue({
      data: {
        [dataKey]: Array.from({ length: batchSize + 1 }, (_, i) =>
          record(i, "2026-05-31T10:00:00.0000000"),
        ),
      },
    });
    const result = await poll(trigger, store.context);
    const items = resolve(result.payload.body.data) as unknown[];

    const chunks: unknown[][] = [];
    for (let i = 0; i < items.length; i += batchSize) {
      chunks.push(items.slice(i, i + batchSize));
    }
    expect(items).toHaveLength(batchSize + 1);
    expect(chunks.map((c) => c.length)).toEqual([batchSize, 1]);
  });

  test("Look-back Date leads the optional tier, below the connection", () => {
    expect(Object.keys(trigger.inputs ?? {})).toEqual([
      "connection",
      "lookBackDate",
    ]);
  });
});

describe("resolvePollingRecordChanges", () => {
  const created = [record(1, "2026-05-02T00:00:00")];
  const updated = [record(2, "2026-01-01T00:00:00", "2026-05-04T00:00:00")];

  test("tags every record with how it changed", () => {
    expect(resolvePollingRecordChanges({ created, updated })).toEqual([
      { changeType: "created", record: created[0] },
      { changeType: "updated", record: updated[0] },
    ]);
  });

  test("returns [] for empty or undefined changes and tolerates an absent array", () => {
    expect(resolvePollingRecordChanges({ created: [], updated: [] })).toEqual(
      [],
    );
    expect(resolvePollingRecordChanges(undefined)).toEqual([]);
    expect(
      resolvePollingRecordChanges({
        created,
      } as unknown as PollingChangesObject),
    ).toHaveLength(1);
  });
});

describe("window helpers", () => {
  test("resolvePollWindow prefers state, then Look-back Date, then now", () => {
    expect(resolvePollWindow({ lastPolledAt: "S" }, LOOK_BACK, "N")).toEqual({
      after: "S",
    });
    expect(resolvePollWindow(null, "", "N")).toEqual({ after: "N" });
    expect(resolvePollWindow(undefined, LOOK_BACK, "N")).toMatchObject({
      notBefore: LOOK_BACK,
    });
  });

  test("classifyRecords drops records dated before the threshold", () => {
    const result = classifyRecords([record(1, "2001-01-01T00:00:00")], {
      after: "2026-01-01T00:00:00.000Z",
    });
    expect(result).toEqual({ created: [], updated: [] });
  });
});

describe("lookBackDateClean", () => {
  test("returns empty for empty input and midnight UTC for a date", () => {
    expect(lookBackDateClean("")).toBe("");
    expect(lookBackDateClean(undefined)).toBe("");
    expect(lookBackDateClean("2026-01-01")).toBe("2026-01-01T00:00:00.000Z");
  });

  test("rejects a malformed, non-calendar, or future date by label", () => {
    expect(() => lookBackDateClean("01/01/2026")).toThrow(/Look-back Date/);
    expect(() => lookBackDateClean("2026-02-31")).toThrow(/YYYY-MM-DD/);
    freezeClockAt(POLL_AT);
    expect(() => lookBackDateClean("2026-06-02")).toThrow(/future/);
  });
});
