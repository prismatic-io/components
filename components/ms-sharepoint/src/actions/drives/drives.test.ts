import { createConnection, invoke } from "@prismatic-io/spectral/testing";
import nock from "nock";
import { oauth } from "../../connections/oauth";
import { DELTA_PREFER_HEADER } from "../../constants";
import {
  getDriveExamplePayload,
  getFilesFromDriveFolderWithPaginationExamplePayload,
  getFilesFromDriveWithPaginationExamplePayload,
  listChangesExamplePayload,
  listDrivesExamplePayload,
} from "../../examplePayloads";
import { getDrive } from "./getDrive";
import { getFilesFromDriveFolderWithPagination } from "./getFilesFromDriveFolderWithPagination";
import { getFilesFromDriveWithPagination } from "./getFilesFromDriveWithPagination";
import { listChanges } from "./listChanges";
import { listDrives } from "./listDrives";

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
const pagination = { pageLimit: 3, pageToken: "X%2744537079ghv" };
const pageQuery = { $top: "3", $skipToken: "X%2744537079ghv" };
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

describe("listDrives", () => {
  test("returns one page of the site's drives", async () => {
    nock(GRAPH)
      .get(`/v1.0/sites/${SITE_ID}/drives`)
      .query(pageQuery)
      .reply(200, listDrivesExamplePayload.data);

    const { result } = await invoke(listDrives, {
      connection,
      siteId: SITE_ID,
      fetchAll: false,
      pagination,
    });

    expect(result).toEqual(listDrivesExamplePayload);
  });

  test("rejects when the site does not exist", async () => {
    nock(GRAPH).get(`/v1.0/sites/${SITE_ID}/drives`).query(pageQuery).reply(404, notFound);

    await expect(
      invoke(listDrives, { connection, siteId: SITE_ID, fetchAll: false, pagination }),
    ).rejects.toThrow("Request failed with status code 404");
  });
});

describe("getDrive", () => {
  test("returns the drive", async () => {
    nock(GRAPH).get(`/v1.0/drives/${DRIVE_ID}`).reply(200, getDriveExamplePayload.data);

    const { result } = await invoke(getDrive, {
      connection,
      siteId: undefined,
      driveId: DRIVE_ID,
    });

    expect(result).toEqual(getDriveExamplePayload);
  });

  test("rejects when the drive does not exist", async () => {
    nock(GRAPH).get(`/v1.0/drives/${DRIVE_ID}`).reply(404, notFound);

    await expect(
      invoke(getDrive, { connection, siteId: undefined, driveId: DRIVE_ID }),
    ).rejects.toThrow("Request failed with status code 404");
  });
});

describe("getFilesFromDriveWithPagination", () => {
  test("returns one page of the drive root and the next page token", async () => {
    nock(GRAPH)
      .get(`/v1.0/drives/${DRIVE_ID}/root/children`)
      .query(pageQuery)
      .reply(200, getFilesFromDriveWithPaginationExamplePayload.data);

    const { result } = await invoke(getFilesFromDriveWithPagination, {
      connection,
      siteId: undefined,
      driveId: DRIVE_ID,
      fetchAll: false,
      pagination,
      recursive: false,
    });

    expect(result).toEqual(getFilesFromDriveWithPaginationExamplePayload);
  });

  test("sends no page size when Page Limit is blank", async () => {
    const scope = nock(GRAPH)
      .get(`/v1.0/drives/${DRIVE_ID}/root/children`)
      .query((query) => Object.keys(query).length === 0)
      .reply(200, getFilesFromDriveWithPaginationExamplePayload.data);

    await invoke(getFilesFromDriveWithPagination, {
      connection,
      siteId: undefined,
      driveId: DRIVE_ID,
      fetchAll: false,
      pagination: { pageLimit: 0, pageToken: undefined },
      recursive: false,
    });

    expect(scope.isDone()).toBe(true);
  });

  test("rejects on a server error", async () => {
    nock(GRAPH)
      .get(`/v1.0/drives/${DRIVE_ID}/root/children`)
      .query(pageQuery)
      .reply(500, serverError);

    await expect(
      invoke(getFilesFromDriveWithPagination, {
        connection,
        siteId: undefined,
        driveId: DRIVE_ID,
        fetchAll: false,
        pagination,
        recursive: false,
      }),
    ).rejects.toThrow("Request failed with status code 500");
  });
});

describe("getFilesFromDriveFolderWithPagination", () => {
  test("returns one page of the folder and the next page token", async () => {
    nock(GRAPH)
      .get(`/v1.0/drives/${DRIVE_ID}/items/${FOLDER_ID}/children`)
      .query(pageQuery)
      .reply(200, getFilesFromDriveFolderWithPaginationExamplePayload.data);

    const { result } = await invoke(getFilesFromDriveFolderWithPagination, {
      connection,
      siteId: undefined,
      driveId: DRIVE_ID,
      folderId: FOLDER_ID,
      fetchAll: false,
      pagination,
    });

    expect(result).toEqual(getFilesFromDriveFolderWithPaginationExamplePayload);
  });

  test("sends no page size when Page Limit is blank", async () => {
    const scope = nock(GRAPH)
      .get(`/v1.0/drives/${DRIVE_ID}/items/${FOLDER_ID}/children`)
      .query((query) => Object.keys(query).length === 0)
      .reply(200, getFilesFromDriveFolderWithPaginationExamplePayload.data);

    await invoke(getFilesFromDriveFolderWithPagination, {
      connection,
      siteId: undefined,
      driveId: DRIVE_ID,
      folderId: FOLDER_ID,
      fetchAll: false,
      pagination: { pageLimit: 0, pageToken: undefined },
    });

    expect(scope.isDone()).toBe(true);
  });

  test("rejects when the folder does not exist", async () => {
    nock(GRAPH)
      .get(`/v1.0/drives/${DRIVE_ID}/items/${FOLDER_ID}/children`)
      .query(pageQuery)
      .reply(404, notFound);

    await expect(
      invoke(getFilesFromDriveFolderWithPagination, {
        connection,
        siteId: undefined,
        driveId: DRIVE_ID,
        folderId: FOLDER_ID,
        fetchAll: false,
        pagination,
      }),
    ).rejects.toThrow("Request failed with status code 404");
  });
});

describe("listChanges", () => {
  const deltaURL = `/drives/${DRIVE_ID}/root/delta`;

  test("sends the query options and the delta Prefer header", async () => {
    nock(GRAPH, { reqheaders: { prefer: DELTA_PREFER_HEADER } })
      .get(`/v1.0${deltaURL}`)
      .query({ $select: "id,name", $top: "5" })
      .reply(200, listChangesExamplePayload.data);

    const { result } = await invoke(listChanges, {
      connection,
      deltaURL,
      fetchAll: false,
      queryParameters: { $select: "id,name", $expand: undefined, $top: 5 },
    });

    expect(result).toEqual(listChangesExamplePayload);
  });

  test("rejects when the delta token has expired", async () => {
    nock(GRAPH)
      .get(`/v1.0${deltaURL}`)
      .reply(410, { error: { code: "resyncRequired", message: "Resync required." } });

    await expect(
      invoke(listChanges, {
        connection,
        deltaURL,
        fetchAll: false,
        queryParameters: { $select: undefined, $expand: undefined, $top: undefined },
      }),
    ).rejects.toThrow("Request failed with status code 410");
  });
});
