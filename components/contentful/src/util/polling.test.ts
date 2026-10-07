import type {
  EntryProps,
  Environment,
  KeyValueMap,
} from "contentful-management";
import {
  computeNextCursor,
  fetchEntriesSince,
  partitionEntryChanges,
  resolvePollingWindowStart,
} from "./polling";
const entry = (
  id: string,
  createdAt: string,
  updatedAt: string,
): EntryProps<KeyValueMap> =>
  ({
    sys: { id, createdAt, updatedAt },
    fields: {},
  }) as unknown as EntryProps<KeyValueMap>;
const NOW = "2026-02-01T00:00:00.000Z";
const SINCE = "2026-01-01T00:00:00.000Z";
test("a complete poll advances the cursor to now", () => {
  const records = [entry("a", SINCE, "2026-01-02T00:00:00.000Z")];
  expect(computeNextCursor(records, false, SINCE, NOW)).toEqual({
    nextCursor: NOW,
    stalled: false,
  });
});
test("a truncated poll advances the cursor to the newest (last) fetched record", () => {
  const records = [
    entry("a", SINCE, "2026-01-02T00:00:00.000Z"),
    entry("b", SINCE, "2026-01-05T00:00:00.000Z"),
  ];
  expect(computeNextCursor(records, true, SINCE, NOW)).toEqual({
    nextCursor: "2026-01-05T00:00:00.000Z",
    stalled: false,
  });
});
test("a truncated poll whose records all share the cursor timestamp is stalled", () => {
  const records = [entry("a", SINCE, SINCE), entry("b", SINCE, SINCE)];
  expect(computeNextCursor(records, true, SINCE, NOW)).toEqual({
    nextCursor: SINCE,
    stalled: true,
  });
});
test("a first poll seeds from the Look-back Date as an initial sync", () => {
  expect(resolvePollingWindowStart(undefined, SINCE, NOW)).toEqual({
    since: SINCE,
    isInitialSync: true,
  });
  expect(resolvePollingWindowStart(undefined, "", NOW)).toEqual({
    since: NOW,
    isInitialSync: false,
  });
  expect(
    resolvePollingWindowStart(
      { lastPolledAt: SINCE, initialSyncInProgress: true },
      "",
      NOW,
    ),
  ).toEqual({ since: SINCE, isInitialSync: true });
});
test("an initial sync ignores the visibility toggles", () => {
  const fresh = entry(
    "a",
    "2026-01-02T00:00:00.000Z",
    "2026-01-02T00:00:00.000Z",
  );
  const old = entry(
    "b",
    "2025-01-01T00:00:00.000Z",
    "2026-01-03T00:00:00.000Z",
  );
  const options = { showNewRecords: false, showUpdatedRecords: false };
  expect(
    partitionEntryChanges([fresh, old], SINCE, {
      ...options,
      isInitialSync: false,
    }),
  ).toEqual({ created: [], updated: [] });
  expect(
    partitionEntryChanges([fresh, old], SINCE, {
      ...options,
      isInitialSync: true,
    }),
  ).toEqual({ created: [fresh], updated: [old] });
});
describe("fetchEntriesSince", () => {
  const fakeEnvironment = (
    store: EntryProps<KeyValueMap>[],
    onPage?: (page: number) => void,
  ) => {
    let page = 0;
    return {
      getEntries: async (query: Record<string, unknown>) => {
        onPage?.(page++);
        const since = new Date(String(query["sys.updatedAt[gte]"])).getTime();
        const items = store
          .filter((item) => new Date(item.sys.updatedAt).getTime() >= since)
          .sort(
            (a, b) =>
              a.sys.updatedAt.localeCompare(b.sys.updatedAt) ||
              a.sys.id.localeCompare(b.sys.id),
          )
          .slice(Number(query.skip), Number(query.skip) + Number(query.limit));
        return { toPlainObject: () => ({ items }) };
      },
    } as unknown as Environment;
  };
  const seconds = (n: number) =>
    new Date(Date.UTC(2026, 0, 2) + n * 1000).toISOString();
  test("an entry edited between pages does not hide any other entry", async () => {
    const store = Array.from({ length: 250 }, (_, i) =>
      entry(`e${String(i).padStart(3, "0")}`, SINCE, seconds(i)),
    );
    const environment = fakeEnvironment(store, (page) => {
      if (page === 1) store[10].sys.updatedAt = seconds(1000);
    });
    const { records, truncated } = await fetchEntriesSince(
      environment,
      SINCE,
      undefined,
    );
    expect(truncated).toBe(false);
    expect(new Set(records.map((r) => r.sys.id)).size).toBe(250);
  });
  test("entries sharing the anchor timestamp are paged past, not refetched forever", async () => {
    const store = Array.from({ length: 150 }, (_, i) =>
      entry(`t${String(i).padStart(3, "0")}`, SINCE, seconds(0)),
    );
    const { records, truncated } = await fetchEntriesSince(
      fakeEnvironment(store),
      SINCE,
      undefined,
    );
    expect(truncated).toBe(false);
    expect(records).toHaveLength(150);
  });
  test("stopping at the page cap reports truncation", async () => {
    const store = Array.from({ length: 250 }, (_, i) =>
      entry(`c${String(i).padStart(3, "0")}`, SINCE, seconds(i)),
    );
    const { records, truncated } = await fetchEntriesSince(
      fakeEnvironment(store),
      SINCE,
      undefined,
      2,
    );
    expect(truncated).toBe(true);
    expect(records).toHaveLength(200);
  });
});
