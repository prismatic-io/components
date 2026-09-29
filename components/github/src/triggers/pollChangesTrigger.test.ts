import type { TriggerPayload } from "@prismatic-io/spectral";
import {
  createConnection,
  invokeTrigger,
} from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import { oauth2 } from "../connections";
import type {
  GithubIssueRecord,
  PollingChangesObject,
  PollingState,
} from "../interfaces/PollingState";
import { resolvePollingRecordChanges } from "../utils";
import { pollChangesTrigger } from "./pollChangesTrigger";
const BASE = "https://api.github.com";
const conn = createConnection(oauth2, {}, { access_token: "test-token" });
// biome-ignore lint/suspicious/noExplicitAny: harness typing gap for polling triggers
type AnyTrigger = any;
type PollResult = {
  payload: TriggerPayload;
  polledNoChanges?: boolean;
} | null;
const invokePoll = (
  context: Record<string, unknown>,
  params: Record<string, unknown>,
) =>
  invokeTrigger(
    pollChangesTrigger as AnyTrigger,
    context as never,
    undefined,
    params as never,
  ) as Promise<{
    result: PollResult;
  }>;
afterEach(() => nock.cleanAll());
const buildPayload = (
  body: string,
  headers: Record<string, string> = {},
): TriggerPayload =>
  ({
    headers,
    queryParameters: {},
    rawBody: { data: body },
    body: { data: JSON.parse(body || "{}") },
    pathFragment: "",
    webhookUrls: {},
    webhookApiKeys: {},
    invokeUrl: "",
    executionId: "exec",
    customer: { id: "c", name: "c", externalId: "e" },
    instance: { id: "i", name: "i" },
    user: { id: "u", email: "u@e.com", name: "u" },
    integration: { id: "int", versionSequenceId: "v" },
    flow: { id: "f", name: "f" },
    startedAt: new Date().toISOString(),
  }) as unknown as TriggerPayload;
