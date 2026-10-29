import type { Connection } from "@prismatic-io/spectral";
import { defaultTriggerPayload } from "@prismatic-io/spectral/dist/testing";
import { afterEach, beforeEach, vi } from "vitest";
import type { PollingChangesObject, TimestampedRecord } from "../types";
import { pollOrders } from "./pollOrders";
import { pollProducts } from "./pollProducts";
import { pollShipments } from "./pollShipments";

const getMock = vi.fn();
vi.mock("../client", () => ({
  createShipStationClient: () => ({ get: getMock }),
}));

const POLL_AT = "2026-06-01T12:00:00.000Z";
const HORIZON = "2026-06-01T11:59:00";
const LOOK_BACK = "2026-05-01T00:00:00.000Z";
const PAGE = 500;
const MAX_PAGES = 20;
const BASE_MS = Date.parse("2026-05-30T00:00:00Z");

const testConnection = {
  key: "ShipStation",
  fields: {},
} as unknown as Connection;

type Order = TimestampedRecord & { orderId: number };

const at = (n: number, fraction = "0000000"): string =>
  `${new Date(BASE_MS + n * 1000).toISOString().slice(0, 19)}.${fraction}`;
const wall = (n: number): string => at(n).slice(0, 19);
const sent = (wallClock: string): string => `${wallClock}.000Z`;

const order = (
  orderId: number,
  modifySecond: number,
  createSecond = modifySecond,
): Order => ({
  orderId,
  createDate: at(createSecond),
  modifyDate: at(modifySecond),
});

const orderIds = (records: TimestampedRecord[]) =>
  records.map((r) => (r as Order).orderId);

const recordMs = (value: string): number =>
  Date.parse(`${value.slice(0, 19)}Z`) +
  Number(`0.${value.slice(20).replace(/Z$/, "") || "0"}`) * 1000;

type Inclusivity = "inclusive" | "exclusive";

const fakeShipStation = (
  table: Order[],
  inclusivity: Inclusivity = "inclusive",
) => {
  const sorted = [...table].sort(
    (a, b) =>
      recordMs(a.modifyDate) - recordMs(b.modifyDate) || a.orderId - b.orderId,
  );
  getMock.mockImplementation(
    async (
      _endpoint: string,
      { params }: { params: Record<string, string> },
    ) => {
      expect(params.sortBy).toBe("ModifyDate");
      expect(params.sortDir).toBe("ASC");
      expect(params.pageSize).toBe(PAGE);
      expect(params.page).toBeUndefined();
      const lower = recordMs(params.modifyDateStart);
      const upper = recordMs(params.modifyDateEnd);
      const matching = sorted.filter((r) => {
        const ms = recordMs(r.modifyDate);
        const aboveLower =
          inclusivity === "inclusive" ? ms >= lower : ms > lower;
        return aboveLower && ms < upper;
      });
      return { data: { orders: matching.slice(0, PAGE) } };
    },
  );
};

interface PollingStateShape {
  lastPolledAt?: string;
  boundaryIds?: number[];
  cursor?: unknown;
  initialSyncFrom?: string;
}

const createPollingStore = (seed: PollingStateShape | null = null) => {
  let state = seed;
  const setState = vi.fn((next: PollingStateShape) => {
    state = next;
  });
  return {
    getState: () => state,
    setState,
    currentState: () => state,
  };
};

const contextFor = (
  store: ReturnType<typeof createPollingStore>,
  batching = false,
) =>
  ({
    polling: { getState: store.getState, setState: store.setState },
    batch: batching ? { enabled: true } : undefined,
    debug: { enabled: false },
  }) as unknown as Parameters<typeof pollOrders.perform>[0];

interface PollResult {
  polledNoChanges?: boolean;
  payload: {
    paginationState?: { watermark: string; boundaryIds: number[] };
    body: { data: PollingChangesObject; polledNoChanges?: boolean };
  };
}

const poll = async (
  store: ReturnType<typeof createPollingStore>,
  options: {
    batching?: boolean;
    incoming?: unknown;
    lookBackDate?: string;
  } = {},
): Promise<PollResult> => {
  const payload = {
    ...defaultTriggerPayload(),
    ...(options.incoming ? { paginationState: options.incoming } : {}),
  } as Parameters<typeof pollOrders.perform>[1];
  const result = await pollOrders.perform(
    contextFor(store, options.batching),
    payload,
    {
      connection: testConnection,
      lookBackDate: options.lookBackDate ?? "",
    } as unknown as Parameters<typeof pollOrders.perform>[2],
  );
  return result as unknown as PollResult;
};

const sentParams = (call = 0) => getMock.mock.calls[call][1].params;

const delivered = (result: PollResult) => [
  ...orderIds(result.payload.body.data.created),
  ...orderIds(result.payload.body.data.updated),
];

