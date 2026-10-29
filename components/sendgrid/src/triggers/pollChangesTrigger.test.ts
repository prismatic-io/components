import type { ActionContext } from "@prismatic-io/spectral";
import { invokeTrigger } from "@prismatic-io/spectral/dist/testing";
import { describe, expect, it, test } from "vitest";
import { POLLING_BATCH_SIZE } from "../constants";
import { pollChangesTriggerExamplePayload } from "../examplePayloads";
import type { SendgridMessageRecord } from "../types";
import { pollChangesTrigger } from "./pollChangesTrigger";
const mockFetchMessagesInWindow =
  vi.fn<
    () => Promise<{
      records: SendgridMessageRecord[];
      truncated: boolean;
    }>
  >();
vi.mock("../client", () => ({
  createAuthorizedClient: vi.fn().mockReturnValue({}),
}));
const mockComputePollWindow =
  vi.fn<
    () => {
      fromIso: string;
      toIso: string;
    }
  >();
vi.mock("../util", async (importOriginal) => {
  const actual = await importOriginal<typeof import("../util")>();
  return {
    ...actual,
    fetchMessagesInWindow: () => mockFetchMessagesInWindow(),
    computePollWindow: (...args: unknown[]) =>
      mockComputePollWindow(...(args as [])),
  };
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
  created: SendgridMessageRecord[];
  updated: SendgridMessageRecord[];
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
      sendGridConnection: {},
      showNewRecords: true,
      showUpdatedRecords: true,
      lookBackDate: undefined,
      ...overrides,
    } as unknown as Parameters<typeof invokeTrigger>[3],
  );
  return result as unknown as PollResult;
};
const makeMessage = (id: string): SendgridMessageRecord =>
  ({
    msg_id: id,
    from_email: "sender@example.com",
    subject: "Test",
    to_email: "user@example.com",
    status: "delivered",
    last_event_time: "2026-05-27T14:30:00Z",
  }) as SendgridMessageRecord;
