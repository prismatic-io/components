import type {
  PollingCursor,
  PollingState,
} from "../actions/interfaces/PollingState";
import {
  buildPollingWindowQuery,
  lookBackDateClean,
  resolvePollingCursor,
} from ".";
const NOW = "2026-08-25T12:00:00.000Z";
describe("lookBackDateClean", () => {
  test.each([
    undefined,
    null,
    "",
    "   ",
  ])("treats %p as no backfill", (value) => {
    expect(lookBackDateClean(value)).toBe("");
  });
  test("normalizes a calendar date to the start of that UTC day", () => {
    expect(lookBackDateClean("2026-01-01")).toBe("2026-01-01T00:00:00.000Z");
  });
  test.each([
    "2026-1-1",
    "01-01-2026",
    "yesterday",
    "2026-01-01T00:00:00Z",
  ])("rejects %p as malformed", (value) => {
    expect(() => lookBackDateClean(value)).toThrow("YYYY-MM-DD format");
  });
  test("rejects a date the calendar does not have", () => {
    expect(() => lookBackDateClean("2026-02-31")).toThrow("YYYY-MM-DD format");
  });
  test("rejects a future date", () => {
    const nextYear = new Date().getUTCFullYear() + 1;
    expect(() => lookBackDateClean(`${nextYear}-01-01`)).toThrow(
      "cannot be a future date",
    );
  });
  test("rejects a non-string even when it looks like a date", () => {
    expect(() => lookBackDateClean(new Date("2026-01-01"))).toThrow(
      "YYYY-MM-DD format",
    );
  });
});
describe("resolvePollingCursor", () => {
  const inFlight: PollingCursor = {
    windowStart: "2026-08-01T00:00:00.000Z",
    windowEnd: "2026-08-25T00:00:00.000Z",
    after: "CURSOR-7",
    isBackfill: false,
  };
  test("a batched drain resumes from payload.paginationState before anything else", () => {
    const state: PollingState = {
      lastPolledAt: "2026-08-24T00:00:00.000Z",
      cursor: inFlight,
    };
    expect(
      resolvePollingCursor({
        incoming: inFlight,
        state,
        lookBackDate: "2020-01-01",
        now: NOW,
      }),
    ).toEqual(inFlight);
  });
  test("an unbatched drain resumes from the cursor held in polling state", () => {
    const state: PollingState = {
      lastPolledAt: "2026-08-24T00:00:00.000Z",
      cursor: inFlight,
    };
    expect(
      resolvePollingCursor({
        incoming: undefined,
        state,
        lookBackDate: "",
        now: NOW,
      }),
    ).toEqual(inFlight);
  });
  test("a committed watermark opens the next incremental window", () => {
    const state: PollingState = { lastPolledAt: "2026-08-24T00:00:00.000Z" };
    expect(
      resolvePollingCursor({
        incoming: undefined,
        state,
        lookBackDate: "",
        now: NOW,
      }),
    ).toEqual({
      windowStart: "2026-08-24T00:00:00.000Z",
      windowEnd: NOW,
      isBackfill: false,
    });
  });
  test("a first run with a look-back date opens the initial sync window", () => {
    expect(
      resolvePollingCursor({
        incoming: undefined,
        state: {},
        lookBackDate: "2026-01-01T00:00:00.000Z",
        now: NOW,
      }),
    ).toEqual({
      windowStart: "2026-01-01T00:00:00.000Z",
      windowEnd: NOW,
      isBackfill: true,
    });
  });
  test("a first run with no look-back date opens an empty window", () => {
    const cursor = resolvePollingCursor({
      incoming: undefined,
      state: {},
      lookBackDate: "",
      now: NOW,
    });
    expect(cursor).toEqual({
      windowStart: NOW,
      windowEnd: NOW,
      isBackfill: false,
    });
    expect(cursor.windowStart >= cursor.windowEnd).toBe(true);
  });
  test("a look-back date never restarts a store that already has a watermark", () => {
    const state: PollingState = { lastPolledAt: "2026-08-24T00:00:00.000Z" };
    const cursor = resolvePollingCursor({
      incoming: undefined,
      state,
      lookBackDate: "2020-01-01T00:00:00.000Z",
      now: NOW,
    });
    expect(cursor.windowStart).toBe("2026-08-24T00:00:00.000Z");
    expect(cursor.isBackfill).toBe(false);
  });
});
describe("buildPollingWindowQuery", () => {
  test("combines both bounds, with the upper bound exclusive", () => {
    expect(
      buildPollingWindowQuery({
        windowStart: "2026-08-24T00:00:00.000Z",
        windowEnd: NOW,
        isBackfill: false,
      }),
    ).toBe(`updated_at:>='2026-08-24T00:00:00.000Z' updated_at:<'${NOW}'`);
  });
});
