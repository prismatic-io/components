import { createConnection, invoke } from "@prismatic-io/spectral/dist/testing";
import { oauthConnection } from "../../connections";
import { listChangesExamplePayload } from "../../examplePayloads";
import type { CursorData } from "../../types";
import { listChanges } from "./listChanges";
const { filesListFolderContinue, filesListFolderGetLatestCursor } = vi.hoisted(
  () => ({
    filesListFolderContinue: vi.fn(),
    filesListFolderGetLatestCursor: vi.fn(),
  }),
);
vi.mock("dropbox", () => ({
  Dropbox: class DropboxMock {
    filesListFolderContinue = filesListFolderContinue;
    filesListFolderGetLatestCursor = filesListFolderGetLatestCursor;
  },
  DropboxResponseError: class DropboxResponseError extends Error {},
}));
const NEW_STATE_KEY = "dropbox-list-changes-cursor:flowStableId:some-step";
const LEGACY_STATE_KEY = "some-step_example.com";
const dropboxConnection = createConnection(
  oauthConnection,
  {},
  { access_token: "exampleAccessToken" },
);
const params = {
  dropboxConnection,
  directoryPath: "/TestSubfolder",
  recursive: true,
  includeDeleted: false,
  userType: undefined,
  teamMemberId: undefined,
};
const storedCursorForCurrentSettings: CursorData = {
  cursor: "cursorFromPreviousRun",
  path: "/TestSubfolder",
  recursive: true,
  includeDeleted: false,
};
beforeEach(() => {
  vi.clearAllMocks();
});
describe("listChanges cursor advance", () => {
  test("first run baselines the cursor, returns no entries, and writes the new state key", async () => {
    filesListFolderGetLatestCursor.mockResolvedValueOnce({
      result: { cursor: "cursorAfterBaseline" },
    });
    const { result } = await invoke(listChanges, params);
    expect(filesListFolderGetLatestCursor).toHaveBeenCalledWith({
      path: "/TestSubfolder",
      recursive: true,
      include_deleted: false,
      limit: 2000,
    });
    expect(filesListFolderContinue).not.toHaveBeenCalled();
    expect(result.data).toEqual({
      entries: [],
      cursor: "cursorAfterBaseline",
      has_more: false,
    });
    expect(result.crossFlowState).toEqual({
      [NEW_STATE_KEY]: {
        cursor: "cursorAfterBaseline",
        path: "/TestSubfolder",
        recursive: true,
        includeDeleted: false,
      },
    });
    expect(result).not.toHaveProperty("instanceState");
  });
  test("second run with unchanged settings continues from the stored cursor and stores the cursor Dropbox sent with that page", async () => {
    filesListFolderContinue.mockResolvedValueOnce({
      result: listChangesExamplePayload,
    });
    const { result } = await invoke(listChanges, params, {
      crossFlowState: { [NEW_STATE_KEY]: storedCursorForCurrentSettings },
    });
    expect(filesListFolderContinue).toHaveBeenCalledWith({
      cursor: "cursorFromPreviousRun",
    });
    expect(filesListFolderGetLatestCursor).not.toHaveBeenCalled();
    expect(result.data).toEqual(listChangesExamplePayload);
    expect(result.crossFlowState).toEqual({
      [NEW_STATE_KEY]: {
        cursor: listChangesExamplePayload.cursor,
        path: "/TestSubfolder",
        recursive: true,
        includeDeleted: false,
      },
    });
    expect(result).not.toHaveProperty("instanceState");
  });
  test.each([
    ["path", { ...storedCursorForCurrentSettings, path: "/SomeOtherFolder" }],
    ["recursive", { ...storedCursorForCurrentSettings, recursive: false }],
    [
      "includeDeleted",
      { ...storedCursorForCurrentSettings, includeDeleted: true },
    ],
  ])("re-baselines when the stored %s differs from the current inputs", async (_changedField, stored) => {
    filesListFolderGetLatestCursor.mockResolvedValueOnce({
      result: { cursor: "cursorAfterRebaseline" },
    });
    const { result } = await invoke(listChanges, params, {
      crossFlowState: { [NEW_STATE_KEY]: stored },
    });
    expect(filesListFolderContinue).not.toHaveBeenCalled();
    expect(filesListFolderGetLatestCursor).toHaveBeenCalledTimes(1);
    expect(result.data).toEqual({
      entries: [],
      cursor: "cursorAfterRebaseline",
      has_more: false,
    });
    expect(result.crossFlowState).toEqual({
      [NEW_STATE_KEY]: {
        cursor: "cursorAfterRebaseline",
        path: "/TestSubfolder",
        recursive: true,
        includeDeleted: false,
      },
    });
  });
});
describe("listChanges legacy state migration", () => {
  test("reads the legacy instanceState cursor, writes the new key, and nulls the legacy key", async () => {
    filesListFolderContinue.mockResolvedValueOnce({
      result: listChangesExamplePayload,
    });
    const { result } = await invoke(listChanges, params, {
      instanceState: { [LEGACY_STATE_KEY]: storedCursorForCurrentSettings },
    });
    expect(filesListFolderContinue).toHaveBeenCalledWith({
      cursor: "cursorFromPreviousRun",
    });
    expect(filesListFolderGetLatestCursor).not.toHaveBeenCalled();
    expect(result.crossFlowState).toEqual({
      [NEW_STATE_KEY]: {
        cursor: listChangesExamplePayload.cursor,
        path: "/TestSubfolder",
        recursive: true,
        includeDeleted: false,
      },
    });
    expect(result).toMatchObject({
      instanceState: { [LEGACY_STATE_KEY]: null },
    });
  });
  test("prefers the new crossFlowState key over a legacy key and leaves the legacy key alone", async () => {
    filesListFolderContinue.mockResolvedValueOnce({
      result: listChangesExamplePayload,
    });
    const { result } = await invoke(listChanges, params, {
      crossFlowState: {
        [NEW_STATE_KEY]: {
          ...storedCursorForCurrentSettings,
          cursor: "cursorFromNewStateKey",
        },
      },
      instanceState: {
        [LEGACY_STATE_KEY]: {
          ...storedCursorForCurrentSettings,
          cursor: "cursorFromLegacyStateKey",
        },
      },
    });
    expect(filesListFolderContinue).toHaveBeenCalledWith({
      cursor: "cursorFromNewStateKey",
    });
    expect(result).not.toHaveProperty("instanceState");
  });
  test("re-baselines when the legacy cursor's settings no longer match, and still nulls the legacy key", async () => {
    filesListFolderGetLatestCursor.mockResolvedValueOnce({
      result: { cursor: "cursorAfterRebaseline" },
    });
    const { result } = await invoke(listChanges, params, {
      instanceState: {
        [LEGACY_STATE_KEY]: {
          ...storedCursorForCurrentSettings,
          path: "/SomeOtherFolder",
        },
      },
    });
    expect(filesListFolderContinue).not.toHaveBeenCalled();
    expect(result).toMatchObject({
      instanceState: { [LEGACY_STATE_KEY]: null },
    });
  });
});
