import { createConnection, invoke } from "@prismatic-io/spectral/testing";
import nock from "nock";
import { oauth } from "../../connections/oauth";
import { DEFAULT_PAGE_SIZE } from "../../constants";
import {
  checkItemExistsExamplePayload,
  listDrivesExamplePayload,
  listItemsExamplePayload,
  searchItemsExamplePayload,
} from "../../examplePayloads";
import { checkItemExists } from "./checkItemExists";
import { listItems } from "./listItems";
import { searchItems } from "./searchItems";

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
const ITEM_PATH = "Project Files";
const notFound = {
  error: { code: "itemNotFound", message: "The resource could not be found." },
};
const serverError = {
  error: { code: "generalException", message: "An unspecified error has occurred." },
};

beforeAll(() => {
  nock.disableNetConnect();
});

afterEach(() => {
  nock.cleanAll();
});

afterAll(() => {
  nock.enableNetConnect();
});

describe("listItems", () => {
  test("returns the folder's children", async () => {
    nock(GRAPH)
      .get(`/v1.0/drives/${DRIVE_ID}/items/${FOLDER_ID}/children`)
      .reply(200, listItemsExamplePayload.data);

    const { result } = await invoke(listItems, {
      connection,
      siteId: undefined,
      driveId: DRIVE_ID,
      folderId: FOLDER_ID,
    });

    expect(result).toEqual(listItemsExamplePayload);
  });

  test("rejects when the folder does not exist", async () => {
    nock(GRAPH).get(`/v1.0/drives/${DRIVE_ID}/items/${FOLDER_ID}/children`).reply(404, notFound);

    await expect(
      invoke(listItems, { connection, siteId: undefined, driveId: DRIVE_ID, folderId: FOLDER_ID }),
    ).rejects.toThrow("Request failed with status code 404");
  });
});

describe("searchItems", () => {
  const [documentsDrive, siteAssetsDrive] = listDrivesExamplePayload.data.value;
  const top = { $top: String(DEFAULT_PAGE_SIZE) };

  test("groups the name matches of every drive under the drive's name", async () => {
    nock(GRAPH)
      .get(`/v1.0/sites/${SITE_ID}/drives`)
      .query({ $select: "id,name", ...top })
      .reply(200, listDrivesExamplePayload.data);
    nock(GRAPH)
      .get(`/v1.0/drives/${documentsDrive.id}/root/search(q='project')`)
      .query(top)
      .reply(200, { value: searchItemsExamplePayload.data.Documents });
    nock(GRAPH)
      .get(`/v1.0/drives/${siteAssetsDrive.id}/root/search(q='project')`)
      .query(top)
      .reply(200, { value: [] });

    const { result } = await invoke(searchItems, {
      connection,
      siteId: SITE_ID,
      query: "project",
    });

    expect(result).toEqual(searchItemsExamplePayload);
  });

  test("names the drive whose search failed", async () => {
    nock(GRAPH)
      .get(`/v1.0/sites/${SITE_ID}/drives`)
      .query({ $select: "id,name", ...top })
      .reply(200, { value: [documentsDrive] });
    nock(GRAPH)
      .get(`/v1.0/drives/${documentsDrive.id}/root/search(q='project')`)
      .query(top)
      .reply(500, serverError);

    await expect(
      invoke(searchItems, { connection, siteId: SITE_ID, query: "project" }),
    ).rejects.toThrow(
      `Search failed for drive "${documentsDrive.name}" (id: ${documentsDrive.id}): AxiosError: Request failed with status code 500`,
    );
  });
});

describe("checkItemExists", () => {
  const itemUrl = `/v1.0/sites/${SITE_ID}/drives/${DRIVE_ID}/root:/${encodeURIComponent(ITEM_PATH)}`;

  test("reports an existing item with its metadata", async () => {
    nock(GRAPH).get(itemUrl).reply(200, checkItemExistsExamplePayload.data.item);

    const { result } = await invoke(checkItemExists, {
      connection,
      siteId: SITE_ID,
      driveId: DRIVE_ID,
      itemPath: ITEM_PATH,
    });

    expect(result).toEqual(checkItemExistsExamplePayload);
  });

  test("reports a missing item instead of throwing on a 404", async () => {
    nock(GRAPH).get(itemUrl).reply(404, notFound);

    const { result } = await invoke(checkItemExists, {
      connection,
      siteId: SITE_ID,
      driveId: DRIVE_ID,
      itemPath: ITEM_PATH,
    });

    expect(result).toEqual({
      data: {
        exists: false,
        message: `Item "${ITEM_PATH}" does not exist in the specified drive`,
      },
    });
  });

  test("rethrows any other API error", async () => {
    nock(GRAPH).get(itemUrl).reply(500, serverError);

    await expect(
      invoke(checkItemExists, {
        connection,
        siteId: SITE_ID,
        driveId: DRIVE_ID,
        itemPath: ITEM_PATH,
      }),
    ).rejects.toThrow("Request failed with status code 500");
  });
});
