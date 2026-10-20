import type { ActionContext } from "@prismatic-io/spectral";
import { invokeTrigger } from "@prismatic-io/spectral/dist/testing";
import type { SDPRecord } from "../types";
import { pollChangesTrigger } from "./pollChangesTrigger";
const mockPaginateData = vi.fn();
vi.mock("../client", () => ({
  createClient: vi.fn().mockReturnValue({}),
}));
vi.mock("../util", async (importOriginal) => {
  const actual = await importOriginal<typeof import("../util")>();
  return {
    ...actual,
    paginateData: (...args: unknown[]) => mockPaginateData(...args),
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
  payload: {
    body: {
      data: {
        created: SDPRecord[];
        updated: unknown[];
      };
    };
  };
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
      pollResourceType: "requests",
      showNewRecords: true,
      ...overrides,
    } as Record<string, unknown>,
  );
  return result as unknown as PollResult;
};
describe("pollChangesTrigger", () => {
  afterEach(() => {
    mockPaginateData.mockReset();
  });
  test("first poll seeds knownIds and returns empty results", async () => {
    const store = createPollingStore();
    mockPaginateData.mockResolvedValueOnce({
      requests: [{ id: "1" }, { id: "2" }],
    });
    const result = await poll(store);
    expect(result.payload.body.data.created).toEqual([]);
    expect(result.polledNoChanges).toBe(true);
    expect(store.currentState()).toEqual({ knownIds: ["1", "2"] });
  });
  test("second poll detects new records not in knownIds", async () => {
    const store = createPollingStore({ knownIds: ["1"] });
    mockPaginateData.mockResolvedValueOnce({
      requests: [{ id: "1" }, { id: "2" }],
    });
    const result = await poll(store);
    expect(result.payload.body.data.created.map((r) => r.id)).toEqual(["2"]);
    expect(result.polledNoChanges).toBe(false);
    expect(store.currentState()).toEqual({ knownIds: ["1", "2"] });
  });
  test("showNewRecords=false suppresses output but updates knownIds", async () => {
    const store = createPollingStore({ knownIds: ["1"] });
    mockPaginateData.mockResolvedValueOnce({
      requests: [{ id: "1" }, { id: "2" }],
    });
    const result = await poll(store, { showNewRecords: false });
    expect(result.payload.body.data.created).toEqual([]);
    expect(result.polledNoChanges).toBe(true);
    expect(store.currentState()).toEqual({ knownIds: ["1", "2"] });
  });
  test("polledNoChanges when no new records detected", async () => {
    const store = createPollingStore({ knownIds: ["1", "2"] });
    mockPaginateData.mockResolvedValueOnce({
      requests: [{ id: "1" }, { id: "2" }],
    });
    const result = await poll(store);
    expect(result.polledNoChanges).toBe(true);
  });
});
