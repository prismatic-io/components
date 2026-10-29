import type { ActionContext } from "@prismatic-io/spectral";
import { invokeTrigger } from "@prismatic-io/spectral/dist/testing";
import type { FileEntry, FileMap } from "../types";
import { newOrModifiedFiles } from "./newOrModifiedFiles";

const mockClose = vi.fn();
const mockListFilesRecursive =
  vi.fn<
    (
      client: unknown,
      path: string,
      pattern: string | undefined,
      recursive: boolean,
      fileMap: FileMap,
    ) => Promise<void>
  >();

vi.mock("../client", () => ({
  createClient: vi
    .fn()
    .mockResolvedValue({ close: (...args: unknown[]) => mockClose(...args) }),
}));

vi.mock("../util", async (importOriginal) => {
  const actual = await importOriginal<typeof import("../util")>();
  return {
    ...actual,
    listFilesRecursive: (...args: unknown[]) =>
      mockListFilesRecursive(
        ...(args as Parameters<typeof mockListFilesRecursive>),
      ),
  };
});

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

const triggerUnderTest = {
  perform: newOrModifiedFiles.perform,
} as unknown as Parameters<typeof invokeTrigger>[0];

interface PollChanges {
  newFiles: FileEntry[];
  modifiedFiles: FileEntry[];
}
interface PollResult {
  payload: { body: { data: PollChanges } };
  polledNoChanges: boolean;
}

const poll = async (store: PollingStore): Promise<PollResult> => {
  const { result } = await invokeTrigger(
    triggerUnderTest,
    store.context,
    undefined,
    {
      connection: {},
      path: "/uploads",
      pattern: undefined,
      includeSubdirectories: false,
    } as unknown as Parameters<typeof invokeTrigger>[3],
  );
  return result as unknown as PollResult;
};

describe("newOrModifiedFiles", () => {
  afterEach(() => {
    mockListFilesRecursive.mockReset();
    mockClose.mockReset();
  });

  test("first poll reports all files as new", async () => {
    const store = createPollingStore();

    mockListFilesRecursive.mockImplementationOnce(
      async (_c, _p, _pat, _r, fileMap) => {
        fileMap["/uploads/a.txt"] = { size: 100, modifiedAt: 1000 };
        fileMap["/uploads/b.txt"] = { size: 200, modifiedAt: 2000 };
      },
    );

    const result = await poll(store);

    expect(result.payload.body.data.newFiles).toEqual([
      { path: "/uploads/a.txt", size: 100, modifiedAt: 1000 },
      { path: "/uploads/b.txt", size: 200, modifiedAt: 2000 },
    ]);
    expect(result.payload.body.data.modifiedFiles).toEqual([]);
    expect(result.polledNoChanges).toBe(false);
    expect(mockClose).toHaveBeenCalled();
  });

  test("second poll with unchanged files reports no changes", async () => {
    const previousFileMap: FileMap = {
      "/uploads/a.txt": { size: 100, modifiedAt: 1000 },
    };
    const store = createPollingStore({ fileMap: previousFileMap });

    mockListFilesRecursive.mockImplementationOnce(
      async (_c, _p, _pat, _r, fileMap) => {
        fileMap["/uploads/a.txt"] = { size: 100, modifiedAt: 1000 };
      },
    );

    const result = await poll(store);

    expect(result.payload.body.data.newFiles).toEqual([]);
    expect(result.payload.body.data.modifiedFiles).toEqual([]);
    expect(result.polledNoChanges).toBe(true);
  });

  test("detects new and modified files on subsequent polls", async () => {
    const previousFileMap: FileMap = {
      "/uploads/a.txt": { size: 100, modifiedAt: 1000 },
    };
    const store = createPollingStore({ fileMap: previousFileMap });

    mockListFilesRecursive.mockImplementationOnce(
      async (_c, _p, _pat, _r, fileMap) => {
        fileMap["/uploads/a.txt"] = { size: 150, modifiedAt: 3000 };
        fileMap["/uploads/c.txt"] = { size: 300, modifiedAt: 4000 };
      },
    );

    const result = await poll(store);

    expect(result.payload.body.data.newFiles).toEqual([
      { path: "/uploads/c.txt", size: 300, modifiedAt: 4000 },
    ]);
    expect(result.payload.body.data.modifiedFiles).toEqual([
      { path: "/uploads/a.txt", size: 150, modifiedAt: 3000 },
    ]);
    expect(result.polledNoChanges).toBe(false);
  });

  test("persists the file map to polling state", async () => {
    const store = createPollingStore();

    mockListFilesRecursive.mockImplementationOnce(
      async (_c, _p, _pat, _r, fileMap) => {
        fileMap["/uploads/a.txt"] = { size: 100, modifiedAt: 1000 };
      },
    );

    await poll(store);

    expect(store.currentState()).toEqual({
      fileMap: { "/uploads/a.txt": { size: 100, modifiedAt: 1000 } },
    });
  });

  test("closes the FTP client even when listing is empty", async () => {
    const store = createPollingStore();
    mockListFilesRecursive.mockResolvedValueOnce(undefined);

    await poll(store);

    expect((result) => result);
    expect(mockClose).toHaveBeenCalled();
  });
});
