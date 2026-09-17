import nock from "nock";
import { createConnection, invoke } from "@prismatic-io/spectral/dist/testing";
import { connection as connectionDefinition } from "../../connections";
import { deleteFile } from "./deleteFile";
const connection = createConnection(
  connectionDefinition,
  {},
  { access_token: "test-token" },
);
const DRIVE = "https://www.googleapis.com";
describe("deleteFile", () => {
  afterEach(() => nock.cleanAll());
  test("deletes a file", async () => {
    nock(DRIVE)
      .delete("/drive/v3/files/1a2b3c4d5e6f7g8h9i0j")
      .query(true)
      .reply(200, {});
    const { result } = await invoke(deleteFile, {
      connection,
      fileId: "1a2b3c4d5e6f7g8h9i0j",
      fields: undefined,
    });
    expect(result).toHaveProperty("data");
  });
  test("surfaces an API error", async () => {
    nock(DRIVE)
      .delete("/drive/v3/files/1a2b3c4d5e6f7g8h9i0j")
      .query(true)
      .reply(404, {
        error: { message: "File not found" },
      });
    await expect(
      invoke(deleteFile, {
        connection,
        fileId: "1a2b3c4d5e6f7g8h9i0j",
        fields: undefined,
      }),
    ).rejects.toThrow();
  });
});
