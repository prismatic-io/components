import { defaultTriggerPayload } from "@prismatic-io/spectral/dist/testing";
import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";
import { createClient } from "../client";
import type { AmazonRecord, PollingState } from "../types";
import {
  fetchPollingChanges,
  lookBackDateClean,
  resolvePollingRecordChanges,
} from "../util";
import { pollChangesTrigger } from "./pollChangesTrigger";
vi.mock("../client", () => ({ createClient: vi.fn() }));
const NOW = new Date("2026-03-01T12:00:00.000Z");
const created: AmazonRecord = {
  AmazonOrderId: "111-1",
  PurchaseDate: "2026-02-20T00:00:00Z",
};
const updated: AmazonRecord = {
  AmazonOrderId: "111-2",
  PurchaseDate: "2025-12-01T00:00:00Z",
};
describe("batching declaration", () => {
  test("New and Updated Records is opt-in batchable with a default batch size", () => {
    expect(pollChangesTrigger.triggerResolverSupport).toBe("valid");
    expect(pollChangesTrigger.batchConfig).toEqual({ batchSize: 50 });
    expect(pollChangesTrigger.triggerResolver?.resolveItems).toBeInstanceOf(
      Function,
    );
  });
  test("resolvePollingRecordChanges tags every record with how it changed", () => {
    expect(
      resolvePollingRecordChanges({ created: [created], updated: [updated] }),
    ).toEqual([
      { changeType: "created", record: created },
      { changeType: "updated", record: updated },
    ]);
  });
  test("resolvePollingRecordChanges returns [] for empty or undefined changes", () => {
    expect(resolvePollingRecordChanges({})).toEqual([]);
    expect(resolvePollingRecordChanges({ created: [], updated: [] })).toEqual(
      [],
    );
    expect(resolvePollingRecordChanges(undefined)).toEqual([]);
  });
  test("resolvePollingRecordChanges tolerates an absent array", () => {
    expect(resolvePollingRecordChanges({ created: [created] })).toEqual([
      { changeType: "created", record: created },
    ]);
    expect(resolvePollingRecordChanges({ updated: [updated] })).toEqual([
      { changeType: "updated", record: updated },
    ]);
  });
  test("resolveItems flattens the payload shape perform actually returns", () => {
    const payload = {
      ...defaultTriggerPayload(),
      body: { data: { created: [created], updated: [] } },
    };
    expect(
      pollChangesTrigger.triggerResolver?.resolveItems?.({} as never, {
        payload,
      }),
    ).toEqual([{ changeType: "created", record: created }]);
  });
});
describe("lookBackDateClean", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(NOW);
  });
  afterEach(() => {
    vi.useRealTimers();
  });
  test("returns an empty string for empty values", () => {
    expect(lookBackDateClean(undefined)).toBe("");
    expect(lookBackDateClean(null)).toBe("");
    expect(lookBackDateClean("  ")).toBe("");
  });
  test("returns the date as an ISO string", () => {
    expect(lookBackDateClean("2026-01-01")).toBe("2026-01-01T00:00:00.000Z");
  });
  test("rejects a wrong format, a non-calendar date, and a future date", () => {
    expect(() => lookBackDateClean("01/01/2026")).toThrow(/YYYY-MM-DD/);
    expect(() => lookBackDateClean("2026-02-31")).toThrow(/YYYY-MM-DD/);
    expect(() => lookBackDateClean("2026-03-02")).toThrow(/future/);
  });
});
describe("perform initial sync seed", () => {
  const get = vi.fn();
  let store: PollingState | undefined;
  beforeEach(() => {
    vi.useFakeTimers({ toFake: ["Date"] });
    vi.setSystemTime(NOW);
    store = undefined;
    get.mockReset();
    vi.mocked(createClient).mockReturnValue({ get } as never);
  });
  afterEach(() => {
    vi.useRealTimers();
  });
  const poll = async (params: {
    resourceType?: string;
    lookBackDate?: string;
    showNewRecords?: boolean;
    showUpdatedRecords?: boolean;
  }) => {
    const context = {
      debug: { enabled: false },
      logger: { debug: vi.fn() },
      polling: {
        getState: () => store,
        setState: (next: PollingState) => {
          store = next;
        },
      },
    };
    const result = await pollChangesTrigger.perform(
      context as never,
      defaultTriggerPayload(),
      {
        connection: {} as never,
        resourceType: "orders",
        marketplaceIds: "ATVPDKIKX0DER",
        showNewRecords: true,
        showUpdatedRecords: true,
        lookBackDate: "",
        ...params,
      } as never,
    );
    return result.payload.body.data as {
      created: AmazonRecord[];
      updated: AmazonRecord[];
    };
  };
  const ordersParams = (lastUpdatedAfter: string) => ({
    params: {
      LastUpdatedAfter: lastUpdatedAfter,
      MarketplaceIds: "ATVPDKIKX0DER",
      NextToken: undefined,
    },
  });
  test("orders without a Look-back Date start the window at now", async () => {
    get.mockResolvedValue({ data: { payload: { Orders: [] } } });
    await poll({});
    expect(get).toHaveBeenCalledWith(
      "/orders/v0/orders",
      ordersParams(NOW.toISOString()),
    );
    expect(store?.lastPolledAt).toBe(NOW.toISOString());
  });
  test("a Look-back Date seeds the first orders window and ignores both visibility filters", async () => {
    get.mockResolvedValue({
      data: { payload: { Orders: [created, updated] } },
    });
    const data = await poll({
      lookBackDate: "2026-01-01T00:00:00.000Z",
      showNewRecords: false,
      showUpdatedRecords: false,
    });
    expect(get).toHaveBeenCalledWith(
      "/orders/v0/orders",
      ordersParams("2026-01-01T00:00:00.000Z"),
    );
    expect(data.created).toEqual([created]);
    expect(data.updated).toEqual([updated]);
    expect(store?.lastPolledAt).toBe(NOW.toISOString());
  });
  test("a Look-back Date seeds the first feeds window as createdSince", async () => {
    const feed = { feedId: "1", createdTime: "2026-02-01T00:00:00Z" };
    get.mockResolvedValue({ data: { feeds: [feed] } });
    const data = await poll({
      resourceType: "feeds",
      lookBackDate: "2026-01-01T00:00:00.000Z",
      showNewRecords: false,
    });
    expect(get).toHaveBeenCalledWith("/feeds/2021-06-30/feeds", {
      params: {
        createdSince: "2026-01-01T00:00:00.000Z",
        nextToken: undefined,
      },
    });
    expect(data.created).toEqual([feed]);
  });
  test("once a cursor exists the Look-back Date is ignored and the visibility filters apply", async () => {
    store = { lastPolledAt: "2026-02-01T00:00:00.000Z" };
    get.mockResolvedValue({
      data: { payload: { Orders: [created, updated] } },
    });
    const data = await poll({
      lookBackDate: "2020-01-01T00:00:00.000Z",
      showNewRecords: false,
    });
    expect(get).toHaveBeenCalledWith(
      "/orders/v0/orders",
      ordersParams("2026-02-01T00:00:00.000Z"),
    );
    expect(data.created).toEqual([]);
    expect(data.updated).toEqual([updated]);
  });
});
describe("fetchPollingChanges", () => {
  const get = vi.fn();
  const client = { get } as never;
  beforeEach(() => {
    get.mockReset();
  });
  test("splits orders by PurchaseDate against the window start", async () => {
    get.mockResolvedValue({
      data: { payload: { Orders: [created, updated] } },
    });
    const changes = await fetchPollingChanges(
      client,
      "orders",
      "2026-01-01T00:00:00.000Z",
      "ATVPDKIKX0DER",
    );
    expect(changes).toEqual({ created: [created], updated: [updated] });
  });
  test("treats an order without a PurchaseDate as updated", async () => {
    const noDate = { AmazonOrderId: "111-3" };
    get.mockResolvedValue({ data: { payload: { Orders: [noDate] } } });
    const changes = await fetchPollingChanges(
      client,
      "orders",
      "2026-01-01T00:00:00.000Z",
      undefined,
    );
    expect(changes).toEqual({ created: [], updated: [noDate] });
  });
  test("follows the NextToken nested under payload across order pages", async () => {
    get
      .mockResolvedValueOnce({
        data: { payload: { Orders: [created], NextToken: "page-2" } },
      })
      .mockResolvedValueOnce({ data: { payload: { Orders: [updated] } } });
    const changes = await fetchPollingChanges(
      client,
      "orders",
      "2026-01-01T00:00:00.000Z",
      "ATVPDKIKX0DER",
    );
    expect(get).toHaveBeenCalledTimes(2);
    expect(get).toHaveBeenLastCalledWith("/orders/v0/orders", {
      params: {
        LastUpdatedAfter: "2026-01-01T00:00:00.000Z",
        MarketplaceIds: "ATVPDKIKX0DER",
        NextToken: "page-2",
      },
    });
    expect(changes).toEqual({ created: [created], updated: [updated] });
  });
  test("returns every feed as created", async () => {
    const feed = { feedId: "1", createdTime: "2026-02-01T00:00:00Z" };
    get.mockResolvedValue({ data: { feeds: [feed] } });
    const changes = await fetchPollingChanges(
      client,
      "feeds",
      "2026-01-01T00:00:00.000Z",
      "ATVPDKIKX0DER",
    );
    expect(changes).toEqual({ created: [feed], updated: [] });
  });
});
describe("input order", () => {
  test("Look-back Date leads the optional tier, directly below the required inputs", () => {
    const inputs = pollChangesTrigger.inputs as unknown;
    const keys = Array.isArray(inputs)
      ? inputs.map((i: { key: string }) => i.key)
      : Object.keys(inputs as object);
    expect(keys.slice(0, 6)).toEqual([
      "connection",
      "resourceType",
      "marketplaceIds",
      "showNewRecords",
      "showUpdatedRecords",
      "lookBackDate",
    ]);
  });
});
