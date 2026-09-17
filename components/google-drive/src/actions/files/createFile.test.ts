import nock from "nock";
import { createConnection, invoke } from "@prismatic-io/spectral/dist/testing";
import { connection as connectionDefinition } from "../../connections";
import { createFile } from "./createFile";
const connection = createConnection(
  connectionDefinition,
  {},
  { access_token: "test-token" },
);
const DRIVE = "https://www.googleapis.com";
describe("createFile", () => {
  afterEach(() => nock.cleanAll());
  test("creates a file, deriving its MIME type from the file name", async () => {
    nock(DRIVE)
      .post("/upload/drive/v3/files")
      .query(true)
      .reply(200, {
        kind: "drive#file",
        id: "1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms",
        name: "report.csv",
        mimeType: "text/csv",
        parents: ["1xYz2AbC3DeF4GhI5JkL6MnO7PqR8StU"],
        size: "48213",
        createdTime: "2025-07-14T09:12:44.318Z",
        modifiedTime: "2025-07-14T09:12:44.318Z",
      });
    const { result } = await invoke(createFile, {
      connection,
      folderId: "1xYz2AbC3DeF4GhI5JkL6MnO7PqR8StU",
      fileContent: "name,value\na,1",
      fileName: "report.csv",
      fields: undefined,
    });
    expect(result.data).toMatchObject({
      name: "report.csv",
      mimeType: "text/csv",
    });
  });
  test("surfaces an API error", async () => {
    nock(DRIVE)
      .post("/upload/drive/v3/files")
      .query(true)
      .reply(400, { error: { message: "Bad request" } });
    await expect(
      invoke(createFile, {
        connection,
        folderId: undefined,
        fileContent: "some content",
        fileName: "report.csv",
        fields: undefined,
      }),
    ).rejects.toThrow();
  });
});
