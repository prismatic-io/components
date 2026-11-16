import { createConnection, invokeDataSource } from "@prismatic-io/spectral/testing";
import nock from "nock";
import { oauth } from "../connections/oauth";
import {
  getFilesFromDriveWithPaginationExamplePayload,
  getListItemsInSiteExamplePayload,
  listDrivesDataSourceExamplePayload,
  listDrivesExamplePayload,
  listFoldersExamplePayload,
  listItemsInSiteListExamplePayload,
  listSiteListsExamplePayload,
  listSitesDataSourceExamplePayload,
  listSitesExamplePayload,
  listSubscriptionsDataSourceExamplePayload,
  listSubscriptionsExamplePayload,
  selectDrivesFromSitesExamplePayload,
  selectFoldersFromDrivesExamplePayload,
  selectSiteListExamplePayload,
  selectSitesExamplePayload,
} from "../examplePayloads";
import { listDrives } from "./listDrives";
import { listFolders } from "./listFolders";
import { listItemsInSiteList } from "./listItemsInSiteList";
import { listSites } from "./listSites";
import { listSubscriptions } from "./listSubscriptions";
import { selectDrivesFromSites } from "./selectDrivesFromSites";
import { selectFoldersFromDrives } from "./selectFoldersFromDrives";
import { selectSiteList } from "./selectSiteList";
import { selectSites } from "./selectSites";

const GRAPH = "https://graph.microsoft.com";
const connection = createConnection(
  oauth,
  {},
  { access_token: "eyJ0eXAiOiJKV1QiLCJub25jZSI6InNoYXJlcG9pbnQtdGVzdCJ9" },
);
const SITE_ID =
  "example.sharepoint.com,6c44888f-5883-4ef0-a542-d21a802cfea6,ed2d5d06-e192-4047-afa6-a5d7f25b3418";
const DRIVE_ID = "b!j4hEbINY8E6lQtIagCz-pgZdLe2S4UdAr6al1_JbNBjiyKTRbzt6TZ4cXyuKDWxD";
const OTHER_SITE_ID =
  "example.sharepoint.com,f210e7b8-56ea-4325-9280-8efde5827091,d6c83e27-8aa3-4878-ba35-b33e20735b99";
const OTHER_DRIVE_ID = "b!j4hEbINY8E6lQtIagCz-pgZdLe2S4UdAr6al1_JbNBgaLz6LTWybSrflDRyfKj6E";
const LIST_ID = "3a3c0f6a-86da-4567-94d4-3b939da63200";
const empty = { value: [] };

beforeAll(() => {
  nock.disableNetConnect();
});

afterEach(() => {
  nock.cleanAll();
});

afterAll(() => {
  nock.enableNetConnect();
});

describe("listDrives", () => {
  const path = `/v1.0/sites/${SITE_ID}/drives`;

  test("maps every drive to a { key, label } element", async () => {
    nock(GRAPH).get(path).reply(200, listDrivesExamplePayload.data);

    const result = await invokeDataSource(listDrives, { connection, siteId: SITE_ID });

    expect(result).toEqual(listDrivesDataSourceExamplePayload);
  });

  test("returns an empty list when the site has no drives", async () => {
    nock(GRAPH).get(path).reply(200, empty);

    const result = await invokeDataSource(listDrives, { connection, siteId: SITE_ID });

    expect(result).toEqual({ result: [] });
  });
});

describe("listFolders", () => {
  const path = `/v1.0/drives/${DRIVE_ID}/root/children`;
  const nextLink = new URL(getFilesFromDriveWithPaginationExamplePayload.data["@odata.nextLink"]);

  test("keeps only the folders across every page", async () => {
    nock(GRAPH).get(path).reply(200, getFilesFromDriveWithPaginationExamplePayload.data);
    nock(GRAPH).get(nextLink.pathname).query(true).reply(200, empty);

    const result = await invokeDataSource(listFolders, { connection, driveId: DRIVE_ID });

    expect(result).toEqual(listFoldersExamplePayload);
  });

  test("returns an empty list when the drive root is empty", async () => {
    nock(GRAPH).get(path).reply(200, empty);

    const result = await invokeDataSource(listFolders, { connection, driveId: DRIVE_ID });

    expect(result).toEqual({ result: [] });
  });
});

