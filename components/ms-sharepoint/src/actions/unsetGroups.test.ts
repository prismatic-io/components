import { createConnection, invoke } from "@prismatic-io/spectral/testing";
import nock from "nock";
import { oauth } from "../connections/oauth";
import { getFilesFromDriveFolderWithPagination } from "./drives/getFilesFromDriveFolderWithPagination";
import { getFilesFromDriveWithPagination } from "./drives/getFilesFromDriveWithPagination";
import { listChanges } from "./drives/listChanges";
import { listDrives } from "./drives/listDrives";
import { getListItemsInSite } from "./lists/getListItemsInSite";
import { listFollowedSites } from "./sites/listFollowedSites";
import { listSites } from "./sites/listSites";

const GRAPH = "https://graph.microsoft.com";
const connection = createConnection(
  oauth,
  {},
  { access_token: "eyJ0eXAiOiJKV1QiLCJub25jZSI6InNoYXJlcG9pbnQtdGVzdCJ9" },
);
const SITE_ID =
  "example.sharepoint.com,6c44888f-5883-4ef0-a542-d21a802cfea6,ed2d5d06-e192-4047-afa6-a5d7f25b3418";
const DRIVE_ID = "b!j4hEbINY8E6lQtIagCz-pgZdLe2S4UdAr6al1_JbNBjiyKTRbzt6TZ4cXyuKDWxD";
const FOLDER_ID = "01GSSFDXCQ3Z5WH3SSD24SI4FP2CHOPJFT";
const LIST_ID = "3a3c0f6a-86da-4567-94d4-3b939da63200";
const unset = undefined as never;
const noPaging = (query: Record<string, unknown>) => !("$top" in query) && !("$skipToken" in query);

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
      `/v1.0/sites/${SITE_ID}/drives`,
      () => invoke(listDrives, { connection, siteId: SITE_ID, fetchAll: false, pagination: unset }),
    ],
    [
      "listSites",
      "/v1.0/sites",
      () => invoke(listSites, { connection, fetchAll: false, pagination: unset }),
    ],
    [
      "listFollowedSites",
      "/v1.0/me/followedSites",
      () => invoke(listFollowedSites, { connection, fetchAll: false, pagination: unset }),
    ],
    [
      "getFilesFromDriveWithPagination",
      `/v1.0/drives/${DRIVE_ID}/root/children`,
      () =>
        invoke(getFilesFromDriveWithPagination, {
          connection,
          siteId: undefined,
          driveId: DRIVE_ID,
          fetchAll: false,
          pagination: unset,
          recursive: false,
        }),
    ],
    [
      "getFilesFromDriveFolderWithPagination",
      `/v1.0/drives/${DRIVE_ID}/items/${FOLDER_ID}/children`,
      () =>
        invoke(getFilesFromDriveFolderWithPagination, {
          connection,
          siteId: undefined,
          driveId: DRIVE_ID,
          folderId: FOLDER_ID,
          fetchAll: false,
          pagination: unset,
        }),
    ],
    [
      "getListItemsInSite",
      `/v1.0/sites/${SITE_ID}/lists/${LIST_ID}/items`,
      () =>
        invoke(getListItemsInSite, {
          connection,
          siteId: SITE_ID,
          listId: LIST_ID,
          pagination: unset,
          optInFields: undefined,
        }),
    ],
    [
      "listChanges",
      `/v1.0/drives/${DRIVE_ID}/root/delta`,
      () =>
        invoke(listChanges, {
          connection,
          deltaURL: `/drives/${DRIVE_ID}/root/delta`,
          fetchAll: false,
          queryParameters: unset,
        }),
    ],
  ])("%s sends the request without paging or query options", async (_name, path, run) => {
    const scope = nock(GRAPH)
      .get(path)
      .query((query) => noPaging(query) && !("$select" in query) && !("$expand" in query))
      .reply(200, { value: [] });

    await run();

    expect(scope.isDone()).toBe(true);
  });
});

