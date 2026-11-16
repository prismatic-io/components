import { createConnection, invoke } from "@prismatic-io/spectral/testing";
import nock from "nock";
import { oauth } from "../../connections/oauth";
import {
  getFileExamplePayload,
  moveFileExamplePayload,
  updateFileExamplePayload,
  uploadFileExamplePayload,
} from "../../examplePayloads";
import { downloadFile } from "./downloadFile";
import { getFile } from "./getFile";
import { moveFile } from "./moveFile";
import { updateFile } from "./updateFile";
import { uploadFile } from "./uploadFile";

const GRAPH = "https://graph.microsoft.com";
const DOWNLOAD_HOST = "https://example.sharepoint.com";
const connection = createConnection(
  oauth,
  {},
  { access_token: "eyJ0eXAiOiJKV1QiLCJub25jZSI6InNoYXJlcG9pbnQtdGVzdCJ9" },
);
const DRIVE_ID = "b!j4hEbINY8E6lQtIagCz-pgZdLe2S4UdAr6al1_JbNBjiyKTRbzt6TZ4cXyuKDWxD";
const ITEM_ID = "01XH3P5XEJFT6Z7LZFYVEPIUB2XBIZRHS4";
const FOLDER_ID = "01GSSFDXCQ3Z5WH3SSD24SI4FP2CHOPJFT";
const PARENT_ID = "01SL2AYQVWKBEWAFIIOF2ZWAXAXWVSD3MI";
const FILE_NAME = "Budget 2026.xlsx";
const fileBytes = { data: Buffer.from("Region,Amount\nNorth,1200\n"), contentType: "text/csv" };
const notFound = {
  error: { code: "itemNotFound", message: "The resource could not be found." },
};
const forbidden = {
  error: { code: "accessDenied", message: "Access denied." },
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

describe("getFile", () => {
  test("returns the file content", async () => {
    nock(GRAPH)
      .get(`/v1.0/drives/${DRIVE_ID}/items/${ITEM_ID}/content`)
      .reply(200, getFileExamplePayload.data, { "Content-Type": "text/plain" });

    const { result } = await invoke(getFile, {
      connection,
      siteId: undefined,
      listId: undefined,
      driveId: DRIVE_ID,
      itemId: ITEM_ID,
    });

    expect(result).toEqual(getFileExamplePayload);
    expect(typeof result?.data).toBe("string");
  });

  test("returns a JSON file's content parsed", async () => {
    nock(GRAPH)
      .get(`/v1.0/drives/${DRIVE_ID}/items/${ITEM_ID}/content`)
      .reply(200, { region: "North", amount: 1200 }, { "Content-Type": "application/json" });

    const { result } = await invoke(getFile, {
      connection,
      siteId: undefined,
      listId: undefined,
      driveId: DRIVE_ID,
      itemId: ITEM_ID,
    });

    expect(result).toEqual({ data: { region: "North", amount: 1200 } });
  });

  test("rethrows the error message when the file does not exist", async () => {
    nock(GRAPH).get(`/v1.0/drives/${DRIVE_ID}/items/${ITEM_ID}/content`).reply(404, notFound);

    await expect(
      invoke(getFile, {
        connection,
        siteId: undefined,
        listId: undefined,
        driveId: DRIVE_ID,
        itemId: ITEM_ID,
      }),
    ).rejects.toThrow("Request failed with status code 404");
  });
});

describe("uploadFile", () => {
  test("puts the bytes under the folder and returns the new item", async () => {
    const scope = nock(GRAPH)
      .put(
        `/v1.0/drives/${DRIVE_ID}/items/${FOLDER_ID}:/${encodeURIComponent(FILE_NAME)}:/content`,
        fileBytes.data.toString(),
      )
      .reply(201, uploadFileExamplePayload.data);

    const { result } = await invoke(uploadFile, {
      connection,
      siteId: undefined,
      driveId: DRIVE_ID,
      fileName: FILE_NAME,
      fileData: fileBytes,
      folderId: FOLDER_ID,
    });

    expect(scope.isDone()).toBe(true);
    expect(result).toEqual(uploadFileExamplePayload);
  });

  test("rejects when the caller cannot write to the drive", async () => {
    nock(GRAPH)
      .put(`/v1.0/drives/${DRIVE_ID}/items/${FOLDER_ID}:/${encodeURIComponent(FILE_NAME)}:/content`)
      .reply(403, forbidden);

    await expect(
      invoke(uploadFile, {
        connection,
        siteId: undefined,
        driveId: DRIVE_ID,
        fileName: FILE_NAME,
        fileData: fileBytes,
        folderId: FOLDER_ID,
      }),
    ).rejects.toThrow("Request failed with status code 403");
  });
});

describe("updateFile", () => {
  test("replaces the item content and returns the updated item", async () => {
    const scope = nock(GRAPH)
      .put(`/v1.0/drives/${DRIVE_ID}/items/${ITEM_ID}/content`, fileBytes.data.toString())
      .reply(200, updateFileExamplePayload.data);

    const { result } = await invoke(updateFile, {
      connection,
      siteId: undefined,
      listId: undefined,
      driveId: DRIVE_ID,
      itemId: ITEM_ID,
      fileData: fileBytes,
    });

    expect(scope.isDone()).toBe(true);
    expect(result).toEqual(updateFileExamplePayload);
  });

  test("rejects when the item does not exist", async () => {
    nock(GRAPH).put(`/v1.0/drives/${DRIVE_ID}/items/${ITEM_ID}/content`).reply(404, notFound);

    await expect(
      invoke(updateFile, {
        connection,
        siteId: undefined,
        listId: undefined,
        driveId: DRIVE_ID,
        itemId: ITEM_ID,
        fileData: fileBytes,
      }),
    ).rejects.toThrow("Request failed with status code 404");
  });
});

describe("downloadFile", () => {
  const item = moveFileExamplePayload.data;
  const itemPath = `/v1.0/drives/${DRIVE_ID}/items/${ITEM_ID}`;
  const bytes = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0xff, 0xfe]);
  const run = () =>
    invoke(downloadFile, {
      connection,
      siteId: undefined,
      listId: undefined,
      driveId: DRIVE_ID,
      itemId: ITEM_ID,
    });

  test("downloads the content from Graph and returns the bytes with the item's MIME type", async () => {
    nock(GRAPH).get(itemPath).reply(200, item);
    nock(GRAPH)
      .get(`${itemPath}/content`)
      .reply(200, bytes, { "Content-Type": "application/octet-stream" });

    const { result } = await run();

    expect(result).toEqual({ data: bytes, contentType: item.file.mimeType });
    expect(Buffer.isBuffer(result?.data)).toBe(true);
  });

  test("follows the redirect Graph answers with today and returns the same bytes", async () => {
    nock(GRAPH).get(itemPath).reply(200, item);
    nock(GRAPH)
      .get(`${itemPath}/content`)
      .reply(302, undefined, { Location: `${DOWNLOAD_HOST}/download/budget-2026` });
    nock(DOWNLOAD_HOST)
      .get("/download/budget-2026")
      .reply(200, bytes, { "Content-Type": "application/octet-stream" });

    const { result } = await run();

    expect(result).toEqual({ data: bytes, contentType: item.file.mimeType });
  });

  test("rethrows the error message when the item does not exist", async () => {
    nock(GRAPH).get(`/v1.0/drives/${DRIVE_ID}/items/${ITEM_ID}`).reply(404, notFound);

    await expect(
      invoke(downloadFile, {
        connection,
        siteId: undefined,
        listId: undefined,
        driveId: DRIVE_ID,
        itemId: ITEM_ID,
      }),
    ).rejects.toThrow("Request failed with status code 404");
  });
});

describe("moveFile", () => {
  test("patches the item's parent reference and returns the moved item", async () => {
    const scope = nock(GRAPH)
      .patch(`/v1.0/drives/${DRIVE_ID}/items/${ITEM_ID}`, { parentReference: { id: PARENT_ID } })
      .reply(200, moveFileExamplePayload.data);

    const { result } = await invoke(moveFile, {
      connection,
      siteId: undefined,
      listId: undefined,
      driveId: DRIVE_ID,
      itemId: ITEM_ID,
      parentItemId: PARENT_ID,
    });

    expect(scope.isDone()).toBe(true);
    expect(result).toEqual(moveFileExamplePayload);
  });

  test("rejects when the destination does not exist", async () => {
    nock(GRAPH).patch(`/v1.0/drives/${DRIVE_ID}/items/${ITEM_ID}`).reply(404, notFound);

    await expect(
      invoke(moveFile, {
        connection,
        siteId: undefined,
        listId: undefined,
        driveId: DRIVE_ID,
        itemId: ITEM_ID,
        parentItemId: PARENT_ID,
      }),
    ).rejects.toThrow("Request failed with status code 404");
  });
});
