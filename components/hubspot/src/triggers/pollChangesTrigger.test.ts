import { getHubspotClient } from "../client";
import {
  BATCHED_WINDOW_LIMIT,
  MAX_SEARCH_LIMIT,
  MAX_SEARCH_RESULTS,
} from "../constants";
import type {
  PollingChangesObject,
  PollResult,
  PollingCursor,
  SearchRecordsPollingState,
} from "../types";
import { pollChangesCustomObjectsTrigger } from "./pollChangesCustomObjectsTrigger";
import { pollChangesTrigger } from "./pollChangesTrigger";
jest.mock("../client");
const mockedGetHubspotClient = getHubspotClient as jest.MockedFunction<
  typeof getHubspotClient
>;
const createContext = (
  initialState: SearchRecordsPollingState = {},
  batch?: {
    enabled: boolean;
    batchSize?: number;
  },
) => {
  let state: Record<string, unknown> = initialState as Record<string, unknown>;
  const context = {
    debug: { enabled: false },
    logger: {
      debug: jest.fn(),
      info: jest.fn(),
      warn: jest.fn(),
      error: jest.fn(),
    },
    ...(batch ? { batch } : {}),
    polling: {
      getState: () => state,
      setState: (s: Record<string, unknown>) => {
        state = s;
      },
    },
  } as never;
  return { context, getState: () => state as SearchRecordsPollingState };
};
const searchPage = (results: unknown[], after?: string) => ({
  data: {
    total: results.length,
    results,
    ...(after ? { paging: { next: { after } } } : {}),
  },
});
const rec = (id: string, createdAt: string, updatedAt: string) => ({
  id,
  createdAt,
  updatedAt,
});
const baseParams = (overrides: Record<string, unknown> = {}) => ({
  hubspotConnection: {
    key: "privateAppAccessToken",
    fields: { accessToken: "t" },
  },
  searchEndpoint: "/crm/v3/objects/deals/search",
  searchProperties: undefined,
  showNewRecords: true,
  showUpdatedRecords: true,
  lookBackDate: "",
  ...overrides,
});
beforeEach(() => jest.clearAllMocks());
describe("pollChangesTrigger composition", () => {
  test("declares batching with a serial default", () => {
    expect(pollChangesTrigger.triggerResolverSupport).toBe("valid");
    expect(pollChangesTrigger.batchConfig).toEqual({
      batchSize: 50,
      concurrentBatchLimit: 1,
    });
    expect(pollChangesCustomObjectsTrigger.batchConfig).toEqual({
      batchSize: 50,
      concurrentBatchLimit: 1,
    });
  });
  test("resolveItems flattens the payload into tagged changes", () => {
    const a = rec("a", "2026-08-02T00:00:00.000Z", "2026-08-02T00:00:00.000Z");
    const items = pollChangesTrigger.triggerResolver?.resolveItems?.(
      {} as never,
      {
        payload: { body: { data: { createdRecords: [a] } } },
      } as never,
    );
    expect(items).toEqual([{ changeType: "created", record: a }]);
  });
  test("getNextPaginationState mirrors the payload cursor and stops when absent", () => {
    const cursor: PollingCursor = {
      watermark: "2026-08-05T00:00:00.000Z",
      windowStart: "2026-08-01T00:00:00.000Z",
      windowEnd: "2026-08-11T00:00:00.000Z",
      isBackfill: false,
    };
    const resolver = pollChangesTrigger.triggerResolver;
    expect(
      resolver?.getNextPaginationState?.(
        {} as never,
        { payload: { paginationState: cursor } } as never,
      ),
    ).toEqual(cursor);
    expect(
      resolver?.getNextPaginationState?.({} as never, { payload: {} } as never),
    ).toBeNull();
  });
});
describe("pollChangesTrigger perform", () => {
  test("seeds the initial sync on the creation property, filtered from lookBackDate", async () => {
    const post = jest.fn().mockResolvedValue(searchPage([]));
    mockedGetHubspotClient.mockReturnValue({ post } as never);
    const { context } = createContext({});
    await pollChangesTrigger.perform(
      context,
      {} as never,
      baseParams({ lookBackDate: "2026-01-01T00:00:00.000Z" }) as never,
    );
    const body = post.mock.calls[0][1];
    expect(body.filterGroups[0].filters).toEqual([
      {
        propertyName: "createdate",
        operator: "GTE",
        value: "2026-01-01T00:00:00.000Z",
      },
      { propertyName: "createdate", operator: "LT", value: expect.any(String) },
    ]);
    expect(body.sorts).toEqual([
      { propertyName: "createdate", direction: "ASCENDING" },
    ]);
  });
  test("commits windowEnd and omits the cursor when a window is exhausted", async () => {
    const post = jest
      .fn()
      .mockResolvedValue(
        searchPage([
          rec("a", "2026-08-02T00:00:00.000Z", "2026-08-02T00:00:00.000Z"),
        ]),
      );
    mockedGetHubspotClient.mockReturnValue({ post } as never);
    const { context, getState } = createContext({
      lastPolledAt: "2026-08-01T00:00:00.000Z",
    });
    const before = new Date().toISOString();
    const result = await pollChangesTrigger.perform(
      context,
      {} as never,
      baseParams() as never,
    );
    const after = new Date().toISOString();
    expect(getState().cursor).toBeUndefined();
    expect(getState().lastPolledAt >= before).toBe(true);
    expect(getState().lastPolledAt <= after).toBe(true);
    expect(result.payload.paginationState).toBeUndefined();
    expect((result as unknown as PollResult).polledNoChanges).toBe(false);
  });
  test("holds lastPolledAt at the committed mark and returns a cursor mid-drain", async () => {
    const results = Array.from({ length: MAX_SEARCH_LIMIT }, (_, i) =>
      rec(
        `r${i}`,
        "2026-08-02T00:00:00.000Z",
        new Date(Date.UTC(2026, 7, 2, 0, 0, 0, i)).toISOString(),
      ),
    );
    const post = jest.fn().mockResolvedValue(searchPage(results, "next"));
    mockedGetHubspotClient.mockReturnValue({ post } as never);
    const { context, getState } = createContext({
      lastPolledAt: "2026-08-01T00:00:00.000Z",
    });
    const result = await pollChangesTrigger.perform(
      context,
      {} as never,
      baseParams() as never,
    );
    const cursor = result.payload.paginationState as PollingCursor;
    expect(cursor).toBeDefined();
    expect(getState().cursor).toEqual(cursor);
    expect(getState().lastPolledAt).toBe("2026-08-01T00:00:00.000Z");
    expect(post).toHaveBeenCalledTimes(MAX_SEARCH_RESULTS / MAX_SEARCH_LIMIT);
  });
  test("a full window sharing one millisecond enters an id-walk instead of failing", async () => {
    const results = Array.from({ length: MAX_SEARCH_LIMIT }, (_, i) =>
      rec(`r${i}`, "2026-08-02T00:00:00.000Z", "2026-08-05T00:00:00.000Z"),
    );
    const post = jest.fn().mockResolvedValue(searchPage(results, "next"));
    mockedGetHubspotClient.mockReturnValue({ post } as never);
    const { context, getState } = createContext(
      { lastPolledAt: "2026-08-01T00:00:00.000Z" },
      { enabled: true, batchSize: 50 },
    );
    const result = await pollChangesTrigger.perform(
      context,
      {} as never,
      baseParams() as never,
    );
    const cursor = result.payload.paginationState as PollingCursor;
    expect(cursor.idWalk).toEqual({
      denseTimestamp: "2026-08-05T00:00:00.000Z",
      idWatermark: "",
    });
    expect(getState().cursor?.idWalk?.denseTimestamp).toBe(
      "2026-08-05T00:00:00.000Z",
    );
    expect((result as unknown as PollResult).polledNoChanges).toBe(false);
  });
  test("caps the window at the batched limit when the flow is batching", async () => {
    const results = Array.from({ length: MAX_SEARCH_LIMIT }, (_, i) =>
      rec(
        `r${i}`,
        "2026-08-02T00:00:00.000Z",
        new Date(Date.UTC(2026, 7, 2, 0, 0, 0, i)).toISOString(),
      ),
    );
    const post = jest.fn().mockResolvedValue(searchPage(results, "next"));
    mockedGetHubspotClient.mockReturnValue({ post } as never);
    const { context } = createContext(
      { lastPolledAt: "2026-08-01T00:00:00.000Z" },
      { enabled: true, batchSize: 50 },
    );
    const result = await pollChangesTrigger.perform(
      context,
      {} as never,
      baseParams() as never,
    );
    expect(post).toHaveBeenCalledTimes(BATCHED_WINDOW_LIMIT / MAX_SEARCH_LIMIT);
    expect(result.payload.paginationState).toBeDefined();
  });
  test("keeps polledNoChanges false mid-drain even with zero classified changes", async () => {
    const results = Array.from({ length: MAX_SEARCH_LIMIT }, (_, i) =>
      rec(
        `r${i}`,
        "2026-08-02T00:00:00.000Z",
        new Date(Date.UTC(2026, 7, 2, 0, 0, 0, i)).toISOString(),
      ),
    );
    const post = jest.fn().mockResolvedValue(searchPage(results, "next"));
    mockedGetHubspotClient.mockReturnValue({ post } as never);
    const { context } = createContext({
      lastPolledAt: "2026-08-01T00:00:00.000Z",
    });
    const result = await pollChangesTrigger.perform(
      context,
      {} as never,
      baseParams({ showNewRecords: false, showUpdatedRecords: false }) as never,
    );
    expect(result.payload.paginationState).toBeDefined();
    expect((result as unknown as PollResult).polledNoChanges).toBe(false);
  });
  test("reports polledNoChanges only when the drain is done and nothing changed", async () => {
    const post = jest.fn().mockResolvedValue(searchPage([]));
    mockedGetHubspotClient.mockReturnValue({ post } as never);
    const { context } = createContext({
      lastPolledAt: "2026-08-01T00:00:00.000Z",
    });
    const result = await pollChangesTrigger.perform(
      context,
      {} as never,
      baseParams() as never,
    );
    expect((result as unknown as PollResult).polledNoChanges).toBe(true);
  });
  test.each([
    ["state.cursor", "state"],
    ["paginationState", "payload"],
  ])("keeps polledNoChanges false on the final round of a drain resumed via %s", async (_label, channel) => {
    const cursor: PollingCursor = {
      watermark: "2026-08-05T00:00:00.000Z",
      windowStart: "2026-08-01T00:00:00.000Z",
      windowEnd: "2026-08-10T00:00:00.000Z",
      isBackfill: false,
    };
    const post = jest
      .fn()
      .mockResolvedValue(
        searchPage([
          rec("a", "2026-08-06T00:00:00.000Z", "2026-08-06T00:00:00.000Z"),
        ]),
      );
    mockedGetHubspotClient.mockReturnValue({ post } as never);
    const { context } = createContext(channel === "state" ? { cursor } : {});
    const result = await pollChangesTrigger.perform(
      context,
      (channel === "payload" ? { paginationState: cursor } : {}) as never,
      baseParams({ showNewRecords: false, showUpdatedRecords: false }) as never,
    );
    expect(result.payload.paginationState).toBeUndefined();
    expect((result as unknown as PollResult).polledNoChanges).toBe(false);
  });
  test("resumes identically from paginationState and from state.cursor", async () => {
    const cursor: PollingCursor = {
      watermark: "2026-08-05T00:00:00.000Z",
      windowStart: "2026-08-01T00:00:00.000Z",
      windowEnd: "2026-08-10T00:00:00.000Z",
      isBackfill: false,
    };
    const record = rec(
      "a",
      "2026-08-06T00:00:00.000Z",
      "2026-08-06T00:00:00.000Z",
    );
    const viaPayloadPost = jest.fn().mockResolvedValue(searchPage([record]));
    mockedGetHubspotClient.mockReturnValue({ post: viaPayloadPost } as never);
    const viaPayload = await pollChangesTrigger.perform(
      createContext({}).context,
      { paginationState: cursor } as never,
      baseParams() as never,
    );
    const viaStatePost = jest.fn().mockResolvedValue(searchPage([record]));
    mockedGetHubspotClient.mockReturnValue({ post: viaStatePost } as never);
    const viaState = await pollChangesTrigger.perform(
      createContext({ cursor }).context,
      {} as never,
      baseParams() as never,
    );
    expect(viaStatePost.mock.calls[0][1]).toEqual(
      viaPayloadPost.mock.calls[0][1],
    );
    expect(viaState.payload.body).toEqual(viaPayload.payload.body);
    const sharedBody = viaStatePost.mock.calls[0][1];
    expect(sharedBody.filterGroups[0].filters).toEqual([
      {
        propertyName: "hs_lastmodifieddate",
        operator: "GTE",
        value: cursor.watermark,
      },
      {
        propertyName: "hs_lastmodifieddate",
        operator: "LT",
        value: cursor.windowEnd,
      },
    ]);
  });
  test("discards the cursor and holds lastPolledAt when advanceCursor cannot advance", async () => {
    const nonAscending = [
      rec("a", "2026-01-01T00:00:00.000Z", "2026-08-05T00:00:00.000Z"),
      rec("b", "2026-01-01T00:00:00.000Z", "2026-08-06T00:00:00.000Z"),
    ];
    const post = jest
      .fn()
      .mockResolvedValue({ data: { total: 100, results: nonAscending } });
    mockedGetHubspotClient.mockReturnValue({ post } as never);
    const { context, getState } = createContext({
      lastPolledAt: "2026-08-10T00:00:00.000Z",
      cursor: {
        watermark: "2026-08-10T00:00:00.000Z",
        windowStart: "2026-08-01T00:00:00.000Z",
        windowEnd: "2026-08-11T00:00:00.000Z",
        isBackfill: false,
      },
    });
    await expect(
      pollChangesTrigger.perform(context, {} as never, baseParams() as never),
    ).rejects.toThrow(/at or before the current position/);
    expect(getState().cursor).toBeUndefined();
    expect(getState().lastPolledAt).toBe("2026-08-10T00:00:00.000Z");
  });
  test("output carries both keys even when a toggle is off", async () => {
    const post = jest
      .fn()
      .mockResolvedValue(
        searchPage([
          rec("a", "2026-08-02T00:00:00.000Z", "2026-08-02T00:00:00.000Z"),
        ]),
      );
    mockedGetHubspotClient.mockReturnValue({ post } as never);
    const { context } = createContext({
      lastPolledAt: "2026-08-01T00:00:00.000Z",
    });
    const result = await pollChangesTrigger.perform(
      context,
      {} as never,
      baseParams({ showUpdatedRecords: false }) as never,
    );
    expect(result.payload.body.data).toHaveProperty("createdRecords");
    expect(result.payload.body.data).toHaveProperty("updatedRecords", []);
  });
  test("the look-back sync reports every created record as created, ignoring the toggles", async () => {
    const post = jest
      .fn()
      .mockResolvedValue(
        searchPage([
          rec("a", "2026-08-02T00:00:00.000Z", "2026-08-02T00:00:00.000Z"),
          rec("b", "2026-08-03T00:00:00.000Z", "2026-08-05T00:00:00.000Z"),
        ]),
      );
    mockedGetHubspotClient.mockReturnValue({ post } as never);
    const { context } = createContext({});
    const result = await pollChangesTrigger.perform(
      context,
      {} as never,
      baseParams({
        lookBackDate: "2026-08-01T00:00:00.000Z",
        showNewRecords: false,
        showUpdatedRecords: false,
      }) as never,
    );
    const data = result.payload.body.data as PollingChangesObject;
    expect(data.createdRecords.map((r) => r.id)).toEqual(["a", "b"]);
    expect(data.updatedRecords).toEqual([]);
  });
});
describe("pollChangesCustomObjectsTrigger perform", () => {
  test("filters on hs_lastmodifieddate against the object-type endpoint", async () => {
    const post = jest.fn().mockResolvedValue(searchPage([]));
    mockedGetHubspotClient.mockReturnValue({ post } as never);
    const { context } = createContext({
      lastPolledAt: "2026-08-01T00:00:00.000Z",
    });
    await pollChangesCustomObjectsTrigger.perform(
      context,
      {} as never,
      baseParams({
        searchEndpoint: undefined,
        objectType: "equipment",
      }) as never,
    );
    expect(post).toHaveBeenCalledWith(
      "/crm/v3/objects/equipment/search",
      expect.objectContaining({
        sorts: [
          { propertyName: "hs_lastmodifieddate", direction: "ASCENDING" },
        ],
      }),
    );
    const names = post.mock.calls[0][1].filterGroups[0].filters.map(
      (f: { propertyName: string }) => f.propertyName,
    );
    expect(names).toEqual(["hs_lastmodifieddate", "hs_lastmodifieddate"]);
  });
  test("requires an object type", async () => {
    const post = jest.fn();
    mockedGetHubspotClient.mockReturnValue({ post } as never);
    const { context } = createContext({});
    await expect(
      pollChangesCustomObjectsTrigger.perform(
        context,
        {} as never,
        baseParams({
          searchEndpoint: undefined,
          objectType: undefined,
        }) as never,
      ),
    ).rejects.toThrow(/Object Type/);
    expect(post).not.toHaveBeenCalled();
  });
});
