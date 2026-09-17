import nock from "nock";
import { createConnection, invoke } from "@prismatic-io/spectral/dist/testing";
import { connection as connectionDefinition } from "../../connections";
import { listDrives } from "./listDrives";
const connection = createConnection(
  connectionDefinition,
  {},
  { access_token: "test-token" },
);
const DRIVE = "https://www.googleapis.com";
describe("listDrives", () => {
  afterEach(() => nock.cleanAll());
  test("collects every page of drives and unwraps the envelope", async () => {
    nock(DRIVE)
      .get("/drive/v3/drives")
      .query(true)
      .reply(200, {
        drives: [{ id: "0AAvGyortvuqEUk9PVA", name: "Marketing Team Drive" }],
        nextPageToken: "p2",
      });
    nock(DRIVE)
      .get("/drive/v3/drives")
      .query(true)
      .reply(200, {
        drives: [{ id: "0AL9xQm2FhTzkUk9PVA", name: "Finance Shared Drive" }],
      });
    const { result } = await invoke(listDrives, { connection });
    expect(result.data).toEqual([
      { id: "0AAvGyortvuqEUk9PVA", name: "Marketing Team Drive" },
      { id: "0AL9xQm2FhTzkUk9PVA", name: "Finance Shared Drive" },
    ]);
  });
  test("surfaces an API error", async () => {
    nock(DRIVE)
      .get("/drive/v3/drives")
      .query(true)
      .reply(500, { error: { message: "Server error" } });
    await expect(invoke(listDrives, { connection })).rejects.toThrow();
  });
});
