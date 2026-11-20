import { type Mock, vi } from "vitest";
import { defaultTriggerPayload } from "@prismatic-io/spectral/testing";
import type { DriveItem } from "../types";
import { drivePollingTrigger } from "./drivePollingTrigger";
import { folderPollingTrigger } from "./folderPollingTrigger";
import { pollSiteChanges } from "./pollSiteChanges";

const getMock: Mock = vi.fn();

vi.mock("../client", () => ({
  createClient: vi.fn(async () => ({ get: getMock })),
}));

const CREATED = "2026-01-01T00:00:00Z";
const MODIFIED = "2026-01-02T00:00:00Z";

const item = (id: string, overrides: Partial<DriveItem> = {}): DriveItem => ({
  id,
  name: `${id}.txt`,
  lastModifiedDateTime: CREATED,
  createdDateTime: CREATED,
  parentReference: { driveId: "drive-1", id: "parent-1", path: "/drives/drive-1/root:" },
  ...overrides,
});

const rootItem = (): DriveItem => ({ ...item("root"), root: {} }) as DriveItem;

const delta = (value: unknown[], link = "https://graph/delta?token=new") => ({
  data: { value, "@odata.deltaLink": link },
});

const makeCtx = (state: Record<string, unknown> = {}) => {
  const setState = vi.fn();
  return {
    setState,
    ctx: {
      logger: { debug: vi.fn() },
      debug: { enabled: false },
      polling: { getState: () => state, setState },
    } as never,
  };
};

const connection = { key: "oauth2", fields: {}, token: { access_token: "t" } } as never;
const payload = defaultTriggerPayload();

type Result = { payload: { body: { data: Record<string, unknown> } }; polledNoChanges?: boolean };

const runDrive = async (state: Record<string, unknown> = {}) => {
  const { ctx, setState } = makeCtx(state);
  const result = (await drivePollingTrigger.perform(ctx, payload, {
    connection,
    driveId: "drive-1",
  } as never)) as unknown as Result;
  return { result, setState };
};

const runFolder = async (
  state: Record<string, unknown> = {},
  includeSubfolders = false,
  folderId = "folder-1",
) => {
  const { ctx, setState } = makeCtx(state);
  const result = (await folderPollingTrigger.perform(ctx, payload, {
    connection,
    driveId: "drive-1",
    folderId,
    includeSubfolders,
  } as never)) as unknown as Result;
  return { result, setState };
};

const ids = (list: unknown) => (list as DriveItem[] | undefined)?.map((i) => i.id);

beforeEach(() => {
  getMock.mockReset();
});

describe("drivePollingTrigger", () => {
  test("first poll requests the root delta and stores the delta link under the driveId", async () => {
    getMock.mockResolvedValueOnce(delta([item("a")], "https://graph/delta?token=1"));
    const { setState } = await runDrive();

    expect(getMock.mock.calls[0][0]).toBe("/drives/drive-1/root/delta");
    expect(getMock.mock.calls[0][1].headers.Prefer).toBe("deltaExcludeParent");
    expect(setState).toHaveBeenCalledWith({ "drive-1": "https://graph/delta?token=1" });
  });

  test("second poll follows the stored delta link instead of the root delta", async () => {
    getMock.mockResolvedValueOnce(delta([], "https://graph/delta?token=2"));
    const { setState } = await runDrive({ "drive-1": "https://graph/delta?token=1" });

    expect(getMock.mock.calls[0][0]).toBe("https://graph/delta?token=1");
    expect(setState).toHaveBeenCalledWith({ "drive-1": "https://graph/delta?token=2" });
  });

  test("follows nextLink pages and still stores the final delta link", async () => {
    getMock
      .mockResolvedValueOnce({
        data: { value: [item("a")], "@odata.nextLink": "https://graph/page2" },
      })
      .mockResolvedValueOnce(delta([item("b")], "https://graph/delta?token=9"));
    const { result, setState } = await runDrive();

    expect(getMock.mock.calls[1][0]).toBe("https://graph/page2");
    expect(ids(result.payload.body.data.added)).toEqual(["a", "b"]);
    expect(setState).toHaveBeenCalledWith({ "drive-1": "https://graph/delta?token=9" });
  });

  test("classifies deleted, updated, added and skips the root item", async () => {
    getMock.mockResolvedValueOnce(
      delta([
        rootItem(),
        item("del", { deleted: { state: "deleted" }, lastModifiedDateTime: MODIFIED }),
        item("upd", { lastModifiedDateTime: MODIFIED }),
        item("add"),
      ]),
    );
    const { result } = await runDrive();
    const data = result.payload.body.data;

    expect(ids(data.deleted)).toEqual(["del"]);
    expect(ids(data.updated)).toEqual(["upd"]);
    expect(ids(data.added)).toEqual(["add"]);
    expect(data.moved).toBeUndefined();
    expect(result.polledNoChanges).toBe(false);
  });

  test("an item modified before it was created is classified nowhere", async () => {
    getMock.mockResolvedValueOnce(
      delta([item("odd", { lastModifiedDateTime: "2025-12-31T00:00:00Z" })]),
    );
    const { result } = await runDrive();
    expect(result.payload.body.data).toEqual({});
  });

  test("empty poll returns no changes and still advances the delta link", async () => {
    getMock.mockResolvedValueOnce(delta([], "https://graph/delta?token=3"));
    const { result, setState } = await runDrive({ "drive-1": "https://graph/delta?token=2" });

    expect(result.payload.body.data).toEqual({});
    expect(result.polledNoChanges).toBe(true);
    expect(setState).toHaveBeenCalledWith({ "drive-1": "https://graph/delta?token=3" });
  });
});

