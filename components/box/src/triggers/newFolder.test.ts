import {
  createConnection,
  invokeTrigger,
} from "@prismatic-io/spectral/dist/testing";
import { apiKey } from "../connections";
import { FOLDER_TYPE } from "../constants";
import type { PollingState } from "../types";
import { newFolder } from "./newFolder";
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
  perform: newFolder.perform,
} as unknown as Parameters<typeof invokeTrigger>[0];
interface PollResult {
  payload: {
    body: {
      data: {
        newFolders: {
          data: Record<string, unknown>[];
          polledNoChanges: boolean;
        };
      };
    };
  };
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
describe("newFolder", () => {
  afterEach(() => {
    vi.useRealTimers();
    mockGetFolderEntries.mockReset();
  });
  test("advances the cursor and suppresses folders the previous poll already emitted", async () => {
    const folderOld = {
      id: "f_old",
      name: "Old Folder",
      type: FOLDER_TYPE,
      created_at: "2026-05-15T00:00:00.000Z",
    };
    const folderNew = {
      id: "f_new",
      name: "New Folder",
      type: FOLDER_TYPE,
      created_at: "2026-06-01T12:30:00.000Z",
    };
    const store = createPollingStore({ lastPolledAt: SEEDED_CURSOR });
    freezeClockAt(POLL_ONE_AT);
    mockGetFolderEntries.mockResolvedValueOnce([folderOld]);
    const resultOne = await poll(store);
    expect(
      resultOne.payload.body.data.newFolders.data.map((f) => f.id),
    ).toEqual(["f_old"]);
    expect(resultOne.polledNoChanges).toBe(false);
    expect(store.currentState()).toEqual({ lastPolledAt: POLL_ONE_AT });
    freezeClockAt(POLL_TWO_AT);
    mockGetFolderEntries.mockResolvedValueOnce([folderOld, folderNew]);
    const resultTwo = await poll(store);
    expect(
      resultTwo.payload.body.data.newFolders.data.map((f) => f.id),
    ).toEqual(["f_new"]);
    expect(resultTwo.polledNoChanges).toBe(false);
    expect(store.currentState()).toEqual({ lastPolledAt: POLL_TWO_AT });
    expect(store.writes).toEqual([
      { lastPolledAt: POLL_ONE_AT },
      { lastPolledAt: POLL_TWO_AT },
    ]);
  });
  test("reports polledNoChanges when no folders match the cursor window", async () => {
    const store = createPollingStore({ lastPolledAt: SEEDED_CURSOR });
    freezeClockAt(POLL_ONE_AT);
    mockGetFolderEntries.mockResolvedValueOnce([
      {
        id: "f_stale",
        name: "Stale",
        type: FOLDER_TYPE,
        created_at: "2026-04-01T00:00:00.000Z",
      },
    ]);
    const result = await poll(store);
    expect(result.payload.body.data.newFolders.data).toEqual([]);
    expect(result.polledNoChanges).toBe(true);
    expect(store.currentState()).toEqual({ lastPolledAt: POLL_ONE_AT });
  });
  test("cold first poll with no prior state seeds the cursor and emits nothing", async () => {
    const store = createPollingStore();
    freezeClockAt(POLL_ONE_AT);
    mockGetFolderEntries.mockResolvedValueOnce([
      {
        id: "f_existing",
        name: "Existing",
        type: FOLDER_TYPE,
        created_at: "2026-05-31T00:00:00.000Z",
      },
    ]);
    const result = await poll(store);
    expect(result.payload.body.data.newFolders.data).toEqual([]);
    expect(result.polledNoChanges).toBe(true);
    expect(store.currentState()).toEqual({ lastPolledAt: POLL_ONE_AT });
  });
  test("filters out non-folder entries", async () => {
    const store = createPollingStore({ lastPolledAt: SEEDED_CURSOR });
    freezeClockAt(POLL_ONE_AT);
    mockGetFolderEntries.mockResolvedValueOnce([
      {
        id: "file_1",
        name: "readme.txt",
        type: "file",
        created_at: "2026-05-15T00:00:00.000Z",
      },
      {
        id: "f_real",
        name: "Real Folder",
        type: FOLDER_TYPE,
        created_at: "2026-05-15T00:00:00.000Z",
      },
    ]);
    const result = await poll(store);
    expect(result.payload.body.data.newFolders.data.map((f) => f.id)).toEqual([
      "f_real",
    ]);
  });
  test("polledNoChanges is true when the folder listing is empty", async () => {
    const store = createPollingStore({ lastPolledAt: SEEDED_CURSOR });
    freezeClockAt(POLL_ONE_AT);
    mockGetFolderEntries.mockResolvedValueOnce([]);
    const result = await poll(store);
    expect(result.payload.body.data.newFolders.data).toEqual([]);
    expect(result.polledNoChanges).toBe(true);
  });
});
