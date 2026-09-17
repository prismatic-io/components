import {
  createConnection,
  defaultTriggerPayload,
} from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import { connection as connectionDefinition } from "../connections";
import { MY_DRIVE } from "../constants";
import { queryDriveActivityExamplePayload } from "../examplePayloads";
import { driveActivityPollingTrigger } from "./driveActivityPollingTrigger";
const connection = createConnection(
  connectionDefinition,
  {},
  { access_token: "test-token" },
);
const ACTIVITY = "https://driveactivity.googleapis.com";
const HANDOFF_KEY =
  "google-drive-activity-sync-handoff:flowStableId:mockStepId";
const COMPLETED_KEY =
  "google-drive-initial-sync-completed:flowStableId:mockStepId";
type Perform = typeof driveActivityPollingTrigger.perform;
interface PollingStub {
  getState: () => Record<string, unknown>;
  setState: (next: Record<string, unknown>) => void;
}
const runPoll = (
  polling: PollingStub,
  params: Record<string, unknown> = {},
  instanceState: Record<string, unknown> = {},
) =>
  driveActivityPollingTrigger.perform(
    {
      polling,
      stepId: "mockStepId",
      flow: { stableId: "flowStableId" },
      instanceState,
    } as unknown as Parameters<Perform>[0],
    defaultTriggerPayload(),
    {
      connection,
      triggerEvents: [],
      itemName: undefined,
      ancestorName: [undefined],
      consolidationStrategy: undefined,
      lookBackDate: "",
      ...params,
    } as unknown as Parameters<Perform>[2],
  );
