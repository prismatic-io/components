import type { ClickUpTask } from "../types";
import { lookBackDateClean } from "./clean";
import {
  partitionTasksByTimestamp,
  resolveClickUpTaskChanges,
  resolvePollingWindowStart,
} from "./polling";
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
describe("resolveClickUpTaskChanges", () => {
  test("tags every task with how it changed", () => {
    expect(
      resolveClickUpTaskChanges({ created: [created], updated: [updated] }),
    ).toEqual([
      { changeType: "created", record: created },
      { changeType: "updated", record: updated },
    ]);
  });
  test("returns [] for empty or undefined changes", () => {
    expect(resolveClickUpTaskChanges({ created: [], updated: [] })).toEqual([]);
    expect(resolveClickUpTaskChanges(undefined)).toEqual([]);
  });
});
describe("lookBackDateClean", () => {
  test("returns an empty string for an empty value", () => {
    expect(lookBackDateClean(undefined)).toBe("");
    expect(lookBackDateClean(null)).toBe("");
    expect(lookBackDateClean("  ")).toBe("");
  });
  test("returns the UTC-midnight ISO timestamp of a valid date", () => {
    expect(lookBackDateClean("2026-01-01")).toBe("2026-01-01T00:00:00.000Z");
  });
  test("rejects a malformed, non-calendar, or future date", () => {
    expect(() => lookBackDateClean("01/01/2026")).toThrow(
      "Look-back Date must be a date in YYYY-MM-DD format",
    );
    expect(() => lookBackDateClean("2026-02-31")).toThrow(
      "Look-back Date must be a date in YYYY-MM-DD format",
    );
    expect(() => lookBackDateClean("2999-01-01")).toThrow(
      "Look-back Date cannot be a future date",
    );
  });
});
describe("resolvePollingWindowStart", () => {
  const now = new Date("2026-09-29T12:00:00.000Z");
  test("resumes from the previous poll and ignores the Look-back Date", () => {
    expect(
      resolvePollingWindowStart(
        { lastPolledAt: "2026-09-29T11:00:00.000Z" },
        "2026-01-01T00:00:00.000Z",
        now,
      ),
    ).toEqual({
      sinceMs: Date.parse("2026-09-29T11:00:00.000Z"),
      isInitialSync: false,
    });
  });
  test("starts an inclusive initial sync from the Look-back Date on the first poll", () => {
    const lookBackMs = Date.parse("2026-01-01T00:00:00.000Z");
    const window = resolvePollingWindowStart(
      undefined,
      "2026-01-01T00:00:00.000Z",
      now,
    );
    expect(window).toEqual({ sinceMs: lookBackMs - 1, isInitialSync: true });
    const atBoundary: ClickUpTask = {
      id: "edge",
      date_created: String(lookBackMs),
      date_updated: String(lookBackMs),
    };
    expect(
      partitionTasksByTimestamp([atBoundary], window.sinceMs).created,
    ).toEqual([atBoundary]);
  });
  test("starts at now with no backfill when there is no Look-back Date", () => {
    expect(resolvePollingWindowStart(undefined, "", now)).toEqual({
      sinceMs: now.getTime(),
      isInitialSync: false,
    });
  });
});
