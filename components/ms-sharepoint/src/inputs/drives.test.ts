import {
  getFilesFromDriveWithPaginationInputs,
  listChangesInputs,
  listDrivesInputs,
} from "./drives";

const { $select, $expand, $top } = listChangesInputs.queryParameters.inputs;
const { pageLimit, pageToken } = listDrivesInputs.pagination.inputs;

describe("queryParameters $top", () => {
  test("turns a numeric string into a number and a blank value into undefined", () => {
    expect($top.clean?.("5")).toBe(5);
    expect($top.clean?.("")).toBeUndefined();
    expect($top.clean?.(undefined)).toBeUndefined();
  });

  test("rejects a value that is not a number", () => {
    expect(() => $top.clean?.("five")).toThrow("Value 'five' cannot be coerced to a number.");
  });
});

describe("queryParameters $select and $expand", () => {
  test.each([
    ["$select", $select, "id,name"],
    ["$expand", $expand, "children"],
  ])("%s keeps a value and turns a blank one into undefined", (_key, definition, value) => {
    expect(definition.clean?.(value)).toBe(value);
    expect(definition.clean?.("")).toBeUndefined();
    expect(definition.clean?.(undefined)).toBeUndefined();
  });
});

describe("pagination pageLimit", () => {
  test("turns a numeric string into a number and a blank value into 0", () => {
    expect(pageLimit.clean?.("100")).toBe(100);
    expect(pageLimit.clean?.("")).toBe(0);
  });

  test("rejects a value that is not a number", () => {
    expect(() => pageLimit.clean?.("ten")).toThrow("Value 'ten' cannot be coerced to a number.");
  });
});

describe("pagination pageToken", () => {
  test("keeps a token and turns a blank one into undefined", () => {
    expect(pageToken.clean?.("X%2744537079ghv")).toBe("X%2744537079ghv");
    expect(pageToken.clean?.("")).toBeUndefined();
  });
});

describe("boolean drive inputs", () => {
  test.each([
    ["fetchAll", listDrivesInputs.fetchAll],
    ["recursive", getFilesFromDriveWithPaginationInputs.recursive],
  ])("%s coerces true/false strings and treats blank as false", (_key, definition) => {
    expect(definition.clean?.("true")).toBe(true);
    expect(definition.clean?.(true)).toBe(true);
    expect(definition.clean?.("false")).toBe(false);
    expect(definition.clean?.("")).toBe(false);
  });
});
