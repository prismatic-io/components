import { pollChangesInputs } from "./polling";

describe("pollResourceType clean", () => {
  const clean = pollChangesInputs.pollResourceType.clean;

  test("returns the resource type as a string", () => {
    expect(clean("changeOrders")).toBe("changeOrders");
  });

  test("returns an empty string for an empty value", () => {
    expect(clean("")).toBe("");
  });
});

describe.each([
  ["showNewRecords", pollChangesInputs.showNewRecords.clean],
  ["showUpdatedRecords", pollChangesInputs.showUpdatedRecords.clean],
])("%s clean", (_, clean) => {
  test.each([
    ["true", true],
    ["false", false],
    ["", false],
    [undefined, false],
    ["maybe", true],
  ])("converts %j to %s", (value, expected) => {
    expect(clean(value)).toBe(expected);
  });
});
