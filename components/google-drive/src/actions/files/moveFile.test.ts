import nock from "nock";
import { createConnection, invoke } from "@prismatic-io/spectral/dist/testing";
import { connection as connectionDefinition } from "../../connections";
import { moveFile } from "./moveFile";
const connection = createConnection(
  connectionDefinition,
  {},
  { access_token: "test-token" },
);
const DRIVE = "https://www.googleapis.com";
describe("moveFile", () => {
  afterEach(() => nock.cleanAll());
  test("moves a file to a new parent folder", async () => {
    nock(DRIVE)
      .get("/drive/v3/files/1a2b3c4d5e6f7g8h9i0j")
      .query(true)
      .reply(200, { parents: ["oldParentId"] });
    nock(DRIVE)
      .patch("/drive/v3/files/1a2b3c4d5e6f7g8h9i0j")
      .query(true)
      .reply(200, { name: "example", description: "example" });
    const { result } = await invoke(moveFile, {
      connection,
      fileId: "1a2b3c4d5e6f7g8h9i0j",
      folderId: "1xYz2AbC3DeF4GhI5JkL",
    });
    expect(result.data).toEqual({ name: "example", description: "example" });
  });
  test("surfaces an API error", async () => {
    nock(DRIVE)
      .get("/drive/v3/files/1a2b3c4d5e6f7g8h9i0j")
      .query(true)
      .reply(404, { error: { message: "File not found" } });
    await expect(
      invoke(moveFile, {
        connection,
        fileId: "1a2b3c4d5e6f7g8h9i0j",
        folderId: "1xYz2AbC3DeF4GhI5JkL",
      }),
    ).rejects.toThrow();
  });
});
