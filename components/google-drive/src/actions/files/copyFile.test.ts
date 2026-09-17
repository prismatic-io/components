import nock from "nock";
import { createConnection, invoke } from "@prismatic-io/spectral/dist/testing";
import { connection as connectionDefinition } from "../../connections";
import { copyFile } from "./copyFile";
const connection = createConnection(
  connectionDefinition,
  {},
  { access_token: "test-token" },
);
const DRIVE = "https://www.googleapis.com";
describe("copyFile", () => {
  afterEach(() => nock.cleanAll());
  test("copies a file, returning the new copy's name", async () => {
    nock(DRIVE)
      .post("/drive/v3/files/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/copy")
      .query(true)
      .reply(200, {
        name: "Q3 Revenue Report (copy).xlsx",
        description: "example",
      });
    const { result } = await invoke(copyFile, {
      connection,
      fileId: "1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms",
      fileName: "Q3 Revenue Report (copy).xlsx",
      folderId: "1xYz2AbC3DeF4GhI5JkL6MnO7PqR8StU",
    });
    expect(result.data).toEqual({
      name: "Q3 Revenue Report (copy).xlsx",
      description: "example",
    });
  });
  test("surfaces an API error", async () => {
    nock(DRIVE)
      .post("/drive/v3/files/missing-file/copy")
      .query(true)
      .reply(404, { error: { message: "File not found" } });
    await expect(
      invoke(copyFile, {
        connection,
        fileId: "missing-file",
        fileName: "copy.xlsx",
        folderId: undefined,
      }),
    ).rejects.toThrow();
  });
});
