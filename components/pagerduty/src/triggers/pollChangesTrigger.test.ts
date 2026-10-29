import type { ActionContext } from "@prismatic-io/spectral";
import { invokeTrigger } from "@prismatic-io/spectral/dist/testing";
import type { PagerDutyIncident } from "../types";
import { pollChangesTrigger } from "./pollChangesTrigger";
const mockFetchAllIncidentsSince = vi.fn<() => Promise<PagerDutyIncident[]>>();
vi.mock("../client", () => ({
  createClient: vi.fn().mockReturnValue({}),
}));
vi.mock("../util/fetchAllIncidentsSince", () => ({
  fetchAllIncidentsSince: () => mockFetchAllIncidentsSince(),
}));
vi.mock("../util/polling", async (importOriginal) => {
  const actual = await importOriginal<typeof import("../util/polling")>();
  return { ...actual };
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
interface PollResult {
  payload: {
    body: {
      data: {
        created: PagerDutyIncident[];
        updated: unknown[];
      };
    };
  };
  polledNoChanges: boolean;
}
const poll = async (
  store: PollingStore,
  overrides: Partial<{
    showNewIncidents: boolean;
    lookBackDate: string;
  }> = {},
): Promise<PollResult> => {
  const { result } = await invokeTrigger(
    triggerUnderTest,
    store.context,
    undefined,
    {
      connection: {},
      showNewIncidents: true,
      lookBackDate: undefined,
      ...overrides,
    } as Record<string, unknown>,
  );
  return result as unknown as PollResult;
};
const makeIncident = (id: string): PagerDutyIncident =>
  ({
    id,
    type: "incident",
    summary: `Incident ${id}`,
    incident_number: 1,
    title: `Incident ${id}`,
    status: "triggered",
    urgency: "high",
    created_at: "2026-05-15T00:00:00Z",
  }) as PagerDutyIncident;
describe("pollChangesTrigger", () => {
  afterEach(() => {
    vi.useRealTimers();
    mockFetchAllIncidentsSince.mockReset();
  });
  test("advances cursor across consecutive polls", async () => {
    const store = createPollingStore({ lastPolledAt: SEEDED_CURSOR });
    freezeClockAt(POLL_ONE_AT);
    mockFetchAllIncidentsSince.mockResolvedValueOnce([makeIncident("inc1")]);
    const r1 = await poll(store);
    expect(r1.payload.body.data.created.map((i) => i.id)).toEqual(["inc1"]);
    expect(r1.polledNoChanges).toBe(false);
    expect(store.currentState()).toEqual({ lastPolledAt: POLL_ONE_AT });
    freezeClockAt(POLL_TWO_AT);
    mockFetchAllIncidentsSince.mockResolvedValueOnce([]);
    const r2 = await poll(store);
    expect(r2.polledNoChanges).toBe(true);
    expect(store.currentState()).toEqual({ lastPolledAt: POLL_TWO_AT });
  });
  test("cold first poll without lookBackDate seeds cursor to now", async () => {
    const store = createPollingStore();
    freezeClockAt(POLL_ONE_AT);
    mockFetchAllIncidentsSince.mockResolvedValueOnce([]);
    const result = await poll(store);
    expect(result.polledNoChanges).toBe(true);
    expect(store.currentState()).toEqual({ lastPolledAt: POLL_ONE_AT });
  });
  test("first poll with lookBackDate uses that as the since boundary", async () => {
    const store = createPollingStore();
    freezeClockAt(POLL_ONE_AT);
    mockFetchAllIncidentsSince.mockResolvedValueOnce([makeIncident("inc1")]);
    const result = await poll(store, { lookBackDate: "2026-04-01" });
    expect(result.payload.body.data.created).toHaveLength(1);
    expect(result.polledNoChanges).toBe(false);
    expect(store.currentState()).toEqual({ lastPolledAt: POLL_ONE_AT });
  });
  test("showNewIncidents=false skips API call and emits empty", async () => {
    const store = createPollingStore({ lastPolledAt: SEEDED_CURSOR });
    freezeClockAt(POLL_ONE_AT);
    const result = await poll(store, { showNewIncidents: false });
    expect(result.payload.body.data.created).toEqual([]);
    expect(result.polledNoChanges).toBe(true);
    expect(mockFetchAllIncidentsSince).not.toHaveBeenCalled();
  });
  test("initial sync seeds all records despite toggles=false", async () => {
    const store = createPollingStore();
    freezeClockAt(POLL_ONE_AT);
    mockFetchAllIncidentsSince.mockResolvedValueOnce([
      makeIncident("inc1"),
      makeIncident("inc2"),
    ]);
    const result = await poll(store, {
      showNewIncidents: false,
      lookBackDate: "2026-04-01",
    });
    expect(result.payload.body.data.created).toHaveLength(2);
    expect(result.polledNoChanges).toBe(false);
  });
  test("steady-state respects toggles after initial sync", async () => {
    const store = createPollingStore({ lastPolledAt: SEEDED_CURSOR });
    freezeClockAt(POLL_ONE_AT);
    const result = await poll(store, { showNewIncidents: false });
    expect(result.payload.body.data.created).toEqual([]);
    expect(result.polledNoChanges).toBe(true);
  });
});
