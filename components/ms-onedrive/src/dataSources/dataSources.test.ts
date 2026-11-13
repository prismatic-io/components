import { type Mock, vi } from "vitest";
import { BASE_URL } from "../constants";
import {
  listChildrenExamplePayload,
  listSubscriptionsExamplePayload,
  searchUserExamplePayload,
} from "../examplePayloads";
import dataSources from "./index";
import { listDrives } from "./listDrives";
import { listFilesInDirectory } from "./listFilesInDirectory";
import { listFolders } from "./listFolders";
import { listGroups } from "./listGroups";
import { listUsers } from "./listUsers";
import { selectDriveItem } from "./selectDriveItem";
import { selectDrivesFromSites } from "./selectDrivesFromSites";
import { selectFoldersFromDrives } from "./selectFoldersFromDrives";
import { selectSite } from "./selectSite";
import { selectSites } from "./selectSites";
import { selectSubscription } from "./selectSubscription";

const getMock: Mock = vi.fn();

vi.mock("../client", async () => {
  const { BASE_URL: baseURL } = await import("../constants");
  return {
    getOneDriveClient: vi.fn(() => ({
      get: getMock,
      defaults: { baseURL },
    })),
  };
});

const [fileItem, folderItem] = listChildrenExamplePayload.data.value;
const NEXT_LINK = `${BASE_URL}/me/drive/root/children?$skiptoken=X%2744537079ghv`;

const connection = {
  key: "oauth",
  fields: {},
  token: { access_token: "t" },
} as never;
const warnMock: Mock = vi.fn();
const context = {
  debug: { enabled: false },
  logger: { warn: warnMock },
} as never;

beforeEach(() => {
  getMock.mockReset();
  warnMock.mockReset();
});

describe("picklist data sources return a { result } envelope", () => {
  test("listDrives", async () => {
    getMock.mockResolvedValue({
      data: { value: [{ id: "d1", name: "OneDrive" }] },
    });

    const result = await listDrives.perform(context, {
      oneDriveConnection: connection,
    } as never);

    expect(result).toEqual({ result: [{ label: "OneDrive", key: "d1" }] });
  });

  test("listGroups", async () => {
    getMock.mockResolvedValue({
      data: { value: [{ id: "g1", displayName: "Finance" }] },
    });

    const result = await listGroups.perform(context, { connection } as never);

    expect(result).toEqual({ result: [{ label: "Finance", key: "g1" }] });
  });

  test("listUsers drops users without a mail address", async () => {
    getMock.mockResolvedValue({
      data: {
        value: [searchUserExamplePayload.data, { id: "u2", mail: null }],
      },
    });

    const result = await listUsers.perform(context, { connection } as never);

    expect(result).toEqual({
      result: [
        {
          label: searchUserExamplePayload.data.mail,
          key: searchUserExamplePayload.data.id,
        },
      ],
    });
  });

  test("selectSite", async () => {
    getMock.mockResolvedValue({
      data: { value: [{ id: "s1", displayName: "Intranet" }] },
    });

    const result = await selectSite.perform(context, { connection } as never);

    expect(result).toEqual({ result: [{ label: "Intranet", key: "s1" }] });
  });
});

