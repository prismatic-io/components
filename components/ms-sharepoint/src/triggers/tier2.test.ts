import { type Mock, vi } from "vitest";
import { defaultTriggerPayload } from "@prismatic-io/spectral/dist/testing";
import type { DriveItem } from "../interfaces";
import { drivePollingTrigger } from "./drivePollingTrigger";
import { folderPollingTrigger } from "./folderPollingTrigger";
import { pollSiteChanges } from "./pollSiteChanges";
const getMock: Mock = vi.fn();
vi.mock("../client", () => ({
  createClient: vi.fn(async () => ({ get: getMock })),
}));
const CREATED = "2026-01-01T00:00:00Z";
const item = (id: string, overrides: Partial<DriveItem> = {}): DriveItem => ({
  id,
  name: `${id}.txt`,
  lastModifiedDateTime: CREATED,
  createdDateTime: CREATED,
  parentReference: {
    driveId: "drive-1",
    id: "folder-1",
    path: "/drives/drive-1/root:",
  },
  ...overrides,
});
const nextPage = (value: unknown[], nextLink: string) => ({
  data: { value, "@odata.nextLink": nextLink },
});
const finalPage = (value: unknown[], deltaLink: string) => ({
  data: { value, "@odata.deltaLink": deltaLink },
});
const gone = (location?: string) =>
  Object.assign(new Error("Request failed with status code 410"), {
    response: { status: 410, headers: location ? { location } : {} },
  });
type Round = {
  payload: {
    paginationState?: unknown;
    body: {
      data: Record<string, unknown>;
    };
  };
  polledNoChanges?: boolean;
};
const makeCtx = (state: Record<string, unknown>, batching: boolean) => {
  const setState = vi.fn();
  return {
    setState,
    ctx: {
      logger: { debug: vi.fn(), info: vi.fn() },
      debug: { enabled: false },
      polling: { getState: () => state, setState },
      ...(batching ? { batch: { enabled: true } } : {}),
    } as never,
  };
};
const connection = {
  key: "oauth2",
  fields: {},
  token: { access_token: "t" },
} as never;
const ids = (list: unknown) =>
  (list as DriveItem[] | undefined)?.map((i) => i.id);