const statefulPolling = (initial: Record<string, unknown> = {}) => {
  let state = initial;
  return {
    polling: {
      getState: () => state,
      setState: (next: Record<string, unknown>) => (state = next),
    },
    read: () => state,
  };
};
describe("driveActivityPollingTrigger", () => {
  afterEach(() => nock.cleanAll());
  test("returns the activities the query yielded and stamps the poll time into state", async () => {
    nock(ACTIVITY)
      .post("/v2/activity:query")
      .reply(200, {
        activities: queryDriveActivityExamplePayload.data.activities,
      });
    const { polling, read } = statefulPolling();
    const result = await runPoll(polling);
    expect(result.polledNoChanges).toBe(false);
    expect(result.payload.body.data).toEqual(
      queryDriveActivityExamplePayload.data.activities,
    );
    expect(typeof read().lastPolledAt).toBe("string");
  });
  test("reports no changes when the query yields nothing", async () => {
    nock(ACTIVITY).post("/v2/activity:query").reply(200, { activities: [] });
    const { polling } = statefulPolling();
    const result = await runPoll(polling);
    expect(result.polledNoChanges).toBe(true);
    expect(result.payload.body.data).toEqual([]);
  });
  test("filters on a time later than now when no previous poll time is stored", async () => {
    let body: Record<string, unknown> = {};
    nock(ACTIVITY)
      .post("/v2/activity:query", (received) => {
        body = received as Record<string, unknown>;
        return true;
      })
      .reply(200, { activities: [] });
    const before = new Date().toISOString();
    const { polling } = statefulPolling();
    await runPoll(polling);
    const filter = body.filter as string;
    const [, filterTime] = filter.match(/^time > "(.+)"$/) ?? [];
    expect(filterTime).toBeDefined();
    expect(filterTime >= before).toBe(true);
  });
  test("resumes from the stored poll time on a later poll", async () => {
    let body: Record<string, unknown> = {};
    nock(ACTIVITY)
      .post("/v2/activity:query", (received) => {
        body = received as Record<string, unknown>;
        return true;
      })
      .reply(200, { activities: [] });
    const { polling } = statefulPolling({
      lastPolledAt: "2025-03-11T15:58:37.276Z",
    });
    await runPoll(polling);
    expect(body.filter).toBe('time > "2025-03-11T15:58:37.276Z"');
  });
  test("advances the stored poll time so a later poll does not re-emit earlier activity", async () => {
    nock(ACTIVITY)
      .post("/v2/activity:query")
      .reply(200, {
        activities: queryDriveActivityExamplePayload.data.activities,
      });
    nock(ACTIVITY).post("/v2/activity:query").reply(200, { activities: [] });
    const { polling, read } = statefulPolling({
      lastPolledAt: "2025-03-11T15:58:37.276Z",
    });
    const first = await runPoll(polling);
    const advanced = read().lastPolledAt as string;
    const second = await runPoll(polling);
    expect(first.polledNoChanges).toBe(false);
    expect(advanced > "2025-03-11T15:58:37.276Z").toBe(true);
    expect(second.polledNoChanges).toBe(true);
    expect(
      read().lastPolledAt > advanced || read().lastPolledAt === advanced,
    ).toBe(true);
  });
  test("appends the selected event types to the filter", async () => {
    let body: Record<string, unknown> = {};
    nock(ACTIVITY)
      .post("/v2/activity:query", (received) => {
        body = received as Record<string, unknown>;
        return true;
      })
      .reply(200, { activities: [] });
    const { polling } = statefulPolling({
      lastPolledAt: "2025-03-11T15:58:37.276Z",
    });
    await runPoll(polling, { triggerEvents: ["CREATE", "EDIT"] });
    expect(body.filter).toBe(
      'time > "2025-03-11T15:58:37.276Z" AND detail.action_detail_case:(CREATE EDIT)',
    );
  });
  test("queries once per ancestor and concatenates the results", async () => {
    const ancestors: unknown[] = [];
    nock(ACTIVITY)
      .post("/v2/activity:query", (received) => {
        ancestors.push((received as Record<string, unknown>).ancestorName);
        return true;
      })
      .times(2)
      .reply(200, { activities: [{ timestamp: "2025-03-11T15:58:37.276Z" }] });
    const { polling } = statefulPolling({
      lastPolledAt: "2025-03-11T15:58:37.276Z",
    });
    const result = await runPoll(polling, {
      ancestorName: ["items/folder-a", "items/folder-b"],
    });
    expect(ancestors).toEqual(["items/folder-a", "items/folder-b"]);
    expect(result.payload.body.data).toHaveLength(2);
  });
  test("surfaces an API error", async () => {
    nock(ACTIVITY)
      .post("/v2/activity:query")
      .reply(403, { error: { message: "forbidden" } });
    const { polling } = statefulPolling();
    await expect(runPoll(polling)).rejects.toThrow();
  });
});
describe("driveActivityPollingTrigger definition", () => {
  test("advertises batching as an opt-in capability", () => {
    expect(driveActivityPollingTrigger.triggerResolverSupport).toBe("valid");
    expect(driveActivityPollingTrigger.batchConfig).toEqual({
      batchSize: 50,
      concurrentBatchLimit: 1,
    });
  });
  test("resolveItems dispatches the activity list", () => {
    const activities = [{ timestamp: "2025-03-11T15:58:37.276Z" }];
    expect(
      driveActivityPollingTrigger.triggerResolver?.resolveItems?.(
        {} as never,
        { payload: { body: { data: activities } } } as never,
      ),
    ).toEqual(activities);
  });
  test("resolveItems yields nothing when the round carried no activity", () => {
    expect(
      driveActivityPollingTrigger.triggerResolver?.resolveItems?.(
        {} as never,
        { payload: { body: { data: undefined } } } as never,
      ),
    ).toEqual([]);
  });
  test("getNextPaginationState forwards the composite cursor", () => {
    const cursor = {
      ancestorIndex: 1,
      pageToken: "page-2",
      windowStart: "2026-01-01T00:00:00.000Z",
      cycleEnd: "2026-02-01T00:00:00.000Z",
    };
    expect(
      driveActivityPollingTrigger.triggerResolver?.getNextPaginationState?.(
        {} as never,
        { payload: { paginationState: cursor } } as never,
      ),
    ).toEqual(cursor);
  });
  test("getNextPaginationState returns null to end the drain", () => {
    expect(
      driveActivityPollingTrigger.triggerResolver?.getNextPaginationState?.(
        {} as never,
        { payload: {} } as never,
      ),
    ).toBeNull();
  });
});
const runBatchedPoll = (
  polling: PollingStub,
  options: {
    batching?: boolean;
    paginationState?: Record<string, unknown>;
    params?: Record<string, unknown>;
    instanceState?: Record<string, unknown>;
  } = {},
) =>
  driveActivityPollingTrigger.perform(
    {
      polling,
      batch: { enabled: options.batching !== false, batchSize: 50 },
      stepId: "mockStepId",
      flow: { stableId: "flowStableId" },
      instanceState: options.instanceState ?? {},
    } as unknown as Parameters<Perform>[0],
    {
      ...defaultTriggerPayload(),
      ...(options.paginationState
        ? { paginationState: options.paginationState }
        : {}),
    } as unknown as Parameters<Perform>[1],
    {
      connection,
      triggerEvents: [],
      itemName: undefined,
      ancestorName: [undefined],
      consolidationStrategy: undefined,
      lookBackDate: "",
      ...options.params,
    } as unknown as Parameters<Perform>[2],
  );
