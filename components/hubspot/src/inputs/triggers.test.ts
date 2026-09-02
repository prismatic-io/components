import { lookBackDate } from "./triggers";
const clean = (value: unknown) =>
  (lookBackDate.clean as (v: unknown) => string)(value);
describe("lookBackDate", () => {
  test("is optional, so an existing flow needs no reconfiguration", () => {
    expect(lookBackDate.required).toBe(false);
  });
  test("advertises the accepted format", () => {
    expect(lookBackDate.placeholder).toBe("Enter look-back date (YYYY-MM-DD)");
    expect(lookBackDate.example).toBe("2026-01-01");
  });
  test("treats blank, whitespace, and absent as no initial sync", () => {
    expect(clean("")).toBe("");
    expect(clean("   ")).toBe("");
    expect(clean(undefined)).toBe("");
    expect(clean(null)).toBe("");
  });
  test("normalizes a past YYYY-MM-DD to UTC midnight", () => {
    expect(clean("2026-01-01")).toBe("2026-01-01T00:00:00.000Z");
    expect(clean(" 2026-01-01 ")).toBe("2026-01-01T00:00:00.000Z");
  });
  test.each([
    "2026-01-01T00:00:00Z",
    "2026-1-1",
    "01/01/2026",
    "last tuesday",
    "20260101",
  ])("rejects %s — only YYYY-MM-DD is accepted", (value) => {
    expect(() => clean(value)).toThrow(/YYYY-MM-DD format/);
  });
  test("rejects a date that does not exist on the calendar", () => {
    expect(() => clean("2026-02-31")).toThrow(/YYYY-MM-DD format/);
    expect(() => clean("2026-13-01")).toThrow(/YYYY-MM-DD format/);
  });
  test("rejects non-string values rather than stringifying them", () => {
    expect(() => clean(1767225600000)).toThrow(/YYYY-MM-DD format/);
    expect(() => clean(new Date("2026-01-01"))).toThrow(/YYYY-MM-DD format/);
  });
  test("rejects a future date", () => {
    const future = new Date(Date.now() + 86400000).toISOString().slice(0, 10);
    expect(() => clean(future)).toThrow(/cannot be a future date/);
  });
});