describe("actions honor the flat values of a step saved before the grouping", () => {
  const flat = { pageLimit: "2", pageToken: "X%2744537079ghv" };
  const flatPage = (query: Record<string, unknown>) =>
    query.$top === "2" && query.$skipToken === "X%2744537079ghv";

  test.each([
    [
      "listDrives",
      `/v1.0/sites/${SITE_ID}/drives`,
      () =>
        invoke(listDrives, {
          connection,
          siteId: SITE_ID,
          fetchAll: false,
          pagination: unset,
          ...flat,
        } as never),
    ],
    [
      "listSites",
      "/v1.0/sites",
      () => invoke(listSites, { connection, fetchAll: false, pagination: unset, ...flat } as never),
    ],
    [
      "listFollowedSites",
      "/v1.0/me/followedSites",
      () =>
        invoke(listFollowedSites, {
          connection,
          fetchAll: false,
          pagination: unset,
          ...flat,
        } as never),
    ],
    [
      "getFilesFromDriveWithPagination",
      `/v1.0/drives/${DRIVE_ID}/root/children`,
      () =>
        invoke(getFilesFromDriveWithPagination, {
          connection,
          siteId: undefined,
          driveId: DRIVE_ID,
          fetchAll: false,
          pagination: unset,
          recursive: false,
          ...flat,
        } as never),
    ],
    [
      "getFilesFromDriveFolderWithPagination",
      `/v1.0/drives/${DRIVE_ID}/items/${FOLDER_ID}/children`,
      () =>
        invoke(getFilesFromDriveFolderWithPagination, {
          connection,
          siteId: undefined,
          driveId: DRIVE_ID,
          folderId: FOLDER_ID,
          fetchAll: false,
          pagination: unset,
          ...flat,
        } as never),
    ],
    [
      "getListItemsInSite",
      `/v1.0/sites/${SITE_ID}/lists/${LIST_ID}/items`,
      () =>
        invoke(getListItemsInSite, {
          connection,
          siteId: SITE_ID,
          listId: LIST_ID,
          pagination: unset,
          optInFields: undefined,
          ...flat,
        } as never),
    ],
  ])("%s pages with the flat Page Limit and Page Token", async (_name, path, run) => {
    const scope = nock(GRAPH).get(path).query(flatPage).reply(200, { value: [] });

    await run();

    expect(scope.isDone()).toBe(true);
  });

  test("listChanges sends the flat query options", async () => {
    const scope = nock(GRAPH)
      .get(`/v1.0/drives/${DRIVE_ID}/root/delta`)
      .query({ $select: "id,name", $expand: "thumbnails", $top: "5" })
      .reply(200, { value: [] });

    await invoke(listChanges, {
      connection,
      deltaURL: `/drives/${DRIVE_ID}/root/delta`,
      fetchAll: false,
      queryParameters: unset,
      $select: "id,name",
      $expand: "thumbnails",
      $top: "5",
    } as never);

    expect(scope.isDone()).toBe(true);
  });
});

describe("a Page Token without a Page Limit", () => {
  const tokenOnly = { pageLimit: 0, pageToken: "X%2744537079ghv" };

  test.each([
    [
      "listDrives",
      `/v1.0/sites/${SITE_ID}/drives`,
      () =>
        invoke(listDrives, {
          connection,
          siteId: SITE_ID,
          fetchAll: false,
          pagination: tokenOnly,
        }),
    ],
    [
      "listSites",
      "/v1.0/sites",
      () => invoke(listSites, { connection, fetchAll: false, pagination: tokenOnly }),
    ],
    [
      "listFollowedSites",
      "/v1.0/me/followedSites",
      () => invoke(listFollowedSites, { connection, fetchAll: false, pagination: tokenOnly }),
    ],
  ])("%s sends the token and no page size", async (_name, path, run) => {
    const scope = nock(GRAPH)
      .get(path)
      .query((query) => !("$top" in query) && query.$skipToken === "X%2744537079ghv")
      .reply(200, { value: [] });

    await run();

    expect(scope.isDone()).toBe(true);
  });
});
