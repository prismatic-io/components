import type { ActionContext } from "@prismatic-io/spectral";
import { invokeTrigger } from "@prismatic-io/spectral/dist/testing";
import type { GuruCard } from "../types";
import { pollChangesTrigger } from "./pollChangesTrigger";

const mockFetchGuruResults = vi.fn<() => Promise<GuruCard[]>>();

vi.mock("../client", () => ({
  getGuruClient: vi.fn().mockReturnValue({}),
}));

vi.mock("../util", async (importOriginal) => {
  const actual = await importOriginal<typeof import("../util")>();
  return {
    ...actual,
    fetchGuruResults: () => mockFetchGuruResults(),
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
  created: GuruCard[];
  updated: GuruCard[];
}
interface PollResult {
  payload: { body: { data: PollChanges } };
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
      showNewRecords: true,
      showUpdatedRecords: true,
      lookBackDate: undefined,
      ...overrides,
    } as Record<string, unknown>,
  );
  return result as unknown as PollResult;
};

const makeCard = (
  id: string,
  dateCreated: string,
  lastModified: string,
): GuruCard => ({
  id,
  preferredPhrase: `Card ${id}`,
  dateCreated,
  lastModified,
});

describe("pollChangesTrigger", () => {
  afterEach(() => {
    vi.useRealTimers();
    mockFetchGuruResults.mockReset();
  });

  test("cold first poll without lookBackDate seeds cursor and emits nothing", async () => {
    const store = createPollingStore();
    freezeClockAt(POLL_ONE_AT);
    mockFetchGuruResults.mockResolvedValueOnce([]);

    const result = await poll(store);

    expect(result.payload.body.data.created).toEqual([]);
    expect(result.payload.body.data.updated).toEqual([]);
    expect(result.polledNoChanges).toBe(true);
    expect(store.currentState()).toEqual({ lastPolledAt: POLL_ONE_AT });
  });

  test("first poll with lookBackDate seeds cursor and fetches records", async () => {
    const store = createPollingStore();
    freezeClockAt(POLL_ONE_AT);

    mockFetchGuruResults.mockResolvedValueOnce([
      makeCard("c1", "2026-04-15T00:00:00Z", "2026-04-20T00:00:00Z"),
    ]);

    const result = await poll(store, { lookBackDate: "2026-04-01" });

    expect(result.payload.body.data.created.map((c) => c.id)).toEqual(["c1"]);
    expect(result.polledNoChanges).toBe(false);
    expect(store.currentState()).toEqual({ lastPolledAt: POLL_ONE_AT });
  });

  test("advances cursor across consecutive polls and splits created/updated", async () => {
    const store = createPollingStore({ lastPolledAt: SEEDED_CURSOR });

    freezeClockAt(POLL_ONE_AT);
    mockFetchGuruResults.mockResolvedValueOnce([
      makeCard("c1", "2026-05-15T00:00:00Z", "2026-05-15T00:00:00Z"),
    ]);

    const r1 = await poll(store);
    expect(r1.payload.body.data.created.map((c) => c.id)).toEqual(["c1"]);
    expect(store.currentState()).toEqual({ lastPolledAt: POLL_ONE_AT });

    freezeClockAt(POLL_TWO_AT);
    mockFetchGuruResults.mockResolvedValueOnce([
      makeCard("c2", "2026-04-01T00:00:00Z", "2026-06-01T12:30:00Z"),
    ]);

    const r2 = await poll(store);
    expect(r2.payload.body.data.updated.map((c) => c.id)).toEqual(["c2"]);
    expect(store.currentState()).toEqual({ lastPolledAt: POLL_TWO_AT });
  });

  test("polledNoChanges when no records returned", async () => {
    const store = createPollingStore({ lastPolledAt: SEEDED_CURSOR });
    freezeClockAt(POLL_ONE_AT);
    mockFetchGuruResults.mockResolvedValueOnce([]);

    const result = await poll(store);
    expect(result.polledNoChanges).toBe(true);
    expect(store.currentState()).toEqual({ lastPolledAt: POLL_ONE_AT });
  });

  test("initial sync with lookBackDate bypasses toggle suppression", async () => {
    const store = createPollingStore();
    freezeClockAt(POLL_ONE_AT);

    mockFetchGuruResults.mockResolvedValueOnce([
      makeCard("c1", "2026-04-15T00:00:00Z", "2026-04-15T00:00:00Z"),
      makeCard("c2", "2025-12-01T00:00:00Z", "2026-04-20T00:00:00Z"),
    ]);

    const result = await poll(store, {
      lookBackDate: "2026-04-01",
      showNewRecords: false,
      showUpdatedRecords: false,
    });

    expect(result.payload.body.data.created.map((c) => c.id)).toEqual(["c1"]);
    expect(result.payload.body.data.updated.map((c) => c.id)).toEqual(["c2"]);
    expect(result.polledNoChanges).toBe(false);
  });

  test("subsequent poll respects toggle suppression after initial sync", async () => {
    const store = createPollingStore({ lastPolledAt: SEEDED_CURSOR });
    freezeClockAt(POLL_ONE_AT);

    mockFetchGuruResults.mockResolvedValueOnce([
      makeCard("c1", "2026-05-15T00:00:00Z", "2026-05-15T00:00:00Z"),
      makeCard("c2", "2025-04-01T00:00:00Z", "2026-05-20T00:00:00Z"),
    ]);

    const result = await poll(store, {
      showNewRecords: false,
      showUpdatedRecords: false,
    });

    expect(result.payload.body.data.created).toEqual([]);
    expect(result.payload.body.data.updated).toEqual([]);
    expect(result.polledNoChanges).toBe(true);
  });

  test("toggle suppression: showNewRecords=false hides created", async () => {
    const store = createPollingStore({ lastPolledAt: SEEDED_CURSOR });
    freezeClockAt(POLL_ONE_AT);
    mockFetchGuruResults.mockResolvedValueOnce([
      makeCard("c1", "2026-05-15T00:00:00Z", "2026-05-15T00:00:00Z"),
    ]);

    const result = await poll(store, { showNewRecords: false });
    expect(result.payload.body.data.created).toEqual([]);
    expect(result.polledNoChanges).toBe(true);
  });
});
