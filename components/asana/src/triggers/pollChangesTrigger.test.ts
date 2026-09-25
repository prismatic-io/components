import type { BatchInfo } from "@prismatic-io/spectral";
import { defaultTriggerPayload } from "@prismatic-io/spectral/dist/testing";
import { createAsanaClient } from "../client";
import { MAX_BATCHED_PAGE_SIZE } from "../constants";
import type { PollingChangesObject, PollingState } from "../types/polling";
import type { Task } from "../types/resources";
import { pollChangesTrigger } from "./pollChangesTrigger";
vi.mock("../client", () => ({ createAsanaClient: vi.fn() }));
const NOW = new Date("2026-03-01T12:00:00.000Z");
const T0 = "2026-02-01T00:00:00.000Z";
let serverTasks: Task[] = [];
const sentSince: string[] = [];
const fakeClient = {
  get: vi.fn(
    async (
      _url: string,
      {
        params,
      }: {
        params: Record<string, unknown>;
      },
    ) => {
      const since = new Date(String(params.modified_since)).getTime();
      sentSince.push(String(params.modified_since));
      const data = serverTasks
        .filter((task) => new Date(task.modified_at).getTime() >= since)
        .reverse();
      return { data: { data, next_page: null } };
    },
  ),
};
const makeTask = (gid: string, createdAt: string, modifiedAt: string): Task =>
  ({
    gid,
    name: `Task ${gid}`,
    created_at: createdAt,
    modified_at: modifiedAt,
  }) as Task;
