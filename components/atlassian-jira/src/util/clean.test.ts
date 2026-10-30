import {
  ARRAY_ERROR_MESSAGE,
  EMPTY_ARRAY_ERROR_MESSAGE,
  EMPTY_INPUT_ERROR_MESSAGE,
} from "../constants";
import {
  cleanAttachmentArray,
  cleanCodeInput,
  dynamicFieldsClean,
  fieldValuesClean,
  labelsClean,
  projectIdsClean,
  recordsInputClean,
  toAllowedValue,
  toOptionalBool,
  toOptionalNumber,
  toPageSize,
  toOptionalObject,
  toOptionalString,
  toTrimmedLowerCase,
} from "./clean";

describe("projectIdsClean", () => {
  test("wraps a scalar value", () => {
    expect(projectIdsClean(10201)).toEqual([{ projectId: "10201" }]);
  });

  test("maps an object selection to ids and names", () => {
    expect(
      projectIdsClean([
        { object: { key: "10000", label: "Foo" } },
        { object: { key: "10002", label: "Baz" } },
      ]),
    ).toEqual([
      { projectId: "10000", projectName: "Foo" },
      { projectId: "10002", projectName: "Baz" },
    ]);
  });

  test("stringifies each value of a plain list", () => {
    expect(projectIdsClean([10000, "10001"])).toEqual([
      { projectId: "10000" },
      { projectId: "10001" },
    ]);
  });
});

describe("labelsClean", () => {
  test("stringifies each label", () => {
    expect(labelsClean(["bug", 7])).toEqual(["bug", "7"]);
  });

  test.each([
    [[]],
    ["bug"],
    [undefined],
  ])("returns undefined for %j", (value) => {
    expect(labelsClean(value)).toBeUndefined();
  });
});

describe("recordsInputClean", () => {
  test("parses a JSON array of records", () => {
    expect(recordsInputClean(' [{"a":"1"}] ')).toEqual([{ a: "1" }]);
  });

  test("returns undefined for an empty value", () => {
    expect(recordsInputClean("")).toBeUndefined();
  });

  test.each([
    ["   ", EMPTY_INPUT_ERROR_MESSAGE],
    ['{"a":"1"}', ARRAY_ERROR_MESSAGE],
    ["[]", EMPTY_ARRAY_ERROR_MESSAGE],
  ])("throws for %j", (value, message) => {
    expect(() => recordsInputClean(value)).toThrow(message);
  });
});

describe("dynamicFieldsClean", () => {
  test("returns the value unchanged when every item is a key/value pair", () => {
    const value = '[{"key":"name","value":"Example"}]';
    expect(dynamicFieldsClean(value)).toBe(value);
  });

  test("returns undefined for an empty value", () => {
    expect(dynamicFieldsClean("")).toBeUndefined();
  });

  test("throws when an item is not a key/value pair", () => {
    expect(() => dynamicFieldsClean('[{"key":"name"}]')).toThrow(
      "Each item in dynamicValues should be a key-value pair",
    );
  });
});

describe("fieldValuesClean", () => {
  test("turns key/value pairs into an object", () => {
    expect(
      fieldValuesClean(
        '[{"key":"name","value":"Example"},{"key":"projectId","value":"10000"}]',
      ),
    ).toEqual({ name: "Example", projectId: "10000" });
  });

  test.each([
    ["an empty value", "   ", EMPTY_INPUT_ERROR_MESSAGE],
    ["a non-array", '{"key":"name","value":"Example"}', ARRAY_ERROR_MESSAGE],
    [
      "a missing key",
      '[{"value":"Example"}]',
      "Each item in dynamicValues should be a key-value pair",
    ],
  ])("throws for %s", (_label, value, message) => {
    expect(() => fieldValuesClean(value)).toThrow(message);
  });

  test("returns an empty object for no value", () => {
    expect(fieldValuesClean(undefined)).toEqual({});
  });
});

describe("cleanCodeInput", () => {
  test("parses a JSON array", () => {
    expect(cleanCodeInput('["a","b"]')).toEqual(["a", "b"]);
  });

  test("returns undefined for an empty value", () => {
    expect(cleanCodeInput("")).toBeUndefined();
  });

  test("throws for a non-array", () => {
    expect(() => cleanCodeInput('{"a":1}')).toThrow(
      "The input must be an array of strings",
    );
  });
});

describe("cleanAttachmentArray", () => {
  test("passes attachments that carry an id and a mimeType", () => {
    const attachments = [{ id: "10000", mimeType: "image/png" }];
    expect(cleanAttachmentArray(JSON.stringify(attachments))).toEqual(
      attachments,
    );
  });

  test("returns undefined for an empty value", () => {
    expect(cleanAttachmentArray("")).toBeUndefined();
  });

  test("throws for a non-array", () => {
    expect(() => cleanAttachmentArray('{"id":"10000"}')).toThrow(
      "The input must be an array of strings",
    );
  });

  test.each([
    [{ mimeType: "image/png" }],
    [{ id: "10000" }],
  ])("throws when an attachment is missing a property: %j", (attachment) => {
    expect(() => cleanAttachmentArray([attachment])).toThrow(
      "Each attachment object must have an 'id' and a 'mimeType' property",
    );
  });
});

describe("optional and normalizing cleans", () => {
  test.each([
    ["toOptionalString", toOptionalString(42), "42"],
    ["toOptionalString (empty)", toOptionalString(""), undefined],
    ["toOptionalObject", toOptionalObject('{"a":1}'), { a: 1 }],
    ["toOptionalObject (empty)", toOptionalObject(""), undefined],
    ["toOptionalNumber", toOptionalNumber("12"), 12],
    ["toOptionalNumber (empty)", toOptionalNumber(""), undefined],
    ["toTrimmedLowerCase", toTrimmedLowerCase("  PROJ-1 "), "proj-1"],
    ["toOptionalBool", toOptionalBool("true"), true],
    ["toOptionalBool (false)", toOptionalBool("false"), undefined],
    ["toOptionalBool (empty)", toOptionalBool(""), undefined],
    ["toPageSize", toPageSize("25", 50), 25],
    ["toPageSize (empty)", toPageSize("", 50), 50],
    ["toPageSize (zero)", toPageSize("0", 50), 50],
    ["toPageSize (negative)", toPageSize(-5, 50), 50],
  ])("%s", (_label, actual, expected) => {
    expect(actual).toEqual(expected);
  });

  test("toOptionalNumber treats 0 as absent", () => {
    expect(toOptionalNumber(0)).toBeUndefined();
  });
});

describe("toAllowedValue", () => {
  test("returns an allowed value", () => {
    expect(toAllowedValue("key", ["name", "key"], "Search Type")).toBe("key");
  });

  test("throws for a value that is not allowed", () => {
    expect(() => toAllowedValue("id", ["name", "key"], "Search Type")).toThrow(
      "Invalid Search Type provided: id",
    );
  });
});