describe("folderPollingTrigger", () => {
  const folder = item("folder-1", {
    name: "Docs",
    folder: { childCount: 2 },
    parentReference: { driveId: "drive-1", id: "root-id", path: "/drives/drive-1/root:" },
  });
  const child = item("child", {
    parentReference: { driveId: "drive-1", id: "folder-1", path: "/drives/drive-1/root:/Docs" },
  });
  const grandchild = item("grandchild", {
    parentReference: {
      driveId: "drive-1",
      id: "sub-1",
      path: "/drives/drive-1/root:/Docs/Sub",
    },
  });
  const outside = item("outside", {
    parentReference: { driveId: "drive-1", id: "other", path: "/drives/drive-1/root:/Other" },
  });

  test("first poll stores the delta link and derived folder path under the composite keys", async () => {
    getMock.mockResolvedValueOnce(delta([folder, child], "https://graph/delta?token=1"));
    const { setState } = await runFolder();

    expect(getMock.mock.calls[0][0]).toBe("/drives/drive-1/root/delta");
    expect(setState).toHaveBeenCalledWith({
      "drive-1:folder-1": "https://graph/delta?token=1",
      "drive-1:folder-1:path": "/drives/drive-1/root:/Docs",
    });
  });

  test("second poll follows the stored delta link", async () => {
    getMock.mockResolvedValueOnce(delta([], "https://graph/delta?token=2"));
    await runFolder({
      "drive-1:folder-1": "https://graph/delta?token=1",
      "drive-1:folder-1:path": "/drives/drive-1/root:/Docs",
    });

    expect(getMock.mock.calls[0][0]).toBe("https://graph/delta?token=1");
  });

  test("direct-child mode keeps the folder itself and its direct children only", async () => {
    getMock.mockResolvedValueOnce(delta([folder, child, grandchild, outside]));
    const { result } = await runFolder({}, false);

    expect(ids(result.payload.body.data.added)).toEqual(["folder-1", "child"]);
    expect(result.polledNoChanges).toBe(false);
  });

  test("a poll whose only changes are outside the folder reports polledNoChanges true", async () => {
    getMock.mockResolvedValueOnce(delta([outside], "https://graph/delta?token=2"));
    const { result } = await runFolder({
      "drive-1:folder-1": "https://graph/delta?token=1",
      "drive-1:folder-1:path": "/drives/drive-1/root:/Docs",
    });

    expect(result.payload.body.data).toEqual({});
    expect(result.polledNoChanges).toBe(true);
  });

  test("includeSubfolders keeps the whole folder hierarchy and filters outside items", async () => {
    getMock.mockResolvedValueOnce(delta([folder, child, grandchild, outside]));
    const { result } = await runFolder({}, true);

    expect(ids(result.payload.body.data.added)).toEqual(["folder-1", "child", "grandchild"]);
  });

  test("includeSubfolders without a known folder path falls back to direct children", async () => {
    getMock.mockResolvedValueOnce(delta([child, grandchild]));
    const { result, setState } = await runFolder({}, true);

    expect(ids(result.payload.body.data.added)).toEqual(["child"]);
    expect(setState).toHaveBeenCalledWith({ "drive-1:folder-1": "https://graph/delta?token=new" });
  });

  test("the cached path is refreshed when the folder is renamed", async () => {
    const renamed = { ...folder, name: "Renamed", lastModifiedDateTime: MODIFIED };
    getMock.mockResolvedValueOnce(delta([renamed]));
    const { setState } = await runFolder({
      "drive-1:folder-1": "https://graph/delta?token=1",
      "drive-1:folder-1:path": "/drives/drive-1/root:/Docs",
    });

    expect(setState).toHaveBeenCalledWith({
      "drive-1:folder-1": "https://graph/delta?token=new",
      "drive-1:folder-1:path": "/drives/drive-1/root:/Renamed",
    });
  });

  test("the folder path falls back to /root:/<name> when the folder has no parent path", async () => {
    const noPath = {
      ...folder,
      parentReference: { driveId: "drive-1", id: "root-id" } as DriveItem["parentReference"],
    };
    getMock.mockResolvedValueOnce(delta([noPath]));
    const { setState } = await runFolder();

    expect(setState).toHaveBeenCalledWith({
      "drive-1:folder-1": "https://graph/delta?token=new",
      "drive-1:folder-1:path": "/root:/Docs",
    });
  });

  test("classifies deleted, updated, added and skips the root item inside the folder", async () => {
    const inFolder = (id: string, o: Partial<DriveItem> = {}) =>
      item(id, { parentReference: child.parentReference, ...o });
    getMock.mockResolvedValueOnce(
      delta([
        { ...rootItem(), parentReference: child.parentReference },
        inFolder("del", { deleted: { state: "deleted" }, lastModifiedDateTime: MODIFIED }),
        inFolder("upd", { lastModifiedDateTime: MODIFIED }),
        inFolder("add"),
      ]),
    );
    const { result } = await runFolder();
    const data = result.payload.body.data;

    expect(ids(data.deleted)).toEqual(["del"]);
    expect(ids(data.updated)).toEqual(["upd"]);
    expect(ids(data.added)).toEqual(["add"]);
  });

  test("includeSubfolders throws on a deleted item that lacks parentReference.path", async () => {
    const deleted = item("gone", {
      deleted: { state: "deleted" },
      parentReference: { driveId: "drive-1", id: "x" } as DriveItem["parentReference"],
    });
    getMock.mockResolvedValueOnce(delta([folder, deleted]));
    await expect(runFolder({}, true)).rejects.toThrow(TypeError);
  });

  test("empty poll returns no changes, advances the link and keeps the cached path", async () => {
    getMock.mockResolvedValueOnce(delta([], "https://graph/delta?token=2"));
    const { result, setState } = await runFolder({
      "drive-1:folder-1": "https://graph/delta?token=1",
      "drive-1:folder-1:path": "/drives/drive-1/root:/Docs",
    });

    expect(result.payload.body.data).toEqual({});
    expect(result.polledNoChanges).toBe(true);
    expect(setState).toHaveBeenCalledWith({
      "drive-1:folder-1": "https://graph/delta?token=2",
      "drive-1:folder-1:path": "/drives/drive-1/root:/Docs",
    });
  });
});

