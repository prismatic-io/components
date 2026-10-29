import { invokeTrigger } from "@prismatic-io/spectral/dist/testing";
import type { BigCommerceOrder, PollingState } from "../types";
import { pollChangesTrigger } from "./pollChangesTrigger";
vi.mock("../client", () => ({
  createAuthorizedClient: vi.fn().mockResolvedValue({}),
}));
const mockFetchAllOrders = vi.fn<() => Promise<BigCommerceOrder[]>>();
vi.mock("../util", async (importOriginal) => {
  const actual = await importOriginal<typeof import("../util")>();
  return {
    ...actual,
    fetchAllOrdersModifiedSince: (...args: unknown[]) =>
      mockFetchAllOrders(...(args as [])),
  };
});
const POLL_ONE_AT = "2026-06-01T12:00:00.000Z";
const POLL_TWO_AT = "2026-06-01T13:00:00.000Z";
const SEEDED_CURSOR = "2026-05-01T00:00:00.000Z";
interface PollingStore {
  context: Record<string, unknown>;
  currentState: () => PollingState | undefined;
  writes: PollingState[];
}
const createPollingStore = (seed?: PollingState): PollingStore => {
  let state: PollingState | undefined = seed ? { ...seed } : undefined;
  const writes: PollingState[] = [];
  const context = {
    polling: {
      getState: () => state,
      setState: (next: Record<string, unknown>) => {
        state = next as unknown as PollingState;
        writes.push({ ...state });
      },
    },
    debug: { enabled: false },
    logger: { debug: vi.fn() },
  };
  return {
    context: context as any,
    currentState: () => state,
    writes,
  };
};
const makeOrder = (
  id: number,
  dateCreated: string,
  dateModified: string,
): BigCommerceOrder =>
  ({
    id,
    date_created: dateCreated,
    date_modified: dateModified,
  }) as unknown as BigCommerceOrder;
