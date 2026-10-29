import { describe, test, expect } from "vitest";
import { lookBackDateClean, resolvePollingRecordChanges } from "./index";

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

  test("returns empty array when both created and updated are empty", () => {
    expect(resolvePollingRecordChanges({ created: [], updated: [] })).toEqual(
      [],
    );
  });

  test("maps created records with changeType created", () => {
    const result = resolvePollingRecordChanges({
      created: [{ id: "1" }],
      updated: [],
    });
    expect(result).toEqual([{ changeType: "created", record: { id: "1" } }]);
  });

  test("maps updated records with changeType updated", () => {
    const result = resolvePollingRecordChanges({
      created: [],
      updated: [{ id: "2" }],
    });
    expect(result).toEqual([{ changeType: "updated", record: { id: "2" } }]);
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

  test("handles missing created key gracefully", () => {
    const result = resolvePollingRecordChanges({
      updated: [{ id: "u1" }],
    } as { created: unknown[]; updated: unknown[] });
    expect(result).toEqual([{ changeType: "updated", record: { id: "u1" } }]);
  });
});
