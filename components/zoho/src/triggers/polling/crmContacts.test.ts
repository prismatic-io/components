import {
  createConnection,
  defaultTriggerPayload,
} from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";
import { zohoTemplatedConnection } from "../../connections";
import type { CRMPollingState, CRMRecord } from "../../types";
import { toZohoTimestamp } from "../../util/general";
import { contactsPollingTrigger } from "./crmContacts";

const conn = {
  ...createConnection(
    zohoTemplatedConnection,
    {},
    { access_token: "test-token" },
  ),
  context: { "accounts-server": "https://accounts.zoho.com" },
};

const BASE = "https://www.zohoapis.com";
const T0 = "2026-03-01T10:00:00.000Z";
const T1 = "2026-03-01T10:10:00.000Z";
const T2 = "2026-03-01T10:20:00.000Z";

const record = (id: string, created: string, modified: string): CRMRecord => ({
  id,
  Created_Time: created,
  Modified_Time: modified,
  Full_Name: id,
});
const page = (records: CRMRecord[], next?: string) => ({
  data: records,
  info: { next_page_token: next, more_records: Boolean(next) },
});

type Perform = typeof contactsPollingTrigger.perform;
let store: CRMPollingState;
let warn: ReturnType<typeof vi.fn>;

const context = (batching: boolean) =>
  ({
    polling: {
      getState: () => store,
      setState: (next: CRMPollingState) => {
        store = next;
      },
    },
    batch: { enabled: batching },
    debug: { enabled: false },
    logger: { debug: vi.fn(), warn },
  }) as unknown as Parameters<Perform>[0];

const run = (batching: boolean, paginationState?: unknown, lookBackDate = "") =>
  contactsPollingTrigger.perform(
    context(batching),
    {
      ...defaultTriggerPayload(),
      paginationState,
    } as unknown as Parameters<Perform>[1],
    { connection: conn, fields: [], lookBackDate } as never,
  );

const at = (iso: string) => vi.setSystemTime(new Date(iso));
const crm = (since: string) =>
  nock(BASE, { reqheaders: { "if-modified-since": toZohoTimestamp(since) } });
const firstPage = (q: Record<string, unknown>) => !q.page_token;
const tokenPage = (token: string) => (q: Record<string, unknown>) =>
  q.page_token === token;

beforeEach(() => {
  vi.useFakeTimers({ toFake: ["Date"] });
  store = {};
  warn = vi.fn();
  at(T0);
});

afterEach(() => {
  vi.useRealTimers();
  nock.cleanAll();
});

describe("contactsPollingTrigger declaration", () => {
  test("is opt-in batchable with a default batch size and a pagination cursor", () => {
    expect(contactsPollingTrigger.triggerResolverSupport).toBe("valid");
    expect(contactsPollingTrigger.batchConfig).toEqual({ batchSize: 50 });
    expect(contactsPollingTrigger.triggerResolver?.resolveItems).toBeInstanceOf(
      Function,
    );
    const cursor = { pageToken: "t", streamStartedAt: T0 };
    const next = contactsPollingTrigger.triggerResolver?.getNextPaginationState;
    expect(
      next?.({} as never, { payload: { paginationState: cursor } } as never),
    ).toEqual(cursor);
    expect(next?.({} as never, { payload: {} } as never)).toBeNull();
  });

  test("places Look-back Date directly below the connection, above the optional fields", () => {
    expect(Object.keys(contactsPollingTrigger.inputs ?? {})).toEqual([
      "connection",
      "lookBackDate",
      "fields",
    ]);
  });

  test("resolveItems flattens the payload shape perform returns", () => {
    const created = record("1", T0, T0);
    const payload = {
      ...defaultTriggerPayload(),
      body: { data: { created: [created] } },
    };
    expect(
      contactsPollingTrigger.triggerResolver?.resolveItems?.({} as never, {
        payload,
      }),
    ).toEqual([{ changeType: "created", record: created }]);
  });
});

