import {
  createConnection,
  defaultTriggerPayload,
} from "@prismatic-io/spectral/dist/testing";
import type { files } from "dropbox";
import { oauthConnection } from "../connections";
import type { SyncCursor } from "../types";
import triggers from "./index";
import { pollChangesTrigger } from "./pollChangesTrigger";
const {
  filesListFolder,
  filesListFolderContinue,
  filesListFolderGetLatestCursor,
} = vi.hoisted(() => ({
  filesListFolder: vi.fn(),
  filesListFolderContinue: vi.fn(),
  filesListFolderGetLatestCursor: vi.fn(),
}));
vi.mock("dropbox", () => ({
  Dropbox: class DropboxMock {
    filesListFolder = filesListFolder;
    filesListFolderContinue = filesListFolderContinue;
    filesListFolderGetLatestCursor = filesListFolderGetLatestCursor;
  },
  DropboxResponseError: class DropboxResponseError extends Error {},
}));
const STEP_NAME = "onNewOrUpdatedFile";
const ESTABLISHED_STATE_KEY = `dropbox-list-changes-cursor:flowStableId:${STEP_NAME}`;
const DEPLOY_HANDOFF_KEY = "dropbox-sync-changes-cursor:flowStableId";
const fileEntry: files.FileMetadataReference = {
  ".tag": "file",
  name: "recent.png",
  path_lower: "/testsubfolder/recent.png",
  path_display: "/TestSubfolder/recent.png",
  id: "id:recent",
  client_modified: "2024-11-20T18:29:39Z",
  server_modified: "2026-03-01T00:00:00Z",
  rev: "01627702307738900000002a67d8f21",
  size: 331590,
};
const staleFileEntry: files.FileMetadataReference = {
  ...fileEntry,
  name: "stale.png",
  path_lower: "/testsubfolder/stale.png",
  path_display: "/TestSubfolder/stale.png",
  id: "id:stale",
  server_modified: "2025-01-05T00:00:00Z",
};
const folderEntry: files.FolderMetadataReference = {
  ".tag": "folder",
  name: "TestSubfolder",
  path_lower: "/testsubfolder",
  path_display: "/TestSubfolder",
  id: "id:folder",
};
const dropboxConnection = createConnection(
  oauthConnection,
  {},
  { access_token: "exampleAccessToken" },
);
const settings = {
  directoryPath: "/TestSubfolder",
  recursive: true,
  includeDeleted: false,
};
const params = {
  dropboxConnection,
  ...settings,
  lookBackDate: "",
  userType: undefined,
  teamMemberId: undefined,
  initialSyncPageSize: 2000,
};
const positionUnder = (cursor: string): SyncCursor => ({
  cursor,
  path: settings.directoryPath,
  recursive: settings.recursive,
  includeDeleted: settings.includeDeleted,
});
type Perform = typeof pollChangesTrigger.perform;
const runRound = async (
  entryPoint: "perform" | "onDeployPerform",
  {
    crossFlowState = {},
    instanceState = {},
    paginationState,
    debugEnabled = false,
    batching = false,
    overrides = {},
  }: {
    crossFlowState?: Record<string, unknown>;
    instanceState?: Record<string, unknown>;
    paginationState?: SyncCursor;
    debugEnabled?: boolean;
    batching?: boolean;
    overrides?: Record<string, unknown>;
  } = {},
) => {
  const logger = { debug: vi.fn(), info: vi.fn() };
  const context = {
    logger,
    debug: { enabled: debugEnabled },
    batch: { enabled: batching },
    crossFlowState,
    instanceState,
    flow: { stableId: "flowStableId", name: "Flow 1" },
    executionFrame: { stepName: STEP_NAME },
    webhookUrls: { "Flow 1": "https://hooks.example.io/flow-1" },
  } as unknown as Parameters<Perform>[0];
  const payload = {
    ...defaultTriggerPayload(),
    ...(paginationState ? { paginationState } : {}),
  } as Parameters<Perform>[1];
  const result = await pollChangesTrigger[entryPoint](context, payload, {
    ...params,
    ...overrides,
  } as unknown as Parameters<Perform>[2]);
  return { result, logger };
};
beforeEach(() => {
  vi.clearAllMocks();
});
describe("declarations", () => {
  test("the single published trigger carries all three tiers", () => {
    const trigger = triggers.pollChangesTrigger;
    expect(trigger.triggerResolverSupport).toBe("valid");
    expect(trigger.batchConfig).toEqual({
      batchSize: 50,
      concurrentBatchLimit: 1,
    });
    expect(trigger.triggerResolver?.resolveItems).toBeInstanceOf(Function);
    expect(trigger.triggerResolver?.getNextPaginationState).toBeInstanceOf(
      Function,
    );
    expect(trigger.onDeployPerform).toBeInstanceOf(Function);
    expect(trigger.onDeployResolver?.inputs).toHaveProperty(
      "initialSyncPageSize",
    );
  });
  test("the consolidation left exactly one polling trigger registered", () => {
    expect(Object.keys(triggers).sort()).toEqual([
      "dropboxWebhook",
      "pollChangesTrigger",
    ]);
  });
  test("the trigger declares its own inputs and no longer delegates to a poll action", () => {
    expect(Object.keys(pollChangesTrigger.inputs).sort()).toEqual([
      "directoryPath",
      "dropboxConnection",
      "includeDeleted",
      "lookBackDate",
      "recursive",
      "teamMemberId",
      "userType",
    ]);
    expect(pollChangesTrigger).not.toHaveProperty("pollAction");
  });
});
describe("onDeployPerform: the unrequested-backfill bound", () => {
  test("reads no history at all when no Look-back Date is set", async () => {
    filesListFolderGetLatestCursor.mockResolvedValue({
      result: { cursor: "positionAtDeploy" },
    });
    const { result } = await runRound("onDeployPerform");
    expect(filesListFolder).not.toHaveBeenCalled();
    expect(filesListFolderContinue).not.toHaveBeenCalled();
    expect(filesListFolderGetLatestCursor).toHaveBeenCalledTimes(1);
    expect(result.payload.body.data.entries).toEqual([]);
    expect(result.crossFlowState).toEqual({
      [DEPLOY_HANDOFF_KEY]: positionUnder("positionAtDeploy"),
    });
  });
  test("walks the folder once a Look-back Date is set", async () => {
    filesListFolder.mockResolvedValue({
      result: {
        entries: [fileEntry, staleFileEntry],
        cursor: "positionAfterBackfill",
        has_more: false,
      },
    });
    const { result } = await runRound("onDeployPerform", {
      overrides: { lookBackDate: "2026-01-01" },
    });
    expect(filesListFolderGetLatestCursor).not.toHaveBeenCalled();
    expect(filesListFolder).toHaveBeenCalledTimes(1);
    expect(result.payload.body.data.entries).toEqual([fileEntry]);
  });
  test("keeps an entry it cannot date rather than dropping it", async () => {
    filesListFolder.mockResolvedValue({
      result: {
        entries: [folderEntry, staleFileEntry],
        cursor: "positionAfterBackfill",
        has_more: false,
      },
    });
    const { result } = await runRound("onDeployPerform", {
      overrides: { lookBackDate: "2026-01-01" },
    });
    expect(result.payload.body.data.entries).toEqual([folderEntry]);
  });
  test("filtering never shortens the walk", async () => {
    filesListFolder.mockResolvedValue({
      result: {
        entries: [staleFileEntry],
        cursor: "midDrainPosition",
        has_more: true,
      },
    });
    const { result } = await runRound("onDeployPerform", {
      overrides: { lookBackDate: "2026-01-01" },
    });
    expect(result.payload.body.data.entries).toEqual([]);
    expect(result.payload.paginationState).toEqual(
      positionUnder("midDrainPosition"),
    );
    expect(result).not.toHaveProperty("crossFlowState");
  });
  test("clamps the page size that issues the cursor when the flow batches", async () => {
    filesListFolder.mockResolvedValue({
      result: { entries: [], cursor: "c", has_more: false },
    });
    await runRound("onDeployPerform", {
      batching: true,
      overrides: { lookBackDate: "2026-01-01", initialSyncPageSize: 2000 },
    });
    expect(filesListFolder).toHaveBeenCalledWith(
      expect.objectContaining({ limit: 1000 }),
    );
  });
});
describe("perform: cursor precedence", () => {
  test("an established cursor outranks the deploy handoff", async () => {
    filesListFolderContinue.mockResolvedValue({
      result: { entries: [], cursor: "advanced", has_more: false },
    });
    const { result } = await runRound("perform", {
      crossFlowState: {
        [ESTABLISHED_STATE_KEY]: positionUnder("establishedPosition"),
        [DEPLOY_HANDOFF_KEY]: positionUnder("deployHandoffPosition"),
      },
    });
    expect(filesListFolderContinue).toHaveBeenCalledWith({
      cursor: "establishedPosition",
    });
    expect(result.crossFlowState).toEqual({
      [ESTABLISHED_STATE_KEY]: positionUnder("advanced"),
    });
  });
  test("falls through to the deploy handoff only when there is no established cursor", async () => {
    filesListFolderContinue.mockResolvedValue({
      result: { entries: [], cursor: "advanced", has_more: false },
    });
    await runRound("perform", {
      crossFlowState: {
        [DEPLOY_HANDOFF_KEY]: positionUnder("deployHandoffPosition"),
      },
    });
    expect(filesListFolderContinue).toHaveBeenCalledWith({
      cursor: "deployHandoffPosition",
    });
  });
  test("a mid-drain cursor outranks everything", async () => {
    filesListFolderContinue.mockResolvedValue({
      result: { entries: [], cursor: "advanced", has_more: false },
    });
    await runRound("perform", {
      paginationState: positionUnder("midDrainPosition"),
      crossFlowState: {
        [ESTABLISHED_STATE_KEY]: positionUnder("establishedPosition"),
      },
    });
    expect(filesListFolderContinue).toHaveBeenCalledWith({
      cursor: "midDrainPosition",
    });
  });
  test("ignores a stored cursor taken under a different folder selection", async () => {
    filesListFolderGetLatestCursor.mockResolvedValue({
      result: { cursor: "rebaselined" },
    });
    const { result } = await runRound("perform", {
      crossFlowState: {
        [ESTABLISHED_STATE_KEY]: {
          ...positionUnder("establishedPosition"),
          recursive: false,
        },
      },
    });
    expect(filesListFolderContinue).not.toHaveBeenCalled();
    expect(filesListFolderGetLatestCursor).toHaveBeenCalledTimes(1);
    expect(result.payload.body.data.entries).toEqual([]);
  });
  test("re-baselines rather than backfilling on a first run", async () => {
    filesListFolderGetLatestCursor.mockResolvedValue({
      result: { cursor: "firstPosition" },
    });
    const { result, logger } = await runRound("perform");
    expect(filesListFolder).not.toHaveBeenCalled();
    expect(result.polledNoChanges).toBe(true);
    expect(logger.info).toHaveBeenCalledOnce();
  });
  test("migrates a legacy instanceState cursor forward and clears it", async () => {
    filesListFolderContinue.mockResolvedValue({
      result: { entries: [fileEntry], cursor: "advanced", has_more: false },
    });
    const legacyKey = `${STEP_NAME}_flow-1`;
    const { result } = await runRound("perform", {
      instanceState: { [legacyKey]: positionUnder("legacyPosition") },
    });
    expect(filesListFolderContinue).toHaveBeenCalledWith({
      cursor: "legacyPosition",
    });
    expect(result.crossFlowState).toEqual({
      [ESTABLISHED_STATE_KEY]: positionUnder("advanced"),
    });
    expect(result.instanceState).toEqual({ [legacyKey]: null });
  });
  test("does not apply the look-back filter to an incremental round", async () => {
    filesListFolderContinue.mockResolvedValue({
      result: {
        entries: [staleFileEntry],
        cursor: "advanced",
        has_more: false,
      },
    });
    const { result } = await runRound("perform", {
      crossFlowState: {
        [ESTABLISHED_STATE_KEY]: positionUnder("establishedPosition"),
      },
      overrides: { lookBackDate: "2026-01-01" },
    });
    expect(result.payload.body.data.entries).toEqual([staleFileEntry]);
    expect(result.polledNoChanges).toBe(false);
  });
});
