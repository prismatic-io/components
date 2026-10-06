import {
  createConnection,
  defaultTriggerPayload,
  invokeTrigger,
} from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import { clickUpApiKeyConnection } from "../connections/clickUpApiKeyConnection";
import { listTasksExamplePayload } from "../examplePayloads";
import type { ClickUpTask } from "../types";
import { pollChangesTrigger } from "./pollChangesTrigger";
const created: ClickUpTask = {
  id: "abc123",
  date_created: "1716220800000",
  date_updated: "1716220800000",
};
const updated: ClickUpTask = {
  id: "def456",
  date_created: "1716134400000",
  date_updated: "1716224400000",
};
test("resolveItems flattens the payload shape perform actually returns", () => {
  const payload = {
    ...defaultTriggerPayload(),
    body: { data: { created: [created], updated: [updated] } },
  };
  expect(
    pollChangesTrigger.triggerResolver?.resolveItems?.({} as never, {
      payload,
    }),
  ).toEqual([
    { changeType: "created", record: created },
    { changeType: "updated", record: updated },
  ]);
});
const API = "https://api.clickup.com/api/v2";
const connection = createConnection(clickUpApiKeyConnection, {
  apiKey: "test-key",
});
const T0 = new Date("2026-09-29T12:00:00.000Z");
const T1 = new Date("2026-09-29T12:05:00.000Z");
const baseTask = listTasksExamplePayload.data.tasks[0];
const task = (id: string, createdAt: Date, updatedAt: Date): ClickUpTask => ({
  ...baseTask,
  id,
  date_created: String(createdAt.getTime()),
  date_updated: String(updatedAt.getTime()),
});
const createPollingContext = (initialState?: Record<string, unknown>) => {
  const store: {
    state: Record<string, unknown> | undefined;
  } = { state: initialState };
  const context = {
    polling: {
      getState: () => store.state,
      setState: (next: Record<string, unknown>) => {
        store.state = next;
      },
    },
  };
  return { store, context: context as never };
};
interface PollParams {
  scopeType: string;
  scopeId: string;
  lookBackDate: string;
  showNewRecords: boolean;
  showUpdatedRecords: boolean;
}
const poll = (context: never, params: Partial<PollParams> = {}) =>
  invokeTrigger(pollChangesTrigger as never, context, defaultTriggerPayload(), {
    connection,
    scopeType: "list",
    scopeId: "124",
    lookBackDate: "",
    showNewRecords: true,
    showUpdatedRecords: true,
    ...params,
  } as never);
