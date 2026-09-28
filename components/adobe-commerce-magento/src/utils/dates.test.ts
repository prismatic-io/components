import { toMagentoDateTime } from "./dates";
describe("toMagentoDateTime", () => {
  test.each<[string, string, string]>([
    [
      "an instant with milliseconds",
      "2026-05-26T15:00:00.000Z",
      "2026-05-26 15:00:00",
    ],
    [
      "an instant without milliseconds",
      "2026-05-26T15:00:00Z",
      "2026-05-26 15:00:00",
    ],
    [
      "an instant with no zone marker",
      "2026-05-26T15:00:00",
      "2026-05-26 15:00:00",
    ],
    ["midnight", "2020-01-01T00:00:00.000Z", "2020-01-01 00:00:00"],
  ])("converts %s", (_label, iso, expected) => {
    expect(toMagentoDateTime(iso)).toBe(expected);
  });
});
