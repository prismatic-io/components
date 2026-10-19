import type { ActionContext, Connection } from "@prismatic-io/spectral";
import {
  createConnection,
  invokeTrigger,
} from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import Odoo from "odoo-await";
import { odooApiKey } from "../connections/odooApiKey";
import { odooBasicAuth } from "../connections/odooBasicAuth";
import { pollChangesExamplePayload } from "../examplePayloads";
import { fetchOdooPageLegacy } from "../legacy";
import type { OdooRecord, PollCursor, PollingChangesObject } from "../types";
import {
  drainWatermark,
  lookBackDateClean,
  resolvePollingRecordChanges,
} from "../util";
import { type Mock, vi } from "vitest";
import { pollChangesTrigger } from "./pollChangesTrigger";
vi.mock("odoo-await");
nock.disableNetConnect();
const ODOO_ORIGIN = "https://odoo.example.com";
const API_KEY = "test-api-key";
const DB = "odoo_db";
const MODEL = "res.partner";
const SEARCH_READ_PATH = `/json/2/${MODEL}/search_read`;
const PAGE = 200;
const MAX_PAGES = 50;
const POLL_ONE_AT = "2026-06-01T12:00:00.000Z";
const POLL_TWO_AT = "2026-06-01T13:00:00.000Z";
const HORIZON_ONE = "2026-06-01 11:59:00";
const SEEDED_CURSOR = "2026-05-01T00:00:00.000Z";
const LOOK_BACK = "2026-05-01T00:00:00.000Z";
const BASE_MS = Date.parse(SEEDED_CURSOR);
const isoAt = (sec: number): string =>
  new Date(BASE_MS + sec * 1000).toISOString();
const odooAt = (sec: number): string =>
  isoAt(sec)
    .replace("T", " ")
    .replace(/\.\d+Z$/, "");
const row = (
  id: number,
  writeSec: number,
  createSec = writeSec,
): OdooRecord => ({
  id,
  create_date: odooAt(createSec),
  write_date: odooAt(writeSec),
});
const testConnection = createConnection(odooApiKey, {
  baseUrl: ODOO_ORIGIN,
  db: DB,
  apiKey: API_KEY,
}) as unknown as Connection;
const legacyConnection = createConnection(odooBasicAuth, {
  baseUrl: ODOO_ORIGIN,
  db: DB,
  username: "john.doe@example.com",
  password: "test-password",
}) as unknown as Connection;
const odooNock = (): nock.Scope =>
  nock(ODOO_ORIGIN, {
    reqheaders: {
      authorization: `Bearer ${API_KEY}`,
      "x-odoo-database": DB,
    },
  });
