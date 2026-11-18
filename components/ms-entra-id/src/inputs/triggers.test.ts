import { groupTriggerInputs, userTriggerInputs } from "./triggers";

describe.each([
  ["userTrigger", userTriggerInputs],
  ["groupTrigger", groupTriggerInputs],
])("%s inputs", (_name, inputs) => {
  describe("changeType.clean", () => {
    const { clean } = inputs.changeType;

    test("joins the selected values and drops duplicates", () => {
      expect(clean(["updated", "deleted", "updated"])).toBe("updated,deleted");
    });

    test("throws when no value is selected", () => {
      expect(() => clean([])).toThrow(
        "Change type input must have at least one value.",
      );
    });

    test("throws when the value is not a list", () => {
      expect(() => clean("updated")).toThrow("Invalid change type input.");
    });
  });

  describe("expirationTriggerDateTime.clean", () => {
    const { clean } = inputs.expirationTriggerDateTime;

    test("returns the date as a string", () => {
      expect(clean("2026-12-01T00:00:00.0000000Z")).toBe(
        "2026-12-01T00:00:00.0000000Z",
      );
    });

    test("returns undefined for an empty value so the 29-day default applies", () => {
      expect(clean("")).toBeUndefined();
      expect(clean(undefined)).toBeUndefined();
    });
  });
});
