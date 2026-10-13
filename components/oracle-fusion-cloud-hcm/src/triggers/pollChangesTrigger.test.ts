import type { ActionContext } from "@prismatic-io/spectral";
import { invokeTrigger } from "@prismatic-io/spectral/dist/testing";
import type { AtomFeedEntry } from "../types";
import { pollChangesTrigger } from "./pollChangesTrigger";
const mockFetchAtomEntries = vi.fn<() => Promise<AtomFeedEntry[]>>();
vi.mock("../client", () => ({
  createAtomFeedClient: vi.fn().mockReturnValue({}),
}));
vi.mock("../util", async (importOriginal) => {
  const actual = await importOriginal<typeof import("../util")>();
  return {
    ...actual,
    fetchAtomEntries: () => mockFetchAtomEntries(),
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
interface PollResult {
  payload: {
    body: {
      data: {
        entries: AtomFeedEntry[];
      };
    };
  };
  polledNoChanges: boolean;
}
const poll = async (
  store: PollingStore,
  lookBackDate?: string,
): Promise<PollResult> => {
  const { result } = await invokeTrigger(
    triggerUnderTest,
    store.context,
    undefined,
    {
      connection: {},
      feedName: "NewHire",
      pageSize: 100,
      lookBackDate: lookBackDate ?? undefined,
    } as Record<string, unknown>,
  );
  return result as unknown as PollResult;
};
const makeEntry = (id: string): AtomFeedEntry => ({
  id,
  feedName: "NewHire",
  updated: "2026-05-15T00:00:00Z",
  published: "2026-05-15T00:00:00Z",
  changedAttributes: ["Name"],
  content: {},
});
describe("pollChangesTrigger (Atom feed)", () => {
  afterEach(() => {
    vi.useRealTimers();
    mockFetchAtomEntries.mockReset();
  });
  test("advances cursor across consecutive polls", async () => {
    const store = createPollingStore({ lastPolledAt: SEEDED_CURSOR });
    freezeClockAt(POLL_ONE_AT);
    mockFetchAtomEntries.mockResolvedValueOnce([makeEntry("e1")]);
    const r1 = await poll(store);
    expect(r1.payload.body.data.entries).toHaveLength(1);
    expect(r1.polledNoChanges).toBe(false);
    expect(store.currentState()).toEqual({ lastPolledAt: POLL_ONE_AT });
    freezeClockAt(POLL_TWO_AT);
    mockFetchAtomEntries.mockResolvedValueOnce([]);
    const r2 = await poll(store);
    expect(r2.polledNoChanges).toBe(true);
    expect(store.currentState()).toEqual({ lastPolledAt: POLL_TWO_AT });
  });
  test("cold first poll seeds cursor to now", async () => {
    const store = createPollingStore();
    freezeClockAt(POLL_ONE_AT);
    mockFetchAtomEntries.mockResolvedValueOnce([]);
    const result = await poll(store);
    expect(result.polledNoChanges).toBe(true);
    expect(store.currentState()).toEqual({ lastPolledAt: POLL_ONE_AT });
  });
  test("uses lookBackDate as initial cursor when no prior state exists", async () => {
    const store = createPollingStore();
    freezeClockAt(POLL_ONE_AT);
    mockFetchAtomEntries.mockResolvedValueOnce([makeEntry("e1")]);
    const result = await poll(store, "2026-04-01T00:00:00.000Z");
    expect(result.polledNoChanges).toBe(false);
    expect(result.payload.body.data.entries).toHaveLength(1);
    expect(store.currentState()).toEqual({ lastPolledAt: POLL_ONE_AT });
  });
  test("returns all entries when fetchAtomEntries paginates across multiple pages", async () => {
    const store = createPollingStore({ lastPolledAt: SEEDED_CURSOR });
    freezeClockAt(POLL_ONE_AT);
    const entries = Array.from({ length: 5 }, (_, i) => makeEntry(`page-${i}`));
    mockFetchAtomEntries.mockResolvedValueOnce(entries);
    const result = await poll(store);
    expect(result.polledNoChanges).toBe(false);
    expect(result.payload.body.data.entries).toHaveLength(5);
    expect(
      result.payload.body.data.entries.map((e: AtomFeedEntry) => e.id),
    ).toEqual(["page-0", "page-1", "page-2", "page-3", "page-4"]);
    expect(store.currentState()).toEqual({ lastPolledAt: POLL_ONE_AT });
  });
});
