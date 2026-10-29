import nock from "nock";
import {
  createPollingContext,
  mockTokenExchange,
  oauthTestConnection,
  refreshTokenTestConnection,
  TEST_HOST,
} from "../testHelpers";
import type { PollingState } from "../types";
import { clearTokenCache } from "../util";
import { wqlQueryPollingTrigger } from "./wqlQueryPollingTrigger";

type PerformArgs = Parameters<typeof wqlQueryPollingTrigger.perform>;
type PollResult = { polledNoChanges?: boolean };

const WQL_PATH = "/ccx/api/wql/v1/acme/data";
const NOW = "2026-10-15T12:00:00.000Z";
const QUERY =
  "SELECT workdayID, approvalDate FROM billableProjectTransactions WHERE approvalDate >= {{lastPolledAt}}";
const queryFrom = (literal: string) =>
  QUERY.replace("{{lastPolledAt}}", literal);
const rowA = { workdayID: "a1", approvalDate: "2026-10-15T11:58:30.250Z" };
const rowB = { workdayID: "b2", approvalDate: "2026-10-15T11:59:00.000Z" };
const rowC = { workdayID: "c3", approvalDate: "2026-10-15T11:57:00.000Z" };

const store: { state?: PollingState } = {};
const context = (batching = false) =>
  createPollingContext<PerformArgs[0]>(store, { batching });
const noPayload = {} as PerformArgs[1];
const params = {
  connection: oauthTestConnection(),
  query: QUERY,
  recordKeyField: "workdayID",
  dateField: "approvalDate",
  overlapMinutes: undefined as number | undefined,
  lookBackDate: "",
  tenant: "acme",
};
const mockWql = (literal: string, rows: unknown[], limit = "1000") =>
  nock(TEST_HOST)
    .get(WQL_PATH)
    .query({ query: queryFrom(literal), limit, offset: "0" })
    .reply(200, { total: rows.length, data: rows });

beforeAll(() => nock.disableNetConnect());
afterAll(() => nock.enableNetConnect());
beforeEach(() => {
  clearTokenCache();
  store.state = undefined;
  vi.useFakeTimers({ toFake: ["Date"] });
  vi.setSystemTime(new Date(NOW));
});
afterEach(() => {
  vi.useRealTimers();
  expect(nock.isDone()).toBe(true);
  nock.cleanAll();
});

describe("wqlQueryPollingTrigger batching declaration", () => {
  it("declares opt-in batching with a default batch size", () => {
    expect(wqlQueryPollingTrigger.triggerResolverSupport).toBe("valid");
    expect(wqlQueryPollingTrigger.batchConfig).toEqual({ batchSize: 50 });
    expect(wqlQueryPollingTrigger.triggerResolver?.resolveItems).toBeInstanceOf(
      Function,
    );
  });

  it("offers the Date Field, Overlap Minutes and Look-back Date directly below the required inputs", () => {
    expect(Object.keys(wqlQueryPollingTrigger.inputs ?? {})).toEqual([
      "connection",
      "query",
      "recordKeyField",
      "dateField",
      "overlapMinutes",
      "lookBackDate",
      "tenant",
    ]);
  });

  it("resolves a realistic payload into tagged items", () => {
    const items = wqlQueryPollingTrigger.triggerResolver?.resolveItems?.(
      {} as never,
      { payload: { body: { data: { changed: [rowA] } } } } as never,
    );
    expect(items).toEqual([{ changeType: "changed", record: rowA }]);
  });
});

