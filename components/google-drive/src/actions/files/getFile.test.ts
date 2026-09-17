import nock from "nock";
import { createConnection, invoke } from "@prismatic-io/spectral/dist/testing";
import { connection as connectionDefinition } from "../../connections";
import { getFile } from "./getFile";
const connection = createConnection(
  connectionDefinition,
  {},
  { access_token: "test-token" },
);
const DRIVE = "https://www.googleapis.com";
describe("getFile", () => {
  afterEach(() => nock.cleanAll());
  test("downloads a small binary file via chunked media requests", async () => {
    nock(DRIVE)
      .get("/drive/v3/files/abc")
      .query(true)
      .reply(200, { mimeType: "text/plain", size: "5", name: "a.txt" });
    nock(DRIVE).get("/drive/v3/files/abc").query(true).reply(200, "hello");
    const { result } = await invoke(getFile, {
      connection,
      fileId: "abc",
      exportType: undefined,
    });
    expect(result.contentType).toBe("text/plain");
    expect(Buffer.from(result.data as Uint8Array).toString()).toBe("hello");
  });
  test("returns an empty buffer with no error when metadata reports no size", async () => {
    nock(DRIVE)
      .get("/drive/v3/files/empty")
      .query(true)
      .reply(200, { mimeType: "text/plain", name: "empty.txt" });
    const { result } = await invoke(getFile, {
      connection,
      fileId: "empty",
      exportType: undefined,
    });
    expect(result.contentType).toBe("text/plain");
    expect(Buffer.from(result.data as Uint8Array).length).toBe(0);
  });
  test("throws when the file is a folder", async () => {
    nock(DRIVE)
      .get("/drive/v3/files/folder-id")
      .query(true)
      .reply(200, {
        mimeType: "application/vnd.google-apps.folder",
        name: "My Folder",
      });
    await expect(
      invoke(getFile, {
        connection,
        fileId: "folder-id",
        exportType: undefined,
      }),
    ).rejects.toThrow("Cannot download a folder.");
  });
  test("throws when the file requires an export type but none is provided", async () => {
    nock(DRIVE)
      .get("/drive/v3/files/doc-id")
      .query(true)
      .reply(200, {
        mimeType: "application/vnd.google-apps.document",
        name: "My Doc",
        exportLinks: {
          "application/pdf":
            "https://docs.google.com/document/export?id=doc-id&exportFormat=pdf",
        },
      });
    await expect(
      invoke(getFile, { connection, fileId: "doc-id", exportType: undefined }),
    ).rejects.toThrow("Export Type must be specified to export this file.");
  });
  test("exports a file when an export type is provided", async () => {
    nock(DRIVE)
      .get("/drive/v3/files/doc-id")
      .query(true)
      .reply(200, {
        mimeType: "application/vnd.google-apps.document",
        name: "My Doc",
        exportLinks: {
          "application/pdf":
            "https://docs.google.com/document/export?id=doc-id&exportFormat=pdf",
        },
      });
    nock(DRIVE)
      .get("/drive/v3/files/doc-id/export")
      .query(true)
      .reply(200, "%PDF-1.4 fake bytes");
    const { result } = await invoke(getFile, {
      connection,
      fileId: "doc-id",
      exportType: "application/pdf",
    });
    expect(result.contentType).toBe("application/pdf");
    expect(Buffer.from(result.data as Uint8Array).toString()).toBe(
      "%PDF-1.4 fake bytes",
    );
  });
  test("surfaces an API error from the metadata lookup", async () => {
    nock(DRIVE)
      .get("/drive/v3/files/missing-file")
      .query(true)
      .reply(404, { error: { message: "File not found" } });
    await expect(
      invoke(getFile, {
        connection,
        fileId: "missing-file",
        exportType: undefined,
      }),
    ).rejects.toThrow();
  });
});
