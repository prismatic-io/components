import type { ActionContext } from "@prismatic-io/spectral";
import { invokeTrigger } from "@prismatic-io/spectral/dist/testing";
import type { AlgoliaIndex } from "../types";
import { pollChangesTrigger } from "./pollChangesTrigger";
const mockFetchAllIndices = vi.fn<() => Promise<AlgoliaIndex[]>>();
vi.mock("../client", () => ({
  createAlgoliaClient: vi.fn().mockReturnValue({}),
}));
vi.mock("../util", async (importOriginal) => {
  const actual = await importOriginal<typeof import("../util")>();
  return {
    ...actual,
    fetchAllIndices: () => mockFetchAllIndices(),
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
  perform: pollChangesTrigger.perform,
} as unknown as Parameters<typeof invokeTrigger>[0];
interface PollChanges {
  created: AlgoliaIndex[];
  updated: AlgoliaIndex[];
}
interface PollResult {
  payload: {
    body: {
      data: PollChanges;
    };
  };
  polledNoChanges: boolean;
}
const poll = async (
  store: PollingStore,
  overrides: Partial<{
    showNewRecords: boolean;
    showUpdatedRecords: boolean;
    lookBackDate: string;
  }> = {},
): Promise<PollResult> => {
  const { result } = await invokeTrigger(
    triggerUnderTest,
    store.context,
    undefined,
    {
      algoliaConnection: {},
      showNewRecords: true,
      showUpdatedRecords: true,
      lookBackDate: undefined,
      ...overrides,
    } as Record<string, unknown>,
  );
  return result as unknown as PollResult;
};
const makeIndex = (
  name: string,
  createdAt: string,
  updatedAt: string,
): AlgoliaIndex =>
  ({
    name,
    createdAt,
    updatedAt,
    entries: 0,
    dataSize: 0,
    fileSize: 0,
  }) as AlgoliaIndex;
describe("pollChangesTrigger", () => {
  afterEach(() => {
    vi.useRealTimers();
    mockFetchAllIndices.mockReset();
  });
  test("advances the cursor across consecutive polls", async () => {
    const idx1 = makeIndex(
      "products",
      "2026-05-15T00:00:00Z",
      "2026-05-15T00:00:00Z",
    );
    const idx2 = makeIndex(
      "users",
      "2026-06-01T12:30:00Z",
      "2026-06-01T12:30:00Z",
    );
    const store = createPollingStore({ lastPolledAt: SEEDED_CURSOR });
    freezeClockAt(POLL_ONE_AT);
    mockFetchAllIndices.mockResolvedValueOnce([idx1]);
    const r1 = await poll(store);
    expect(r1.payload.body.data.created.map((i) => i.name)).toEqual([
      "products",
    ]);
    expect(r1.polledNoChanges).toBe(false);
    expect(store.currentState()).toEqual({ lastPolledAt: POLL_ONE_AT });
    freezeClockAt(POLL_TWO_AT);
    mockFetchAllIndices.mockResolvedValueOnce([idx1, idx2]);
    const r2 = await poll(store);
    expect(r2.payload.body.data.created.map((i) => i.name)).toEqual(["users"]);
    expect(store.currentState()).toEqual({ lastPolledAt: POLL_TWO_AT });
  });
  test("splits indices into created and updated based on timestamps", async () => {
    const store = createPollingStore({ lastPolledAt: SEEDED_CURSOR });
    freezeClockAt(POLL_ONE_AT);
    mockFetchAllIndices.mockResolvedValueOnce([
      makeIndex("new_idx", "2026-05-15T00:00:00Z", "2026-05-15T00:00:00Z"),
      makeIndex("updated_idx", "2026-04-01T00:00:00Z", "2026-05-20T00:00:00Z"),
      makeIndex("both_idx", "2026-05-16T00:00:00Z", "2026-05-21T00:00:00Z"),
      makeIndex("stale_idx", "2026-04-01T00:00:00Z", "2026-04-02T00:00:00Z"),
    ]);
    const result = await poll(store);
    const changes = result.payload.body.data;
    expect(changes.created.map((i) => i.name)).toEqual(["new_idx", "both_idx"]);
    expect(changes.updated.map((i) => i.name)).toEqual(["updated_idx"]);
    expect(result.polledNoChanges).toBe(false);
  });
  test("cold first poll with no state and no lookBackDate seeds cursor and emits nothing", async () => {
    const store = createPollingStore();
    freezeClockAt(POLL_ONE_AT);
    mockFetchAllIndices.mockResolvedValueOnce([
      makeIndex("old", "2026-05-15T00:00:00Z", "2026-05-15T00:00:00Z"),
    ]);
    const result = await poll(store);
    expect(result.payload.body.data.created).toEqual([]);
    expect(result.payload.body.data.updated).toEqual([]);
    expect(result.polledNoChanges).toBe(true);
    expect(store.currentState()).toEqual({ lastPolledAt: POLL_ONE_AT });
  });
  test("reports polledNoChanges when no records returned", async () => {
    const store = createPollingStore({ lastPolledAt: SEEDED_CURSOR });
    freezeClockAt(POLL_ONE_AT);
    mockFetchAllIndices.mockResolvedValueOnce([]);
    const result = await poll(store);
    expect(result.polledNoChanges).toBe(true);
    expect(store.currentState()).toEqual({ lastPolledAt: POLL_ONE_AT });
  });
  test("respects showNewRecords and showUpdatedRecords toggles", async () => {
    const store = createPollingStore({ lastPolledAt: SEEDED_CURSOR });
    freezeClockAt(POLL_ONE_AT);
    mockFetchAllIndices.mockResolvedValueOnce([
      makeIndex("new_one", "2026-05-15T00:00:00Z", "2026-05-15T00:00:00Z"),
      makeIndex("updated_one", "2026-04-01T00:00:00Z", "2026-05-20T00:00:00Z"),
    ]);
    const result = await poll(store, {
      showNewRecords: false,
      showUpdatedRecords: false,
    });
    expect(result.payload.body.data.created).toEqual([]);
    expect(result.payload.body.data.updated).toEqual([]);
    expect(result.polledNoChanges).toBe(true);
    expect(store.currentState()).toEqual({ lastPolledAt: POLL_ONE_AT });
  });
});
