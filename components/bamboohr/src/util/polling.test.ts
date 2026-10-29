import { describe, test, expect } from "vitest";
import { lookBackDateClean, resolvePollingRecordChanges } from "./polling";
import { partitionChangedEmployees } from ".";
import type { EmployeeChange } from "../types";

const change = (
  id: string,
  action: EmployeeChange["action"],
  lastChanged: string,
): EmployeeChange => ({ id, action, lastChanged });

describe("resolvePollingRecordChanges", () => {
  test("returns empty array for undefined input", () => {
    expect(resolvePollingRecordChanges(undefined)).toEqual([]);
  });

  test("returns empty array when both arrays are empty", () => {
    expect(resolvePollingRecordChanges({ created: [], updated: [] })).toEqual(
      [],
    );
  });

  test("maps created and updated with correct changeType", () => {
    const result = resolvePollingRecordChanges({
      created: [{ id: "c1" }],
      updated: [{ id: "u1" }],
    });
    expect(result).toEqual([
      { changeType: "created", record: { id: "c1" } },
      { changeType: "updated", record: { id: "u1" } },
    ]);
  });
});

describe("partitionChangedEmployees", () => {
  test("classifies Inserted as created", () => {
    const changes = [change("1", "Inserted", "2026-01-01T00:00:00Z")];
    const { created, updated } = partitionChangedEmployees(changes);
    expect(created).toHaveLength(1);
    expect(updated).toHaveLength(0);
  });

  test("classifies Updated as updated", () => {
    const changes = [change("2", "Updated", "2026-01-01T00:00:00Z")];
    const { created, updated } = partitionChangedEmployees(changes);
    expect(created).toHaveLength(0);
    expect(updated).toHaveLength(1);
  });

  test("classifies Deleted as updated", () => {
    const changes = [change("3", "Deleted", "2026-01-01T00:00:00Z")];
    const { created, updated } = partitionChangedEmployees(changes);
    expect(created).toHaveLength(0);
    expect(updated).toHaveLength(1);
  });

  test("handles mixed actions", () => {
    const changes = [
      change("1", "Inserted", "2026-01-01T00:00:00Z"),
      change("2", "Updated", "2026-01-01T00:00:00Z"),
      change("3", "Deleted", "2026-01-01T00:00:00Z"),
    ];
    const { created, updated } = partitionChangedEmployees(changes);
    expect(created).toHaveLength(1);
    expect(updated).toHaveLength(2);
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
    expect(() => lookBackDateClean("06/15/2025")).toThrow("YYYY-MM-DD");
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
