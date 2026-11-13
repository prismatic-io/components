import { createConnection, invoke } from "@prismatic-io/spectral/testing";
import nock from "nock";
import { oauth } from "../connections";
import { BASE_URL } from "../constants";
import { listDrives } from "./drives/listDrives";
import { listDrivesByGroup } from "./drives/listDrivesByGroup";
import { listDrivesBySite } from "./drives/listDrivesBySite";
import { listDrivesByUser } from "./drives/listDrivesByUser";
import { listChanges } from "./files/listChanges";
import { listChildren } from "./files/listChildren";
import { listDriveItems } from "./files/listDriveItems";
import { listSharedFiles } from "./files/listSharedFiles";
import { listGroups } from "./groups/listGroups";
import { listSites } from "./sites/listSites";

const connection = createConnection(
  oauth,
  {},
  { access_token: "eyJ0eXAiOiJKV1QiLCJub25jZSI6Im9uZWRyaXZlLXRlc3QifQ" },
);
const DRIVE_ID =
  "b!-RIj2DuyvEyV1T4NlOaMHk8XkS_I8MdFlUCq1BlcjgmhRfAj3-Z8RY2VpuvV_tpd";
const ITEM_ID = "01NKDM7HMOJTVYMDOSXFDK2QJDXCDI3WUK";
const GROUP_ID = "02bd9fd6-8f93-4758-87c3-1fb73740a315";
const SITE_ID =
  "contoso.sharepoint.com,6c44888f-4774-4ef0-b542-d21a795cfea6,80f1bb04-d076-4cb1-9fb7-3f7264e77163";
const USER_ID = "87d349ed-44d7-43e1-9a83-5f2406dee5bd";
const unset = undefined as never;
const unpaged = (query: Record<string, unknown>) =>
  !("$top" in query) &&
  !("$skiptoken" in query) &&
  !("$select" in query) &&
  !("$expand" in query);

beforeAll(() => {
  nock.disableNetConnect();
});

afterEach(() => {
  nock.cleanAll();
});

afterAll(() => {
  nock.enableNetConnect();
});

describe("actions run when their input group is unset", () => {
  test.each([
    [
      "listDrives",
      "/me/drives",
      () =>
        invoke(listDrives, { connection, fetchAll: false, pagination: unset }),
    ],
    [
      "listDrivesByGroup",
      `/groups/${GROUP_ID}/drives`,
      () =>
        invoke(listDrivesByGroup, {
          connection,
          groupId: GROUP_ID,
          fetchAll: false,
          pagination: unset,
        }),
    ],
    [
      "listDrivesBySite",
      `/sites/${SITE_ID}/drives`,
      () =>
        invoke(listDrivesBySite, {
          connection,
          siteId: SITE_ID,
          fetchAll: false,
          pagination: unset,
        }),
    ],
    [
      "listDrivesByUser",
      `/users/${USER_ID}/drives`,
      () =>
        invoke(listDrivesByUser, {
          connection,
          userId: USER_ID,
          fetchAll: false,
          pagination: unset,
        }),
    ],
    [
      "listGroups",
      "/groups",
      () =>
        invoke(listGroups, { connection, fetchAll: false, pagination: unset }),
    ],
    [
      "listSites",
      "/sites",
      () =>
        invoke(listSites, { connection, fetchAll: false, pagination: unset }),
    ],
    [
      "listSharedFiles",
      "/me/drive/sharedWithMe",
      () =>
        invoke(listSharedFiles, {
          connection,
          fetchAll: false,
          pagination: unset,
        }),
    ],
    [
      "listDriveItems",
      "/me/drive/root/children",
      () =>
        invoke(listDriveItems, {
          connection,
          dir: "/",
          fetchAll: false,
          pagination: unset,
        }),
    ],
    [
      "listChildren",
      `/drives/${DRIVE_ID}/items/${ITEM_ID}/children`,
      () =>
        invoke(listChildren, {
          connection,
          driveId: DRIVE_ID,
          itemId: ITEM_ID,
          fetchAll: false,
          pagination: unset,
        }),
    ],
    [
      "listChanges",
      `/drives/${DRIVE_ID}/root/delta`,
      () =>
        invoke(listChanges, {
          oneDriveConnection: connection,
          deltaURL: `/drives/${DRIVE_ID}/root/delta`,
          queryParameters: unset,
        }),
    ],
  ])("%s sends the request without paging or query options", async (_name, path, run) => {
    const scope = nock(BASE_URL)
      .get(path)
      .query(unpaged)
      .reply(200, { value: [] });

    await run();

    expect(scope.isDone()).toBe(true);
  });
});

