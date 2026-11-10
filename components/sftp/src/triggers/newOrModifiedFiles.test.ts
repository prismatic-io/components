import { defaultTriggerPayload } from "@prismatic-io/spectral/testing";
import { beforeEach, vi } from "vitest";
import type { FileChangesObject, FileEntry, PollingState } from "../types";
import { resolveFileChanges } from "../util";
import { newOrModifiedFiles } from "./newOrModifiedFiles";

const { getSftpClient } = vi.hoisted(() => ({ getSftpClient: vi.fn() }));
vi.mock("../client", () => ({ getSftpClient }));

const newFile: FileEntry = {
  path: "/uploads/incoming/report-2026-02-11.csv",
  size: 24576,
  modifiedAt: 1739308800000,
};
const modifiedFile: FileEntry = {
  path: "/uploads/incoming/daily-log.txt",
  size: 102400,
  modifiedAt: 1739312400000,
};

describe("newOrModifiedFiles batching", () => {
  test("New or Modified Files is opt-in batchable with a default batch size", () => {
    expect(newOrModifiedFiles.triggerResolverSupport).toBe("valid");
    expect(newOrModifiedFiles.batchConfig).toEqual({ batchSize: 50 });
    expect(newOrModifiedFiles.triggerResolver?.resolveItems).toBeInstanceOf(
      Function,
    );
  });

  test("resolveFileChanges tags every file with how it changed", () => {
    expect(
      resolveFileChanges({
        newFiles: [newFile],
        modifiedFiles: [modifiedFile],
      }),
    ).toEqual([
      { changeType: "new", record: newFile },
      { changeType: "modified", record: modifiedFile },
    ]);
  });

  test("resolveFileChanges returns [] for empty or undefined changes", () => {
    expect(resolveFileChanges({ newFiles: [], modifiedFiles: [] })).toEqual([]);
    expect(resolveFileChanges(undefined)).toEqual([]);
  });

  test("resolveItems flattens the payload shape perform actually returns", () => {
    const payload = {
      ...defaultTriggerPayload(),
      body: { data: { newFiles: [newFile], modifiedFiles: [modifiedFile] } },
    };
    expect(
      newOrModifiedFiles.triggerResolver?.resolveItems?.({} as never, {
        payload,
      }),
    ).toEqual([
      { changeType: "new", record: newFile },
      { changeType: "modified", record: modifiedFile },
    ]);
  });
});

describe("newOrModifiedFiles polling state", () => {
  type Listing = {
    name: string;
    type: string;
    size: number;
    modifyTime: number;
  }[];

  let store: PollingState | undefined;
  let listing: Listing;

  const context = () =>
    ({
      debug: { enabled: false },
      polling: {
        getState: () => store,
        setState: (next: PollingState) => {
          store = next;
        },
      },
    }) as unknown as Parameters<typeof newOrModifiedFiles.perform>[0];

  const params = {
    connection: {} as never,
    path: "/uploads/incoming",
    pattern: "",
    includeSubdirectories: false,
  } as unknown as Parameters<typeof newOrModifiedFiles.perform>[2];

  const poll = async () => {
    const result = await newOrModifiedFiles.perform(
      context(),
      defaultTriggerPayload() as Parameters<
        typeof newOrModifiedFiles.perform
      >[1],
      params,
    );
    return result as unknown as {
      payload: { body: { data: FileChangesObject } };
      polledNoChanges: boolean;
    };
  };

  beforeEach(() => {
    store = undefined;
    listing = [
      {
        name: "report-2026-02-11.csv",
        type: "-",
        size: 24576,
        modifyTime: 1739308800000,
      },
      {
        name: "daily-log.txt",
        type: "-",
        size: 102400,
        modifyTime: 1739312400000,
      },
    ];
    getSftpClient.mockResolvedValue({
      list: vi.fn(async () => listing),
      end: vi.fn(async () => undefined),
    });
  });

  test("first poll on an empty store reports every file as new and snapshots the listing", async () => {
    const result = await poll();

    expect(result.payload.body.data.newFiles).toEqual([
      {
        path: "/uploads/incoming/report-2026-02-11.csv",
        size: 24576,
        modifiedAt: 1739308800000,
      },
      {
        path: "/uploads/incoming/daily-log.txt",
        size: 102400,
        modifiedAt: 1739312400000,
      },
    ]);
    expect(result.payload.body.data.modifiedFiles).toEqual([]);
    expect(result.polledNoChanges).toBe(false);
    expect(store).toEqual({
      fileMap: {
        "/uploads/incoming/report-2026-02-11.csv": {
          size: 24576,
          modifiedAt: 1739308800000,
        },
        "/uploads/incoming/daily-log.txt": {
          size: 102400,
          modifiedAt: 1739312400000,
        },
      },
    });
  });

  test("an unchanged listing emits nothing, and a changed file is reported as modified only", async () => {
    await poll();

    const second = await poll();
    expect(second.payload.body.data.newFiles).toEqual([]);
    expect(second.payload.body.data.modifiedFiles).toEqual([]);
    expect(second.polledNoChanges).toBe(true);

    listing = [
      listing[0],
      { ...listing[1], size: 204800, modifyTime: 1739316000000 },
    ];
    const third = await poll();
    expect(third.payload.body.data.newFiles).toEqual([]);
    expect(third.payload.body.data.modifiedFiles).toEqual([
      {
        path: "/uploads/incoming/daily-log.txt",
        size: 204800,
        modifiedAt: 1739316000000,
      },
    ]);
    expect(third.polledNoChanges).toBe(false);
  });
});

describe("newOrModifiedFiles batching resolver", () => {
  test("resolveFileChanges tolerates an absent envelope key and a single absent array", () => {
    expect(resolveFileChanges({} as FileChangesObject)).toEqual([]);
    expect(
      resolveFileChanges({
        newFiles: [newFile],
      } as unknown as FileChangesObject),
    ).toEqual([{ changeType: "new", record: newFile }]);
    expect(
      resolveFileChanges({
        modifiedFiles: [modifiedFile],
      } as unknown as FileChangesObject),
    ).toEqual([{ changeType: "modified", record: modifiedFile }]);
  });

  test("resolveItems output chunks into batches of the declared batchSize", () => {
    const files = Array.from(
      { length: 120 },
      (_, i): FileEntry => ({
        path: `/uploads/incoming/file-${i}.csv`,
        size: 1024 + i,
        modifiedAt: 1739308800000 + i,
      }),
    );
    const payload = {
      ...defaultTriggerPayload(),
      body: {
        data: {
          newFiles: files.slice(0, 100),
          modifiedFiles: files.slice(100),
        },
      },
    };
    const items =
      newOrModifiedFiles.triggerResolver?.resolveItems?.({} as never, {
        payload,
      }) ?? [];

    const chunk = <T>(arr: T[], size: number): T[][] =>
      Array.from({ length: Math.ceil(arr.length / size) }, (_, i) =>
        arr.slice(i * size, (i + 1) * size),
      );
    const batches = chunk(
      items,
      newOrModifiedFiles.batchConfig?.batchSize ?? 0,
    );

    expect(items).toHaveLength(120);
    expect(batches.map((b) => b.length)).toEqual([50, 50, 20]);
    expect(batches[2][0]).toEqual({
      changeType: "modified",
      record: files[100],
    });
  });
});
