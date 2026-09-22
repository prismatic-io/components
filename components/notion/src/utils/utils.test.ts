import type { Element } from "@prismatic-io/spectral";
import { describe, expect, test } from "vitest";
import type { NotionPage } from "../types";
import {
  mergePollingCursor,
  resolveRoundState,
  floorToMinute,
  lookBackDateClean,
  partitionRecordChanges,
  resolveRecordChanges,
  sortArray,
} from ".";
const page = (
  id: string,
  createdTime: string,
  editedTime = createdTime,
): NotionPage => ({
  id,
  object: "page",
  created_time: createdTime,
  last_edited_time: editedTime,
});
describe("lookBackDateClean", () => {
  test("passes a valid past date through unchanged", () => {
    expect(lookBackDateClean("2026-01-01")).toBe("2026-01-01");
  });
  test("returns undefined for an unset input", () => {
    expect(lookBackDateClean(undefined)).toBeUndefined();
    expect(lookBackDateClean("")).toBeUndefined();
  });
  test("rejects anything that is not a bare YYYY-MM-DD date", () => {
    expect(() => lookBackDateClean("01/01/2026")).toThrow(/YYYY-MM-DD format/);
    expect(() => lookBackDateClean("2026-01-01T00:00:00Z")).toThrow(
      /YYYY-MM-DD format/,
    );
  });
  test("rejects a date that does not exist on the calendar", () => {
    expect(() => lookBackDateClean("2026-02-30")).toThrow(/YYYY-MM-DD format/);
    expect(() => lookBackDateClean("2026-13-01")).toThrow(/YYYY-MM-DD format/);
  });
  test("rejects a future date", () => {
    const nextYear = new Date().getUTCFullYear() + 1;
    expect(() => lookBackDateClean(`${nextYear}-01-01`)).toThrow(
      /cannot be a future date/,
    );
  });
});
describe("floorToMinute", () => {
  test("drops seconds and milliseconds", () => {
    expect(floorToMinute(new Date("2026-01-23T10:34:56.789Z"))).toBe(
      "2026-01-23T10:34:00.000Z",
    );
  });
  test("leaves a timestamp already on the minute alone", () => {
    expect(floorToMinute(new Date("2026-01-23T10:34:00.000Z"))).toBe(
      "2026-01-23T10:34:00.000Z",
    );
  });
});
describe("partitionRecordChanges", () => {
  const since = "2026-01-23T10:00:00.000Z";
  test("classifies a record as new or as updated, never both", () => {
    const fresh = page("new-1", "2026-01-23T10:05:00.000Z");
    const edited = page(
      "updated-1",
      "2026-01-01T09:00:00.000Z",
      "2026-01-23T10:05:00.000Z",
    );
    expect(partitionRecordChanges([fresh, edited], since)).toEqual({
      created: [fresh],
      updated: [edited],
    });
  });
  test("excludes a record older than the window on both timestamps", () => {
    const stale = page("old-1", "2026-01-01T00:00:00.000Z");
    expect(partitionRecordChanges([stale], since)).toEqual({
      created: [],
      updated: [],
    });
  });
  test("keeps a record sitting exactly on the window's lower bound", () => {
    const boundary = page("boundary-1", since);
    expect(partitionRecordChanges([boundary], since).created).toEqual([
      boundary,
    ]);
  });
  test("drops the ids the previous recurrence already emitted", () => {
    const boundary = page("boundary-1", since);
    const fresh = page("new-1", "2026-01-23T10:05:00.000Z");
    expect(
      partitionRecordChanges([boundary, fresh], since, ["boundary-1"]),
    ).toEqual({ created: [fresh], updated: [] });
  });
  test("re-emits a boundary record that has been edited again since the cursor", () => {
    const reEdited = page(
      "boundary-1",
      "2026-01-01T09:00:00.000Z",
      "2026-01-23T10:07:00.000Z",
    );
    expect(partitionRecordChanges([reEdited], since, ["boundary-1"])).toEqual({
      created: [],
      updated: [reEdited],
    });
  });
  test("reports a re-edited boundary record as updated, never as created", () => {
    const createdOnTheCursor = page(
      "boundary-1",
      since,
      "2026-01-23T10:07:00.000Z",
    );
    expect(
      partitionRecordChanges([createdOnTheCursor], since, ["boundary-1"]),
    ).toEqual({ created: [], updated: [createdOnTheCursor] });
  });
});
describe("mergePollingCursor", () => {
  test("takes the cursor from the data, not the clock", () => {
    const older = page("a", "2026-01-23T10:00:00.000Z");
    const newest = page("b", "2026-01-23T10:05:00.000Z");
    expect(mergePollingCursor([older, newest])).toEqual({
      cursor: "2026-01-23T10:05:00.000Z",
      boundaryIds: ["b"],
    });
  });
  test("carries every id sharing the highest timestamp", () => {
    const first = page("a", "2026-01-23T10:05:00.000Z");
    const second = page("b", "2026-01-23T10:05:00.000Z");
    expect(mergePollingCursor([first, second]).boundaryIds).toEqual(["a", "b"]);
  });
  test("reports no cursor when nothing was polled", () => {
    expect(mergePollingCursor([])).toEqual({ cursor: "", boundaryIds: [] });
  });
  test("ignores a record whose timestamp does not parse", () => {
    const broken = page("broken", "2026-01-23T10:00:00.000Z", "not a date");
    const good = page("good", "2026-01-23T10:01:00.000Z");
    expect(mergePollingCursor([broken, good])).toEqual({
      cursor: "2026-01-23T10:01:00.000Z",
      boundaryIds: ["good"],
    });
  });
  test("keeps a carried maximum that a later round cannot beat", () => {
    const carried = {
      cursor: "2026-01-23T10:05:00.000Z",
      boundaryIds: ["b"],
    };
    const olderPage = page("c", "2026-01-23T09:00:00.000Z");
    expect(mergePollingCursor([olderPage], carried)).toEqual(carried);
  });
  test("a strictly higher maximum discards the previous boundary ids", () => {
    const carried = {
      cursor: "2026-01-23T10:00:00.000Z",
      boundaryIds: ["a"],
    };
    const newer = page("b", "2026-01-23T10:05:00.000Z");
    expect(mergePollingCursor([newer], carried)).toEqual({
      cursor: "2026-01-23T10:05:00.000Z",
      boundaryIds: ["b"],
    });
  });
  test("appends an id that ties the carried maximum", () => {
    const carried = {
      cursor: "2026-01-23T10:05:00.000Z",
      boundaryIds: ["a"],
    };
    const tie = page("b", "2026-01-23T10:05:00.000Z");
    expect(mergePollingCursor([tie], carried).boundaryIds).toEqual(["a", "b"]);
  });
});
describe("resolveRoundState", () => {
  const merged = {
    cursor: "2026-01-23T10:05:00.000Z",
    boundaryIds: ["b"],
  };
  const windowStart = "2026-01-23T09:00:00.000Z";
  test("a final round commits the merged cursor and clears the mirror", () => {
    const { nextState, pollingState } = resolveRoundState({
      nextCursor: null,
      windowStart,
      merged,
      previous: { lastPolledAt: "2026-01-20T00:00:00.000Z" },
    });
    expect(nextState).toBeNull();
    expect(pollingState).toEqual({
      lastPolledAt: "2026-01-23T10:05:00.000Z",
      boundaryIds: ["b"],
    });
  });
  test("a final round that saw nothing holds the window still", () => {
    const { pollingState } = resolveRoundState({
      nextCursor: null,
      windowStart,
      merged: { cursor: "", boundaryIds: [] },
      previous: { lastPolledAt: "2026-01-20T00:00:00.000Z" },
    });
    expect(pollingState).toEqual({ lastPolledAt: windowStart });
  });
  test("a capped round does NOT advance the watermark", () => {
    const previous = {
      lastPolledAt: "2026-01-20T00:00:00.000Z",
      boundaryIds: ["old"],
    };
    const { nextState, pollingState } = resolveRoundState({
      nextCursor: "page-2",
      windowStart,
      merged,
      previous,
    });
    expect(pollingState.lastPolledAt).toBe("2026-01-20T00:00:00.000Z");
    expect(pollingState.boundaryIds).toEqual(["old"]);
    expect(nextState).toEqual({
      windowStart,
      startCursor: "page-2",
      cursor: "2026-01-23T10:05:00.000Z",
      boundaryIds: ["b"],
    });
  });
  test("a capped round mirrors its position into polling state", () => {
    const { nextState, pollingState } = resolveRoundState({
      nextCursor: "page-2",
      windowStart,
      merged,
      previous: { lastPolledAt: "2026-01-20T00:00:00.000Z" },
    });
    expect(pollingState.inFlightCursor).toEqual(nextState);
  });
  test("the pinned window survives every round of one drain", () => {
    const { nextState } = resolveRoundState({
      nextCursor: "page-3",
      windowStart,
      merged,
      previous: { lastPolledAt: "2026-01-20T00:00:00.000Z" },
    });
    expect(nextState?.windowStart).toBe(windowStart);
  });
});
describe("resolveRecordChanges", () => {
  const fresh = page("new-1", "2026-01-23T10:00:00.000Z");
  const edited = page(
    "updated-1",
    "2026-01-01T00:00:00.000Z",
    "2026-01-23T10:00:00.000Z",
  );
  test("tags every record with the array it came from", () => {
    expect(resolveRecordChanges([fresh], [edited])).toEqual([
      { changeType: "new", record: fresh },
      { changeType: "updated", record: edited },
    ]);
  });
  test("emits a record present in both arrays exactly once", () => {
    expect(resolveRecordChanges([fresh], [fresh, edited])).toEqual([
      { changeType: "new", record: fresh },
      { changeType: "updated", record: edited },
    ]);
  });
  test("returns [] for empty or absent arrays", () => {
    expect(resolveRecordChanges([], [])).toEqual([]);
    expect(resolveRecordChanges(undefined, undefined)).toEqual([]);
  });
  test("tolerates one array present while the other is absent", () => {
    expect(resolveRecordChanges([fresh], undefined)).toEqual([
      { changeType: "new", record: fresh },
    ]);
    expect(resolveRecordChanges(undefined, [edited])).toEqual([
      { changeType: "updated", record: edited },
    ]);
  });
});
describe("sortArray", () => {
  test("orders by label without touching the caller's array", () => {
    const input: Element[] = [
      { key: "2", label: "Beta" },
      { key: "1", label: "Alpha" },
    ];
    expect(sortArray(input).map((element) => element.label)).toEqual([
      "Alpha",
      "Beta",
    ]);
    expect(input.map((element) => element.label)).toEqual(["Beta", "Alpha"]);
  });
  test("keeps equal labels in their original order", () => {
    const input: Element[] = [
      { key: "first", label: "Same" },
      { key: "second", label: "Same" },
    ];
    expect(sortArray(input).map((element) => element.key)).toEqual([
      "first",
      "second",
    ]);
  });
  test("sorts a missing label as an empty string rather than throwing", () => {
    const input = [{ key: "1" }, { key: "2", label: "Alpha" }] as Element[];
    expect(sortArray(input).map((element) => element.key)).toEqual(["1", "2"]);
  });
});
