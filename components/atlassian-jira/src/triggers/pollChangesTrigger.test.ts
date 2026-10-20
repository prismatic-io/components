import { type Mock, beforeEach, describe, expect, test, vi } from "vitest";
import type { JiraIssue, PollingState } from "../types";
import { lookBackDateClean, resolveJiraIssueChanges, toJqlDate } from "../util";
import { pollChangesTrigger } from "./pollChangesTrigger";
const { createV3Client } = vi.hoisted(() => ({ createV3Client: vi.fn() }));
vi.mock("../connections/auth", () => ({
  createV3Client: (...args: unknown[]) => createV3Client(...args),
}));
type Spy = Mock<
  (
    url: string,
    options?: {
      params: Record<string, string>;
    },
  ) => Promise<unknown>
>;
const issue = (id: string, created: string): JiraIssue =>
  ({
    id,
    key: `PROJ-${id}`,
    self: `https://x/${id}`,
    fields: { created },
  }) as unknown as JiraIssue;
const createdIssue = issue("1", "2026-06-02T12:00:00.000+0000");
const updatedIssue = issue("2", "2020-01-01T00:00:00.000+0000");
describe("pollChangesTrigger batching declaration", () => {
  test("declares opt-in batching with a default batch size and a pagination cursor", () => {
    expect(pollChangesTrigger.triggerResolverSupport).toBe("valid");
    expect(pollChangesTrigger.batchConfig).toEqual({ batchSize: 50 });
    expect(pollChangesTrigger.triggerResolver?.resolveItems).toBeInstanceOf(
      Function,
    );
    expect(
      pollChangesTrigger.triggerResolver?.getNextPaginationState,
    ).toBeInstanceOf(Function);
  });
  test("offers the Look-back Date directly below the connection", () => {
    expect(Object.keys(pollChangesTrigger.inputs ?? {})).toEqual([
      "jiraConnection",
      "lookBackDate",
      "pollJqlFilter",
      "showNewIssues",
      "showUpdatedIssues",
    ]);
  });
  test("getNextPaginationState echoes the round's cursor, or null when there is none", () => {
    const next = pollChangesTrigger.triggerResolver?.getNextPaginationState;
    const cursor = {
      nextPageToken: "t",
      streamStartedAt: "2026-06-02T00:00:00.000Z",
    };
    expect(
      next?.({} as never, { payload: { paginationState: cursor } } as never),
    ).toEqual(cursor);
    expect(next?.({} as never, { payload: {} } as never)).toBeNull();
  });
});
describe("resolveJiraIssueChanges", () => {
  test("tags every issue with how it changed", () => {
    expect(
      resolveJiraIssueChanges({
        created: [createdIssue],
        updated: [updatedIssue],
      }),
    ).toEqual([
      { changeType: "created", record: createdIssue },
      { changeType: "updated", record: updatedIssue },
    ]);
  });
  test("tolerates an absent envelope, an empty one, and a single absent array", () => {
    expect(resolveJiraIssueChanges(undefined)).toEqual([]);
    expect(resolveJiraIssueChanges({ created: [], updated: [] })).toEqual([]);
    expect(
      resolveJiraIssueChanges({ created: [createdIssue] } as never),
    ).toEqual([{ changeType: "created", record: createdIssue }]);
    expect(
      resolveJiraIssueChanges({ updated: [updatedIssue] } as never),
    ).toEqual([{ changeType: "updated", record: updatedIssue }]);
  });
});
describe("triggerResolver.resolveItems", () => {
  test("flattens a realistic trigger payload into tagged items", () => {
    const items = pollChangesTrigger.triggerResolver?.resolveItems?.(
      {} as never,
      {
        payload: {
          body: { data: { created: [createdIssue], updated: [updatedIssue] } },
        },
      } as never,
    );
    expect(items).toEqual([
      { changeType: "created", record: createdIssue },
      { changeType: "updated", record: updatedIssue },
    ]);
  });
});
describe("lookBackDateClean", () => {
  test("returns an empty string for an empty value", () => {
    expect(lookBackDateClean(undefined)).toBe("");
    expect(lookBackDateClean("  ")).toBe("");
  });
  test("normalizes a valid past date to an ISO instant", () => {
    expect(lookBackDateClean("2026-01-01")).toBe("2026-01-01T00:00:00.000Z");
  });
  test("rejects a wrong format, a non-calendar date, and a future date", () => {
    expect(() => lookBackDateClean("01/01/2026")).toThrow(
      "Look-back Date must be",
    );
    expect(() => lookBackDateClean("2026-02-31")).toThrow(
      "Look-back Date must be",
    );
    expect(() => lookBackDateClean("2999-01-01")).toThrow(
      "cannot be a future date",
    );
  });
});
describe("polling state across a multi-round drain", () => {
  type PerformContext = Parameters<typeof pollChangesTrigger.perform>[0];
  type PerformPayload = Parameters<typeof pollChangesTrigger.perform>[1];
  let store: PollingState;
  let get: Spy;
  let myself: Spy;
  let warn: Spy;
  const page = (issues: JiraIssue[], nextPageToken?: string) => ({
    data: { issues, nextPageToken },
  });
  const context = (batching = false) =>
    ({
      polling: {
        getState: () => store,
        setState: (next: PollingState) => {
          store = next;
        },
      },
      batch: { enabled: batching },
      debug: { enabled: false },
      logger: { debug: vi.fn(), warn },
    }) as unknown as PerformContext;
  const params = {
    jiraConnection: { key: "oauth2", fields: {} } as never,
    lookBackDate: "",
    pollJqlFilter: undefined as string | undefined,
    showNewIssues: true,
    showUpdatedIssues: true,
  };
  const run = (batching: boolean, paginationState?: unknown, over = {}) =>
    pollChangesTrigger.perform(
      context(batching),
      { paginationState } as unknown as PerformPayload,
      { ...params, ...over } as never,
    );
  const at = (iso: string) => vi.setSystemTime(new Date(iso));
  beforeEach(() => {
    store = {};
    get = vi.fn();
    warn = vi.fn();
    myself = vi.fn().mockResolvedValue({ data: { timeZone: "UTC" } });
    createV3Client.mockResolvedValue({
      get: (
        url: string,
        options?: {
          params: Record<string, string>;
        },
      ) => (url === "/myself" ? myself(url, options) : get(url, options)),
    });
  });
  describe("stream start boundary", () => {
    test("commits the first round's time after a three-round drain", async () => {
      vi.useFakeTimers({ toFake: ["Date"] });
      try {
        store = { lastPolledAt: "2026-06-01T00:00:00.000Z" };
        get.mockResolvedValue(page([updatedIssue], "n1"));
        at("2026-06-02T00:00:00.000Z");
        const r1 = await run(true);
        expect(store.lastPolledAt).toBe("2026-06-01T00:00:00.000Z");
        get.mockResolvedValue(page([updatedIssue], "n2"));
        at("2026-06-02T01:00:00.000Z");
        const r2 = await run(true, r1.payload.paginationState);
        expect(store.lastPolledAt).toBe("2026-06-01T00:00:00.000Z");
        get.mockResolvedValue(page([updatedIssue]));
        at("2026-06-02T05:00:00.000Z");
        const r3 = await run(true, r2.payload.paginationState);
        expect(store.lastPolledAt).toBe("2026-06-02T00:00:00.000Z");
        expect(store.nextPageToken).toBeUndefined();
        expect(r3.payload.paginationState).toBeUndefined();
      } finally {
        vi.useRealTimers();
      }
    });
    test("holds the stream start across scheduled recurrences with batching off", async () => {
      vi.useFakeTimers({ toFake: ["Date"] });
      try {
        store = { lastPolledAt: "2026-06-01T00:00:00.000Z" };
        at("2026-06-02T00:00:00.000Z");
        get.mockResolvedValue(page([updatedIssue], "n1"));
        await run(false);
        expect(get).toHaveBeenCalledTimes(10);
        expect(store.nextPageToken).toBe("n1");
        expect(store.lastPolledAt).toBe("2026-06-01T00:00:00.000Z");
        get.mockReset();
        get.mockResolvedValue(page([updatedIssue]));
        at("2026-06-02T06:00:00.000Z");
        await run(false);
        expect(get.mock.calls[0][1].params.nextPageToken).toBe("n1");
        expect(store.lastPolledAt).toBe("2026-06-02T00:00:00.000Z");
      } finally {
        vi.useRealTimers();
      }
    });
    test("a single-round drain commits that round's time and leaves no stream state", async () => {
      vi.useFakeTimers({ toFake: ["Date"] });
      try {
        store = { lastPolledAt: "2026-06-01T00:00:00.000Z" };
        get.mockResolvedValue(page([updatedIssue]));
        at("2026-06-02T03:00:00.000Z");
        await run(false);
        expect(store).toEqual({ lastPolledAt: "2026-06-02T03:00:00.000Z" });
      } finally {
        vi.useRealTimers();
      }
    });
    test("hitting the page budget never advances the cursor past undelivered pages", async () => {
      store = { lastPolledAt: "2026-06-01T00:00:00.000Z" };
      get.mockResolvedValue(page([updatedIssue], "more"));
      const result = await run(false);
      expect(store.lastPolledAt).toBe("2026-06-01T00:00:00.000Z");
      expect(result.payload.paginationState).toEqual({
        nextPageToken: "more",
        streamStartedAt: expect.any(String),
        timeZone: "UTC",
      });
    });
  });
  test("restarts from the held boundary when the Additional JQL Filter changed mid-drain", async () => {
    store = {
      nextPageToken: "old-query-token",
      jqlFilter: "project = OLD",
      streamStartedAt: "2026-06-01T12:00:00.000Z",
      lastPolledAt: "2026-05-01T00:00:00.000Z",
    };
    get.mockResolvedValue(page([updatedIssue]));
    await run(false, undefined, { pollJqlFilter: "project = NEW" });
    const sent = get.mock.calls[0][1].params;
    expect(sent.nextPageToken).toBeUndefined();
    expect(sent.jql).toContain("project = NEW");
    expect(sent.jql).toContain("2026/05/01 00:00");
  });
  test("restarts with a fresh stream start, not the stale one, when the filter changed", async () => {
    vi.useFakeTimers({ toFake: ["Date"] });
    try {
      at("2026-06-03T00:00:00.000Z");
      store = {
        nextPageToken: "old",
        jqlFilter: "project = OLD",
        streamStartedAt: "2026-06-01T12:00:00.000Z",
        lastPolledAt: "2026-05-01T00:00:00.000Z",
      };
      get.mockResolvedValue(page([updatedIssue]));
      await run(false, undefined, { pollJqlFilter: "project = NEW" });
      expect(store.lastPolledAt).toBe("2026-06-03T00:00:00.000Z");
    } finally {
      vi.useRealTimers();
    }
  });
  test("resumes from the round's own cursor, not a stale stored one", async () => {
    store = {
      nextPageToken: "stale",
      lastPolledAt: "2026-06-01T00:00:00.000Z",
    };
    get.mockResolvedValue(page([updatedIssue]));
    await run(true, {
      nextPageToken: "fresh",
      streamStartedAt: "2026-06-02T00:00:00.000Z",
    });
    expect(get.mock.calls[0][1].params.nextPageToken).toBe("fresh");
  });
  test("reads one page per round once flow batching is enabled", async () => {
    store = { lastPolledAt: "2026-06-01T00:00:00.000Z" };
    get.mockResolvedValue(page([updatedIssue], "next"));
    await run(true);
    expect(get).toHaveBeenCalledTimes(1);
    expect(get.mock.calls[0][1].params.maxResults).toBe(100);
  });
  test("holds the classification boundary at the Look-back seed while pages remain", async () => {
    get.mockResolvedValue(page([updatedIssue], "n1"));
    await run(true, undefined, { lookBackDate: "2026-06-01T00:00:00.000Z" });
    expect(store.lastPolledAt).toBe("2026-06-01T00:00:00.000Z");
    expect(store.backfillActive).toBe(true);
    expect(store.nextPageToken).toBe("n1");
  });
  test("a backfill ignores the visibility toggles, and drops its flag once drained", async () => {
    get.mockResolvedValue(page([createdIssue, updatedIssue]));
    const result = await run(false, undefined, {
      lookBackDate: "2026-05-01T00:00:00.000Z",
      showNewIssues: false,
      showUpdatedIssues: false,
    });
    expect(result.payload.body.data).toEqual({
      created: [createdIssue],
      updated: [updatedIssue],
    });
    expect(store.backfillActive).toBeUndefined();
  });
  describe("a non-backfill poll against a stored boundary", () => {
    beforeEach(() => {
      store = { lastPolledAt: "2026-06-01T00:00:00.000Z" };
      get.mockResolvedValue(page([createdIssue, updatedIssue]));
    });
    test("partitions around the boundary", async () => {
      const result = await run(false);
      expect(result.payload.body.data).toEqual({
        created: [createdIssue],
        updated: [updatedIssue],
      });
      expect(get.mock.calls[0][1].params.jql).toBe(
        'updated >= "2026/06/01 00:00"',
      );
    });
    test("hides new issues when only Show New Issues is off", async () => {
      const result = await run(false, undefined, { showNewIssues: false });
      expect(result.payload.body.data).toEqual({
        created: [],
        updated: [updatedIssue],
      });
    });
    test("never calls Jira when both toggles are off", async () => {
      const result = await run(false, undefined, {
        showNewIssues: false,
        showUpdatedIssues: false,
      });
      expect(get).not.toHaveBeenCalled();
      expect(result.polledNoChanges).toBe(true);
    });
  });
  test("never reports no changes on a round the platform drove", async () => {
    get.mockResolvedValue(page([]));
    const driven = await run(true, {
      nextPageToken: "t",
      streamStartedAt: "2026-06-02T00:00:00.000Z",
    });
    expect(driven.polledNoChanges).toBe(false);
    expect((await run(false)).polledNoChanges).toBe(true);
  });
});
describe("toJqlDate", () => {
  test("formats the instant in the given IANA zone, floored to the minute", () => {
    expect(toJqlDate("2026-01-15T15:30:45Z", "America/Chicago")).toBe(
      "2026/01/15 09:30",
    );
    expect(toJqlDate("2026-01-15T15:30:45Z", "UTC")).toBe("2026/01/15 15:30");
    expect(toJqlDate("2026-01-15T15:30:45Z", "Asia/Kolkata")).toBe(
      "2026/01/15 21:00",
    );
  });
  test("honors daylight saving time", () => {
    expect(toJqlDate("2026-07-15T15:30:00Z", "America/Chicago")).toBe(
      "2026/07/15 10:30",
    );
  });
  test("renders midnight as 00, not 24", () => {
    expect(toJqlDate("2026-01-15T06:00:00Z", "America/Chicago")).toBe(
      "2026/01/15 00:00",
    );
  });
});
describe("account time zone in the JQL literal", () => {
  type PerformContext = Parameters<typeof pollChangesTrigger.perform>[0];
  type PerformPayload = Parameters<typeof pollChangesTrigger.perform>[1];
  let store: PollingState;
  let get: Spy;
  let myself: Spy;
  let warn: Spy;
  const run = (paginationState?: unknown, over = {}) =>
    pollChangesTrigger.perform(
      {
        polling: {
          getState: () => store,
          setState: (next: PollingState) => {
            store = next;
          },
        },
        batch: { enabled: true },
        debug: { enabled: false },
        logger: { debug: vi.fn(), warn },
      } as unknown as PerformContext,
      { paginationState } as unknown as PerformPayload,
      {
        jiraConnection: { key: "oauth2", fields: {} } as never,
        lookBackDate: "",
        pollJqlFilter: undefined,
        showNewIssues: true,
        showUpdatedIssues: true,
        ...over,
      } as never,
    );
  beforeEach(() => {
    store = { lastPolledAt: "2026-01-15T15:30:45.000Z" };
    get = vi
      .fn()
      .mockResolvedValue({ data: { issues: [], nextPageToken: undefined } });
    warn = vi.fn();
    myself = vi
      .fn()
      .mockResolvedValue({ data: { timeZone: "America/Chicago" } });
    createV3Client.mockResolvedValue({
      get: (
        url: string,
        options?: {
          params: Record<string, string>;
        },
      ) => (url === "/myself" ? myself(url, options) : get(url, options)),
    });
  });
  test("a stream-starting round reads /myself once and searches in the account zone", async () => {
    await run();
    expect(myself).toHaveBeenCalledTimes(1);
    expect(get.mock.calls[0][1].params.jql).toBe(
      'updated >= "2026/01/15 09:30"',
    );
    expect(warn).not.toHaveBeenCalled();
  });
  test("persists the zone in the cursor and state while pages remain, then clears it", async () => {
    get.mockResolvedValue({ data: { issues: [], nextPageToken: "n1" } });
    const r1 = await run();
    expect(r1.payload.paginationState).toMatchObject({
      nextPageToken: "n1",
      timeZone: "America/Chicago",
    });
    expect(store.timeZone).toBe("America/Chicago");
    get.mockResolvedValue({ data: { issues: [], nextPageToken: undefined } });
    await run(r1.payload.paginationState);
    expect(store.timeZone).toBeUndefined();
  });
  test("a resumed round reuses the cursor's zone and never calls /myself", async () => {
    await run({
      nextPageToken: "t",
      streamStartedAt: "2026-01-15T16:00:00.000Z",
      timeZone: "Asia/Kolkata",
    });
    expect(myself).not.toHaveBeenCalled();
    expect(get.mock.calls[0][1].params.jql).toBe(
      'updated >= "2026/01/15 21:00"',
    );
  });
  test("a resumed round from stored state reuses the stored zone", async () => {
    store = {
      lastPolledAt: "2026-01-15T15:30:45.000Z",
      nextPageToken: "t",
      streamStartedAt: "2026-01-15T16:00:00.000Z",
      timeZone: "Asia/Kolkata",
    };
    await run();
    expect(myself).not.toHaveBeenCalled();
    expect(get.mock.calls[0][1].params.jql).toBe(
      'updated >= "2026/01/15 21:00"',
    );
  });
  test("a held token without a zone (older state) keeps the UTC literal it was issued for", async () => {
    await run({
      nextPageToken: "t",
      streamStartedAt: "2026-01-15T16:00:00.000Z",
    });
    expect(myself).not.toHaveBeenCalled();
    expect(get.mock.calls[0][1].params.jql).toBe(
      'updated >= "2026/01/15 15:30"',
    );
  });
  test.each([
    ["missing", {}],
    ["blank", { timeZone: "  " }],
    ["invalid", { timeZone: "Not/AZone" }],
  ])("a %s timeZone falls back to UTC with one warning", async (_name, data) => {
    myself.mockResolvedValue({ data });
    await run();
    expect(get.mock.calls[0][1].params.jql).toBe(
      'updated >= "2026/01/15 15:30"',
    );
    expect(warn).toHaveBeenCalledTimes(1);
    expect(warn.mock.calls[0][0]).toContain("UTC");
  });
  test("a failing /myself request propagates instead of being masked", async () => {
    myself.mockRejectedValue(new Error("401"));
    await expect(run()).rejects.toThrow("401");
    expect(get).not.toHaveBeenCalled();
  });
  test("a skipFetch round never calls /myself", async () => {
    await run(undefined, { showNewIssues: false, showUpdatedIssues: false });
    expect(myself).not.toHaveBeenCalled();
    expect(get).not.toHaveBeenCalled();
  });
});
