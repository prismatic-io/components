import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";
import { pollChangesTriggerV3ExamplePayload } from "../../examplePayloads/v3/triggers";
import type {
  Application,
  V3ApplicationChangesObject,
  V3PollingCursor,
} from "../../types";
import { lookBackDateClean } from "../../util/clean";
import { resolveV3ApplicationChanges } from "../../util/polling";
import { pollChangesTriggerV3 } from "./pollChangesTriggerV3";
const { get } = vi.hoisted(() => ({ get: vi.fn() }));
vi.mock("../../client", () => ({ createV3Client: () => ({ get }) }));
const NOW = "2026-06-10T12:00:00.000Z";
const LAST_POLLED_AT = "2026-06-01T00:00:00.000Z";
const application = (
  id: number,
  createdAt: string,
  lastActivityAt: string,
): Application => ({
  id,
  created_at: createdAt,
  last_activity_at: lastActivityAt,
});
const createdApplication = application(
  2,
  "2026-06-05T00:00:00.000Z",
  "2026-06-05T00:00:00.000Z",
);
const updatedApplication = application(
  1,
  "2025-01-01T00:00:00.000Z",
  "2026-06-05T00:00:00.000Z",
);
const page = (data: Application[], cursor?: string) => ({
  data,
  headers: cursor
    ? {
        link: `<https://harvest.greenhouse.io/v3/applications?cursor=${cursor}>; rel="next"`,
      }
    : {},
});
type PerformContext = Parameters<typeof pollChangesTriggerV3.perform>[0];
type PerformPayload = Parameters<typeof pollChangesTriggerV3.perform>[1];
const makeContext = (
  store: {
    state: Record<string, unknown>;
  },
  batching = false,
): PerformContext =>
  ({
    polling: {
      getState: () => store.state,
      setState: (next: Record<string, unknown>) => {
        store.state = next;
      },
    },
    batch: { enabled: batching },
    debug: { enabled: false },
    logger: { debug: vi.fn() },
  }) as unknown as PerformContext;
const makePayload = (paginationState?: V3PollingCursor): PerformPayload =>
  ({
    headers: {},
    body: { data: undefined },
    ...(paginationState ? { paginationState } : {}),
  }) as unknown as PerformPayload;
type PerformParams = Parameters<typeof pollChangesTriggerV3.perform>[2];
const params = (lookBackDate = "") => ({
  connection: {} as never,
  lookBackDate,
  showNewRecords: true,
  showUpdatedRecords: true,
});
const poll = async (
  context: PerformContext,
  payload: PerformPayload,
  cleaned: ReturnType<typeof params>,
) =>
  (await pollChangesTriggerV3.perform(
    context,
    payload,
    cleaned as unknown as PerformParams,
  )) as {
    payload: PerformPayload;
    polledNoChanges?: boolean;
  };
