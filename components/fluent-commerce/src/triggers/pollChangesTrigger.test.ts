import nock from "nock";
import { MAX_POLL_PAGES } from "../constants";
import { pollChangesTriggerExamplePayload } from "../examplePayloads";
import {
  type GraphqlBody,
  mockTokenExchange,
  TEST_HOST,
  testConnection,
  useNockLifecycle,
} from "../testHelpers";
import type {
  FluentOrder,
  FluentOrderChangesObject,
  PollingCursor,
  PollingState,
} from "../types";
import { lookBackDateClean, resolveFluentOrderChanges } from "../util";
import { pollChangesTrigger } from "./pollChangesTrigger";
type PerformContext = Parameters<typeof pollChangesTrigger.perform>[0];
type PerformPayload = Parameters<typeof pollChangesTrigger.perform>[1];
type PerformResult = Awaited<ReturnType<typeof pollChangesTrigger.perform>> & {
  polledNoChanges?: boolean;
};
const LAST_POLLED_AT = "2026-10-01T00:00:00.000Z";
const NOW = "2026-10-01T01:00:00.000Z";
const order = (id: string, createdOn: string, updatedOn: string): FluentOrder =>
  ({
    id,
    ref: `ORD-${id}`,
    type: "HD",
    status: "BOOKED",
    createdOn,
    updatedOn,
  }) as FluentOrder;
