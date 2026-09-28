import { pollChangesInputs } from "./triggers";
describe("triggers inputs (pollChangesInputs): happy-path normalization", () => {
  test.each<
    [string, ((value: unknown) => unknown) | undefined, unknown, unknown]
  >([
    [
      "pollResourceType",
      pollChangesInputs.pollResourceType.clean,
      "orders",
      "orders",
    ],
    [
      "showNewRecords (true)",
      pollChangesInputs.showNewRecords.clean,
      "true",
      true,
    ],
    [
      "showNewRecords (false)",
      pollChangesInputs.showNewRecords.clean,
      "false",
      false,
    ],
    [
      "showUpdatedRecords (true)",
      pollChangesInputs.showUpdatedRecords.clean,
      "true",
      true,
    ],
    [
      "showUpdatedRecords (false)",
      pollChangesInputs.showUpdatedRecords.clean,
      "false",
      false,
    ],
  ])("%s.clean normalizes a valid value", (_label, clean, raw, expected) => {
    expect(clean?.(raw)).toEqual(expected);
  });
});
describe("lookBackDate.clean", () => {
  const clean = pollChangesInputs.lookBackDate.clean;
  test("normalizes a valid YYYY-MM-DD date to an ISO instant", () => {
    expect(clean?.("2026-01-01")).toBe("2026-01-01T00:00:00.000Z");
  });
  test.each([
    ["undefined", undefined],
    ["null", null],
    ["an empty string", ""],
  ])("resolves %s to undefined (no backfill)", (_label, raw) => {
    expect(clean?.(raw)).toBeUndefined();
  });
  test("throws on a malformed date string", () => {
    expect(() => clean?.("01-01-2026")).toThrow(/YYYY-MM-DD format/);
  });
  test("throws on a non-calendar date", () => {
    expect(() => clean?.("2026-02-30")).toThrow(/YYYY-MM-DD format/);
  });
  test("throws on a future date", () => {
    expect(() => clean?.("2999-01-01")).toThrow(/cannot be a future date/);
  });
});