interface PollChanges {
  created: BigCommerceOrder[];
  updated: BigCommerceOrder[];
}
interface PollResult {
  payload: {
    body: {
      data: PollChanges;
    };
  };
  polledNoChanges: boolean;
}
const changesOf = (result: PollResult): PollChanges => result.payload.body.data;
const triggerUnderTest = {
  perform: pollChangesTrigger.perform,
} as unknown as Parameters<typeof invokeTrigger>[0];
const poll = async (
  store: PollingStore,
  overrides: Partial<{
    showNewOrders: boolean;
    showUpdatedOrders: boolean;
    lookBackDate: string;
  }> = {},
): Promise<PollResult> => {
  const { result } = await invokeTrigger(
    triggerUnderTest,
    store.context,
    undefined,
    {
      bigCommerceConnection: {},
      storeHash: "test-store",
      showNewOrders: true,
      showUpdatedOrders: true,
      lookBackDate: undefined,
      ...overrides,
    } as any,
  );
  return result as unknown as PollResult;
};
const freezeClockAt = (iso: string): void => {
  vi.useFakeTimers({ toFake: ["Date"] });
  vi.setSystemTime(new Date(iso));
};
describe("pollChangesTrigger", () => {
  afterEach(() => {
    vi.useRealTimers();
    mockFetchAllOrders.mockReset();
  });
  describe("cursor advance", () => {
    test("advances the cursor across consecutive polls and partitions orders correctly", async () => {
      const orderOld = makeOrder(
        1,
        "2026-05-15T00:00:00.000Z",
        "2026-05-15T00:00:00.000Z",
      );
      const orderNew = makeOrder(
        2,
        "2026-06-01T12:30:00.000Z",
        "2026-06-01T12:30:00.000Z",
      );
      const store = createPollingStore({ lastPolledAt: SEEDED_CURSOR });
      freezeClockAt(POLL_ONE_AT);
      mockFetchAllOrders.mockResolvedValueOnce([orderOld]);
      const resultOne = await poll(store);
      expect(changesOf(resultOne).created).toEqual([orderOld]);
      expect(resultOne.polledNoChanges).toBe(false);
      expect(store.currentState()).toEqual({ lastPolledAt: POLL_ONE_AT });
      freezeClockAt(POLL_TWO_AT);
      mockFetchAllOrders.mockResolvedValueOnce([orderOld, orderNew]);
      const resultTwo = await poll(store);
      expect(changesOf(resultTwo).created).toEqual([orderNew]);
      expect(store.currentState()).toEqual({ lastPolledAt: POLL_TWO_AT });
      expect(store.writes).toEqual([
        { lastPolledAt: POLL_ONE_AT },
        { lastPolledAt: POLL_TWO_AT },
      ]);
    });
  });
  describe("partitioning", () => {
    test("splits orders into created and updated based on timestamps relative to the cursor", async () => {
      const store = createPollingStore({ lastPolledAt: SEEDED_CURSOR });
      freezeClockAt(POLL_ONE_AT);
      mockFetchAllOrders.mockResolvedValueOnce([
        makeOrder(10, "2026-05-15T00:00:00.000Z", "2026-05-15T00:00:00.000Z"),
        makeOrder(20, "2026-04-01T00:00:00.000Z", "2026-05-20T00:00:00.000Z"),
        makeOrder(30, "2026-05-16T00:00:00.000Z", "2026-05-21T00:00:00.000Z"),
        makeOrder(40, "2026-04-01T00:00:00.000Z", "2026-04-02T00:00:00.000Z"),
      ]);
      const result = await poll(store);
      const changes = changesOf(result);
      expect(changes.created.map((o) => o.id)).toEqual([10, 30]);
      expect(changes.updated.map((o) => o.id)).toEqual([20, 40]);
      expect(result.polledNoChanges).toBe(false);
    });
  });
  describe("cold first poll", () => {
    test("seeds the cursor to now and emits nothing when no state and no lookBackDate exist", async () => {
      const store = createPollingStore();
      freezeClockAt(POLL_ONE_AT);
      mockFetchAllOrders.mockResolvedValueOnce([]);
      const result = await poll(store);
      expect(changesOf(result).created).toEqual([]);
      expect(changesOf(result).updated).toEqual([]);
      expect(result.polledNoChanges).toBe(true);
      expect(store.currentState()).toEqual({ lastPolledAt: POLL_ONE_AT });
    });
    test("uses lookBackDate as the cursor when there is no prior state", async () => {
      const lookBack = "2026-04-01";
      const store = createPollingStore();
      freezeClockAt(POLL_ONE_AT);
      mockFetchAllOrders.mockResolvedValueOnce([
        makeOrder(1, "2026-05-15T00:00:00.000Z", "2026-05-15T00:00:00.000Z"),
      ]);
      const result = await poll(store, { lookBackDate: lookBack });
      expect(mockFetchAllOrders).toHaveBeenCalledWith(
        expect.anything(),
        "test-store",
        "2026-04-01T00:00:00.000Z",
      );
      expect(changesOf(result).created).toEqual([
        makeOrder(1, "2026-05-15T00:00:00.000Z", "2026-05-15T00:00:00.000Z"),
      ]);
      expect(result.polledNoChanges).toBe(false);
      expect(store.currentState()).toEqual({ lastPolledAt: POLL_ONE_AT });
    });
  });
  describe("polledNoChanges", () => {
    test("returns polledNoChanges: true when the fetch returns no orders", async () => {
      const store = createPollingStore({ lastPolledAt: SEEDED_CURSOR });
      freezeClockAt(POLL_ONE_AT);
      mockFetchAllOrders.mockResolvedValueOnce([]);
      const result = await poll(store);
      expect(changesOf(result).created).toEqual([]);
      expect(changesOf(result).updated).toEqual([]);
      expect(result.polledNoChanges).toBe(true);
      expect(store.currentState()).toEqual({ lastPolledAt: POLL_ONE_AT });
    });
    test("returns orders in updated when date_created is before the cursor", async () => {
      const store = createPollingStore({ lastPolledAt: SEEDED_CURSOR });
      freezeClockAt(POLL_ONE_AT);
      const order = makeOrder(
        1,
        "2026-04-01T00:00:00.000Z",
        "2026-04-02T00:00:00.000Z",
      );
      mockFetchAllOrders.mockResolvedValueOnce([order]);
      const result = await poll(store);
      expect(changesOf(result).created).toEqual([]);
      expect(changesOf(result).updated).toEqual([order]);
      expect(result.polledNoChanges).toBe(false);
    });
  });
  describe("showNewOrders / showUpdatedOrders toggles", () => {
    test("suppresses created orders when showNewOrders is false", async () => {
      const store = createPollingStore({ lastPolledAt: SEEDED_CURSOR });
      freezeClockAt(POLL_ONE_AT);
      mockFetchAllOrders.mockResolvedValueOnce([
        makeOrder(1, "2026-05-15T00:00:00.000Z", "2026-05-15T00:00:00.000Z"),
      ]);
      const result = await poll(store, { showNewOrders: false });
      expect(changesOf(result).created).toEqual([]);
      expect(result.polledNoChanges).toBe(true);
    });
    test("suppresses updated orders when showUpdatedOrders is false", async () => {
      const store = createPollingStore({ lastPolledAt: SEEDED_CURSOR });
      freezeClockAt(POLL_ONE_AT);
      mockFetchAllOrders.mockResolvedValueOnce([
        makeOrder(1, "2026-04-01T00:00:00.000Z", "2026-05-20T00:00:00.000Z"),
      ]);
      const result = await poll(store, { showUpdatedOrders: false });
      expect(changesOf(result).updated).toEqual([]);
      expect(result.polledNoChanges).toBe(true);
    });
    test("suppresses both when both toggles are false", async () => {
      const store = createPollingStore({ lastPolledAt: SEEDED_CURSOR });
      freezeClockAt(POLL_ONE_AT);
      mockFetchAllOrders.mockResolvedValueOnce([
        makeOrder(1, "2026-05-15T00:00:00.000Z", "2026-05-15T00:00:00.000Z"),
        makeOrder(2, "2026-04-01T00:00:00.000Z", "2026-05-20T00:00:00.000Z"),
      ]);
      const result = await poll(store, {
        showNewOrders: false,
        showUpdatedOrders: false,
      });
      expect(changesOf(result).created).toEqual([]);
      expect(changesOf(result).updated).toEqual([]);
      expect(result.polledNoChanges).toBe(true);
      expect(store.currentState()).toEqual({ lastPolledAt: POLL_ONE_AT });
    });
  });
  describe("initial sync ignores visibility toggles", () => {
    test("initial sync seeds all records despite toggles=false", async () => {
      const store = createPollingStore();
      freezeClockAt(POLL_ONE_AT);
      mockFetchAllOrders.mockResolvedValueOnce([
        makeOrder(1, "2026-05-15T00:00:00.000Z", "2026-05-15T00:00:00.000Z"),
        makeOrder(2, "2026-04-20T00:00:00.000Z", "2026-05-20T00:00:00.000Z"),
      ]);
      const result = await poll(store, {
        showNewOrders: false,
        showUpdatedOrders: false,
        lookBackDate: "2026-04-01T00:00:00.000Z",
      });
      const total =
        changesOf(result).created.length + changesOf(result).updated.length;
      expect(total).toBeGreaterThan(0);
      expect(result.polledNoChanges).toBe(false);
    });
    test("steady-state respects toggles after initial sync", async () => {
      const store = createPollingStore({ lastPolledAt: SEEDED_CURSOR });
      freezeClockAt(POLL_ONE_AT);
      mockFetchAllOrders.mockResolvedValueOnce([
        makeOrder(1, "2026-05-15T00:00:00.000Z", "2026-05-15T00:00:00.000Z"),
        makeOrder(2, "2026-04-20T00:00:00.000Z", "2026-05-20T00:00:00.000Z"),
      ]);
      const result = await poll(store, {
        showNewOrders: false,
        showUpdatedOrders: false,
      });
      expect(changesOf(result).created).toEqual([]);
      expect(changesOf(result).updated).toEqual([]);
      expect(result.polledNoChanges).toBe(true);
    });
  });
  describe("state precedence", () => {
    test("ignores lookBackDate when prior poll state exists", async () => {
      const store = createPollingStore({
        lastPolledAt: "2026-05-20T00:00:00.000Z",
      });
      freezeClockAt(POLL_ONE_AT);
      mockFetchAllOrders.mockResolvedValueOnce([
        makeOrder(99, "2026-05-10T00:00:00.000Z", "2026-05-10T00:00:00.000Z"),
        makeOrder(100, "2026-05-25T00:00:00.000Z", "2026-05-25T00:00:00.000Z"),
      ]);
      const result = await poll(store, {
        lookBackDate: "2026-01-01T00:00:00.000Z",
      });
      expect(mockFetchAllOrders).toHaveBeenCalledWith(
        expect.anything(),
        "test-store",
        "2026-05-20T00:00:00.000Z",
      );
      expect(changesOf(result).created.map((o) => o.id)).toEqual([100]);
    });
  });
});
