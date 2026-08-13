import { createRecordInputs, getRecordByIdInputs } from "./records";
const recordIdClean = getRecordByIdInputs.id.clean;
const externalIdClean = createRecordInputs.externalId.clean;
describe("recordId.clean", () => {
  test("coerces a numeric string to a number", () => {
    expect(recordIdClean("25")).toBe(25);
  });
  test("throws on a non-numeric value", () => {
    expect(() => recordIdClean("abc")).toThrow(
      "Value 'abc' cannot be coerced to a number.",
    );
  });
});
describe("externalId.clean (optional variant)", () => {
  test("coerces a provided value to a string", () => {
    expect(externalIdClean("custom_partner.abc_123")).toBe(
      "custom_partner.abc_123",
    );
  });
  test("returns undefined for a blank value", () => {
    expect(externalIdClean("")).toBeUndefined();
    expect(externalIdClean(undefined)).toBeUndefined();
  });
  test("never throws, whatever it is handed", () => {
    expect(() => externalIdClean("not-a-module-dot-name")).not.toThrow();
    expect(externalIdClean("not-a-module-dot-name")).toBe(
      "not-a-module-dot-name",
    );
  });
});