describe("picklist data sources return an empty result for an empty reply", () => {
  test("listDrives", async () => {
    getMock.mockResolvedValue({ data: { value: [] } });

    const result = await listDrives.perform(context, {
      oneDriveConnection: connection,
    } as never);

    expect(result).toEqual({ result: [] });
  });

  test("listGroups", async () => {
    getMock.mockResolvedValue({ data: { value: [] } });

    const result = await listGroups.perform(context, { connection } as never);

    expect(result).toEqual({ result: [] });
  });

  test("selectSite", async () => {
    getMock.mockResolvedValue({ data: { value: [] } });

    const result = await selectSite.perform(context, { connection } as never);

    expect(result).toEqual({ result: [] });
  });

  test("listUsers", async () => {
    getMock.mockResolvedValue({ data: { value: [] } });

    const result = await listUsers.perform(context, { connection } as never);

    expect(result).toEqual({ result: [] });
  });

  test("selectSubscription", async () => {
    getMock.mockResolvedValue({ data: { value: [] } });

    const result = await selectSubscription.perform(context, {
      connection,
    } as never);

    expect(result).toEqual({ result: [] });
  });

  test("listFolders", async () => {
    getMock.mockResolvedValue({ data: { value: [] } });

    const result = await listFolders.perform(context, {
      oneDriveConnection: connection,
      dir: "/",
    } as never);

    expect(result).toEqual({ result: [] });
  });

  test("listFilesInDirectory", async () => {
    getMock.mockResolvedValue({ data: { value: [] } });

    const result = await listFilesInDirectory.perform(context, {
      connection,
      dir: "/",
    } as never);

    expect(result).toEqual({ result: [] });
  });
});

describe("the new data sources return an empty result for an empty reply", () => {
  beforeEach(() => {
    getMock.mockResolvedValue({ data: { value: [] } });
  });

  test("selectDriveItem", async () => {
    const result = await selectDriveItem.perform(context, {
      connection,
      driveId: "d1",
    } as never);

    expect(result).toEqual({ result: [] });
  });

  test("selectSites", async () => {
    const result = await selectSites.perform(context, { connection } as never);

    expect(result).toEqual({ result: [] });
  });

  test("selectDrivesFromSites, for a site that holds no drives", async () => {
    const result = await selectDrivesFromSites.perform(context, {
      connection,
      siteIds: [{ id: "s1" }],
    } as never);

    expect(result).toEqual({ result: [] });
  });

  test("selectFoldersFromDrives, for a drive whose root holds only files", async () => {
    getMock.mockResolvedValue({ data: { value: [fileItem] } });

    const result = await selectFoldersFromDrives.perform(context, {
      connection,
      driveIds: [{ id: "d1" }],
    } as never);

    expect(result).toEqual({ result: [] });
  });
});

describe("selectSubscription", () => {
  test("labels each subscription by resource and change type, sorted by label", async () => {
    getMock.mockResolvedValue(listSubscriptionsExamplePayload);
    const [rootSubscription, itemSubscription] =
      listSubscriptionsExamplePayload.data.value;

    const result = await selectSubscription.perform(context, {
      connection,
    } as never);

    expect(getMock).toHaveBeenCalledWith("/subscriptions");
    expect(result).toEqual({
      result: [
        {
          label: `${itemSubscription.resource} (${itemSubscription.changeType})`,
          key: itemSubscription.id,
        },
        {
          label: `${rootSubscription.resource} (${rootSubscription.changeType})`,
          key: rootSubscription.id,
        },
      ],
    });
  });
});

describe("listFolders", () => {
  test("follows @odata.nextLink from the absolute root children URL and keeps folders only", async () => {
    getMock
      .mockResolvedValueOnce({
        data: { value: [fileItem], "@odata.nextLink": NEXT_LINK },
      })
      .mockResolvedValueOnce({ data: { value: [folderItem] } });

    const result = await listFolders.perform(context, {
      oneDriveConnection: connection,
      dir: "/",
    } as never);

    expect(getMock).toHaveBeenNthCalledWith(
      1,
      `${BASE_URL}/me/drive/root/children`,
    );
    expect(getMock).toHaveBeenNthCalledWith(2, NEXT_LINK);
    expect(result).toEqual({
      result: [{ key: folderItem.id, label: folderItem.name }],
    });
  });

  test("resolves a folder path against the drive root", async () => {
    getMock.mockResolvedValue(listChildrenExamplePayload);

    const result = await listFolders.perform(context, {
      oneDriveConnection: connection,
      dir: "/Reports/2024",
    } as never);

    expect(getMock).toHaveBeenCalledWith(
      `${BASE_URL}/me/drive/root:/Reports/2024:/children`,
    );
    expect(result).toEqual({
      result: [{ key: folderItem.id, label: folderItem.name }],
    });
  });

  test("sends a value that already names a Graph resource as it is", async () => {
    getMock.mockResolvedValue(listChildrenExamplePayload);

    await listFolders.perform(context, {
      oneDriveConnection: connection,
      dir: "/drives/d1/root/children",
    } as never);

    expect(getMock).toHaveBeenCalledWith(`${BASE_URL}/drives/d1/root/children`);
  });
});

