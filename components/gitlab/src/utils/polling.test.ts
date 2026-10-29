import type { GitlabRecord } from "../types";
import {
  fetchRecordsSince,
  planPoll,
  resolvePollingRecordChanges,
  resolvePollWindow,
} from "./polling";

const T0 = new Date("2026-09-01T00:00:00.000Z");
const at = (id: number, seconds: number, isNew = false): GitlabRecord => {
  const updated = new Date(T0.getTime() + seconds * 1000).toISOString();
  return {
    id,
    created_at: isNew ? updated : "2025-01-01T00:00:00.000Z",
    updated_at: updated,
  };
};

test("resolvePollWindow prefers the stored cursor, then the look-back date", () => {
  const now = new Date("2026-09-28T00:00:00.000Z");
  expect(
    resolvePollWindow({ lastPolledAt: T0.toISOString() }, "2026-01-01", now),
  ).toEqual({
    sinceDate: T0,
    isBackfill: false,
  });
  expect(resolvePollWindow(undefined, "2026-01-01", now)).toEqual({
    sinceDate: new Date("2026-01-01"),
    isBackfill: true,
  });
  expect(resolvePollWindow(undefined, "", now)).toEqual({
    sinceDate: now,
    isBackfill: false,
  });
});

test("unbounded plan delivers everything and advances the cursor to the newest updated_at", () => {
  const plan = planPoll(
    [at(2, 20), at(1, 10, true)],
    T0,
    undefined,
    Number.POSITIVE_INFINITY,
  );
  expect(plan.created.map((r) => r.id)).toEqual([1]);
  expect(plan.updated.map((r) => r.id)).toEqual([2]);
  expect(plan.nextState.lastPolledAt).toBe(
    new Date(T0.getTime() + 20000).toISOString(),
  );
  expect(plan.complete).toBe(true);
});

test("clamped plan never splits a timestamp group and resumes without loss or duplicates", () => {
  const records = [at(1, 10), at(2, 20), at(3, 20), at(4, 30)];
  const first = planPoll(records, T0, undefined, 2);
  expect([...first.created, ...first.updated].map((r) => r.id)).toEqual([1]);
  expect(first.complete).toBe(false);
  const since = new Date(first.nextState.lastPolledAt as string);
  const second = planPoll(
    records.filter((r) => new Date(r.updated_at as string) >= since),
    since,
    first.nextState.lastSeenIds,
    2,
  );
  expect([...second.created, ...second.updated].map((r) => r.id)).toEqual([
    2, 3,
  ]);
});

test("records at the cursor already delivered are not delivered again (inclusive updated_after)", () => {
  const first = planPoll([at(1, 10)], T0, undefined, Number.POSITIVE_INFINITY);
  const since = new Date(first.nextState.lastPolledAt as string);
  const second = planPoll(
    [at(1, 10), at(5, 10)],
    since,
    first.nextState.lastSeenIds,
    Number.POSITIVE_INFINITY,
  );
  expect([...second.created, ...second.updated].map((r) => r.id)).toEqual([5]);
});

describe("byte bound", () => {
  const padded = (record: GitlabRecord, bytes: number): GitlabRecord => ({
    ...record,
    description: "x".repeat(bytes),
  });
  const delivered = (plan: ReturnType<typeof planPoll>) =>
    [...plan.created, ...plan.updated].map((r) => r.id);

  test("stops before the serialized records exceed maxBytes and resumes from what was delivered", () => {
    const records = [1, 2, 3].map((id) => padded(at(id, id * 10), 1000));
    const first = planPoll(records, T0, undefined, 500, 2500);
    expect(delivered(first)).toEqual([1, 2]);
    expect(first.complete).toBe(false);
    expect(first.nextState.lastPolledAt).toBe(records[1].updated_at);
    expect(first.nextState.lastSeenIds).toEqual(["2"]);
    const since = new Date(first.nextState.lastPolledAt as string);
    const second = planPoll(
      records,
      since,
      first.nextState.lastSeenIds,
      500,
      2500,
    );
    expect(delivered(second)).toEqual([3]);
    expect(second.complete).toBe(true);
  });

  test("never splits a timestamp group at the byte cut", () => {
    const records = [
      padded(at(1, 10), 1000),
      padded(at(2, 20), 1000),
      padded(at(3, 20), 1000),
    ];
    const first = planPoll(records, T0, undefined, 500, 2500);
    expect(delivered(first)).toEqual([1]);
    const since = new Date(first.nextState.lastPolledAt as string);
    const second = planPoll(
      records,
      since,
      first.nextState.lastSeenIds,
      500,
      2500,
    );
    expect(delivered(second)).toEqual([2, 3]);
  });

  test("delivers a single record over maxBytes alone", () => {
    const records = [padded(at(1, 10), 5000), padded(at(2, 20), 10)];
    const first = planPoll(records, T0, undefined, 500, 2500);
    expect(delivered(first)).toEqual([1]);
    expect(first.complete).toBe(false);
    expect(first.nextState.lastPolledAt).toBe(records[0].updated_at);
  });
});

