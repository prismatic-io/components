import nock from "nock";
import { afterAll, afterEach, beforeAll, describe, expect, test } from "vitest";
import { pollNewAndUpdatedTicketsTriggerExamplePayload } from "../examplePayloads";
import type {
  FreshserviceChangesObject,
  FreshserviceRecord,
  TicketPaginationState,
} from "../types";
import { resolvePollingRecordChanges } from "../util";
import { pollNewAndUpdatedTicketsTrigger } from "./pollNewAndUpdatedTicketsTrigger";
beforeAll(() => {
  nock.disableNetConnect();
});
afterAll(() => {
  nock.enableNetConnect();
});
const created: FreshserviceRecord = {
  id: 1,
  subject: "Cannot access VPN",
  created_at: "2026-01-02T00:00:00Z",
  updated_at: "2026-01-02T00:00:00Z",
};
const updated: FreshserviceRecord = {
  id: 2,
  subject: "Printer not responding",
  created_at: "2025-06-01T00:00:00Z",
  updated_at: "2026-01-03T00:00:00Z",
};
describe("Tier 1 batching declaration", () => {
  test("New and Updated Tickets is opt-in batchable with a default batch size", () => {
    expect(pollNewAndUpdatedTicketsTrigger.triggerResolverSupport).toBe(
      "valid",
    );
    expect(pollNewAndUpdatedTicketsTrigger.batchConfig).toEqual({
      batchSize: 50,
    });
    expect(
      pollNewAndUpdatedTicketsTrigger.triggerResolver?.resolveItems,
    ).toBeInstanceOf(Function);
  });
});
describe("resolvePollingRecordChanges", () => {
  test("tags every record with how it changed", () => {
    expect(
      resolvePollingRecordChanges({ created: [created], updated: [updated] }),
    ).toEqual([
      { changeType: "created", record: created },
      { changeType: "updated", record: updated },
    ]);
  });
  test("returns [] for empty or undefined changes", () => {
    expect(resolvePollingRecordChanges({ created: [], updated: [] })).toEqual(
      [],
    );
    expect(resolvePollingRecordChanges(undefined)).toEqual([]);
  });
});
describe("triggerResolver.resolveItems", () => {
  test("flattens the payload shape perform actually returns", () => {
    const { payload } = pollNewAndUpdatedTicketsTriggerExamplePayload;
    const fixture = payload.body.data as FreshserviceChangesObject;
    expect(
      pollNewAndUpdatedTicketsTrigger.triggerResolver?.resolveItems?.(
        {} as never,
        { payload },
      ),
    ).toEqual([
      ...fixture.created.map((record) => ({ changeType: "created", record })),
      ...fixture.updated.map((record) => ({ changeType: "updated", record })),
    ]);
  });
});
describe("Tier 2 declaration", () => {
  test("declares trigger pagination and no deploy-time sync", () => {
    expect(
      pollNewAndUpdatedTicketsTrigger.triggerResolver?.getNextPaginationState,
    ).toBeInstanceOf(Function);
    expect(pollNewAndUpdatedTicketsTrigger.onDeployPerform).toBeUndefined();
    expect(pollNewAndUpdatedTicketsTrigger.onDeployResolver).toBeUndefined();
  });
  test("the Look-back Date is a trigger input, not an on-deploy input", () => {
    expect(pollNewAndUpdatedTicketsTrigger.inputs?.lookBackDate).toBeDefined();
  });
});
describe("getNextPaginationState", () => {
  const relay =
    pollNewAndUpdatedTicketsTrigger.triggerResolver?.getNextPaginationState;
  test("relays the cursor perform stamped on the result", () => {
    const paginationState = {
      page: 2,
      windowStart: "2026-01-01T00:00:00Z",
      windowEnd: "2026-01-05T00:00:00Z",
      maxPages: 200,
    };
    expect(
      relay?.({} as never, { payload: { paginationState } } as never),
    ).toEqual(paginationState);
  });
  test("returns null when perform stamped no cursor, stopping the run", () => {
    expect(relay?.({} as never, { payload: {} } as never)).toBeNull();
  });
});
const HOST = "https://example.freshservice.com";
const connection = {
  key: "freshservice-api-key-connection",
  configVarKey: "",
  fields: { freshserviceDomain: "example", apiKey: "test-api-key" },
} as never;
const createPollContext = (
  pollState: Record<string, unknown>,
  instanceState: Record<string, unknown> = {},
) => {
  let current = pollState;
  const setStateCalls: Record<string, unknown>[] = [];
  const errors: string[] = [];
  return {
    debug: { enabled: false },
    logger: {
      debug: () => {},
      info: () => {},
      error: (message: unknown) => errors.push(String(message)),
    },
    instanceState,
    polling: {
      getState: () => current,
      setState: (next: Record<string, unknown>) => {
        setStateCalls.push(next);
        current = next;
      },
    },
    setStateCalls,
    errors,
  };
};
type PollResult = {
  payload: {
    body: {
      data: FreshserviceChangesObject;
    };
    paginationState?: TicketPaginationState;
  };
  polledNoChanges: boolean;
};
const runPerform = async (
  context: ReturnType<typeof createPollContext>,
  paginationState?: TicketPaginationState,
  lookBackDate?: string,
) =>
  (await pollNewAndUpdatedTicketsTrigger.perform(
    context as never,
    { paginationState } as never,
    {
      connection,
      showNewRecords: true,
      showUpdatedRecords: true,
      lookBackDate,
    } as never,
  )) as unknown as PollResult;