describe("single-request data sources follow @odata.nextLink", () => {
  const secondPage = `${BASE_URL}/next?$skiptoken=abc`;

  test.each([
    {
      name: "listDrives",
      run: () =>
        listDrives.perform(context, {
          oneDriveConnection: connection,
        } as never),
      path: "/me/drives",
      params: undefined,
      pages: [
        { id: "d1", name: "OneDrive" },
        { id: "d2", name: "Archive" },
      ],
      expected: [
        { label: "OneDrive", key: "d1" },
        { label: "Archive", key: "d2" },
      ],
    },
    {
      name: "listGroups",
      run: () => listGroups.perform(context, { connection } as never),
      path: "/groups",
      params: undefined,
      pages: [
        { id: "g1", displayName: "Finance" },
        { id: "g2", displayName: "Legal" },
      ],
      expected: [
        { label: "Finance", key: "g1" },
        { label: "Legal", key: "g2" },
      ],
    },
    {
      name: "listUsers",
      run: () => listUsers.perform(context, { connection } as never),
      path: "/users",
      params: undefined,
      pages: [
        { id: "u1", mail: "ana@example.com" },
        { id: "u2", mail: "ben@example.com" },
      ],
      expected: [
        { label: "ana@example.com", key: "u1" },
        { label: "ben@example.com", key: "u2" },
      ],
    },
    {
      name: "selectSite",
      run: () => selectSite.perform(context, { connection } as never),
      path: "/sites",
      params: { search: "" },
      pages: [
        { id: "s1", displayName: "Intranet" },
        { id: "s2", displayName: "Projects" },
      ],
      expected: [
        { label: "Intranet", key: "s1" },
        { label: "Projects", key: "s2" },
      ],
    },
  ])("$name", async ({ run, path, params, pages, expected }) => {
    getMock
      .mockResolvedValueOnce({
        data: { value: [pages[0]], "@odata.nextLink": secondPage },
      })
      .mockResolvedValueOnce({ data: { value: [pages[1]] } });

    const result = await run();

    expect(getMock).toHaveBeenNthCalledWith(1, path, { params });
    expect(getMock).toHaveBeenNthCalledWith(2, secondPage, {
      params: undefined,
    });
    expect(result).toEqual({ result: expected });
  });
});

describe("selectDriveItem", () => {
  test("lists the files and folders at the top level of the drive, sorted by name", async () => {
    getMock.mockResolvedValue(listChildrenExamplePayload);

    const result = await selectDriveItem.perform(context, {
      connection,
      driveId: "d1",
    } as never);

    expect(getMock).toHaveBeenCalledWith("/drives/d1/root/children", {
      params: undefined,
    });
    expect(result).toEqual({
      result: [
        { key: folderItem.id, label: folderItem.name },
        { key: fileItem.id, label: fileItem.name },
      ],
    });
  });

  test("labels an item without a name by its ID", async () => {
    getMock.mockResolvedValue({ data: { value: [{ id: "i1" }] } });

    const result = await selectDriveItem.perform(context, {
      connection,
      driveId: "d1",
    } as never);

    expect(result).toEqual({ result: [{ key: "i1", label: "i1" }] });
  });
});

describe("selectSites", () => {
  test("searches every site and returns an Object Selection sorted by name", async () => {
    getMock.mockResolvedValue({
      data: {
        value: [
          { id: "s2", displayName: "Projects" },
          { id: "s1", displayName: "Intranet" },
        ],
      },
    });

    const result = await selectSites.perform(context, { connection } as never);

    expect(getMock).toHaveBeenCalledWith("/sites", { params: { search: "" } });
    expect(result).toEqual({
      result: [
        { object: { key: "s1", label: "Intranet" } },
        { object: { key: "s2", label: "Projects" } },
      ],
    });
  });
});