const freezeClockAt = (iso: string) => {
  vi.useFakeTimers({ toFake: ["Date"] });
  vi.setSystemTime(new Date(iso));
};

beforeEach(() => {
  getMock.mockReset();
  freezeClockAt(POLL_AT);
});

afterEach(() => {
  vi.useRealTimers();
});

describe("pollOrders declaration", () => {
  test("is opt-in batchable with a default batch size and Look-back Date input", () => {
    expect(pollOrders.triggerResolverSupport).toBe("valid");
    expect(pollOrders.batchConfig).toEqual({ batchSize: 50 });
    expect(pollOrders.triggerResolver?.resolveItems).toBeInstanceOf(Function);
    expect(Object.keys(pollOrders.inputs ?? {})).toEqual([
      "connection",
      "lookBackDate",
    ]);
  });

  test("resolveItems flattens the payload shape perform actually returns", async () => {
    const store = createPollingStore({
      lastPolledAt: wall(0),
      boundaryIds: [],
    });
    fakeShipStation([order(1, 10), order(2, 20, -5)]);
    const result = await poll(store);

    const items = pollOrders.triggerResolver?.resolveItems?.(
      {} as never,
      { payload: { body: { data: result.payload.body.data } } } as never,
    );

    expect(items).toEqual([
      { changeType: "created", record: order(1, 10) },
      { changeType: "updated", record: order(2, 20, -5) },
    ]);
  });

  test("echoes the round's pagination state and ignores an absent one", () => {
    const echo = pollOrders.triggerResolver?.getNextPaginationState;
    const cursor = { watermark: wall(5), boundaryIds: [1] };
    expect(
      echo?.({} as never, { payload: { paginationState: cursor } } as never),
    ).toEqual(cursor);
    expect(echo?.({} as never, { payload: {} } as never)).toBeNull();
  });
});

describe.each([
  ["inclusive", "inclusive"],
  ["exclusive", "exclusive"],
] as const)("pollOrders requests (modifyDateStart is %s)", (_name, mode) => {
  test("asks from one second before the watermark, up to the safe horizon, oldest first", async () => {
    const store = createPollingStore({ lastPolledAt: wall(100) });
    fakeShipStation([order(1, 90), order(2, 100), order(3, 105)], mode);

    await poll(store);

    expect(getMock).toHaveBeenCalledTimes(1);
    expect(getMock.mock.calls[0][0]).toBe("/orders");
    expect(sentParams()).toEqual({
      modifyDateStart: sent(wall(99)),
      modifyDateEnd: sent(HORIZON),
      sortBy: "ModifyDate",
      sortDir: "ASC",
      pageSize: PAGE,
    });
  });

  test("skips below-watermark and already-delivered records, delivers the rest once", async () => {
    const store = createPollingStore({
      lastPolledAt: wall(100),
      boundaryIds: [5],
    });
    fakeShipStation(
      [order(4, 99), order(5, 100), order(6, 100), order(7, 101)],
      mode,
    );

    const result = await poll(store);

    expect(delivered(result).sort()).toEqual([6, 7]);
    expect(store.currentState()).toEqual({
      lastPolledAt: wall(101),
      boundaryIds: [7],
    });
  });
});

describe("pollOrders watermark", () => {
  test("is derived from the record's own modifyDate and truncated to the second", async () => {
    const store = createPollingStore({ lastPolledAt: wall(0) });
    fakeShipStation([
      { orderId: 1, createDate: at(10), modifyDate: at(50, "9876543") },
    ]);

    const result = await poll(store);

    expect(store.currentState()).toEqual({
      lastPolledAt: wall(50),
      boundaryIds: [1],
    });
    expect(result.polledNoChanges).toBe(false);
  });

  test("keeps the published body.polledNoChanges field", async () => {
    const store = createPollingStore({ lastPolledAt: wall(0) });
    fakeShipStation([{ orderId: 1, createDate: at(10), modifyDate: at(20) }]);

    const result = await poll(store);

    expect(result.payload.body.polledNoChanges).toBe(false);
  });

  test("never moves backward and never takes the wall clock when nothing is new", async () => {
    const store = createPollingStore({
      lastPolledAt: wall(100),
      boundaryIds: [3],
    });
    fakeShipStation([order(3, 100)]);

    const result = await poll(store);

    expect(delivered(result)).toEqual([]);
    expect(result.polledNoChanges).toBe(true);
    expect(store.currentState()).toEqual({
      lastPolledAt: wall(100),
      boundaryIds: [3],
    });
  });

  test("a legacy lastPolledAt (an ISO instant) is read as the same wall clock", async () => {
    const store = createPollingStore({
      lastPolledAt: "2026-06-01T10:00:00.000Z",
    });
    fakeShipStation([]);

    await poll(store);

    expect(sentParams().modifyDateStart).toBe("2026-06-01T09:59:59.000Z");
  });

  test("sends no request when the watermark is not yet before the safe horizon", async () => {
    const store = createPollingStore();
    fakeShipStation([]);

    const result = await poll(store);

    expect(getMock).not.toHaveBeenCalled();
    expect(result.polledNoChanges).toBe(true);
    expect(store.currentState()).toEqual({
      lastPolledAt: "2026-06-01T12:00:00",
      boundaryIds: [],
    });
  });

  test("classifies against the committed watermark second", async () => {
    const store = createPollingStore({
      lastPolledAt: wall(100),
      boundaryIds: [],
    });
    fakeShipStation([order(1, 120, 110), order(2, 130, 5), order(3, 100, 100)]);

    const result = await poll(store);

    expect(orderIds(result.payload.body.data.created)).toEqual([1]);
    expect(orderIds(result.payload.body.data.updated)).toEqual([3, 2]);
  });
});

