import {
  createConnection,
  invokeDataSource,
} from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import { connection as connectionDefinition } from "../connections";
import { selectFiles } from "./selectFiles";
const connection = createConnection(
  connectionDefinition,
  {},
  { access_token: "test-token" },
);
const DRIVE = "https://www.googleapis.com";
const params = {
  connection,
  driveId: undefined,
  query: undefined,
  pageSize: undefined,
};
describe("selectFiles", () => {
  afterEach(() => nock.cleanAll());
  test("maps each file to a key/label pair", async () => {
    nock(DRIVE)
      .get("/drive/v3/files")
      .query(true)
      .reply(200, {
        files: [
          {
            id: "1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms",
            name: "Q3 Revenue Report.xlsx",
          },
          {
            id: "1a2b3c4d5e6f7g8h9i0jKlMnOpQrStUvWxYz1234",
            name: "Team Onboarding.pdf",
          },
        ],
      });
    const { result } = await invokeDataSource(selectFiles, params);
    expect(result).toEqual([
      {
        key: "1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms",
        label: "Q3 Revenue Report.xlsx",
      },
      {
        key: "1a2b3c4d5e6f7g8h9i0jKlMnOpQrStUvWxYz1234",
        label: "Team Onboarding.pdf",
      },
    ]);
    for (const element of result) {
      expect(element).toHaveProperty("key");
      expect(element).toHaveProperty("label");
    }
  });
  test("returns an empty picklist when the drive holds no files", async () => {
    nock(DRIVE).get("/drive/v3/files").query(true).reply(200, { files: [] });
    const { result } = await invokeDataSource(selectFiles, params);
    expect(result).toEqual([]);
  });
  test("forwards the search query and scopes the request to the chosen drive", async () => {
    let received: Record<string, unknown> = {};
    nock(DRIVE)
      .get("/drive/v3/files")
      .query((actual) => {
        received = actual;
        return true;
      })
      .reply(200, { files: [] });
    await invokeDataSource(selectFiles, {
      ...params,
      driveId: "0AAvGyortvuqEXAMPLE",
      query: "name contains 'report'",
    });
    expect(received.q).toBe("name contains 'report'");
    expect(received.driveId).toBe("0AAvGyortvuqEXAMPLE");
    expect(received.corpora).toBe("drive");
  });
  test("collects files across every page", async () => {
    nock(DRIVE)
      .get("/drive/v3/files")
      .query(true)
      .reply(200, { files: [{ id: "f1", name: "One" }], nextPageToken: "p2" });
    nock(DRIVE)
      .get("/drive/v3/files")
      .query(true)
      .reply(200, { files: [{ id: "f2", name: "Two" }] });
    const { result } = await invokeDataSource(selectFiles, params);
    expect(result).toEqual([
      { key: "f1", label: "One" },
      { key: "f2", label: "Two" },
    ]);
  });
  test("appends the file ID when two files share a name", async () => {
    nock(DRIVE)
      .get("/drive/v3/files")
      .query(true)
      .reply(200, {
        files: [
          { id: "f1", name: "Q3 Revenue Report.xlsx" },
          { id: "f2", name: "Q3 Revenue Report.xlsx" },
          { id: "f3", name: "Team Onboarding.pdf" },
        ],
      });
    const { result } = await invokeDataSource(selectFiles, params);
    expect(result).toEqual([
      { key: "f1", label: "Q3 Revenue Report.xlsx (f1)" },
      { key: "f2", label: "Q3 Revenue Report.xlsx (f2)" },
      { key: "f3", label: "Team Onboarding.pdf" },
    ]);
  });
  test("surfaces an API error", async () => {
    nock(DRIVE)
      .get("/drive/v3/files")
      .query(true)
      .reply(403, { error: { message: "forbidden" } });
    await expect(invokeDataSource(selectFiles, params)).rejects.toThrow();
  });
});
