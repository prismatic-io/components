import type { PlannerTask } from "@microsoft/microsoft-graph-types";
import type { ActionContext, TriggerPayload } from "@prismatic-io/spectral";
import {
  createConnection,
  defaultTriggerPayload,
  invokeTrigger,
  loggerMock,
} from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import {
  afterEach,
  beforeAll,
  beforeEach,
  describe,
  expect,
  test,
  vi,
} from "vitest";
import { templatedOauth } from "../connections";
import { MAX_PAGES, PLANNER_ENDPOINTS } from "../constants";
import type {
  Etagged,
  PlannerChangesObject,
  PlannerTaskChange,
} from "../types";
import { resolvePlannerTaskChanges } from "../utils";
import { pollChangesTrigger } from "./pollChangesTrigger";
const BASE = "https://graph.microsoft.com";
const PLAN_ID = "xqQg5FS2LkCp935s-FIFm2QAFkHM";
const TASKS_URL = `/v1.0${PLANNER_ENDPOINTS.PLAN_TASKS(PLAN_ID)}`;
const task: PlannerTask & Etagged = {
  "@odata.etag": 'W/"JzEtVGFzayAgQEBAQEBAQEBAQEBAQEBAWCc="',
  id: "01gzSlKkIUSUl6DF_EilrmQAKDhh",
  planId: PLAN_ID,
  title: "Update the client list",
  createdDateTime: "2024-01-09T09:12:03.1533333Z",
};
const connection = createConnection(
  templatedOauth,
  {},
  { access_token: "test-token" },
);
const params = {
  connection,
  groupId: undefined,
  planId: PLAN_ID,
  lookBackDate: "",
};
const TASK_CURSOR = "2024-01-09T09:12:03.153Z";
const pollingContext = (store: { state: Record<string, unknown> }) => {
  const logger = loggerMock();
  const context = {
    logger,
    polling: {
      getState: () => store.state,
      setState: (newState: Record<string, unknown>) => {
        store.state = newState;
      },
      invokeAction: async () => ({ data: null }),
    },
  } as unknown as Partial<ActionContext>;
  return { context, logger };
};
type HarnessTrigger = Parameters<typeof invokeTrigger>[0];
type PollReturn = Awaited<ReturnType<typeof pollChangesTrigger.perform>>;
const invokePoll = async (
  context: Partial<ActionContext>,
  payload?: TriggerPayload,
  overrides: Partial<typeof params> = {},
) => {
  const invocation = await invokeTrigger(
    pollChangesTrigger as unknown as HarnessTrigger,
    context,
    payload,
    { ...params, ...overrides },
  );
  return { ...invocation, result: invocation.result as PollReturn };
};
beforeAll(() => {
  nock.disableNetConnect();
});
beforeEach(() => {
  vi.useFakeTimers();
});
afterEach(() => {
  vi.useRealTimers();
  nock.cleanAll();
});
describe("New Tasks batching declaration", () => {
  test("is opt-in batchable with a default batch size", () => {
    expect(pollChangesTrigger.triggerResolverSupport).toBe("valid");
    expect(pollChangesTrigger.batchConfig).toEqual({ batchSize: 50 });
    expect(pollChangesTrigger.triggerResolver?.resolveItems).toBeInstanceOf(
      Function,
    );
  });
  test("resolvePlannerTaskChanges tags every task with how it changed", () => {
    const expected: PlannerTaskChange[] = [
      { changeType: "created", record: task },
    ];
    expect(resolvePlannerTaskChanges({ created: [task] })).toEqual(expected);
  });
  test("resolvePlannerTaskChanges returns [] for an empty or absent envelope", () => {
    expect(resolvePlannerTaskChanges({ created: [] })).toEqual([]);
    expect(resolvePlannerTaskChanges(undefined)).toEqual([]);
    expect(resolvePlannerTaskChanges({} as PlannerChangesObject)).toEqual([]);
  });
  test("resolveItems flattens the payload shape perform actually returns", () => {
    const payload = {
      ...defaultTriggerPayload(),
      body: { data: { created: [task] } },
    };
    expect(
      pollChangesTrigger.triggerResolver?.resolveItems?.({} as never, {
        payload,
      }),
    ).toEqual([{ changeType: "created", record: task }]);
  });
});
describe("New Tasks perform", () => {
  test("emits nothing on the first run and seeds the cursor from the newest existing task", async () => {
    vi.setSystemTime(new Date("2024-01-22T14:00:00.000Z"));
    const store = { state: {} as Record<string, unknown> };
    const { context } = pollingContext(store);
    nock(BASE)
      .get(TASKS_URL)
      .reply(200, {
        value: [
          { ...task, id: "older", createdDateTime: "2024-01-08T08:00:00Z" },
          { ...task, createdDateTime: "2024-01-09T09:12:03Z" },
        ],
      });
    const { result } = await invokePoll(context, undefined);
    expect(result.payload.body.data).toEqual({ created: [] });
    expect(result.polledNoChanges).toBe(true);
    expect(store.state).toEqual({ lastPolledAt: "2024-01-09T09:12:03.000Z" });
  });
  test("seeds the first run from Planner's clock even when the worker clock lags behind it", async () => {
    vi.setSystemTime(new Date("2024-01-22T14:00:00.000Z"));
    const store = { state: {} as Record<string, unknown> };
    const { context } = pollingContext(store);
    const aheadOfWorker = {
      ...task,
      id: "ahead",
      createdDateTime: "2024-01-22T14:00:05Z",
    };
    nock(BASE)
      .get(TASKS_URL)
      .reply(200, { value: [aheadOfWorker] });
    const { result } = await invokePoll(context, undefined);
    expect(result.payload.body.data).toEqual({ created: [] });
    expect(store.state).toEqual({ lastPolledAt: "2024-01-22T14:00:05.000Z" });
  });
  test("emits the tasks created since the stored cursor and advances it to the latest createdDateTime", async () => {
    vi.setSystemTime(new Date("2024-01-22T14:00:00.000Z"));
    const store = {
      state: { lastPolledAt: "2024-01-09T09:00:00.000Z" } as Record<
        string,
        unknown
      >,
    };
    const { context } = pollingContext(store);
    nock(BASE)
      .get(TASKS_URL)
      .reply(200, { value: [task] });
    const { result } = await invokePoll(context, undefined);
    expect(result.payload.body.data).toEqual({ created: [task] });
    expect(result.polledNoChanges).toBe(false);
    expect(store.state).toEqual({ lastPolledAt: TASK_CURSOR });
  });
  test("keeps the cursor unchanged on an empty poll and still persists it", async () => {
    vi.setSystemTime(new Date("2024-01-22T14:00:00.000Z"));
    const store = {
      state: { lastPolledAt: "2024-01-09T09:00:00.000Z" } as Record<
        string,
        unknown
      >,
    };
    const { context } = pollingContext(store);
    nock(BASE).get(TASKS_URL).reply(200, { value: [] });
    const { result } = await invokePoll(context, undefined);
    expect(result.payload.body.data).toEqual({ created: [] });
    expect(result.polledNoChanges).toBe(true);
    expect(store.state).toEqual({ lastPolledAt: "2024-01-09T09:00:00.000Z" });
  });
  test("falls back to now on a first run with no state and no tasks to seed from", async () => {
    vi.setSystemTime(new Date("2024-01-22T14:00:00.000Z"));
    const store = { state: {} as Record<string, unknown> };
    const { context } = pollingContext(store);
    nock(BASE).get(TASKS_URL).reply(200, { value: [] });
    const { result } = await invokePoll(context, undefined);
    expect(result.polledNoChanges).toBe(true);
    expect(store.state).toEqual({ lastPolledAt: "2024-01-22T14:00:00.000Z" });
  });
  test("seeds the first run from the Look-back Date, including a task created at midnight UTC", async () => {
    vi.setSystemTime(new Date("2024-01-22T14:00:00.000Z"));
    const store = { state: {} as Record<string, unknown> };
    const { context } = pollingContext(store);
    const atMidnight = {
      ...task,
      id: "midnight",
      createdDateTime: "2024-01-09T00:00:00Z",
    };
    const before = {
      ...task,
      id: "before",
      createdDateTime: "2024-01-08T23:59:59.999Z",
    };
    nock(BASE)
      .get(TASKS_URL)
      .reply(200, { value: [before, atMidnight, task] });
    const { result } = await invokePoll(context, undefined, {
      lookBackDate: "2024-01-09",
    });
    expect(result.payload.body.data).toEqual({ created: [atMidnight, task] });
    expect(store.state).toEqual({ lastPolledAt: TASK_CURSOR });
  });
  test("emits a task created while the previous walk was in progress exactly once", async () => {
    const store = {
      state: { lastPolledAt: "2024-01-09T09:00:00.000Z" } as Record<
        string,
        unknown
      >,
    };
    const { context } = pollingContext(store);
    vi.setSystemTime(new Date("2024-01-09T09:12:00.000Z"));
    nock(BASE)
      .get(TASKS_URL)
      .reply(200, { value: [task] });
    const first = await invokePoll(context, undefined);
    expect(first.result.payload.body.data).toEqual({ created: [task] });
    vi.setSystemTime(new Date("2024-01-09T10:00:00.000Z"));
    nock(BASE)
      .get(TASKS_URL)
      .reply(200, { value: [task] });
    const second = await invokePoll(context, undefined);
    expect(second.result.payload.body.data).toEqual({ created: [] });
    expect(store.state).toEqual({ lastPolledAt: TASK_CURSOR });
  });
  test("does not re-emit a task the previous poll already returned", async () => {
    const store = {
      state: { lastPolledAt: "2024-01-09T09:00:00.000Z" } as Record<
        string,
        unknown
      >,
    };
    const { context } = pollingContext(store);
    vi.setSystemTime(new Date("2024-01-09T10:00:00.000Z"));
    nock(BASE)
      .get(TASKS_URL)
      .reply(200, { value: [task] });
    const first = await invokePoll(context, undefined);
    expect(
      (first.result.payload.body.data as PlannerChangesObject).created,
    ).toHaveLength(1);
    vi.setSystemTime(new Date("2024-01-09T11:00:00.000Z"));
    nock(BASE)
      .get(TASKS_URL)
      .reply(200, { value: [task] });
    const second = await invokePoll(context, undefined);
    expect(second.result.payload.body.data).toEqual({ created: [] });
    expect(second.result.polledNoChanges).toBe(true);
    expect(store.state).toEqual({ lastPolledAt: TASK_CURSOR });
  });
  test("preserves the rest of the trigger payload alongside body.data", async () => {
    vi.setSystemTime(new Date("2024-01-22T14:00:00.000Z"));
    const store = {
      state: { lastPolledAt: "2024-01-09T09:00:00.000Z" } as Record<
        string,
        unknown
      >,
    };
    const { context } = pollingContext(store);
    const payload = { ...defaultTriggerPayload(), pathFragment: "/keep-me" };
    nock(BASE)
      .get(TASKS_URL)
      .reply(200, { value: [task] });
    const { result } = await invokePoll(context, payload);
    expect(result.payload.pathFragment).toBe("/keep-me");
    expect(result.payload.headers).toEqual(payload.headers);
    expect(result.payload.body).toEqual({ data: { created: [task] } });
  });
  test("rejects without emitting or moving the cursor when the page cap truncates the walk", async () => {
    vi.setSystemTime(new Date("2024-01-22T14:00:00.000Z"));
    const held = "2024-01-09T09:00:00.000Z";
    const store = { state: { lastPolledAt: held } as Record<string, unknown> };
    const { context } = pollingContext(store);
    let pages = 0;
    nock(BASE)
      .get(/.*/)
      .times(MAX_PAGES + 5)
      .reply(() => {
        pages += 1;
        return [
          200,
          {
            value: [{ ...task, id: `task-${pages}` }],
            "@odata.nextLink": `${BASE}${TASKS_URL}?p=${pages + 1}`,
          },
        ];
      });
    await expect(invokePoll(context, undefined)).rejects.toThrow(
      new RegExp(
        `Plan ${PLAN_ID} .*${MAX_PAGES}-page limit.*no filter or ordering`,
      ),
    );
    expect(pages).toBe(MAX_PAGES);
    expect(store.state).toEqual({ lastPolledAt: held });
  });
});
