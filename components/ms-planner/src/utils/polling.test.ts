import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";
import {
  latestCreatedDateTime,
  newestCreatedDateTime,
  lookBackDateClean,
} from "./polling";
describe("newestCreatedDateTime", () => {
  test("returns the newest createdDateTime at millisecond precision", () => {
    expect(
      newestCreatedDateTime([
        { createdDateTime: "2024-01-09T09:12:03.1533333Z" },
        { createdDateTime: "2024-01-09T10:00:00.1239999Z" },
        { createdDateTime: "2024-01-09T09:30:00Z" },
      ]),
    ).toBe("2024-01-09T10:00:00.123Z");
  });
  test("returns undefined when there are no tasks or none is dated", () => {
    expect(newestCreatedDateTime([])).toBeUndefined();
    expect(
      newestCreatedDateTime([{ createdDateTime: null }, {}]),
    ).toBeUndefined();
  });
  test("ignores undated tasks among dated ones", () => {
    expect(
      newestCreatedDateTime([
        { createdDateTime: null },
        { createdDateTime: "2024-01-01T00:00:00Z" },
      ]),
    ).toBe("2024-01-01T00:00:00.000Z");
  });
});
describe("latestCreatedDateTime", () => {
  const current = "2024-01-09T09:00:00.000Z";
  test("returns the latest createdDateTime among the tasks", () => {
    expect(
      latestCreatedDateTime(
        [
          { createdDateTime: "2024-01-09T09:12:03.1533333Z" },
          { createdDateTime: "2024-01-09T10:00:00Z" },
          { createdDateTime: "2024-01-09T09:30:00Z" },
        ],
        current,
      ),
    ).toBe("2024-01-09T10:00:00.000Z");
  });
  test("truncates Graph's seven-digit fractional seconds to milliseconds", () => {
    expect(
      latestCreatedDateTime(
        [{ createdDateTime: "2024-01-09T09:12:03.1539999Z" }],
        current,
      ),
    ).toBe("2024-01-09T09:12:03.153Z");
  });
  test("normalizes an offset timestamp to UTC", () => {
    expect(
      latestCreatedDateTime(
        [{ createdDateTime: "2024-01-09T12:00:00+02:00" }],
        current,
      ),
    ).toBe("2024-01-09T10:00:00.000Z");
  });
  test("keeps the current cursor when there are no tasks", () => {
    expect(latestCreatedDateTime([], current)).toBe(current);
  });
  test("ignores undated tasks and never moves the cursor backward", () => {
    expect(
      latestCreatedDateTime(
        [
          { createdDateTime: null },
          {},
          { createdDateTime: "2024-01-01T00:00:00Z" },
        ],
        current,
      ),
    ).toBe(current);
  });
});
describe("lookBackDateClean", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-10-21T12:00:00"));
  });
  afterEach(() => {
    vi.useRealTimers();
  });
  test("returns an empty string when unset", () => {
    expect(lookBackDateClean(undefined)).toBe("");
    expect(lookBackDateClean("")).toBe("");
    expect(lookBackDateClean("   ")).toBe("");
  });
  test("returns a valid past date trimmed", () => {
    expect(lookBackDateClean(" 2026-01-01 ")).toBe("2026-01-01");
  });
  test("accepts today (UTC)", () => {
    const today = new Date().toISOString().slice(0, 10);
    expect(lookBackDateClean(today)).toBe(today);
  });
  test("rejects a value not in YYYY-MM-DD format", () => {
    expect(() => lookBackDateClean("01/01/2026")).toThrow(
      /Look-back Date must be in YYYY-MM-DD/,
    );
    expect(() => lookBackDateClean("2026-1-1")).toThrow(
      /Look-back Date must be in YYYY-MM-DD/,
    );
  });
  test("rejects a date that does not exist on the calendar", () => {
    expect(() => lookBackDateClean("2026-02-30")).toThrow(
      /Look-back Date "2026-02-30" is not a valid calendar date/,
    );
  });
  test("rejects a future date (UTC)", () => {
    const tomorrow = new Date(Date.now() + 24 * 60 * 60 * 1000)
      .toISOString()
      .slice(0, 10);
    expect(() => lookBackDateClean(tomorrow)).toThrow(
      /Look-back Date cannot be a future date/,
    );
  });
});
