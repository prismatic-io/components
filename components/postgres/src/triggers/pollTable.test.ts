import { describe, expect, test } from "vitest";
import triggers from "./index";
import { pollTable } from "./pollTable";
import { fetchPage } from "./pollTablePerform";
const row = (id: number, at: string) => ({ id, updated_at: at });
const fakeDb = (pages: Record<string, unknown>[][]) => {
  const calls: {
    query: string;
    values: unknown;
  }[] = [];
  let call = 0;
  return {
    calls,
    manyOrNone: (query: string, values: unknown) => {
      calls.push({ query, values });
      return Promise.resolve(pages[call++] ?? []);
    },
    one: (query: string, values: unknown) => {
      calls.push({ query, values });
      return Promise.resolve({ cursor: "2026-01-01" });
    },
  };
};
describe("pollTable batching declaration", () => {
  test("the trigger is opt-in batchable at the standard batch size", () => {
    expect(pollTable.triggerResolverSupport).toBe("valid");
    expect(pollTable.batchConfig).toEqual({
      batchSize: 50,
      concurrentBatchLimit: 3,
    });
    expect(pollTable.triggerResolver?.resolveItems).toBeInstanceOf(Function);
    expect(pollTable.triggerResolver?.getNextPaginationState).toBeInstanceOf(
      Function,
    );
  });
  test("the published key is unchanged and remains the only one", () => {
    expect(Object.keys(triggers)).toEqual(["pollTable"]);
    expect(pollTable.display.label).toBe("New and Updated Records");
  });
});
describe("pollTable resolveItems", () => {
  const resolve = (payload: unknown) =>
    pollTable.triggerResolver?.resolveItems?.(
      {} as never,
      { payload } as never,
    );
  test("dispatches one item per record", () => {
    const data = [row(1, "2026-01-01"), row(2, "2026-01-02")];
    expect(resolve({ body: { data } })).toEqual(data);
  });
  test("tolerates an empty page", () => {
    expect(resolve({ body: { data: [] } })).toEqual([]);
  });
  test("tolerates a body that is not an array rather than throwing", () => {
    expect(resolve({ body: { data: undefined } })).toEqual([]);
    expect(resolve({ body: {} })).toEqual([]);
  });
});
describe("pollTable getNextPaginationState", () => {
  const next = (payload: unknown) =>
    pollTable.triggerResolver?.getNextPaginationState?.(
      {} as never,
      { payload } as never,
    );
  test("continues the drain while perform hands back a cursor", () => {
    expect(next({ paginationState: { cursor: "2026-01-02" } })).toEqual({
      cursor: "2026-01-02",
    });
  });
  test("stops when perform clears it, which is the only way the drain ends", () => {
    expect(next({ paginationState: undefined })).toBeNull();
  });
});
describe("fetchPage", () => {
  test("asks for one row beyond the page so it can tell whether more follow", async () => {
    const db = fakeDb([[row(1, "2026-01-01")]]);
    await fetchPage(db as never, {
      tableName: "people",
      cursorField: "updated_at",
      cursor: "2026-01-01",
      pageSize: 2,
    });
    expect(
      (
        db.calls[0].values as {
          limit: number;
        }
      ).limit,
    ).toBe(3);
    expect(db.calls[0].query).toContain("LIMIT");
    expect(db.calls[0].query).toContain("ORDER BY");
  });
  test("a short page ends the drain", async () => {
    const db = fakeDb([[row(1, "2026-01-01")]]);
    const page = await fetchPage(db as never, {
      tableName: "people",
      cursorField: "updated_at",
      cursor: "2026-01-00",
      pageSize: 2,
    });
    expect(page.nextCursor).toBeNull();
    expect(page.emit).toHaveLength(1);
  });
  test("a page-wide tie ends the drain by taking the remainder", async () => {
    const tied = [
      row(1, "2026-01-02"),
      row(2, "2026-01-02"),
      row(3, "2026-01-02"),
    ];
    const db = fakeDb([tied, [...tied, row(4, "2026-01-02")]]);
    const page = await fetchPage(db as never, {
      tableName: "people",
      cursorField: "updated_at",
      cursor: "2026-01-01",
      pageSize: 2,
    });
    expect(db.calls).toHaveLength(2);
    expect(db.calls[1].query).toContain("> ${cursor}");
    expect(
      (
        db.calls[1].values as {
          cursor: string;
        }
      ).cursor,
    ).toBe("2026-01-01");
    expect(page.emit).toHaveLength(4);
    expect(page.nextCursor).toBeNull();
  });
});
