import { describe, test, expect } from "vitest";
import { lookBackDateClean, resolvePollingRecordChanges } from "./polling";
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
      created: [{ Id: "61", DisplayName: "Acme" }],
      updated: [{ Id: "55", DisplayName: "Fabrikam" }],
    });
    expect(result).toEqual([
      { changeType: "created", record: { Id: "61", DisplayName: "Acme" } },
      { changeType: "updated", record: { Id: "55", DisplayName: "Fabrikam" } },
    ]);
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
