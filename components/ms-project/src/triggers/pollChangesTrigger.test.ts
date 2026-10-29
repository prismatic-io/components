import type { ActionContext } from "@prismatic-io/spectral";
import { invokeTrigger } from "@prismatic-io/spectral/dist/testing";
import type { MsProjectRecord } from "../types";
import { pollChangesTrigger } from "./pollChangesTrigger";

const mockGet = vi.fn();

vi.mock("../client", () => ({
  createProjectsClient: vi
    .fn()
    .mockReturnValue({ get: (...args: unknown[]) => mockGet(...args) }),
}));

vi.mock("../helper", async (importOriginal) => {
  const actual = await importOriginal<typeof import("../helper")>();
  return { ...actual };
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
  created: MsProjectRecord[];
  updated: MsProjectRecord[];
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

const makeProject = (
  id: string,
  createdDate: string,
  lastPublishedDate: string,
): MsProjectRecord =>
  ({
    ProjectId: id,
    CreatedDate: createdDate,
    LastPublishedDate: lastPublishedDate,
  }) as unknown as MsProjectRecord;

describe("pollChangesTrigger", () => {
  afterEach(() => {
    vi.useRealTimers();
    mockGet.mockReset();
  });

  test("cold first poll without lookBackDate seeds cursor and emits nothing", async () => {
    const store = createPollingStore();
    freezeClockAt(POLL_ONE_AT);
    mockGet.mockResolvedValueOnce({ data: { d: { results: [] } } });

    const result = await poll(store);

    expect(result.payload.body.data.created).toEqual([]);
    expect(result.polledNoChanges).toBe(true);
    expect(store.currentState()).toEqual({ lastPolledAt: POLL_ONE_AT });
  });

  test("advances cursor and splits created/updated", async () => {
    const store = createPollingStore({ lastPolledAt: SEEDED_CURSOR });

    freezeClockAt(POLL_ONE_AT);
    mockGet.mockResolvedValueOnce({
      data: {
        d: {
          results: [
            makeProject("p1", "2026-05-15T00:00:00Z", "2026-05-15T00:00:00Z"),
            makeProject("p2", "2026-04-01T00:00:00Z", "2026-05-20T00:00:00Z"),
            makeProject("p3", "2026-04-01T00:00:00Z", "2026-04-02T00:00:00Z"),
          ],
        },
      },
    });

    const result = await poll(store);

    expect(
      result.payload.body.data.created.map(
        (p) => (p as Record<string, unknown>).ProjectId,
      ),
    ).toEqual(["p1"]);
    expect(
      result.payload.body.data.updated.map(
        (p) => (p as Record<string, unknown>).ProjectId,
      ),
    ).toEqual(["p2"]);
    expect(result.polledNoChanges).toBe(false);
    expect(store.currentState()).toEqual({ lastPolledAt: POLL_ONE_AT });
  });

  test("short-circuits when both toggles are off", async () => {
    const store = createPollingStore({ lastPolledAt: SEEDED_CURSOR });
    freezeClockAt(POLL_ONE_AT);

    const result = await poll(store, {
      showNewRecords: false,
      showUpdatedRecords: false,
    });

    expect(result.polledNoChanges).toBe(true);
    expect(mockGet).not.toHaveBeenCalled();
    expect(store.currentState()).toEqual({ lastPolledAt: POLL_ONE_AT });
  });

  test("initial sync with lookBackDate bypasses toggle suppression", async () => {
    const store = createPollingStore();
    freezeClockAt(POLL_ONE_AT);
    mockGet.mockResolvedValueOnce({
      data: {
        d: {
          results: [
            makeProject("p1", "2026-05-15T00:00:00Z", "2026-05-15T00:00:00Z"),
            makeProject("p2", "2026-04-01T00:00:00Z", "2026-05-20T00:00:00Z"),
          ],
        },
      },
    });

    const result = await poll(store, {
      lookBackDate: "2026-04-01",
      showNewRecords: false,
      showUpdatedRecords: false,
    });

    expect(mockGet).toHaveBeenCalled();
    expect(
      result.payload.body.data.created.map(
        (p) => (p as Record<string, unknown>).ProjectId,
      ),
    ).toEqual(["p1"]);
    expect(
      result.payload.body.data.updated.map(
        (p) => (p as Record<string, unknown>).ProjectId,
      ),
    ).toEqual(["p2"]);
    expect(result.polledNoChanges).toBe(false);
  });

  test("subsequent poll respects toggle suppression after initial sync", async () => {
    const store = createPollingStore({ lastPolledAt: SEEDED_CURSOR });
    freezeClockAt(POLL_ONE_AT);

    const result = await poll(store, {
      showNewRecords: false,
      showUpdatedRecords: false,
    });

    expect(mockGet).not.toHaveBeenCalled();
    expect(result.polledNoChanges).toBe(true);
  });

  test("polledNoChanges when API returns empty results", async () => {
    const store = createPollingStore({ lastPolledAt: SEEDED_CURSOR });
    freezeClockAt(POLL_ONE_AT);
    mockGet.mockResolvedValueOnce({ data: { d: { results: [] } } });

    const result = await poll(store);
    expect(result.polledNoChanges).toBe(true);
  });
});
