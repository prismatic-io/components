import {
  createConnection,
  invokeDataSource,
} from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import { connection as connectionDefinition } from "../connections";
import { MY_DRIVE, MY_DRIVE_LABEL } from "../constants";
import { selectDrive } from "./selectDrive";
const connection = createConnection(
  connectionDefinition,
  {},
  { access_token: "test-token" },
);
const DRIVE = "https://www.googleapis.com";
describe("selectDrive", () => {
  afterEach(() => nock.cleanAll());
  test("returns My Drive followed by every shared drive as key/label pairs", async () => {
    nock(DRIVE)
      .get("/drive/v3/drives")
      .query(true)
      .reply(200, {
        drives: [
          { id: "0AAvGyortvuqEUk9PVA", name: "Marketing Team Drive" },
          { id: "0AL9xQm2FhTzkUk9PVA", name: "Finance Shared Drive" },
        ],
      });
    const { result } = await invokeDataSource(selectDrive, { connection });
    expect(result).toEqual([
      { key: MY_DRIVE, label: MY_DRIVE_LABEL },
      { key: "0AAvGyortvuqEUk9PVA", label: "Marketing Team Drive" },
      { key: "0AL9xQm2FhTzkUk9PVA", label: "Finance Shared Drive" },
    ]);
    for (const element of result) {
      expect(element).toHaveProperty("key");
      expect(element).toHaveProperty("label");
    }
  });
  test("collects drives across every page", async () => {
    nock(DRIVE)
      .get("/drive/v3/drives")
      .query(true)
      .reply(200, { drives: [{ id: "d1", name: "One" }], nextPageToken: "p2" });
    nock(DRIVE)
      .get("/drive/v3/drives")
      .query(true)
      .reply(200, { drives: [{ id: "d2", name: "Two" }] });
    const { result } = await invokeDataSource(selectDrive, { connection });
    expect(result).toHaveLength(3);
    expect(result.map((element) => element.key)).toEqual([
      MY_DRIVE,
      "d1",
      "d2",
    ]);
  });
  test("still offers My Drive when the account has no shared drives", async () => {
    nock(DRIVE).get("/drive/v3/drives").query(true).reply(200, { drives: [] });
    const { result } = await invokeDataSource(selectDrive, { connection });
    expect(result).toEqual([{ key: MY_DRIVE, label: MY_DRIVE_LABEL }]);
  });
  test("surfaces an API error", async () => {
    nock(DRIVE)
      .get("/drive/v3/drives")
      .query(true)
      .reply(401, { error: { message: "invalid credentials" } });
    await expect(
      invokeDataSource(selectDrive, { connection }),
    ).rejects.toThrow();
  });
});
