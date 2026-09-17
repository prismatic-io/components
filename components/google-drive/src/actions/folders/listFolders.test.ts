import nock from "nock";
import { createConnection, invoke } from "@prismatic-io/spectral/dist/testing";
import { connection as connectionDefinition } from "../../connections";
import { listFolders } from "./listFolders";
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
  folderId: undefined,
};
describe("listFolders", () => {
  afterEach(() => nock.cleanAll());
  test("queries only for folders when no folderId is given", async () => {
    nock(DRIVE)
      .get("/drive/v3/files")
      .query(
        (q) =>
          typeof q.q === "string" &&
          q.q === "mimeType='application/vnd.google-apps.folder'",
      )
      .reply(200, {
        kind: "drive#fileList",
        files: [{ id: "1xYz2AbC3DeF4GhI5JkL6MnO7PqR8StU", name: "Finance" }],
      });
    const { result } = await invoke(listFolders, {
      ...baseParams,
      fetchAll: false,
    });
    expect((result.data as Record<string, unknown>).files).toEqual([
      { id: "1xYz2AbC3DeF4GhI5JkL6MnO7PqR8StU", name: "Finance" },
    ]);
  });
  test("scopes the query to a parent folder when folderId is given", async () => {
    nock(DRIVE)
      .get("/drive/v3/files")
      .query(
        (q) =>
          typeof q.q === "string" &&
          q.q ===
            "'1xYz2AbC3DeF4GhI5JkL' in parents and mimeType='application/vnd.google-apps.folder'",
      )
      .reply(200, { kind: "drive#fileList", files: [] });
    const { result } = await invoke(listFolders, {
      ...baseParams,
      folderId: "1xYz2AbC3DeF4GhI5JkL",
      fetchAll: false,
    });
    expect((result.data as Record<string, unknown>).files).toEqual([]);
  });
  test("fetchAll true walks every page and returns only the collected folders", async () => {
    nock(DRIVE)
      .get("/drive/v3/files")
      .query(true)
      .reply(200, {
        files: [{ id: "1xYz2AbC3DeF4GhI5JkL6MnO7PqR8StU", name: "Finance" }],
        nextPageToken: "p2",
      });
    nock(DRIVE)
      .get("/drive/v3/files")
      .query(true)
      .reply(200, {
        files: [
          { id: "1QwErTy2UiOp3AsDf4GhJk5LzXcVbNm6", name: "Campaign Assets" },
        ],
      });
    const { result } = await invoke(listFolders, {
      ...baseParams,
      fetchAll: true,
    });
    expect(result.data).toEqual({
      files: [
        { id: "1xYz2AbC3DeF4GhI5JkL6MnO7PqR8StU", name: "Finance" },
        { id: "1QwErTy2UiOp3AsDf4GhJk5LzXcVbNm6", name: "Campaign Assets" },
      ],
    });
  });
  test("surfaces an API error", async () => {
    nock(DRIVE)
      .get("/drive/v3/files")
      .query(true)
      .reply(403, { error: { message: "forbidden" } });
    await expect(
      invoke(listFolders, { ...baseParams, fetchAll: false }),
    ).rejects.toThrow();
  });
});
