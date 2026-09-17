import nock from "nock";
import { createConnection, invoke } from "@prismatic-io/spectral/dist/testing";
import { connection as connectionDefinition } from "../../connections";
import { searchFiles } from "./searchFiles";
const connection = createConnection(
  connectionDefinition,
  {},
  { access_token: "test-token" },
);
const DRIVE = "https://www.googleapis.com";
const baseParams = {
  connection,
  driveId: undefined,
  filters: {
    searchQuery: undefined,
    filesContainingSearchQuery: undefined,
    query: undefined,
  },
  folderId: undefined,
  fields: undefined,
  pagination: { pageSize: undefined, pageToken: undefined },
};
describe("searchFiles", () => {
  afterEach(() => nock.cleanAll());
  test("composes folderId, searchQuery and a custom query into a single `q` parameter", async () => {
    const finalQuery =
      "'1xYz2AbC3DeF4GhI5JkL6MnO7PqR8StU' in parents and name contains 'Revenue' and mimeType!='application/vnd.google-apps.folder'";
    nock(DRIVE)
      .get("/drive/v3/files")
      .query((q) => q.q === finalQuery)
      .reply(200, {
        kind: "drive#fileList",
        files: [
          {
            id: "1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms",
            name: "Q3 Revenue Report.xlsx",
          },
        ],
      });
    const { result } = await invoke(searchFiles, {
      ...baseParams,
      folderId: "1xYz2AbC3DeF4GhI5JkL6MnO7PqR8StU",
      filters: {
        searchQuery: "Revenue",
        filesContainingSearchQuery: true,
        query: "mimeType!='application/vnd.google-apps.folder'",
      },
      fetchAll: false,
    });
    expect((result.data as Record<string, unknown>).files).toEqual([
      {
        id: "1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms",
        name: "Q3 Revenue Report.xlsx",
      },
    ]);
  });
  test("throws when no files match the query", async () => {
    nock(DRIVE)
      .get("/drive/v3/files")
      .query(true)
      .reply(200, { kind: "drive#fileList", files: [] });
    await expect(
      invoke(searchFiles, {
        ...baseParams,
        filters: { ...baseParams.filters, searchQuery: "nonexistent" },
        fetchAll: false,
      }),
    ).rejects.toThrow(/No results found/);
  });
  test("throws a TypeError, not the custom error, when the API response omits `files` entirely", async () => {
    nock(DRIVE)
      .get("/drive/v3/files")
      .query(true)
      .reply(200, { kind: "drive#fileList" });
    await expect(
      invoke(searchFiles, {
        ...baseParams,
        filters: { ...baseParams.filters, searchQuery: "nonexistent" },
        fetchAll: false,
      }),
    ).rejects.toThrow(TypeError);
  });
  test("surfaces an API error", async () => {
    nock(DRIVE)
      .get("/drive/v3/files")
      .query(true)
      .reply(500, { error: { message: "Server error" } });
    await expect(
      invoke(searchFiles, {
        ...baseParams,
        filters: { ...baseParams.filters, searchQuery: "Revenue" },
        fetchAll: false,
      }),
    ).rejects.toThrow();
  });
});
