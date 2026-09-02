import nock from "nock";
import {
  buildPost,
  CANNY_HOST,
  captureBody,
  createPollingContext,
  invokePollChangesTrigger,
  testConnection,
  V1,
} from "../testHelpers";
import { pollChangesTrigger } from "./pollChangesTrigger";
const POSTS_LIST = `${V1}/posts/list`;
const baseParams = {
  connection: testConnection,
  showNewRecords: true,
  showUpdatedRecords: true,
  lookBackDate: "",
};
const newPost = buildPost("new-1", "2026-06-02T00:00:00.000Z");
const stalePost = buildPost(
  "stale-1",
  "2026-01-01T00:00:00.000Z",
  "2026-01-02T00:00:00.000Z",
);
describe("pollChangesTrigger", () => {
  afterEach(() => nock.cleanAll());
  test("bootstraps the cursor and makes no API call on the first recurrence with no look-back", async () => {
    const { store, context } = createPollingContext();
    const scope = nock(CANNY_HOST).post(POSTS_LIST).reply(200, { posts: [] });
    const result = await invokePollChangesTrigger(context, baseParams);
    expect(result.polledNoChanges).toBe(true);
    expect(result.payload.body.data).toStrictEqual({
      created: [],
      updated: [],
    });
    expect(store.state.lastPolledAt).toEqual(expect.any(String));
    expect(scope.isDone()).toBe(false);
  });
  test("fetches all pages and forwards only the API key in the body", async () => {
    const { context } = createPollingContext({
      lastPolledAt: "2026-06-01T00:00:00.000Z",
    });
    const first = captureBody();
    const second = captureBody();
    nock(CANNY_HOST)
      .post(POSTS_LIST, first.matcher)
      .reply(200, { posts: [newPost], hasMore: true })
      .post(POSTS_LIST, second.matcher)
      .reply(200, { posts: [stalePost], hasMore: false });
    const result = await invokePollChangesTrigger(context, baseParams);
    expect(first.captured.body).toStrictEqual({
      apiKey: "test-api-key",
      skip: 0,
      limit: 100,
    });
    expect(second.captured.body).toStrictEqual({
      apiKey: "test-api-key",
      skip: 1,
      limit: 100,
    });
    expect(result.payload.body.data.created.map((p) => p.id)).toStrictEqual([
      "new-1",
    ]);
    expect(result.payload.body.data.updated).toStrictEqual([]);
    expect(result.polledNoChanges).toBe(false);
  });
  test("advances the cursor and stops re-emitting a post already seen", async () => {
    const { store, context } = createPollingContext({
      lastPolledAt: "2026-06-01T00:00:00.000Z",
    });
    nock(CANNY_HOST)
      .post(POSTS_LIST)
      .reply(200, { posts: [newPost], hasMore: false });
    const firstRun = await invokePollChangesTrigger(context, baseParams);
    const firstCursor = store.state.lastPolledAt;
    expect(firstRun.payload.body.data.created.map((p) => p.id)).toStrictEqual([
      "new-1",
    ]);
    expect(firstCursor).toEqual(expect.any(String));
    expect(new Date(String(firstCursor)).getTime()).toBeGreaterThan(
      new Date("2026-06-01T00:00:00.000Z").getTime(),
    );
    nock(CANNY_HOST)
      .post(POSTS_LIST)
      .reply(200, { posts: [newPost], hasMore: false });
    const secondRun = await invokePollChangesTrigger(context, baseParams);
    expect(secondRun.payload.body.data).toStrictEqual({
      created: [],
      updated: [],
    });
    expect(secondRun.polledNoChanges).toBe(true);
    expect(
      new Date(String(store.state.lastPolledAt)).getTime(),
    ).toBeGreaterThanOrEqual(new Date(String(firstCursor)).getTime());
  });
  test("seeds a look-back window once and does not repeat it on the next recurrence", async () => {
    const { store, context } = createPollingContext();
    nock(CANNY_HOST)
      .post(POSTS_LIST)
      .reply(200, { posts: [newPost, stalePost], hasMore: false });
    const seedRun = await invokePollChangesTrigger(context, {
      ...baseParams,
      lookBackDate: "2026-05-01T00:00:00.000Z",
    });
    expect(seedRun.payload.body.data.created.map((p) => p.id)).toStrictEqual([
      "new-1",
    ]);
    expect(seedRun.polledNoChanges).toBe(false);
    expect(store.state.lastPolledAt).toEqual(expect.any(String));
    nock(CANNY_HOST)
      .post(POSTS_LIST)
      .reply(200, { posts: [newPost, stalePost], hasMore: false });
    const nextRun = await invokePollChangesTrigger(context, {
      ...baseParams,
      lookBackDate: "2026-05-01T00:00:00.000Z",
    });
    expect(nextRun.payload.body.data).toStrictEqual({
      created: [],
      updated: [],
    });
    expect(nextRun.polledNoChanges).toBe(true);
  });
  test("an initial sync ignores the visibility filters that a later recurrence honors", async () => {
    const { context } = createPollingContext();
    nock(CANNY_HOST)
      .post(POSTS_LIST)
      .reply(200, { posts: [newPost], hasMore: false });
    const result = await invokePollChangesTrigger(context, {
      ...baseParams,
      showNewRecords: false,
      showUpdatedRecords: false,
      lookBackDate: "2026-05-01T00:00:00.000Z",
    });
    expect(result.payload.body.data.created.map((p) => p.id)).toStrictEqual([
      "new-1",
    ]);
  });
  test("a later recurrence with Show New Records off emits nothing", async () => {
    const { context } = createPollingContext({
      lastPolledAt: "2026-06-01T00:00:00.000Z",
    });
    nock(CANNY_HOST)
      .post(POSTS_LIST)
      .reply(200, { posts: [newPost], hasMore: false });
    const result = await invokePollChangesTrigger(context, {
      ...baseParams,
      showNewRecords: false,
    });
    expect(result.payload.body.data).toStrictEqual({
      created: [],
      updated: [],
    });
    expect(result.polledNoChanges).toBe(true);
  });
  test("resolveItems flattens the emitted payload end to end", async () => {
    const { context } = createPollingContext({
      lastPolledAt: "2026-06-01T00:00:00.000Z",
    });
    const updatedPost = buildPost(
      "updated-1",
      "2026-01-01T00:00:00.000Z",
      "2026-06-02T00:00:00.000Z",
    );
    nock(CANNY_HOST)
      .post(POSTS_LIST)
      .reply(200, { posts: [newPost, updatedPost], hasMore: false });
    const result = await invokePollChangesTrigger(context, baseParams);
    const { resolveItems } = pollChangesTrigger.triggerResolver ?? {};
    if (!resolveItems) {
      throw new Error("pollChangesTrigger declares no resolveItems");
    }
    const items = resolveItems({} as never, { payload: result.payload });
    expect(items).toStrictEqual([
      { changeType: "created", record: newPost },
      { changeType: "updated", record: updatedPost },
    ]);
  });
});
