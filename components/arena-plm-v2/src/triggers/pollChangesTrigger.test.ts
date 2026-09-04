import type { TriggerBaseResult, TriggerPayload } from "@prismatic-io/spectral";
import { createConnection } from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import { arenaApiKey } from "../connections";
import { ARENA_MAX_PAGE_SIZE } from "../constants";
import type { ArenaRecord, PollingCursor, PollingState } from "../types";
import { arenaEventsPath } from "../util/polling";
import { pollChangesTrigger } from "./pollChangesTrigger";
const ARENA_HOST = "https://arena.example.com";
const API = "/v1";
const INTEGRATION_GUID = "OI1AB2CD3EF4GH5IJ6KL7MN1";
type PollResult = TriggerBaseResult<TriggerPayload>;
const event = (guid: string): ArenaRecord => ({
  guid,
  eventType: "CHANGE_EFFECTIVE",
  status: "COMPLETED",
  creationDateTime: "2026-03-21T08:40:00Z",
});
const fullPage = (): ArenaRecord[] =>
  Array.from({ length: ARENA_MAX_PAGE_SIZE }, (_, i) => event(`EV${i}`));
const createPollingContext = (initialState: PollingState = {}) => {
  let state: PollingState = initialState;
  const context = {
    logger: {
      debug: jest.fn(),
      info: jest.fn(),
      warn: jest.fn(),
      error: jest.fn(),
    },
    executionState: {},
    debug: { enabled: false },
    polling: {
      getState: () => state,
      setState: (next: PollingState) => {
        state = next;
      },
    },
  } as never;
  return { context, getState: (): PollingState => state };
};
const params = (overrides: Record<string, unknown> = {}) =>
  ({
    connection: createConnection(arenaApiKey, {
      baseUrl: "custom",
      customBaseUrl: ARENA_HOST,
      apiKey: "fake-api-key",
      timeout: "3000",
    }),
    integrationGuid: INTEGRATION_GUID,
    itemsReconciled: "any",
    lookBackDate: undefined,
    ...overrides,
  }) as never;
