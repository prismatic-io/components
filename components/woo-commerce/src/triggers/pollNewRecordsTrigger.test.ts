import type { ActionContext, Connection } from "@prismatic-io/spectral";
import { invokeTrigger } from "@prismatic-io/spectral/dist/testing";
import { afterEach, beforeEach, vi } from "vitest";
import {
  MAX_EXCLUDE_IDS,
  MAX_POLL_PAGES,
  POLL_PAGE_SIZE,
  WATERMARK_SKEW_MARGIN_MS,
} from "../constants";
import type {
  PollCursor,
  PollingChangesObject,
  WooCommerceRecord,
} from "../types";
import {
  lookBackDateClean,
  resolvePollingRecordChanges,
  resolvePollWindow,
  trimToWindow,
} from "../util";
import { pollNewRecordsTrigger } from "./pollNewRecordsTrigger";
const getMock = vi.fn();
vi.mock("../client", () => ({
  getClient: () => ({ get: getMock }),
}));
const POLL_ONE_AT = "2026-06-01T12:00:00.000Z";
const POLL_TWO_AT = "2026-06-01T13:00:00.000Z";
const HORIZON_ONE = "2026-06-01T11:59:00";
const LOOK_BACK = "2026-05-01T00:00:00.000Z";
const DAY_MS = 24 * 60 * 60 * 1000;
const BASE_MS = Date.parse("2026-05-01T00:00:00.000Z");
const gmtAt = (sec: number): string =>
  new Date(BASE_MS + sec * 1000).toISOString().slice(0, 19);
const isoAt = (sec: number): string =>
  new Date(BASE_MS + sec * 1000).toISOString();
const order = (id: number, sec: number): WooCommerceRecord => ({
  id,
  date_created_gmt: gmtAt(sec),
  status: "processing",
});
const sameSecond = (
  firstId: number,
  count: number,
  sec: number,
): WooCommerceRecord[] =>
  Array.from({ length: count }, (_, i) => order(firstId + i, sec));
const oneEachSecond = (
  firstId: number,
  count: number,
  startSec: number,
): WooCommerceRecord[] =>
  Array.from({ length: count }, (_, i) => order(firstId + i, startSec + i));
const testConnection = { key: "Basic", fields: {} } as unknown as Connection;
interface PollingStore {
  context: Partial<ActionContext>;
  currentState: () => Record<string, unknown> | null;
  writes: Record<string, unknown>[];
}
const createPollingStore = (
  seedState: Record<string, unknown> | null = null,
  batchEnabled = false,
): PollingStore => {
  let state: Record<string, unknown> | null = seedState;
  const writes: Record<string, unknown>[] = [];
  const context = {
    batch: batchEnabled ? { enabled: true } : undefined,
    polling: {
      getState: () => state,
      setState: (next: Record<string, unknown>) => {
        state = next;
        writes.push(next);
      },
    },
  } as unknown as Partial<ActionContext>;
  return { context, currentState: () => state, writes };
};
const freezeClockAt = (iso: string) => {
  vi.useFakeTimers({ toFake: ["Date"] });
  vi.setSystemTime(new Date(iso));
};
interface WooParams {
  after: string;
  before: string;
  exclude?: string;
  dates_are_gmt: boolean;
  per_page: number;
  page: number;
  orderby: string;
  order: string;
}
const fakeWoo = (
  rows: WooCommerceRecord[],
): {
  requests: WooParams[];
} => {
  const requests: WooParams[] = [];
  const gmtMs = (value: string): number => {
    if (/Z$|[+-]\d{2}:?\d{2}$/.test(value)) {
      throw new Error(`fakeWoo: ${value} carries a timezone`);
    }
    return Date.parse(`${value}Z`);
  };
  getMock.mockImplementation(async (_url: string, { params }) => {
    const p = params as WooParams;
    requests.push(p);
    if (p.dates_are_gmt !== true) {
      throw new Error("fakeWoo: dates_are_gmt must be true");
    }
    const after = gmtMs(p.after);
    const before = gmtMs(p.before);
    const excluded = new Set(
      (p.exclude ? p.exclude.split(",") : []).map(Number),
    );
    const data = rows
      .filter((r) => {
        const at = gmtMs(r.date_created_gmt as string);
        return at > after && at < before && !excluded.has(r.id);
      })
      .sort(
        (a, b) =>
          gmtMs(a.date_created_gmt as string) -
            gmtMs(b.date_created_gmt as string) || a.id - b.id,
      )
      .slice((p.page - 1) * p.per_page, p.page * p.per_page);
    return { data, headers: {} };
  });
  return { requests };
};
interface PollResult {
  polledNoChanges: boolean;
  payload: {
    paginationState?: PollCursor;
    body: {
      data: PollingChangesObject;
    };
  };
}
const triggerUnderTest = {
  perform: pollNewRecordsTrigger.perform,
} as unknown as Parameters<typeof invokeTrigger>[0];
const poll = async (
  store: PollingStore,
  options: {
    params?: Record<string, unknown>;
    paginationState?: PollCursor;
  } = {},
): Promise<PollResult> => {
  const { result } = await invokeTrigger(
    triggerUnderTest,
    store.context,
    (options.paginationState
      ? { paginationState: options.paginationState }
      : undefined) as unknown as Parameters<typeof invokeTrigger>[2],
    {
      connection: testConnection,
      resourceType: "orders",
      lookBackDate: "",
      ...options.params,
    } as unknown as Parameters<typeof invokeTrigger>[3],
  );
  return result as unknown as PollResult;
};
const driveBatchedPoll = async (
  store: PollingStore,
  params: Record<string, unknown> = {},
  maxRounds = 100,
): Promise<PollResult[]> => {
  const rounds: PollResult[] = [];
  let paginationState: PollCursor | undefined;
  for (let i = 0; i < maxRounds; i++) {
    const round = await poll(store, { params, paginationState });
    rounds.push(round);
    paginationState = round.payload.paginationState;
    if (!paginationState) break;
  }
  return rounds;
};
const idsOf = (rounds: PollResult[]): number[] =>
  rounds.flatMap((r) => r.payload.body.data.created.map((rec) => rec.id));