interface SearchReadBody {
  domain: [string, string, string | number][];
  fields: unknown[];
  limit: number;
  order: string;
  offset?: number;
}
const fakeOdoo = (rows: OdooRecord[]) => {
  const requests: SearchReadBody[] = [];
  const matches = (
    record: OdooRecord,
    [field, op, value]: [string, string, string | number],
  ): boolean => {
    const actual = record[field] as string | number;
    switch (op) {
      case ">=":
        return actual >= value;
      case ">":
        return actual > value;
      case "<=":
        return actual <= value;
      case "<":
        return actual < value;
      default:
        throw new Error(`fakeOdoo does not implement operator ${op}`);
    }
  };
  const search = (body: SearchReadBody): OdooRecord[] => {
    requests.push(body);
    const keys = body.order.split(",").map((part) => part.trim().split(" ")[0]);
    return rows
      .filter((record) => body.domain.every((term) => matches(record, term)))
      .sort((a, b) => {
        for (const key of keys) {
          const left = a[key] as string | number;
          const right = b[key] as string | number;
          if (left < right) return -1;
          if (left > right) return 1;
        }
        return 0;
      })
      .slice(0, body.limit);
  };
  const serveJson2 = (): void => {
    odooNock()
      .persist()
      .post(SEARCH_READ_PATH)
      .reply(200, (_uri, body) => search(body as SearchReadBody));
  };
  return { rows, requests, search, serveJson2 };
};
interface PollingStore {
  currentState: () => Record<string, unknown>;
  writes: Record<string, unknown>[];
  context: Partial<ActionContext>;
}
const createPollingStore = (
  seedState: Record<string, unknown> = {},
  batchEnabled = false,
): PollingStore => {
  let state: Record<string, unknown> = seedState;
  const writes: Record<string, unknown>[] = [];
  return {
    currentState: () => state,
    writes,
    context: {
      batch: batchEnabled ? { enabled: true } : undefined,
      polling: {
        getState: () => state,
        setState: (newState: Record<string, unknown>) => {
          state = newState;
          writes.push(newState);
        },
        invokeAction: () => {
          throw new Error("polling.invokeAction is not stubbed in tests");
        },
      },
    } as unknown as Partial<ActionContext>,
  };
};
const freezeClockAt = (isoInstant: string): void => {
  vi.useFakeTimers({ toFake: ["Date"] });
  vi.setSystemTime(new Date(isoInstant));
};
const triggerUnderTest = {
  perform: pollChangesTrigger.perform,
} as unknown as Parameters<typeof invokeTrigger>[0];
interface PollChanges {
  created: OdooRecord[];
  updated: OdooRecord[];
}
interface PollResult {
  payload: {
    body: {
      data: PollChanges;
    };
    paginationState?: PollCursor;
  };
  polledNoChanges: boolean;
}
const pollParams = {
  connection: testConnection,
  model: MODEL,
  showNewRecords: true,
  showUpdatedRecords: true,
};
const poll = async (
  store: PollingStore,
  options: {
    params?: Record<string, unknown>;
    paginationState?: PollCursor;
  } = {},
): Promise<PollResult> => {
  const payload = {
    ...pollChangesExamplePayload.payload,
    ...(options.paginationState
      ? { paginationState: options.paginationState }
      : {}),
  };
  const { result } = await invokeTrigger(
    triggerUnderTest,
    store.context,
    payload as unknown as Parameters<typeof invokeTrigger>[2],
    { ...pollParams, ...options.params } as unknown as Parameters<
      typeof invokeTrigger
    >[3],
  );
  return result as unknown as PollResult;
};
const driveBatchedPoll = async (
  store: PollingStore,
  options: {
    params?: Record<string, unknown>;
    maxRounds?: number;
  } = {},
): Promise<PollResult[]> => {
  const rounds: PollResult[] = [];
  let paginationState: PollCursor | undefined;
  for (let i = 0; i < (options.maxRounds ?? 100); i++) {
    const round = await poll(store, {
      params: options.params,
      paginationState,
    });
    rounds.push(round);
    paginationState = round.payload.paginationState;
    if (!paginationState) break;
  }
  return rounds;
};
const idsOf = (records: OdooRecord[]): unknown[] =>
  records.map((record) => record.id);
const deliveredIds = (rounds: PollResult[]): number[] =>
  rounds.flatMap((round) => [
    ...idsOf(round.payload.body.data.created),
    ...idsOf(round.payload.body.data.updated),
  ]) as number[];
const fixtureBuckets = pollChangesExamplePayload.payload.body
  .data as unknown as PollChanges;
