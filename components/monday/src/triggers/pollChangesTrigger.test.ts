import type { ActionContext } from "@prismatic-io/spectral";
import { invokeTrigger } from "@prismatic-io/spectral/dist/testing";
import { afterEach, describe, expect, test, vi } from "vitest";
import type { MondayItem } from "../types";
import { partitionItemsByTimestamp } from "../util/fetchItemsSince";
import { resolvePollingRecordChanges } from "../util/resolvePollingRecordChanges";
const mockFetchAllItemsSince = vi.fn<() => Promise<MondayItem[]>>();
vi.mock("../client", () => ({
  getMondayClient: vi.fn().mockReturnValue({}),
}));
vi.mock("../util", async () => {
  const inputsClean = await vi.importActual<
    typeof import("../util/inputsClean")
  >("../util/inputsClean");
  return {
    ...inputsClean,
    partitionItemsByTimestamp,
    resolvePollingRecordChanges,
    fetchAllItemsSince: () => mockFetchAllItemsSince(),
  };
});
import { pollChangesTrigger } from "./pollChangesTrigger";
const NOW = "2026-06-01T12:00:00.000Z";
const SEEDED_CURSOR = "2026-05-01T00:00:00.000Z";
interface PollingStore {
  currentState: () => Record<string, unknown>;
  context: Partial<ActionContext>;
}
const createPollingStore = (
  seedState: Record<string, unknown> = {},
): PollingStore => {
  let state: Record<string, unknown> = seedState;
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
const freezeClockAt = (iso: string): void => {
  vi.useFakeTimers({ toFake: ["Date"] });
  vi.setSystemTime(new Date(iso));
};
const triggerUnderTest = {
  perform: pollChangesTrigger.perform,
} as unknown as Parameters<typeof invokeTrigger>[0];
interface PollChanges {
  created: MondayItem[];
  updated: MondayItem[];
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
      connection: {},
      boardId: "board-123",
      showNewRecords: true,
      showUpdatedRecords: true,
      lookBackDate: undefined,
      ...overrides,
    } as Record<string, unknown>,
  );
  return result as unknown as PollResult;
};
const makeItem = (
  id: string,
  createdAt: string,
  updatedAt: string,
): MondayItem =>
  ({
    id,
    name: `Item ${id}`,
    created_at: createdAt,
    updated_at: updatedAt,
  }) as unknown as MondayItem;
describe("pollChangesTrigger initial sync ignores visibility toggles", () => {
  afterEach(() => {
    vi.useRealTimers();
    mockFetchAllItemsSince.mockReset();
  });
  test("initial sync seeds all records despite toggles=false", async () => {
    const store = createPollingStore();
    freezeClockAt(NOW);
    mockFetchAllItemsSince.mockResolvedValueOnce([
      makeItem("item_new", "2026-05-15T00:00:00Z", "2026-05-15T00:00:00Z"),
      makeItem("item_upd", "2026-04-01T00:00:00Z", "2026-05-20T00:00:00Z"),
    ]);
    const result = await poll(store, {
      showNewRecords: false,
      showUpdatedRecords: false,
      lookBackDate: "2026-04-01",
    });
    const total =
      result.payload.body.data.created.length +
      result.payload.body.data.updated.length;
    expect(total).toBeGreaterThan(0);
    expect(result.polledNoChanges).toBe(false);
  });
  test("steady-state respects toggles after initial sync", async () => {
    const store = createPollingStore({ lastPolledAt: SEEDED_CURSOR });
    freezeClockAt(NOW);
    mockFetchAllItemsSince.mockResolvedValueOnce([
      makeItem("item_new", "2026-05-15T00:00:00Z", "2026-05-15T00:00:00Z"),
      makeItem("item_upd", "2026-04-01T00:00:00Z", "2026-05-20T00:00:00Z"),
    ]);
    const result = await poll(store, {
      showNewRecords: false,
      showUpdatedRecords: false,
    });
    expect(result.payload.body.data.created).toEqual([]);
    expect(result.payload.body.data.updated).toEqual([]);
    expect(result.polledNoChanges).toBe(true);
  });
});