const recentlyCreated = order(
  "2",
  "2026-10-01T00:30:00.000Z",
  "2026-10-01T00:30:00.000Z",
);
const mockOrderPages = (
  pages: number,
  nodes: FluentOrder[],
  hasNextPage: boolean,
): GraphqlBody[] => {
  const bodies: GraphqlBody[] = [];
  let call = 0;
  nock(TEST_HOST)
    .post("/graphql", (body) => {
      bodies.push(body);
      return true;
    })
    .times(pages)
    .reply(200, () => {
      call += 1;
      return {
        data: {
          orders: {
            edges: nodes.map((node) => ({ node })),
            pageInfo: { hasNextPage, endCursor: `cursor-${call}` },
          },
        },
      };
    });
  return bodies;
};
const modifiedOlder = order(
  "1",
  "2026-01-15T00:00:00.000Z",
  "2026-10-01T00:40:00.000Z",
);
describe("pollChangesTrigger batching declaration", () => {
  it("declares opt-in batching with a default batch size and a cursor", () => {
    expect(pollChangesTrigger.triggerResolverSupport).toBe("valid");
    expect(pollChangesTrigger.batchConfig).toEqual({ batchSize: 50 });
    expect(pollChangesTrigger.triggerResolver?.resolveItems).toBeInstanceOf(
      Function,
    );
    expect(
      pollChangesTrigger.triggerResolver?.getNextPaginationState,
    ).toBeInstanceOf(Function);
  });
  it("offers the Look-back Date directly below the connection", () => {
    expect(Object.keys(pollChangesTrigger.inputs ?? {})).toEqual([
      "connection",
      "lookBackDate",
      "retailerId",
      "showNewRecords",
      "showUpdatedRecords",
    ]);
  });
});
describe("resolveFluentOrderChanges", () => {
  it("tags every order with how it changed", () => {
    expect(
      resolveFluentOrderChanges({
        created: [recentlyCreated],
        updated: [modifiedOlder],
      }),
    ).toEqual([
      { changeType: "created", record: recentlyCreated },
      { changeType: "updated", record: modifiedOlder },
    ]);
  });
  it("returns [] for an empty or absent envelope", () => {
    expect(resolveFluentOrderChanges({ created: [], updated: [] })).toEqual([]);
    expect(resolveFluentOrderChanges(undefined)).toEqual([]);
  });
  it("tolerates a single absent array", () => {
    const onlyCreated = {
      created: [recentlyCreated],
    } as unknown as FluentOrderChangesObject;
    const onlyUpdated = {
      updated: [modifiedOlder],
    } as unknown as FluentOrderChangesObject;
    expect(resolveFluentOrderChanges(onlyCreated)).toEqual([
      { changeType: "created", record: recentlyCreated },
    ]);
    expect(resolveFluentOrderChanges(onlyUpdated)).toEqual([
      { changeType: "updated", record: modifiedOlder },
    ]);
  });
});
describe("triggerResolver.resolveItems", () => {
  const chunk = <T>(items: T[], size: number): T[][] => {
    const chunks: T[][] = [];
    for (let i = 0; i < items.length; i += size) {
      chunks.push(items.slice(i, i + size));
    }
    return chunks;
  };
  it("flattens the example payload into tagged items", () => {
    const { payload } = pollChangesTriggerExamplePayload;
    const data = payload.body.data as FluentOrderChangesObject;
    const items =
      pollChangesTrigger.triggerResolver?.resolveItems?.(
        {} as never,
        {
          payload,
        } as never,
      ) ?? [];
    expect(items).toEqual([
      { changeType: "created", record: data.created[0] },
      { changeType: "updated", record: data.updated[0] },
    ]);
    const batchSize = pollChangesTrigger.batchConfig?.batchSize ?? 1;
    expect(chunk(items, batchSize)).toEqual([items]);
  });
});
describe("pollChangesTrigger polling window", () => {
  useNockLifecycle();
  let store: PollingState | undefined;
  const context = (batching = false) =>
    ({
      polling: {
        getState: () => store,
        setState: (next: PollingState) => {
          store = next;
        },
      },
      ...(batching ? { batch: { enabled: true } } : {}),
      debug: { enabled: false },
      logger: { debug: vi.fn(), warn: vi.fn() },
    }) as unknown as PerformContext;
  const params = {
    connection: testConnection,
    lookBackDate: "",
    retailerId: undefined,
    showNewRecords: true,
    showUpdatedRecords: true,
  };
  const poll = () =>
    pollChangesTrigger.perform(
      context(),
      {} as unknown as PerformPayload,
      params,
    );
  beforeEach(() => {
    store = undefined;
    vi.useFakeTimers({ toFake: ["Date"] });
    vi.setSystemTime(new Date(NOW));
  });
  afterEach(() => {
    vi.useRealTimers();
  });
  it("keeps the window open on truncation instead of advancing the cursor", async () => {
    store = { lastPolledAt: LAST_POLLED_AT };
    mockTokenExchange();
    mockOrderPages(MAX_POLL_PAGES, [recentlyCreated], true);
    await poll();
    expect(store).toEqual({
      lastPolledAt: LAST_POLLED_AT,
      windowTo: NOW,
      after: `cursor-${MAX_POLL_PAGES}`,
    });
  });
  it("bounds the first request of an open window with from and to", async () => {
    store = { lastPolledAt: LAST_POLLED_AT };
    mockTokenExchange();
    const bodies = mockOrderPages(1, [], false);
    await poll();
    expect(bodies[0]?.variables).toMatchObject({
      from: LAST_POLLED_AT,
      to: NOW,
      after: null,
    });
  });
  it("resumes a truncated window from the stored cursor and bounds", async () => {
    const windowTo = "2026-10-01T00:45:00.000Z";
    store = { lastPolledAt: LAST_POLLED_AT, windowTo, after: "cursor-20" };
    mockTokenExchange();
    const bodies = mockOrderPages(1, [], false);
    await poll();
    expect(bodies[0]?.variables).toMatchObject({
      from: LAST_POLLED_AT,
      to: windowTo,
      after: "cursor-20",
    });
  });
  it("commits the window's upper bound and clears the cursor once drained", async () => {
    const windowTo = "2026-10-01T00:45:00.000Z";
    store = { lastPolledAt: LAST_POLLED_AT, windowTo, after: "cursor-20" };
    mockTokenExchange();
    mockOrderPages(1, [recentlyCreated], false);
    const result = await poll();
    expect(store).toEqual({ lastPolledAt: windowTo });
    expect(result.payload.body.data).toEqual({
      created: [recentlyCreated],
      updated: [],
    });
  });
  it("fails without moving the window when a page has more but no cursor", async () => {
    store = { lastPolledAt: LAST_POLLED_AT };
    mockTokenExchange();
    nock(TEST_HOST)
      .post("/graphql")
      .reply(200, {
        data: {
          orders: {
            edges: [{ node: recentlyCreated }],
            pageInfo: { hasNextPage: true, endCursor: null },
          },
        },
      });
    await expect(poll()).rejects.toThrow(
      "Fluent reported more orders but returned no endCursor",
    );
    expect(store).toEqual({ lastPolledAt: LAST_POLLED_AT });
  });
  describe("multi-round drain", () => {
    const WINDOW_TO = "2026-10-01T00:45:00.000Z";
    const pollWith = async (
      batching: boolean,
      paginationState?: PollingCursor,
    ) =>
      (await pollChangesTrigger.perform(
        context(batching),
        (paginationState ? { paginationState } : {}) as PerformPayload,
        params,
      )) as PerformResult;
    it("reads one page per round and holds the watermark at the seed", async () => {
      store = { lastPolledAt: LAST_POLLED_AT };
      mockTokenExchange();
      const bodies = mockOrderPages(1, [recentlyCreated], true);
      const result = await pollWith(true);
      expect(bodies).toHaveLength(1);
      expect(result.payload.paginationState).toEqual({
        windowTo: NOW,
        after: "cursor-1",
      });
      expect(store).toEqual({
        lastPolledAt: LAST_POLLED_AT,
        windowTo: NOW,
        after: "cursor-1",
      });
      expect(
        pollChangesTrigger.triggerResolver?.getNextPaginationState?.(
          {} as never,
          result as never,
        ),
      ).toEqual({ windowTo: NOW, after: "cursor-1" });
    });
    it("resumes from the round's own cursor, not a stale stored one", async () => {
      store = {
        lastPolledAt: LAST_POLLED_AT,
        windowTo: "2026-10-01T00:10:00.000Z",
        after: "stale-cursor",
      };
      mockTokenExchange();
      const bodies = mockOrderPages(1, [], true);
      await pollWith(true, { windowTo: WINDOW_TO, after: "cursor-7" });
      expect(bodies[0]?.variables).toMatchObject({
        from: LAST_POLLED_AT,
        to: WINDOW_TO,
        after: "cursor-7",
      });
    });
    it("clears the cursor and commits the watermark once drained", async () => {
      store = { lastPolledAt: LAST_POLLED_AT, windowTo: WINDOW_TO, after: "c" };
      mockTokenExchange();
      mockOrderPages(1, [recentlyCreated, modifiedOlder], false);
      const result = await pollWith(true, { windowTo: WINDOW_TO, after: "c" });
      expect(result.payload.paginationState).toBeUndefined();
      expect(
        pollChangesTrigger.triggerResolver?.getNextPaginationState?.(
          {} as never,
          result as never,
        ),
      ).toBeNull();
      expect(store).toEqual({ lastPolledAt: WINDOW_TO });
      expect(result.payload.body.data).toEqual({
        created: [recentlyCreated],
        updated: [modifiedOlder],
      });
    });
    it("never reports no changes on a round the platform drove", async () => {
      store = { lastPolledAt: LAST_POLLED_AT, windowTo: WINDOW_TO, after: "c" };
      mockTokenExchange();
      mockOrderPages(1, [], false);
      const driven = await pollWith(true, { windowTo: WINDOW_TO, after: "c" });
      expect(driven.polledNoChanges).toBe(false);
      store = { lastPolledAt: LAST_POLLED_AT };
      mockTokenExchange();
      mockOrderPages(1, [], false);
      const scheduled = await pollWith(true);
      expect(scheduled.polledNoChanges).toBe(true);
    });
    it("reports no changes on an unbatched truncated round with nothing shown", async () => {
      store = { lastPolledAt: LAST_POLLED_AT };
      mockTokenExchange();
      mockOrderPages(MAX_POLL_PAGES, [recentlyCreated], true);
      const result = (await pollChangesTrigger.perform(
        context(),
        {} as PerformPayload,
        { ...params, showNewRecords: false },
      )) as PerformResult;
      expect(result.polledNoChanges).toBe(true);
    });
  });
  describe("Look-back Date seed", () => {
    const LOOK_BACK = "2026-09-01T00:00:00.000Z";
    it("starts the first window at the Look-back Date and holds it", async () => {
      mockTokenExchange();
      const bodies = mockOrderPages(1, [modifiedOlder], true);
      await pollChangesTrigger.perform(context(true), {} as PerformPayload, {
        ...params,
        lookBackDate: LOOK_BACK,
      });
      expect(bodies[0]?.variables).toMatchObject({
        from: LOOK_BACK,
        to: NOW,
        after: null,
      });
      expect(store).toEqual({
        lastPolledAt: LOOK_BACK,
        windowTo: NOW,
        after: "cursor-1",
        backfillActive: true,
      });
    });
    const hidden = { showNewRecords: false, showUpdatedRecords: false };
    it("ignores the visibility toggles while the initial sync runs", async () => {
      mockTokenExchange();
      mockOrderPages(1, [recentlyCreated, modifiedOlder], false);
      const result = await pollChangesTrigger.perform(
        context(),
        {} as PerformPayload,
        { ...params, ...hidden, lookBackDate: LOOK_BACK },
      );
      expect(result.payload.body.data).toEqual({
        created: [recentlyCreated],
        updated: [modifiedOlder],
      });
      expect(store).toEqual({ lastPolledAt: NOW });
    });
    it("keeps ignoring them on a resumed initial-sync window", async () => {
      const windowTo = "2026-10-01T00:45:00.000Z";
      store = {
        lastPolledAt: LOOK_BACK,
        windowTo,
        after: "cursor-20",
        backfillActive: true,
      };
      mockTokenExchange();
      mockOrderPages(1, [modifiedOlder], false);
      const result = await pollChangesTrigger.perform(
        context(),
        {} as PerformPayload,
        { ...params, ...hidden, lookBackDate: LOOK_BACK },
      );
      expect(result.payload.body.data).toEqual({
        created: [],
        updated: [modifiedOlder],
      });
      expect(store).toEqual({ lastPolledAt: windowTo });
    });
    it("applies the toggles again once the initial sync is over", async () => {
      store = { lastPolledAt: LAST_POLLED_AT };
      mockTokenExchange();
      mockOrderPages(1, [recentlyCreated, modifiedOlder], false);
      const result = await pollChangesTrigger.perform(
        context(),
        {} as PerformPayload,
        { ...params, ...hidden, lookBackDate: LOOK_BACK },
      );
      expect(result.payload.body.data).toEqual({ created: [], updated: [] });
    });
    it("leaves existing state in charge once a watermark is stored", async () => {
      store = { lastPolledAt: LAST_POLLED_AT };
      mockTokenExchange();
      const bodies = mockOrderPages(1, [], false);
      await pollChangesTrigger.perform(context(), {} as PerformPayload, {
        ...params,
        lookBackDate: LOOK_BACK,
      });
      expect(bodies[0]?.variables).toMatchObject({ from: LAST_POLLED_AT });
    });
    it("cleans to an ISO instant, or empty, and rejects bad dates", () => {
      expect(lookBackDateClean("")).toBe("");
      expect(lookBackDateClean(undefined)).toBe("");
      expect(lookBackDateClean("2026-09-01")).toBe(LOOK_BACK);
      expect(() => lookBackDateClean("09/01/2026")).toThrow(
        "Look-back Date must be a date in YYYY-MM-DD format",
      );
      expect(() => lookBackDateClean("2026-02-31")).toThrow(
        "Look-back Date must be a date in YYYY-MM-DD format",
      );
      expect(() => lookBackDateClean("2026-12-01")).toThrow(
        "Look-back Date cannot be a future date",
      );
    });
  });
});