beforeEach(() => {
  getMock.mockReset();
});
afterEach(() => {
  vi.useRealTimers();
});
describe("normal rounds (orders, products, coupons)", () => {
  test("requests >= watermark and <= safe horizon through strict, offset-less GMT bounds, sorted by date ascending, page 1", async () => {
    const woo = fakeWoo([order(1, 5)]);
    const store = createPollingStore({ lastPolledAt: isoAt(0) });
    freezeClockAt(POLL_ONE_AT);
    await poll(store);
    expect(woo.requests).toEqual([
      {
        after: "2026-04-30T23:59:59",
        before: "2026-06-01T11:59:01",
        dates_are_gmt: true,
        per_page: POLL_PAGE_SIZE,
        page: 1,
        orderby: "date",
        order: "asc",
      },
    ]);
    expect(WATERMARK_SKEW_MARGIN_MS).toBe(60000);
  });
  test("works for products and coupons the same way", async () => {
    for (const resourceType of ["products", "coupons"]) {
      const woo = fakeWoo([order(1, 5)]);
      const store = createPollingStore({ lastPolledAt: isoAt(0) });
      freezeClockAt(POLL_ONE_AT);
      const result = await poll(store, { params: { resourceType } });
      expect(woo.requests).toHaveLength(1);
      expect(result.payload.body.data.created.map((r) => r.id)).toEqual([1]);
    }
    expect(getMock.mock.calls.map((c) => c[0])).toEqual([
      "/products",
      "/coupons",
    ]);
  });
  test("commits the newest second as the watermark with the ids sharing it as boundaryIds", async () => {
    fakeWoo([order(1, 1), order(2, 9), order(3, 9)]);
    const store = createPollingStore({ lastPolledAt: isoAt(0) });
    freezeClockAt(POLL_ONE_AT);
    const result = await poll(store);
    expect(result.payload.body.data).toEqual({
      created: [order(1, 1), order(2, 9), order(3, 9)],
      updated: [],
    });
    expect(store.currentState()).toEqual({
      lastPolledAt: isoAt(9),
      boundaryIds: [2, 3],
    });
  });
  test("does not deliver a boundary record again, and delivers a later one at the same second", async () => {
    fakeWoo([order(2, 9), order(3, 9)]);
    const store = createPollingStore({
      lastPolledAt: isoAt(9),
      boundaryIds: [2],
    });
    freezeClockAt(POLL_ONE_AT);
    const result = await poll(store);
    expect(result.payload.body.data.created.map((r) => r.id)).toEqual([3]);
    expect(store.currentState()).toEqual({
      lastPolledAt: isoAt(9),
      boundaryIds: [2, 3],
    });
  });
  test("leaves records newer than the safe horizon for a later recurrence", async () => {
    const late = {
      id: 9,
      date_created_gmt: "2026-06-01T11:59:30",
    } as WooCommerceRecord;
    fakeWoo([order(1, 5), late]);
    const store = createPollingStore({ lastPolledAt: isoAt(0) });
    freezeClockAt(POLL_ONE_AT);
    const first = await poll(store);
    expect(first.payload.body.data.created.map((r) => r.id)).toEqual([1]);
    freezeClockAt(POLL_TWO_AT);
    const second = await poll(store);
    expect(second.payload.body.data.created.map((r) => r.id)).toEqual([9]);
  });
  test("skips, without delivering, a record below the watermark and never moves the watermark backward", async () => {
    getMock.mockResolvedValue({
      data: [order(1, 2), order(2, 6)],
      headers: {},
    });
    const store = createPollingStore({ lastPolledAt: isoAt(5) });
    freezeClockAt(POLL_ONE_AT);
    const result = await poll(store);
    expect(result.payload.body.data.created.map((r) => r.id)).toEqual([2]);
    expect(store.currentState()).toMatchObject({ lastPolledAt: isoAt(6) });
  });
  test("a cold poll with no Look-back Date starts at now, sends no request, and stores the watermark", async () => {
    const woo = fakeWoo([order(1, 5)]);
    const store = createPollingStore();
    freezeClockAt(POLL_ONE_AT);
    const result = await poll(store);
    expect(woo.requests).toEqual([]);
    expect(result.polledNoChanges).toBe(true);
    expect(store.currentState()).toEqual({
      lastPolledAt: "2026-06-01T12:00:00.000Z",
      boundaryIds: [],
    });
  });
  test("reports polledNoChanges on a scheduled round that delivers nothing", async () => {
    fakeWoo([]);
    const store = createPollingStore({ lastPolledAt: isoAt(0) });
    freezeClockAt(POLL_ONE_AT);
    const result = await poll(store);
    expect(result.polledNoChanges).toBe(true);
    expect(result.payload.paginationState).toBeUndefined();
  });
});
describe("multi-round drain, batching on", () => {
  const backlog = oneEachSecond(1, 250, 1);
  test("round one returns a cursor and leaves the committed watermark alone; the last round commits it", async () => {
    fakeWoo(backlog);
    const store = createPollingStore({ lastPolledAt: isoAt(0) }, true);
    freezeClockAt(POLL_ONE_AT);
    const first = await poll(store);
    expect(first.payload.body.data.created).toHaveLength(POLL_PAGE_SIZE);
    expect(first.payload.paginationState).toEqual({
      watermark: isoAt(100),
      boundaryIds: [100],
    });
    expect(store.currentState()).toEqual({
      lastPolledAt: isoAt(0),
      cursor: first.payload.paginationState,
    });
  });
  test("drains the whole backlog once, in order, one page per request, then commits the watermark", async () => {
    const woo = fakeWoo(backlog);
    const store = createPollingStore({ lastPolledAt: isoAt(0) }, true);
    freezeClockAt(POLL_ONE_AT);
    const rounds = await driveBatchedPoll(store);
    expect(rounds).toHaveLength(3);
    expect(idsOf(rounds)).toEqual(backlog.map((r) => r.id));
    expect(woo.requests.every((r) => r.page === 1)).toBe(true);
    expect(rounds[2].payload.paginationState).toBeUndefined();
    expect(store.currentState()).toEqual({
      lastPolledAt: isoAt(250),
      boundaryIds: [250],
    });
  });
  test("a round that arrives with paginationState resumes from it, not from the stored cursor", async () => {
    const woo = fakeWoo(backlog);
    const store = createPollingStore(
      {
        lastPolledAt: isoAt(0),
        cursor: { watermark: isoAt(10), boundaryIds: [10] },
      },
      true,
    );
    freezeClockAt(POLL_ONE_AT);
    await poll(store, {
      paginationState: { watermark: isoAt(200), boundaryIds: [200] },
    });
    expect(woo.requests[0].after).toBe(gmtAt(199));
  });
  test("never reports polledNoChanges on a platform-driven round, even an empty last one", async () => {
    fakeWoo(oneEachSecond(1, POLL_PAGE_SIZE, 1));
    const store = createPollingStore({ lastPolledAt: isoAt(0) }, true);
    freezeClockAt(POLL_ONE_AT);
    const rounds = await driveBatchedPoll(store);
    expect(rounds).toHaveLength(2);
    expect(rounds[1].payload.body.data.created).toEqual([]);
    expect(rounds.map((r) => r.polledNoChanges)).toEqual([false, false]);
  });
  test("getNextPaginationState echoes the cursor perform decided, and is null without one", () => {
    const echo = pollNewRecordsTrigger.triggerResolver?.getNextPaginationState;
    const cursor = { watermark: isoAt(1), boundaryIds: [1] };
    expect(
      echo?.({} as never, { payload: { paginationState: cursor } } as never),
    ).toEqual(cursor);
    expect(echo?.({} as never, { payload: {} } as never)).toBeNull();
  });
});
describe("unbatched window", () => {
  test("two performs without paginationState drain a backlog past the window, the second resuming from the mirrored cursor", async () => {
    const total = POLL_PAGE_SIZE * MAX_POLL_PAGES + 150;
    const backlog = oneEachSecond(1, total, 1);
    const woo = fakeWoo(backlog);
    const store = createPollingStore({ lastPolledAt: isoAt(0) });
    freezeClockAt(POLL_ONE_AT);
    const first = await poll(store);
    expect(woo.requests).toHaveLength(MAX_POLL_PAGES);
    expect(first.payload.body.data.created).toHaveLength(
      POLL_PAGE_SIZE + (MAX_POLL_PAGES - 1) * (POLL_PAGE_SIZE - 1),
    );
    expect(first.payload.paginationState).toBeDefined();
    expect(store.currentState()).toMatchObject({
      lastPolledAt: isoAt(0),
      cursor: first.payload.paginationState,
    });
    const second = await poll(store);
    expect(idsOf([first, second])).toEqual(backlog.map((r) => r.id));
    expect(second.payload.paginationState).toBeUndefined();
    expect(store.currentState()).toEqual({
      lastPolledAt: isoAt(total),
      boundaryIds: [total],
    });
  });
  test("an unfinished unbatched round never reports polledNoChanges", async () => {
    fakeWoo(oneEachSecond(1, POLL_PAGE_SIZE * MAX_POLL_PAGES, 1));
    const store = createPollingStore({ lastPolledAt: isoAt(0) });
    freezeClockAt(POLL_ONE_AT);
    const result = await poll(store);
    expect(result.payload.paginationState).toBeDefined();
    expect(result.polledNoChanges).toBe(false);
  });
});
describe("tie group, drained by exclude", () => {
  const tieSec = 50;
  test("drains one second by excluding delivered ids, never by page or offset, then advances past it", async () => {
    const rows = [...sameSecond(1, 130, tieSec), order(500, 70)];
    const woo = fakeWoo(rows);
    const store = createPollingStore({ lastPolledAt: isoAt(0) }, true);
    freezeClockAt(POLL_ONE_AT);
    const rounds = await driveBatchedPoll(store);
    expect(idsOf(rounds)).toEqual([...rows.map((r) => r.id)]);
    expect(new Set(idsOf(rounds)).size).toBe(rows.length);
    const firstHundred = Array.from({ length: 100 }, (_, i) => i + 1);
    expect(rounds[0].payload.paginationState).toEqual({
      watermark: isoAt(tieSec),
      boundaryIds: firstHundred,
    });
    expect(rounds[1].payload.body.data.created).toEqual([]);
    expect(rounds[1].payload.paginationState).toEqual({
      watermark: isoAt(tieSec),
      boundaryIds: firstHundred,
      tieGroup: {},
    });
    expect(woo.requests[1].exclude).toBeUndefined();
    expect(woo.requests[2]).toMatchObject({
      after: gmtAt(tieSec - 1),
      before: gmtAt(tieSec + 1),
      exclude: firstHundred.join(","),
      page: 1,
      orderby: "date",
      order: "asc",
    });
    expect(rounds[2].payload.paginationState).toEqual({
      watermark: isoAt(tieSec + 1),
      boundaryIds: [],
    });
    expect(woo.requests.every((r) => r.page === 1)).toBe(true);
  });
  test("a record that leaves the second mid-drain does not shift or skip the rest", async () => {
    const rows = sameSecond(1, 130, tieSec);
    fakeWoo(rows);
    const store = createPollingStore({ lastPolledAt: isoAt(0) }, true);
    freezeClockAt(POLL_ONE_AT);
    const first = await poll(store);
    const second = await poll(store, {
      paginationState: first.payload.paginationState,
    });
    expect(second.payload.paginationState?.tieGroup).toEqual({});
    rows[105].date_created_gmt = gmtAt(tieSec + 30);
    const third = await poll(store, {
      paginationState: second.payload.paginationState,
    });
    expect(
      [first, second, third].flatMap((r) =>
        r.payload.body.data.created.map((rec) => rec.id),
      ),
    ).toEqual(rows.filter((_, i) => i !== 105).map((r) => r.id));
  });
  test("a tie group at the safe horizon keeps the cursor there, and a late arrival is delivered once on a later recurrence", async () => {
    const horizonSec = (Date.parse(`${HORIZON_ONE}Z`) - BASE_MS) / 1000;
    const rows = sameSecond(1, 130, horizonSec);
    fakeWoo(rows);
    const store = createPollingStore({ lastPolledAt: isoAt(0) }, true);
    freezeClockAt(POLL_ONE_AT);
    const rounds = await driveBatchedPoll(store);
    expect(idsOf(rounds)).toHaveLength(130);
    expect(store.currentState()).toEqual({
      lastPolledAt: isoAt(horizonSec),
      boundaryIds: rows.map((r) => r.id),
    });
    rows.push(order(999, horizonSec));
    freezeClockAt(POLL_TWO_AT);
    const next = await poll(store);
    expect(next.payload.body.data.created.map((r) => r.id)).toEqual([]);
    const after = await driveBatchedPoll(store);
    expect(idsOf(after)).toEqual([999]);
  });
  test("throws a descriptive error instead of sending a truncated exclude list", async () => {
    const rows = sameSecond(1, MAX_EXCLUDE_IDS + 150, tieSec);
    const woo = fakeWoo(rows);
    const store = createPollingStore({ lastPolledAt: isoAt(0) }, true);
    freezeClockAt(POLL_ONE_AT);
    const delivered: number[] = [];
    let paginationState: PollCursor | undefined;
    const run = async () => {
      for (let i = 0; i < 20; i++) {
        const round = await poll(store, { paginationState });
        delivered.push(...round.payload.body.data.created.map((r) => r.id));
        paginationState = round.payload.paginationState;
        if (!paginationState) return;
      }
    };
    await expect(run()).rejects.toThrow(
      new RegExp(
        `${MAX_EXCLUDE_IDS}.*exclude|exclude.*${MAX_EXCLUDE_IDS}`,
        "s",
      ),
    );
    expect(
      woo.requests.every(
        (r) => !r.exclude || r.exclude.split(",").length <= MAX_EXCLUDE_IDS,
      ),
    ).toBe(true);
    expect(new Set(delivered).size).toBe(delivered.length);
    expect(paginationState?.watermark).toBe(isoAt(tieSec));
  });
  test("a full tie page that adds nothing throws the no-progress error", async () => {
    const rows = sameSecond(1, POLL_PAGE_SIZE + 20, tieSec);
    getMock.mockImplementation(async () => ({
      data: rows.slice(0, POLL_PAGE_SIZE),
      headers: {},
    }));
    const store = createPollingStore({ lastPolledAt: isoAt(0) }, true);
    freezeClockAt(POLL_ONE_AT);
    const first = await poll(store);
    const second = await poll(store, {
      paginationState: first.payload.paginationState,
    });
    expect(second.payload.paginationState?.tieGroup).toEqual({});
    await expect(
      poll(store, { paginationState: second.payload.paginationState }),
    ).rejects.toThrow(/no progress/i);
  });
});
describe("no-progress guard", () => {
  test("a full normal page made only of records below the watermark throws instead of looping", async () => {
    getMock.mockResolvedValue({
      data: oneEachSecond(1, POLL_PAGE_SIZE, 1),
      headers: {},
    });
    const store = createPollingStore({ lastPolledAt: isoAt(500) });
    freezeClockAt(POLL_ONE_AT);
    await expect(poll(store)).rejects.toThrow(/no progress/i);
    expect(store.currentState()).toEqual({ lastPolledAt: isoAt(500) });
  });
});
describe("initial sync", () => {
  test("seeds from the Look-back Date with an inclusive window, with no day margin and no trimming", async () => {
    const woo = fakeWoo([order(1, -1), order(2, 0), order(3, 86400)]);
    const store = createPollingStore();
    freezeClockAt(POLL_ONE_AT);
    const result = await poll(store, { params: { lookBackDate: LOOK_BACK } });
    expect(woo.requests[0].after).toBe("2026-04-30T23:59:59");
    expect(result.payload.body.data.created.map((r) => r.id)).toEqual([2, 3]);
    expect(store.currentState()).toEqual({
      lastPolledAt: isoAt(86400),
      boundaryIds: [3],
    });
  });
  test("a stored position drives the window and the Look-back Date is ignored", async () => {
    const woo = fakeWoo([order(1, 100)]);
    const store = createPollingStore({ lastPolledAt: isoAt(50) });
    freezeClockAt(POLL_ONE_AT);
    await poll(store, { params: { lookBackDate: LOOK_BACK } });
    expect(woo.requests[0].after).toBe(gmtAt(49));
  });
  test("keeps seeding across recurrences until the backlog drains", async () => {
    const backlog = oneEachSecond(1, POLL_PAGE_SIZE * MAX_POLL_PAGES + 5, 0);
    fakeWoo(backlog);
    const store = createPollingStore();
    freezeClockAt(POLL_ONE_AT);
    const first = await poll(store, { params: { lookBackDate: LOOK_BACK } });
    const second = await poll(store, { params: { lookBackDate: LOOK_BACK } });
    expect(first.payload.paginationState).toBeDefined();
    expect(idsOf([first, second])).toEqual(backlog.map((r) => r.id));
    expect(second.payload.paginationState).toBeUndefined();
  });
});
describe("customers keep their time-window fetch", () => {
  const customer = (id: number, gmt: string): WooCommerceRecord => ({
    id,
    date_created_gmt: gmt,
  });
  test("a cold poll sends the original params, with no GMT flag, no upper bound and no exclude", async () => {
    const store = createPollingStore();
    freezeClockAt(POLL_ONE_AT);
    getMock.mockResolvedValue({ data: [], headers: {} });
    const result = await poll(store, { params: { resourceType: "customers" } });
    expect(getMock.mock.calls[0][0]).toBe("/customers");
    expect(getMock.mock.calls[0][1].params).toEqual({
      after: POLL_ONE_AT,
      per_page: 100,
      orderby: "date",
      order: "asc",
      page: 1,
    });
    expect(result.polledNoChanges).toBe(true);
    expect(store.currentState()).toEqual({ lastPolledAt: POLL_ONE_AT });
  });
  test("fetches every page in one recurrence and stores the poll start, never a cursor", async () => {
    const store = createPollingStore({
      lastPolledAt: "2026-05-30T00:00:00.000Z",
    });
    freezeClockAt(POLL_ONE_AT);
    getMock
      .mockResolvedValueOnce({
        data: [customer(1, "2026-05-31T10:00:00")],
        headers: { "x-wp-totalpages": "2" },
      })
      .mockResolvedValueOnce({
        data: [customer(2, "2026-05-31T11:00:00")],
        headers: {},
      });
    const result = await poll(store, { params: { resourceType: "customers" } });
    expect(getMock.mock.calls.map((c) => c[1].params.page)).toEqual([1, 2]);
    expect(getMock.mock.calls[0][1].params.after).toBe(
      "2026-05-30T00:00:00.000Z",
    );
    expect(result.payload.body.data.created.map((r) => r.id)).toEqual([1, 2]);
    expect(result.payload.paginationState).toBeUndefined();
    expect(store.currentState()).toEqual({ lastPolledAt: POLL_ONE_AT });
  });
  test("the initial sync still asks a day early and trims to the exact Look-back Date", async () => {
    const store = createPollingStore();
    freezeClockAt(POLL_ONE_AT);
    getMock.mockResolvedValue({
      data: [
        customer(1, "2026-04-30T23:59:59"),
        customer(2, "2026-05-01T00:00:00"),
        { id: 3 },
      ],
      headers: {},
    });
    const result = await poll(store, {
      params: { resourceType: "customers", lookBackDate: LOOK_BACK },
    });
    expect(getMock.mock.calls[0][1].params.after).toBe(
      new Date(Date.parse(LOOK_BACK) - DAY_MS).toISOString(),
    );
    expect(result.payload.body.data.created.map((r) => r.id)).toEqual([2, 3]);
  });
  test("a second poll re-sends the first poll's start and re-emits what comes back", async () => {
    const store = createPollingStore();
    getMock.mockResolvedValue({
      data: [customer(1, "2026-06-01T11:59:00")],
      headers: {},
    });
    freezeClockAt(POLL_ONE_AT);
    const first = await poll(store, { params: { resourceType: "customers" } });
    freezeClockAt("2026-06-01T12:05:00.000Z");
    const second = await poll(store, { params: { resourceType: "customers" } });
    expect(getMock.mock.calls[1][1].params.after).toBe(POLL_ONE_AT);
    expect(first.payload.body.data.created).toHaveLength(1);
    expect(second.payload.body.data.created).toHaveLength(1);
    expect(store.currentState()).toEqual({
      lastPolledAt: "2026-06-01T12:05:00.000Z",
    });
  });
});
describe("helpers", () => {
  test("resolvePollWindow prefers state, then Look-back Date, then now", () => {
    expect(resolvePollWindow({ lastPolledAt: "S" }, LOOK_BACK, "N")).toEqual({
      after: "S",
    });
    expect(resolvePollWindow(null, "", "N")).toEqual({ after: "N" });
    expect(resolvePollWindow(undefined, LOOK_BACK, "N")).toMatchObject({
      notBefore: LOOK_BACK,
    });
  });
  test("trimToWindow is a no-op without a notBefore", () => {
    const records = [order(1, 0)];
    expect(trimToWindow(records, { after: "x" })).toBe(records);
  });
  test("lookBackDateClean returns empty for empty input and midnight UTC for a date", () => {
    expect(lookBackDateClean("")).toBe("");
    expect(lookBackDateClean(undefined)).toBe("");
    expect(lookBackDateClean("2026-01-01")).toBe("2026-01-01T00:00:00.000Z");
  });
  test("lookBackDateClean rejects a malformed, non-calendar, or future date by label", () => {
    expect(() => lookBackDateClean("01/01/2026")).toThrow(/Look-back Date/);
    expect(() => lookBackDateClean("2026-02-31")).toThrow(/YYYY-MM-DD/);
    freezeClockAt(POLL_ONE_AT);
    expect(() => lookBackDateClean("2026-06-02")).toThrow(/future/);
  });
});
describe("batching declaration", () => {
  const created = [order(1, 1), order(2, 2)];
  test("New Records is opt-in batchable with a default batch size and echoes its cursor", () => {
    expect(pollNewRecordsTrigger.triggerResolverSupport).toBe("valid");
    expect(pollNewRecordsTrigger.batchConfig).toEqual({ batchSize: 50 });
    expect(pollNewRecordsTrigger.triggerResolver?.resolveItems).toBeInstanceOf(
      Function,
    );
    expect(
      pollNewRecordsTrigger.triggerResolver?.getNextPaginationState,
    ).toBeInstanceOf(Function);
  });
  test("resolvePollingRecordChanges tags every record with how it changed", () => {
    const updated = [order(3, 3)];
    expect(resolvePollingRecordChanges({ created, updated })).toEqual([
      { changeType: "created", record: created[0] },
      { changeType: "created", record: created[1] },
      { changeType: "updated", record: updated[0] },
    ]);
  });
  test("resolvePollingRecordChanges returns [] for empty or undefined changes and tolerates an absent array", () => {
    expect(resolvePollingRecordChanges({ created: [], updated: [] })).toEqual(
      [],
    );
    expect(resolvePollingRecordChanges(undefined)).toEqual([]);
    expect(
      resolvePollingRecordChanges({
        created,
      } as unknown as PollingChangesObject),
    ).toHaveLength(2);
  });
  test("resolveItems flattens the payload shape perform actually returns", async () => {
    fakeWoo(created);
    const store = createPollingStore({ lastPolledAt: isoAt(0) });
    freezeClockAt(POLL_ONE_AT);
    const result = await poll(store);
    const items = pollNewRecordsTrigger.triggerResolver?.resolveItems?.(
      {} as never,
      { payload: { body: { data: result.payload.body.data } } } as never,
    );
    expect(items).toEqual(
      created.map((record) => ({ changeType: "created", record })),
    );
  });
  test("Look-back Date leads the optional tier, below the required inputs", () => {
    expect(Object.keys(pollNewRecordsTrigger.inputs ?? {})).toEqual([
      "connection",
      "resourceType",
      "lookBackDate",
    ]);
  });
});