describe("wqlQueryPollingTrigger perform", () => {
  it("records a baseline from the data on a first run without a Look-back Date", async () => {
    mockWql("'2026-10-15 11:55:00Z'", [rowA, rowC]);
    const result = await wqlQueryPollingTrigger.perform(
      context(),
      noPayload,
      params,
    );
    expect(result.payload.body).toEqual({ data: { changed: [] } });
    expect((result as PollResult).polledNoChanges).toBe(true);
    expect(store.state?.watermark).toBe(rowA.approvalDate);
    expect(store.state?.lastPolledAt).toBeUndefined();
    expect(store.state?.seen).toHaveLength(1);
  });

  it("delivers every row from the Look-back Date on an initial sync", async () => {
    mockWql("'2026-01-01 00:00:00Z'", [rowA, rowB]);
    const result = await wqlQueryPollingTrigger.perform(context(), noPayload, {
      ...params,
      lookBackDate: "2026-01-01T00:00:00.000Z",
    });
    expect(result.payload.body).toEqual({ data: { changed: [rowA, rowB] } });
    expect(store.state?.watermark).toBe(rowB.approvalDate);
  });

  it("queries from the newest date seen and skips the rows already delivered at that date", async () => {
    mockWql("'2026-10-15 11:55:00Z'", [rowA]);
    await wqlQueryPollingTrigger.perform(context(), noPayload, params);

    vi.setSystemTime(new Date("2026-10-15T12:10:00.000Z"));
    mockWql("'2026-10-15 11:58:30Z'", [rowA, rowB]);
    const result = await wqlQueryPollingTrigger.perform(
      context(),
      noPayload,
      params,
    );
    expect(result.payload.body).toEqual({ data: { changed: [rowB] } });
    expect(store.state?.watermark).toBe(rowB.approvalDate);
    expect(store.state?.seen).toHaveLength(1);
  });

  it("keeps the previous watermark and seen when a window returns no rows", async () => {
    store.state = { watermark: rowA.approvalDate, seen: ["abc"] };
    mockWql("'2026-10-15 11:58:30Z'", []);
    const result = await wqlQueryPollingTrigger.perform(
      context(),
      noPayload,
      params,
    );
    expect((result as PollResult).polledNoChanges).toBe(true);
    expect(store.state).toEqual({
      watermark: rowA.approvalDate,
      seen: ["abc"],
    });
  });

  it("never moves the watermark backwards", async () => {
    store.state = { watermark: rowB.approvalDate, seen: [] };
    mockWql("'2026-10-15 11:59:00Z'", [rowC]);
    await wqlQueryPollingTrigger.perform(context(), noPayload, params);
    expect(store.state?.watermark).toBe(rowB.approvalDate);
  });

  it("ignores rows whose date is missing or unparsable when advancing", async () => {
    store.state = { watermark: rowC.approvalDate, seen: [] };
    mockWql("'2026-10-15 11:57:00Z'", [
      rowA,
      { workdayID: "d4", approvalDate: "not a date" },
      { workdayID: "e5" },
    ]);
    await wqlQueryPollingTrigger.perform(context(), noPayload, params);
    expect(store.state?.watermark).toBe(rowA.approvalDate);
  });

  it("fails and keeps the state when no returned row has the Date Field", async () => {
    store.state = { watermark: rowC.approvalDate, seen: [] };
    mockWql("'2026-10-15 11:57:00Z'", [{ workdayID: "a1" }]);
    await expect(
      wqlQueryPollingTrigger.perform(context(), noPayload, params),
    ).rejects.toThrow(/Date Field "approvalDate"/);
    expect(store.state).toEqual({ watermark: rowC.approvalDate, seen: [] });
  });

  it("resumes from state written before the data-derived cursor", async () => {
    store.state = { lastPolledAt: NOW, seen: [] };
    mockWql("'2026-10-15 11:55:00Z'", [rowA]);
    const result = await wqlQueryPollingTrigger.perform(
      context(),
      noPayload,
      params,
    );
    expect(result.payload.body).toEqual({ data: { changed: [rowA] } });
    expect(store.state?.watermark).toBe(rowA.approvalDate);
    expect(store.state?.lastPolledAt).toBeUndefined();
  });

  it("stores the window start when the first window has no rows", async () => {
    mockWql("'2026-10-15 11:55:00Z'", []);
    await wqlQueryPollingTrigger.perform(context(), noPayload, params);
    expect(store.state?.watermark).toBe("2026-10-15T11:55:00.000Z");
  });

  describe("with Overlap Minutes", () => {
    const overlap = { ...params, overlapMinutes: 10 };

    it("starts the query before the watermark and delivers a backdated row once", async () => {
      store.state = { watermark: rowB.approvalDate, seen: [] };
      mockWql("'2026-10-15 11:49:00Z'", [rowC]);
      const result = await wqlQueryPollingTrigger.perform(
        context(),
        noPayload,
        overlap,
      );
      expect(result.payload.body).toEqual({ data: { changed: [rowC] } });
      expect(store.state?.watermark).toBe(rowB.approvalDate);
      expect(store.state?.seen).toHaveLength(1);
    });

    it("does not deliver again the rows inside the margin across two recurrences", async () => {
      store.state = { watermark: rowC.approvalDate, seen: [] };
      mockWql("'2026-10-15 11:47:00Z'", [rowC, rowA]);
      const first = await wqlQueryPollingTrigger.perform(
        context(),
        noPayload,
        overlap,
      );
      expect(first.payload.body).toEqual({
        data: { changed: [rowC, rowA] },
      });
      expect(store.state?.seen).toHaveLength(2);

      mockWql("'2026-10-15 11:48:30Z'", [rowC, rowA, rowB]);
      const second = await wqlQueryPollingTrigger.perform(
        context(),
        noPayload,
        overlap,
      );
      expect(second.payload.body).toEqual({ data: { changed: [rowB] } });
      expect(store.state?.watermark).toBe(rowB.approvalDate);
    });

    it("delivers again a row inside the margin whose content changed", async () => {
      store.state = { watermark: rowC.approvalDate, seen: [] };
      mockWql("'2026-10-15 11:47:00Z'", [rowC, rowA]);
      await wqlQueryPollingTrigger.perform(context(), noPayload, overlap);

      const changedC = { ...rowC, amount: "250.00" };
      mockWql("'2026-10-15 11:48:30Z'", [changedC, rowA]);
      const result = await wqlQueryPollingTrigger.perform(
        context(),
        noPayload,
        overlap,
      );
      expect(result.payload.body).toEqual({ data: { changed: [changedC] } });
    });

    it("does not apply the overlap to the first window after a legacy resume", async () => {
      store.state = { lastPolledAt: NOW, seen: [] };
      mockWql("'2026-10-15 11:55:00Z'", [rowA]);
      await wqlQueryPollingTrigger.perform(context(), noPayload, overlap);
      expect(store.state?.watermark).toBe(rowA.approvalDate);
      mockWql("'2026-10-15 11:48:30Z'", []);
      await wqlQueryPollingTrigger.perform(context(), noPayload, overlap);
    });
  });

  it("falls back to the connection's tenant", async () => {
    mockTokenExchange();
    mockWql("'2026-10-15 11:55:00Z'", []);
    await wqlQueryPollingTrigger.perform(context(), noPayload, {
      ...params,
      connection: refreshTokenTestConnection(),
      tenant: undefined,
    });
  });

  it("rejects a query without the {{lastPolledAt}} placeholder before calling Workday", async () => {
    await expect(
      wqlQueryPollingTrigger.perform(context(), noPayload, {
        ...params,
        query: "SELECT workdayID FROM allWorkers",
      }),
    ).rejects.toThrow(/Query must contain \{\{lastPolledAt\}\}/);
    expect(store.state).toBeUndefined();
  });

  it("requires a tenant when the connection has none", async () => {
    await expect(
      wqlQueryPollingTrigger.perform(context(), noPayload, {
        ...params,
        tenant: undefined,
      }),
    ).rejects.toThrow(/Tenant is required/);
  });

  it("names the Record Key Field when the query does not select it", async () => {
    mockWql("'2026-01-01 00:00:00Z'", [{ approvalDate: rowA.approvalDate }]);
    await expect(
      wqlQueryPollingTrigger.perform(context(), noPayload, {
        ...params,
        lookBackDate: "2026-01-01T00:00:00.000Z",
      }),
    ).rejects.toThrow(/Record Key Field "workdayID" is missing/);
  });

  it("fails rather than truncating a window larger than Workday caches", async () => {
    nock(TEST_HOST)
      .get(WQL_PATH)
      .query(true)
      .reply(200, { total: 12000, data: [] });
    await expect(
      wqlQueryPollingTrigger.perform(context(), noPayload, params),
    ).rejects.toThrow(/matched 12000 rows/);
    expect(store.state).toBeUndefined();
  });

  it("suggests a later Look-back Date only on the first run", async () => {
    nock(TEST_HOST)
      .get(WQL_PATH)
      .query(true)
      .reply(200, { total: 12000, data: [] });
    await expect(
      wqlQueryPollingTrigger.perform(context(), noPayload, {
        ...params,
        lookBackDate: "2026-01-01T00:00:00.000Z",
      }),
    ).rejects.toThrow(/Choose a later Look-back Date/);
  });

  it("points a later run at the query, not the Look-back Date", async () => {
    store.state = { watermark: NOW, seen: [] };
    nock(TEST_HOST)
      .get(WQL_PATH)
      .query(true)
      .reply(200, { total: 12000, data: [] });
    await expect(
      wqlQueryPollingTrigger.perform(context(), noPayload, params),
    ).rejects.toThrow(
      /Look-back Date only applies to the first run.*Narrow the query's WHERE clause/,
    );
    expect(store.state).toEqual({ watermark: NOW, seen: [] });
  });

  it("refuses a long query that Workday cannot page, keeping the state", async () => {
    store.state = { watermark: NOW, seen: [] };
    const longQuery = `${QUERY} AND ${"workdayID != 'x' AND ".repeat(100)}workdayID != 'y'`;
    nock(TEST_HOST)
      .post(WQL_PATH)
      .reply(201, { total: 30, data: [rowA] });
    await expect(
      wqlQueryPollingTrigger.perform(context(), noPayload, {
        ...params,
        query: longQuery,
      }),
    ).rejects.toThrow(/cannot be paged/);
    expect(store.state).toEqual({ watermark: NOW, seen: [] });
  });

  it("surfaces a Workday error and keeps the stored state", async () => {
    store.state = { watermark: NOW, seen: [] };
    nock(TEST_HOST)
      .get(WQL_PATH)
      .query(true)
      .reply(400, { error: "Invalid query" });
    await expect(
      wqlQueryPollingTrigger.perform(context(), noPayload, params),
    ).rejects.toThrow();
    expect(store.state).toEqual({ watermark: NOW, seen: [] });
  });
});
