import { describe, test, expect } from "vitest";
import { lookBackDateClean, resolvePollingRecordChanges } from "./polling";
describe("resolvePollingRecordChanges", () => {
  test("returns empty array for undefined input", () => {
    expect(resolvePollingRecordChanges(undefined)).toEqual([]);
  });
  test("returns empty array when updated is empty", () => {
    expect(resolvePollingRecordChanges({ updated: [] })).toEqual([]);
  });
  test("maps updated records with changeType updated", () => {
    const result = resolvePollingRecordChanges({
      updated: [{ ContactKey: "abc", FullName: "John" }],
    });
    expect(result).toEqual([
      {
        changeType: "updated",
        record: { ContactKey: "abc", FullName: "John" },
      },
    ]);
  });
  test("handles missing updated key gracefully", () => {
    const result = resolvePollingRecordChanges(
      {} as {
        updated: unknown[];
      },
    );
    expect(result).toEqual([]);
  });
});
describe("lookBackDateClean", () => {
  test("returns empty string for empty input", () => {
    expect(lookBackDateClean("")).toBe("");
  });
  test("returns valid date as-is", () => {
    expect(lookBackDateClean("2025-06-15")).toBe("2025-06-15");
  });
  test("throws on invalid format", () => {
    expect(() => lookBackDateClean("15/06/2025")).toThrow("YYYY-MM-DD");
  });
  test("throws on invalid calendar date", () => {
    expect(() => lookBackDateClean("2025-02-30")).toThrow(
      "not a valid calendar date",
    );
  });
  test("throws on future date", () => {
    expect(() => lookBackDateClean("2099-01-01")).toThrow("future date");
  });
});
