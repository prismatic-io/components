import type { ActionContext } from "@prismatic-io/spectral";
import { invokeTrigger } from "@prismatic-io/spectral/dist/testing";
import type { QlikRecord } from "../types";
import { pollChangesTrigger } from "./pollChangesTrigger";

const mockFetchAllSince = vi.fn<() => Promise<QlikRecord[]>>();

vi.mock("../client", () => ({
  createClient: vi.fn().mockReturnValue({}),
}));

vi.mock("../util", async (importOriginal) => {
  const actual = await importOriginal<typeof import("../util")>();
  return {
    ...actual,
    fetchAllSince: () => mockFetchAllSince(),
    filterByTimestamp: (
      records: QlikRecord[],
      config: { createdField: string; updatedField: string },
      lastPolledAt: string,
    ) => {
      const lastPolledDate = new Date(lastPolledAt);
      const created: QlikRecord[] = [];
      const updated: QlikRecord[] = [];
      for (const record of records) {
        const createdAt = record[config.createdField] as string | undefined;
        const updatedAt = record[config.updatedField] as string | undefined;
        if (createdAt && new Date(createdAt) > lastPolledDate) {
          created.push(record);
        } else if (updatedAt && new Date(updatedAt) > lastPolledDate) {
          updated.push(record);
        }
      }
      return { created, updated };
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
  perform: pollChangesTrigger.perform,
} as unknown as Parameters<typeof invokeTrigger>[0];

interface PollChanges {
  created: QlikRecord[];
  updated: QlikRecord[];
}
interface PollResult {
  payload: { body: { data: PollChanges } };
  polledNoChanges: boolean;
}

const poll = async (
  store: PollingStore,
  overrides: Partial<{
    pollResourceType: string;
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
      pollResourceType: "spaces",
      showNewRecords: true,
      showUpdatedRecords: true,
      lookBackDate: undefined,
      ...overrides,
    } as never,
  );
  return result as unknown as PollResult;
};

describe("pollChangesTrigger", () => {
  afterEach(() => {
    vi.useRealTimers();
    mockFetchAllSince.mockReset();
  });

  test("cold first poll without lookBackDate seeds cursor and emits nothing", async () => {
    const store = createPollingStore();
    freezeClockAt(POLL_ONE_AT);
    mockFetchAllSince.mockResolvedValueOnce([]);

    const result = await poll(store);

    expect(result.payload.body.data.created).toEqual([]);
    expect(result.polledNoChanges).toBe(true);
    expect(store.currentState()).toEqual({ lastPolledAt: POLL_ONE_AT });
  });

  test("first poll with lookBackDate seeds from that date and fetches records", async () => {
    const store = createPollingStore();
    freezeClockAt(POLL_ONE_AT);
    mockFetchAllSince.mockResolvedValueOnce([
      {
        id: "s1",
        createdAt: "2026-05-15T00:00:00Z",
        updatedAt: "2026-05-15T00:00:00Z",
      },
    ]);

    const result = await poll(store, { lookBackDate: "2026-04-01" });
    expect(result.polledNoChanges).toBe(false);
    expect(store.currentState()).toEqual({ lastPolledAt: POLL_ONE_AT });
  });

  test("advances cursor across consecutive polls", async () => {
    const store = createPollingStore({ lastPolledAt: SEEDED_CURSOR });

    freezeClockAt(POLL_ONE_AT);
    mockFetchAllSince.mockResolvedValueOnce([
      {
        id: "s1",
        createdAt: "2026-05-15T00:00:00Z",
        updatedAt: "2026-05-15T00:00:00Z",
      },
    ]);

    const r1 = await poll(store);
    expect(r1.polledNoChanges).toBe(false);
    expect(store.currentState()).toEqual({ lastPolledAt: POLL_ONE_AT });

    freezeClockAt(POLL_TWO_AT);
    mockFetchAllSince.mockResolvedValueOnce([]);

    const r2 = await poll(store);
    expect(r2.polledNoChanges).toBe(true);
    expect(store.currentState()).toEqual({ lastPolledAt: POLL_TWO_AT });
  });

  test("throws for unsupported resource type", async () => {
    const store = createPollingStore();
    freezeClockAt(POLL_ONE_AT);

    await expect(poll(store, { pollResourceType: "invalid" })).rejects.toThrow(
      "Unsupported resource type: invalid",
    );
  });

  test("initial sync with lookBackDate bypasses toggle suppression", async () => {
    const store = createPollingStore();
    freezeClockAt(POLL_ONE_AT);
    mockFetchAllSince.mockResolvedValueOnce([
      {
        id: "s1",
        createdAt: "2026-05-15T00:00:00Z",
        updatedAt: "2026-05-15T00:00:00Z",
      },
      {
        id: "s2",
        createdAt: "2026-03-01T00:00:00Z",
        updatedAt: "2026-05-20T00:00:00Z",
      },
    ]);

    const result = await poll(store, {
      lookBackDate: "2026-04-01",
      showNewRecords: false,
      showUpdatedRecords: false,
    });

    expect(result.payload.body.data.created.map((r) => r.id)).toEqual(["s1"]);
    expect(result.payload.body.data.updated.map((r) => r.id)).toEqual(["s2"]);
    expect(result.polledNoChanges).toBe(false);
  });

  test("subsequent poll respects toggle suppression after initial sync", async () => {
    const store = createPollingStore({ lastPolledAt: SEEDED_CURSOR });
    freezeClockAt(POLL_ONE_AT);
    mockFetchAllSince.mockResolvedValueOnce([
      {
        id: "s1",
        createdAt: "2026-05-15T00:00:00Z",
        updatedAt: "2026-05-15T00:00:00Z",
      },
    ]);

    const result = await poll(store, {
      showNewRecords: false,
      showUpdatedRecords: false,
    });

    expect(result.polledNoChanges).toBe(true);
  });

  test("toggle suppression hides results but still advances cursor", async () => {
    const store = createPollingStore({ lastPolledAt: SEEDED_CURSOR });
    freezeClockAt(POLL_ONE_AT);
    mockFetchAllSince.mockResolvedValueOnce([
      {
        id: "s1",
        createdAt: "2026-05-15T00:00:00Z",
        updatedAt: "2026-05-15T00:00:00Z",
      },
    ]);

    const result = await poll(store, {
      showNewRecords: false,
      showUpdatedRecords: false,
    });
    expect(result.polledNoChanges).toBe(true);
    expect(store.currentState()).toEqual({ lastPolledAt: POLL_ONE_AT });
  });
});
