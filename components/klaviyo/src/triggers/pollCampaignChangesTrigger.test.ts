import type { ActionContext } from "@prismatic-io/spectral";
import { invokeTrigger } from "@prismatic-io/spectral/dist/testing";
import { afterEach, describe, expect, test, vi } from "vitest";
import { pollCampaignChangesTrigger } from "./pollCampaignChangesTrigger";

const mockFetchCampaignRecords =
  vi.fn<() => Promise<Record<string, unknown>[]>>();

vi.mock("../util", async (importOriginal) => {
  const actual = await importOriginal<typeof import("../util")>();
  return {
    ...actual,
    fetchCampaignRecords: () => mockFetchCampaignRecords(),
  };
});

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
  perform: pollCampaignChangesTrigger.perform,
} as unknown as Parameters<typeof invokeTrigger>[0];

interface PollResult {
  payload: { body: { data: { created: unknown[]; updated: unknown[] } } };
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
      pollMessageChannel: "email",
      showNewRecords: true,
      showUpdatedRecords: true,
      lookBackDate: undefined,
      ...overrides,
    } as Record<string, unknown>,
  );
  return result as unknown as PollResult;
};

const makeCampaign = (id: string, createdAt: string, updatedAt: string) => ({
  id,
  attributes: {
    name: `Campaign ${id}`,
    createdAt,
    updatedAt,
  },
});

describe("pollCampaignChangesTrigger initial sync ignores visibility toggles", () => {
  afterEach(() => {
    vi.useRealTimers();
    mockFetchCampaignRecords.mockReset();
  });

  test("initial sync seeds all records despite toggles=false", async () => {
    const store = createPollingStore();

    freezeClockAt(NOW);
    mockFetchCampaignRecords.mockResolvedValueOnce([
      makeCampaign("c1", "2026-05-15T00:00:00Z", "2026-05-15T00:00:00Z"),
      makeCampaign("c2", "2026-04-01T00:00:00Z", "2026-05-20T00:00:00Z"),
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

    const result = await poll(store, {
      showNewRecords: false,
      showUpdatedRecords: false,
    });

    expect(result.payload.body.data.created).toEqual([]);
    expect(result.payload.body.data.updated).toEqual([]);
    expect(result.polledNoChanges).toBe(true);
  });
});
