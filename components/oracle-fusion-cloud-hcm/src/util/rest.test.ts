import { lookBackDateClean } from "./rest";
describe("lookBackDateClean", () => {
  test("returns empty string for empty input", () => {
    expect(lookBackDateClean("")).toBe("");
    expect(lookBackDateClean("  ")).toBe("");
  });
  test("returns full ISO instant for a valid YYYY-MM-DD date", () => {
    expect(lookBackDateClean("2025-06-15")).toBe("2025-06-15T00:00:00.000Z");
  });
  test("trims whitespace before processing", () => {
    expect(lookBackDateClean("  2025-01-01  ")).toBe(
      "2025-01-01T00:00:00.000Z",
    );
  });
  test("throws for invalid format", () => {
    expect(() => lookBackDateClean("06-15-2025")).toThrow("YYYY-MM-DD format");
    expect(() => lookBackDateClean("not-a-date")).toThrow("YYYY-MM-DD format");
  });
  test("throws for an invalid calendar date", () => {
    expect(() => lookBackDateClean("2025-02-30")).toThrow(
      "not a valid calendar date",
    );
  });
  test("throws for a future date", () => {
    expect(() => lookBackDateClean("2099-01-01")).toThrow(
      "cannot be a future date",
    );
  });
});
