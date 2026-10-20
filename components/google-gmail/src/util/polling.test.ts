import { describe, test, expect } from "vitest";
import { lookBackDateClean, resolveGmailRecordChanges } from "./polling";
describe("lookBackDateClean", () => {
  test("returns empty string for empty input", () => {
    expect(lookBackDateClean("")).toBe("");
    expect(lookBackDateClean("  ")).toBe("");
    expect(lookBackDateClean(undefined)).toBe("");
  });
  test("returns valid YYYY-MM-DD date unchanged", () => {
    expect(lookBackDateClean("2026-01-15")).toBe("2026-01-15");
  });
  test("trims whitespace", () => {
    expect(lookBackDateClean("  2026-01-15  ")).toBe("2026-01-15");
  });
  test("throws on invalid format", () => {
    expect(() => lookBackDateClean("01-15-2026")).toThrow("YYYY-MM-DD format");
    expect(() => lookBackDateClean("2026/01/15")).toThrow("YYYY-MM-DD format");
    expect(() => lookBackDateClean("not-a-date")).toThrow("YYYY-MM-DD format");
  });
  test("throws on invalid calendar date", () => {
    expect(() => lookBackDateClean("2026-02-30")).toThrow(
      "not a valid calendar date",
    );
    expect(() => lookBackDateClean("2026-13-01")).toThrow(
      "not a valid calendar date",
    );
  });
  test("throws on future date", () => {
    expect(() => lookBackDateClean("2099-01-01")).toThrow(
      "cannot be a future date",
    );
  });
});
describe("resolveGmailRecordChanges", () => {
  test("returns empty array for undefined input", () => {
    expect(resolveGmailRecordChanges(undefined)).toEqual([]);
  });
  test("returns empty array when history is empty", () => {
    expect(resolveGmailRecordChanges({ history: [] })).toEqual([]);
  });
  test("returns empty array when history key is missing", () => {
    expect(resolveGmailRecordChanges({})).toEqual([]);
  });
  test("maps each history entry as changeType created", () => {
    const data = {
      history: [
        { id: "h1", messages: [{ id: "m1" }] },
        { id: "h2", messages: [{ id: "m2" }] },
      ],
    };
    const result = resolveGmailRecordChanges(data);
    expect(result).toHaveLength(2);
    expect(result[0]).toEqual({
      changeType: "created",
      record: { id: "h1", messages: [{ id: "m1" }] },
    });
    expect(result[1]).toEqual({
      changeType: "created",
      record: { id: "h2", messages: [{ id: "m2" }] },
    });
  });
});