describe("driveActivityPollingTrigger look-back backfill", () => {
  afterEach(() => nock.cleanAll());
  test("opens the window at the look-back date on the first poll", async () => {
    let body: Record<string, unknown> = {};
    nock(ACTIVITY)
      .post("/v2/activity:query", (received) => {
        body = received as Record<string, unknown>;
        return true;
      })
      .reply(200, { activities: [] });
    const { polling } = statefulPolling();
    await runPoll(polling, { lookBackDate: "2026-01-01T00:00:00.000Z" });
    expect(body.filter).toBe('time > "2026-01-01T00:00:00.000Z"');
  });
  test("a stored poll time wins over the look-back date, so history is seeded once", async () => {
    let body: Record<string, unknown> = {};
    nock(ACTIVITY)
      .post("/v2/activity:query", (received) => {
        body = received as Record<string, unknown>;
        return true;
      })
      .reply(200, { activities: [] });
    const { polling } = statefulPolling({
      lastPolledAt: "2026-05-01T00:00:00.000Z",
    });
    await runPoll(polling, { lookBackDate: "2026-01-01T00:00:00.000Z" });
    expect(body.filter).toBe('time > "2026-05-01T00:00:00.000Z"');
  });
});
describe("driveActivityPollingTrigger batched drain", () => {
  afterEach(() => nock.cleanAll());
  test("reads one page per round and hands the next page back", async () => {
    nock(ACTIVITY)
      .post("/v2/activity:query")
      .reply(200, {
        activities: [{ timestamp: "2025-03-11T15:58:37.276Z" }],
        nextPageToken: "p2",
      });
    const { polling, read } = statefulPolling({
      lastPolledAt: "2026-01-01T00:00:00.000Z",
    });
    const result = await runBatchedPoll(polling);
    const next = result.payload.paginationState as Record<string, unknown>;
    expect(next.ancestorIndex).toBe(0);
    expect(next.pageToken).toBe("p2");
    expect(read().lastPolledAt).toBe("2026-01-01T00:00:00.000Z");
  });
  test("moves to the next ancestor once one is exhausted", async () => {
    nock(ACTIVITY).post("/v2/activity:query").reply(200, { activities: [] });
    const { polling } = statefulPolling({
      lastPolledAt: "2026-01-01T00:00:00.000Z",
    });
    const result = await runBatchedPoll(polling, {
      params: { ancestorName: ["items/folder-a", "items/folder-b"] },
    });
    expect(result.payload.paginationState).toEqual({
      ancestorIndex: 1,
      windowStart: "2026-01-01T00:00:00.000Z",
      cycleEnd: expect.any(String),
    });
  });
  test("commits the watermark only when the last ancestor is exhausted", async () => {
    nock(ACTIVITY).post("/v2/activity:query").reply(200, { activities: [] });
    const { polling, read } = statefulPolling({
      lastPolledAt: "2026-01-01T00:00:00.000Z",
    });
    const result = await runBatchedPoll(polling, {
      paginationState: {
        ancestorIndex: 0,
        windowStart: "2026-01-01T00:00:00.000Z",
        cycleEnd: "2026-06-01T00:00:00.000Z",
      },
    });
    expect(result.payload.paginationState).toBeUndefined();
    expect(read().lastPolledAt).toBe("2026-06-01T00:00:00.000Z");
  });
  test("every round of a drain asks about the frozen window", async () => {
    let body: Record<string, unknown> = {};
    nock(ACTIVITY)
      .post("/v2/activity:query", (received) => {
        body = received as Record<string, unknown>;
        return true;
      })
      .reply(200, { activities: [] });
    const { polling } = statefulPolling({
      lastPolledAt: "2026-05-01T00:00:00.000Z",
    });
    await runBatchedPoll(polling, {
      paginationState: {
        ancestorIndex: 0,
        pageToken: "p2",
        windowStart: "2026-01-01T00:00:00.000Z",
        cycleEnd: "2026-06-01T00:00:00.000Z",
      },
    });
    expect(body.filter).toBe('time > "2026-01-01T00:00:00.000Z"');
    expect(body.pageToken).toBe("p2");
  });
  test("never reports no changes on a platform-driven round", async () => {
    nock(ACTIVITY).post("/v2/activity:query").reply(200, { activities: [] });
    const { polling } = statefulPolling({
      lastPolledAt: "2026-01-01T00:00:00.000Z",
    });
    const result = await runBatchedPoll(polling, {
      paginationState: {
        ancestorIndex: 0,
        windowStart: "2026-01-01T00:00:00.000Z",
        cycleEnd: "2026-06-01T00:00:00.000Z",
      },
    });
    expect(result.polledNoChanges).toBe(false);
  });
});
describe("driveActivityPollingTrigger empty look-back date", () => {
  afterEach(() => nock.cleanAll());
  test("falls through an empty look-back date rather than filtering on an empty time", async () => {
    let body: Record<string, unknown> = {};
    nock(ACTIVITY)
      .post("/v2/activity:query", (received) => {
        body = received as Record<string, unknown>;
        return true;
      })
      .reply(200, { activities: [] });
    const { polling } = statefulPolling();
    await runPoll(polling, {
      lookBackDate: "",
      triggerEvents: ["CREATE", "EDIT"],
    });
    expect(body.filter).not.toContain('time > ""');
    const [, filterTime] =
      (body.filter as string).match(/^time > "([^"]*)"/) ?? [];
    expect(filterTime).toBeTruthy();
    expect(Number.isNaN(new Date(filterTime).getTime())).toBe(false);
  });
  test("an empty look-back date still yields to a stored poll time", async () => {
    let body: Record<string, unknown> = {};
    nock(ACTIVITY)
      .post("/v2/activity:query", (received) => {
        body = received as Record<string, unknown>;
        return true;
      })
      .reply(200, { activities: [] });
    const { polling } = statefulPolling({
      lastPolledAt: "2026-05-01T00:00:00.000Z",
    });
    await runPoll(polling, { lookBackDate: "" });
    expect(body.filter).toBe('time > "2026-05-01T00:00:00.000Z"');
  });
});
describe("driveActivityPollingTrigger on-deploy resolver", () => {
  test("batches the initial sync off the same config as the scheduled poll", () => {
    expect(driveActivityPollingTrigger.onDeployPerform).toBeInstanceOf(
      Function,
    );
    expect(
      driveActivityPollingTrigger.onDeployResolver?.resolveItems,
    ).toBeInstanceOf(Function);
    expect(
      driveActivityPollingTrigger.onDeployResolver?.getNextPaginationState,
    ).toBeInstanceOf(Function);
  });
  test("resolveItems dispatches the activity the initial sync produced", () => {
    const activities = [{ timestamp: "2025-03-11T15:58:37.276Z" }];
    expect(
      driveActivityPollingTrigger.onDeployResolver?.resolveItems?.(
        {} as never,
        { payload: { body: { data: activities } } } as never,
      ),
    ).toEqual(activities);
  });
  test("resolveItems yields nothing when the round carried no envelope at all", () => {
    expect(
      driveActivityPollingTrigger.onDeployResolver?.resolveItems?.(
        {} as never,
        { payload: { body: { data: undefined } } } as never,
      ),
    ).toEqual([]);
  });
  test("getNextPaginationState forwards the composite cursor that drains the sync", () => {
    const cursor = {
      ancestorIndex: 1,
      pageToken: "page-2",
      windowStart: "2026-01-01T00:00:00.000Z",
      cycleEnd: "2026-02-01T00:00:00.000Z",
    };
    expect(
      driveActivityPollingTrigger.onDeployResolver?.getNextPaginationState?.(
        {} as never,
        { payload: { paginationState: cursor } } as never,
      ),
    ).toEqual(cursor);
  });
  test("getNextPaginationState returns null once the initial sync is exhausted", () => {
    expect(
      driveActivityPollingTrigger.onDeployResolver?.getNextPaginationState?.(
        {} as never,
        { payload: {} } as never,
      ),
    ).toBeNull();
  });
});
type OnDeployPerform = NonNullable<
  typeof driveActivityPollingTrigger.onDeployPerform
