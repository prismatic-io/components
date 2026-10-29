import {
  createConnection,
  invokeTrigger,
} from "@prismatic-io/spectral/dist/testing";
import { apiKey } from "../connections";
import { FOLDER_TYPE } from "../constants";
import type { PollingState } from "../types";
import { newOrUpdatedFile } from "./newOrUpdatedFile";

vi.mock("../client", () => ({
  createAuthorizedClient: vi.fn().mockReturnValue({}),
}));

const mockGetFolderEntries = vi.fn();
vi.mock("../util", async (importOriginal) => {
  const actual = (await importOriginal()) as Record<string, unknown>;
  return {
    ...actual,
    getFolderEntries: (...args: unknown[]) => mockGetFolderEntries(...args),
  };
});

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
  perform: newOrUpdatedFile.perform,
} as unknown as Parameters<typeof invokeTrigger>[0];

interface PollChanges {
  newFiles: { data: Record<string, unknown>[]; polledNoChanges: boolean };
  updatedFiles: { data: Record<string, unknown>[]; polledNoChanges: boolean };
}

interface PollResult {
  payload: { body: { data: PollChanges } };
  polledNoChanges: boolean;
}

const poll = async (
  store: PollingStore,
  folderId = "0",
  lookBackDate = "",
): Promise<PollResult> => {
  const { result } = await invokeTrigger(
    triggerUnderTest,
    store.context,
    undefined,
    {
      connection: testConnection,
      folderId,
      lookBackDate,
    } as unknown as Parameters<typeof invokeTrigger>[3],
  );
  return result as unknown as PollResult;
};

const idsOf = (records: Record<string, unknown>[]): unknown[] =>
  records.map((r) => r.id);