describe("pollOrders initial sync", () => {
  test("seeds a day before the Look-back Date and classifies against the exact instant", async () => {
    const store = createPollingStore();
    const lookBackSecond = (Date.parse(LOOK_BACK) - BASE_MS) / 1000;
    fakeShipStation([
      order(1, lookBackSecond - 3600),
      order(2, lookBackSecond),
      order(3, lookBackSecond + 60, lookBackSecond - 86400 * 10),
    ]);

    const result = await poll(store, { lookBackDate: LOOK_BACK });

    expect(sentParams().modifyDateStart).toBe("2026-04-29T23:59:59.000Z");
    expect(orderIds(result.payload.body.data.created)).toEqual([2]);
    expect(orderIds(result.payload.body.data.updated)).toEqual([3]);
    expect(store.currentState()).toEqual({
      lastPolledAt: wall(lookBackSecond + 60),
      boundaryIds: [3],
    });
  });

  test("keeps classifying against the Look-back Date while the sync spans recurrences", async () => {
    const store = createPollingStore();
    const lookBackSecond = (Date.parse(LOOK_BACK) - BASE_MS) / 1000;
    const total = PAGE * MAX_PAGES + 50;
    fakeShipStation(
      Array.from({ length: total }, (_, i) => order(i + 1, lookBackSecond + i)),
    );

    const first = await poll(store, { lookBackDate: LOOK_BACK });
    expect(first.payload.paginationState).toBeDefined();
    expect(store.currentState()?.initialSyncFrom).toBe(LOOK_BACK);

    const second = await poll(store, { lookBackDate: LOOK_BACK });

    expect(store.currentState()?.initialSyncFrom).toBeUndefined();
    const seen = [...delivered(first), ...delivered(second)];
    expect(new Set(seen).size).toBe(total);
    expect(seen).toHaveLength(total);
    expect(second.payload.body.data.updated).toEqual([]);
  });
});

describe("pollOrders draining", () => {
  const backlog = (count: number) =>
    Array.from({ length: count }, (_, i) => order(i + 1, i + 1));

  test("batching on: one page per round, resumed from the round's own pagination state", async () => {
    const store = createPollingStore({
      lastPolledAt: wall(0),
      boundaryIds: [],
    });
    fakeShipStation(backlog(1200));

    const seen: number[] = [];
    let incoming: unknown;
    let rounds = 0;
    do {
      const callsBefore = getMock.mock.calls.length;
      const result = await poll(store, { batching: true, incoming });
      expect(getMock.mock.calls.length - callsBefore).toBe(1);
      seen.push(...delivered(result));
      incoming = result.payload.paginationState;
      rounds++;
      if (incoming) {
        expect(store.currentState()?.lastPolledAt).toBe(wall(0));
        expect(store.currentState()?.cursor).toEqual(incoming);
        expect(result.polledNoChanges).toBe(false);
      }
    } while (incoming && rounds < 10);

    expect(rounds).toBeGreaterThan(2);
    expect(new Set(seen).size).toBe(1200);
    expect(seen).toHaveLength(1200);
    expect(store.currentState()).toEqual({
      lastPolledAt: wall(1200),
      boundaryIds: [1200],
    });
  });

  test("an incoming pagination state wins over the stored cursor", async () => {
    const store = createPollingStore({
      lastPolledAt: wall(0),
      cursor: { watermark: wall(1), boundaryIds: [] },
    });
    fakeShipStation(backlog(10));

    await poll(store, {
      batching: true,
      incoming: { watermark: wall(7), boundaryIds: [7] },
    });

    expect(sentParams().modifyDateStart).toBe(sent(wall(6)));
  });

  test("batching off: a bounded window per recurrence, resumed from the stored cursor with nothing fed in", async () => {
    const total = PAGE * MAX_PAGES + 600;
    const store = createPollingStore({
      lastPolledAt: wall(0),
      boundaryIds: [],
    });
    fakeShipStation(backlog(total));

    const first = await poll(store);

    expect(getMock).toHaveBeenCalledTimes(MAX_PAGES);
    expect(store.currentState()?.lastPolledAt).toBe(wall(0));
    expect(store.currentState()?.cursor).toBeDefined();
    expect(first.polledNoChanges).toBe(false);

    getMock.mockClear();
    const second = await poll(store);

    const seen = [...delivered(first), ...delivered(second)];
    expect(new Set(seen).size).toBe(total);
    expect(seen).toHaveLength(total);
    expect(store.currentState()).toEqual({
      lastPolledAt: wall(total),
      boundaryIds: [total],
    });
    expect(second.payload.paginationState).toBeUndefined();
  });

  test("polledNoChanges is never true on a platform-driven round", async () => {
    const store = createPollingStore({
      lastPolledAt: wall(100),
      boundaryIds: [3],
    });
    fakeShipStation([order(3, 100)]);

    const scheduled = await poll(store);
    const platformDriven = await poll(store, {
      batching: true,
      incoming: { watermark: wall(100), boundaryIds: [3] },
    });

    expect(scheduled.polledNoChanges).toBe(true);
    expect(platformDriven.polledNoChanges).toBe(false);
    expect(platformDriven.payload.paginationState).toBeUndefined();
  });
});