const makePollingMock = () => {
  let store: PollingState = {};
  return {
    getState: () => store,
    setState: (next: PollingState) => {
      store = next;
    },
    get current() {
      return store;
    },
  };
};
const pollParams = {
  connection: conn,
  owner: "octocat",
  repo: "Hello-World",
  lookBackDate: "",
  showNewRecords: true,
  showUpdatedRecords: true,
};
describe("pollChangesTrigger", () => {
  test("first poll seeds the cursor; second poll resumes and reports no changes", async () => {
    const polling = makePollingMock();
    vi.useFakeTimers({ toFake: ["Date"] });
    vi.setSystemTime(new Date(T0));
    const issue: GithubIssueRecord = {
      id: 1,
      number: 1,
      title: "seed",
      state: "open",
      created_at: T0,
      updated_at: T1,
    };
    nock(BASE)
      .get("/repos/octocat/Hello-World/issues")
      .query(true)
      .reply(200, [issue]);
    const first = await invokePoll({ polling }, pollParams);
    vi.useRealTimers();
    expect(polling.current.lastPolledAt).toBe(T1);
    expect(first.result?.polledNoChanges).toBe(false);
    nock(BASE)
      .get("/repos/octocat/Hello-World/issues")
      .query(true)
      .reply(200, []);
    const second = await invokePoll({ polling }, pollParams);
    expect(second.result?.polledNoChanges).toBe(true);
    const body = second.result?.payload.body.data as PollingChangesObject;
    expect(body.created).toEqual([]);
    expect(body.updated).toEqual([]);
  });
  test("partitions records into created vs updated by created_at against the cursor", async () => {
    const polling = makePollingMock();
    polling.setState({ lastPolledAt: "2024-06-01T00:00:00Z" });
    const newIssue: GithubIssueRecord = {
      id: 10,
      number: 10,
      title: "brand new",
      created_at: "2024-06-02T00:00:00Z",
      updated_at: "2024-06-02T00:00:00Z",
    };
    const oldIssue: GithubIssueRecord = {
      id: 11,
      number: 11,
      title: "pre-existing, edited",
      created_at: "2024-01-01T00:00:00Z",
      updated_at: "2024-06-03T00:00:00Z",
    };
    nock(BASE)
      .get("/repos/octocat/Hello-World/issues")
      .query(true)
      .reply(200, [newIssue, oldIssue]);
    const { result } = await invokePoll({ polling }, pollParams);
    const body = result?.payload.body.data as PollingChangesObject;
    expect(body.created?.map((r) => r.id)).toEqual([10]);
    expect(body.updated?.map((r) => r.id)).toEqual([11]);
  });
  test("gating: showUpdatedRecords=false drops the updated branch", async () => {
    const polling = makePollingMock();
    polling.setState({ lastPolledAt: "2024-06-01T00:00:00Z" });
    const oldIssue: GithubIssueRecord = {
      id: 11,
      created_at: "2024-01-01T00:00:00Z",
      updated_at: "2024-06-03T00:00:00Z",
    };
    nock(BASE)
      .get("/repos/octocat/Hello-World/issues")
      .query(true)
      .reply(200, [oldIssue]);
    const { result } = await invokePoll(
      { polling },
      { ...pollParams, showUpdatedRecords: false },
    );
    const body = result?.payload.body.data as PollingChangesObject;
    expect(body.updated).toEqual([]);
  });
  test("initial-sync look-back date seeds `since` and suppresses the visibility toggles", async () => {
    const polling = makePollingMock();
    const newIssue: GithubIssueRecord = {
      id: 20,
      created_at: "2024-06-02T00:00:00Z",
      updated_at: "2024-06-02T00:00:00Z",
    };
    const oldIssue: GithubIssueRecord = {
      id: 21,
      created_at: "2024-01-01T00:00:00Z",
      updated_at: "2024-06-03T00:00:00Z",
    };
    let capturedSince: string | undefined;
    nock(BASE)
      .get("/repos/octocat/Hello-World/issues")
      .query((q) => {
        capturedSince = q.since as string;
        return true;
      })
      .reply(200, [newIssue, oldIssue]);
    const { result } = await invokePoll(
      { polling },
      {
        ...pollParams,
        lookBackDate: "2024-05-01T00:00:00.000Z",
        showNewRecords: false,
        showUpdatedRecords: false,
      },
    );
    expect(capturedSince).toBe("2024-05-01T00:00:00Z");
    const body = result?.payload.body.data as PollingChangesObject;
    expect(body.created?.map((r) => r.id)).toEqual([20]);
    expect(body.updated?.map((r) => r.id)).toEqual([21]);
  });
});
const T0 = "2026-08-19T12:00:00Z";
const T1 = "2026-08-19T13:00:00Z";
const T2 = "2026-08-19T14:00:00Z";
const issuesUrl = "/repos/octocat/Hello-World/issues";
const captureSince = (reply: GithubIssueRecord[]) => {
  let since: string | undefined;
  nock(BASE)
    .get(issuesUrl)
    .query((q) => {
      since = q.since as string;
      return true;
    })
    .reply(200, reply);
  return () => since;
};
const batched = { batch: { enabled: true, batchSize: 50 } };
const page = (from: number): GithubIssueRecord[] =>
  Array.from({ length: 100 }, (_, i) => ({
    id: from + i,
    created_at: T1,
    updated_at: T1,
  }));
const nextLink = { link: `<${BASE}${issuesUrl}?page=2>; rel="next"` };
const seededMock = () => {
  const polling = makePollingMock();
  polling.setState({ lastPolledAt: T0 });
  return polling;
};
const countRequests = () => {
  const counter = { n: 0 };
  const interceptor = () =>
    nock(BASE)
      .get(issuesUrl)
      .query(() => {
        counter.n += 1;
        return true;
      });
  return { counter, interceptor };
};
const changesOf = (result: PollResult) =>
  result?.payload.body.data as PollingChangesObject;
