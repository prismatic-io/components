import { describe, test, expect } from "vitest";
import { lookBackDateClean, resolveImapRecordChanges } from "./polling";
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
describe("resolveImapRecordChanges", () => {
  test("returns empty array for undefined input", () => {
    expect(resolveImapRecordChanges(undefined)).toEqual([]);
  });
  test("returns empty array for non-array input", () => {
    expect(
      resolveImapRecordChanges("not an array" as unknown as unknown[]),
    ).toEqual([]);
  });
  test("returns empty array for empty array", () => {
    expect(resolveImapRecordChanges([])).toEqual([]);
  });
  test("maps each email as changeType created", () => {
    const emails = [
      { uid: 1066, envelope: { subject: "Test" }, flags: [] },
      { uid: 1067, envelope: { subject: "Test 2" }, flags: ["\\Seen"] },
    ];
    const result = resolveImapRecordChanges(emails);
    expect(result).toHaveLength(2);
    expect(result[0]).toEqual({ changeType: "created", record: emails[0] });
    expect(result[1]).toEqual({ changeType: "created", record: emails[1] });
  });
});