beforeEach(() => {
  vi.useFakeTimers({ toFake: ["Date"] });
  vi.setSystemTime(new Date(NOW));
  get.mockReset();
});
afterEach(() => {
  vi.useRealTimers();
});
describe("pollChangesTriggerV3 batching declaration", () => {
  test("declares opt-in batching with a default batch size and a pagination cursor", () => {
    expect(pollChangesTriggerV3.triggerResolverSupport).toBe("valid");
    expect(pollChangesTriggerV3.batchConfig).toEqual({ batchSize: 50 });
    expect(pollChangesTriggerV3.triggerResolver?.resolveItems).toBeInstanceOf(
      Function,
    );
    expect(
      pollChangesTriggerV3.triggerResolver?.getNextPaginationState,
    ).toBeInstanceOf(Function);
  });
  test("offers the Look-back Date directly below the connection", () => {
    expect(Object.keys(pollChangesTriggerV3.inputs ?? {})).toEqual([
      "connection",
      "lookBackDate",
      "showNewRecords",
      "showUpdatedRecords",
    ]);
  });
});
describe("resolveV3ApplicationChanges", () => {
  test("tags every application with how it changed", () => {
    expect(
      resolveV3ApplicationChanges({
        created: [createdApplication],
        updated: [updatedApplication],
      }),
    ).toEqual([
      { changeType: "created", record: createdApplication },
      { changeType: "updated", record: updatedApplication },
    ]);
  });
  test("returns [] for empty or undefined changes", () => {
    expect(resolveV3ApplicationChanges({ created: [], updated: [] })).toEqual(
      [],
    );
    expect(resolveV3ApplicationChanges(undefined)).toEqual([]);
  });
  test("tolerates a single absent array", () => {
    expect(
      resolveV3ApplicationChanges({
        created: [createdApplication],
      } as V3ApplicationChangesObject),
    ).toEqual([{ changeType: "created", record: createdApplication }]);
    expect(
      resolveV3ApplicationChanges({
        updated: [updatedApplication],
      } as V3ApplicationChangesObject),
    ).toEqual([{ changeType: "updated", record: updatedApplication }]);
  });
});
describe("triggerResolver.resolveItems", () => {
  test("flattens the payload shape perform actually returns", () => {
    const data = pollChangesTriggerV3ExamplePayload.payload.body
      .data as V3ApplicationChangesObject;
    const items = pollChangesTriggerV3.triggerResolver?.resolveItems?.(
      {} as never,
      { payload: pollChangesTriggerV3ExamplePayload.payload },
    );
    expect(items).toEqual([
      ...data.created.map((record) => ({ changeType: "created", record })),
      ...data.updated.map((record) => ({ changeType: "updated", record })),
    ]);
  });
  test("resolved items split into batches of the declared batchSize", () => {
    const chunk = <T>(items: T[], size: number): T[][] =>
      Array.from({ length: Math.ceil(items.length / size) }, (_, i) =>
        items.slice(i * size, (i + 1) * size),
      );
    const batchSize = pollChangesTriggerV3.batchConfig?.batchSize ?? 0;
    const created = Array.from({ length: batchSize + 1 }, (_, i) =>
      application(i + 1, NOW, NOW),
    );
    const items =
      pollChangesTriggerV3.triggerResolver?.resolveItems?.({} as never, {
        payload: {
          ...pollChangesTriggerV3ExamplePayload.payload,
          body: { data: { created, updated: [] } },
        },
      }) ?? [];
    const batches = chunk(items, batchSize);
    expect(batches).toHaveLength(2);
    expect(batches[0]).toHaveLength(batchSize);
    expect(batches[1]).toEqual([
      { changeType: "created", record: created[batchSize] },
    ]);
  });
});
describe("pollChangesTriggerV3 multi-round drain", () => {
  test("resumes from the round's cursor and commits the watermark only when drained", async () => {
    const store = {
      state: { lastPolledAt: LAST_POLLED_AT } as Record<string, unknown>,
    };
    get.mockResolvedValueOnce(page([createdApplication], "c1"));
    const first = await poll(makeContext(store, true), makePayload(), params());
    expect(get).toHaveBeenCalledTimes(1);
    expect(get).toHaveBeenNthCalledWith(1, "/applications", {
      params: { per_page: 100, "last_activity_at[gte]": LAST_POLLED_AT },
    });
    const cursor: V3PollingCursor = {
      since: LAST_POLLED_AT,
      drainStartedAt: NOW,
      backfill: false,
      after: "c1",
    };
    expect(first.payload.paginationState).toEqual(cursor);
    expect(store.state).toEqual({ lastPolledAt: LAST_POLLED_AT, cursor });
    expect(first.payload.body.data).toEqual({
      created: [createdApplication],
      updated: [],
    });
    expect(first.polledNoChanges).toBe(false);
    expect(
      pollChangesTriggerV3.triggerResolver?.getNextPaginationState?.(
        {} as never,
        { payload: first.payload },
      ),
    ).toEqual(cursor);
    store.state = { ...store.state, cursor: { ...cursor, after: "stale" } };
    vi.setSystemTime(new Date("2026-06-10T12:05:00.000Z"));
    get.mockResolvedValueOnce(page([]));
    const second = await poll(
      makeContext(store, true),
      makePayload(cursor),
      params(),
    );
    expect(get).toHaveBeenNthCalledWith(2, "/applications", {
      params: { cursor: "c1" },
    });
    expect(second.payload.paginationState).toBeUndefined();
    expect(store.state).toEqual({ lastPolledAt: NOW });
    expect(second.polledNoChanges).toBe(false);
    expect(
      pollChangesTriggerV3.triggerResolver?.getNextPaginationState?.(
        {} as never,
        { payload: second.payload },
      ),
    ).toBeNull();
    get.mockResolvedValueOnce(page([]));
    const third = await poll(makeContext(store, true), makePayload(), params());
    expect(third.polledNoChanges).toBe(true);
  });
  test("bounds an unbatched round to a window and resumes it on the next recurrence", async () => {
    const store = {
      state: { lastPolledAt: LAST_POLLED_AT } as Record<string, unknown>,
    };
    get.mockResolvedValue(page([updatedApplication], "more"));
    const first = await poll(makeContext(store), makePayload(), params());
    expect(get).toHaveBeenCalledTimes(10);
    expect(get).toHaveBeenNthCalledWith(1, "/applications", {
      params: { per_page: 500, "last_activity_at[gte]": LAST_POLLED_AT },
    });
    expect(store.state.lastPolledAt).toBe(LAST_POLLED_AT);
    expect(first.payload.paginationState).toMatchObject({ after: "more" });
    get.mockReset();
    get.mockResolvedValueOnce(page([]));
    await poll(makeContext(store), makePayload(), params());
    expect(get).toHaveBeenCalledWith("/applications", {
      params: { cursor: "more" },
    });
    expect(store.state).toEqual({ lastPolledAt: NOW });
  });
});
describe("Look-back Date", () => {
  test("seeds the first drain from the date and ignores the visibility toggles", async () => {
    const lookBackDate = "2026-01-01T00:00:00.000Z";
    const store = { state: {} as Record<string, unknown> };
    get.mockResolvedValueOnce(
      page([createdApplication, updatedApplication], "c1"),
    );
    const first = await poll(makeContext(store, true), makePayload(), {
      ...params(lookBackDate),
      showNewRecords: false,
      showUpdatedRecords: false,
    });
    expect(get).toHaveBeenNthCalledWith(1, "/applications", {
      params: { per_page: 100, "last_activity_at[gte]": lookBackDate },
    });
    expect(store.state.cursor).toMatchObject({
      since: lookBackDate,
      backfill: true,
    });
    expect(store.state.lastPolledAt).toBeUndefined();
    expect(first.payload.body.data).toEqual({
      created: [createdApplication],
      updated: [updatedApplication],
    });
  });
  test("lookBackDateClean returns an ISO instant, and '' for empty", () => {
    expect(lookBackDateClean("")).toBe("");
    expect(lookBackDateClean(undefined)).toBe("");
    expect(lookBackDateClean("2026-01-01")).toBe("2026-01-01T00:00:00.000Z");
  });
  test("lookBackDateClean rejects a bad format, a non-calendar date, and a future date", () => {
    expect(() => lookBackDateClean("01/01/2026")).toThrow(/Look-back Date/);
    expect(() => lookBackDateClean("2026-02-31")).toThrow(/Look-back Date/);
    expect(() => lookBackDateClean("2026-12-31")).toThrow(
      /Look-back Date cannot be a future date/,
    );
  });
});
