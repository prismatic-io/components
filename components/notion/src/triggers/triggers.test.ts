import nock from "nock";
import { afterAll, afterEach, beforeAll, describe, expect, test } from "vitest";
import {
  dataSourceItemsPollingTriggerExamplePayload,
  dataSourcesPollingTriggerExamplePayload,
  pagesPollingTriggerExamplePayload,
} from "../examplePayloads";
import {
  BATCH_SIZE,
  DEFAULT_BACKFILL_MAX_PAGES,
  MAX_POLL_PAGES_PER_RUN,
} from "../constants";
import type {
  DataSourceItemsChangesObject,
  DataSourcesChangesObject,
  NotionPage,
  NotionRecordChange,
  PagesChangesObject,
} from "../types";
import { dataSourceItemsPollingTrigger } from "./dataSourceItemsPollingTrigger";
import { dataSourcesPollingTrigger } from "./dataSourcesPollingTrigger";
import { pagesPollingTrigger } from "./pagesPollingTrigger";
beforeAll(() => {
  nock.disableNetConnect();
});
afterAll(() => {
  nock.enableNetConnect();
});
afterEach(() => {
  nock.cleanAll();
});
const HOST = "https://api.notion.com";
const connection = {
  key: "notionInternalIntegration",
  configVarKey: "",
  fields: { apiKey: "test-api-key" },
} as never;
const page = (
  id: string,
  createdTime: string,
  editedTime = createdTime,
): NotionPage => ({
  id,
  object: "page",
  created_time: createdTime,
  last_edited_time: editedTime,
});
const createPollContext = (
  pollState: Record<string, unknown>,
  options: {
    batching?: boolean;
    instanceState?: Record<string, unknown>;
  } = {},
) => {
  let current = pollState;
  const setStateCalls: Record<string, unknown>[] = [];
  return {
    debug: { enabled: false },
    logger: { debug: () => {}, info: () => {}, error: () => {} },
    instanceState: options.instanceState ?? {},
    ...(options.batching === undefined
      ? {}
      : { batch: { enabled: options.batching, batchSize: BATCH_SIZE } }),
    polling: {
      getState: () => current,
      setState: (next: Record<string, unknown>) => {
        setStateCalls.push(next);
        current = next;
      },
    },
    setStateCalls,
  };
};
type PollResult<T> = {
  payload: {
    body: {
      data: T;
    };
    paginationState?: Record<string, unknown>;
  };
  polledNoChanges: boolean;
};
type DeployResult<T> = PollResult<T> & {
  instanceState?: Record<string, unknown>;
};
const createDeployContext = (
  instanceState: Record<string, unknown> = {},
  batching?: boolean,
) => ({
  debug: { enabled: false },
  logger: { debug: () => {}, info: () => {}, error: () => {} },
  instanceState,
  ...(batching === undefined
    ? {}
    : { batch: { enabled: batching, batchSize: BATCH_SIZE } }),
});
const runPages = async (
  context: ReturnType<typeof createPollContext>,
  lookBackDate?: string,
) =>
  (await pagesPollingTrigger.perform(
    context as never,
    {} as never,
    { connection, lookBackDate } as never,
  )) as unknown as PollResult<PagesChangesObject>;
const runItems = async (
  context: ReturnType<typeof createPollContext>,
  lookBackDate?: string,
) =>
  (await dataSourceItemsPollingTrigger.perform(
    context as never,
    {} as never,
    { connection, dataSourceId: "ds-1", lookBackDate } as never,
  )) as unknown as PollResult<DataSourceItemsChangesObject>;