describe("newOrUpdatedFile", () => {
  afterEach(() => {
    vi.useRealTimers();
    mockGetFolderEntries.mockReset();
  });

  test("advances the cursor and splits results into new and updated files", async () => {
    const store = createPollingStore({ lastPolledAt: SEEDED_CURSOR });

    freezeClockAt(POLL_ONE_AT);
    mockGetFolderEntries.mockResolvedValueOnce([
      {
        id: "file_new",
        name: "new.txt",
        type: "file",
        created_at: "2026-05-15T00:00:00.000Z",
        modified_at: "2026-05-15T00:00:00.000Z",
      },
      {
        id: "file_updated",
        name: "updated.txt",
        type: "file",
        created_at: "2026-04-01T00:00:00.000Z",
        modified_at: "2026-05-20T00:00:00.000Z",
      },
      {
        id: "file_stale",
        name: "stale.txt",
        type: "file",
        created_at: "2026-04-01T00:00:00.000Z",
        modified_at: "2026-04-02T00:00:00.000Z",
      },
    ]);

    const result = await poll(store);
    const data = result.payload.body.data;

    expect(idsOf(data.newFiles.data)).toEqual(["file_new"]);
    expect(idsOf(data.updatedFiles.data)).toEqual(["file_updated"]);
    expect(result.polledNoChanges).toBe(false);
    expect(store.currentState()).toEqual({ lastPolledAt: POLL_ONE_AT });
  });

  test("cursor advances across consecutive polls and suppresses already-emitted records", async () => {
    const fileA = {
      id: "file_a",
      name: "a.txt",
      type: "file",
      created_at: "2026-05-15T00:00:00.000Z",
      modified_at: "2026-05-15T00:00:00.000Z",
    };
    const fileB = {
      id: "file_b",
      name: "b.txt",
      type: "file",
      created_at: "2026-06-01T12:30:00.000Z",
      modified_at: "2026-06-01T12:30:00.000Z",
    };

    const store = createPollingStore({ lastPolledAt: SEEDED_CURSOR });

    freezeClockAt(POLL_ONE_AT);
    mockGetFolderEntries.mockResolvedValueOnce([fileA]);

    const resultOne = await poll(store);
    expect(idsOf(resultOne.payload.body.data.newFiles.data)).toEqual([
      "file_a",
    ]);
    expect(store.currentState()).toEqual({ lastPolledAt: POLL_ONE_AT });

    freezeClockAt(POLL_TWO_AT);
    mockGetFolderEntries.mockResolvedValueOnce([fileA, fileB]);

    const resultTwo = await poll(store);
    expect(idsOf(resultTwo.payload.body.data.newFiles.data)).toEqual([
      "file_b",
    ]);
    expect(store.currentState()).toEqual({ lastPolledAt: POLL_TWO_AT });

    expect(store.writes).toEqual([
      { lastPolledAt: POLL_ONE_AT },
      { lastPolledAt: POLL_TWO_AT },
    ]);
  });

  test("new file is not duplicated in the updated list even when modified_at is also after cursor", async () => {
    const store = createPollingStore({ lastPolledAt: SEEDED_CURSOR });

    freezeClockAt(POLL_ONE_AT);
    mockGetFolderEntries.mockResolvedValueOnce([
      {
        id: "file_both",
        name: "both.txt",
        type: "file",
        created_at: "2026-05-15T00:00:00.000Z",
        modified_at: "2026-05-20T00:00:00.000Z",
      },
    ]);

    const result = await poll(store);
    const data = result.payload.body.data;
    expect(idsOf(data.newFiles.data)).toEqual(["file_both"]);
    expect(data.updatedFiles.data).toEqual([]);
  });

  test("reports polledNoChanges when no records are new or updated", async () => {
    const store = createPollingStore({ lastPolledAt: SEEDED_CURSOR });

    freezeClockAt(POLL_ONE_AT);
    mockGetFolderEntries.mockResolvedValueOnce([
      {
        id: "file_stale",
        name: "stale.txt",
        type: "file",
        created_at: "2026-04-01T00:00:00.000Z",
        modified_at: "2026-04-02T00:00:00.000Z",
      },
    ]);

    const result = await poll(store);
    expect(result.payload.body.data.newFiles.data).toEqual([]);
    expect(result.payload.body.data.updatedFiles.data).toEqual([]);
    expect(result.polledNoChanges).toBe(true);
  });

  test("cold first poll with no prior state seeds the cursor and emits nothing", async () => {
    const store = createPollingStore();

    freezeClockAt(POLL_ONE_AT);
    mockGetFolderEntries.mockResolvedValueOnce([
      {
        id: "file_existing",
        name: "existing.txt",
        type: "file",
        created_at: "2026-05-31T00:00:00.000Z",
        modified_at: "2026-05-31T00:00:00.000Z",
      },
    ]);

    const result = await poll(store);
    expect(result.payload.body.data.newFiles.data).toEqual([]);
    expect(result.payload.body.data.updatedFiles.data).toEqual([]);
    expect(result.polledNoChanges).toBe(true);
    expect(store.currentState()).toEqual({ lastPolledAt: POLL_ONE_AT });
  });

  test("filters out folder-type entries", async () => {
    const store = createPollingStore({ lastPolledAt: SEEDED_CURSOR });

    freezeClockAt(POLL_ONE_AT);
    mockGetFolderEntries.mockResolvedValueOnce([
      {
        id: "folder_1",
        name: "My Folder",
        type: FOLDER_TYPE,
        created_at: "2026-05-15T00:00:00.000Z",
        modified_at: "2026-05-15T00:00:00.000Z",
      },
      {
        id: "file_real",
        name: "real.txt",
        type: "file",
        created_at: "2026-05-15T00:00:00.000Z",
        modified_at: "2026-05-15T00:00:00.000Z",
      },
    ]);

    const result = await poll(store);
    expect(idsOf(result.payload.body.data.newFiles.data)).toEqual([
      "file_real",
    ]);
  });

  test("polledNoChanges is true when the folder listing is empty", async () => {
    const store = createPollingStore({ lastPolledAt: SEEDED_CURSOR });

    freezeClockAt(POLL_ONE_AT);
    mockGetFolderEntries.mockResolvedValueOnce([]);

    const result = await poll(store);
    expect(result.payload.body.data.newFiles.data).toEqual([]);
    expect(result.payload.body.data.updatedFiles.data).toEqual([]);
    expect(result.polledNoChanges).toBe(true);
  });
});
