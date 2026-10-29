import type { ActionContext } from "@prismatic-io/spectral";
import { invokeTrigger } from "@prismatic-io/spectral/dist/testing";
import type { SageHRRecord } from "../types";
import { pollChangesTrigger } from "./pollChangesTrigger";

const mockFetchAllRecords = vi.fn<() => Promise<SageHRRecord[]>>();

vi.mock("../client", () => ({
  createClient: vi.fn().mockReturnValue({}),
}));

vi.mock("../util", async (importOriginal) => {
  const actual = await importOriginal<typeof import("../util")>();
  return {
    ...actual,
    fetchAllRecords: () => mockFetchAllRecords(),
  };
});

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

const triggerUnderTest = {
  perform: pollChangesTrigger.perform,
} as unknown as Parameters<typeof invokeTrigger>[0];

interface PollResult {
  payload: { body: { data: { created: SageHRRecord[]; updated: unknown[] } } };
  polledNoChanges: boolean;
}

const poll = async (
  store: PollingStore,
  overrides: Partial<{
    pollResourceType: string;
    showNewRecords: boolean;
  }> = {},
): Promise<PollResult> => {
  const { result } = await invokeTrigger(
    triggerUnderTest,
    store.context,
    undefined,
    {
      connectionInput: {},
      pollResourceType: "employees",
      showNewRecords: true,
      ...overrides,
    } as never,
  );
  return result as unknown as PollResult;
};

describe("pollChangesTrigger", () => {
  afterEach(() => {
    mockFetchAllRecords.mockReset();
  });

  test("first poll seeds knownIds and returns empty results", async () => {
    const store = createPollingStore();
    mockFetchAllRecords.mockResolvedValueOnce([
      { id: 1, name: "Alice" },
      { id: 2, name: "Bob" },
    ]);

    const result = await poll(store);

    expect(result.payload.body.data.created).toEqual([]);
    expect(result.polledNoChanges).toBe(true);
    expect(store.currentState()).toEqual({ knownIds: ["1", "2"] });
  });

  test("second poll detects new records not in knownIds", async () => {
    const store = createPollingStore({ knownIds: ["1"] });
    mockFetchAllRecords.mockResolvedValueOnce([
      { id: 1, name: "Alice" },
      { id: 2, name: "Bob" },
    ]);

    const result = await poll(store);

    expect(result.payload.body.data.created.map((r) => r.id)).toEqual([2]);
    expect(result.polledNoChanges).toBe(false);
    expect(store.currentState()).toEqual({ knownIds: ["1", "2"] });
  });

  test("showNewRecords=false suppresses output but updates knownIds", async () => {
    const store = createPollingStore({ knownIds: ["1"] });
    mockFetchAllRecords.mockResolvedValueOnce([
      { id: 1, name: "Alice" },
      { id: 2, name: "Bob" },
    ]);

    const result = await poll(store, { showNewRecords: false });

    expect(result.payload.body.data.created).toEqual([]);
    expect(result.polledNoChanges).toBe(true);
    expect(store.currentState()).toEqual({ knownIds: ["1", "2"] });
  });

  test("throws for unknown resource type", async () => {
    const store = createPollingStore();

    await expect(poll(store, { pollResourceType: "invalid" })).rejects.toThrow(
      "Unknown resource type: invalid",
    );
  });

  test("polledNoChanges when no new records detected", async () => {
    const store = createPollingStore({ knownIds: ["1", "2"] });
    mockFetchAllRecords.mockResolvedValueOnce([
      { id: 1, name: "Alice" },
      { id: 2, name: "Bob" },
    ]);

    const result = await poll(store);
    expect(result.polledNoChanges).toBe(true);
  });
});
