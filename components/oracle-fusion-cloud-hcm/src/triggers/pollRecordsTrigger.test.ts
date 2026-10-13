import type { ActionContext } from "@prismatic-io/spectral";
import { invokeTrigger } from "@prismatic-io/spectral/dist/testing";
import { pollRecordsTrigger } from "./pollRecordsTrigger";
const mockGet = vi.fn();
vi.mock("../client", () => ({
  createClient: vi
    .fn()
    .mockReturnValue({ get: (...args: unknown[]) => mockGet(...args) }),
}));
vi.mock("../util", async (importOriginal) => {
  const actual = await importOriginal<typeof import("../util")>();
  return {
    ...actual,
    fetchRecordsSince: async (
      _client: unknown,
      endpoint: string,
      since: string,
      pageSize: number,
    ) => {
      const { data } = await mockGet(endpoint, {
        params: { q: `LastUpdateDate>="${since}"`, offset: 0, limit: pageSize },
      });
      return data.items ?? [];
    },
  };
});
const POLL_ONE_AT = "2026-06-01T12:00:00.000Z";
const POLL_TWO_AT = "2026-06-01T13:00:00.000Z";
const SEEDED_CURSOR = "2026-05-01T00:00:00.000Z";
interface PollingStore {
  currentState: () => Record<string, unknown>;
  writes: Record<string, unknown>[];
  context: Partial<ActionContext>;
}
const createPollingStore = (
  seedState: Record<string, unknown> = {},
): PollingStore => {
  let state: Record<string, unknown> = seedState;
  const writes: Record<string, unknown>[] = [];
  return {
    currentState: () => state,
    writes,
    context: {
      polling: {
        getState: () => state,
        setState: (newState: Record<string, unknown>) => {
          state = newState;
          writes.push(newState);
        },
        invokeAction: () => {
          throw new Error("not stubbed");
        },
      },
      debug: { enabled: false },
      logger: { debug: vi.fn() },
    } as unknown as Partial<ActionContext>,
  };
};
const freezeClockAt = (iso: string): void => {
  vi.useFakeTimers({ toFake: ["Date"] });
  vi.setSystemTime(new Date(iso));
};
const triggerUnderTest = {
  perform: pollRecordsTrigger.perform,
} as unknown as Parameters<typeof invokeTrigger>[0];
interface PollResult {
  payload: {
    body: {
      data: {
        records: Record<string, unknown>[];
        resourceType: string;
      };
    };
  };
  polledNoChanges: boolean;
}
const poll = async (
  store: PollingStore,
  resourceType = "Workers",
  lookBackDate?: string,
): Promise<PollResult> => {
  const { result } = await invokeTrigger(
    triggerUnderTest,
    store.context,
    undefined,
    {
      connection: {},
      resourceType,
      pageSize: 500,
      lookBackDate: lookBackDate ?? undefined,
    } as Record<string, unknown>,
  );
  return result as unknown as PollResult;
};
describe("pollRecordsTrigger", () => {
  afterEach(() => {
    vi.useRealTimers();
    mockGet.mockReset();
  });
  test("advances cursor and returns records", async () => {
    const store = createPollingStore({ lastPolledAt: SEEDED_CURSOR });
    freezeClockAt(POLL_ONE_AT);
    mockGet.mockResolvedValueOnce({
      data: { items: [{ WorkerId: "w1" }], hasMore: false },
    });
    const r1 = await poll(store);
    expect(r1.payload.body.data.records).toEqual([{ WorkerId: "w1" }]);
    expect(r1.payload.body.data.resourceType).toBe("Workers");
    expect(r1.polledNoChanges).toBe(false);
    expect(store.currentState()).toEqual({ lastPolledAt: POLL_ONE_AT });
    freezeClockAt(POLL_TWO_AT);
    mockGet.mockResolvedValueOnce({
      data: { items: [], hasMore: false },
    });
    const r2 = await poll(store);
    expect(r2.polledNoChanges).toBe(true);
    expect(store.currentState()).toEqual({ lastPolledAt: POLL_TWO_AT });
  });
  test("cold first poll seeds cursor to now", async () => {
    const store = createPollingStore();
    freezeClockAt(POLL_ONE_AT);
    mockGet.mockResolvedValueOnce({
      data: { items: [], hasMore: false },
    });
    const result = await poll(store);
    expect(result.polledNoChanges).toBe(true);
    expect(store.currentState()).toEqual({ lastPolledAt: POLL_ONE_AT });
  });
  test("throws for unknown resource type", async () => {
    const store = createPollingStore();
    freezeClockAt(POLL_ONE_AT);
    await expect(poll(store, "InvalidResource")).rejects.toThrow(
      "Unknown resource type: InvalidResource",
    );
    expect(store.writes).toEqual([]);
  });
  test("uses lookBackDate as initial cursor when no prior state exists", async () => {
    const store = createPollingStore();
    freezeClockAt(POLL_ONE_AT);
    mockGet.mockResolvedValueOnce({
      data: { items: [{ WorkerId: "w1" }], hasMore: false },
    });
    const result = await poll(store, "Workers", "2026-04-01T00:00:00.000Z");
    expect(result.polledNoChanges).toBe(false);
    expect(store.currentState()).toEqual({ lastPolledAt: POLL_ONE_AT });
  });
});