describe("pollChangesTrigger — batching declaration", () => {
  it("declares opt-in batch dispatch and page draining", () => {
    expect(pollChangesTrigger.triggerResolverSupport).toBe("valid");
    expect(pollChangesTrigger.batchConfig).toEqual({ batchSize: 50 });
    expect(typeof pollChangesTrigger.triggerResolver?.resolveItems).toBe(
      "function",
    );
    expect(
      typeof pollChangesTrigger.triggerResolver?.getNextPaginationState,
    ).toBe("function");
  });
});
describe("pollChangesTrigger — resolveItems", () => {
  it("tags each created event from a realistic payload", () => {
    const records = [event("EV1"), event("EV2")];
    const resolveItems = pollChangesTrigger.triggerResolver?.resolveItems;
    const items = resolveItems?.(
      {} as never,
      {
        payload: { body: { data: { createdRecords: records } } },
      } as never,
    );
    expect(items).toEqual([
      { changeType: "created", record: records[0] },
      { changeType: "created", record: records[1] },
    ]);
  });
  it("returns an empty array when the payload carries no data", () => {
    const resolveItems = pollChangesTrigger.triggerResolver?.resolveItems;
    expect(
      resolveItems?.({} as never, { payload: { body: {} } } as never),
    ).toEqual([]);
  });
});
describe("pollChangesTrigger — getNextPaginationState", () => {
  it("hands back the cursor perform stamped on the payload", () => {
    const next = pollChangesTrigger.triggerResolver?.getNextPaginationState;
    const stamped: PollingCursor = {
      windowStart: "2026-03-01T00:00:00.000Z",
      windowEnd: "2026-03-21T09:00:00.000Z",
      offset: 400,
    };
    expect(
      next?.({} as never, { payload: { paginationState: stamped } } as never),
    ).toEqual(stamped);
  });
  it("returns null when perform stamped nothing", () => {
    const next = pollChangesTrigger.triggerResolver?.getNextPaginationState;
    expect(next?.({} as never, { payload: {} } as never)).toBeNull();
  });
});
describe("pollChangesTrigger — perform", () => {
  afterEach(() => {
    nock.cleanAll();
  });
  afterAll(() => {
    nock.restore();
  });
  it("reports the events Arena returns and commits the position", async () => {
    nock(ARENA_HOST)
      .get(`${API}${arenaEventsPath(INTEGRATION_GUID)}`)
      .query(true)
      .reply(200, { results: [event("EV1")], count: 1 });
    const polling = createPollingContext({
      lastPolledAt: "2026-03-01T00:00:00.000Z",
    });
    const result = (await pollChangesTrigger.perform(
      polling.context,
      {} as never,
      params(),
    )) as PollResult;
    expect(result.payload.body.data).toEqual({
      createdRecords: [event("EV1")],
    });
    expect(result.polledNoChanges).toBe(false);
    expect(polling.getState().lastPolledAt).not.toBe(
      "2026-03-01T00:00:00.000Z",
    );
    expect(polling.getState().cursor).toBeUndefined();
  });
  it("does not advance the position while pages remain", async () => {
    nock(ARENA_HOST)
      .get(`${API}${arenaEventsPath(INTEGRATION_GUID)}`)
      .query(true)
      .reply(200, { results: fullPage(), count: ARENA_MAX_PAGE_SIZE });
    const polling = createPollingContext({
      lastPolledAt: "2026-03-01T00:00:00.000Z",
    });
    const result = (await pollChangesTrigger.perform(
      polling.context,
      {} as never,
      params(),
    )) as PollResult;
    expect(polling.getState().lastPolledAt).toBe("2026-03-01T00:00:00.000Z");
    expect(polling.getState().cursor).toEqual({
      windowStart: "2026-03-01T00:00:00.000Z",
      windowEnd: expect.any(String),
      offset: ARENA_MAX_PAGE_SIZE,
    });
    expect(result.payload.paginationState).toEqual(polling.getState().cursor);
  });
  it("resumes a persisted cursor and keeps the window frozen", async () => {
    const persisted: PollingCursor = {
      windowStart: "2026-03-01T00:00:00.000Z",
      windowEnd: "2026-03-21T09:00:00.000Z",
      offset: 400,
    };
    const scope = nock(ARENA_HOST)
      .get(`${API}${arenaEventsPath(INTEGRATION_GUID)}`)
      .query(
        (actual) =>
          actual.offset === "400" &&
          actual.creationDateTimeTo === persisted.windowEnd,
      )
      .reply(200, { results: [event("EV1")], count: 1 });
    const polling = createPollingContext({
      lastPolledAt: "2026-02-01T00:00:00.000Z",
      cursor: persisted,
    });
    await pollChangesTrigger.perform(polling.context, {} as never, params());
    expect(scope.isDone()).toBe(true);
    expect(polling.getState().lastPolledAt).toBe(persisted.windowEnd);
    expect(polling.getState().cursor).toBeUndefined();
  });
  it("resumes an incoming cursor from the platform", async () => {
    const incoming: PollingCursor = {
      windowStart: "2026-03-01T00:00:00.000Z",
      windowEnd: "2026-03-21T09:00:00.000Z",
      offset: 800,
    };
    const scope = nock(ARENA_HOST)
      .get(`${API}${arenaEventsPath(INTEGRATION_GUID)}`)
      .query((actual) => actual.offset === "800")
      .reply(200, { results: [], count: 0 });
    await pollChangesTrigger.perform(
      createPollingContext().context,
      { paginationState: incoming } as never,
      params(),
    );
    expect(scope.isDone()).toBe(true);
  });
  it("never reports no changes on a platform-driven round", async () => {
    nock(ARENA_HOST)
      .get(`${API}${arenaEventsPath(INTEGRATION_GUID)}`)
      .query(true)
      .reply(200, { results: [], count: 0 });
    const result = (await pollChangesTrigger.perform(
      createPollingContext().context,
      {
        paginationState: {
          windowStart: "2026-03-01T00:00:00.000Z",
          windowEnd: "2026-03-21T09:00:00.000Z",
          offset: 400,
        },
      } as never,
      params(),
    )) as PollResult;
    expect(result.polledNoChanges).toBe(false);
  });
  it("covers the look back window on the first recurrence", async () => {
    const lookBackDate = "2026-01-01T00:00:00Z";
    const scope = nock(ARENA_HOST)
      .get(`${API}${arenaEventsPath(INTEGRATION_GUID)}`)
      .query(
        (actual) =>
          actual.creationDateTimeFrom === lookBackDate && actual.offset === "0",
      )
      .reply(200, { results: [event("EV1")], count: 1 });
    const result = (await pollChangesTrigger.perform(
      createPollingContext().context,
      {} as never,
      params({ lookBackDate }),
    )) as PollResult;
    expect(scope.isDone()).toBe(true);
    expect(result.payload.body.data).toEqual({
      createdRecords: [event("EV1")],
    });
  });
  it("asks Arena nothing on a first recurrence with no look back date", async () => {
    const scope = nock(ARENA_HOST)
      .get(`${API}${arenaEventsPath(INTEGRATION_GUID)}`)
      .query(true)
      .reply(200, { results: [], count: 0 });
    const polling = createPollingContext();
    const result = (await pollChangesTrigger.perform(
      polling.context,
      {} as never,
      params(),
    )) as PollResult;
    expect(scope.isDone()).toBe(false);
    expect(result.polledNoChanges).toBe(true);
    expect(polling.getState().lastPolledAt).toBeDefined();
  });
  it("does not send a reconciliation filter for the 'any' sentinel", async () => {
    const scope = nock(ARENA_HOST)
      .get(`${API}${arenaEventsPath(INTEGRATION_GUID)}`)
      .query((actual) => !("itemsReconciled" in actual))
      .reply(200, { results: [], count: 0 });
    await pollChangesTrigger.perform(
      createPollingContext({ lastPolledAt: "2026-03-01T00:00:00.000Z" })
        .context,
      {} as never,
      params({ itemsReconciled: "any" }),
    );
    expect(scope.isDone()).toBe(true);
  });
  it("forwards a chosen reconciliation filter", async () => {
    const scope = nock(ARENA_HOST)
      .get(`${API}${arenaEventsPath(INTEGRATION_GUID)}`)
      .query((actual) => actual.itemsReconciled === "false")
      .reply(200, { results: [], count: 0 });
    await pollChangesTrigger.perform(
      createPollingContext({ lastPolledAt: "2026-03-01T00:00:00.000Z" })
        .context,
      {} as never,
      params({ itemsReconciled: "false" }),
    );
    expect(scope.isDone()).toBe(true);
  });
});