describe("pollOrders loud stop and guards", () => {
  test("throws when a full page of 500 sits at the watermark, delivering and persisting nothing", async () => {
    const store = createPollingStore({
      lastPolledAt: wall(100),
      boundaryIds: [],
    });
    fakeShipStation(
      Array.from({ length: PAGE + 20 }, (_, i) => order(i + 1, 100)),
    );

    await expect(poll(store)).rejects.toThrow(/pollOrders/);
    await expect(poll(store)).rejects.toThrow(new RegExp(wall(100)));
    await expect(poll(store)).rejects.toThrow(/500/);
    await expect(poll(store)).rejects.toThrow(/tie-break or exclusion/);
    expect(store.setState).not.toHaveBeenCalled();
    expect(store.currentState()).toEqual({
      lastPolledAt: wall(100),
      boundaryIds: [],
    });
  });

  test("pages before the stuck page are delivered first; the next round throws", async () => {
    const early = Array.from({ length: PAGE }, (_, i) => order(i + 1, i + 1));
    const tie = Array.from({ length: PAGE }, (_, i) => order(1000 + i, 5000));
    const store = createPollingStore({
      lastPolledAt: wall(0),
      boundaryIds: [],
    });
    fakeShipStation([...early, ...tie]);

    const first = await poll(store);

    expect(delivered(first)).toHaveLength(PAGE + 498);
    expect(delivered(first)).toEqual(
      expect.arrayContaining(early.map((o) => o.orderId)),
    );
    expect(store.currentState()?.lastPolledAt).toBe(wall(0));
    expect(store.currentState()?.cursor).toBeDefined();
    expect(first.polledNoChanges).toBe(false);

    await expect(poll(store)).rejects.toThrow(/tie-break or exclusion/);
    expect(store.currentState()?.cursor).toBeDefined();
  });

  test("throws instead of returning an unchanged cursor after a full page that cannot progress", async () => {
    const store = createPollingStore({
      lastPolledAt: wall(100),
      boundaryIds: [],
    });
    fakeShipStation(Array.from({ length: PAGE }, (_, i) => order(i + 1, 99)));

    await expect(poll(store)).rejects.toThrow(/pollOrders/);
    await expect(poll(store)).rejects.toThrow(/no progress/i);
    await expect(poll(store)).rejects.toThrow(new RegExp(wall(100)));
    await expect(poll(store)).rejects.toThrow(/500/);
    expect(store.setState).not.toHaveBeenCalled();
  });
});

describe("pollShipments and pollProducts are unchanged", () => {
  test.each([
    ["pollShipments", pollShipments, "createDateStart"],
    ["pollProducts", pollProducts, "startDate"],
  ] as const)("%s keeps its wall-clock window and offset paging", async (_name, trigger, filterParam) => {
    const store = createPollingStore({
      lastPolledAt: "2026-05-30T00:00:00.000Z",
    });
    getMock.mockResolvedValue({ data: {} });

    const result = (await trigger.perform(
      contextFor(store),
      defaultTriggerPayload() as never,
      { connection: testConnection, lookBackDate: "" } as never,
    )) as unknown as PollResult;

    expect(sentParams()).toEqual({
      [filterParam]: "2026-05-30T00:00:00.000Z",
      page: 1,
      pageSize: PAGE,
    });
    expect(result.polledNoChanges).toBe(true);
    expect(store.currentState()).toEqual({ lastPolledAt: POLL_AT });
    expect(trigger.triggerResolver?.getNextPaginationState).toBeUndefined();
  });
});
