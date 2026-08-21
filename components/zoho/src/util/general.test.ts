import { toZohoTimestamp } from "./general";
describe("toZohoTimestamp", () => {
  test("normalizes an ISO UTC (Z) input to the Zoho +00:00 offset form", () => {
    expect(toZohoTimestamp("2024-01-15T14:22:10Z")).toBe(
      "2024-01-15T14:22:10+00:00",
    );
  });
  test("drops milliseconds / sub-seconds", () => {
    expect(toZohoTimestamp("2024-01-15T14:22:10.123Z")).toBe(
      "2024-01-15T14:22:10+00:00",
    );
  });
  test("normalizes a non-UTC offset to UTC (+8h shift for -08:00)", () => {
    expect(toZohoTimestamp("2024-01-15T10:30:00-08:00")).toBe(
      "2024-01-15T18:30:00+00:00",
    );
  });
});
