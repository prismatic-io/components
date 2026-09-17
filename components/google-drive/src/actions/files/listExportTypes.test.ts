import nock from "nock";
import { createConnection, invoke } from "@prismatic-io/spectral/dist/testing";
import { connection as connectionDefinition } from "../../connections";
import { listExportTypes } from "./listExportTypes";
const connection = createConnection(
  connectionDefinition,
  {},
  { access_token: "test-token" },
);
const DRIVE = "https://www.googleapis.com";
describe("listExportTypes", () => {
  afterEach(() => nock.cleanAll());
  test("returns the available export types", async () => {
    nock(DRIVE)
      .get("/drive/v3/files/abc")
      .query(true)
      .reply(200, {
        exportLinks: {
          "application/x-vnd.oasis.opendocument.spreadsheet":
            "https://docs.google.com/spreadsheets/export?id=abc&exportFormat=ods",
          "text/csv":
            "https://docs.google.com/spreadsheets/export?id=abc&exportFormat=csv",
          "application/pdf":
            "https://docs.google.com/spreadsheets/export?id=abc&exportFormat=pdf",
        },
      });
    const { result } = await invoke(listExportTypes, {
      connection,
      fileId: "abc",
    });
    expect(result.data).toEqual([
      "application/x-vnd.oasis.opendocument.spreadsheet",
      "text/csv",
      "application/pdf",
    ]);
  });
  test("returns an empty array and logs a warning when the file has no export links", async () => {
    nock(DRIVE).get("/drive/v3/files/binary-file").query(true).reply(200, {});
    const { result, loggerMock } = await invoke(listExportTypes, {
      connection,
      fileId: "binary-file",
    });
    expect(result.data).toEqual([]);
    expect(loggerMock.warn).toHaveBeenCalled();
  });
  test("surfaces an API error", async () => {
    nock(DRIVE)
      .get("/drive/v3/files/missing-file")
      .query(true)
      .reply(404, { error: { message: "File not found" } });
    await expect(
      invoke(listExportTypes, { connection, fileId: "missing-file" }),
    ).rejects.toThrow();
  });
});
