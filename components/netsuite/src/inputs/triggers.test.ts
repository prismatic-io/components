import { pollRecordsInputs } from "./triggers";

describe("New and Updated Records Record Type input", () => {
  test("accepts a standard record type", () => {
    expect(pollRecordsInputs.recordType.clean?.("customer")).toBe("customer");
  });

  test("rejects a custom record type the trigger's date fields do not cover", () => {
    expect(() =>
      pollRecordsInputs.recordType.clean?.("customrecord_milestone"),
    ).toThrow("Unexpected Record Type: customrecord_milestone");
  });
});