describe("pollChangesTrigger batching declaration", () => {
  it("declares Tier 1 batching support", () => {
    expect(pollChangesTrigger.triggerResolverSupport).toBe("valid");
  });
  it("declares a batchConfig of the polling batch size", () => {
    expect(pollChangesTrigger.batchConfig).toEqual({
      batchSize: POLLING_BATCH_SIZE,
    });
    expect(POLLING_BATCH_SIZE).toBe(50);
  });
  it("exposes a resolveItems function", () => {
    expect(typeof pollChangesTrigger.triggerResolver?.resolveItems).toBe(
      "function",
    );
  });
});
describe("pollChangesTrigger.triggerResolver.resolveItems", () => {
  const resolveItems = pollChangesTrigger.triggerResolver?.resolveItems;
  const mockContext = {} as Parameters<NonNullable<typeof resolveItems>>[0];
  it("resolves the documented payload shape into tagged record changes", () => {
    if (!resolveItems) {
      throw new Error(
        "pollChangesTrigger.triggerResolver.resolveItems missing",
      );
    }
    const { payload } = pollChangesTriggerExamplePayload;
    const items = resolveItems(mockContext, { payload });
    expect(items).toEqual([
      {
        changeType: "updated",
        record: {
          msg_id: "abc12345.recvd-67890-XYZ-1-1234567-1.0",
          from_email: "sender@example.com",
          subject: "Hello from Acme!",
          to_email: "user@example.com",
          status: "delivered",
          opens_count: 0,
          clicks_count: 0,
          last_event_time: "2026-05-27T14:30:00Z",
          api_key_id: "abc12345defg67890hijkXYZ",
          template_id: "d-exampletemplateid1234567890abcdef",
        },
      },
    ]);
  });
});
describe("pollChangesTrigger initial sync ignores visibility toggles", () => {
  const WINDOW_FROM = "2026-06-01T06:00:00.000Z";
  const WINDOW_TO = "2026-06-01T11:59:00.000Z";
  const WINDOW_NEAR_NOW = { fromIso: WINDOW_FROM, toIso: WINDOW_TO };
  afterEach(() => {
    vi.useRealTimers();
    mockFetchMessagesInWindow.mockReset();
    mockComputePollWindow.mockReset();
  });
  test("initial sync seeds all records despite toggles=false", async () => {
    const store = createPollingStore();
    freezeClockAt(NOW);
    mockComputePollWindow.mockReturnValueOnce(WINDOW_NEAR_NOW);
    mockFetchMessagesInWindow.mockResolvedValueOnce({
      records: [makeMessage("msg_1"), makeMessage("msg_2")],
      truncated: false,
    });
    const result = await poll(store, {
      showNewRecords: false,
      showUpdatedRecords: false,
      lookBackDate: "2026-04-01T00:00:00.000Z",
    });
    expect(result.payload.body.data.updated).toHaveLength(2);
    expect(result.polledNoChanges).toBe(false);
  });
  test("initial sync without a look-back date still ignores toggles", async () => {
    const store = createPollingStore();
    freezeClockAt(NOW);
    mockComputePollWindow.mockReturnValueOnce(WINDOW_NEAR_NOW);
    mockFetchMessagesInWindow.mockResolvedValueOnce({
      records: [makeMessage("msg_1"), makeMessage("msg_2")],
      truncated: false,
    });
    const result = await poll(store, {
      showNewRecords: false,
      showUpdatedRecords: false,
    });
    expect(result.payload.body.data.updated).toHaveLength(2);
    expect(result.polledNoChanges).toBe(false);
  });
  test("steady-state respects toggles after initial sync", async () => {
    const store = createPollingStore({ lastPolledAt: SEEDED_CURSOR });
    freezeClockAt(NOW);
    mockComputePollWindow.mockReturnValueOnce(WINDOW_NEAR_NOW);
    mockFetchMessagesInWindow.mockResolvedValueOnce({
      records: [makeMessage("msg_1")],
      truncated: false,
    });
    const result = await poll(store, {
      showNewRecords: false,
      showUpdatedRecords: false,
    });
    expect(result.payload.body.data.updated).toEqual([]);
    expect(result.polledNoChanges).toBe(true);
  });
  test("multi-recurrence backfill persists backfillActive across truncated polls", async () => {
    const store = createPollingStore();
    freezeClockAt(NOW);
    const WINDOW_FAR = {
      fromIso: "2026-04-01T00:00:00.000Z",
      toIso: "2026-04-01T06:00:00.000Z",
    };
    const WINDOW_MID = {
      fromIso: "2026-04-01T06:00:00.000Z",
      toIso: "2026-04-01T12:00:00.000Z",
    };
    mockComputePollWindow.mockReturnValueOnce(WINDOW_FAR);
    mockFetchMessagesInWindow.mockResolvedValueOnce({
      records: [makeMessage("msg_1")],
      truncated: true,
    });
    const r1 = await poll(store, {
      showNewRecords: false,
      showUpdatedRecords: false,
      lookBackDate: "2026-04-01T00:00:00.000Z",
    });
    expect(r1.payload.body.data.updated).toHaveLength(1);
    expect(r1.polledNoChanges).toBe(false);
    expect(store.currentState()).toHaveProperty("backfillActive", true);
    mockComputePollWindow.mockReturnValueOnce(WINDOW_MID);
    mockFetchMessagesInWindow.mockResolvedValueOnce({
      records: [makeMessage("msg_2")],
      truncated: true,
    });
    const r2 = await poll(store, {
      showNewRecords: false,
      showUpdatedRecords: false,
      lookBackDate: "2026-04-01T00:00:00.000Z",
    });
    expect(r2.payload.body.data.updated).toHaveLength(1);
    expect(r2.polledNoChanges).toBe(false);
    expect(store.currentState()).toHaveProperty("backfillActive", true);
    mockComputePollWindow.mockReturnValueOnce(WINDOW_NEAR_NOW);
    mockFetchMessagesInWindow.mockResolvedValueOnce({
      records: [makeMessage("msg_3")],
      truncated: false,
    });
    const r3 = await poll(store, {
      showNewRecords: false,
      showUpdatedRecords: false,
      lookBackDate: "2026-04-01T00:00:00.000Z",
    });
    expect(r3.payload.body.data.updated).toHaveLength(1);
    expect(r3.polledNoChanges).toBe(false);
    expect(store.currentState()).not.toHaveProperty("backfillActive");
  });
});