describe("listSites", () => {
  test("maps every site to a { key, label } element", async () => {
    nock(GRAPH).get("/v1.0/sites").query({ search: "" }).reply(200, listSitesExamplePayload.data);

    const result = await invokeDataSource(listSites, { connection });

    expect(result).toEqual(listSitesDataSourceExamplePayload);
  });

  test("returns an empty list when the search finds no sites", async () => {
    nock(GRAPH).get("/v1.0/sites").query({ search: "" }).reply(200, empty);

    const result = await invokeDataSource(listSites, { connection });

    expect(result).toEqual({ result: [] });
  });
});

describe("listItemsInSiteList", () => {
  const path = `/v1.0/sites/${SITE_ID}/lists/${LIST_ID}/items`;

  test("labels every item with its Title field", async () => {
    nock(GRAPH)
      .get(path)
      .query({ $expand: "fields" })
      .reply(200, getListItemsInSiteExamplePayload.data);

    const result = await invokeDataSource(listItemsInSiteList, {
      connection,
      siteId: SITE_ID,
      listId: LIST_ID,
    });

    expect(result).toEqual(listItemsInSiteListExamplePayload);
  });

  test("returns an empty list when the list has no items", async () => {
    nock(GRAPH).get(path).query({ $expand: "fields" }).reply(200, empty);

    const result = await invokeDataSource(listItemsInSiteList, {
      connection,
      siteId: SITE_ID,
      listId: LIST_ID,
    });

    expect(result).toEqual({ result: [] });
  });
});

describe("listSubscriptions", () => {
  test("labels every subscription with its resource and change type", async () => {
    nock(GRAPH).get("/v1.0/subscriptions").reply(200, listSubscriptionsExamplePayload.data);

    const result = await invokeDataSource(listSubscriptions, { connection });

    expect(result).toEqual(listSubscriptionsDataSourceExamplePayload);
  });

  test("returns an empty list when there are no subscriptions", async () => {
    nock(GRAPH).get("/v1.0/subscriptions").reply(200, empty);

    const result = await invokeDataSource(listSubscriptions, { connection });

    expect(result).toEqual({ result: [] });
  });
});

describe("selectSiteList", () => {
  const path = `/v1.0/sites/${SITE_ID}/lists`;

  test("labels every list with its display name", async () => {
    nock(GRAPH).get(path).reply(200, listSiteListsExamplePayload.data);

    const result = await invokeDataSource(selectSiteList, { connection, siteId: SITE_ID });

    expect(result).toEqual(selectSiteListExamplePayload);
  });

  test("returns an empty list when the site has no lists", async () => {
    nock(GRAPH).get(path).reply(200, empty);

    const result = await invokeDataSource(selectSiteList, { connection, siteId: SITE_ID });

    expect(result).toEqual({ result: [] });
  });
});

describe("selectSites", () => {
  test("wraps every site as an object of an Object Selection", async () => {
    nock(GRAPH).get("/v1.0/sites").query({ search: "" }).reply(200, listSitesExamplePayload.data);

    const result = await invokeDataSource(selectSites, { connection });

    expect(result).toEqual(selectSitesExamplePayload);
  });

  test("returns an empty list when the search finds no sites", async () => {
    nock(GRAPH).get("/v1.0/sites").query({ search: "" }).reply(200, empty);

    const result = await invokeDataSource(selectSites, { connection });

    expect(result).toEqual({ result: [] });
  });

  test("follows @odata.nextLink", async () => {
    const [firstSite, secondSite] = listSitesExamplePayload.data.value;
    nock(GRAPH)
      .get("/v1.0/sites")
      .query({ search: "" })
      .reply(200, { value: [firstSite], "@odata.nextLink": `${GRAPH}/v1.0/sites?$skiptoken=abc` });
    nock(GRAPH)
      .get("/v1.0/sites")
      .query({ $skiptoken: "abc" })
      .reply(200, { value: [secondSite] });

    const result = await invokeDataSource(selectSites, { connection });

    expect(result).toEqual(selectSitesExamplePayload);
  });
});

