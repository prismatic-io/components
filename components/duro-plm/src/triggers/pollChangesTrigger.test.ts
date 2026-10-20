import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";
import { MAX_POLL_PAGES } from "../constants";
import type { DuroRecord, PollingChangesObject, PollingState } from "../types";
import { lookBackDateClean, resolveRecordChanges } from "../util";
import { pollChangesTrigger } from "./pollChangesTrigger";
const { request } = vi.hoisted(() => ({ request: vi.fn() }));
vi.mock("../client", () => ({ createDuroClient: () => ({ request }) }));
const newRecord: DuroRecord = {
  id: "1",
  created: "2026-06-11T12:00:00.000Z",
  lastModified: "2026-06-11T12:00:00.000Z",
};
const touched: DuroRecord = {
  id: "2",
  created: "2025-12-01T12:00:00.000Z",
  lastModified: "2026-06-12T12:00:00.000Z",
};
const page = (
  nodes: DuroRecord[],
  endCursor?: string,
  resource: "components" | "changeOrders" = "components",
) => ({
  [resource]: {
    connection: {
      edges: nodes.map((node) => ({ node })),
      pageInfo: {
        hasNextPage: Boolean(endCursor),
        endCursor: endCursor ?? null,
      },
    },
  },
});
describe("pollChangesTrigger batching declaration", () => {
  test("declares opt-in batching with a default batch size and no pagination cursor", () => {
    expect(pollChangesTrigger.triggerResolverSupport).toBe("valid");
    expect(pollChangesTrigger.batchConfig).toEqual({ batchSize: 50 });
    expect(pollChangesTrigger.triggerResolver?.resolveItems).toBeInstanceOf(
      Function,
    );
    expect(
      pollChangesTrigger.triggerResolver?.getNextPaginationState,
    ).toBeUndefined();
  });
  test("offers the Look-back Date directly below the required inputs", () => {
    expect(Object.keys(pollChangesTrigger.inputs ?? {})).toEqual([
      "connection",
      "pollResourceType",
      "lookBackDate",
      "showNewRecords",
      "showUpdatedRecords",
    ]);
  });
});
describe("resolveRecordChanges", () => {
  test("tags every record with how it changed", () => {
    expect(
      resolveRecordChanges({ created: [newRecord], updated: [touched] }),
    ).toEqual([
      { changeType: "created", record: newRecord },
      { changeType: "updated", record: touched },
    ]);
  });
  test("tolerates an absent envelope, an empty one, and a single absent array", () => {
    expect(resolveRecordChanges(undefined)).toEqual([]);
    expect(resolveRecordChanges({})).toEqual([]);
    expect(resolveRecordChanges({ created: [], updated: [] })).toEqual([]);
    expect(resolveRecordChanges({ updated: [touched] })).toEqual([
      { changeType: "updated", record: touched },
    ]);
    expect(resolveRecordChanges({ created: [newRecord] })).toEqual([
      { changeType: "created", record: newRecord },
    ]);
  });
});
describe("triggerResolver.resolveItems", () => {
  test("flattens the payload shape perform actually returns", () => {
    const items = pollChangesTrigger.triggerResolver?.resolveItems?.(
      {} as never,
      {
        payload: {
          body: { data: { created: [newRecord], updated: [touched] } },
        },
      } as never,
    );
    expect(items).toEqual([
      { changeType: "created", record: newRecord },
      { changeType: "updated", record: touched },
    ]);
  });
});
describe("lookBackDateClean", () => {
  test("returns an empty string for an empty value", () => {
    expect(lookBackDateClean(undefined)).toBe("");
    expect(lookBackDateClean("  ")).toBe("");
  });
  test("normalizes a valid past date to an ISO instant", () => {
    expect(lookBackDateClean("2026-01-01")).toBe("2026-01-01T00:00:00.000Z");
  });
  test("rejects a wrong format, a non-calendar date, and a future date", () => {
    expect(() => lookBackDateClean("01/01/2026")).toThrow(
      "Look-back Date must be",
    );
    expect(() => lookBackDateClean("2026-02-31")).toThrow(
      "Look-back Date must be",
    );
    expect(() => lookBackDateClean("2999-01-01")).toThrow(
      "cannot be a future date",
    );
  });
});
describe("pollChangesTrigger perform and the Look-back Date", () => {
  type PerformContext = Parameters<typeof pollChangesTrigger.perform>[0];
  type PerformPayload = Parameters<typeof pollChangesTrigger.perform>[1];
  const LOOK_BACK = "2026-01-01T00:00:00.000Z";
  let store: PollingState;
  const context = () =>
    ({
      polling: {
        getState: () => store,
        setState: (next: PollingState) => {
          store = next;
        },
      },
      batch: { enabled: false },
      debug: { enabled: false },
      logger: { debug: vi.fn(), warn: vi.fn() },
    }) as unknown as PerformContext;
  const params = {
    connection: { key: "duroApiKey", fields: {} } as never,
    pollResourceType: "components",
    lookBackDate: "",
    showNewRecords: true,
    showUpdatedRecords: true,
  };
  const run = (overrides: Partial<typeof params> = {}) =>
    pollChangesTrigger.perform(context(), {} as unknown as PerformPayload, {
      ...params,
      ...overrides,
    });
  const data = (result: Awaited<ReturnType<typeof run>>) =>
    result.payload.body as {
      data: PollingChangesObject;
    };
  beforeEach(() => {
    store = {};
    request.mockReset();
    request.mockResolvedValue(page([newRecord, touched]));
  });
  test("the first poll seeds from the Look-back Date", async () => {
    request.mockResolvedValue(
      page([
        newRecord,
        { id: "old", lastModified: "2025-12-31T00:00:00.000Z" },
      ]),
    );
    const result = await run({ lookBackDate: LOOK_BACK });
    expect(data(result)).toEqual({
      data: { created: [newRecord], updated: [] },
    });
  });
  test("the first poll without a Look-back Date seeds from now and emits nothing old", async () => {
    const before = Date.now();
    const result = await run();
    expect(data(result)).toEqual({ data: { created: [], updated: [] } });
    expect(Date.parse(store.lastPolledAt as string)).toBeGreaterThanOrEqual(
      before,
    );
    expect(store.backfillActive).toBeUndefined();
  });
  test("a backfill emits records even when both Show toggles are off", async () => {
    const result = await run({
      lookBackDate: LOOK_BACK,
      showNewRecords: false,
      showUpdatedRecords: false,
    });
    expect(data(result)).toEqual({
      data: { created: [newRecord], updated: [touched] },
    });
    expect(
      (
        result as {
          polledNoChanges?: boolean;
        }
      ).polledNoChanges,
    ).toBe(false);
  });
  test("later polls ignore the Look-back Date and honor the toggles", async () => {
    store = { lastPolledAt: "2026-06-10T00:00:00.000Z" };
    request.mockResolvedValue(
      page([
        newRecord,
        touched,
        { id: "mid", lastModified: "2026-03-01T00:00:00.000Z" },
      ]),
    );
    const result = await run({
      lookBackDate: LOOK_BACK,
      showNewRecords: false,
      showUpdatedRecords: false,
    });
    expect(data(result)).toEqual({ data: { created: [], updated: [] } });
    expect(
      (
        result as {
          polledNoChanges?: boolean;
        }
      ).polledNoChanges,
    ).toBe(true);
    store = { lastPolledAt: "2026-06-10T00:00:00.000Z" };
    const toggled = await run({
      lookBackDate: LOOK_BACK,
      showNewRecords: false,
    });
    expect(data(toggled)).toEqual({
      data: { created: [], updated: [touched] },
    });
  });
  test("a non-truncated poll advances the cursor to now", async () => {
    store = { lastPolledAt: "2026-06-10T00:00:00.000Z" };
    const before = Date.now();
    await run();
    expect(Date.parse(store.lastPolledAt as string)).toBeGreaterThanOrEqual(
      before,
    );
    expect(store.backfillActive).toBeUndefined();
  });
  const pendingPages = (prefix: string) => {
    let n = 0;
    request.mockImplementation(async () => {
      n += 1;
      return page([newRecord], `${prefix}${n}`);
    });
  };
  const afterOf = (call: number) =>
    (
      request.mock.calls[call][1] as {
        after?: string;
      }
    ).after;
  const T1 = "2026-07-01T00:00:00.000Z";
  const T2 = "2026-07-02T00:00:00.000Z";
  const T3 = "2026-07-03T00:00:00.000Z";
  const at = (iso: string) => vi.setSystemTime(new Date(iso));
  describe("resuming a held cursor across recurrences", () => {
    beforeEach(() => {
      vi.useFakeTimers();
    });
    afterEach(() => {
      vi.useRealTimers();
    });
    test("a backfill larger than the cap drains over 3 recurrences and commits the first recurrence's start", async () => {
      const off = {
        lookBackDate: LOOK_BACK,
        showNewRecords: false,
        showUpdatedRecords: false,
      };
      at(T1);
      pendingPages("a");
      const r1 = await run(off);
      expect(request).toHaveBeenCalledTimes(MAX_POLL_PAGES);
      expect(data(r1).data.created).toHaveLength(MAX_POLL_PAGES);
      expect(store).toEqual({
        lastPolledAt: LOOK_BACK,
        backfillActive: true,
        endCursor: `a${MAX_POLL_PAGES}`,
        streamStartedAt: T1,
        pollResourceType: "components",
      });
      at(T2);
      request.mockReset();
      pendingPages("b");
      await run(off);
      expect(afterOf(0)).toBe(`a${MAX_POLL_PAGES}`);
      expect(store).toEqual({
        lastPolledAt: LOOK_BACK,
        backfillActive: true,
        endCursor: `b${MAX_POLL_PAGES}`,
        streamStartedAt: T1,
        pollResourceType: "components",
      });
      at(T3);
      request.mockReset();
      request.mockResolvedValue(page([touched]));
      const r3 = await run(off);
      expect(afterOf(0)).toBe(`b${MAX_POLL_PAGES}`);
      expect(data(r3)).toEqual({ data: { created: [], updated: [touched] } });
      expect(store).toEqual({ lastPolledAt: T1 });
    });
    test("steady state with more pending changes than the cap resumes instead of re-reading the newest window", async () => {
      store = { lastPolledAt: "2026-06-10T00:00:00.000Z" };
      at(T1);
      pendingPages("c");
      await run();
      expect(afterOf(0)).toBeUndefined();
      expect(store.endCursor).toBe(`c${MAX_POLL_PAGES}`);
      expect(store.lastPolledAt).toBe("2026-06-10T00:00:00.000Z");
      expect(store.backfillActive).toBeUndefined();
      at(T2);
      request.mockReset();
      request.mockResolvedValue(page([newRecord]));
      await run();
      expect(afterOf(0)).toBe(`c${MAX_POLL_PAGES}`);
      expect(store).toEqual({ lastPolledAt: T1 });
    });
    test("a resource type change mid-drain drops the stale cursor and restarts the stream", async () => {
      store = {
        lastPolledAt: "2026-06-10T00:00:00.000Z",
        endCursor: "stale",
        streamStartedAt: T1,
        pollResourceType: "components",
      };
      at(T2);
      request.mockResolvedValue(page([newRecord], undefined, "changeOrders"));
      await run({ pollResourceType: "changeOrders" });
      expect(afterOf(0)).toBeUndefined();
      expect(store).toEqual({ lastPolledAt: T2 });
    });
    test("a single-round drain commits that round's start and leaves no cursor", async () => {
      store = { lastPolledAt: "2026-06-10T00:00:00.000Z" };
      at(T1);
      request.mockImplementation(async () => {
        at(T2);
        return page([newRecord]);
      });
      await run();
      expect(store).toEqual({ lastPolledAt: T1 });
    });
  });
});
