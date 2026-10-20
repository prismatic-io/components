import { beforeEach, describe, expect, test, vi } from "vitest";
import type { BusinessCentralRecord, PollingState } from "../interfaces";
import { lookBackDateClean, resolveRecordChanges } from "../utils";
import { pollChangesTrigger } from "./pollChangesTrigger";
const { getClient } = vi.hoisted(() => ({ getClient: vi.fn() }));
vi.mock("../client", () => ({ getMsBusinessCentralClient: () => getClient() }));
const record = (
  id: string,
  lastModifiedDateTime: string,
): BusinessCentralRecord => ({
  id,
  lastModifiedDateTime,
});
const first = record("1", "2026-06-01T12:00:00Z");
const second = record("2", "2026-06-02T12:00:00Z");
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
      "companyId",
      "pollResourceType",
      "lookBackDate",
      "additionalFilter",
      "showUpdatedRecords",
    ]);
  });
});
describe("resolveRecordChanges", () => {
  test("tags every record with how it changed", () => {
    expect(
      resolveRecordChanges({ created: [first], updated: [second] }),
    ).toEqual([
      { changeType: "created", record: first },
      { changeType: "updated", record: second },
    ]);
  });
  test("tolerates an absent envelope, an empty one, and a single absent array", () => {
    expect(resolveRecordChanges(undefined)).toEqual([]);
    expect(resolveRecordChanges({})).toEqual([]);
    expect(resolveRecordChanges({ created: [], updated: [] })).toEqual([]);
    expect(resolveRecordChanges({ updated: [second] })).toEqual([
      { changeType: "updated", record: second },
    ]);
    expect(resolveRecordChanges({ created: [first] })).toEqual([
      { changeType: "created", record: first },
    ]);
  });
});
describe("triggerResolver.resolveItems", () => {
  test("flattens the payload shape perform actually returns", () => {
    const items = pollChangesTrigger.triggerResolver?.resolveItems?.(
      {} as never,
      {
        payload: { body: { data: { created: [], updated: [first, second] } } },
      } as never,
    );
    expect(items).toEqual([
      { changeType: "updated", record: first },
      { changeType: "updated", record: second },
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
  let store: PollingState;
  let get: ReturnType<typeof vi.fn>;
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
    connection: { key: "oauth2", fields: {} } as never,
    companyId: "company-1",
    pollResourceType: "items",
    lookBackDate: "",
    additionalFilter: undefined,
    showUpdatedRecords: true,
  };
  const run = (overrides: Partial<typeof params> = {}) =>
    pollChangesTrigger.perform(context(), {} as unknown as PerformPayload, {
      ...params,
      ...overrides,
    });
  const filterSent = () =>
    (
      get.mock.calls[0][1] as {
        params: {
          $filter: string;
        };
      }
    ).params.$filter;
  beforeEach(() => {
    store = {};
    get = vi.fn().mockResolvedValue({ data: { value: [first] } });
    getClient.mockReturnValue({ get });
  });
  test("the first poll seeds from the Look-back Date", async () => {
    await run({ lookBackDate: "2026-01-01T00:00:00.000Z" });
    expect(filterSent()).toBe(
      "lastModifiedDateTime gt 2026-01-01T00:00:00.000Z",
    );
  });
  test("the first poll without a Look-back Date seeds from now and returns nothing to backfill", async () => {
    const before = Date.now();
    await run();
    const seeded = Date.parse(
      filterSent().replace("lastModifiedDateTime gt ", ""),
    );
    expect(seeded).toBeGreaterThanOrEqual(before);
    expect(Date.parse(store.lastPolledAt as string)).toBeGreaterThanOrEqual(
      before,
    );
    expect(store.backfillActive).toBeUndefined();
  });
  test("a backfill emits records even when Show Updated Records is off", async () => {
    const result = await run({
      lookBackDate: "2026-01-01T00:00:00.000Z",
      showUpdatedRecords: false,
    });
    expect(result.payload.body).toEqual({
      data: { created: [], updated: [first] },
    });
    expect(
      (
        result as {
          polledNoChanges?: boolean;
        }
      ).polledNoChanges,
    ).toBe(false);
  });
  test("later polls ignore the Look-back Date and honor the toggle", async () => {
    store = { lastPolledAt: "2026-06-10T00:00:00.000Z" };
    const before = Date.now();
    const result = await run({
      lookBackDate: "2026-01-01T00:00:00.000Z",
      showUpdatedRecords: false,
    });
    expect(filterSent()).toBe(
      "lastModifiedDateTime gt 2026-06-10T00:00:00.000Z",
    );
    expect(result.payload.body).toEqual({ data: { created: [], updated: [] } });
    expect(
      (
        result as {
          polledNoChanges?: boolean;
        }
      ).polledNoChanges,
    ).toBe(true);
    expect(Date.parse(store.lastPolledAt as string)).toBeGreaterThanOrEqual(
      before,
    );
  });
  test("a truncated backfill keeps ignoring the toggle until it drains", async () => {
    get.mockResolvedValue({
      data: { value: [first], "@odata.nextLink": "https://bc/next" },
    });
    const r1 = await run({
      lookBackDate: "2026-01-01T00:00:00.000Z",
      showUpdatedRecords: false,
    });
    expect(r1.payload.body).toEqual({
      data: { created: [], updated: expect.any(Array) },
    });
    expect(store.backfillActive).toBe(true);
    get.mockReset();
    get.mockResolvedValue({ data: { value: [second] } });
    const r2 = await run({
      lookBackDate: "2026-01-01T00:00:00.000Z",
      showUpdatedRecords: false,
    });
    expect(r2.payload.body).toEqual({
      data: { created: [], updated: [second] },
    });
    expect(store.backfillActive).toBeUndefined();
  });
  test("a truncated poll holds its boundary and the unread page link, never the newest timestamp", async () => {
    store = { lastPolledAt: "2026-06-10T00:00:00.000Z" };
    get.mockResolvedValue({
      data: { value: [first], "@odata.nextLink": "https://bc/next" },
    });
    await run();
    expect(store).toMatchObject({
      lastPolledAt: "2026-06-10T00:00:00.000Z",
      nextLink: "https://bc/next",
      streamStartedAt: expect.any(String),
    });
  });
  test("resumes from the held page link and commits the stream start once drained", async () => {
    const since = "2026-06-10T00:00:00.000Z";
    const query = `/companies(company-1)/items?$filter=lastModifiedDateTime gt ${since}`;
    const started = "2026-06-11T00:00:00.000Z";
    store = {
      lastPolledAt: since,
      nextLink: "https://bc/held",
      streamStartedAt: started,
      streamQuery: query,
    };
    get.mockResolvedValue({ data: { value: [second] } });
    await run();
    expect(get).toHaveBeenCalledWith("https://bc/held");
    expect(store).toEqual({ lastPolledAt: started });
  });
  test("a held link issued for another query is not resumed", async () => {
    store = {
      lastPolledAt: "2026-06-10T00:00:00.000Z",
      nextLink: "https://bc/held",
      streamStartedAt: "2026-06-11T00:00:00.000Z",
      streamQuery: "/companies(company-1)/customers?$filter=x",
    };
    await run();
    expect(get.mock.calls[0][0]).toBe("/companies(company-1)/items");
  });
  test("a rejected held link restarts the stream from the held boundary", async () => {
    const since = "2026-06-10T00:00:00.000Z";
    const query = `/companies(company-1)/items?$filter=lastModifiedDateTime gt ${since}`;
    store = {
      lastPolledAt: since,
      nextLink: "https://bc/expired",
      streamStartedAt: "2026-06-11T00:00:00.000Z",
      streamQuery: query,
    };
    const before = Date.now();
    get
      .mockRejectedValueOnce(new Error("410"))
      .mockResolvedValue({ data: { value: [second] } });
    const result = await run();
    expect(get.mock.calls[1][1]).toEqual({
      params: { $filter: `lastModifiedDateTime gt ${since}` },
    });
    expect(result.payload.body).toEqual({
      data: { created: [], updated: [second] },
    });
    expect(Date.parse(store.lastPolledAt as string)).toBeGreaterThanOrEqual(
      before,
    );
  });
});
