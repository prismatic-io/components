import nock from "nock";
import { createConnection, invoke } from "@prismatic-io/spectral/dist/testing";
import { connection as connectionDefinition } from "../../connections";
import { updateFile } from "./updateFile";
const connection = createConnection(
  connectionDefinition,
  {},
  { access_token: "test-token" },
);
const DRIVE = "https://www.googleapis.com";
describe("updateFile", () => {
  afterEach(() => nock.cleanAll());
  test("updates a file's content, deriving its MIME type from the file name", async () => {
    nock(DRIVE)
      .patch(
        "/upload/drive/v3/files/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms",
      )
      .query(true)
      .reply(200, {
        kind: "drive#file",
        id: "1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms",
        name: "report.csv",
        mimeType: "text/csv",
        parents: ["1xYz2AbC3DeF4GhI5JkL6MnO7PqR8StU"],
        size: "51940",
        createdTime: "2025-07-14T09:12:44.318Z",
        modifiedTime: "2025-08-02T16:41:07.902Z",
      });
    const { result } = await invoke(updateFile, {
      connection,
      fileId: "1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms",
      fileContent: "name,value\na,2",
      fileName: "report.csv",
      fields: undefined,
    });
    expect(result.data).toMatchObject({
      id: "1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms",
      name: "report.csv",
      mimeType: "text/csv",
    });
  });
  test("surfaces an API error", async () => {
    nock(DRIVE)
      .patch("/upload/drive/v3/files/missing-file")
      .query(true)
      .reply(404, { error: { message: "File not found" } });
    await expect(
      invoke(updateFile, {
        connection,
        fileId: "missing-file",
        fileContent: undefined,
        fileName: "report.csv",
        fields: undefined,
      }),
    ).rejects.toThrow();
  });
});