describe("pollSiteChanges", () => {
  const DRIVES_URL = "/sites/site-1/drives?$select=id,name";

  const routes = (map: Record<string, unknown>) =>
    getMock.mockImplementation(async (url: string) => {
      if (!(url in map)) throw new Error(`unmocked ${url}`);
      return map[url];
    });

  const runSite = async (state: Record<string, unknown> = {}) => {
    const { ctx, setState } = makeCtx(state);
    const result = (await pollSiteChanges.perform(ctx, payload, {
      connection,
      siteId: "site-1",
    } as never)) as unknown as Result;
    return { result, setState };
  };

  const drives = {
    data: {
      value: [
        { id: "drive-1", name: "Documents" },
        { id: "drive-2", name: "Archive" },
      ],
    },
  };

  test("first poll requests each drive's root delta and stores a link per drive id", async () => {
    routes({
      [DRIVES_URL]: drives,
      "/sites/site-1/drives/drive-1/root/delta": delta([item("a")], "https://graph/d1?t=1"),
      "/sites/site-1/drives/drive-2/root/delta": delta([item("b")], "https://graph/d2?t=1"),
    });
    const { result, setState } = await runSite();

    expect(setState).toHaveBeenCalledWith({
      "drive-1": "https://graph/d1?t=1",
      "drive-2": "https://graph/d2?t=1",
    });
    expect(Object.keys(result.payload.body.data)).toEqual(["Documents", "Archive"]);
    expect(result.polledNoChanges).toBe(false);
  });

  test("second poll uses the stored link per drive and the root delta for drives without one", async () => {
    routes({
      [DRIVES_URL]: drives,
      "https://graph/d1?t=1": delta([], "https://graph/d1?t=2"),
      "/sites/site-1/drives/drive-2/root/delta": delta([], "https://graph/d2?t=1"),
    });
    const { setState } = await runSite({ "drive-1": "https://graph/d1?t=1" });

    const urls = getMock.mock.calls.map((c) => c[0]);
    expect(urls).toContain("https://graph/d1?t=1");
    expect(urls).toContain("/sites/site-1/drives/drive-2/root/delta");
    expect(urls).not.toContain("/sites/site-1/drives/drive-1/root/delta");
    expect(setState).toHaveBeenCalledWith({
      "drive-1": "https://graph/d1?t=2",
      "drive-2": "https://graph/d2?t=1",
    });
  });

  test("drives sharing a display name keep their own delta links and every change", async () => {
    routes({
      [DRIVES_URL]: {
        data: {
          value: [
            { id: "drive-1", name: "Documents" },
            { id: "drive-2", name: "Archive" },
            { id: "drive-3", name: "Documents" },
          ],
        },
      },
      "/sites/site-1/drives/drive-1/root/delta": delta([item("a")], "https://graph/d1?t=1"),
      "/sites/site-1/drives/drive-2/root/delta": delta([item("b")], "https://graph/d2?t=1"),
      "/sites/site-1/drives/drive-3/root/delta": delta([item("c")], "https://graph/d3?t=1"),
    });
    const { result, setState } = await runSite();

    expect(setState).toHaveBeenCalledWith({
      "drive-1": "https://graph/d1?t=1",
      "drive-2": "https://graph/d2?t=1",
      "drive-3": "https://graph/d3?t=1",
    });
    const data = result.payload.body.data as Record<string, Record<string, DriveItem[]>>;
    expect(Object.keys(data)).toEqual(["Documents", "Archive"]);
    expect(ids(data.Documents.added)).toEqual(["a", "c"]);
    expect(ids(data.Archive.added)).toEqual(["b"]);
  });

  test("a stored link that points at another drive resumes that drive from now", async () => {
    const d1 = "https://graph.microsoft.com/v1.0/sites/site-1/drives/drive-1/root/delta?token=1";
    const d3 = "https://graph.microsoft.com/v1.0/sites/site-1/drives/drive-3/root/delta?token=1";
    routes({
      [DRIVES_URL]: {
        data: {
          value: [
            { id: "drive-1", name: "Documents" },
            { id: "drive-3", name: "Documents" },
          ],
        },
      },
      "/sites/site-1/drives/drive-1/root/delta?token=latest": delta([], "https://graph/d1?t=2"),
      [d3]: delta([item("c")], "https://graph/d3?t=2"),
    });
    const { ctx, setState } = makeCtx({ "drive-1": d3, "drive-3": d3 });
    const warn = vi.fn();
    (ctx as { logger: Record<string, unknown> }).logger.warn = warn;

    const result = (await pollSiteChanges.perform(ctx, payload, {
      connection,
      siteId: "site-1",
    } as never)) as unknown as Result;

    const urls = getMock.mock.calls.map((c) => c[0]);
    expect(urls.filter((url) => url === d3)).toHaveLength(1);
    expect(urls).not.toContain(d1);
    expect(warn).toHaveBeenCalledWith(expect.stringContaining("drive-1"));
    expect(setState).toHaveBeenCalledWith({
      "drive-1": "https://graph/d1?t=2",
      "drive-3": "https://graph/d3?t=2",
    });
    const data = result.payload.body.data as Record<string, Record<string, DriveItem[]>>;
    expect(ids(data.Documents.added)).toEqual(["c"]);
  });

  test("a drive with an empty result is removed from the output while others stay", async () => {
    routes({
      [DRIVES_URL]: drives,
      "/sites/site-1/drives/drive-1/root/delta": delta([item("a")], "https://graph/d1?t=1"),
      "/sites/site-1/drives/drive-2/root/delta": delta([], "https://graph/d2?t=1"),
    });
    const { result } = await runSite();

    expect(Object.keys(result.payload.body.data)).toEqual(["Documents"]);
    expect(result.polledNoChanges).toBe(false);
  });

  test("classifies deleted, updated, added and skips root items per drive", async () => {
    routes({
      [DRIVES_URL]: { data: { value: [{ id: "drive-1", name: "Documents" }] } },
      "/sites/site-1/drives/drive-1/root/delta": delta([
        rootItem(),
        item("del", { deleted: { state: "deleted" }, lastModifiedDateTime: MODIFIED }),
        item("upd", { lastModifiedDateTime: MODIFIED }),
        item("add"),
      ]),
    });
    const { result } = await runSite();
    const docs = result.payload.body.data.Documents as Record<string, DriveItem[]>;

    expect(ids(docs.deleted)).toEqual(["del"]);
    expect(ids(docs.updated)).toEqual(["upd"]);
    expect(ids(docs.added)).toEqual(["add"]);
  });

  test("empty poll reports polledNoChanges true and still advances every drive's link", async () => {
    routes({
      [DRIVES_URL]: drives,
      "/sites/site-1/drives/drive-1/root/delta": delta([], "https://graph/d1?t=2"),
      "/sites/site-1/drives/drive-2/root/delta": delta([], "https://graph/d2?t=2"),
    });
    const { result, setState } = await runSite();

    expect(result.payload.body.data).toEqual({});
    expect(result.polledNoChanges).toBe(true);
    expect(setState).toHaveBeenCalledWith({
      "drive-1": "https://graph/d1?t=2",
      "drive-2": "https://graph/d2?t=2",
    });
  });
});