describe("pollChangesTrigger cursor", () => {
  beforeEach(() => vi.useFakeTimers({ toFake: ["Date"] }));
  afterEach(() => {
    vi.useRealTimers();
    nock.cleanAll();
  });
  test("sends the current time as `since` when Look-back Date is empty", async () => {
    vi.setSystemTime(new Date("2026-08-19T12:00:00.750Z"));
    const since = captureSince([]);
    await invokePoll({ polling: makePollingMock() }, pollParams);
    expect(since()).toBe(T0);
  });
  test("floors a millisecond cursor to the second and classes a same-second record as created", async () => {
    const polling = makePollingMock();
    polling.setState({ lastPolledAt: "2026-08-19T13:00:00.500Z" });
    const boundary: GithubIssueRecord = {
      id: 5,
      created_at: T1,
      updated_at: T1,
    };
    const since = captureSince([boundary]);
    const { result } = await invokePoll(
      { polling },
      { ...pollParams, showUpdatedRecords: false },
    );
    expect(since()).toBe(T1);
    expect(changesOf(result).created?.map((r) => r.id)).toEqual([5]);
  });
  test("holds the cursor when a poll returns no records", async () => {
    const polling = seededMock();
    captureSince([]);
    vi.setSystemTime(new Date(T2));
    await invokePoll({ polling }, pollParams);
    expect(polling.current.lastPolledAt).toBe(T0);
  });
  test("advances the cursor to the newest record received, not the wall clock", async () => {
    const polling = seededMock();
    captureSince([{ id: 1, created_at: T0, updated_at: T1 }]);
    vi.setSystemTime(new Date(T2));
    await invokePoll({ polling }, pollParams);
    expect(polling.current.lastPolledAt).toBe(T1);
  });
  test("delivers a record at the cursor boundary that an earlier poll did not deliver", async () => {
    const polling = seededMock();
    const seen: GithubIssueRecord = { id: 1, created_at: T1, updated_at: T1 };
    const unseen: GithubIssueRecord = {
      id: 2,
      created_at: T1,
      updated_at: T1,
    };
    nock(BASE).get(issuesUrl).query(true).reply(200, [seen]);
    nock(BASE).get(issuesUrl).query(true).times(2).reply(200, [seen, unseen]);
    const first = await invokePoll({ polling }, pollParams);
    expect(changesOf(first.result).created).toEqual([seen]);
    expect(polling.current).toEqual({ lastPolledAt: T1, lastSeenIds: [1] });
    const second = await invokePoll({ polling }, pollParams);
    expect(changesOf(second.result).created).toEqual([unseen]);
    expect(polling.current.lastSeenIds).toEqual([1, 2]);
    const third = await invokePoll({ polling }, pollParams);
    expect(third.result?.polledNoChanges).toBe(true);
  });
  test("stops at MAX_BATCHED_RECORDS with batching on", async () => {
    const { counter, interceptor } = countRequests();
    interceptor()
      .times(7)
      .reply(200, () => page(counter.n * 1000), nextLink);
    const { result } = await invokePoll(
      { polling: seededMock(), ...batched },
      pollParams,
    );
    expect(counter.n).toBe(5);
    expect(changesOf(result).created).toHaveLength(500);
  });
  test("fetches the whole window with batching off", async () => {
    const { counter, interceptor } = countRequests();
    interceptor()
      .times(5)
      .reply(200, () => page(counter.n * 1000), nextLink);
    interceptor().reply(200, () => page(counter.n * 1000));
    const { result } = await invokePoll({ polling: seededMock() }, pollParams);
    expect(counter.n).toBe(6);
    expect(changesOf(result).created).toHaveLength(600);
  });
  test("resumes the remainder of a capped window from the 500th record's second", async () => {
    const at = (i: number) =>
      new Date(Date.parse(T0) + i * 1000).toISOString().replace(".000Z", "Z");
    const record = (i: number): GithubIssueRecord => ({
      id: i,
      created_at: at(i),
      updated_at: at(i),
    });
    const distinctPage = (from: number) =>
      Array.from({ length: 100 }, (_, i) => record(from + i));
    const polling = seededMock();
    const { counter, interceptor } = countRequests();
    interceptor()
      .times(6)
      .reply(200, () => distinctPage((counter.n - 1) * 100 + 1), nextLink);
    const first = await invokePoll({ polling, ...batched }, pollParams);
    expect(changesOf(first.result).created).toHaveLength(500);
    expect(polling.current.lastPolledAt).toBe(at(500));
    expect(polling.current.lastSeenIds).toEqual([500]);
    nock.cleanAll();
    nock(BASE)
      .get(issuesUrl)
      .query(true)
      .reply(200, [
        record(500),
        ...Array.from({ length: 100 }, (_, i) => record(501 + i)),
      ]);
    const second = await invokePoll({ polling, ...batched }, pollParams);
    expect(changesOf(second.result).created?.map((r) => r.id)).toEqual(
      Array.from({ length: 100 }, (_, i) => 501 + i),
    );
    expect(polling.current.lastPolledAt).toBe(at(600));
  });
  test("fetches a same-second group whole when it fills the cap, instead of stalling on it", async () => {
    const polling = seededMock();
    const sameSecondPages = () => {
      const counter = { n: 0 };
      nock(BASE)
        .persist()
        .get(issuesUrl)
        .query(() => {
          counter.n += 1;
          return true;
        })
        .reply((uri) => {
          const pg = Number(new URLSearchParams(uri.split("?")[1]).get("page"));
          return [
            200,
            page(pg * 1000),
            pg < 7
              ? { link: `<${BASE}${issuesUrl}?page=${pg + 1}>; rel="next"` }
              : {},
          ];
        });
      return counter;
    };
    let counter = sameSecondPages();
    const first = await invokePoll({ polling, ...batched }, pollParams);
    expect(changesOf(first.result).created).toHaveLength(500);
    expect(counter.n).toBe(5);
    expect(polling.current.lastPolledAt).toBe(T1);
    nock.cleanAll();
    counter = sameSecondPages();
    const second = await invokePoll({ polling, ...batched }, pollParams);
    expect(changesOf(second.result).created).toHaveLength(200);
    expect(counter.n).toBe(12);
    expect(polling.current.lastSeenIds).toHaveLength(700);
    nock.cleanAll();
    sameSecondPages();
    const third = await invokePoll({ polling, ...batched }, pollParams);
    expect(third.result?.polledNoChanges).toBe(true);
  });
  test("a truncated batched initial sync keeps seed semantics until it drains", async () => {
    const polling = makePollingMock();
    const seedParams = {
      ...pollParams,
      lookBackDate: "2026-08-01T00:00:00.000Z",
      showNewRecords: false,
    };
    const { counter, interceptor } = countRequests();
    interceptor()
      .times(5)
      .reply(200, () => page(counter.n * 1000), nextLink);
    const first = await invokePoll({ polling, ...batched }, seedParams);
    expect(changesOf(first.result).created).toHaveLength(500);
    expect(polling.current.backfillActive).toBe(true);
    nock.cleanAll();
    const remainder: GithubIssueRecord = {
      id: 7,
      created_at: T2,
      updated_at: T2,
    };
    nock(BASE).get(issuesUrl).query(true).reply(200, [remainder]);
    const second = await invokePoll({ polling, ...batched }, seedParams);
    expect(changesOf(second.result).created).toEqual([remainder]);
    expect(polling.current.backfillActive).toBeUndefined();
    nock.cleanAll();
    const steady: GithubIssueRecord = {
      id: 8,
      created_at: "2026-08-19T15:00:00Z",
      updated_at: "2026-08-19T15:00:00Z",
    };
    nock(BASE).get(issuesUrl).query(true).reply(200, [steady]);
    const third = await invokePoll({ polling, ...batched }, seedParams);
    expect(changesOf(third.result).created).toEqual([]);
  });
});
describe("pollChangesTrigger batching declaration", () => {
  test("New and Updated Records is opt-in batchable with a default batch size", () => {
    expect(pollChangesTrigger.triggerResolverSupport).toBe("valid");
    expect(pollChangesTrigger.batchConfig).toEqual({ batchSize: 50 });
    expect(pollChangesTrigger.triggerResolver?.resolveItems).toBeInstanceOf(
      Function,
    );
  });
});
describe("resolvePollingRecordChanges (triggerResolver.resolveItems)", () => {
  test("flattens { created, updated } into a tagged [{ changeType, record }] stream", () => {
    const data: PollingChangesObject = {
      created: [{ id: 1 }],
      updated: [{ id: 2 }, { id: 3 }],
    };
    expect(resolvePollingRecordChanges(data)).toEqual([
      { changeType: "created", record: { id: 1 } },
      { changeType: "updated", record: { id: 2 } },
      { changeType: "updated", record: { id: 3 } },
    ]);
  });
  test("guards missing arrays with ?? [] -> empty result", () => {
    expect(resolvePollingRecordChanges({})).toEqual([]);
    expect(resolvePollingRecordChanges({ created: [{ id: 1 }] })).toEqual([
      { changeType: "created", record: { id: 1 } },
    ]);
  });
  test("guards an undefined envelope with data ?? {} -> empty result", () => {
    expect(resolvePollingRecordChanges(undefined)).toEqual([]);
  });
  test("resolveItems flattens the payload shape perform actually returns", () => {
    const created: GithubIssueRecord = {
      id: 142,
      created_at: "2026-05-26T14:30:00Z",
      updated_at: "2026-05-26T14:30:00Z",
    };
    const updated: GithubIssueRecord = {
      id: 87,
      created_at: "2026-04-12T09:00:00Z",
      updated_at: "2026-05-26T15:45:00Z",
    };
    const payload = buildPayload(
      JSON.stringify({ created: [created], updated: [updated] }),
    );
    expect(
      pollChangesTrigger.triggerResolver?.resolveItems?.({} as never, {
        payload,
      }),
    ).toEqual([
      { changeType: "created", record: created },
      { changeType: "updated", record: updated },
    ]);
  });
});