test("resolvePollingRecordChanges flattens with change types", () => {
  expect(
    resolvePollingRecordChanges({
      created: [at(1, 1)],
      updated: [at(2, 2)],
    }).map((c) => [c.changeType, c.record.id]),
  ).toEqual([
    ["created", 1],
    ["updated", 2],
  ]);
});

test("resolvePollingRecordChanges returns [] for empty or undefined changes", () => {
  expect(resolvePollingRecordChanges({})).toEqual([]);
  expect(resolvePollingRecordChanges(undefined)).toEqual([]);
});

test("resolvePollingRecordChanges tolerates an absent array", () => {
  const created: GitlabRecord = at(1, 1, true);
  const updated: GitlabRecord = at(2, 2);
  expect(resolvePollingRecordChanges({ created: [created] })).toEqual([
    { changeType: "created", record: created },
  ]);
  expect(resolvePollingRecordChanges({ updated: [updated] })).toEqual([
    { changeType: "updated", record: updated },
  ]);
});

const fakeServer = (
  initial: GitlabRecord[],
  afterRequest?: (count: number) => void,
) => {
  let records = [...initial];
  const requests: Record<string, unknown>[] = [];
  const client = {
    get: vi.fn(
      async (
        _path: string,
        { params }: { params: Record<string, unknown> },
      ) => {
        requests.push(params);
        const since = new Date(String(params.updated_after)).getTime();
        const perPage = Number(params.per_page);
        const page = Number(params.page);
        const data = records
          .filter((r) => new Date(r.updated_at as string).getTime() >= since)
          .sort(
            (a, b) =>
              new Date(a.updated_at as string).getTime() -
                new Date(b.updated_at as string).getTime() || a.id - b.id,
          )
          .slice((page - 1) * perPage, page * perPage);
        afterRequest?.(requests.length);
        return { data, headers: {} };
      },
    ),
  };
  const edit = (record: GitlabRecord) => {
    records = [...records.filter((r) => r.id !== record.id), record];
  };
  return { client: client as never, requests, edit };
};

