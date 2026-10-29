import type { ActionContext } from "@prismatic-io/spectral";
import { invokeTrigger } from "@prismatic-io/spectral/dist/testing";
import type { TableauRecord } from "../types";
import { pollChangesTrigger } from "./pollChangesTrigger";

const mockFetchTableauRecordsSince =
  vi.fn<() => Promise<{ records: TableauRecord[]; truncated: boolean }>>();

vi.mock("../util", async (importOriginal) => {
  const actual = await importOriginal<typeof import("../util")>();
  return {
    ...actual,
    getTableauClient: vi.fn().mockResolvedValue({}),
    fetchTableauRecordsSince: () => mockFetchTableauRecordsSince(),
  };
});

const POLL_ONE_AT = "2026-06-01T12:00:00.000Z";
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
      logger: { debug: vi.fn(), warn: vi.fn() },
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
  created: TableauRecord[];
  updated: TableauRecord[];
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
      tableauConnection: {},
      pollResourceType: "workbooks",
      showNewRecords: true,
      showUpdatedRecords: true,
      lookBackDate: undefined,
      ...overrides,
    } as Record<string, unknown>,
  );
  return result as unknown as PollResult;
};

const makeRecord = (
  id: string,
  createdAt: string,
  updatedAt: string,
): TableauRecord => ({
  id,
  name: `Record ${id}`,
  createdAt,
  updatedAt,
});

describe("pollChangesTrigger", () => {
  afterEach(() => {
    vi.useRealTimers();
    mockFetchTableauRecordsSince.mockReset();
  });

  test("advances cursor and splits created/updated", async () => {
    const store = createPollingStore({ lastPolledAt: SEEDED_CURSOR });

    freezeClockAt(POLL_ONE_AT);
    mockFetchTableauRecordsSince.mockResolvedValueOnce({
      records: [
        makeRecord("r1", "2026-05-15T00:00:00Z", "2026-05-15T00:00:00Z"),
        makeRecord("r2", "2026-04-01T00:00:00Z", "2026-05-20T00:00:00Z"),
      ],
      truncated: false,
    });

    const result = await poll(store);

    expect(result.payload.body.data.created.map((r) => r.id)).toEqual(["r1"]);
    expect(result.payload.body.data.updated.map((r) => r.id)).toEqual(["r2"]);
    expect(result.polledNoChanges).toBe(false);
    expect(store.currentState()).toEqual({ lastPolledAt: POLL_ONE_AT });
  });

  test("cold first poll without lookBackDate seeds cursor to now and emits nothing", async () => {
    const store = createPollingStore();
    freezeClockAt(POLL_ONE_AT);
    mockFetchTableauRecordsSince.mockResolvedValueOnce({
      records: [],
      truncated: false,
    });

    const result = await poll(store);

    expect(result.payload.body.data.created).toEqual([]);
    expect(result.payload.body.data.updated).toEqual([]);
    expect(result.polledNoChanges).toBe(true);
    expect(store.currentState()).toEqual({ lastPolledAt: POLL_ONE_AT });
  });

  test("uses lookBackDate as initial cursor when no prior state exists", async () => {
    const store = createPollingStore();
    freezeClockAt(POLL_ONE_AT);
    mockFetchTableauRecordsSince.mockResolvedValueOnce({
      records: [
        makeRecord("r1", "2026-05-15T00:00:00Z", "2026-05-15T00:00:00Z"),
      ],
      truncated: false,
    });

    const result = await poll(store, { lookBackDate: "2026-04-01" });

    expect(result.payload.body.data.created.map((r) => r.id)).toEqual(["r1"]);
    expect(result.polledNoChanges).toBe(false);
    expect(store.currentState()).toEqual({ lastPolledAt: POLL_ONE_AT });
  });

  test("truncated response advances cursor to last record's updatedAt", async () => {
    const store = createPollingStore({ lastPolledAt: SEEDED_CURSOR });
    freezeClockAt(POLL_ONE_AT);
    mockFetchTableauRecordsSince.mockResolvedValueOnce({
      records: [
        makeRecord("r1", "2026-05-15T00:00:00Z", "2026-05-15T00:00:00Z"),
        makeRecord("r2", "2026-05-20T00:00:00Z", "2026-05-20T00:00:00Z"),
      ],
      truncated: true,
    });

    const result = await poll(store);

    expect(store.currentState()).toEqual({
      lastPolledAt: "2026-05-20T00:00:00Z",
    });
    expect(result.polledNoChanges).toBe(false);
  });

  test("polledNoChanges when empty results", async () => {
    const store = createPollingStore({ lastPolledAt: SEEDED_CURSOR });
    freezeClockAt(POLL_ONE_AT);
    mockFetchTableauRecordsSince.mockResolvedValueOnce({
      records: [],
      truncated: false,
    });

    const result = await poll(store);
    expect(result.polledNoChanges).toBe(true);
  });

  test("initial sync with lookBackDate bypasses toggle suppression", async () => {
    const store = createPollingStore();
    freezeClockAt(POLL_ONE_AT);
    mockFetchTableauRecordsSince.mockResolvedValueOnce({
      records: [
        makeRecord("r1", "2026-05-15T00:00:00Z", "2026-05-15T00:00:00Z"),
        makeRecord("r2", "2026-04-01T00:00:00Z", "2026-05-20T00:00:00Z"),
      ],
      truncated: false,
    });

    const result = await poll(store, {
      lookBackDate: "2026-04-01",
      showNewRecords: false,
      showUpdatedRecords: false,
    });

    expect(result.payload.body.data.created.map((r) => r.id)).toEqual(["r1"]);
    expect(result.payload.body.data.updated.map((r) => r.id)).toEqual(["r2"]);
    expect(result.polledNoChanges).toBe(false);
  });

  test("subsequent poll respects toggle suppression after initial sync", async () => {
    const store = createPollingStore({ lastPolledAt: SEEDED_CURSOR });
    freezeClockAt(POLL_ONE_AT);
    mockFetchTableauRecordsSince.mockResolvedValueOnce({
      records: [
        makeRecord("r1", "2026-05-15T00:00:00Z", "2026-05-15T00:00:00Z"),
      ],
      truncated: false,
    });

    const result = await poll(store, {
      showNewRecords: false,
      showUpdatedRecords: false,
    });

    expect(result.polledNoChanges).toBe(true);
  });

  test("toggle suppression hides results but still advances cursor", async () => {
    const store = createPollingStore({ lastPolledAt: SEEDED_CURSOR });
    freezeClockAt(POLL_ONE_AT);
    mockFetchTableauRecordsSince.mockResolvedValueOnce({
      records: [
        makeRecord("r1", "2026-05-15T00:00:00Z", "2026-05-15T00:00:00Z"),
      ],
      truncated: false,
    });

    const result = await poll(store, {
      showNewRecords: false,
      showUpdatedRecords: false,
    });
    expect(result.polledNoChanges).toBe(true);
    expect(store.currentState()).toEqual({ lastPolledAt: POLL_ONE_AT });
  });
});