describe("selectDrivesFromSites", () => {
  const drivesPath = `/v1.0/sites/${SITE_ID}/drives`;
  const [documentsDrive, siteAssetsDrive] = listDrivesExamplePayload.data.value;

  test("lists one site's drives without a site prefix or a name lookup", async () => {
    nock(GRAPH).get(drivesPath).reply(200, listDrivesExamplePayload.data);

    const result = await invokeDataSource(selectDrivesFromSites, {
      connection,
      siteIds: [{ id: SITE_ID }],
    } as never);

    expect(result).toEqual({
      result: listDrivesDataSourceExamplePayload.result.map((drive) => ({ object: drive })),
    });
  });

  test("prefixes each drive with its site's upstream label, pages and removes duplicates", async () => {
    nock(GRAPH)
      .get(drivesPath)
      .reply(200, {
        value: [documentsDrive],
        "@odata.nextLink": `${GRAPH}${drivesPath}?$skiptoken=abc`,
      });
    nock(GRAPH)
      .get(drivesPath)
      .query({ $skiptoken: "abc" })
      .reply(200, { value: [siteAssetsDrive] });
    nock(GRAPH)
      .get(`/v1.0/sites/${OTHER_SITE_ID}/drives`)
      .reply(200, { value: [documentsDrive] });

    const result = await invokeDataSource(selectDrivesFromSites, {
      connection,
      siteIds: [
        { id: SITE_ID, label: "Example Team Site" },
        { id: OTHER_SITE_ID, label: "Finance" },
      ],
    } as never);

    expect(result).toEqual(selectDrivesFromSitesExamplePayload);
  });

  test("looks up the site name when several bare site IDs are given", async () => {
    nock(GRAPH)
      .get(`/v1.0/sites/${SITE_ID}`)
      .query({ $select: "displayName" })
      .reply(200, { displayName: "Example Team Site" });
    nock(GRAPH).get(drivesPath).reply(200, listDrivesExamplePayload.data);
    nock(GRAPH)
      .get(`/v1.0/sites/${OTHER_SITE_ID}`)
      .query({ $select: "displayName" })
      .reply(200, {});
    nock(GRAPH).get(`/v1.0/sites/${OTHER_SITE_ID}/drives`).reply(200, empty);

    const result = await invokeDataSource(selectDrivesFromSites, {
      connection,
      siteIds: [{ id: SITE_ID }, { id: OTHER_SITE_ID }],
    } as never);

    expect(result).toEqual(selectDrivesFromSitesExamplePayload);
  });

  test("skips a site Graph refuses and lists the drives of the rest", async () => {
    nock(GRAPH).get(drivesPath).reply(200, listDrivesExamplePayload.data);
    nock(GRAPH)
      .get(`/v1.0/sites/${OTHER_SITE_ID}/drives`)
      .reply(403, { error: { code: "accessDenied", message: "Access denied" } });

    const result = await invokeDataSource(selectDrivesFromSites, {
      connection,
      siteIds: [
        { id: SITE_ID, label: "Example Team Site" },
        { id: OTHER_SITE_ID, label: "Finance" },
      ],
    } as never);

    expect(result).toEqual(selectDrivesFromSitesExamplePayload);
  });

  test("fails when the only site given is refused", async () => {
    nock(GRAPH)
      .get(drivesPath)
      .reply(403, { error: { code: "accessDenied", message: "Access denied" } });

    await expect(
      invokeDataSource(selectDrivesFromSites, {
        connection,
        siteIds: [{ id: SITE_ID }],
      } as never),
    ).rejects.toThrow("403");
  });

  test("returns an empty list when no site is given", async () => {
    const result = await invokeDataSource(selectDrivesFromSites, {
      connection,
      siteIds: [],
    } as never);

    expect(result).toEqual({ result: [] });
  });
});