>;
const runDeploy = async (
  options: {
    paginationState?: Record<string, unknown>;
    params?: Record<string, unknown>;
    instanceState?: Record<string, unknown>;
  } = {},
) => {
  const setStateCalls: Record<string, unknown>[] = [];
  const onDeployPerform =
    driveActivityPollingTrigger.onDeployPerform as OnDeployPerform;
  const result = await onDeployPerform(
    {
      polling: {
        getState: () => ({}),
        setState: (next: Record<string, unknown>) => setStateCalls.push(next),
      },
      stepId: "mockStepId",
      flow: { stableId: "flowStableId" },
      instanceState: options.instanceState ?? {},
    } as unknown as Parameters<OnDeployPerform>[0],
    {
      ...defaultTriggerPayload(),
      ...(options.paginationState
        ? { paginationState: options.paginationState }
        : {}),
    } as unknown as Parameters<OnDeployPerform>[1],
    {
      connection,
      triggerEvents: [],
      itemName: undefined,
      ancestorName: [undefined],
      consolidationStrategy: undefined,
      lookBackDate: "",
      ...options.params,
    } as unknown as Parameters<OnDeployPerform>[2],
  );
  return { result, setStateCalls };
};
describe("driveActivityPollingTrigger initial sync on deploy", () => {
  afterEach(() => nock.cleanAll());
  test("opens the window at the look-back date", async () => {
    let body: Record<string, unknown> = {};
    nock(ACTIVITY)
      .post("/v2/activity:query", (received) => {
        body = received as Record<string, unknown>;
        return true;
      })
      .reply(200, { activities: [{ timestamp: "2025-03-11T15:58:37.276Z" }] });
    const { result } = await runDeploy({
      params: { lookBackDate: "2026-01-01T00:00:00.000Z" },
    });
    expect(body.filter).toBe('time > "2026-01-01T00:00:00.000Z"');
    expect(result.payload.body.data).toHaveLength(1);
    expect(result.polledNoChanges).toBe(false);
  });
  test("writes no polling state, which is the state it has no way to reach", async () => {
    nock(ACTIVITY)
      .post("/v2/activity:query")
      .reply(200, { activities: [{ timestamp: "2025-03-11T15:58:37.276Z" }] });
    const { setStateCalls } = await runDeploy({
      params: { lookBackDate: "2026-01-01T00:00:00.000Z" },
    });
    expect(setStateCalls).toEqual([]);
  });
  test("reads one page per round and hands the next page back", async () => {
    nock(ACTIVITY)
      .post("/v2/activity:query")
      .reply(200, {
        activities: [{ timestamp: "2025-03-11T15:58:37.276Z" }],
        nextPageToken: "p2",
      });
    const { result } = await runDeploy({
      params: { lookBackDate: "2026-01-01T00:00:00.000Z" },
    });
    expect(result.payload.paginationState).toEqual({
      ancestorIndex: 0,
      pageToken: "p2",
      windowStart: "2026-01-01T00:00:00.000Z",
      cycleEnd: expect.any(String),
    });
  });
  test("moves to the next ancestor once one is exhausted", async () => {
    nock(ACTIVITY).post("/v2/activity:query").reply(200, { activities: [] });
    const { result } = await runDeploy({
      params: {
        lookBackDate: "2026-01-01T00:00:00.000Z",
        ancestorName: ["items/a", "items/b"],
      },
    });
    expect(result.payload.paginationState).toEqual({
      ancestorIndex: 1,
      windowStart: "2026-01-01T00:00:00.000Z",
      cycleEnd: expect.any(String),
    });
    expect(result.polledNoChanges).toBe(false);
  });
  test("carries the frozen window through every round of the drain", async () => {
    let body: Record<string, unknown> = {};
    nock(ACTIVITY)
      .post("/v2/activity:query", (received) => {
        body = received as Record<string, unknown>;
        return true;
      })
      .reply(200, { activities: [] });
    await runDeploy({
      paginationState: {
        ancestorIndex: 0,
        pageToken: "p2",
        windowStart: "2026-01-01T00:00:00.000Z",
        cycleEnd: "2026-02-01T00:00:00.000Z",
      },
      params: { lookBackDate: "2026-06-01T00:00:00.000Z" },
    });
    expect(body.filter).toBe('time > "2026-01-01T00:00:00.000Z"');
    expect(body.pageToken).toBe("p2");
  });
  test("does nothing when no look-back date is configured", async () => {
    const { result, setStateCalls } = await runDeploy();
    expect(result.payload.body.data).toEqual([]);
    expect(result.payload.paginationState).toBeUndefined();
    expect(result.polledNoChanges).toBe(true);
    expect(setStateCalls).toEqual([]);
  });
});
describe("driveActivityPollingTrigger initial sync handoff", () => {
  afterEach(() => nock.cleanAll());
  test("hands its window end forward once the drain is done", async () => {
    nock(ACTIVITY)
      .post("/v2/activity:query")
      .reply(200, { activities: [{ timestamp: "2025-03-11T15:58:37.276Z" }] });
    const { result } = await runDeploy({
      params: { lookBackDate: "2026-01-01T00:00:00.000Z" },
    });
    expect(typeof result.instanceState?.[HANDOFF_KEY]).toBe("string");
    expect(result.instanceState?.[COMPLETED_KEY]).toBe(true);
  });
  test("hands over the frozen window end, not the instant the drain happened to finish", async () => {
    nock(ACTIVITY).post("/v2/activity:query").reply(200, { activities: [] });
    const { result } = await runDeploy({
      paginationState: {
        ancestorIndex: 0,
        windowStart: "2026-01-01T00:00:00.000Z",
        cycleEnd: "2026-02-01T00:00:00.000Z",
      },
      params: { lookBackDate: "2026-01-01T00:00:00.000Z" },
    });
    expect(result.instanceState?.[HANDOFF_KEY]).toBe(
      "2026-02-01T00:00:00.000Z",
    );
  });
  test("withholds the handoff while the drain is still running", async () => {
    nock(ACTIVITY)
      .post("/v2/activity:query")
      .reply(200, { activities: [], nextPageToken: "p2" });
    const { result } = await runDeploy({
      params: { lookBackDate: "2026-01-01T00:00:00.000Z" },
    });
    expect(result).not.toHaveProperty("instanceState");
  });
  test("does not re-dispatch the look-back window on a redeploy", async () => {
    const { result } = await runDeploy({
      params: { lookBackDate: "2026-01-01T00:00:00.000Z" },
      instanceState: { [COMPLETED_KEY]: true },
    });
    expect(result.payload.body.data).toEqual([]);
    expect(result.payload.paginationState).toBeUndefined();
    expect(result.polledNoChanges).toBe(true);
    expect(result).not.toHaveProperty("instanceState");
  });
  test("still drains a resuming round once the marker is set", async () => {
    nock(ACTIVITY).post("/v2/activity:query").reply(200, { activities: [] });
    const { result } = await runDeploy({
      paginationState: {
        ancestorIndex: 0,
        pageToken: "p2",
        windowStart: "2026-01-01T00:00:00.000Z",
        cycleEnd: "2026-02-01T00:00:00.000Z",
      },
      params: { lookBackDate: "2026-01-01T00:00:00.000Z" },
      instanceState: { [COMPLETED_KEY]: true },
    });
    expect(result.instanceState?.[HANDOFF_KEY]).toBe(
      "2026-02-01T00:00:00.000Z",
    );
  });
  test("opens the first poll's window where the initial sync stopped", async () => {
    let body: Record<string, unknown> = {};
    nock(ACTIVITY)
      .post("/v2/activity:query", (received) => {
        body = received as Record<string, unknown>;
        return true;
      })
      .reply(200, { activities: [] });
    const { polling } = statefulPolling();
    await runPoll(
      polling,
      { lookBackDate: "2026-01-01T00:00:00.000Z" },
      { [HANDOFF_KEY]: "2026-02-01T00:00:00.000Z", [COMPLETED_KEY]: true },
    );
    expect(body.filter).toBe('time > "2026-02-01T00:00:00.000Z"');
  });
  test("a stored poll time still wins over the handoff", async () => {
    let body: Record<string, unknown> = {};
    nock(ACTIVITY)
      .post("/v2/activity:query", (received) => {
        body = received as Record<string, unknown>;
        return true;
      })
      .reply(200, { activities: [] });
    const { polling } = statefulPolling({
      lastPolledAt: "2026-05-01T00:00:00.000Z",
    });
    await runPoll(
      polling,
      { lookBackDate: "2026-01-01T00:00:00.000Z" },
      { [HANDOFF_KEY]: "2026-02-01T00:00:00.000Z" },
    );
    expect(body.filter).toBe('time > "2026-05-01T00:00:00.000Z"');
  });
  test("clears the handoff once it has committed a poll time of its own", async () => {
    nock(ACTIVITY).post("/v2/activity:query").reply(200, { activities: [] });
    const { polling, read } = statefulPolling();
    const result = await runPoll(
      polling,
      { lookBackDate: "2026-01-01T00:00:00.000Z" },
      { [HANDOFF_KEY]: "2026-02-01T00:00:00.000Z", [COMPLETED_KEY]: true },
    );
    expect(typeof read().lastPolledAt).toBe("string");
    expect(result.instanceState).toEqual({
      [HANDOFF_KEY]: null,
      [COMPLETED_KEY]: true,
    });
  });
  test("writes no instanceState when there was no handoff to clear", async () => {
    nock(ACTIVITY).post("/v2/activity:query").reply(200, { activities: [] });
    const { polling } = statefulPolling();
    const result = await runPoll(polling, {
      lookBackDate: "2026-01-01T00:00:00.000Z",
    });
    expect(result).not.toHaveProperty("instanceState");
  });
  test("leaves the handoff in place while a batched drain is still running", async () => {
    nock(ACTIVITY).post("/v2/activity:query").reply(200, { activities: [] });
    const { polling } = statefulPolling();
    const result = await runBatchedPoll(polling, {
      params: {
        lookBackDate: "2026-01-01T00:00:00.000Z",
        ancestorName: ["items/a", "items/b"],
      },
      instanceState: { [HANDOFF_KEY]: "2026-02-01T00:00:00.000Z" },
    });
    expect(result.payload.paginationState).toEqual({
      ancestorIndex: 1,
      windowStart: "2026-02-01T00:00:00.000Z",
      cycleEnd: expect.any(String),
    });
    expect(result).not.toHaveProperty("instanceState");
  });
  test("clears the handoff on the round that exhausts the last ancestor", async () => {
    nock(ACTIVITY).post("/v2/activity:query").reply(200, { activities: [] });
    const { polling } = statefulPolling();
    const result = await runBatchedPoll(polling, {
      paginationState: {
        ancestorIndex: 1,
        windowStart: "2026-02-01T00:00:00.000Z",
        cycleEnd: "2026-02-02T00:00:00.000Z",
      },
      params: {
        lookBackDate: "2026-01-01T00:00:00.000Z",
        ancestorName: ["items/a", "items/b"],
      },
      instanceState: { [HANDOFF_KEY]: "2026-02-01T00:00:00.000Z" },
    });
    expect(result.payload.paginationState).toBeUndefined();
    expect(result.instanceState).toEqual({ [HANDOFF_KEY]: null });
  });
});
describe("driveActivityPollingTrigger ancestorName clean", () => {
  const cleanAncestorName = driveActivityPollingTrigger.inputs.ancestorName
    .clean as (value: unknown) => (string | undefined)[];
  test("wraps a single ID into a list and prefixes it", () => {
    expect(cleanAncestorName("0ALiN8fRST0gxUk9PVA")).toEqual([
      "items/0ALiN8fRST0gxUk9PVA",
    ]);
  });
  test("maps every ID when a list is supplied", () => {
    expect(cleanAncestorName(["folder-a", "folder-b"])).toEqual([
      "items/folder-a",
      "items/folder-b",
    ]);
  });
  test("leaves an already-prefixed ID alone rather than prefixing it twice", () => {
    expect(cleanAncestorName("items/folder-a")).toEqual(["items/folder-a"]);
    expect(cleanAncestorName(["items/folder-a", "folder-b"])).toEqual([
      "items/folder-a",
      "items/folder-b",
    ]);
  });
  test("yields a single undefined ancestor for the My Drive sentinel", () => {
    expect(cleanAncestorName(MY_DRIVE)).toEqual([undefined]);
    expect(cleanAncestorName(MY_DRIVE)).toHaveLength(1);
  });
  test("drops the My Drive sentinel to undefined in a mixed list without shortening it", () => {
    expect(cleanAncestorName([MY_DRIVE, "folder-a"])).toEqual([
      undefined,
      "items/folder-a",
    ]);
  });
});