const taskAt = (
  gid: string,
  base: string,
  offsetSeconds: number,
  isNew = false,
): Task => {
  const modified = new Date(
    new Date(base).getTime() + offsetSeconds * 1000,
  ).toISOString();
  return makeTask(gid, isNew ? modified : "2025-01-01T00:00:00.000Z", modified);
};
const createContext = (
  initial: PollingState | undefined,
  batch?: BatchInfo,
) => {
  let state: PollingState | undefined = initial;
  const context = {
    debug: { enabled: false },
    logger: { debug: vi.fn(), info: vi.fn(), warn: vi.fn(), error: vi.fn() },
    polling: {
      getState: () => state,
      setState: (next: PollingState) => {
        state = next;
      },
    },
    ...(batch === undefined ? {} : { batch }),
  };
  return { context, getState: () => state };
};
interface Params {
  lookBackDate?: string;
  showNewRecords?: boolean;
  showUpdatedRecords?: boolean;
}
const poll = async (
  context: ReturnType<typeof createContext>["context"],
  {
    lookBackDate = "",
    showNewRecords = true,
    showUpdatedRecords = true,
  }: Params = {},
) => {
  const result = await pollChangesTrigger.perform(
    context as never,
    defaultTriggerPayload(),
    {
      asanaConnection: {} as never,
      projectId: "1200000000000001",
      lookBackDate,
      showNewRecords,
      showUpdatedRecords,
    } as never,
  );
  const data = result.payload.body.data as Required<PollingChangesObject>;
  return {
    result,
    data,
    gids: [...data.created, ...data.updated].map((t) => t.gid),
  };
};
const BATCHED: BatchInfo = { enabled: true, batchSize: 50 };
beforeEach(() => {
  vi.useFakeTimers({ toFake: ["Date"] });
  vi.setSystemTime(NOW);
  vi.mocked(createAsanaClient).mockResolvedValue(fakeClient as never);
  serverTasks = [];
  sentSince.length = 0;
});
afterEach(() => {
  vi.useRealTimers();
});
test("New and Updated Tasks is opt-in batchable with a default batch size", () => {
  expect(pollChangesTrigger.triggerResolverSupport).toBe("valid");
  expect(pollChangesTrigger.batchConfig).toEqual({ batchSize: 50 });
  expect(pollChangesTrigger.triggerResolver?.resolveItems).toBeInstanceOf(
    Function,
  );
});
test("resolveItems flattens the payload shape perform actually returns", () => {
  const task = makeTask("1", T0, T0);
  const payload = {
    ...defaultTriggerPayload(),
    body: { data: { created: [task] } },
  };
  expect(
    pollChangesTrigger.triggerResolver?.resolveItems?.(
      {} as never,
      { payload } as never,
    ),
  ).toEqual([{ changeType: "created", record: task }]);
});
describe("unbatched path", () => {
  test.each([
    ["context.batch absent", undefined],
    ["context.batch disabled", { enabled: false } as BatchInfo],
  ])("keeps the wall-clock cursor and the visibility filters (%s)", async (_label, batch) => {
    serverTasks = [
      taskAt("new", T0, 10, true),
      taskAt("upd", T0, 20),
      makeTask("edge", T0, T0),
    ];
    const { context, getState } = createContext({ lastPolledAt: T0 }, batch);
    const { data, result } = await poll(context, { showUpdatedRecords: false });
    expect(sentSince).toEqual([T0]);
    expect(data.created.map((t) => t.gid)).toEqual(["new"]);
    expect(data.updated).toEqual([]);
    expect(result.polledNoChanges).toBe(false);
    expect(getState()).toEqual({ lastPolledAt: NOW.toISOString() });
  });
  test("an initial sync ignores the visibility filters on its single recurrence", async () => {
    serverTasks = [
      taskAt("new", "2026-01-01T00:00:00.000Z", 10, true),
      taskAt("upd", T0, 20),
    ];
    const { context, getState } = createContext(undefined);
    const first = await poll(context, {
      lookBackDate: "2026-01-01",
      showNewRecords: false,
      showUpdatedRecords: false,
    });
    expect(first.gids.sort()).toEqual(["new", "upd"]);
    expect(getState()).toEqual({ lastPolledAt: NOW.toISOString() });
    serverTasks = [taskAt("later", NOW.toISOString(), 5)];
    vi.setSystemTime(new Date(NOW.getTime() + 60000));
    const second = await poll(context, {
      lookBackDate: "2026-01-01",
      showNewRecords: false,
      showUpdatedRecords: false,
    });
    expect(second.gids).toEqual([]);
    expect(second.result.polledNoChanges).toBe(true);
  });
});
describe("batched path", () => {
  test("truncates at MAX_BATCHED_PAGE_SIZE, oldest first, and advances the cursor to the last delivered task", async () => {
    const total = MAX_BATCHED_PAGE_SIZE + 5;
    serverTasks = Array.from({ length: total }, (_, i) =>
      taskAt(`t${String(i).padStart(4, "0")}`, T0, i + 1),
    );
    const { context, getState } = createContext({ lastPolledAt: T0 }, BATCHED);
    const first = await poll(context);
    const expectedFirst = serverTasks.slice(0, MAX_BATCHED_PAGE_SIZE);
    expect(first.data.updated).toEqual(expectedFirst);
    const lastDelivered = expectedFirst[expectedFirst.length - 1];
    expect(getState()).toEqual({
      lastPolledAt: lastDelivered.modified_at,
      lastSeenIds: [lastDelivered.gid],
    });
    expect(
      pollChangesTrigger.triggerResolver?.resolveItems?.(
        {} as never,
        first.result as never,
      ),
    ).toHaveLength(MAX_BATCHED_PAGE_SIZE);
    const second = await poll(context);
    expect(sentSince[1]).toBe(lastDelivered.modified_at);
    expect(second.gids).toEqual(
      serverTasks.slice(MAX_BATCHED_PAGE_SIZE).map((t) => t.gid),
    );
    expect(getState()?.lastPolledAt).toBe(serverTasks[total - 1].modified_at);
  });
  test("boundary dedupe drops ids already delivered at the cursor timestamp only", async () => {
    const cursor = "2026-02-10T00:00:00.000Z";
    serverTasks = [
      makeTask("seen", "2025-01-01T00:00:00.000Z", cursor),
      makeTask("sibling", "2025-01-01T00:00:00.000Z", cursor),
      taskAt("after", cursor, 1),
    ];
    const { context, getState } = createContext(
      { lastPolledAt: cursor, lastSeenIds: ["seen"] },
      BATCHED,
    );
    const { gids } = await poll(context);
    expect(sentSince).toEqual([cursor]);
    expect(gids).toEqual(["sibling", "after"]);
    expect(getState()).toEqual({
      lastPolledAt: serverTasks[2].modified_at,
      lastSeenIds: ["after"],
    });
  });
  test("a cut never splits a group of tasks sharing one modified_at", async () => {
    const tied = "2026-02-20T00:00:00.000Z";
    serverTasks = [
      ...Array.from({ length: MAX_BATCHED_PAGE_SIZE - 1 }, (_, i) =>
        taskAt(`a${String(i).padStart(4, "0")}`, T0, i + 1),
      ),
      makeTask("tie1", "2025-01-01T00:00:00.000Z", tied),
      makeTask("tie2", "2025-01-01T00:00:00.000Z", tied),
    ];
    const { context, getState } = createContext({ lastPolledAt: T0 }, BATCHED);
    const first = await poll(context);
    expect(first.gids).toHaveLength(MAX_BATCHED_PAGE_SIZE - 1);
    expect(first.gids).not.toContain("tie1");
    expect(getState()?.lastPolledAt).toBe(
      serverTasks[MAX_BATCHED_PAGE_SIZE - 2].modified_at,
    );
    const second = await poll(context);
    expect(second.gids).toEqual(["tie1", "tie2"]);
  });
  test("an old state holding only lastPolledAt is still readable", async () => {
    serverTasks = [
      taskAt("new", T0, 5, true),
      makeTask("edge", "2025-01-01T00:00:00.000Z", T0),
    ];
    const { context, getState } = createContext({ lastPolledAt: T0 }, BATCHED);
    const { data } = await poll(context);
    expect(data.created.map((t) => t.gid)).toEqual(["new"]);
    expect(data.updated).toEqual([]);
    expect(getState()).toEqual({
      lastPolledAt: serverTasks[0].modified_at,
      lastSeenIds: ["new"],
    });
  });
  test("the initial sync ignores Show New/Updated Records across two clamped recurrences, then the filters return", async () => {
    const lookBack = "2026-01-01T00:00:00.000Z";
    const total = MAX_BATCHED_PAGE_SIZE + 10;
    serverTasks = Array.from({ length: total }, (_, i) =>
      taskAt(`b${String(i).padStart(4, "0")}`, lookBack, i + 1, i % 2 === 0),
    );
    const params = {
      lookBackDate: "2026-01-01",
      showNewRecords: false,
      showUpdatedRecords: false,
    };
    const { context, getState } = createContext(undefined, BATCHED);
    const first = await poll(context, params);
    expect(sentSince[0]).toBe(lookBack);
    expect(first.gids).toHaveLength(MAX_BATCHED_PAGE_SIZE);
    expect(first.data.created.length).toBeGreaterThan(0);
    expect(first.data.updated.length).toBeGreaterThan(0);
    expect(getState()?.isBackfill).toBe(true);
    const second = await poll(context, params);
    expect(second.gids.sort()).toEqual(
      serverTasks
        .slice(MAX_BATCHED_PAGE_SIZE)
        .map((t) => t.gid)
        .sort(),
    );
    expect(getState()?.isBackfill).toBeUndefined();
    serverTasks = [
      ...serverTasks,
      taskAt("after", serverTasks[total - 1].modified_at, 60, true),
    ];
    const third = await poll(context, params);
    expect(third.gids).toEqual([]);
    expect(third.result.polledNoChanges).toBe(true);
    serverTasks = [
      ...serverTasks,
      taskAt("shown", serverTasks[total].modified_at, 60, true),
    ];
    const fourth = await poll(context, { ...params, showNewRecords: true });
    expect(fourth.data.created.map((t) => t.gid)).toEqual(["shown"]);
  });
});