describe("first poll", () => {
  test("without a Look-back Date starts at now", async () => {
    const scope = crm(T0)
      .get("/crm/v8/Contacts")
      .query(true)
      .reply(200, page([]));
    const r = await run(false);
    expect(scope.isDone()).toBe(true);
    expect(store).toEqual({ lastPolledAt: T0 });
    expect(r.polledNoChanges).toBe(true);
  });

  test("with a Look-back Date seeds If-Modified-Since and the classification from it", async () => {
    const lb = "2026-01-01T00:00:00.000Z";
    const fresh = record("new", "2026-02-01T00:00:00Z", "2026-02-01T00:00:00Z");
    const old = record("old", "2025-06-01T00:00:00Z", "2026-02-02T00:00:00Z");
    const scope = crm(lb)
      .get("/crm/v8/Contacts")
      .query(true)
      .reply(200, page([fresh, old]));
    const r = await run(false, undefined, lb);
    expect(scope.isDone()).toBe(true);
    expect(r.payload.body.data).toEqual({ created: [fresh], updated: [old] });
    expect(store).toEqual({ lastPolledAt: T0 });
    expect(r.polledNoChanges).toBe(false);
  });

  test("later polls ignore the Look-back Date", async () => {
    store = { lastPolledAt: "2026-02-15T00:00:00.000Z" };
    const scope = crm("2026-02-15T00:00:00.000Z")
      .get("/crm/v8/Contacts")
      .query(true)
      .reply(200, page([]));
    await run(false, undefined, "2026-01-01T00:00:00.000Z");
    expect(scope.isDone()).toBe(true);
  });

  test("a state written before Look-back Date (lastUpdated) is still honored", async () => {
    store = { lastUpdated: "2026-02-15T00:00:00.000Z" };
    const scope = crm("2026-02-15T00:00:00.000Z")
      .get("/crm/v8/Contacts")
      .query(true)
      .reply(200, page([]));
    await run(false);
    expect(scope.isDone()).toBe(true);
    expect(store).toEqual({ lastPolledAt: T0 });
  });
});

