import nock from "nock";
import { createConnection, invoke } from "@prismatic-io/spectral/dist/testing";
import { connection as connectionDefinition } from "../../connections";
import { emptyTrash } from "./emptyTrash";
const connection = createConnection(
  connectionDefinition,
  {},
  { access_token: "test-token" },
);
const DRIVE = "https://www.googleapis.com";
describe("emptyTrash", () => {
  afterEach(() => nock.cleanAll());
  test("empties the trash", async () => {
    nock(DRIVE).delete("/drive/v3/files/trash").query(true).reply(200, {});
    const { result } = await invoke(emptyTrash, { connection });
    expect(result).toHaveProperty("data");
  });
  test("surfaces an API error", async () => {
    nock(DRIVE)
      .delete("/drive/v3/files/trash")
      .query(true)
      .reply(500, { error: { message: "boom" } });
    await expect(invoke(emptyTrash, { connection })).rejects.toThrow();
  });
});