const mockTaskPages = (path: string, pages: ClickUpTask[][]) => {
  const queries: Record<string, unknown>[] = [];
  for (const tasks of pages) {
    nock(API)
      .get(path)
      .query((query) => {
        queries.push(query);
        return true;
      })
      .reply(200, { tasks });
  }
  return queries;
};
describe("pollChangesTrigger perform", () => {
  beforeAll(() => nock.disableNetConnect());
  afterAll(() => nock.enableNetConnect());
  beforeEach(() => {
    vi.useFakeTimers({ toFake: ["Date"] });
    vi.setSystemTime(T0);
  });
  afterEach(() => {
    vi.useRealTimers();
    const consumed = nock.isDone();
    nock.cleanAll();
    expect(consumed).toBe(true);
  });
  test("advances the cursor across polls and emits only tasks changed after it", async () => {
    const { store, context } = createPollingContext();
    const firstQueries = mockTaskPages("/list/124/task", [[]]);
    const first = await poll(context);
    expect(firstQueries).toEqual([
      {
        date_updated_gt: String(T0.getTime()),
        page: "0",
        include_closed: "true",
        subtasks: "true",
      },
    ]);
    expect(first.result).toMatchObject({
      polledNoChanges: true,
      payload: { body: { data: { created: [], updated: [] } } },
    });
    expect(store.state).toEqual({ lastPolledAt: T0.toISOString() });
    vi.setSystemTime(T1);
    const before = new Date(T0.getTime() - 60000);
    const between = new Date(T0.getTime() + 60000);
    const created = task("new-1", between, between);
    const updated = task("upd-1", before, between);
    const alreadySeen = task("seen-1", before, T0);
    const secondQueries = mockTaskPages("/list/124/task", [
      [created, updated, alreadySeen],
    ]);
    const second = await poll(context);
    expect(secondQueries[0]).toMatchObject({
      date_updated_gt: String(T0.getTime()),
      page: "0",
    });
    expect(second.result).toMatchObject({
      polledNoChanges: false,
      payload: { body: { data: { created: [created], updated: [updated] } } },
    });
    expect(store.state).toEqual({ lastPolledAt: T1.toISOString() });
  });
  test("polls the workspace task endpoint for the team scope", async () => {
    const { context } = createPollingContext({
      lastPolledAt: T0.toISOString(),
    });
    const queries = mockTaskPages("/team/9012345/task", [[]]);
    await poll(context, { scopeType: "team", scopeId: "9012345" });
    expect(queries).toHaveLength(1);
  });
  test("requests page 1 after a full 100-task page and stops on a short page", async () => {
    const { context } = createPollingContext({
      lastPolledAt: T0.toISOString(),
    });
    const changed = new Date(T0.getTime() + 1000);
    const fullPage = Array.from({ length: 100 }, (_, i) =>
      task(`t-${i}`, changed, changed),
    );
    const lastPage = [task("t-100", changed, changed)];
    const queries = mockTaskPages("/list/124/task", [fullPage, lastPage]);
    const { result } = await poll(context);
    expect(queries.map(({ page }) => page)).toEqual(["0", "1"]);
    expect(result).toMatchObject({
      payload: { body: { data: { updated: [] } } },
    });
    expect((result as any).payload.body.data.created).toHaveLength(101);
  });
  test("Show New Records off suppresses created tasks on a recurring poll", async () => {
    const { context } = createPollingContext({
      lastPolledAt: T0.toISOString(),
    });
    const changed = new Date(T0.getTime() + 1000);
    const created = task("new-1", changed, changed);
    const updated = task("upd-1", new Date(T0.getTime() - 1000), changed);
    mockTaskPages("/list/124/task", [[created, updated]]);
    const { result } = await poll(context, { showNewRecords: false });
    expect(result).toMatchObject({
      polledNoChanges: false,
      payload: { body: { data: { created: [], updated: [updated] } } },
    });
  });
  test("Show Updated Records off suppresses updated tasks on a recurring poll", async () => {
    const { context } = createPollingContext({
      lastPolledAt: T0.toISOString(),
    });
    const changed = new Date(T0.getTime() + 1000);
    const created = task("new-1", changed, changed);
    const updated = task("upd-1", new Date(T0.getTime() - 1000), changed);
    mockTaskPages("/list/124/task", [[created, updated]]);
    const { result } = await poll(context, { showUpdatedRecords: false });
    expect(result).toMatchObject({
      payload: { body: { data: { created: [created], updated: [] } } },
    });
  });
  test("Look-back Date seeds an initial sync that ignores the toggles, then recurrences resume from it", async () => {
    const { store, context } = createPollingContext();
    const lookBackDate = "2026-01-01T00:00:00.000Z";
    const lookBackMs = Date.parse(lookBackDate);
    const createdAtBoundary = task(
      "edge-1",
      new Date(lookBackMs),
      new Date(lookBackMs),
    );
    const updatedLater = task(
      "upd-1",
      new Date(lookBackMs - 86400000),
      new Date(lookBackMs + 86400000),
    );
    const initialQueries = mockTaskPages("/list/124/task", [
      [createdAtBoundary, updatedLater],
    ]);
    const initial = await poll(context, {
      lookBackDate,
      showNewRecords: false,
      showUpdatedRecords: false,
    });
    expect(initialQueries[0]).toMatchObject({
      date_updated_gt: String(lookBackMs - 1),
      page: "0",
    });
    expect(initial.result).toMatchObject({
      polledNoChanges: false,
      payload: {
        body: {
          data: { created: [createdAtBoundary], updated: [updatedLater] },
        },
      },
    });
    expect(store.state).toEqual({ lastPolledAt: T0.toISOString() });
    vi.setSystemTime(T1);
    const changed = new Date(T0.getTime() + 1000);
    const recurringQueries = mockTaskPages("/list/124/task", [
      [task("new-2", changed, changed)],
    ]);
    const recurring = await poll(context, {
      lookBackDate,
      showNewRecords: false,
      showUpdatedRecords: false,
    });
    expect(recurringQueries[0]).toMatchObject({
      date_updated_gt: String(T0.getTime()),
    });
    expect(recurring.result).toMatchObject({
      polledNoChanges: true,
      payload: { body: { data: { created: [], updated: [] } } },
    });
  });
});
