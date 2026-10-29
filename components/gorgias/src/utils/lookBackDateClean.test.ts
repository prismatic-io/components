import { lookBackDateClean } from "./lookBackDateClean";

describe("lookBackDateClean", () => {
  it("returns an empty string for an empty value", () => {
    expect(lookBackDateClean("")).toBe("");
    expect(lookBackDateClean(undefined)).toBe("");
  });

  it("normalizes a valid date to 00:00:00 UTC", () => {
    expect(lookBackDateClean("2026-01-01")).toBe("2026-01-01T00:00:00.000Z");
  });

  it("rejects a malformed date", () => {
    expect(() => lookBackDateClean("01/01/2026")).toThrow("Look-back Date");
  });

  it("rejects a non-calendar date", () => {
    expect(() => lookBackDateClean("2026-02-31")).toThrow("Look-back Date");
  });

  it("rejects a future date", () => {
    expect(() => lookBackDateClean("2999-01-01")).toThrow("future date");
  });
});
