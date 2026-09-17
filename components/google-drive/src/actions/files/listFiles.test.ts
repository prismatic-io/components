import nock from "nock";
import { createConnection, invoke } from "@prismatic-io/spectral/dist/testing";
import { connection as connectionDefinition } from "../../connections";
import { listFiles } from "./listFiles";
const connection = createConnection(
  connectionDefinition,
  {},
  { access_token: "test-token" },
);
const DRIVE = "https://www.googleapis.com";
const baseParams = {
  connection,
  driveId: undefined,
  pagination: { pageSize: undefined, pageToken: undefined },
  fields: undefined,
  query: undefined,
};
describe("listFiles", () => {
  afterEach(() => nock.cleanAll());
  test("fetchAll false returns the raw page body, envelope included", async () => {
    nock(DRIVE)
      .get("/drive/v3/files")
      .query(true)
      .reply(200, {
        kind: "drive#fileList",
        nextPageToken: "~!!~AI9FV7RiPMAcQBBrmZFOMt0lBHzXBQvpqYMTNQ",
        files: [
          {
            id: "1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms",
            name: "Q3 Revenue Report.xlsx",
          },
        ],
      });
    const { result } = await invoke(listFiles, {
      ...baseParams,
      fetchAll: false,
    });
    expect(result.data).toEqual({
      kind: "drive#fileList",
      nextPageToken: "~!!~AI9FV7RiPMAcQBBrmZFOMt0lBHzXBQvpqYMTNQ",
      files: [
        {
          id: "1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms",
          name: "Q3 Revenue Report.xlsx",
        },
      ],
    });
  });
  test("fetchAll true walks every page and returns only the collected files", async () => {
    nock(DRIVE)
      .get("/drive/v3/files")
      .query(true)
      .reply(200, {
        kind: "drive#fileList",
        files: [{ id: "1", name: "One" }],
        nextPageToken: "p2",
      });
    nock(DRIVE)
      .get("/drive/v3/files")
      .query(true)
      .reply(200, {
        kind: "drive#fileList",
        files: [{ id: "2", name: "Two" }],
      });
    const { result } = await invoke(listFiles, {
      ...baseParams,
      fetchAll: true,
    });
    expect(result.data).toEqual({
      files: [
        { id: "1", name: "One" },
        { id: "2", name: "Two" },
      ],
    });
  });
  test("surfaces an API error", async () => {
    nock(DRIVE)
      .get("/drive/v3/files")
      .query(true)
      .reply(500, { error: { message: "Server error" } });
    await expect(
      invoke(listFiles, { ...baseParams, fetchAll: false }),
    ).rejects.toThrow();
  });
});