const fixtureCreated = fixtureBuckets.created;
const fixtureUpdated = fixtureBuckets.updated;
afterEach(() => {
  nock.cleanAll();
  vi.useRealTimers();
});
describe("pollChangesTrigger: normal rounds", () => {
  test("a cold first poll with no Look-back Date sends no request and only seeds the watermark", async () => {
    const odoo = fakeOdoo([row(1, 0)]);
    odoo.serveJson2();
    const store = createPollingStore();
    freezeClockAt(POLL_ONE_AT);
    const result = await poll(store);
    expect(odoo.requests).toEqual([]);
    expect(result.payload.body.data).toEqual({ created: [], updated: [] });
    expect(result.polledNoChanges).toBe(true);
    expect(store.currentState()).toEqual({
      lastPolledAt: POLL_ONE_AT,
      boundaryIds: [],
    });
  });
  test("requests >= watermark and <= safe horizon, sorted by write_date then id, with no offset", async () => {
    const odoo = fakeOdoo([...fixtureCreated, ...fixtureUpdated]);
    odoo.serveJson2();
    const store = createPollingStore({ lastPolledAt: SEEDED_CURSOR });
    freezeClockAt(POLL_ONE_AT);
    const result = await poll(store);
    expect(odoo.requests).toEqual([
      {
        domain: [
          ["write_date", ">=", "2026-05-01 00:00:00"],
          ["write_date", "<=", HORIZON_ONE],
        ],
        fields: [],
        limit: PAGE,
        order: "write_date asc, id asc",
      },
    ]);
    expect(result.payload.body.data.created).toEqual(fixtureCreated);
    expect(result.payload.body.data.updated).toEqual(fixtureUpdated);
    expect(result.polledNoChanges).toBe(false);
  });
  test("commits the last record's second as the watermark, with the ids sharing it as boundaryIds", async () => {
    const odoo = fakeOdoo([row(1, 10), row(2, 20), row(3, 20)]);
    odoo.serveJson2();
    const store = createPollingStore({ lastPolledAt: SEEDED_CURSOR });
    freezeClockAt(POLL_ONE_AT);
    await poll(store);
    expect(store.currentState()).toEqual({
      lastPolledAt: isoAt(20),
      boundaryIds: [2, 3],
    });
  });
  test("does not deliver a boundary record again, and delivers a later edit of it", async () => {
    const odoo = fakeOdoo([row(1, 10), row(2, 20)]);
    odoo.serveJson2();
    const store = createPollingStore({ lastPolledAt: SEEDED_CURSOR });
    freezeClockAt(POLL_ONE_AT);
    const pollOne = await poll(store);
    expect(idsOf(pollOne.payload.body.data.created)).toEqual([1, 2]);
    freezeClockAt(POLL_TWO_AT);
    const pollTwo = await poll(store);
    expect(odoo.requests[1].domain[0]).toEqual([
      "write_date",
      ">=",
      odooAt(20),
    ]);
    expect(pollTwo.payload.body.data).toEqual({ created: [], updated: [] });
    expect(pollTwo.polledNoChanges).toBe(true);
    odoo.rows[1].write_date = odooAt(30);
    const pollThree = await poll(store);
    expect(idsOf(pollThree.payload.body.data.updated)).toEqual([2]);
    expect(store.currentState()).toEqual({
      lastPolledAt: isoAt(30),
      boundaryIds: [2],
    });
  });
  test("leaves records newer than the safe horizon for a later recurrence", async () => {
    const insideMargin = row(2, 3600 * 24 * 31 + 3600 * 12 - 30);
    const olderRecord = row(1, 10);
    const odoo = fakeOdoo([olderRecord, insideMargin]);
    odoo.serveJson2();
    const store = createPollingStore({ lastPolledAt: SEEDED_CURSOR });
    freezeClockAt(POLL_ONE_AT);
    const pollOne = await poll(store);
    expect(odoo.requests[0].domain[1]).toEqual([
      "write_date",
      "<=",
      HORIZON_ONE,
    ]);
    expect(idsOf(pollOne.payload.body.data.created)).toEqual([1]);
    expect(store.currentState()).toEqual({
      lastPolledAt: isoAt(10),
      boundaryIds: [1],
    });
    freezeClockAt(POLL_TWO_AT);
    const pollTwo = await poll(store);
    expect(idsOf(pollTwo.payload.body.data.created)).toEqual([2]);
  });
  test("honors the visibility filters outside an initial sync", async () => {
    const odoo = fakeOdoo([row(1, 10, 10), row(2, 20, -100)]);
    odoo.serveJson2();
    const store = createPollingStore({ lastPolledAt: SEEDED_CURSOR });
    freezeClockAt(POLL_ONE_AT);
    const result = await poll(store, {
      params: { showNewRecords: false, showUpdatedRecords: true },
    });
    expect(result.payload.body.data.created).toEqual([]);
    expect(idsOf(result.payload.body.data.updated)).toEqual([2]);
  });
});
describe("pollChangesTrigger: multi-round drain (batching on)", () => {
  const backlog = (): OdooRecord[] =>
    Array.from({ length: 450 }, (_, i) => row(i + 1, i));
  test("round one returns a cursor and leaves the committed watermark alone; the last round commits it", async () => {
    const odoo = fakeOdoo(backlog());
    odoo.serveJson2();
    const store = createPollingStore({ lastPolledAt: SEEDED_CURSOR }, true);
    freezeClockAt(POLL_ONE_AT);
    const first = await poll(store);
    expect(odoo.requests).toHaveLength(1);
    expect(deliveredIds([first])).toHaveLength(PAGE);
    expect(first.payload.paginationState).toEqual({
      watermark: isoAt(199),
      boundaryIds: [200],
    });
    expect(first.polledNoChanges).toBe(false);
    expect(store.currentState()).toEqual({
      lastPolledAt: SEEDED_CURSOR,
      cursor: { watermark: isoAt(199), boundaryIds: [200] },
    });
  });
  test("drains the whole backlog once across rounds, then commits the watermark", async () => {
    const odoo = fakeOdoo(backlog());
    odoo.serveJson2();
    const store = createPollingStore({ lastPolledAt: SEEDED_CURSOR }, true);
    freezeClockAt(POLL_ONE_AT);
    const rounds = await driveBatchedPoll(store);
    expect(rounds).toHaveLength(3);
    expect(deliveredIds(rounds).sort((a, b) => a - b)).toEqual(
      Array.from({ length: 450 }, (_, i) => i + 1),
    );
    expect(rounds[2].payload.paginationState).toBeUndefined();
    expect(odoo.requests.every((request) => !("offset" in request))).toBe(true);
    expect(store.currentState()).toEqual({
      lastPolledAt: isoAt(449),
      boundaryIds: [450],
    });
  });
  test("a round that arrives with paginationState resumes from it, not from the stored cursor", async () => {
    const odoo = fakeOdoo(backlog());
    odoo.serveJson2();
    const store = createPollingStore(
      {
        lastPolledAt: SEEDED_CURSOR,
        cursor: { watermark: isoAt(5), boundaryIds: [6] },
      },
      true,
    );
    freezeClockAt(POLL_ONE_AT);
    await poll(store, {
      paginationState: { watermark: isoAt(300), boundaryIds: [301] },
    });
    expect(odoo.requests[0].domain[0]).toEqual([
      "write_date",
      ">=",
      odooAt(300),
    ]);
  });
  test("never reports polledNoChanges on a platform-driven round, even an empty last one", async () => {
    const odoo = fakeOdoo([row(1, 0)]);
    odoo.serveJson2();
    const store = createPollingStore({ lastPolledAt: SEEDED_CURSOR }, true);
    freezeClockAt(POLL_ONE_AT);
    const cursor = { watermark: isoAt(0), boundaryIds: [1] };
    const driven = await poll(store, { paginationState: cursor });
    const scheduled = await poll(
      createPollingStore({ lastPolledAt: isoAt(0), boundaryIds: [1] }, true),
    );
    expect(driven.payload.body.data).toEqual({ created: [], updated: [] });
    expect(driven.polledNoChanges).toBe(false);
    expect(scheduled.polledNoChanges).toBe(true);
  });
  test("getNextPaginationState echoes the cursor perform decided, and is null without one", () => {
    const resolver = pollChangesTrigger.triggerResolver;
    const cursor: PollCursor = { watermark: isoAt(5), boundaryIds: [1] };
    const next = (paginationState?: PollCursor) =>
      resolver?.getNextPaginationState?.(
        {} as never,
        {
          payload: { ...pollChangesExamplePayload.payload, paginationState },
        } as never,
      );
    expect(next(cursor)).toEqual(cursor);
    expect(next(undefined)).toBeNull();
  });
});
describe("pollChangesTrigger: unbatched window", () => {
  test("drains several pages inside one recurrence", async () => {
    const odoo = fakeOdoo(Array.from({ length: 450 }, (_, i) => row(i + 1, i)));
    odoo.serveJson2();
    const store = createPollingStore({ lastPolledAt: SEEDED_CURSOR });
    freezeClockAt(POLL_ONE_AT);
    const result = await poll(store);
    expect(deliveredIds([result])).toHaveLength(450);
    expect(odoo.requests).toHaveLength(3);
    expect(result.payload.paginationState).toBeUndefined();
    expect(store.currentState()).toEqual({
      lastPolledAt: isoAt(449),
      boundaryIds: [450],
    });
  });
  test("a backlog past the window resumes from the mirrored cursor on the next recurrence", async () => {
    const total = PAGE * MAX_PAGES + 500;
    const odoo = fakeOdoo(
      Array.from({ length: total }, (_, i) => row(i + 1, i)),
    );
    odoo.serveJson2();
    const store = createPollingStore({ lastPolledAt: SEEDED_CURSOR });
    freezeClockAt(POLL_ONE_AT);
    const pollOne = await poll(store);
    expect(deliveredIds([pollOne])).toHaveLength(
      PAGE * MAX_PAGES - (MAX_PAGES - 1),
    );
    expect(store.currentState().lastPolledAt).toBe(SEEDED_CURSOR);
    expect(store.currentState().cursor).toBeDefined();
    freezeClockAt(POLL_TWO_AT);
    const pollTwo = await poll(store);
    const all = [...deliveredIds([pollOne]), ...deliveredIds([pollTwo])];
    expect(new Set(all).size).toBe(total);
    expect(all).toHaveLength(total);
    expect(store.currentState()).toEqual({
      lastPolledAt: isoAt(total - 1),
      boundaryIds: [total],
    });
  });
});
describe("pollChangesTrigger: tie group", () => {
  const tieBacklog = (writeSec: number): OdooRecord[] =>
    Array.from({ length: 450 }, (_, i) => row(450 - i, writeSec));
  test("drains one timestamp by id keyset, never by offset, then advances past it", async () => {
    const odoo = fakeOdoo(tieBacklog(100));
    odoo.serveJson2();
    const store = createPollingStore({ lastPolledAt: SEEDED_CURSOR }, true);
    freezeClockAt(POLL_ONE_AT);
    const rounds = await driveBatchedPoll(store);
    expect(deliveredIds(rounds).sort((a, b) => a - b)).toEqual(
      Array.from({ length: 450 }, (_, i) => i + 1),
    );
    expect(deliveredIds(rounds)).toHaveLength(450);
    expect(odoo.requests.every((request) => !("offset" in request))).toBe(true);
    expect(odoo.requests[1].order).toBe("write_date asc, id asc");
    expect(odoo.requests[2]).toEqual({
      domain: [
        ["write_date", ">=", odooAt(100)],
        ["write_date", "<", odooAt(101)],
      ],
      fields: [],
      limit: PAGE,
      order: "id asc",
    });
    expect(odoo.requests[3].domain[2]).toEqual(["id", ">", 200]);
    expect(odoo.requests[4].domain[2]).toEqual(["id", ">", 400]);
    expect(store.currentState()).toEqual({
      lastPolledAt: isoAt(101),
      boundaryIds: [],
    });
  });
  test("a record that leaves the timestamp mid-pass does not shift or skip the rest", async () => {
    const odoo = fakeOdoo(tieBacklog(100));
    odoo.serveJson2();
    const store = createPollingStore({ lastPolledAt: SEEDED_CURSOR }, true);
    freezeClockAt(POLL_ONE_AT);
    const rounds: PollResult[] = [];
    let paginationState: PollCursor | undefined;
    for (let i = 0; i < 20; i++) {
      const round = await poll(store, { paginationState });
      rounds.push(round);
      paginationState = round.payload.paginationState;
      if (i === 1) {
        const edited = odoo.rows.find((record) => record.id === 250);
        if (edited) edited.write_date = odooAt(200);
      }
      if (!paginationState) break;
    }
    const delivered = deliveredIds(rounds);
    expect(delivered.filter((id) => id !== 250).sort((a, b) => a - b)).toEqual(
      Array.from({ length: 449 }, (_, i) => (i + 1 >= 250 ? i + 2 : i + 1)),
    );
    expect(delivered.filter((id) => id === 250)).toHaveLength(1);
  });
  test("keeps the timestamp when it is the safe horizon itself, and delivers a late arrival once", async () => {
    const horizonSec =
      (Date.parse("2026-06-01T11:59:00.000Z") - BASE_MS) / 1000;
    const odoo = fakeOdoo(tieBacklog(horizonSec));
    odoo.serveJson2();
    const store = createPollingStore({ lastPolledAt: SEEDED_CURSOR }, true);
    freezeClockAt(POLL_ONE_AT);
    const rounds = await driveBatchedPoll(store);
    expect(deliveredIds(rounds)).toHaveLength(450);
    const committed = store.currentState();
    expect(committed.lastPolledAt).toBe(isoAt(horizonSec));
    expect(committed.boundaryIds).toHaveLength(450);
    odoo.rows.push(row(451, horizonSec));
    freezeClockAt(POLL_TWO_AT);
    const next = await driveBatchedPoll(store);
    expect(deliveredIds(next)).toEqual([451]);
  });
});
describe("drainWatermark guards", () => {
  const cursor = (
    watermarkSec: number,
    boundaryIds: number[] = [],
  ): PollCursor => ({
    watermark: isoAt(watermarkSec),
    boundaryIds,
  });
  const HORIZON = isoAt(10000);
  test("skips, without delivering, a record below the watermark, and never moves the watermark backward", async () => {
    const page = [row(1, 5), row(2, 50)];
    const result = await drainWatermark(
      async () => page,
      cursor(50),
      HORIZON,
      1,
    );
    expect(idsOf(result.records)).toEqual([2]);
    expect(result.cursor.watermark).toBe(isoAt(50));
  });
  test("in a tie round skips a record not at the window's timestamp, and keeps it out of boundaryIds", async () => {
    const tie: PollCursor = {
      ...cursor(50, [1]),
      tieGroup: { lastKey: null },
    };
    const page = [row(1, 50), row(2, 51), row(3, 50)];
    const result = await drainWatermark(async () => page, tie, isoAt(50), 1);
    expect(idsOf(result.records)).toEqual([3]);
    expect(result.cursor.boundaryIds).toEqual([1, 3]);
  });
  test("counts the page length before skipping: a full page of boundary ids does not end the stream", async () => {
    const boundary = Array.from({ length: PAGE }, (_, i) => i + 1);
    const page = boundary.map((id) => row(id, 50));
    const result = await drainWatermark(
      async () => page,
      cursor(50, boundary),
      HORIZON,
      1,
    );
    expect(result.records).toEqual([]);
    expect(result.drained).toBe(false);
    expect(result.cursor.tieGroup).toEqual({ lastKey: null });
  });
});
describe("initial sync", () => {
  const filtersOff = {
    lookBackDate: LOOK_BACK,
    showNewRecords: false,
    showUpdatedRecords: false,
  };
  test("seeds from the Look-back Date with the inclusive >= filter, ignoring the visibility filters", async () => {
    const odoo = fakeOdoo([...fixtureCreated, ...fixtureUpdated]);
    odoo.serveJson2();
    const store = createPollingStore();
    freezeClockAt(POLL_ONE_AT);
    const result = await poll(store, { params: filtersOff });
    expect(odoo.requests[0].domain[0]).toEqual([
      "write_date",
      ">=",
      "2026-05-01 00:00:00",
    ]);
    expect(result.payload.body.data.created).toEqual(fixtureCreated);
    expect(result.payload.body.data.updated).toEqual(fixtureUpdated);
    expect(store.currentState()).toEqual({
      lastPolledAt: "2026-05-26T15:45:00.000Z",
      boundaryIds: [9],
    });
  });
  test("counts a record created exactly on the Look-back Date as created", async () => {
    const odoo = fakeOdoo([row(40, 0)]);
    odoo.serveJson2();
    const store = createPollingStore();
    freezeClockAt(POLL_ONE_AT);
    const result = await poll(store, { params: { lookBackDate: LOOK_BACK } });
    expect(idsOf(result.payload.body.data.created)).toEqual([40]);
  });
  test("ignores the Look-back Date once a position is stored", async () => {
    const odoo = fakeOdoo([]);
    odoo.serveJson2();
    const store = createPollingStore({ lastPolledAt: POLL_ONE_AT });
    freezeClockAt(POLL_TWO_AT);
    const result = await poll(store, { params: { lookBackDate: LOOK_BACK } });
    expect(odoo.requests[0].domain[0]).toEqual([
      "write_date",
      ">=",
      "2026-06-01 12:00:00",
    ]);
    expect(result.polledNoChanges).toBe(true);
  });
  test("keeps seeding across recurrences until the backlog drains, then drops the marker", async () => {
    const backlogSize = PAGE * MAX_PAGES;
    const rows = Array.from({ length: backlogSize }, (_, i) =>
      row(i + 1, i + 3600),
    );
    const odoo = fakeOdoo(rows);
    odoo.serveJson2();
    const store = createPollingStore();
    freezeClockAt(POLL_ONE_AT);
    const pollOne = await poll(store, { params: filtersOff });
    const deliveredOne = deliveredIds([pollOne]);
    expect(pollOne.payload.body.data.created).toHaveLength(deliveredOne.length);
    expect(store.currentState()).toMatchObject({
      lastPolledAt: LOOK_BACK,
      initialSyncFrom: LOOK_BACK,
    });
    expect(store.currentState().cursor).toBeDefined();
    odoo.rows.push(
      {
        id: 20001,
        create_date: "2026-05-10 00:00:00",
        write_date: odooAt(backlogSize + 3600),
      },
      {
        id: 20002,
        create_date: "2026-04-01 00:00:00",
        write_date: odooAt(backlogSize + 3601),
      },
    );
    freezeClockAt(POLL_TWO_AT);
    const pollTwo = await poll(store, { params: filtersOff });
    const all = [...deliveredOne, ...deliveredIds([pollTwo])];
    expect(new Set(all).size).toBe(backlogSize + 2);
    expect(all).toHaveLength(backlogSize + 2);
    expect(idsOf(pollTwo.payload.body.data.updated)).toEqual([20002]);
    expect(idsOf(pollTwo.payload.body.data.created)).toContain(20001);
    expect(store.currentState()).toEqual({
      lastPolledAt: isoAt(backlogSize + 3601),
      boundaryIds: [20002],
    });
  });
  test("stores no initial-sync marker when an ordinary recurrence leaves a cursor", async () => {
    const odoo = fakeOdoo(
      Array.from({ length: PAGE * MAX_PAGES }, (_, i) => row(i + 1, i + 3600)),
    );
    odoo.serveJson2();
    const store = createPollingStore({ lastPolledAt: SEEDED_CURSOR });
    freezeClockAt(POLL_ONE_AT);
    await poll(store, { params: { lookBackDate: LOOK_BACK } });
    expect(store.currentState().initialSyncFrom).toBeUndefined();
    expect(store.currentState().cursor).toBeDefined();
  });
});
describe("legacy XML-RPC path", () => {
  const MockedOdoo = Odoo as unknown as Mock;
  const serveLegacy = (rows: OdooRecord[]) => {
    const odoo = fakeOdoo(rows);
    const searchRead = vi.fn(
      async (
        _model: string,
        domain: SearchReadBody["domain"],
        fields: unknown[],
        options: {
          limit: number;
          order: string;
          offset?: number;
        },
      ) => odoo.search({ domain, fields, ...options }),
    );
    MockedOdoo.mockReset();
    // biome-ignore lint/complexity/useArrowFunction: the code under test calls `new Odoo(...)`, and vitest only allows `new` on a constructible mock implementation.
    MockedOdoo.mockImplementation(function () {
      return { connect: vi.fn().mockResolvedValue(undefined), searchRead };
    });
    return { odoo, searchRead };
  };
  const legacyParams = { connection: legacyConnection };
  test("sends the same window, order and limit, with no offset", async () => {
    const { odoo, searchRead } = serveLegacy([row(1, 10), row(2, 20)]);
    const store = createPollingStore({ lastPolledAt: SEEDED_CURSOR });
    freezeClockAt(POLL_ONE_AT);
    const result = await poll(store, { params: legacyParams });
    expect(searchRead).toHaveBeenCalledWith(
      MODEL,
      [
        ["write_date", ">=", "2026-05-01 00:00:00"],
        ["write_date", "<=", HORIZON_ONE],
      ],
      [],
      { limit: PAGE, order: "write_date asc, id asc" },
    );
    expect(odoo.requests.every((request) => !("offset" in request))).toBe(true);
    expect(idsOf(result.payload.body.data.created)).toEqual([1, 2]);
    expect(store.currentState()).toEqual({
      lastPolledAt: isoAt(20),
      boundaryIds: [2],
    });
  });
  test("drains a tie group by id keyset", async () => {
    const { odoo } = serveLegacy(
      Array.from({ length: 450 }, (_, i) => row(450 - i, 100)),
    );
    const store = createPollingStore({ lastPolledAt: SEEDED_CURSOR }, true);
    freezeClockAt(POLL_ONE_AT);
    const rounds = await driveBatchedPoll(store, { params: legacyParams });
    expect(deliveredIds(rounds).sort((a, b) => a - b)).toEqual(
      Array.from({ length: 450 }, (_, i) => i + 1),
    );
    expect(odoo.requests[2].order).toBe("id asc");
    expect(odoo.requests[3].domain[2]).toEqual(["id", ">", 200]);
  });
  test("fetchOdooPageLegacy forwards the query and returns the page untouched", async () => {
    const searchRead = vi.fn().mockResolvedValue([row(1, 1)]);
    const page = await fetchOdooPageLegacy(
      { searchRead } as unknown as Odoo,
      MODEL,
    )({ domain: [["id", ">", 3]], order: "id asc", limit: 7 });
    expect(searchRead).toHaveBeenCalledWith(MODEL, [["id", ">", 3]], [], {
      limit: 7,
      order: "id asc",
    });
    expect(page).toEqual([row(1, 1)]);
  });
});
describe("lookBackDateClean", () => {
  test("returns an empty string for empty input and midnight UTC for a date", () => {
    expect(lookBackDateClean("")).toBe("");
    expect(lookBackDateClean(undefined)).toBe("");
    expect(lookBackDateClean("2026-01-01")).toBe("2026-01-01T00:00:00.000Z");
  });
  test("rejects a malformed, non-calendar, or future date", () => {
    expect(() => lookBackDateClean("01/01/2026")).toThrow(/YYYY-MM-DD/);
    expect(() => lookBackDateClean("2026-02-31")).toThrow(/YYYY-MM-DD/);
    freezeClockAt(POLL_ONE_AT);
    expect(() => lookBackDateClean("2026-06-02")).toThrow(/future/);
  });
  test("names the Look-back Date in every rejection message", () => {
    expect(() => lookBackDateClean("01/01/2026")).toThrow(/Look-back Date/);
    expect(() => lookBackDateClean("2026-02-31")).toThrow(/Look-back Date/);
    freezeClockAt(POLL_ONE_AT);
    expect(() => lookBackDateClean("2026-06-02")).toThrow(/Look-back Date/);
  });
});
describe("batching declaration", () => {
  test("New and Updated Records is opt-in batchable with a default batch size", () => {
    expect(pollChangesTrigger.triggerResolverSupport).toBe("valid");
    expect(pollChangesTrigger.batchConfig).toEqual({ batchSize: 50 });
    expect(pollChangesTrigger.triggerResolver?.resolveItems).toBeInstanceOf(
      Function,
    );
    expect(
      pollChangesTrigger.triggerResolver?.getNextPaginationState,
    ).toBeInstanceOf(Function);
  });
  test("resolvePollingRecordChanges tags every record with how it changed", () => {
    expect(
      resolvePollingRecordChanges({
        created: fixtureCreated,
        updated: fixtureUpdated,
      }),
    ).toEqual([
      ...fixtureCreated.map((record) => ({ changeType: "created", record })),
      ...fixtureUpdated.map((record) => ({ changeType: "updated", record })),
    ]);
  });
  test("resolvePollingRecordChanges returns [] for empty or undefined changes", () => {
    expect(resolvePollingRecordChanges({ created: [], updated: [] })).toEqual(
      [],
    );
    expect(resolvePollingRecordChanges(undefined)).toEqual([]);
    expect(
      resolvePollingRecordChanges({} as unknown as PollingChangesObject),
    ).toEqual([]);
  });
  test("resolveItems flattens the payload shape perform actually returns", () => {
    const payload = {
      ...pollChangesExamplePayload.payload,
      body: { data: { created: fixtureCreated, updated: [] } },
    };
    expect(
      pollChangesTrigger.triggerResolver?.resolveItems?.(
        {} as never,
        {
          payload,
        } as never,
      ),
    ).toEqual(
      fixtureCreated.map((record) => ({ changeType: "created", record })),
    );
  });
  test("resolveItems flattens a full example payload into items the platform can chunk by batchSize", () => {
    const items = pollChangesTrigger.triggerResolver?.resolveItems?.(
      {} as never,
      { payload: pollChangesExamplePayload.payload } as never,
    ) as unknown[];
    expect(items).toEqual(resolvePollingRecordChanges(fixtureBuckets));
    expect(items.length).toBe(fixtureCreated.length + fixtureUpdated.length);
    const batchSize = pollChangesTrigger.batchConfig?.batchSize ?? 1;
    const chunks: unknown[][] = [];
    for (let i = 0; i < items.length; i += batchSize) {
      chunks.push(items.slice(i, i + batchSize));
    }
    expect(chunks.flat()).toEqual(items);
    expect(chunks.every((c) => c.length <= batchSize)).toBe(true);
  });
  test("Look-back Date leads the optional tier, below the required inputs", () => {
    expect(Object.keys(pollChangesTrigger.inputs ?? {})).toEqual([
      "connection",
      "model",
      "lookBackDate",
      "showNewRecords",
      "showUpdatedRecords",
    ]);
  });
});