describe("perform pagination and cursor safety", () => {
  afterEach(() => {
    nock.cleanAll();
  });
  test("requests one page at a time and stamps the next page on the payload", async () => {
    const requested: string[] = [];
    nock(HOST)
      .get("/api/v2/tickets")
      .query(true)
      .reply((uri) => {
        requested.push(uri);
        return [
          200,
          { tickets: [created] },
          { link: `<${HOST}/next>; rel="next"` },
        ];
      });
    const context = createPollContext({ lastPolledAt: "2026-01-01T00:00:00Z" });
    const result = await runPerform(context);
    expect(requested).toEqual([
      "/api/v2/tickets?updated_since=2026-01-01T00:00:00Z&per_page=100&page=1",
    ]);
    expect(result.payload.body.data).toEqual({
      created: [created],
      updated: [],
    });
    expect(result.payload.paginationState?.page).toBe(2);
  });
  test("holds the cursor on an intermediate round and advances it on the last", async () => {
    nock(HOST)
      .get("/api/v2/tickets")
      .query((q) => q.page === "1")
      .reply(
        200,
        { tickets: [created] },
        { link: `<${HOST}/next>; rel="next"` },
      );
    const context = createPollContext({ lastPolledAt: "2026-01-01T00:00:00Z" });
    const first = await runPerform(context);
    expect(context.setStateCalls).toHaveLength(1);
    expect(context.setStateCalls[0]).toMatchObject({
      lastPolledAt: "2026-01-01T00:00:00Z",
      inFlightCursor: { page: 2 },
    });
    const carried = first.payload.paginationState;
    expect(carried?.page).toBe(2);
    nock(HOST)
      .get("/api/v2/tickets")
      .query((q) => q.page === "2")
      .reply(200, { tickets: [updated] });
    const second = await runPerform(context, carried);
    expect(second.payload.paginationState).toBeUndefined();
    expect(context.setStateCalls).toHaveLength(2);
    expect(context.setStateCalls[1]).toEqual({
      lastPolledAt: carried?.windowEnd,
    });
  });
  test("resumes the drain from polling state when flow batching is off", async () => {
    nock(HOST)
      .get("/api/v2/tickets")
      .query((q) => q.page === "1")
      .reply(
        200,
        { tickets: [created] },
        { link: `<${HOST}/next>; rel="next"` },
      );
    const context = createPollContext({ lastPolledAt: "2026-01-01T00:00:00Z" });
    await runPerform(context);
    const requested: string[] = [];
    nock(HOST)
      .get("/api/v2/tickets")
      .query(true)
      .reply((uri) => {
        requested.push(uri);
        return [200, { tickets: [updated] }];
      });
    await runPerform(context);
    expect(requested).toEqual([
      "/api/v2/tickets?updated_since=2026-01-01T00:00:00Z&per_page=100&page=2",
    ]);
  });
  test("freezes the window across rounds so records arriving mid-run are not skipped", async () => {
    nock(HOST)
      .get("/api/v2/tickets")
      .query((q) => q.page === "1")
      .reply(
        200,
        { tickets: [created] },
        { link: `<${HOST}/next>; rel="next"` },
      );
    const context = createPollContext({ lastPolledAt: "2026-01-01T00:00:00Z" });
    const first = await runPerform(context);
    const carried = first.payload.paginationState;
    const requested: string[] = [];
    nock(HOST)
      .get("/api/v2/tickets")
      .query(true)
      .reply((uri) => {
        requested.push(uri);
        return [200, { tickets: [] }];
      });
    await runPerform(context, carried);
    expect(requested[0]).toContain("updated_since=2026-01-01T00:00:00Z");
    expect(context.setStateCalls).toHaveLength(2);
    expect(context.setStateCalls[1]).toEqual({
      lastPolledAt: carried?.windowEnd,
    });
  });
  test("stops without advancing the cursor when the page limit is reached", async () => {
    nock(HOST)
      .get("/api/v2/tickets")
      .query(true)
      .reply(
        200,
        { tickets: [created] },
        { link: `<${HOST}/next>; rel="next"` },
      );
    const context = createPollContext({ lastPolledAt: "2026-01-01T00:00:00Z" });
    const result = await runPerform(context, {
      page: 1,
      windowStart: "2026-01-01T00:00:00Z",
      windowEnd: "2026-01-05T00:00:00Z",
      maxPages: 1,
    });
    expect(result.payload.paginationState).toBeUndefined();
    expect(context.setStateCalls).toEqual([
      { lastPolledAt: "2026-01-01T00:00:00Z" },
    ]);
    expect(context.errors[0]).toContain("page limit");
  });
  test("stops when a page comes back empty even if a next page is advertised", async () => {
    nock(HOST)
      .get("/api/v2/tickets")
      .query(true)
      .reply(200, { tickets: [] }, { link: `<${HOST}/next>; rel="next"` });
    const context = createPollContext({ lastPolledAt: "2026-01-01T00:00:00Z" });
    const result = await runPerform(context);
    expect(result.payload.paginationState).toBeUndefined();
    expect(result.polledNoChanges).toBe(true);
    expect(context.setStateCalls).toHaveLength(1);
  });
  test("advances the cursor and reports polledNoChanges when nothing changed", async () => {
    nock(HOST).get("/api/v2/tickets").query(true).reply(200, { tickets: [] });
    const before = new Date().toISOString();
    const context = createPollContext({ lastPolledAt: "2026-01-01T00:00:00Z" });
    const result = await runPerform(context);
    const after = new Date().toISOString();
    expect(result.payload.body.data).toEqual({ created: [], updated: [] });
    expect(result.polledNoChanges).toBe(true);
    const cursor = context.setStateCalls[0].lastPolledAt as string;
    expect(cursor >= before).toBe(true);
    expect(cursor <= after).toBe(true);
  });
  test("starts the initial sync from the Look-back Date on the first poll", async () => {
    const requested: string[] = [];
    nock(HOST)
      .get("/api/v2/tickets")
      .query(true)
      .reply((uri) => {
        requested.push(uri);
        return [200, { tickets: [] }];
      });
    await runPerform(createPollContext({}), undefined, "2026-02-01");
    expect(requested[0]).toContain("updated_since=2026-02-01");
  });
  test("falls back to the default window when no cursor and no Look-back Date", async () => {
    const requested: string[] = [];
    nock(HOST)
      .get("/api/v2/tickets")
      .query(true)
      .reply((uri) => {
        requested.push(uri);
        return [200, { tickets: [] }];
      });
    const before = Date.now();
    await runPerform(createPollContext({}), undefined, "");
    const sent = decodeURIComponent(
      /updated_since=([^&]+)/.exec(requested[0])?.[1] ?? "",
    );
    expect(sent).not.toBe("");
    const daysBack = (before - new Date(sent).getTime()) / 86400000;
    expect(daysBack).toBeGreaterThan(6.9);
    expect(daysBack).toBeLessThan(7.1);
  });
  test("an established poll cursor wins over the Look-back Date", async () => {
    const requested: string[] = [];
    nock(HOST)
      .get("/api/v2/tickets")
      .query(true)
      .reply((uri) => {
        requested.push(uri);
        return [200, { tickets: [] }];
      });
    const context = createPollContext({ lastPolledAt: "2026-03-01T00:00:00Z" });
    await runPerform(context, undefined, "2026-02-01");
    expect(requested[0]).toContain("updated_since=2026-03-01T00:00:00Z");
  });
});
