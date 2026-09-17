import nock from "nock";
import { createConnection, invoke } from "@prismatic-io/spectral/dist/testing";
import { connection as connectionDefinition } from "../../connections";
import { searchFolders } from "./searchFolders";
const connection = createConnection(
  connectionDefinition,
  {},
  { access_token: "test-token" },
);
const DRIVE = "https://www.googleapis.com";
const baseParams = {
  connection,
  driveId: undefined,
  searchQuery: undefined,
  folderId: undefined,
  fields: undefined,
  pagination: { pageSize: undefined, pageToken: undefined },
};
describe("searchFolders", () => {
  afterEach(() => nock.cleanAll());
  test("composes folderId and searchQuery onto the base folder query", async () => {
    const finalQuery =
      "'1QwErTy2UiOp3AsDf4GhJk5LzXcVbNm6' in parents and mimeType='application/vnd.google-apps.folder' and name contains 'Campaign'";
    nock(DRIVE)
      .get("/drive/v3/files")
      .query((q) => q.q === finalQuery)
      .reply(200, {
        kind: "drive#fileList",
        files: [
          { id: "1QwErTy2UiOp3AsDf4GhJk5LzXcVbNm6", name: "Campaign Assets" },
        ],
      });
    const { result } = await invoke(searchFolders, {
      ...baseParams,
      folderId: "1QwErTy2UiOp3AsDf4GhJk5LzXcVbNm6",
      searchQuery: "Campaign",
      fetchAll: false,
    });
    expect((result.data as Record<string, unknown>).files).toEqual([
      { id: "1QwErTy2UiOp3AsDf4GhJk5LzXcVbNm6", name: "Campaign Assets" },
    ]);
  });
  test("throws when no folders match the query", async () => {
    nock(DRIVE)
      .get("/drive/v3/files")
      .query(true)
      .reply(200, { kind: "drive#fileList", files: [] });
    await expect(
      invoke(searchFolders, {
        ...baseParams,
        searchQuery: "nonexistent",
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
      invoke(searchFolders, {
        ...baseParams,
        searchQuery: "nonexistent",
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
      invoke(searchFolders, {
        ...baseParams,
        searchQuery: "Campaign",
        fetchAll: false,
      }),
    ).rejects.toThrow();
  });
});
