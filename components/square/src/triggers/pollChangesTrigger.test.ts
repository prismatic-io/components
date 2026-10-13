import { beforeEach, describe, expect, test, vi } from "vitest";
import type { Payment, PollingState } from "../types";
import { lookBackDateClean, resolvePaymentChanges } from "../util";
import { pollChangesTrigger } from "./pollChangesTrigger";
const { createAuthorizedClient } = vi.hoisted(() => ({
  createAuthorizedClient: vi.fn(),
}));
vi.mock("../client", () => ({ createAuthorizedClient }));
const payment = (
  id: string,
  createdAt: string,
  updatedAt: string,
): Payment => ({
  id,
  created_at: createdAt,
  updated_at: updatedAt,
});
const createdPayment = payment(
  "p1",
  "2026-06-01T12:00:00.000Z",
  "2026-06-01T12:00:00.000Z",
);
const updatedPayment = payment(
  "p2",
  "2020-01-01T00:00:00.000Z",
  "2026-06-01T12:00:00.000Z",
);
describe("pollChangesTrigger batching declaration", () => {
  test("declares opt-in batching with a default batch size and a pagination cursor", () => {
    expect(pollChangesTrigger.triggerResolverSupport).toBe("valid");
    expect(pollChangesTrigger.batchConfig).toEqual({ batchSize: 50 });
    expect(pollChangesTrigger.triggerResolver?.resolveItems).toBeInstanceOf(
      Function,
    );
    expect(
      pollChangesTrigger.triggerResolver?.getNextPaginationState,
    ).toBeInstanceOf(Function);
  });
  test("offers the Look-back Date directly below the connection", () => {
    expect(Object.keys(pollChangesTrigger.inputs ?? {})).toEqual([
      "squareConnection",
      "lookBackDate",
      "showNewRecords",
      "showUpdatedRecords",
    ]);
  });
});
describe("resolvePaymentChanges", () => {
  test("tags every payment with how it changed", () => {
    expect(
      resolvePaymentChanges({
        created: [createdPayment],
        updated: [updatedPayment],
      }),
    ).toEqual([
      { changeType: "created", record: createdPayment },
      { changeType: "updated", record: updatedPayment },
    ]);
  });
  test("tolerates an absent envelope, an empty one, and a single absent array", () => {
    expect(resolvePaymentChanges(undefined)).toEqual([]);
    expect(resolvePaymentChanges({})).toEqual([]);
    expect(resolvePaymentChanges({ created: [createdPayment] })).toEqual([
      { changeType: "created", record: createdPayment },
    ]);
    expect(resolvePaymentChanges({ updated: [updatedPayment] })).toEqual([
      { changeType: "updated", record: updatedPayment },
    ]);
  });
});
describe("triggerResolver.resolveItems", () => {
  test("flattens a realistic trigger payload into tagged items", () => {
    const items = pollChangesTrigger.triggerResolver?.resolveItems?.(
      {} as never,
      {
        payload: {
          body: {
            data: { created: [createdPayment], updated: [updatedPayment] },
          },
        },
      } as never,
    );
    expect(items).toEqual([
      { changeType: "created", record: createdPayment },
      { changeType: "updated", record: updatedPayment },
    ]);
  });
  test("getNextPaginationState echoes the round's paginationState", () => {
    const cursor = {
      afterCursor: "c1",
      windowStart: "w",
      pending: { watermark: "w", ids: [] },
    };
    const next = pollChangesTrigger.triggerResolver?.getNextPaginationState;
    expect(
      next?.({} as never, { payload: { paginationState: cursor } } as never),
    ).toBe(cursor);
    expect(next?.({} as never, { payload: {} } as never)).toBeNull();
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
  test("rejects a bad format, a non-calendar date, and a future date", () => {
    expect(() => lookBackDateClean("01/01/2026")).toThrow(/Look-back Date/);
    expect(() => lookBackDateClean("2026-02-31")).toThrow(/Look-back Date/);
    expect(() => lookBackDateClean("2999-01-01")).toThrow(
      /Look-back Date cannot be a future date/,
    );
  });
});
describe("polling state across a multi-round drain", () => {
  type PerformContext = Parameters<typeof pollChangesTrigger.perform>[0];
  type PerformPayload = Parameters<typeof pollChangesTrigger.perform>[1];
  const SEED = "2026-06-01T00:00:00.000Z";
  let store: PollingState;
  let get: ReturnType<typeof vi.fn>;
  const page = (payments: Payment[], cursor?: string) => ({
    data: { payments, cursor },
  });
  const context = (batching = false) =>
    ({
      polling: {
        getState: () => store,
        setState: (next: PollingState) => {
          store = next;
        },
      },
      batch: batching ? { enabled: true } : undefined,
      debug: { enabled: false },
      logger: { debug: vi.fn() },
    }) as unknown as PerformContext;
  const params = {
    squareConnection: {} as never,
    lookBackDate: "",
    showNewRecords: true,
    showUpdatedRecords: true,
  };
  const seeded = { ...params, lookBackDate: SEED };
  const noPayload = {} as unknown as PerformPayload;
  beforeEach(() => {
    store = {};
    get = vi.fn();
    createAuthorizedClient.mockResolvedValue({ get });
  });
  test("starts a seeded drain from the Look-back Date and holds the watermark while pages remain", async () => {
    get.mockResolvedValue(page([updatedPayment], "cursor-1"));
    const first = await pollChangesTrigger.perform(
      context(),
      noPayload,
      seeded,
    );
    expect(get).toHaveBeenCalledTimes(10);
    expect(get.mock.calls[0][1].params).toMatchObject({
      updated_at_begin_time: "2026-05-31T23:59:59.000Z",
      sort_field: "UPDATED_AT",
      sort_order: "ASC",
      limit: 100,
    });
    expect(store.lastPolledAt).toBe(SEED);
    expect(store.backfillActive).toBe(true);
    expect(store.cursor?.afterCursor).toBe("cursor-1");
    expect(first.payload.paginationState).toEqual(store.cursor);
    expect(first.polledNoChanges).toBe(false);
  });
  test("resumes from the round's own cursor, not a stale stored one", async () => {
    store = {
      lastPolledAt: SEED,
      cursor: {
        afterCursor: "stale",
        windowStart: "stale-start",
        pending: { watermark: SEED, ids: [] },
      },
    };
    get.mockResolvedValue(page([updatedPayment]));
    await pollChangesTrigger.perform(
      context(),
      {
        paginationState: {
          afterCursor: "fresh",
          windowStart: "fresh-start",
          pending: { watermark: SEED, ids: [] },
        },
      } as unknown as PerformPayload,
      params,
    );
    expect(get.mock.calls[0][1].params).toMatchObject({
      cursor: "fresh",
      updated_at_begin_time: "fresh-start",
    });
  });
  test("commits the data-derived watermark and boundary ids only when drained", async () => {
    const a = payment(
      "a",
      "2026-06-02T00:00:00.000Z",
      "2026-06-02T00:00:00.000Z",
    );
    const b = payment(
      "b",
      "2026-06-02T00:00:00.000Z",
      "2026-06-02T00:00:05.000Z",
    );
    const c = payment(
      "c",
      "2026-06-02T00:00:01.000Z",
      "2026-06-02T00:00:05.000Z",
    );
    get
      .mockResolvedValueOnce(page([a], "cursor-1"))
      .mockResolvedValueOnce(page([b, c]));
    const round = await pollChangesTrigger.perform(
      context(true),
      noPayload,
      seeded,
    );
    expect(round.payload.paginationState).toBeDefined();
    expect(store.lastPolledAt).toBe(SEED);
    expect(store.cursor?.pending.watermark).toBe("2026-06-02T00:00:00.000Z");
    const drained = await pollChangesTrigger.perform(
      context(true),
      { paginationState: store.cursor } as unknown as PerformPayload,
      seeded,
    );
    expect(drained.payload.paginationState).toBeUndefined();
    expect(store.cursor).toBeUndefined();
    expect(store.backfillActive).toBeUndefined();
    expect(store.lastPolledAt).toBe("2026-06-02T00:00:05.000Z");
    expect([...(store.boundaryIds ?? [])].sort()).toEqual(["b", "c"]);
  });
  test("skips payments at or before the watermark that were already delivered", async () => {
    store = { lastPolledAt: "2026-06-02T00:00:05.000Z", boundaryIds: ["b"] };
    const older = payment(
      "old",
      "2026-06-01T00:00:00.000Z",
      "2026-06-02T00:00:04.000Z",
    );
    const delivered = payment(
      "b",
      "2026-06-02T00:00:00.000Z",
      "2026-06-02T00:00:05.000Z",
    );
    const sibling = payment(
      "c",
      "2026-06-02T00:00:01.000Z",
      "2026-06-02T00:00:05.000Z",
    );
    const newer = payment(
      "d",
      "2026-06-02T00:00:09.000Z",
      "2026-06-02T00:00:09.000Z",
    );
    get.mockResolvedValue(page([older, delivered, sibling, newer]));
    const result = await pollChangesTrigger.perform(
      context(),
      noPayload,
      params,
    );
    expect(result.payload.body.data).toEqual({
      created: [newer],
      updated: [sibling],
    });
    expect(store.lastPolledAt).toBe("2026-06-02T00:00:09.000Z");
    expect(store.boundaryIds).toEqual(["d"]);
  });
  test("leaves the watermark where it was when nothing is read", async () => {
    store = { lastPolledAt: SEED, boundaryIds: ["x"] };
    get.mockResolvedValue(page([]));
    const result = await pollChangesTrigger.perform(
      context(),
      noPayload,
      params,
    );
    expect(store.lastPolledAt).toBe(SEED);
    expect(store.boundaryIds).toEqual(["x"]);
    expect(result.polledNoChanges).toBe(true);
  });
  test("seeds a first poll with no Look-back Date from the current time and returns nothing historical", async () => {
    vi.useFakeTimers({ toFake: ["Date"] });
    vi.setSystemTime(new Date("2026-06-02T10:00:00.500Z"));
    try {
      const historical = payment(
        "h",
        "2026-05-01T00:00:00.000Z",
        "2026-06-02T09:59:59.700Z",
      );
      get.mockResolvedValue(page([historical]));
      const result = await pollChangesTrigger.perform(
        context(),
        noPayload,
        params,
      );
      expect(result.payload.body.data).toEqual({ created: [], updated: [] });
      expect(store.lastPolledAt).toBe("2026-06-02T10:00:00.500Z");
    } finally {
      vi.useRealTimers();
    }
  });
  test("ignores the visibility toggles while an initial sync drains", async () => {
    get.mockResolvedValue(page([createdPayment, updatedPayment]));
    const result = await pollChangesTrigger.perform(context(), noPayload, {
      ...seeded,
      showNewRecords: false,
      showUpdatedRecords: false,
    });
    expect(result.payload.body.data).toEqual({
      created: [createdPayment],
      updated: [updatedPayment],
    });
  });
  test("reads one page per round, sized to the batch, once flow batching is enabled", async () => {
    get.mockResolvedValue(page([updatedPayment], "cursor-1"));
    await pollChangesTrigger.perform(context(true), noPayload, seeded);
    expect(get).toHaveBeenCalledTimes(1);
    expect(get.mock.calls[0][1].params.limit).toBe(50);
  });
  test("never reports no changes on a round the platform drove", async () => {
    get.mockResolvedValue(page([]));
    const cursor = {
      afterCursor: "c1",
      windowStart: SEED,
      pending: { watermark: SEED, ids: [] },
    };
    const driven = await pollChangesTrigger.perform(
      context(true),
      { paginationState: cursor } as unknown as PerformPayload,
      params,
    );
    expect(driven.polledNoChanges).toBe(false);
    const scheduled = await pollChangesTrigger.perform(
      context(),
      noPayload,
      params,
    );
    expect(scheduled.polledNoChanges).toBe(true);
  });
});
