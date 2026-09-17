import {
  createConnection,
  defaultTriggerPayload,
} from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import { connection as connectionDefinition } from "../connections";
import { pollChangesTrigger } from "./pollChangesTrigger";
const connection = createConnection(
  connectionDefinition,
  {},
  { access_token: "test-token" },
);
const DRIVE = "https://www.googleapis.com";
const STATE_KEY =
  "google-drive-list-changes-page-token:flowStableId:mockStepId";
const COMPLETED_KEY =
  "google-drive-initial-sync-completed:flowStableId:mockStepId";
type Perform = typeof pollChangesTrigger.perform;
interface PollOptions {
  storedToken?: string;
  legacyToken?: string;
  instanceState?: Record<string, unknown>;
  pollingState?: Record<string, unknown>;
  paginationState?: Record<string, unknown>;
  batching?: boolean;
  lookBackDate?: string;
  driveId?: string;
}
const runPoll = async (options: PollOptions = {}) => {
  const setStateCalls: Record<string, unknown>[] = [];
  const context = {
    stepId: "mockStepId",
    flow: { stableId: "flowStableId" },
    crossFlowState: options.storedToken
      ? { [STATE_KEY]: options.storedToken }
      : {},
    instanceState: {
      ...options.instanceState,
      ...(options.legacyToken ? { mockStepId: options.legacyToken } : {}),
    },
    logger: { info: () => undefined },
    batch: { enabled: options.batching === true, batchSize: 50 },
    polling: {
      getState: () => options.pollingState ?? {},
      setState: (next: Record<string, unknown>) => setStateCalls.push(next),
    },
  };
  const payload = {
    ...defaultTriggerPayload(),
    ...(options.paginationState
      ? { paginationState: options.paginationState }
      : {}),
  };
  const result = await pollChangesTrigger.perform(
    context as unknown as Parameters<Perform>[0],
    payload as unknown as Parameters<Perform>[1],
    {
      connection,
      driveId: options.driveId,
      lookBackDate: options.lookBackDate ?? "",
    } as unknown as Parameters<Perform>[2],
  );
  return { result, setStateCalls };
};
describe("pollChangesTrigger definition", () => {
  test("advertises batching as an opt-in capability", () => {
    expect(pollChangesTrigger.triggerResolverSupport).toBe("valid");
    expect(pollChangesTrigger.batchConfig).toEqual({
      batchSize: 50,
      concurrentBatchLimit: 1,
    });
  });
  test("resolveItems dispatches the change list", () => {
    const changes = [{ fileId: "file-a" }, { fileId: "file-b" }];
    const items = pollChangesTrigger.triggerResolver?.resolveItems?.(
      {} as never,
      { payload: { body: { data: { changes } } } } as never,
    );
    expect(items).toEqual(changes);
  });
  test("resolveItems yields nothing when the page carried no changes", () => {
    expect(
      pollChangesTrigger.triggerResolver?.resolveItems?.(
        {} as never,
        { payload: { body: { data: {} } } } as never,
      ),
    ).toEqual([]);
  });
  test("getNextPaginationState forwards a cursor the perform left on the payload", () => {
    expect(
      pollChangesTrigger.triggerResolver?.getNextPaginationState?.(
        {} as never,
        { payload: { paginationState: { pageToken: "page-2" } } } as never,
      ),
    ).toEqual({ pageToken: "page-2" });
  });
  test("getNextPaginationState returns null to end the drain", () => {
    expect(
      pollChangesTrigger.triggerResolver?.getNextPaginationState?.(
        {} as never,
        { payload: {} } as never,
      ),
    ).toBeNull();
  });
});
describe("pollChangesTrigger incremental polling", () => {
  afterEach(() => nock.cleanAll());
  test("with no stored cursor and no look-back date, seeds the cursor and reports no changes", async () => {
    nock(DRIVE)
      .get("/drive/v3/changes/startPageToken")
      .query(true)
      .reply(200, { startPageToken: "100" });
    const { result } = await runPoll();
    expect(result.polledNoChanges).toBe(true);
    expect(result.crossFlowState).toEqual({ [STATE_KEY]: "100" });
  });
  test("on the last page, commits the new start page token", async () => {
    nock(DRIVE)
      .get("/drive/v3/changes")
      .query(true)
      .reply(200, {
        kind: "drive#changeList",
        newStartPageToken: "150",
        changes: [{ fileId: "file-a", changeType: "file" }],
      });
    const { result } = await runPoll({ storedToken: "100" });
    expect(result.polledNoChanges).toBe(false);
    expect(result.crossFlowState).toEqual({ [STATE_KEY]: "150" });
    expect(result.payload.paginationState).toBeUndefined();
  });
  test("with more pages and batching off, advances the cursor instead of storing undefined", async () => {
    nock(DRIVE)
      .get("/drive/v3/changes")
      .query(true)
      .reply(200, {
        kind: "drive#changeList",
        nextPageToken: "page-2",
        changes: [{ fileId: "file-a", changeType: "file" }],
      });
    const { result } = await runPoll({ storedToken: "100" });
    expect(result.crossFlowState).toEqual({ [STATE_KEY]: "page-2" });
    expect(
      (result.crossFlowState as Record<string, unknown>)[STATE_KEY],
    ).toBeDefined();
  });
  test("with more pages and batching on, holds the cursor and hands the next page to the drain", async () => {
    nock(DRIVE)
      .get("/drive/v3/changes")
      .query(true)
      .reply(200, {
        kind: "drive#changeList",
        nextPageToken: "page-2",
        changes: [{ fileId: "file-a", changeType: "file" }],
      });
    const { result } = await runPoll({ storedToken: "100", batching: true });
    expect(result.crossFlowState).toEqual({ [STATE_KEY]: "100" });
    expect(result.payload.paginationState).toEqual({ pageToken: "page-2" });
  });
  test("a drain round reads the page the platform handed back", async () => {
    nock(DRIVE)
      .get("/drive/v3/changes")
      .query((query) => query.pageToken === "page-2")
      .reply(200, {
        kind: "drive#changeList",
        newStartPageToken: "150",
        changes: [],
      });
    const { result } = await runPoll({
      storedToken: "100",
      batching: true,
      paginationState: { pageToken: "page-2" },
    });
    expect(result.crossFlowState).toEqual({ [STATE_KEY]: "150" });
    expect(result.polledNoChanges).toBe(false);
  });
  test("clears the cursor when the drain reaches the last page", async () => {
    nock(DRIVE)
      .get("/drive/v3/changes")
      .query(true)
      .reply(200, {
        kind: "drive#changeList",
        newStartPageToken: "150",
        changes: [],
      });
    const { result } = await runPoll({
      storedToken: "100",
      batching: true,
      paginationState: { pageToken: "page-2" },
    });
    expect(result.payload.paginationState).toBeUndefined();
    expect(
      pollChangesTrigger.triggerResolver?.getNextPaginationState?.(
        {} as never,
        {
          payload: result.payload,
        } as never,
      ),
    ).toBeNull();
  });
  test("carries the legacy instanceState cleanup when the cursor came from the old key", async () => {
    nock(DRIVE)
      .get("/drive/v3/changes")
      .query(true)
      .reply(200, {
        kind: "drive#changeList",
        newStartPageToken: "150",
        changes: [],
      });
    const { result } = await runPoll({ legacyToken: "100" });
    expect(result.instanceState).toEqual({ mockStepId: null });
  });
  test("the legacy cleanup leaves the initial sync marker alone", async () => {
    nock(DRIVE)
      .get("/drive/v3/changes")
      .query(true)
      .reply(200, {
        kind: "drive#changeList",
        newStartPageToken: "150",
        changes: [],
      });
    const { result } = await runPoll({
      legacyToken: "100",
      instanceState: { [COMPLETED_KEY]: true },
    });
    expect(result.instanceState).toEqual({
      mockStepId: null,
      [COMPLETED_KEY]: true,
    });
  });
});
describe("pollChangesTrigger look-back backfill", () => {
  afterEach(() => nock.cleanAll());
  test("captures the change cursor before reading any history", async () => {
    const callOrder: string[] = [];
    nock(DRIVE)
      .get("/drive/v3/changes/startPageToken")
      .query(true)
      .reply(200, () => {
        callOrder.push("startPageToken");
        return { startPageToken: "100" };
      });
    nock(DRIVE)
      .get("/drive/v3/files")
      .query(true)
      .reply(200, () => {
        callOrder.push("files");
        return { files: [] };
      });
    await runPoll({ lookBackDate: "2026-01-01T00:00:00.000Z" });
    expect(callOrder).toEqual(["startPageToken", "files"]);
  });
  test("emits historical files as changes and commits the pre-backfill cursor when done", async () => {
    nock(DRIVE)
      .get("/drive/v3/changes/startPageToken")
      .query(true)
      .reply(200, { startPageToken: "100" });
    nock(DRIVE)
      .get("/drive/v3/files")
      .query(true)
      .reply(200, {
        files: [
          {
            id: "file-a",
            name: "Report.pdf",
            kind: "drive#file",
            mimeType: "application/pdf",
            modifiedTime: "2026-02-01T10:00:00.000Z",
          },
        ],
      });
    const { result } = await runPoll({
      lookBackDate: "2026-01-01T00:00:00.000Z",
    });
    const data = result.payload.body.data as Record<string, unknown>;
    expect(data.changes).toEqual([
      {
        kind: "drive#change",
        changeType: "file",
        removed: false,
        fileId: "file-a",
        time: "2026-02-01T10:00:00.000Z",
        file: {
          kind: "drive#file",
          mimeType: "application/pdf",
          id: "file-a",
          name: "Report.pdf",
        },
      },
    ]);
    expect(result.crossFlowState).toEqual({ [STATE_KEY]: "100" });
  });
  test("withholds the cursor while history is still draining", async () => {
    nock(DRIVE)
      .get("/drive/v3/changes/startPageToken")
      .query(true)
      .reply(200, { startPageToken: "100" });
    nock(DRIVE)
      .get("/drive/v3/files")
      .query(true)
      .reply(200, { nextPageToken: "files-2", files: [{ id: "file-a" }] });
    const { result, setStateCalls } = await runPoll({
      lookBackDate: "2026-01-01T00:00:00.000Z",
    });
    expect(result).not.toHaveProperty("crossFlowState");
    expect(result.payload.paginationState).toEqual({
      pageToken: "files-2",
      backfill: {
        modifiedAfter: "2026-01-01T00:00:00.000Z",
        startPageToken: "100",
      },
    });
    expect(setStateCalls).toEqual([
      {
        backfill: {
          modifiedAfter: "2026-01-01T00:00:00.000Z",
          startPageToken: "100",
        },
        backfillPageToken: "files-2",
      },
    ]);
  });
  test("resumes an unfinished backfill on the next cycle without batching", async () => {
    nock(DRIVE)
      .get("/drive/v3/files")
      .query((query) => query.pageToken === "files-2")
      .reply(200, {
        files: [{ id: "file-b", modifiedTime: "2026-03-01T00:00:00.000Z" }],
      });
    const { result } = await runPoll({
      pollingState: {
        backfill: {
          modifiedAfter: "2026-01-01T00:00:00.000Z",
          startPageToken: "100",
        },
        backfillPageToken: "files-2",
      },
    });
    expect(result.crossFlowState).toEqual({ [STATE_KEY]: "100" });
    expect(
      (result.payload.body.data as Record<string, unknown>).changes,
    ).toHaveLength(1);
  });
});
describe("pollChangesTrigger resolver envelope guard", () => {
  test("resolveItems yields nothing when the round carried no envelope at all", () => {
    expect(
      pollChangesTrigger.triggerResolver?.resolveItems?.(
        {} as never,
        { payload: { body: { data: undefined } } } as never,
      ),
    ).toEqual([]);
  });
  test("onDeployResolver.resolveItems yields nothing when the round carried no envelope", () => {
    expect(
      pollChangesTrigger.onDeployResolver?.resolveItems?.(
        {} as never,
        { payload: { body: { data: undefined } } } as never,
      ),
    ).toEqual([]);
  });
});
describe("pollChangesTrigger on-deploy resolver", () => {
  test("batches the initial sync off the same config as the scheduled poll", () => {
    expect(pollChangesTrigger.onDeployPerform).toBeInstanceOf(Function);
    expect(pollChangesTrigger.onDeployResolver?.resolveItems).toBeInstanceOf(
      Function,
    );
    expect(
      pollChangesTrigger.onDeployResolver?.getNextPaginationState,
    ).toBeInstanceOf(Function);
  });
  test("resolveItems dispatches the change list the initial sync produced", () => {
    const changes = [{ fileId: "file-a" }, { fileId: "file-b" }];
    expect(
      pollChangesTrigger.onDeployResolver?.resolveItems?.(
        {} as never,
        { payload: { body: { data: { changes } } } } as never,
      ),
    ).toEqual(changes);
  });
  test("getNextPaginationState forwards the cursor that drains the initial sync", () => {
    const cursor = {
      pageToken: "files-2",
      backfill: {
        modifiedAfter: "2026-01-01T00:00:00.000Z",
        startPageToken: "100",
      },
    };
    expect(
      pollChangesTrigger.onDeployResolver?.getNextPaginationState?.(
        {} as never,
        { payload: { paginationState: cursor } } as never,
      ),
    ).toEqual(cursor);
  });
  test("getNextPaginationState returns null once the initial sync is exhausted", () => {
    expect(
      pollChangesTrigger.onDeployResolver?.getNextPaginationState?.(
        {} as never,
        { payload: {} } as never,
      ),
    ).toBeNull();
  });
});
type OnDeployPerform = NonNullable<typeof pollChangesTrigger.onDeployPerform>;
interface DeployOptions {
  lookBackDate?: string;
  driveId?: string;
  paginationState?: Record<string, unknown>;
  withoutConnection?: boolean;
  instanceState?: Record<string, unknown>;
}
const runDeploy = async (options: DeployOptions = {}) => {
  const setStateCalls: Record<string, unknown>[] = [];
  const context = {
    stepId: "mockStepId",
    flow: { stableId: "flowStableId" },
    crossFlowState: {},
    instanceState: options.instanceState ?? {},
    logger: { info: () => undefined },
    polling: {
      getState: () => ({}),
      setState: (next: Record<string, unknown>) => setStateCalls.push(next),
    },
  };
  const payload = {
    ...defaultTriggerPayload(),
    ...(options.paginationState
      ? { paginationState: options.paginationState }
      : {}),
  };
  const onDeployPerform = pollChangesTrigger.onDeployPerform as OnDeployPerform;
  const result = await onDeployPerform(
    context as unknown as Parameters<OnDeployPerform>[0],
    payload as unknown as Parameters<OnDeployPerform>[1],
    {
      ...(options.withoutConnection ? {} : { connection }),
      driveId: options.driveId,
      lookBackDate: options.lookBackDate ?? "",
    } as unknown as Parameters<OnDeployPerform>[2],
  );
  return { result, setStateCalls };
};
describe("pollChangesTrigger initial sync on deploy", () => {
  afterEach(() => nock.cleanAll());
  test("seeds history and commits the pre-sync cursor once the last page is read", async () => {
    nock(DRIVE)
      .get("/drive/v3/changes/startPageToken")
      .query(true)
      .reply(200, { startPageToken: "100" });
    nock(DRIVE)
      .get("/drive/v3/files")
      .query(true)
      .reply(200, {
        files: [
          {
            id: "file-a",
            name: "Report.pdf",
            modifiedTime: "2026-02-01T10:00:00.000Z",
          },
        ],
      });
    const { result } = await runDeploy({
      lookBackDate: "2026-01-01T00:00:00.000Z",
    });
    const data = result.payload.body.data as Record<string, unknown>;
    expect((data.changes as unknown[]).length).toBe(1);
    expect(result.crossFlowState).toEqual({ [STATE_KEY]: "100" });
    expect(result.instanceState).toEqual({ [COMPLETED_KEY]: true });
    expect(result.payload.paginationState).toBeUndefined();
    expect(result.polledNoChanges).toBe(false);
  });
  test("writes no polling state, which is the state it has no way to reach", async () => {
    nock(DRIVE)
      .get("/drive/v3/changes/startPageToken")
      .query(true)
      .reply(200, { startPageToken: "100" });
    nock(DRIVE)
      .get("/drive/v3/files")
      .query(true)
      .reply(200, { nextPageToken: "files-2", files: [{ id: "file-a" }] });
    const { setStateCalls } = await runDeploy({
      lookBackDate: "2026-01-01T00:00:00.000Z",
    });
    expect(setStateCalls).toEqual([]);
  });
  test("withholds the cursor while history is still draining", async () => {
    nock(DRIVE)
      .get("/drive/v3/changes/startPageToken")
      .query(true)
      .reply(200, { startPageToken: "100" });
    nock(DRIVE)
      .get("/drive/v3/files")
      .query(true)
      .reply(200, { nextPageToken: "files-2", files: [{ id: "file-a" }] });
    const { result } = await runDeploy({
      lookBackDate: "2026-01-01T00:00:00.000Z",
    });
    expect(result).not.toHaveProperty("crossFlowState");
    expect(result).not.toHaveProperty("instanceState");
    expect(result.payload.paginationState).toEqual({
      pageToken: "files-2",
      backfill: {
        modifiedAfter: "2026-01-01T00:00:00.000Z",
        startPageToken: "100",
      },
    });
  });
  test("resumes a drain without re-capturing the cursor", async () => {
    nock(DRIVE)
      .get("/drive/v3/files")
      .query((query) => query.pageToken === "files-2")
      .reply(200, {
        files: [{ id: "file-b", modifiedTime: "2026-03-01T00:00:00.000Z" }],
      });
    const { result } = await runDeploy({
      lookBackDate: "2026-01-01T00:00:00.000Z",
      paginationState: {
        pageToken: "files-2",
        backfill: {
          modifiedAfter: "2026-01-01T00:00:00.000Z",
          startPageToken: "100",
        },
      },
    });
    expect(result.crossFlowState).toEqual({ [STATE_KEY]: "100" });
  });
  test("does nothing when no look-back date is configured", async () => {
    const { result, setStateCalls } = await runDeploy();
    expect(result.payload.body.data).toEqual({
      kind: "drive#changeList",
      changes: [],
    });
    expect(result).not.toHaveProperty("crossFlowState");
    expect(result.polledNoChanges).toBe(true);
    expect(setStateCalls).toEqual([]);
  });
  test("does nothing when the poll action connection does not reach the deploy fire", async () => {
    const { result } = await runDeploy({
      lookBackDate: "2026-01-01T00:00:00.000Z",
      withoutConnection: true,
    });
    expect(result.payload.body.data).toEqual({
      kind: "drive#changeList",
      changes: [],
    });
    expect(result).not.toHaveProperty("crossFlowState");
    expect(result.polledNoChanges).toBe(true);
  });
  test("does not walk the look-back window again on a redeploy", async () => {
    const { result } = await runDeploy({
      lookBackDate: "2026-01-01T00:00:00.000Z",
      instanceState: { [COMPLETED_KEY]: true },
    });
    expect(result.payload.body.data).toEqual({
      kind: "drive#changeList",
      changes: [],
    });
    expect(result).not.toHaveProperty("crossFlowState");
    expect(result).not.toHaveProperty("instanceState");
    expect(result.polledNoChanges).toBe(true);
  });
  test("still drains a resuming round once the marker is set", async () => {
    nock(DRIVE)
      .get("/drive/v3/files")
      .query((query) => query.pageToken === "files-2")
      .reply(200, {
        files: [{ id: "file-b", modifiedTime: "2026-03-01T00:00:00.000Z" }],
      });
    const { result } = await runDeploy({
      lookBackDate: "2026-01-01T00:00:00.000Z",
      instanceState: { [COMPLETED_KEY]: true },
      paginationState: {
        pageToken: "files-2",
        backfill: {
          modifiedAfter: "2026-01-01T00:00:00.000Z",
          startPageToken: "100",
        },
      },
    });
    expect(result.crossFlowState).toEqual({ [STATE_KEY]: "100" });
  });
});
