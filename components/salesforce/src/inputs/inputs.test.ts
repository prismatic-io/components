import { dynamicRecordType, recordType } from "./common";
import {
  dynamicFieldName,
  includeOnlyTopLevelRecordTypes,
} from "./dataSources";
import { rating } from "./fields";
import { fileId } from "./files";

const cleanOf = (input: { clean?: (value: unknown) => unknown }) => {
  if (!input.clean) throw new Error("input has no clean function");
  return input.clean;
};

describe.each([
  ["recordType", recordType, "Must specify a valid Record Type"],
  ["dynamicRecordType", dynamicRecordType, "Must specify a valid Record Type"],
  ["dynamicFieldName", dynamicFieldName, "Must specify a valid Field Name"],
  ["fileId", fileId, "Must specify a valid File ID"],
])("%s.clean", (_name, input, message) => {
  test("trims a valid value", () => {
    expect(cleanOf(input)("  Account  ")).toBe("Account");
  });

  test("throws on a blank value", () => {
    expect(() => cleanOf(input)("   ")).toThrow(message);
  });

  test("throws on an undefined value", () => {
    expect(() => cleanOf(input)(undefined)).toThrow(message);
  });
});

describe("rating.clean", () => {
  test.each([
    ["none", undefined],
    ["", undefined],
    [undefined, undefined],
    ["Hot", "Hot"],
  ])("cleans %p to %p", (value, expected) => {
    expect(cleanOf(rating)(value)).toBe(expected);
  });
});

describe("includeOnlyTopLevelRecordTypes.clean", () => {
  test.each([
    [undefined, false],
    ["", false],
    [null, false],
    ["false", false],
    ["true", true],
  ])("cleans %p to %p", (value, expected) => {
    expect(cleanOf(includeOnlyTopLevelRecordTypes)(value)).toBe(expected);
  });
});
