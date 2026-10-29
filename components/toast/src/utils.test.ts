import { lookBackDateClean } from "./utils";

describe("lookBackDateClean", () => {
  test("valid YYYY-MM-DD string returns an ISO 8601 UTC string", () => {
    expect(lookBackDateClean("2025-06-15")).toBe("2025-06-15T00:00:00.000Z");
  });

  test("empty string returns empty string", () => {
    expect(lookBackDateClean("")).toBe("");
  });

  test("null returns empty string", () => {
    expect(lookBackDateClean(null)).toBe("");
  });

  test("undefined returns empty string", () => {
    expect(lookBackDateClean(undefined)).toBe("");
  });

  test("whitespace-only string returns empty string", () => {
    expect(lookBackDateClean("   ")).toBe("");
  });

  test("invalid format throws with a message naming Look-back Date", () => {
    expect(() => lookBackDateClean("not-a-date")).toThrow("Look-back Date");
    expect(() => lookBackDateClean("15-06-2025")).toThrow("Look-back Date");
    expect(() => lookBackDateClean("2025/06/15")).toThrow("Look-back Date");
  });

  test("non-calendar date (2026-02-31) throws with a message naming Look-back Date", () => {
    expect(() => lookBackDateClean("2026-02-31")).toThrow("Look-back Date");
  });

  test("future date throws with a message naming Look-back Date", () => {
    expect(() => lookBackDateClean("2099-12-31")).toThrow(
      "Look-back Date cannot be a future date",
    );
  });
});
