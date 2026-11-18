import {
  createApplicationInputs,
  deleteApplicationInputs,
  getApplicationInputs,
} from "./application";

type Clean = (value: unknown) => unknown;

describe.each<[string, Clean]>([
  ["displayName", createApplicationInputs.displayName.clean],
  [
    "deleteApplication applicationObjectId",
    deleteApplicationInputs.applicationObjectId.clean,
  ],
  [
    "getApplication applicationObjectId",
    getApplicationInputs.applicationObjectId.clean,
  ],
])("%s.clean", (_name, clean) => {
  test("returns the value as a string", () => {
    expect(clean("03ef14b0-ca33-4840-8f4f-d6e91916010e")).toBe(
      "03ef14b0-ca33-4840-8f4f-d6e91916010e",
    );
  });

  test("coerces an empty value to an empty string instead of throwing", () => {
    expect(clean(undefined)).toBe("");
  });
});
