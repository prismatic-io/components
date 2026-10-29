import type { ActionContext } from "@prismatic-io/spectral";
import { invokeTrigger } from "@prismatic-io/spectral/dist/testing";
import type { SlackMessage } from "../types";
import { pollChangesTrigger } from "./pollChangesTrigger";
const mockFetchSlackMessagesSince = jest.fn<
  Promise<{
    messages: SlackMessage[];
    truncated: boolean;
  }>,
  []
>();
jest.mock("../util/fetchSlackMessagesSince", () => ({
  fetchSlackMessagesSince: () => mockFetchSlackMessagesSince(),
}));
jest.mock("../util/resolvePollingRecordChanges", () => {
  const actual = jest.requireActual("../util/resolvePollingRecordChanges");
  return { ...actual };
});
const NOW = "2026-06-01T12:00:00.000Z";
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
          writes.push({ ...newState });
        },
        invokeAction: () => {
          throw new Error("not stubbed");
        },
      },
      debug: { enabled: false },
      logger: { debug: jest.fn(), warn: jest.fn() },
    } as unknown as Partial<ActionContext>,
  };
};
const freezeClockAt = (iso: string): void => {
  jest.useFakeTimers({ doNotFake: [] });
  jest.setSystemTime(new Date(iso));
};
const triggerUnderTest = {
  perform: pollChangesTrigger.perform,
} as unknown as Parameters<typeof invokeTrigger>[0];
interface PollChanges {
  created: SlackMessage[];
  updated: SlackMessage[];
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
    lookBackDate: string;
  }> = {},
): Promise<PollResult> => {
  const { result } = await invokeTrigger(
    triggerUnderTest,
    store.context,
    undefined,
    {
      connection: {},
      channelId: "C0123456789",
      showNewRecords: true,
      lookBackDate: undefined,
      ...overrides,
    } as unknown as Parameters<typeof invokeTrigger>[3],
  );
  return result as unknown as PollResult;
};
const makeMessage = (ts: string): SlackMessage => ({
  ts,
  type: "message",
  user: "U012AB3CDE",
  text: "hello",
});
describe("pollChangesTrigger initial sync ignores visibility toggles", () => {
  afterEach(() => {
    jest.useRealTimers();
    mockFetchSlackMessagesSince.mockReset();
  });
  test("initial sync seeds all records despite toggles=false", async () => {
    const store = createPollingStore();
    freezeClockAt(NOW);
    mockFetchSlackMessagesSince.mockResolvedValueOnce({
      messages: [
        makeMessage("1716397800.000200"),
        makeMessage("1716397900.000100"),
      ],
      truncated: false,
    });
    const result = await poll(store, {
      showNewRecords: false,
      lookBackDate: "2026-04-01T00:00:00.000Z",
    });
    expect(result.payload.body.data.created).toHaveLength(2);
    expect(result.polledNoChanges).toBe(false);
  });
  test("steady-state respects toggles after initial sync", async () => {
    const store = createPollingStore({ lastPolledAt: SEEDED_CURSOR });
    freezeClockAt(NOW);
    mockFetchSlackMessagesSince.mockResolvedValueOnce({
      messages: [makeMessage("1716397800.000200")],
      truncated: false,
    });
    const result = await poll(store, {
      showNewRecords: false,
    });
    expect(result.payload.body.data.created).toEqual([]);
    expect(result.polledNoChanges).toBe(true);
  });
  test("multi-recurrence backfill persists backfillActive across truncated polls", async () => {
    const store = createPollingStore();
    freezeClockAt(NOW);
    mockFetchSlackMessagesSince.mockResolvedValueOnce({
      messages: [makeMessage("1716397800.000200")],
      truncated: true,
    });
    const r1 = await poll(store, {
      showNewRecords: false,
      lookBackDate: "2026-04-01T00:00:00.000Z",
    });
    expect(r1.payload.body.data.created).toHaveLength(1);
    expect(r1.polledNoChanges).toBe(false);
    expect(store.currentState()).toHaveProperty("backfillActive", true);
    mockFetchSlackMessagesSince.mockResolvedValueOnce({
      messages: [makeMessage("1716397900.000100")],
      truncated: true,
    });
    const r2 = await poll(store, {
      showNewRecords: false,
      lookBackDate: "2026-04-01T00:00:00.000Z",
    });
    expect(r2.payload.body.data.created).toHaveLength(1);
    expect(store.currentState()).toHaveProperty("backfillActive", true);
    mockFetchSlackMessagesSince.mockResolvedValueOnce({
      messages: [makeMessage("1716398000.000050")],
      truncated: false,
    });
    const r3 = await poll(store, {
      showNewRecords: false,
      lookBackDate: "2026-04-01T00:00:00.000Z",
    });
    expect(r3.payload.body.data.created).toHaveLength(1);
    expect(store.currentState()).not.toHaveProperty("backfillActive");
  });
});
