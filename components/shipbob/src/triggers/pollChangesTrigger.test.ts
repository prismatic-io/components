import { defaultTriggerPayload } from "@prismatic-io/spectral/dist/testing";
import type { PollingState, ShipbobOrder } from "../types/polling";
import { lookBackDateClean, resolveShipbobOrderChanges } from "../util";
import { pollChangesTrigger } from "./pollChangesTrigger";
const { createClient } = vi.hoisted(() => ({ createClient: vi.fn() }));
vi.mock("../client", () => ({ createClient }));
const created: ShipbobOrder = {
  id: 101,
  created_date: "2026-06-01T12:00:00Z",
};
const updated: ShipbobOrder = {
  id: 102,
  created_date: "2020-01-01T00:00:00Z",
};
describe("pollChangesTrigger batching declaration", () => {
  test("New and Updated Orders is opt-in batchable with a default batch size", () => {
    expect(pollChangesTrigger.triggerResolverSupport).toBe("valid");
    expect(pollChangesTrigger.batchConfig).toEqual({ batchSize: 50 });
    expect(pollChangesTrigger.triggerResolver?.resolveItems).toBeInstanceOf(
      Function,
    );
  });
  test("offers the Look-back Date directly below the required inputs", () => {
    expect(Object.keys(pollChangesTrigger.inputs ?? {})).toEqual([
      "connectionInput",
      "version",
      "lookBackDate",
      "showNewRecords",
      "showUpdatedRecords",
    ]);
  });
});
describe("resolveShipbobOrderChanges", () => {
  test("tags every order with how it changed", () => {
    expect(
      resolveShipbobOrderChanges({ created: [created], updated: [updated] }),
    ).toEqual([
      { changeType: "created", record: created },
      { changeType: "updated", record: updated },
    ]);
  });
  test("returns [] for empty or undefined changes", () => {
    expect(resolveShipbobOrderChanges({ created: [], updated: [] })).toEqual(
      [],
    );
    expect(resolveShipbobOrderChanges(undefined)).toEqual([]);
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
    connectionInput: {},
    version: "1.0",
    lookBackDate: "",
    showNewRecords: true,
    showUpdatedRecords: true,
  };
  const seed = "2026-01-01T00:00:00.000Z";
  const payload = defaultTriggerPayload();
  const run = (overrides: Partial<typeof params> = {}) =>
    pollChangesTrigger.perform(context(), payload, {
      ...params,
      ...overrides,
    } as unknown as PerformArgs[2]);
  const reply = (...orders: ShipbobOrder[]) =>
    get.mockResolvedValue({ data: orders, headers: { "total-pages": "1" } });
  beforeEach(() => {
    store = undefined;
    get = vi.fn();
    createClient.mockReturnValue({ get });
  });
  test("seeds the server filter from the Look-back Date day", async () => {
    reply();
    await run({
      lookBackDate: seed,
    });
    expect(get.mock.calls[0][1].params).toEqual({
      LastUpdateStartDate: "2026-01-01",
      Page: 1,
      Limit: 250,
    });
  });
  test("an initial sync ignores the visibility toggles and counts the seed instant as new", async () => {
    const onSeed: ShipbobOrder = { id: 103, created_date: seed };
    reply(onSeed, updated);
    const result = await run({
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
    store = { lastPolledAt: "2026-05-01T08:00:00.000Z" };
    reply(created, updated);
    const result = await run({
      lookBackDate: seed,
      showNewRecords: false,
    });
    expect(get.mock.calls[0][1].params.LastUpdateStartDate).toBe("2026-05-01");
    expect(result?.payload.body).toEqual({
      data: { created: [], updated: [updated] },
    });
  });
  test("without a Look-back Date the first recurrence only establishes the baseline", async () => {
    reply(created);
    const result = await run();
    expect(get).not.toHaveBeenCalled();
    expect(result?.polledNoChanges).toBe(true);
    expect(store?.lastPolledAt).toBeDefined();
  });
  describe("across recurrences sharing one polling store", () => {
    const at = (iso: string) => vi.setSystemTime(new Date(iso));
    beforeEach(() => {
      vi.useFakeTimers({ toFake: ["Date"] });
    });
    afterEach(() => {
      vi.useRealTimers();
    });
    test("an order emitted as new is re-detected only as updated on the next poll", async () => {
      const order: ShipbobOrder = {
        id: 201,
        created_date: "2026-06-01T09:00:00Z",
      };
      store = { lastPolledAt: "2026-06-01T08:00:00.000Z" };
      at("2026-06-01T10:00:00.000Z");
      reply(order);
      const first = await run();
      expect(first?.payload.body).toEqual({
        data: { created: [order], updated: [] },
      });
      expect(store?.lastPolledAt).toBe("2026-06-01T10:00:00.000Z");
      at("2026-06-01T11:00:00.000Z");
      reply(order);
      const second = await run();
      expect(get.mock.calls[1][1].params.LastUpdateStartDate).toBe(
        "2026-06-01",
      );
      expect(second?.payload.body).toEqual({
        data: { created: [], updated: [order] },
      });
      expect(store?.lastPolledAt).toBe("2026-06-01T11:00:00.000Z");
      at("2026-06-01T12:00:00.000Z");
      reply(order);
      const third = await run();
      expect(third?.payload.body).toEqual({
        data: { created: [], updated: [order] },
      });
      expect(third?.polledNoChanges).toBe(false);
    });
    test("an order created on the cursor's day but before the cursor instant is updated, not new", async () => {
      const earlierSameDay: ShipbobOrder = {
        id: 202,
        created_date: "2026-06-01T07:00:00Z",
      };
      store = { lastPolledAt: "2026-06-01T08:00:00.000Z" };
      at("2026-06-01T10:00:00.000Z");
      reply(earlierSameDay);
      const result = await run();
      expect(get.mock.calls[0][1].params.LastUpdateStartDate).toBe(
        "2026-06-01",
      );
      expect(result?.payload.body).toEqual({
        data: { created: [], updated: [earlierSameDay] },
      });
    });
  });
});