describe("bounded fetch", () => {
  const fetchIds = async (
    server: ReturnType<typeof fakeServer>,
    seenIds: string[],
    maxRecords: number,
    pageSize: number,
  ) =>
    (
      await fetchRecordsSince(
        server.client,
        "1",
        "issues",
        T0,
        seenIds,
        maxRecords,
        pageSize,
      )
    ).map((r) => r.id);

  test("records already delivered at the cursor do not count toward the bound", async () => {
    const server = fakeServer([at(1, 0), at(2, 10), at(3, 20), at(4, 30)]);
    expect(await fetchIds(server, ["1"], 1, 2)).toEqual([1, 2, 3]);
    expect(server.requests).toHaveLength(2);
  });

  test("stops paging once maxRecords is reached and a newer record arrives", async () => {
    const server = fakeServer([at(1, 10), at(2, 20), at(3, 30), at(4, 40)]);
    expect(await fetchIds(server, [], 2, 3)).toEqual([1, 2, 3]);
    expect(server.requests).toHaveLength(1);
  });

  test("keeps paging through the tie group at the bound, then defers it whole", async () => {
    const server = fakeServer([
      at(1, 10),
      at(2, 20),
      at(3, 20),
      at(4, 20),
      at(5, 30),
      at(6, 40),
    ]);
    const records = await fetchRecordsSince(
      server.client,
      "1",
      "issues",
      T0,
      [],
      2,
      2,
    );
    expect(records.map((r) => r.id)).toEqual([1, 2, 3, 4, 5]);
    const plan = planPoll(records, T0, [], 2);
    expect([...plan.created, ...plan.updated].map((r) => r.id)).toEqual([1]);
    expect(plan.complete).toBe(false);
    expect(plan.nextState.lastPolledAt).toBe(
      new Date(T0.getTime() + 10000).toISOString(),
    );
  });

  test("an unbounded poll walks every page", async () => {
    const server = fakeServer([at(1, 10), at(2, 20), at(3, 30)]);
    expect(await fetchIds(server, [], Number.POSITIVE_INFINITY, 2)).toEqual([
      1, 2, 3,
    ]);
  });

  test("pages by timestamp: each request's updated_after is the newest updated_at fetched", async () => {
    const server = fakeServer([at(1, 10), at(2, 20), at(3, 30)]);
    await fetchIds(server, [], Number.POSITIVE_INFINITY, 2);
    expect(server.requests.map((p) => [p.updated_after, p.page])).toEqual([
      [T0.toISOString(), 1],
      [new Date(T0.getTime() + 20000).toISOString(), 1],
      [new Date(T0.getTime() + 30000).toISOString(), 1],
    ]);
    expect(server.requests[0]).toMatchObject({
      order_by: "updated_at",
      sort: "asc",
      per_page: 2,
    });
  });

  test("a record edited between pages does not make the walk skip another", async () => {
    const server = fakeServer(
      [at(1, 10), at(2, 20), at(3, 30), at(4, 40), at(5, 50), at(6, 60)],
      (count) => {
        if (count === 1) {
          server.edit(at(2, 100));
        }
      },
    );
    const records = await fetchRecordsSince(
      server.client,
      "1",
      "issues",
      T0,
      [],
      Number.POSITIVE_INFINITY,
      3,
    );
    expect(records.map((r) => r.id).sort()).toEqual([1, 2, 3, 4, 5, 6]);
    expect(records.find((r) => r.id === 2)?.updated_at).toBe(
      at(2, 100).updated_at,
    );
  });

  test("walks a timestamp shared by more records than a page by offset, then moves on", async () => {
    const server = fakeServer([
      at(1, 20),
      at(2, 20),
      at(3, 20),
      at(4, 20),
      at(5, 20),
      at(6, 30),
    ]);
    expect(await fetchIds(server, [], Number.POSITIVE_INFINITY, 2)).toEqual([
      1, 2, 3, 4, 5, 6,
    ]);
    expect(server.requests.map((p) => p.page)).toEqual([1, 1, 2, 3, 1]);
  });

  test("stops when an offset page within one timestamp adds nothing new", async () => {
    const stuck = {
      get: vi.fn(async () => ({ data: [at(1, 20), at(2, 20)], headers: {} })),
    };
    const records = await fetchRecordsSince(
      stuck as never,
      "1",
      "issues",
      T0,
      [],
      Number.POSITIVE_INFINITY,
      2,
    );
    expect(records.map((r) => r.id)).toEqual([1, 2]);
    expect(stuck.get).toHaveBeenCalledTimes(3);
  });
});

test("one timestamp larger than the bound is split across runs with the cursor held and no duplicates", () => {
  const records = [1, 2, 3, 4, 5].map((id) => at(id, 10));
  let since = T0;
  let seenIds: string[] | undefined = [];
  const runs: number[][] = [];
  const cursors: string[] = [];
  for (let run = 0; run < 3; run += 1) {
    const plan = planPoll(
      records.filter((r) => new Date(r.updated_at as string) >= since),
      since,
      seenIds,
      2,
    );
    runs.push(
      [...plan.created, ...plan.updated].map((r) => Number(r.id)).sort(),
    );
    cursors.push(plan.nextState.lastPolledAt as string);
    since = new Date(plan.nextState.lastPolledAt as string);
    seenIds = plan.nextState.lastSeenIds;
  }
  expect(runs).toEqual([[1, 2], [3, 4], [5]]);
  expect(new Set(cursors).size).toBe(1);
  expect([...(seenIds ?? [])].sort()).toEqual(["1", "2", "3", "4", "5"]);
});
