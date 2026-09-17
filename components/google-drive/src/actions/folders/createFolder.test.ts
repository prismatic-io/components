import nock from "nock";
import { createConnection, invoke } from "@prismatic-io/spectral/dist/testing";
import { connection as connectionDefinition } from "../../connections";
import { createFolder } from "./createFolder";
const connection = createConnection(
  connectionDefinition,
  {},
  { access_token: "test-token" },
);
const DRIVE = "https://www.googleapis.com";
describe("createFolder", () => {
  afterEach(() => nock.cleanAll());
  test("creates a folder", async () => {
    nock(DRIVE)
      .post("/drive/v3/files")
      .query(true)
      .reply(200, { name: "Pictures", description: "example" });
    const { result } = await invoke(createFolder, {
      connection,
      folderName: "Pictures",
      parentFolderId: "1xYz2AbC3DeF4GhI5JkL",
    });
    expect(result.data).toEqual({ name: "Pictures", description: "example" });
  });
  test("surfaces an API error", async () => {
    nock(DRIVE)
      .post("/drive/v3/files")
      .query(true)
      .reply(400, { error: { message: "Invalid parent" } });
    await expect(
      invoke(createFolder, {
        connection,
        folderName: "Pictures",
        parentFolderId: "invalid",
      }),
    ).rejects.toThrow();
  });
});
