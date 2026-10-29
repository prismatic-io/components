import {
  createConnection,
  invokeTrigger,
} from "@prismatic-io/spectral/dist/testing";
import { apiKey } from "../connections";
import type { PollingState } from "../types";
import { newFileComments } from "./newFileComments";

const mockGetFileComments = vi.fn();

vi.mock("../client", () => ({
  createAuthorizedClient: vi.fn().mockReturnValue({
    comments: {
      getFileComments: (...args: unknown[]) => mockGetFileComments(...args),
    },
  }),
}));

const POLL_ONE_AT = "2026-06-01T12:00:00.000Z";
const POLL_TWO_AT = "2026-06-01T13:00:00.000Z";
const SEEDED_CURSOR = "2026-05-01T00:00:00.000Z";

const testConnection = createConnection(apiKey, {
  apiKey: "test-token-for-unit-tests",
});

interface PollingStore {
  context: Record<string, unknown>;
  currentState: () => PollingState;
  writes: PollingState[];
}

const createPollingStore = (initial?: PollingState): PollingStore => {
  let state: PollingState = initial ?? ({} as PollingState);
  const writes: PollingState[] = [];
  const context = {
    polling: {
      getState: () => state,
      setState: (newState: PollingState) => {
        state = newState;
        writes.push(structuredClone(newState));
      },
      invokeAction: vi.fn(),
    },
    logger: {
      info: vi.fn(),
      debug: vi.fn(),
      warn: vi.fn(),
      error: vi.fn(),
      log: vi.fn(),
      metric: vi.fn(),
      trace: vi.fn(),
    },
  };
  return {
    context,
    currentState: () => state,
    writes,
  };
};

const freezeClockAt = (iso: string) => {
  vi.useFakeTimers({ toFake: ["Date"] });
  vi.setSystemTime(new Date(iso));
};

const triggerUnderTest = {
  perform: newFileComments.perform,
} as unknown as Parameters<typeof invokeTrigger>[0];

interface PollResult {
  payload: {
    body: {
      data: {
        newComments: { data: Record<string, unknown>[] };
      };
    };
  };
  polledNoChanges: boolean;
}

const sdkResponse = (
  entries: {
    created_at?: string;
    modified_at?: string;
    id?: string;
    message?: string;
  }[],
) => ({
  rawData: { entries },
});

const poll = async (
  store: PollingStore,
  fileId = "123",
  lookBackDate = "",
): Promise<PollResult> => {
  const { result } = await invokeTrigger(
    triggerUnderTest,
    store.context,
    undefined,
    {
      connection: testConnection,
      fileId,
      lookBackDate,
    } as unknown as Parameters<typeof invokeTrigger>[3],
  );
  return result as unknown as PollResult;
};

