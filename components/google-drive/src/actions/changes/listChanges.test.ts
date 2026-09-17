import nock from "nock";
import { createConnection, invoke } from "@prismatic-io/spectral/dist/testing";
import { connection as connectionDefinition } from "../../connections";
import { listChanges } from "./listChanges";
const connection = createConnection(
  connectionDefinition,
  {},
  { access_token: "test-token" },
);
const DRIVE = "https://www.googleapis.com";
const NEW_STATE_KEY =
  "google-drive-list-changes-page-token:flowStableId:mockStepId";
describe("listChanges", () => {
  afterEach(() => nock.cleanAll());
  test("with no stored token, fetches a start page token and returns no changes", async () => {
    nock(DRIVE)
      .get("/drive/v3/changes/startPageToken")
      .query(true)
      .reply(200, { startPageToken: "100" });
    const { result } = await invoke(listChanges, {
      connection,
      driveId: undefined,
    });
    expect(result.data).toEqual({
      kind: "drive#changeList",
      newStartPageToken: "100",
      changes: [],
    });
    expect(result.crossFlowState).toEqual({ [NEW_STATE_KEY]: "100" });
    expect(result.instanceState).toBeUndefined();
  });
  test("with a token in crossFlowState, fetches changes and writes the new token back", async () => {
    nock(DRIVE)
      .get("/drive/v3/changes")
      .query(true)
      .reply(200, {
        kind: "drive#changeList",
        newStartPageToken: "150",
        changes: [
          {
            kind: "drive#change",
            removed: false,
            fileId: "14FSE_ESVGWta4XlzWGHVm0VultNS-1uO",
            changeType: "file",
          },
        ],
      });
    const { result } = await invoke(
      listChanges,
      { connection, driveId: undefined },
      { crossFlowState: { [NEW_STATE_KEY]: "100" } },
    );
    expect((result.data as Record<string, unknown>).changes).toHaveLength(1);
    expect(result.crossFlowState).toEqual({ [NEW_STATE_KEY]: "150" });
    expect(result.instanceState).toBeUndefined();
  });
  test("with a token only in the legacy instanceState key, uses it and cleans the old key up", async () => {
    nock(DRIVE)
      .get("/drive/v3/changes")
      .query(true)
      .reply(200, {
        kind: "drive#changeList",
        newStartPageToken: "200",
        changes: [],
      });
    const { result } = await invoke(
      listChanges,
      { connection, driveId: undefined },
      { instanceState: { mockStepId: "999" } },
    );
    expect(result.crossFlowState).toEqual({ [NEW_STATE_KEY]: "200" });
    expect(result.instanceState).toEqual({ mockStepId: null });
  });
  test("surfaces an API error", async () => {
    nock(DRIVE)
      .get("/drive/v3/changes/startPageToken")
      .query(true)
      .reply(500, { error: { message: "Server error" } });
    await expect(
      invoke(listChanges, { connection, driveId: undefined }),
    ).rejects.toThrow();
  });
});