describe("actions honor the flat values of a step saved before the grouping", () => {
  const flat = { pageLimit: "2", pageToken: "X%2744537079ghv" };
  const flatPage = { $top: "2", $skiptoken: "X%2744537079ghv" };

  test.each([
    [
      "listDrives",
      "/me/drives",
      () =>
        invoke(listDrives, {
          connection,
          fetchAll: false,
          pagination: unset,
          ...flat,
        } as never),
    ],
    [
      "listDrivesByGroup",
      `/groups/${GROUP_ID}/drives`,
      () =>
        invoke(listDrivesByGroup, {
          connection,
          groupId: GROUP_ID,
          fetchAll: false,
          pagination: unset,
          ...flat,
        } as never),
    ],
    [
      "listDrivesBySite",
      `/sites/${SITE_ID}/drives`,
      () =>
        invoke(listDrivesBySite, {
          connection,
          siteId: SITE_ID,
          fetchAll: false,
          pagination: unset,
          ...flat,
        } as never),
    ],
    [
      "listDrivesByUser",
      `/users/${USER_ID}/drives`,
      () =>
        invoke(listDrivesByUser, {
          connection,
          userId: USER_ID,
          fetchAll: false,
          pagination: unset,
          ...flat,
        } as never),
    ],
    [
      "listGroups",
      "/groups",
      () =>
        invoke(listGroups, {
          connection,
          fetchAll: false,
          pagination: unset,
          ...flat,
        } as never),
    ],
    [
      "listSites",
      "/sites",
      () =>
        invoke(listSites, {
          connection,
          fetchAll: false,
          pagination: unset,
          ...flat,
        } as never),
    ],
    [
      "listSharedFiles",
      "/me/drive/sharedWithMe",
      () =>
        invoke(listSharedFiles, {
          connection,
          fetchAll: false,
          pagination: unset,
          ...flat,
        } as never),
    ],
    [
      "listDriveItems",
      "/me/drive/root/children",
      () =>
        invoke(listDriveItems, {
          connection,
          dir: "/",
          fetchAll: false,
          pagination: unset,
          ...flat,
        } as never),
    ],
    [
      "listChildren",
      `/drives/${DRIVE_ID}/items/${ITEM_ID}/children`,
      () =>
        invoke(listChildren, {
          connection,
          driveId: DRIVE_ID,
          itemId: ITEM_ID,
          fetchAll: false,
          pagination: unset,
          ...flat,
        } as never),
    ],
  ])("%s pages with the flat Page Limit and Page Token", async (_name, path, run) => {
    const scope = nock(BASE_URL)
      .get(path)
      .query(flatPage)
      .reply(200, { value: [] });

    await run();

    expect(scope.isDone()).toBe(true);
  });

  test("listChanges sends the flat query options", async () => {
    const scope = nock(BASE_URL)
      .get(`/drives/${DRIVE_ID}/root/delta`)
      .query({ $select: "id,name", $expand: "thumbnails", $top: "5" })
      .reply(200, { value: [] });

    await invoke(listChanges, {
      oneDriveConnection: connection,
      deltaURL: `/drives/${DRIVE_ID}/root/delta`,
      queryParameters: unset,
      $select: "id,name",
      $expand: "thumbnails",
      $top: "5",
    } as never);

    expect(scope.isDone()).toBe(true);
  });
});