describe("selectFoldersFromDrives", () => {
  const childrenPath = `/v1.0/drives/${DRIVE_ID}/root/children`;
  const nextLink = new URL(getFilesFromDriveWithPaginationExamplePayload.data["@odata.nextLink"]);

  test("keeps folders only and keys each by drive ID and folder ID", async () => {
    nock(GRAPH).get(childrenPath).reply(200, getFilesFromDriveWithPaginationExamplePayload.data);
    nock(GRAPH).get(nextLink.pathname).query(true).reply(200, empty);

    const result = await invokeDataSource(selectFoldersFromDrives, {
      connection,
      driveIds: [{ id: DRIVE_ID }],
    } as never);

    expect(result).toEqual({
      result: listFoldersExamplePayload.result.map(({ key, label }) => ({
        object: { key: `${DRIVE_ID}:${key}`, label },
      })),
    });
  });

  test("returns an empty list when no drive is given", async () => {
    const result = await invokeDataSource(selectFoldersFromDrives, {
      connection,
      driveIds: [],
    } as never);

    expect(result).toEqual({ result: [] });
  });

  test("returns an empty list when the drive root holds no folders", async () => {
    nock(GRAPH).get(childrenPath).reply(200, empty);

    const result = await invokeDataSource(selectFoldersFromDrives, {
      connection,
      driveIds: [{ id: DRIVE_ID }],
    } as never);

    expect(result).toEqual({ result: [] });
  });

  test("skips a drive that no longer exists and lists the folders of the rest", async () => {
    nock(GRAPH).get(childrenPath).reply(200, getFilesFromDriveWithPaginationExamplePayload.data);
    nock(GRAPH).get(nextLink.pathname).query(true).reply(200, empty);
    nock(GRAPH)
      .get(`/v1.0/drives/${OTHER_DRIVE_ID}/root/children`)
      .reply(404, { error: { code: "itemNotFound", message: "The resource could not be found." } });

    const result = await invokeDataSource(selectFoldersFromDrives, {
      connection,
      driveIds: [
        { id: DRIVE_ID, label: "Documents" },
        { id: OTHER_DRIVE_ID, label: "Old Library" },
      ],
    } as never);

    expect(result).toEqual(selectFoldersFromDrivesExamplePayload);
  });

  test("prefixes each folder with its drive's upstream label, or the looked-up drive name", async () => {
    nock(GRAPH).get(childrenPath).reply(200, getFilesFromDriveWithPaginationExamplePayload.data);
    nock(GRAPH).get(nextLink.pathname).query(true).reply(200, empty);
    nock(GRAPH)
      .get(`/v1.0/drives/${OTHER_DRIVE_ID}`)
      .query({ $select: "name" })
      .reply(200, { name: "Site Assets" });
    nock(GRAPH)
      .get(`/v1.0/drives/${OTHER_DRIVE_ID}/root/children`)
      .reply(200, {
        value: [{ id: "01SITEASSETSFOLDER", name: "Logos", folder: { childCount: 2 } }],
      });

    const result = await invokeDataSource(selectFoldersFromDrives, {
      connection,
      driveIds: [{ id: DRIVE_ID, label: "Documents" }, { id: OTHER_DRIVE_ID }],
    } as never);

    expect(result).toEqual({
      result: [
        ...selectFoldersFromDrivesExamplePayload.result,
        { object: { key: `${OTHER_DRIVE_ID}:01SITEASSETSFOLDER`, label: "Site Assets / Logos" } },
      ],
    });
  });
});
