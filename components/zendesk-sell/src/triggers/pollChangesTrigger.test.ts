import { defaultTriggerPayload } from "@prismatic-io/spectral/dist/testing";
import { listDealsExamplePayload } from "../examplePayloads";
import type { PollingState, ZendeskSellRecord } from "../types";
import { lookBackDateClean, resolveZendeskSellRecordChanges } from "../util";
import { pollChangesTrigger } from "./pollChangesTrigger";
const created: ZendeskSellRecord = {
  id: 47912051,
  created_at: "2026-06-01T12:00:00Z",
  updated_at: "2026-06-01T12:00:00Z",
};
const updated: ZendeskSellRecord = {
  id: 47912050,
  created_at: "2024-08-15T09:32:17Z",
  updated_at: "2026-06-01T11:42:09Z",
};
test("New and Updated Records is opt-in batchable with a default batch size", () => {
  expect(pollChangesTrigger.triggerResolverSupport).toBe("valid");
  expect(pollChangesTrigger.batchConfig).toEqual({ batchSize: 50 });
  expect(pollChangesTrigger.triggerResolver?.resolveItems).toBeInstanceOf(
    Function,
  );
});
test("resolveZendeskSellRecordChanges tags every record with how it changed", () => {
  expect(
    resolveZendeskSellRecordChanges({ created: [created], updated: [updated] }),
  ).toEqual([
    { changeType: "created", record: created },
    { changeType: "updated", record: updated },
  ]);
});
test("resolveZendeskSellRecordChanges returns [] for empty or undefined changes", () => {
  expect(resolveZendeskSellRecordChanges({ created: [], updated: [] })).toEqual(
    [],
  );
  expect(resolveZendeskSellRecordChanges(undefined)).toEqual([]);
});
test("resolveItems flattens the payload shape perform actually returns", () => {
  const payload = {
    ...defaultTriggerPayload(),
    body: { data: { created: [created], updated: [updated] } },
  };
  expect(
    pollChangesTrigger.triggerResolver?.resolveItems?.({} as never, {
      payload,
    }),
  ).toEqual([
    { changeType: "created", record: created },
    { changeType: "updated", record: updated },
  ]);
});
const { getZendeskClient } = vi.hoisted(() => ({ getZendeskClient: vi.fn() }));
vi.mock("../client", () => ({ getZendeskClient }));
test("offers the Look-back Date directly below the required inputs", () => {
  expect(Object.keys(pollChangesTrigger.inputs ?? {})).toEqual([
    "connection",
    "pollResourceType",
    "lookBackDate",
    "showNewRecords",
    "showUpdatedRecords",
  ]);
});
describe("lookBackDateClean", () => {
  beforeEach(() => {
    vi.useFakeTimers({ toFake: ["Date"] });
    vi.setSystemTime(new Date("2026-06-10T00:00:00.000Z"));
  });
  afterEach(() => vi.useRealTimers());
  test("normalizes a date to the start of that day in UTC", () => {
    expect(lookBackDateClean("2026-01-01")).toBe("2026-01-01T00:00:00.000Z");
    expect(lookBackDateClean("  2026-01-01  ")).toBe(
      "2026-01-01T00:00:00.000Z",
    );
  });
  test("treats empty input as no backfill", () => {
    expect(lookBackDateClean(undefined)).toBe("");
    expect(lookBackDateClean(null)).toBe("");
    expect(lookBackDateClean("")).toBe("");
    expect(lookBackDateClean("   ")).toBe("");
  });
  test("rejects a malformed date, a non-calendar date, and a non-string", () => {
    expect(() => lookBackDateClean("01/01/2026")).toThrow(
      /Look-back Date must be a date in YYYY-MM-DD format/,
    );
    expect(() => lookBackDateClean("2026-02-31")).toThrow(
      /Look-back Date must be a date in YYYY-MM-DD format/,
    );
    expect(() => lookBackDateClean(new Date("2026-01-01"))).toThrow(
      /Look-back Date/,
    );
    expect(() => lookBackDateClean(20260101)).toThrow(/Look-back Date/);
  });
  test("rejects a future date", () => {
    expect(() => lookBackDateClean("2026-06-11")).toThrow(
      /Look-back Date cannot be a future date/,
    );
  });
});
describe("pollChangesTrigger perform", () => {
  type PerformArgs = Parameters<typeof pollChangesTrigger.perform>;
  let store: PollingState | null;
  let get: ReturnType<typeof vi.fn>;
  const firstPollAt = "2026-06-10T00:00:00.000Z";
  const secondPollAt = "2026-06-11T00:00:00.000Z";
  const seed = "2026-01-01T00:00:00.000Z";
  const payload = defaultTriggerPayload() as PerformArgs[1];
  const poll = async (...args: PerformArgs) =>
    (await pollChangesTrigger.perform(...args)) as
      | {
          payload: PerformArgs[1];
          polledNoChanges?: boolean;
        }
      | undefined;
  const context = () =>
    ({
      polling: {
        getState: () => store,
        setState: (next: PollingState) => {
          store = next;
        },
      },
      debug: { enabled: false },
      logger: { debug: vi.fn() },
    }) as unknown as PerformArgs[0];
  const params = {
    connection: {} as never,
    pollResourceType: "deals",
    lookBackDate: "",
    showNewRecords: true,
    showUpdatedRecords: true,
  } as PerformArgs[2];
  const dealRecord = listDealsExamplePayload.data.items[0]
    .data as ZendeskSellRecord;
  const record = (
    id: number,
    created_at: string,
    updated_at: string,
  ): ZendeskSellRecord => ({ ...dealRecord, id, created_at, updated_at });
  const page = (
    records: ZendeskSellRecord[],
    nextPage: string | null = null,
  ) => ({
    data: {
      ...listDealsExamplePayload.data,
      items: records.map((data) => ({ data, meta: { type: "deal" } })),
      meta: {
        ...listDealsExamplePayload.data.meta,
        links: {
          ...listDealsExamplePayload.data.meta.links,
          next_page: nextPage,
        },
      },
    },
  });
  beforeEach(() => {
    store = null;
    get = vi.fn();
    getZendeskClient.mockReset();
    getZendeskClient.mockReturnValue({ get });
    vi.useFakeTimers({ toFake: ["Date"] });
    vi.setSystemTime(new Date(firstPollAt));
  });
  afterEach(() => vi.useRealTimers());
  test("without a Look-back Date the first poll only sets the baseline, and the next poll starts from it", async () => {
    get.mockResolvedValueOnce(page([dealRecord]));
    const first = await poll(context(), payload, params);
    expect(first?.payload.body).toEqual({ data: { created: [], updated: [] } });
    expect(first?.polledNoChanges).toBe(true);
    expect(store).toEqual({ lastPolledAt: firstPollAt });
    vi.setSystemTime(new Date(secondPollAt));
    const before = record(1, "2026-06-09T23:59:59Z", "2026-06-09T23:59:59Z");
    const after = record(2, "2026-06-10T00:00:01Z", "2026-06-10T00:00:01Z");
    get.mockResolvedValueOnce(page([before, after]));
    const second = await poll(context(), payload, params);
    expect(second?.payload.body).toEqual({
      data: { created: [after], updated: [] },
    });
    expect(second?.polledNoChanges).toBe(false);
    expect(store).toEqual({ lastPolledAt: secondPollAt });
  });
  test("a first poll with a Look-back Date starts 1 ms before the seed and ignores the toggles", async () => {
    const onSeed = record(3, seed, seed);
    const updatedOnSeed = record(4, "2025-12-31T23:59:59.998Z", seed);
    const beforeWindow = record(
      5,
      "2025-12-31T23:59:59.999Z",
      "2025-12-31T23:59:59.999Z",
    );
    get.mockResolvedValueOnce(page([onSeed, updatedOnSeed, beforeWindow]));
    const result = await poll(context(), payload, {
      ...params,
      lookBackDate: seed,
      showNewRecords: false,
      showUpdatedRecords: false,
    });
    expect(result?.payload.body).toEqual({
      data: { created: [onSeed], updated: [updatedOnSeed] },
    });
    expect(result?.polledNoChanges).toBe(false);
    expect(store).toEqual({ lastPolledAt: firstPollAt });
  });
  test("later polls ignore the Look-back Date once state exists", async () => {
    store = { lastPolledAt: "2026-06-01T00:00:00.000Z" };
    const old = record(6, "2026-02-01T00:00:00Z", "2026-02-01T00:00:00Z");
    get.mockResolvedValueOnce(page([old]));
    const result = await poll(context(), payload, {
      ...params,
      lookBackDate: seed,
    });
    expect(result?.payload.body).toEqual({
      data: { created: [], updated: [] },
    });
    expect(result?.polledNoChanges).toBe(true);
  });
  test("rejects an unsupported resource type before calling the API or advancing state", async () => {
    await expect(
      poll(context(), payload, { ...params, pollResourceType: "accounts" }),
    ).rejects.toThrow("Unsupported resource type: accounts");
    expect(get).not.toHaveBeenCalled();
    expect(store).toBeNull();
  });
  describe("created/updated windowing against lastPolledAt", () => {
    const cursor = "2026-06-01T00:00:00.000Z";
    const createdAfter = record(
      10,
      "2026-06-02T00:00:00Z",
      "2026-06-03T00:00:00Z",
    );
    const updatedOnly = record(11, cursor, "2026-06-02T00:00:00Z");
    const unchanged = record(12, "2026-05-01T00:00:00Z", cursor);
    beforeEach(() => {
      store = { lastPolledAt: cursor };
      get.mockResolvedValueOnce(page([createdAfter, updatedOnly, unchanged]));
    });
    test("splits records into created or updated, never both, and excludes unchanged ones", async () => {
      const result = await poll(context(), payload, params);
      expect(result?.payload.body).toEqual({
        data: { created: [createdAfter], updated: [updatedOnly] },
      });
      expect(result?.polledNoChanges).toBe(false);
      expect(store).toEqual({ lastPolledAt: firstPollAt });
    });
    test("Show New Records off empties the created bucket", async () => {
      const result = await poll(context(), payload, {
        ...params,
        showNewRecords: false,
      });
      expect(result?.payload.body).toEqual({
        data: { created: [], updated: [updatedOnly] },
      });
    });
    test("Show Updated Records off empties the updated bucket", async () => {
      const result = await poll(context(), payload, {
        ...params,
        showUpdatedRecords: false,
      });
      expect(result?.payload.body).toEqual({
        data: { created: [createdAfter], updated: [] },
      });
    });
    test("both toggles off reports no changes and still advances the cursor", async () => {
      const result = await poll(context(), payload, {
        ...params,
        showNewRecords: false,
        showUpdatedRecords: false,
      });
      expect(result?.polledNoChanges).toBe(true);
      expect(store).toEqual({ lastPolledAt: firstPollAt });
    });
  });
  test("follows meta.links.next_page with page and per_page=100 until it is null", async () => {
    store = { lastPolledAt: "2026-06-01T00:00:00.000Z" };
    const a = record(20, "2026-06-02T00:00:00Z", "2026-06-02T00:00:00Z");
    const b = record(21, "2026-06-03T00:00:00Z", "2026-06-03T00:00:00Z");
    get
      .mockResolvedValueOnce(
        page([a], "https://api.getbase.com/v2/deals?page=2&per_page=100"),
      )
      .mockResolvedValueOnce(page([b]));
    const result = await poll(context(), payload, params);
    expect(getZendeskClient).toHaveBeenCalledWith(params.connection, false);
    expect(get).toHaveBeenCalledTimes(2);
    const request = (pageNumber: number) => [
      "/deals",
      {
        params: { page: pageNumber, per_page: 100 },
        headers: { Accept: "application/json" },
      },
    ];
    expect(get.mock.calls[0]).toEqual(request(1));
    expect(get.mock.calls[1]).toEqual(request(2));
    expect(result?.payload.body).toEqual({
      data: { created: [a, b], updated: [] },
    });
  });
});