describe("selectDrivesFromSites", () => {
  const replies = (
    byPath: Record<string, unknown>,
  ): ((path: string) => Promise<{ data: unknown }>) => {
    return async (path) => ({ data: byPath[path] });
  };

  test("lists one site's drives without a site prefix or a name lookup", async () => {
    getMock.mockImplementation(
      replies({
        "/sites/s1/drives": { value: [{ id: "d1", name: "Documents" }] },
      }),
    );

    const result = await selectDrivesFromSites.perform(context, {
      connection,
      siteIds: [{ id: "s1" }],
    } as never);

    expect(getMock).toHaveBeenCalledTimes(1);
    expect(result).toEqual({
      result: [{ object: { key: "d1", label: "Documents" } }],
    });
  });

  test("prefixes each drive with its site's upstream label, pages and removes duplicates", async () => {
    const nextLink = `${BASE_URL}/sites/s1/drives?$skiptoken=abc`;
    getMock.mockImplementation(
      replies({
        "/sites/s1/drives": {
          value: [{ id: "d1", name: "Documents" }],
          "@odata.nextLink": nextLink,
        },
        [nextLink]: { value: [{ id: "d2", name: "Archive" }] },
        "/sites/s2/drives": {
          value: [
            { id: "d3", name: "Documents" },
            { id: "d1", name: "Documents" },
          ],
        },
      }),
    );

    const result = await selectDrivesFromSites.perform(context, {
      connection,
      siteIds: [
        { id: "s1", label: "Intranet" },
        { id: "s2", label: "Projects" },
      ],
    } as never);

    expect(result).toEqual({
      result: [
        { object: { key: "d2", label: "Intranet / Archive" } },
        { object: { key: "d1", label: "Intranet / Documents" } },
        { object: { key: "d3", label: "Projects / Documents" } },
      ],
    });
  });

  test("skips a site Graph refuses and lists the drives of the rest", async () => {
    getMock.mockImplementation(async (path: string) => {
      if (path === "/sites/s2/drives") {
        throw Object.assign(new Error("Request failed with status code 403"), {
          response: { status: 403 },
        });
      }
      return { data: { value: [{ id: "d1", name: "Documents" }] } };
    });

    const result = await selectDrivesFromSites.perform(context, {
      connection,
      siteIds: [
        { id: "s1", label: "Intranet" },
        { id: "s2", label: "Locked" },
      ],
    } as never);

    expect(result).toEqual({
      result: [{ object: { key: "d1", label: "Intranet / Documents" } }],
    });
    expect(warnMock).toHaveBeenCalledWith(
      "Skipped site Locked: Microsoft Graph answered 403.",
    );
  });

  test("fails when the only site given is refused", async () => {
    getMock.mockRejectedValue(
      Object.assign(new Error("Request failed with status code 403"), {
        response: { status: 403 },
      }),
    );

    await expect(
      selectDrivesFromSites.perform(context, {
        connection,
        siteIds: [{ id: "s2" }],
      } as never),
    ).rejects.toThrow("403");
  });

  test("looks up the site name when several bare site IDs are given", async () => {
    getMock.mockImplementation(
      replies({
        "/sites/s1": { displayName: "Intranet" },
        "/sites/s1/drives": { value: [{ id: "d1", name: "Documents" }] },
        "/sites/s2": {},
        "/sites/s2/drives": { value: [{ id: "d2", name: "Documents" }] },
      }),
    );

    const result = await selectDrivesFromSites.perform(context, {
      connection,
      siteIds: [{ id: "s1" }, { id: "s2" }],
    } as never);

    expect(getMock).toHaveBeenCalledWith("/sites/s1", {
      params: { $select: "displayName" },
    });
    expect(result).toEqual({
      result: [
        { object: { key: "d1", label: "Intranet / Documents" } },
        { object: { key: "d2", label: "s2 / Documents" } },
      ],
    });
  });
});

