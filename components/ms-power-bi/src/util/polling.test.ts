import { describe, test, expect } from "vitest";
import { lookBackDateClean, resolvePollingRecordChanges } from "./polling";
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
describe("resolvePollingRecordChanges", () => {
  test("returns empty array for undefined input", () => {
    expect(resolvePollingRecordChanges(undefined)).toEqual([]);
  });
  test("returns empty array when both arrays are empty", () => {
    expect(resolvePollingRecordChanges({ created: [], updated: [] })).toEqual(
      [],
    );
  });
  test("maps created records with changeType created", () => {
    const result = resolvePollingRecordChanges({
      created: [{ id: "ds-1", name: "Sales" }],
      updated: [],
    });
    expect(result).toEqual([
      { changeType: "created", record: { id: "ds-1", name: "Sales" } },
    ]);
  });
  test("maps updated records with changeType updated", () => {
    const result = resolvePollingRecordChanges({
      created: [],
      updated: [{ id: "ds-2", name: "Marketing" }],
    });
    expect(result).toEqual([
      { changeType: "updated", record: { id: "ds-2", name: "Marketing" } },
    ]);
  });
  test("created records come before updated records", () => {
    const result = resolvePollingRecordChanges({
      created: [{ id: "c1" }],
      updated: [{ id: "u1" }],
    });
    expect(result).toHaveLength(2);
    expect(result[0].changeType).toBe("created");
    expect(result[1].changeType).toBe("updated");
  });
});
