import { defaultTriggerPayload } from "@prismatic-io/spectral/dist/testing";
import type { PollingState, Sage200Record } from "../types";
import { lookBackDateClean, resolveSage200RecordChanges } from "../util";
import { pollChangesTrigger } from "./pollChangesTrigger";
const { getClient } = vi.hoisted(() => ({ getClient: vi.fn() }));
vi.mock("../client", () => ({ getClient }));
const created: Sage200Record = {
  id: 101,
  date_time_created: "2026-06-01T12:00:00Z",
  date_time_updated: "2026-06-01T12:00:00Z",
};
const updated: Sage200Record = {
  id: 102,
  date_time_created: "2020-01-01T00:00:00Z",
  date_time_updated: "2026-06-01T12:00:00Z",
};
describe("pollChangesTrigger batching declaration", () => {
  test("New and Updated Records is opt-in batchable with a default batch size", () => {
    expect(pollChangesTrigger.triggerResolverSupport).toBe("valid");
    expect(pollChangesTrigger.batchConfig).toEqual({ batchSize: 50 });
    expect(pollChangesTrigger.triggerResolver?.resolveItems).toBeInstanceOf(
      Function,
    );
  });
  test("offers the Look-back Date directly below the required inputs", () => {
    expect(Object.keys(pollChangesTrigger.inputs ?? {})).toEqual([
      "connection",
      "site",
      "company",
      "pollResourceType",
      "lookBackDate",
      "showNewRecords",
      "showUpdatedRecords",
    ]);
  });
});
describe("resolveSage200RecordChanges", () => {
  test("tags every record with how it changed", () => {
    expect(
      resolveSage200RecordChanges({ created: [created], updated: [updated] }),
    ).toEqual([
      { changeType: "created", record: created },
      { changeType: "updated", record: updated },
    ]);
  });
  test("returns [] for empty or undefined changes", () => {
    expect(resolveSage200RecordChanges({ created: [], updated: [] })).toEqual(
      [],
    );
    expect(resolveSage200RecordChanges(undefined)).toEqual([]);
  });
});
describe("triggerResolver.resolveItems", () => {
  test("flattens the payload shape perform actually returns", () => {
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
});
describe("lookBackDateClean", () => {
  test("treats empty input as no backfill", () => {
    expect(lookBackDateClean(undefined)).toBe("");
    expect(lookBackDateClean("  ")).toBe("");
  });
  test("normalizes a date to the start of that day in UTC", () => {
    expect(lookBackDateClean("2026-01-01")).toBe("2026-01-01T00:00:00.000Z");
  });
  test("rejects a malformed, non-calendar, or future date", () => {
    expect(() => lookBackDateClean("01/01/2026")).toThrow(/Look-back Date/);
    expect(() => lookBackDateClean("2026-02-31")).toThrow(/Look-back Date/);
    expect(() => lookBackDateClean("2999-01-01")).toThrow(
      /Look-back Date cannot be a future date/,
    );
  });
});
describe("pollChangesTrigger perform", () => {
  type PerformArgs = Parameters<typeof pollChangesTrigger.perform>;
  let store: PollingState | undefined;
  let get: ReturnType<typeof vi.fn>;
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
    site: "site-1",
    company: "1",
    pollResourceType: "customers",
    lookBackDate: "",
    showNewRecords: true,
    showUpdatedRecords: true,
  } as PerformArgs[2];
  const seed = "2026-01-01T00:00:00.000Z";
  const payload = defaultTriggerPayload();
  const reply = (...records: Sage200Record[]) =>
    get.mockResolvedValue({ data: records });
  beforeEach(() => {
    store = undefined;
    get = vi.fn();
    getClient.mockReturnValue({ get });
  });
  test("seeds the server filter from the Look-back Date, inclusive of the seed instant", async () => {
    reply();
    await pollChangesTrigger.perform(context(), payload, {
      ...params,
      lookBackDate: seed,
    });
    expect(get.mock.calls[0][1].params).toEqual({
      $filter: "date_time_updated gt 2025-12-31T23:59:59.999Z",
    });
  });
  test("an initial sync ignores the visibility toggles and counts the seed instant as new", async () => {
    const onSeed: Sage200Record = {
      id: 103,
      date_time_created: seed,
      date_time_updated: seed,
    };
    reply(onSeed, updated);
    const result = await pollChangesTrigger.perform(context(), payload, {
      ...params,
      lookBackDate: seed,
      showNewRecords: false,
      showUpdatedRecords: false,
    });
    expect(result?.payload.body).toEqual({
      data: { created: [onSeed], updated: [updated] },
    });
    expect(result?.polledNoChanges).toBe(false);
    expect(store?.lastPolledAt).toBeDefined();
    expect(store?.lastPolledAt).not.toBe(seed);
  });
  test("later recurrences ignore the Look-back Date and honor the toggles", async () => {
    store = { lastPolledAt: "2026-05-01T00:00:00.000Z" };
    reply(created, updated);
    const result = await pollChangesTrigger.perform(context(), payload, {
      ...params,
      lookBackDate: seed,
      showNewRecords: false,
    });
    expect(get.mock.calls[0][1].params.$filter).toBe(
      "date_time_updated gt 2026-05-01T00:00:00.000Z",
    );
    expect(result?.payload.body).toEqual({
      data: { created: [], updated: [updated] },
    });
  });
  test("without a Look-back Date the first recurrence only establishes the baseline", async () => {
    reply(created);
    const result = await pollChangesTrigger.perform(context(), payload, params);
    expect(result?.polledNoChanges).toBe(true);
    expect(store?.lastPolledAt).toBeDefined();
  });
  describe("cursor across sequential polls", () => {
    beforeEach(() => vi.useFakeTimers({ toFake: ["Date"] }));
    afterEach(() => vi.useRealTimers());
    test("advances the cursor to each poll instant and never re-emits a record at or before it", async () => {
      const firstPollAt = "2026-06-02T00:00:00.000Z";
      const secondPollAt = "2026-06-03T00:00:00.000Z";
      vi.setSystemTime(new Date(firstPollAt));
      reply(created, updated);
      const first = await pollChangesTrigger.perform(context(), payload, {
        ...params,
        lookBackDate: seed,
      });
      expect(first?.payload.body).toEqual({
        data: { created: [created], updated: [updated] },
      });
      expect(store).toEqual({ lastPolledAt: firstPollAt });
      vi.setSystemTime(new Date(secondPollAt));
      const onCursor: Sage200Record = {
        id: 104,
        date_time_created: "2020-01-01T00:00:00Z",
        date_time_updated: firstPollAt,
      };
      reply(created, updated, onCursor);
      const second = await pollChangesTrigger.perform(context(), payload, {
        ...params,
        lookBackDate: seed,
      });
      expect(get.mock.calls[1][1].params).toEqual({
        $filter: `date_time_updated gt ${firstPollAt}`,
      });
      expect(second?.payload.body).toEqual({
        data: { created: [], updated: [] },
      });
      expect(second?.polledNoChanges).toBe(true);
      expect(store).toEqual({ lastPolledAt: secondPollAt });
    });
  });
});