describe("selectFoldersFromDrives", () => {
  test("keeps folders only and keys each by drive ID and folder ID", async () => {
    getMock.mockResolvedValue(listChildrenExamplePayload);

    const result = await selectFoldersFromDrives.perform(context, {
      connection,
      driveIds: [{ id: "d1" }],
    } as never);

    expect(getMock).toHaveBeenCalledTimes(1);
    expect(getMock).toHaveBeenCalledWith("/drives/d1/root/children", {
      params: undefined,
    });
    expect(result).toEqual({
      result: [
        {
          object: { key: `d1:${folderItem.id}`, label: folderItem.name },
        },
      ],
    });
  });

  test("skips a drive that no longer exists and lists the folders of the rest", async () => {
    getMock.mockImplementation(async (path: string) => {
      if (path === "/drives/gone/root/children") {
        throw Object.assign(new Error("Request failed with status code 404"), {
          response: { status: 404 },
        });
      }
      return listChildrenExamplePayload;
    });

    const result = await selectFoldersFromDrives.perform(context, {
      connection,
      driveIds: [
        { id: "d1", label: "Documents" },
        { id: "gone", label: "Old Library" },
      ],
    } as never);

    expect(result).toEqual({
      result: [
        {
          object: {
            key: `d1:${folderItem.id}`,
            label: `Documents / ${folderItem.name}`,
          },
        },
      ],
    });
    expect(warnMock).toHaveBeenCalledWith(
      "Skipped drive Old Library: Microsoft Graph answered 404.",
    );
  });

  test("prefixes each folder with its drive's upstream label, or the looked-up drive name", async () => {
    getMock.mockImplementation(async (path: string) => {
      if (path === "/drives/d2") {
        return { data: { name: "Archive" } };
      }
      return listChildrenExamplePayload;
    });

    const result = await selectFoldersFromDrives.perform(context, {
      connection,
      driveIds: [{ id: "d1", label: "Intranet / Documents" }, { id: "d2" }],
    } as never);

    expect(getMock).not.toHaveBeenCalledWith("/drives/d1", expect.anything());
    expect(getMock).toHaveBeenCalledWith("/drives/d2", {
      params: { $select: "name" },
    });
    expect(result).toEqual({
      result: [
        {
          object: {
            key: `d2:${folderItem.id}`,
            label: `Archive / ${folderItem.name}`,
          },
        },
        {
          object: {
            key: `d1:${folderItem.id}`,
            label: `Intranet / Documents / ${folderItem.name}`,
          },
        },
      ],
    });
  });
});

describe("listFilesInDirectory", () => {
  test("lists the files of the root directory", async () => {
    getMock.mockResolvedValue(listChildrenExamplePayload);

    const result = await listFilesInDirectory.perform(context, {
      connection,
      dir: "/",
    } as never);

    expect(getMock).toHaveBeenCalledWith(`${BASE_URL}/me/drive/root/children`);
    expect(result).toEqual({
      result: [{ key: fileItem.id, label: fileItem.name }],
    });
  });

  test("lists the files of a nested directory", async () => {
    getMock.mockResolvedValue(listChildrenExamplePayload);

    const result = await listFilesInDirectory.perform(context, {
      connection,
      dir: "/Reports/2024",
    } as never);

    expect(getMock).toHaveBeenCalledWith(
      `${BASE_URL}/me/drive/root:/Reports/2024:/children`,
    );
    expect(result).toEqual({
      result: [{ key: fileItem.id, label: fileItem.name }],
    });
  });
});

describe("every data source wires an example payload", () => {
  test.each(Object.entries(dataSources))("%s", (_key, source) => {
    expect(Array.isArray(source.examplePayload?.result)).toBe(true);
    expect(source.examplePayload?.result.length).toBeGreaterThan(0);
  });
});