describe("three-tier declarations", () => {
  test.each([
    ["pages", pagesPollingTrigger],
    ["data sources", dataSourcesPollingTrigger],
    ["data source items", dataSourceItemsPollingTrigger],
  ])("%s is opt-in batchable with a default batch size", (_label, trigger) => {
    expect(trigger.triggerResolverSupport).toBe("valid");
    expect(trigger.batchConfig).toEqual({ batchSize: BATCH_SIZE });
    expect(trigger.triggerResolver?.resolveItems).toBeInstanceOf(Function);
  });
  test.each([
    ["pages", pagesPollingTrigger],
    ["data sources", dataSourcesPollingTrigger],
    ["data source items", dataSourceItemsPollingTrigger],
  ])("%s declares trigger pagination on both surfaces", (_l, trigger) => {
    expect(trigger.triggerResolver?.getNextPaginationState).toBeInstanceOf(
      Function,
    );
    expect(trigger.onDeployResolver?.getNextPaginationState).toBeInstanceOf(
      Function,
    );
  });
  test.each([
    ["pages", pagesPollingTrigger],
    ["data sources", dataSourcesPollingTrigger],
    ["data source items", dataSourceItemsPollingTrigger],
  ])("%s runs a deploy-time initial sync", (_l, trigger) => {
    expect(trigger.onDeployPerform).toBeInstanceOf(Function);
    expect(trigger.onDeployResolver?.resolveItems).toBeInstanceOf(Function);
    expect(trigger.inputs?.lookBackDate).toBeDefined();
  });
  test.each([
    ["pages", pagesPollingTrigger],
    ["data sources", dataSourcesPollingTrigger],
    ["data source items", dataSourceItemsPollingTrigger],
  ])("%s declares no on-deploy-scoped inputs", (_l, trigger) => {
    expect(trigger.onDeployResolver?.inputs).toBeUndefined();
  });
  test.each([
    ["pages", pagesPollingTrigger],
    ["data sources", dataSourcesPollingTrigger],
    ["data source items", dataSourceItemsPollingTrigger],
  ])("%s carries an example payload", (_label, trigger) => {
    expect(trigger.examplePayload).toBeDefined();
  });
});
describe("triggerResolver.resolveItems", () => {
  test("flattens the pages payload perform actually returns", () => {
    const { payload } = pagesPollingTriggerExamplePayload;
    const fixture = payload.body.data as PagesChangesObject;
    expect(
      pagesPollingTrigger.triggerResolver?.resolveItems?.({} as never, {
        payload,
      }),
    ).toEqual([
      ...(fixture.newPages ?? []).map((record) => ({
        changeType: "new",
        record,
      })),
      ...(fixture.updatedPages ?? []).map((record) => ({
        changeType: "updated",
        record,
      })),
    ]);
  });
  test("flattens the data sources payload perform actually returns", () => {
    const { payload } = dataSourcesPollingTriggerExamplePayload;
    const fixture = payload.body.data as DataSourcesChangesObject;
    expect(
      dataSourcesPollingTrigger.triggerResolver?.resolveItems?.({} as never, {
        payload,
      }),
    ).toEqual([
      ...(fixture.newDataSources ?? []).map((record) => ({
        changeType: "new",
        record,
      })),
      ...(fixture.updatedDataSources ?? []).map((record) => ({
        changeType: "updated",
        record,
      })),
    ]);
  });
  test("emits an item present in both arrays exactly once", () => {
    const { payload } = dataSourceItemsPollingTriggerExamplePayload;
    const fixture = payload.body.data as DataSourceItemsChangesObject;
    const duplicated = (fixture.newItems ?? [])[0];
    const resolved =
      dataSourceItemsPollingTrigger.triggerResolver?.resolveItems?.(
        {} as never,
        {
          payload: {
            ...payload,
            body: {
              data: {
                newItems: fixture.newItems,
                updatedItems: [duplicated, ...(fixture.updatedItems ?? [])],
              },
            },
          } as never,
        },
      ) as NotionRecordChange[] | undefined;
    const uniqueIds = new Set(
      [...(fixture.newItems ?? []), ...(fixture.updatedItems ?? [])].map(
        (item) => item.id,
      ),
    );
    expect(resolved).toHaveLength(uniqueIds.size);
    expect(
      resolved?.filter((item) => item.record.id === duplicated.id),
    ).toEqual([{ changeType: "new", record: duplicated }]);
  });
});
describe("pages poll: search request shape", () => {
  test("asks Notion to sort newest first so the walk can stop early", async () => {
    let body: Record<string, unknown> = {};
    nock(HOST)
      .post("/v1/search", (requestBody) => {
        body = requestBody as Record<string, unknown>;
        return true;
      })
      .reply(200, { results: [], has_more: false, next_cursor: null });
    await runPages(
      createPollContext({ lastPolledAt: "2026-01-23T10:00:00.000Z" }),
    );
    expect(body.filter).toEqual({ value: "page", property: "object" });
    expect(body.sort).toEqual({
      timestamp: "last_edited_time",
      direction: "descending",
    });
    expect(body.page_size).toBe(100);
  });
  test("stops paginating at the first record older than the window", async () => {
    const inWindow = page("in", "2026-01-23T10:05:00.000Z");
    const tooOld = page("out", "2026-01-01T00:00:00.000Z");
    nock(HOST)
      .post("/v1/search")
      .reply(200, {
        results: [inWindow, tooOld],
        has_more: true,
        next_cursor: "cursor-2",
      });
    const result = await runPages(
      createPollContext({ lastPolledAt: "2026-01-23T10:00:00.000Z" }),
    );
    expect(result.payload.body.data.newPages).toEqual([inWindow]);
    expect(nock.isDone()).toBe(true);
  });
});
describe("pages poll: window precedence and cursor", () => {
  test("an established cursor wins over the Look-back Date", async () => {
    let body: Record<string, unknown> = {};
    nock(HOST)
      .post("/v1/search", (requestBody) => {
        body = requestBody as Record<string, unknown>;
        return true;
      })
      .reply(200, {
        results: [page("old", "2020-01-01T00:00:00.000Z")],
        has_more: false,
        next_cursor: null,
      });
    const context = createPollContext({
      lastPolledAt: "2026-01-23T10:00:00.000Z",
    });
    const result = await runPages(context, "2020-01-01");
    expect(result.payload.body.data.newPages).toEqual([]);
    expect(context.setStateCalls).toEqual([
      { lastPolledAt: "2026-01-23T10:00:00.000Z" },
    ]);
    expect(body.sort).toBeDefined();
  });
  test("the Look-back Date opens the window when no cursor exists", async () => {
    const backfilled = page("back", "2026-01-05T00:00:00.000Z");
    nock(HOST)
      .post("/v1/search")
      .reply(200, {
        results: [backfilled],
        has_more: false,
        next_cursor: null,
      });
    const result = await runPages(createPollContext({}), "2026-01-01");
    expect(result.payload.body.data.newPages).toEqual([backfilled]);
    expect(result.polledNoChanges).toBe(false);
  });
  test("with no cursor and no Look-back Date the first poll backfills nothing", async () => {
    nock(HOST)
      .post("/v1/search")
      .reply(200, {
        results: [page("old", "2020-01-01T00:00:00.000Z")],
        has_more: false,
        next_cursor: null,
      });
    const result = await runPages(createPollContext({}));
    expect(result.payload.body.data.newPages).toEqual([]);
    expect(result.payload.body.data.updatedPages).toEqual([]);
    expect(result.polledNoChanges).toBe(true);
  });
  test("advances the cursor to the newest record and remembers the boundary", async () => {
    const newest = page("b", "2026-01-23T10:09:00.000Z");
    const older = page("a", "2026-01-23T10:05:00.000Z");
    nock(HOST)
      .post("/v1/search")
      .reply(200, {
        results: [newest, older],
        has_more: false,
        next_cursor: null,
      });
    const context = createPollContext({
      lastPolledAt: "2026-01-23T10:00:00.000Z",
    });
    await runPages(context);
    expect(context.setStateCalls).toEqual([
      { lastPolledAt: "2026-01-23T10:09:00.000Z", boundaryIds: ["b"] },
    ]);
  });
  test("does not re-emit a boundary record the previous poll already sent", async () => {
    const boundary = page("b", "2026-01-23T10:09:00.000Z");
    nock(HOST)
      .post("/v1/search")
      .reply(200, {
        results: [boundary],
        has_more: false,
        next_cursor: null,
      });
    const result = await runPages(
      createPollContext({
        lastPolledAt: "2026-01-23T10:09:00.000Z",
        boundaryIds: ["b"],
      }),
    );
    expect(result.payload.body.data.newPages).toEqual([]);
    expect(result.payload.body.data.updatedPages).toEqual([]);
    expect(result.polledNoChanges).toBe(true);
  });
});
describe("data source items poll", () => {
  test("queries the data source once, filtered on last edited time", async () => {
    const bodies: Record<string, unknown>[] = [];
    nock(HOST)
      .post("/v1/data_sources/ds-1/query", (requestBody) => {
        bodies.push(requestBody as Record<string, unknown>);
        return true;
      })
      .reply(200, { results: [], has_more: false, next_cursor: null });
    await runItems(
      createPollContext({ lastPolledAt: "2026-01-23T10:00:00.000Z" }),
    );
    expect(bodies).toHaveLength(1);
    expect(bodies[0].filter).toEqual({
      timestamp: "last_edited_time",
      last_edited_time: { on_or_after: "2026-01-23T10:00:00.000Z" },
    });
  });
  test("splits the one result set into new and updated items", async () => {
    const preexisting = page(
      "old",
      "2026-01-01T09:00:00.000Z",
      "2026-01-23T10:05:00.000Z",
    );
    const created = page("new", "2026-01-23T10:06:00.000Z");
    nock(HOST)
      .post("/v1/data_sources/ds-1/query")
      .reply(200, {
        results: [preexisting, created],
        has_more: false,
        next_cursor: null,
      });
    const result = await runItems(
      createPollContext({ lastPolledAt: "2026-01-23T10:00:00.000Z" }),
    );
    expect(result.payload.body.data.newItems).toEqual([created]);
    expect(result.payload.body.data.updatedItems).toEqual([
      preexisting,
      created,
    ]);
  });
  test("drops the boundary ids the previous recurrence already emitted", async () => {
    const boundary = page("b", "2026-01-23T10:09:00.000Z");
    const fresh = page("c", "2026-01-23T10:10:00.000Z");
    nock(HOST)
      .post("/v1/data_sources/ds-1/query")
      .reply(200, {
        results: [boundary, fresh],
        has_more: false,
        next_cursor: null,
      });
    const result = await runItems(
      createPollContext({
        lastPolledAt: "2026-01-23T10:09:00.000Z",
        boundaryIds: ["b"],
      }),
    );
    expect(result.payload.body.data.newItems).toEqual([fresh]);
    expect(result.payload.body.data.updatedItems).toEqual([fresh]);
  });
  test("keeps the boundary ids on a recurrence that emits nothing", async () => {
    const boundary = page("b", "2026-01-23T10:09:00.000Z");
    nock(HOST)
      .post("/v1/data_sources/ds-1/query")
      .reply(200, {
        results: [boundary],
        has_more: false,
        next_cursor: null,
      });
    const context = createPollContext({
      lastPolledAt: "2026-01-23T10:09:00.000Z",
      boundaryIds: ["b"],
    });
    const result = await runItems(context);
    expect(result.payload.body.data.newItems).toEqual([]);
    expect(result.payload.body.data.updatedItems).toEqual([]);
    expect(context.setStateCalls).toEqual([
      { lastPolledAt: "2026-01-23T10:09:00.000Z", boundaryIds: ["b"] },
    ]);
  });
  test("re-emits a boundary item that has been edited again", async () => {
    const reEdited = page(
      "b",
      "2026-01-01T09:00:00.000Z",
      "2026-01-23T10:11:00.000Z",
    );
    nock(HOST)
      .post("/v1/data_sources/ds-1/query")
      .reply(200, {
        results: [reEdited],
        has_more: false,
        next_cursor: null,
      });
    const result = await runItems(
      createPollContext({
        lastPolledAt: "2026-01-23T10:09:00.000Z",
        boundaryIds: ["b"],
      }),
    );
    expect(result.payload.body.data.updatedItems).toEqual([reEdited]);
  });
});
describe("Tier 2: trigger pagination", () => {
  const WINDOW = "2026-01-23T10:00:00.000Z";
  const inWindow = page("in", "2026-01-23T10:05:00.000Z");
  const alwaysMorePages = (times: number) =>
    nock(HOST)
      .post("/v1/search")
      .times(times)
      .reply(200, {
        results: [inWindow],
        has_more: true,
        next_cursor: "cursor-next",
      });
  test("the round stops at its page budget instead of draining", async () => {
    alwaysMorePages(MAX_POLL_PAGES_PER_RUN);
    await runPages(createPollContext({ lastPolledAt: WINDOW }));
    expect(nock.isDone()).toBe(true);
  });
  test("a capped round does not advance the watermark", async () => {
    alwaysMorePages(MAX_POLL_PAGES_PER_RUN);
    const context = createPollContext({ lastPolledAt: WINDOW });
    await runPages(context);
    expect(context.setStateCalls[0]?.lastPolledAt).toBe(WINDOW);
  });
  test("a capped round mirrors its position for an unbatched flow", async () => {
    alwaysMorePages(MAX_POLL_PAGES_PER_RUN);
    const context = createPollContext({ lastPolledAt: WINDOW });
    await runPages(context);
    expect(context.setStateCalls[0]?.inFlightCursor).toEqual({
      windowStart: WINDOW,
      startCursor: "cursor-next",
      cursor: inWindow.last_edited_time,
      boundaryIds: [inWindow.id],
    });
  });
  test("an unbatched payload gains no paginationState key", async () => {
    alwaysMorePages(MAX_POLL_PAGES_PER_RUN);
    const result = await runPages(createPollContext({ lastPolledAt: WINDOW }));
    expect("paginationState" in result.payload).toBe(false);
  });
  test("a batched payload carries the cursor onward", async () => {
    alwaysMorePages(MAX_POLL_PAGES_PER_RUN);
    const result = await runPages(
      createPollContext({ lastPolledAt: WINDOW }, { batching: true }),
    );
    expect(result.payload.paginationState).toMatchObject({
      startCursor: "cursor-next",
      windowStart: WINDOW,
    });
  });
  test("the next recurrence resumes from the mirror, not page one", async () => {
    let body: Record<string, unknown> = {};
    nock(HOST)
      .post("/v1/search", (requestBody) => {
        body = requestBody as Record<string, unknown>;
        return true;
      })
      .reply(200, { results: [], has_more: false, next_cursor: null });
    await runPages(
      createPollContext({
        lastPolledAt: WINDOW,
        inFlightCursor: {
          windowStart: WINDOW,
          startCursor: "cursor-resume",
          cursor: inWindow.last_edited_time,
          boundaryIds: [inWindow.id],
        },
      }),
    );
    expect(body.start_cursor).toBe("cursor-resume");
  });
  test("a mid-drain round never reports polledNoChanges", async () => {
    nock(HOST)
      .post("/v1/search")
      .reply(200, { results: [], has_more: false, next_cursor: null });
    const result = await runPages(
      createPollContext({
        lastPolledAt: WINDOW,
        inFlightCursor: {
          windowStart: WINDOW,
          startCursor: "cursor-resume",
          cursor: inWindow.last_edited_time,
          boundaryIds: [inWindow.id],
        },
      }),
    );
    expect(result.polledNoChanges).toBe(false);
  });
  test("the final round commits the cursor carried across the drain", async () => {
    const older = page("older", "2026-01-23T10:01:00.000Z");
    nock(HOST)
      .post("/v1/search")
      .reply(200, { results: [older], has_more: false, next_cursor: null });
    const context = createPollContext({
      lastPolledAt: WINDOW,
      inFlightCursor: {
        windowStart: WINDOW,
        startCursor: "cursor-resume",
        cursor: "2026-01-23T10:09:00.000Z",
        boundaryIds: ["seen-on-round-one"],
      },
    });
    await runPages(context);
    expect(context.setStateCalls[0]).toEqual({
      lastPolledAt: "2026-01-23T10:09:00.000Z",
      boundaryIds: ["seen-on-round-one"],
    });
  });
});
describe("Tier 3: deploy-time initial sync", () => {
  const runDeploy = async (
    context: ReturnType<typeof createDeployContext>,
    lookBackDate?: string,
    paginationState?: Record<string, unknown>,
  ) =>
    (await (
      pagesPollingTrigger as unknown as {
        onDeployPerform: (
          c: unknown,
          p: unknown,
          params: unknown,
        ) => Promise<DeployResult<PagesChangesObject>>;
      }
    ).onDeployPerform(context, paginationState ? { paginationState } : {}, {
      connection,
      lookBackDate,
    })) as DeployResult<PagesChangesObject>;
  test("a clean backfill hands the poll a cursor and marks itself done", async () => {
    const record = page("p", "2026-01-10T09:00:00.000Z");
    nock(HOST)
      .post("/v1/search")
      .reply(200, { results: [record], has_more: false, next_cursor: null });
    const result = await runDeploy(createDeployContext(), "2026-01-01");
    expect(result.instanceState).toEqual({
      notionBackfillCursor: record.last_edited_time,
      notionBackfillCompleted: true,
    });
  });
  test("a capped backfill commits nothing at all", async () => {
    nock(HOST)
      .post("/v1/search")
      .times(DEFAULT_BACKFILL_MAX_PAGES)
      .reply(200, {
        results: [page("p", "2026-01-10T09:00:00.000Z")],
        has_more: true,
        next_cursor: "cursor-next",
      });
    const result = await runDeploy(createDeployContext(), "2026-01-01");
    expect(result.instanceState).toBeUndefined();
    expect(nock.isDone()).toBe(true);
  });
  test("a redeploy of a synced instance replays nothing", async () => {
    const result = await runDeploy(
      createDeployContext({ notionBackfillCompleted: true }),
      "2026-01-01",
    );
    expect(result.payload.body.data.newPages).toEqual([]);
    expect(result.polledNoChanges).toBe(true);
  });
  test("the completion marker does not cancel a drain in progress", async () => {
    const record = page("p", "2026-01-10T09:00:00.000Z");
    nock(HOST)
      .post("/v1/search")
      .reply(200, { results: [record], has_more: false, next_cursor: null });
    const result = await runDeploy(
      createDeployContext({ notionBackfillCompleted: true }),
      "2026-01-01",
      {
        windowStart: "2026-01-01T00:00:00.000Z",
        startCursor: "cursor-resume",
        cursor: "",
        boundaryIds: [],
      },
    );
    expect(result.payload.body.data.newPages).toEqual([record]);
    expect(nock.isDone()).toBe(true);
  });
  test("without a Look-back Date the deploy sync seeds nothing historical", async () => {
    let body: Record<string, unknown> = {};
    const old = page("old", "2020-01-01T00:00:00.000Z");
    nock(HOST)
      .post("/v1/search", (requestBody) => {
        body = requestBody as Record<string, unknown>;
        return true;
      })
      .reply(200, { results: [old], has_more: false, next_cursor: null });
    const result = await runDeploy(createDeployContext());
    expect(body.start_cursor).toBeUndefined();
    expect(result.payload.body.data.newPages).toEqual([]);
    expect(result.payload.body.data.updatedPages).toEqual([]);
  });
  test("an already-polling instance keeps its own cursor after a deploy", async () => {
    let body: Record<string, unknown> = {};
    nock(HOST)
      .post("/v1/search", (requestBody) => {
        body = requestBody as Record<string, unknown>;
        return true;
      })
      .reply(200, { results: [], has_more: false, next_cursor: null });
    const context = createPollContext(
      { lastPolledAt: "2026-02-01T00:00:00.000Z" },
      { instanceState: { notionBackfillCursor: "2020-01-01T00:00:00.000Z" } },
    );
    await runPages(context, "2019-01-01");
    expect(body.start_cursor).toBeUndefined();
    expect(context.setStateCalls[0]).toEqual({
      lastPolledAt: "2026-02-01T00:00:00.000Z",
    });
  });
  test("the poll opens at the handoff, not at the Look-back Date", async () => {
    const beforeHandoff = page("before", "2026-01-10T00:00:00.000Z");
    nock(HOST)
      .post("/v1/search")
      .reply(200, {
        results: [beforeHandoff],
        has_more: false,
        next_cursor: null,
      });
    const result = await runPages(
      createPollContext(
        {},
        { instanceState: { notionBackfillCursor: "2026-01-20T08:00:00.000Z" } },
      ),
      "2026-01-01",
    );
    expect(result.payload.body.data.newPages).toEqual([]);
    expect(result.payload.body.data.updatedPages).toEqual([]);
  });
});
