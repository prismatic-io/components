import { folderPollingTriggerInputs } from "./triggers";

describe("includeSubfolders", () => {
  const { includeSubfolders } = folderPollingTriggerInputs;

  test("coerces true/false strings and treats blank as false", () => {
    expect(includeSubfolders.clean?.("true")).toBe(true);
    expect(includeSubfolders.clean?.(true)).toBe(true);
    expect(includeSubfolders.clean?.("false")).toBe(false);
    expect(includeSubfolders.clean?.("")).toBe(false);
  });
});
