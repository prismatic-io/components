import { describe, it, expect } from "vitest";
import { lookBackDateClean } from "./clean";

describe("lookBackDateClean", () => {
  it("returns empty string for empty input", () => {
    expect(lookBackDateClean("")).toBe("");
    expect(lookBackDateClean(null)).toBe("");
    expect(lookBackDateClean(undefined)).toBe("");
  });

  it("accepts a valid past date and trims whitespace", () => {
    expect(lookBackDateClean("2024-01-15")).toBe("2024-01-15");
    expect(lookBackDateClean("  2024-06-01  ")).toBe("2024-06-01");
  });

  it("rejects non-YYYY-MM-DD formats", () => {
    expect(() => lookBackDateClean("01/15/2024")).toThrow("YYYY-MM-DD format");
    expect(() => lookBackDateClean("2024-1-5")).toThrow("YYYY-MM-DD format");
    expect(() => lookBackDateClean("2024-01-15T10:00:00Z")).toThrow(
      "YYYY-MM-DD format",
    );
  });

  it("rejects invalid calendar dates", () => {
    expect(() => lookBackDateClean("2024-02-30")).toThrow(
      "not a valid calendar date",
    );
    expect(() => lookBackDateClean("2024-13-01")).toThrow(
      "not a valid calendar date",
    );
  });

  it("rejects future dates", () => {
    const futureYear = new Date().getFullYear() + 1;
    expect(() => lookBackDateClean(`${futureYear}-06-01`)).toThrow(
      "future date",
    );
  });
});