describe("page_token stream", () => {
  const since = "2026-02-01T00:00:00.000Z";
  const rec = (id: string) =>
    record(id, "2026-02-10T00:00:00Z", "2026-02-10T00:00:00Z");

  test("3-round drain commits the FIRST round's time with If-Modified-Since unchanged", async () => {
    store = { lastPolledAt: since };
    const ims = crm(since);
    ims
      .get("/crm/v8/Contacts")
      .query(firstPage)
      .reply(200, page([rec("1")], "tok1"));
    ims
      .get("/crm/v8/Contacts")
      .query(tokenPage("tok1"))
      .reply(200, page([rec("2")], "tok2"));
    ims.get("/crm/v8/Contacts").query(tokenPage("tok2")).reply(200, page([]));

    const r1 = await run(true);
    expect(r1.payload.paginationState).toEqual({
      pageToken: "tok1",
      streamStartedAt: T0,
    });
    expect(r1.polledNoChanges).toBe(false);
    expect(store.lastPolledAt).toBe(since);

    at(T1);
    const r2 = await run(true, r1.payload.paginationState);
    expect(r2.payload.paginationState).toEqual({
      pageToken: "tok2",
      streamStartedAt: T0,
    });
    expect(store).toMatchObject({ lastPolledAt: since, pageToken: "tok2" });

    at(T2);
    const r3 = await run(true, r2.payload.paginationState);
    expect(r3.payload.paginationState).toBeUndefined();
    expect(r3.polledNoChanges).toBe(false);
    expect(store).toEqual({ lastPolledAt: T0 });
    expect(ims.isDone()).toBe(true);
  });

  test("with batching off reads a bounded page budget and resumes from state next recurrence", async () => {
    store = { lastPolledAt: since };
    const ims = crm(since);
    for (let i = 0; i < 5; i++) {
      ims
        .get("/crm/v8/Contacts")
        .query(i === 0 ? firstPage : tokenPage(`tok${i}`))
        .reply(200, page([rec(`p${i}`)], `tok${i + 1}`));
    }
    const r1 = await run(false);
    expect(ims.isDone()).toBe(true);
    expect(r1.payload.body.data.created).toHaveLength(5);
    expect(store).toMatchObject({
      pageToken: "tok5",
      streamStartedAt: T0,
      lastPolledAt: since,
    });

    at(T1);
    crm(since)
      .get("/crm/v8/Contacts")
      .query(tokenPage("tok5"))
      .reply(200, page([rec("last")]));
    await run(false);
    expect(store).toEqual({ lastPolledAt: T0 });
  });

  test("a Look-back Date backfill stays active until the stream drains", async () => {
    crm(since)
      .get("/crm/v8/Contacts")
      .query(true)
      .reply(200, page([rec("1")], "tok1"));
    await run(true, undefined, since);
    expect(store).toMatchObject({ backfillActive: true, lastPolledAt: since });
    crm(since)
      .get("/crm/v8/Contacts")
      .query(tokenPage("tok1"))
      .reply(200, page([]));
    await run(true, { pageToken: "tok1", streamStartedAt: T0 }, since);
    expect(store).toEqual({ lastPolledAt: T0 });
  });

  test.each([
    "EXPIRED_VALUE",
    "TOKEN_BOUND_DATA_MISMATCH",
  ])("a held token rejected with %s restarts the stream with one warning", async (code) => {
    store = {
      lastPolledAt: since,
      pageToken: "old",
      streamStartedAt: "2026-02-28T00:00:00.000Z",
    };
    const ims = crm(since);
    ims
      .get("/crm/v8/Contacts")
      .query(tokenPage("old"))
      .reply(400, { code, message: "x", status: "error", details: {} });
    ims
      .get("/crm/v8/Contacts")
      .query(firstPage)
      .reply(200, page([rec("1")]));

    const r = await run(true);
    expect(ims.isDone()).toBe(true);
    expect(warn).toHaveBeenCalledTimes(1);
    expect(r.payload.body.data.created).toHaveLength(1);
    expect(store).toEqual({ lastPolledAt: T0 });
  });

  test.each([
    [401, "INVALID_TOKEN"],
    [400, "REQUIRED_PARAM_MISSING"],
    [500, "INTERNAL_ERROR"],
  ])("other errors (%s %s) on a held token propagate", async (status, code) => {
    store = { lastPolledAt: since, pageToken: "old", streamStartedAt: T1 };
    crm(since)
      .get("/crm/v8/Contacts")
      .query(true)
      .reply(status, { code, message: "x", status: "error" });
    await expect(run(true)).rejects.toBeDefined();
    expect(warn).not.toHaveBeenCalled();
  });

  test("a token issued after a restart and rejected in the same round throws with the code", async () => {
    store = { lastPolledAt: since, pageToken: "old", streamStartedAt: T1 };
    const ims = crm(since);
    const rejected = {
      code: "TOKEN_BOUND_DATA_MISMATCH",
      message: "x",
      status: "error",
    };
    ims.get("/crm/v8/Contacts").query(tokenPage("old")).reply(400, rejected);
    ims
      .get("/crm/v8/Contacts")
      .query(firstPage)
      .reply(200, page([rec("1")], "fresh"));
    ims.get("/crm/v8/Contacts").query(tokenPage("fresh")).reply(400, rejected);
    await expect(run(false)).rejects.toThrow("TOKEN_BOUND_DATA_MISMATCH");
    expect(warn).toHaveBeenCalledTimes(1);
  });

  test("a stream started this round whose first continuation is rejected throws, never restarts", async () => {
    store = { lastPolledAt: since };
    const ims = crm(since);
    ims
      .get("/crm/v8/Contacts")
      .query(firstPage)
      .reply(200, page([rec("1")], "tok1"));
    ims
      .get("/crm/v8/Contacts")
      .query(tokenPage("tok1"))
      .reply(400, {
        code: "TOKEN_BOUND_DATA_MISMATCH",
        message: "x",
        status: "error",
      });
    await expect(run(false)).rejects.toThrow("TOKEN_BOUND_DATA_MISMATCH");
    expect(warn).not.toHaveBeenCalled();
  });

  test("an expired held token of an already-restarted stream restarts it again with one warning", async () => {
    store = {
      lastPolledAt: since,
      pageToken: "tok1",
      streamStartedAt: T1,
      restartedStream: true,
    };
    const ims = crm(since);
    ims
      .get("/crm/v8/Contacts")
      .query(tokenPage("tok1"))
      .reply(400, { code: "EXPIRED_VALUE", message: "x", status: "error" });
    ims
      .get("/crm/v8/Contacts")
      .query(firstPage)
      .reply(200, page([rec("1")], "fresh"));
    const r = await run(true);
    expect(ims.isDone()).toBe(true);
    expect(warn).toHaveBeenCalledTimes(1);
    expect(r.payload.body.data.created).toHaveLength(1);
    expect(store).toEqual({
      lastPolledAt: since,
      pageToken: "fresh",
      streamStartedAt: T0,
      restartedStream: true,
    });
  });

  test("a mismatched held token of an already-restarted stream throws instead of looping", async () => {
    store = {
      lastPolledAt: since,
      pageToken: "tok1",
      streamStartedAt: T1,
      restartedStream: true,
    };
    crm(since)
      .get("/crm/v8/Contacts")
      .query(tokenPage("tok1"))
      .reply(400, {
        code: "TOKEN_BOUND_DATA_MISMATCH",
        message: "x",
        status: "error",
      });
    await expect(run(false)).rejects.toThrow("TOKEN_BOUND_DATA_MISMATCH");
    expect(warn).not.toHaveBeenCalled();
  });

  test("an already-restarted stream restarted again and then rejected throws once, never restarts twice", async () => {
    store = {
      lastPolledAt: since,
      pageToken: "tok1",
      streamStartedAt: T1,
      restartedStream: true,
    };
    const ims = crm(since);
    const rejected = { code: "EXPIRED_VALUE", message: "x", status: "error" };
    ims.get("/crm/v8/Contacts").query(tokenPage("tok1")).reply(400, rejected);
    ims
      .get("/crm/v8/Contacts")
      .query(firstPage)
      .reply(200, page([rec("1")], "fresh"));
    ims.get("/crm/v8/Contacts").query(tokenPage("fresh")).reply(400, rejected);
    await expect(run(false)).rejects.toThrow("EXPIRED_VALUE");
    expect(ims.isDone()).toBe(true);
    expect(warn).toHaveBeenCalledTimes(1);
  });

  test("a restart is remembered on the cursor so the next round cannot restart again", async () => {
    store = { lastPolledAt: since, pageToken: "old", streamStartedAt: T1 };
    const ims = crm(since);
    ims
      .get("/crm/v8/Contacts")
      .query(tokenPage("old"))
      .reply(400, { code: "EXPIRED_VALUE", message: "x", status: "error" });
    ims
      .get("/crm/v8/Contacts")
      .query(firstPage)
      .reply(200, page([rec("1")], "fresh"));
    const r = await run(true);
    expect(r.payload.paginationState).toEqual({
      pageToken: "fresh",
      streamStartedAt: T0,
      restartedStream: true,
    });
    expect(store).toMatchObject({ pageToken: "fresh", restartedStream: true });
  });

  test("continuation requests keep the first request's params, minus page, plus page_token", async () => {
    store = { lastPolledAt: since };
    const seen: Record<string, unknown>[] = [];
    const ims = crm(since);
    ims
      .get("/crm/v8/Contacts")
      .query((q) => {
        seen.push(q);
        return firstPage(q);
      })
      .reply(200, page([rec("1")], "tok1"));
    ims
      .get("/crm/v8/Contacts")
      .query((q) => {
        seen.push(q);
        return tokenPage("tok1")(q);
      })
      .reply(200, page([]));
    await run(false);
    const { page_token: _t, ...continuation } = seen[1] as Record<
      string,
      unknown
    >;
    expect(continuation).toEqual(seen[0]);
    expect(seen[0].per_page).toBe("200");
    expect(seen[1].page).toBeUndefined();
  });

  test("a failing first page without a held token propagates, never restarts", async () => {
    store = { lastPolledAt: since };
    crm(since)
      .get("/crm/v8/Contacts")
      .query(true)
      .reply(400, { code: "EXPIRED_VALUE", message: "x", status: "error" });
    await expect(run(true)).rejects.toBeDefined();
  });
});
