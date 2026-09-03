import { describe, expect, test } from "vitest";
import { MAX_BATCHED_PAGE_SIZE, PAGE_SIZE } from "../constants";
import {
  cursorOf,
  resolvePageSize,
  resolveStartCursor,
  sameCursor,
  splitPage,
} from "./polling";
const row = (id: number, at: string) => ({ id, updated_at: at });
describe("sameCursor", () => {
  test("compares Date values by time, not identity", () => {
    expect(sameCursor(new Date("2026-01-01"), new Date("2026-01-01"))).toBe(
      true,
    );
    expect(sameCursor(new Date("2026-01-01"), new Date("2026-01-02"))).toBe(
      false,
    );
  });
  test("compares strings and numbers by value", () => {
    expect(sameCursor("2026-01-01", "2026-01-01")).toBe(true);
    expect(sameCursor(7, 7)).toBe(true);
    expect(sameCursor(7, 8)).toBe(false);
  });
});
describe("cursorOf", () => {
  test("reads the nominated column", () => {
    expect(cursorOf(row(1, "2026-01-01"), "updated_at")).toBe("2026-01-01");
  });
  test("throws on a null cursor value rather than advancing past it", () => {
    expect(() => cursorOf({ id: 1, updated_at: null }, "updated_at")).toThrow(
      /missing a usable "updated_at" value/,
    );
  });
});
describe("splitPage", () => {
  test("a short page is drained: every row is emitted and nothing follows", () => {
    const rows = [row(1, "2026-01-01"), row(2, "2026-01-02")];
    expect(splitPage(rows, "updated_at", 3)).toEqual({
      kind: "drained",
      emit: rows,
    });
  });
  test("an exactly-full page with no lookahead row is still drained", () => {
    const rows = [row(1, "2026-01-01"), row(2, "2026-01-02")];
    expect(splitPage(rows, "updated_at", 2)).toEqual({
      kind: "drained",
      emit: rows,
    });
  });
  test("a full page with distinct values resumes after its last emitted row", () => {
    const rows = [
      row(1, "2026-01-01"),
      row(2, "2026-01-02"),
      row(3, "2026-01-03"),
    ];
    expect(splitPage(rows, "updated_at", 2)).toEqual({
      kind: "more",
      emit: [rows[0], rows[1]],
      nextCursor: "2026-01-02",
    });
  });
  test("a trailing tie group is held back rather than split across the boundary", () => {
    const rows = [
      row(1, "2026-01-01"),
      row(2, "2026-01-02"),
      row(3, "2026-01-02"),
    ];
    expect(splitPage(rows, "updated_at", 2)).toEqual({
      kind: "more",
      emit: [rows[0]],
      nextCursor: "2026-01-01",
    });
  });
  test("a page that is entirely one tie group reports the value to drain", () => {
    const rows = [
      row(1, "2026-01-02"),
      row(2, "2026-01-02"),
      row(3, "2026-01-02"),
    ];
    expect(splitPage(rows, "updated_at", 2)).toEqual({
      kind: "tie",
      tieValue: "2026-01-02",
    });
  });
  test("ties are detected on Date values too", () => {
    const at = (s: string) => ({ id: 1, updated_at: new Date(s) });
    const rows = [at("2026-01-01"), at("2026-01-02"), at("2026-01-02")];
    const result = splitPage(rows, "updated_at", 2);
    expect(result.kind).toBe("more");
    expect(result.kind === "more" && result.emit).toHaveLength(1);
  });
  test("a tie group contained within the page is emitted whole when the lookahead differs", () => {
    const rows = [
      row(1, "2026-01-02"),
      row(2, "2026-01-02"),
      row(3, "2026-01-03"),
    ];
    expect(splitPage(rows, "updated_at", 2)).toEqual({
      kind: "more",
      emit: [rows[0], rows[1]],
      nextCursor: "2026-01-02",
    });
  });
});
describe("resolveStartCursor", () => {
  const params = {
    cursorField: "updated_at",
    tableName: "people",
    defaultCursorValue: "",
  };
  const state = {
    cursor: "2026-01-05",
    cursorField: "updated_at",
    tableName: "people",
  };
  test("a platform-driven round resumes exactly where its predecessor stopped", () => {
    expect(resolveStartCursor({ incoming: "2026-01-09", state, params })).toBe(
      "2026-01-09",
    );
  });
  test("an interrupted drain resumes from its in-flight position, not the committed mark", () => {
    expect(
      resolveStartCursor({
        incoming: undefined,
        state: { ...state, inFlightCursor: "2026-01-07" },
        params,
      }),
    ).toBe("2026-01-07");
  });
  test("a steady-state poll resumes from the committed mark", () => {
    expect(resolveStartCursor({ incoming: undefined, state, params })).toBe(
      "2026-01-05",
    );
  });
  test("no state and no default asks to be baselined", () => {
    expect(
      resolveStartCursor({
        incoming: undefined,
        state: {} as never,
        params,
      }),
    ).toBeNull();
  });
  test("no state with a default seeds the backfill instead of baselining", () => {
    expect(
      resolveStartCursor({
        incoming: undefined,
        state: {} as never,
        params: { ...params, defaultCursorValue: "1900-01-01 00:00:00" },
      }),
    ).toBe("1900-01-01 00:00:00");
  });
  test("a changed cursor field discards the stored position and re-baselines", () => {
    expect(
      resolveStartCursor({
        incoming: undefined,
        state: { ...state, inFlightCursor: "2026-01-07" },
        params: { ...params, cursorField: "created_at" },
      }),
    ).toBeNull();
  });
  test("a changed table name discards the stored position and re-baselines", () => {
    expect(
      resolveStartCursor({
        incoming: undefined,
        state,
        params: { ...params, tableName: "posts" },
      }),
    ).toBeNull();
  });
  test("a reconfigured trigger re-baselines even when a default cursor value is set", () => {
    expect(
      resolveStartCursor({
        incoming: undefined,
        state,
        params: {
          ...params,
          tableName: "posts",
          defaultCursorValue: "1900-01-01 00:00:00",
        },
      }),
    ).toBeNull();
  });
  test("a stale in-flight position does not resume under a changed configuration", () => {
    expect(
      resolveStartCursor({
        incoming: undefined,
        state: {
          inFlightCursor: "2026-01-07",
          cursorField: "updated_at",
          tableName: "people",
        } as never,
        params: { ...params, tableName: "posts" },
      }),
    ).toBeNull();
  });
});
describe("resolvePageSize", () => {
  test("an unset input takes the default in either mode", () => {
    expect(resolvePageSize(false, undefined)).toBe(PAGE_SIZE);
    expect(resolvePageSize(true, undefined)).toBe(PAGE_SIZE);
  });
  test("a batching flow is capped however large a value the input asks for", () => {
    expect(resolvePageSize(true, 200000)).toBe(MAX_BATCHED_PAGE_SIZE);
  });
  test("an unbatched flow keeps the value the user asked for", () => {
    expect(resolvePageSize(false, 200000)).toBe(200000);
  });
  test("a value under the ceiling stands in both modes", () => {
    expect(resolvePageSize(true, 25)).toBe(25);
    expect(resolvePageSize(false, 25)).toBe(25);
  });
});