describe("newFileComments", () => {
  afterEach(() => {
    vi.useRealTimers();
    mockGetFileComments.mockReset();
  });

  test("advances the cursor and suppresses comments the previous poll already emitted", async () => {
    const commentOld = {
      id: "c_old",
      message: "Old comment",
      created_at: "2026-05-15T00:00:00.000Z",
    };
    const commentNew = {
      id: "c_new",
      message: "New comment",
      created_at: "2026-06-01T12:30:00.000Z",
    };

    const store = createPollingStore({ lastPolledAt: SEEDED_CURSOR });

    freezeClockAt(POLL_ONE_AT);
    mockGetFileComments.mockResolvedValueOnce(sdkResponse([commentOld]));

    const resultOne = await poll(store);
    expect(
      resultOne.payload.body.data.newComments.data.map((c) => c.id),
    ).toEqual(["c_old"]);
    expect(resultOne.polledNoChanges).toBe(false);
    expect(store.currentState()).toEqual({ lastPolledAt: POLL_ONE_AT });

    freezeClockAt(POLL_TWO_AT);
    mockGetFileComments.mockResolvedValueOnce(
      sdkResponse([commentOld, commentNew]),
    );

    const resultTwo = await poll(store);
    expect(
      resultTwo.payload.body.data.newComments.data.map((c) => c.id),
    ).toEqual(["c_new"]);
    expect(resultTwo.polledNoChanges).toBe(false);
    expect(store.currentState()).toEqual({ lastPolledAt: POLL_TWO_AT });

    expect(store.writes).toEqual([
      { lastPolledAt: POLL_ONE_AT },
      { lastPolledAt: POLL_TWO_AT },
    ]);
  });

  test("reports polledNoChanges when no comments match the cursor window", async () => {
    const store = createPollingStore({ lastPolledAt: SEEDED_CURSOR });

    freezeClockAt(POLL_ONE_AT);
    mockGetFileComments.mockResolvedValueOnce(
      sdkResponse([
        {
          id: "c_stale",
          message: "Stale",
          created_at: "2026-04-01T00:00:00.000Z",
        },
      ]),
    );

    const result = await poll(store);
    expect(result.payload.body.data.newComments.data).toEqual([]);
    expect(result.polledNoChanges).toBe(true);
    expect(store.currentState()).toEqual({ lastPolledAt: POLL_ONE_AT });
  });

  test("cold first poll with no prior state seeds the cursor and emits nothing", async () => {
    const store = createPollingStore();

    freezeClockAt(POLL_ONE_AT);
    mockGetFileComments.mockResolvedValueOnce(
      sdkResponse([
        {
          id: "c_existing",
          message: "Existing",
          created_at: "2026-05-31T00:00:00.000Z",
        },
      ]),
    );

    const result = await poll(store);
    expect(result.payload.body.data.newComments.data).toEqual([]);
    expect(result.polledNoChanges).toBe(true);
    expect(store.currentState()).toEqual({ lastPolledAt: POLL_ONE_AT });
  });

  test("polledNoChanges is true when the response has no entries", async () => {
    const store = createPollingStore({ lastPolledAt: SEEDED_CURSOR });

    freezeClockAt(POLL_ONE_AT);
    mockGetFileComments.mockResolvedValueOnce(sdkResponse([]));

    const result = await poll(store);
    expect(result.payload.body.data.newComments.data).toEqual([]);
    expect(result.polledNoChanges).toBe(true);
  });

  test("handles rawData with missing entries gracefully", async () => {
    const store = createPollingStore({ lastPolledAt: SEEDED_CURSOR });

    freezeClockAt(POLL_ONE_AT);
    mockGetFileComments.mockResolvedValueOnce({ rawData: {} });

    const result = await poll(store);
    expect(result.payload.body.data.newComments.data).toEqual([]);
    expect(result.polledNoChanges).toBe(true);
  });

  test("paginates through multiple pages of comments", async () => {
    const { MAX_PAGE_SIZE } = await import("../constants");

    const page1Entries = Array.from({ length: MAX_PAGE_SIZE }, (_, i) => ({
      id: `c_p1_${i}`,
      message: `Page 1 comment ${i}`,
      created_at: "2026-06-01T12:10:00.000Z",
    }));
    const commentPage2 = {
      id: "c_page2",
      message: "Page 2 comment",
      created_at: "2026-06-01T12:20:00.000Z",
    };

    const store = createPollingStore({ lastPolledAt: SEEDED_CURSOR });

    freezeClockAt(POLL_ONE_AT);
    mockGetFileComments
      .mockResolvedValueOnce(sdkResponse(page1Entries))
      .mockResolvedValueOnce(sdkResponse([commentPage2]));

    const result = await poll(store);
    const ids = result.payload.body.data.newComments.data.map((c) => c.id);
    expect(ids).toHaveLength(MAX_PAGE_SIZE + 1);
    expect(ids[ids.length - 1]).toBe("c_page2");
    expect(result.polledNoChanges).toBe(false);
    expect(mockGetFileComments).toHaveBeenCalledTimes(2);

    const secondCallArgs = mockGetFileComments.mock.calls[1];
    expect(secondCallArgs[1].queryParams.offset).toBe(MAX_PAGE_SIZE);
  });
});
