import type { ActionContext } from "@prismatic-io/spectral";
import { invokeTrigger } from "@prismatic-io/spectral/dist/testing";
import type { XeroRecord } from "../types";
import { pollChangesTrigger } from "./pollChangesTrigger";
const mockFetchAllRecords = vi.fn();
vi.mock("../client", () => ({
  getXeroClient: vi.fn().mockResolvedValue({}),
}));
vi.mock("../util", async (importOriginal) => {
  const actual = await importOriginal<typeof import("../util")>();
  return {
    ...actual,
    fetchAllRecords: (...args: unknown[]) => mockFetchAllRecords(...args),
  };
});
const createContext = (seedState: Record<string, unknown> | null = null) => {
  let state = seedState;
  return {
    currentState: () => state,
    context: {
      polling: {
        getState: () => state,
        setState: (newState: Record<string, unknown>) => {
          state = newState;
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
        created: XeroRecord[];
        updated: XeroRecord[];
      };
    };
  };
  polledNoChanges: boolean;
}
const poll = async (
  context: Partial<ActionContext>,
  overrides: Record<string, unknown> = {},
): Promise<PollResult> => {
  const { result } = await invokeTrigger(triggerUnderTest, context, undefined, {
    xeroConnection: {},
    resourceType: "accounts",
    showNewRecords: true,
    showUpdatedRecords: true,
    lookBackDate: "",
    ...overrides,
  } as Record<string, unknown>);
  return result as unknown as PollResult;
};
describe("pollChangesTrigger", () => {
  afterEach(() => {
    mockFetchAllRecords.mockReset();
  });
  test("initial sync ignores the visibility filters", async () => {
    const { context, currentState } = createContext();
    mockFetchAllRecords.mockResolvedValueOnce([
      { AccountID: "a1" },
      { AccountID: "a2" },
    ]);
    const result = await poll(context, {
      lookBackDate: "2026-01-01",
      showNewRecords: false,
      showUpdatedRecords: false,
    });
    expect(result.payload.body.data.created).toHaveLength(2);
    expect(result.polledNoChanges).toBe(false);
    expect(currentState()?.knownIds).toEqual(["a1", "a2"]);
  });
  test("later recurrences still apply the visibility filters", async () => {
    const { context } = createContext({
      lastPolledAt: "2026-01-01T00:00:00.000Z",
      knownIds: ["a1"],
    });
    mockFetchAllRecords.mockResolvedValueOnce([
      { AccountID: "a1" },
      { AccountID: "a2" },
    ]);
    const result = await poll(context, {
      lookBackDate: "2026-01-01",
      showNewRecords: false,
    });
    expect(result.payload.body.data.created).toEqual([]);
    expect(result.payload.body.data.updated).toEqual([{ AccountID: "a1" }]);
  });
  test("first recurrence without a Look-back Date seeds IDs and emits nothing", async () => {
    const { context, currentState } = createContext();
    mockFetchAllRecords.mockResolvedValueOnce([{ AccountID: "a1" }]);
    const result = await poll(context);
    expect(result.payload.body.data).toEqual({ created: [], updated: [] });
    expect(result.polledNoChanges).toBe(true);
    expect(currentState()?.knownIds).toEqual(["a1"]);
  });
});