beforeEach(() => {
  getMock.mockReset();
});
describe.each([
  ["drivePollingTrigger", drivePollingTrigger],
  ["folderPollingTrigger", folderPollingTrigger],
  ["pollSiteChanges", pollSiteChanges],
])("%s Tier 2 declaration", (_name, trigger) => {
  test("getNextPaginationState echoes the round's paginationState", () => {
    const resolver = trigger.triggerResolver?.getNextPaginationState;
    expect(resolver).toBeInstanceOf(Function);
    expect(
      resolver?.(
        {} as never,
        { payload: { paginationState: { nextLink: "x" } } } as never,
      ),
    ).toEqual({ nextLink: "x" });
    expect(resolver?.({} as never, { payload: {} } as never)).toBeNull();
  });
});
describe("drivePollingTrigger batched drain", () => {
  const runRound = async (
    state: Record<string, unknown>,
    paginationState: unknown,
    batching = true,
  ) => {
    const { ctx, setState } = makeCtx(state, batching);
    const round = (await drivePollingTrigger.perform(
      ctx,
      { ...defaultTriggerPayload(), paginationState } as never,
      { connection, driveId: "drive-1" } as never,
    )) as unknown as Round;
    return { round, setState };
  };
  test("drains three delta pages one per round, holding the nextLink until the deltaLink arrives", async () => {
    getMock
      .mockResolvedValueOnce(nextPage([item("a")], "https://graph/page2"))
      .mockResolvedValueOnce(nextPage([item("b")], "https://graph/page3"))
      .mockResolvedValueOnce(
        finalPage([item("c")], "https://graph/delta?token=9"),
      );
    const r1 = await runRound({}, undefined);
    expect(getMock).toHaveBeenCalledTimes(1);
    expect(getMock.mock.calls[0][0]).toBe("/drives/drive-1/root/delta");
    expect(r1.round.payload.paginationState).toEqual({
      nextLink: "https://graph/page2",
    });
    expect(ids(r1.round.payload.body.data.added)).toEqual(["a"]);
    expect(r1.setState).toHaveBeenCalledWith({
      "drive-1:nextLink": "https://graph/page2",
    });
    expect(r1.round.polledNoChanges).not.toBe(true);
    const s1 = r1.setState.mock.calls[0][0];
    const r2 = await runRound(s1, r1.round.payload.paginationState);
    expect(getMock).toHaveBeenCalledTimes(2);
    expect(getMock.mock.calls[1][0]).toBe("https://graph/page2");
    expect(r2.round.payload.paginationState).toEqual({
      nextLink: "https://graph/page3",
    });
    expect(ids(r2.round.payload.body.data.added)).toEqual(["b"]);
    expect(r2.setState).toHaveBeenCalledWith({
      "drive-1:nextLink": "https://graph/page3",
    });
    const s2 = r2.setState.mock.calls[0][0];
    const r3 = await runRound(s2, r2.round.payload.paginationState);
    expect(getMock.mock.calls[2][0]).toBe("https://graph/page3");
    expect(r3.round.payload.paginationState).toBeUndefined();
    expect(ids(r3.round.payload.body.data.added)).toEqual(["c"]);
    expect(r3.setState).toHaveBeenCalledWith({
      "drive-1": "https://graph/delta?token=9",
    });
  });
  test("keeps the committed deltaLink untouched while a later walk is mid-drain", async () => {
    getMock.mockResolvedValueOnce(nextPage([item("a")], "https://graph/page2"));
    const { setState } = await runRound(
      { "drive-1": "https://graph/delta?token=1" },
      undefined,
    );
    expect(getMock.mock.calls[0][0]).toBe("https://graph/delta?token=1");
    expect(setState).toHaveBeenCalledWith({
      "drive-1": "https://graph/delta?token=1",
      "drive-1:nextLink": "https://graph/page2",
    });
  });
  test("a recurrence resumes a stored nextLink when no paginationState arrives", async () => {
    getMock.mockResolvedValueOnce(finalPage([], "https://graph/delta?token=2"));
    await runRound(
      {
        "drive-1": "https://graph/delta?token=1",
        "drive-1:nextLink": "https://graph/page2",
      },
      undefined,
    );
    expect(getMock.mock.calls[0][0]).toBe("https://graph/page2");
  });
  test("never reports polledNoChanges on a platform-driven round", async () => {
    getMock.mockResolvedValueOnce(finalPage([], "https://graph/delta?token=2"));
    const { round } = await runRound({}, { nextLink: "https://graph/page2" });
    expect(round.polledNoChanges).not.toBe(true);
  });
  test("410 Gone restarts the enumeration from the Location header", async () => {
    getMock
      .mockRejectedValueOnce(gone("https://graph/delta?resync=1"))
      .mockResolvedValueOnce(
        finalPage([item("a")], "https://graph/delta?token=3"),
      );
    const { round, setState } = await runRound(
      { "drive-1": "https://graph/delta?token=stale" },
      undefined,
    );
    expect(getMock.mock.calls[0][0]).toBe("https://graph/delta?token=stale");
    expect(getMock.mock.calls[1][0]).toBe("https://graph/delta?resync=1");
    expect(ids(round.payload.body.data.added)).toEqual(["a"]);
    expect(setState).toHaveBeenCalledWith({
      "drive-1": "https://graph/delta?token=3",
    });
  });
  test("410 Gone with no Location header restarts from the drive's root delta", async () => {
    getMock
      .mockRejectedValueOnce(gone())
      .mockResolvedValueOnce(finalPage([], "https://graph/delta?token=3"));
    await runRound({}, { nextLink: "https://graph/page-stale" });
    expect(getMock.mock.calls[1][0]).toBe("/drives/drive-1/root/delta");
  });
  test("errors other than 410 still fail the round", async () => {
    getMock.mockRejectedValueOnce(
      Object.assign(new Error("boom"), {
        response: { status: 500, headers: {} },
      }),
    );
    await expect(runRound({}, undefined)).rejects.toThrow("boom");
    expect(getMock).toHaveBeenCalledTimes(1);
  });
  test("unbatched still walks every page to the deltaLink in one execution", async () => {
    getMock
      .mockResolvedValueOnce(nextPage([item("a")], "https://graph/page2"))
      .mockResolvedValueOnce(nextPage([item("b")], "https://graph/page3"))
      .mockResolvedValueOnce(
        finalPage([item("c")], "https://graph/delta?token=9"),
      );
    const { round, setState } = await runRound({}, undefined, false);
    expect(getMock).toHaveBeenCalledTimes(3);
    expect(round.payload.paginationState).toBeUndefined();
    expect(ids(round.payload.body.data.added)).toEqual(["a", "b", "c"]);
    expect(setState).toHaveBeenCalledWith({
      "drive-1": "https://graph/delta?token=9",
    });
  });
  test("unbatched resumes a nextLink a batched round left behind", async () => {
    getMock.mockResolvedValueOnce(
      finalPage([item("c")], "https://graph/delta?token=9"),
    );
    const { setState } = await runRound(
      {
        "drive-1": "https://graph/delta?token=1",
        "drive-1:nextLink": "https://graph/page3",
      },
      undefined,
      false,
    );
    expect(getMock.mock.calls[0][0]).toBe("https://graph/page3");
    expect(setState).toHaveBeenCalledWith({
      "drive-1": "https://graph/delta?token=9",
    });
  });
});
describe("folderPollingTrigger batched drain", () => {
  const folder = item("folder-1", {
    name: "Docs",
    folder: { childCount: 2 },
    parentReference: {
      driveId: "drive-1",
      id: "root-id",
      path: "/drives/drive-1/root:",
    },
  });
  const child = (id: string) =>
    item(id, {
      parentReference: {
        driveId: "drive-1",
        id: "folder-1",
        path: "/drives/drive-1/root:/Docs",
      },
    });
  const outside = item("outside", {
    parentReference: {
      driveId: "drive-1",
      id: "other",
      path: "/drives/drive-1/root:/Other",
    },
  });
  const runRound = async (
    state: Record<string, unknown>,
    paginationState: unknown,
    batching = true,
  ) => {
    const { ctx, setState } = makeCtx(state, batching);
    const round = (await folderPollingTrigger.perform(
      ctx,
      { ...defaultTriggerPayload(), paginationState } as never,
      {
        connection,
        driveId: "drive-1",
        folderId: "folder-1",
        includeSubfolders: false,
      } as never,
    )) as unknown as Round;
    return { round, setState };
  };
  test("drains the drive delta one page per round and filters each page to the folder", async () => {
    getMock
      .mockResolvedValueOnce(
        nextPage([folder, child("c1"), outside], "https://graph/page2"),
      )
      .mockResolvedValueOnce(
        finalPage([child("c2")], "https://graph/delta?token=9"),
      );
    const r1 = await runRound({}, undefined);
    expect(getMock).toHaveBeenCalledTimes(1);
    expect(r1.round.payload.paginationState).toEqual({
      nextLink: "https://graph/page2",
    });
    expect(ids(r1.round.payload.body.data.added)).toEqual(["folder-1", "c1"]);
    expect(r1.setState).toHaveBeenCalledWith({
      "drive-1:folder-1:nextLink": "https://graph/page2",
      "drive-1:folder-1:path": "/drives/drive-1/root:/Docs",
    });
    const r2 = await runRound(
      r1.setState.mock.calls[0][0],
      r1.round.payload.paginationState,
    );
    expect(getMock.mock.calls[1][0]).toBe("https://graph/page2");
    expect(r2.round.payload.paginationState).toBeUndefined();
    expect(ids(r2.round.payload.body.data.added)).toEqual(["c2"]);
    expect(r2.setState).toHaveBeenCalledWith({
      "drive-1:folder-1": "https://graph/delta?token=9",
      "drive-1:folder-1:path": "/drives/drive-1/root:/Docs",
    });
  });
  test("410 Gone restarts from the Location header", async () => {
    getMock
      .mockRejectedValueOnce(gone("https://graph/delta?resync=1"))
      .mockResolvedValueOnce(
        finalPage([child("c1")], "https://graph/delta?token=3"),
      );
    const { round } = await runRound(
      { "drive-1:folder-1": "https://graph/delta?stale" },
      undefined,
    );
    expect(getMock.mock.calls[1][0]).toBe("https://graph/delta?resync=1");
    expect(ids(round.payload.body.data.added)).toEqual(["c1"]);
  });
  test("unbatched still walks every page in one execution", async () => {
    getMock
      .mockResolvedValueOnce(
        nextPage([folder, child("c1")], "https://graph/page2"),
      )
      .mockResolvedValueOnce(
        finalPage([child("c2")], "https://graph/delta?token=9"),
      );
    const { round } = await runRound({}, undefined, false);
    expect(getMock).toHaveBeenCalledTimes(2);
    expect(round.payload.paginationState).toBeUndefined();
    expect(ids(round.payload.body.data.added)).toEqual([
      "folder-1",
      "c1",
      "c2",
    ]);
  });
});
describe("pollSiteChanges batched drain", () => {
  const drives = {
    data: {
      value: [
        { id: "drive-1", name: "Documents" },
        { id: "drive-2", name: "Archive" },
      ],
    },
  };
  const runRound = async (
    state: Record<string, unknown>,
    paginationState: unknown,
    batching = true,
  ) => {
    const { ctx, setState } = makeCtx(state, batching);
    const round = (await pollSiteChanges.perform(
      ctx,
      { ...defaultTriggerPayload(), paginationState } as never,
      { connection, siteId: "site-1" } as never,
    )) as unknown as Round;
    return { round, setState };
  };
  test("walks one drive page per round and keeps a per-drive cursor", async () => {
    getMock
      .mockResolvedValueOnce(drives)
      .mockResolvedValueOnce(nextPage([item("a")], "https://graph/d1/page2"))
      .mockResolvedValueOnce(drives)
      .mockResolvedValueOnce(
        finalPage([item("b")], "https://graph/d1/delta?token=1"),
      )
      .mockResolvedValueOnce(drives)
      .mockResolvedValueOnce(
        finalPage([item("c")], "https://graph/d2/delta?token=1"),
      );
    const r1 = await runRound(
      { "drive-2": "https://graph/d2/delta?token=0" },
      undefined,
    );
    expect(getMock.mock.calls[1][0]).toBe(
      "/sites/site-1/drives/drive-1/root/delta",
    );
    expect(r1.round.payload.paginationState).toEqual({
      remaining: ["drive-1", "drive-2"],
      nextLink: "https://graph/d1/page2",
    });
    expect(
      ids(
        (r1.round.payload.body.data.Documents as Record<string, unknown>).added,
      ),
    ).toEqual(["a"]);
    expect(r1.round.payload.body.data.Archive).toBeUndefined();
    expect(r1.round.polledNoChanges).toBe(false);
    expect(r1.setState).toHaveBeenCalledWith({
      "drive-1:nextLink": "https://graph/d1/page2",
      "drive-2": "https://graph/d2/delta?token=0",
    });
    const r2 = await runRound(
      r1.setState.mock.calls[0][0],
      r1.round.payload.paginationState,
    );
    expect(getMock.mock.calls[3][0]).toBe("https://graph/d1/page2");
    expect(r2.round.payload.paginationState).toEqual({
      remaining: ["drive-2"],
    });
    expect(r2.setState).toHaveBeenCalledWith({
      "drive-1": "https://graph/d1/delta?token=1",
      "drive-2": "https://graph/d2/delta?token=0",
    });
    const r3 = await runRound(
      r2.setState.mock.calls[0][0],
      r2.round.payload.paginationState,
    );
    expect(getMock.mock.calls[5][0]).toBe("https://graph/d2/delta?token=0");
    expect(r3.round.payload.paginationState).toBeUndefined();
    expect(
      ids(
        (r3.round.payload.body.data.Archive as Record<string, unknown>).added,
      ),
    ).toEqual(["c"]);
    expect(r3.setState).toHaveBeenCalledWith({
      "drive-1": "https://graph/d1/delta?token=1",
      "drive-2": "https://graph/d2/delta?token=1",
    });
  });
  test("a drive with no changes is passed over within the same round", async () => {
    getMock
      .mockResolvedValueOnce(drives)
      .mockResolvedValueOnce(finalPage([], "https://graph/d1/delta?token=1"))
      .mockResolvedValueOnce(
        finalPage([item("c")], "https://graph/d2/delta?token=1"),
      );
    const { round, setState } = await runRound({}, undefined);
    expect(getMock).toHaveBeenCalledTimes(3);
    expect(round.payload.paginationState).toBeUndefined();
    expect(Object.keys(round.payload.body.data)).toEqual(["Archive"]);
    expect(setState).toHaveBeenCalledWith({
      "drive-1": "https://graph/d1/delta?token=1",
      "drive-2": "https://graph/d2/delta?token=1",
    });
  });
  test("an empty first round reports polledNoChanges, a platform-driven round never does", async () => {
    getMock
      .mockResolvedValueOnce(drives)
      .mockResolvedValueOnce(finalPage([], "https://graph/d1/delta?token=1"))
      .mockResolvedValueOnce(finalPage([], "https://graph/d2/delta?token=1"));
    const first = await runRound({}, undefined);
    expect(first.round.polledNoChanges).toBe(true);
    getMock
      .mockResolvedValueOnce(drives)
      .mockResolvedValueOnce(finalPage([], "https://graph/d2/delta?token=2"));
    const driven = await runRound({}, { remaining: ["drive-2"] });
    expect(driven.round.polledNoChanges).not.toBe(true);
  });
  test("a drive removed from the site mid-drain is skipped", async () => {
    getMock
      .mockResolvedValueOnce({
        data: { value: [{ id: "drive-2", name: "Archive" }] },
      })
      .mockResolvedValueOnce(
        finalPage([item("c")], "https://graph/d2/delta?token=1"),
      );
    const { round } = await runRound(
      {},
      { remaining: ["drive-1", "drive-2"], nextLink: "x" },
    );
    expect(getMock.mock.calls[1][0]).toBe(
      "/sites/site-1/drives/drive-2/root/delta",
    );
    expect(round.payload.paginationState).toBeUndefined();
  });
  test("410 Gone restarts that drive from the Location header", async () => {
    getMock
      .mockResolvedValueOnce({
        data: { value: [{ id: "drive-1", name: "Documents" }] },
      })
      .mockRejectedValueOnce(gone("https://graph/d1/resync"))
      .mockResolvedValueOnce(
        finalPage([item("a")], "https://graph/d1/delta?token=5"),
      );
    const { setState } = await runRound(
      { "drive-1": "https://graph/d1/stale" },
      undefined,
    );
    expect(getMock.mock.calls[2][0]).toBe("https://graph/d1/resync");
    expect(setState).toHaveBeenCalledWith({
      "drive-1": "https://graph/d1/delta?token=5",
    });
  });
  test("unbatched still walks every drive to its deltaLink in one execution", async () => {
    getMock.mockImplementation(async (url: string) => {
      if (url.startsWith("/sites/site-1/drives?")) return drives;
      if (url === "/sites/site-1/drives/drive-1/root/delta")
        return nextPage([item("a")], "https://graph/d1/page2");
      if (url === "https://graph/d1/page2")
        return finalPage([item("b")], "https://graph/d1/d");
      return finalPage([item("c")], "https://graph/d2/d");
    });
    const { round, setState } = await runRound({}, undefined, false);
    expect(round.payload.paginationState).toBeUndefined();
    expect(
      ids((round.payload.body.data.Documents as Record<string, unknown>).added),
    ).toEqual(["a", "b"]);
    expect(
      ids((round.payload.body.data.Archive as Record<string, unknown>).added),
    ).toEqual(["c"]);
    expect(setState).toHaveBeenCalledWith({
      "drive-1": "https://graph/d1/d",
      "drive-2": "https://graph/d2/d",
    });
  });
});
