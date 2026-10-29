import { DEFAULT_SORT_CRITERIA } from "../constants";
import {
  cleanBoundedCount,
  cleanKeyValueListToObject,
  cleanObjectFieldMap,
  cleanObjectSelection,
  cleanOptionalStringList,
  cleanOptionalValueList,
  cleanPicklistNone,
  cleanPicklistValues,
  cleanPicklistValuesLowercase,
  cleanPositiveInt,
  cleanSingleItemList,
  cleanSortCriteria,
  cleanStringArray,
  dynamicFieldsClean,
  fieldsInputClean,
  lookBackDateClean,
  processFilterCriteria,
  recordsInputClean,
  sanitizePrefix,
  toRequiredTrimmedString,
  validatePermissions,
} from "./cleanFunctions";

describe("recordsInputClean", () => {
  test("returns an array input unchanged", () => {
    const records = [{ Name: "Acme" }];
    expect(recordsInputClean(records)).toBe(records);
  });

  test("parses a JSON array string", () => {
    expect(recordsInputClean(' [{"Name":"Acme"}] ')).toStrictEqual([
      { Name: "Acme" },
    ]);
  });

  test("throws on a blank string", () => {
    expect(() => recordsInputClean("   ")).toThrow(
      "JSON Records input must not be empty",
    );
  });

  test("throws on a JSON object that is not an array", () => {
    expect(() => recordsInputClean('{"Name":"Acme"}')).toThrow(
      "Records must be an array of objects",
    );
  });

  test("throws on an empty JSON array", () => {
    expect(() => recordsInputClean("[]")).toThrow(
      "Records array must not be empty",
    );
  });

  test("throws on a non-string, non-array value", () => {
    expect(() => recordsInputClean(42)).toThrow(
      "Records must be an array of objects",
    );
  });
});

describe("sanitizePrefix", () => {
  test("replaces whitespace runs with underscores", () => {
    expect(sanitizePrefix("my  prefix")).toBe("my_prefix");
  });

  test("prepends A when the prefix does not start with a letter", () => {
    expect(sanitizePrefix("1abc")).toBe("A1abc");
  });

  test("truncates to 15 characters", () => {
    expect(sanitizePrefix("abcdefghijklmnopqrstuvwxyz")).toBe(
      "abcdefghijklmno",
    );
  });

  test("throws on an empty value", () => {
    expect(() => sanitizePrefix("")).toThrow(
      "Prefix must be a non-empty string.",
    );
  });
});

describe("dynamicFieldsClean", () => {
  test("returns a falsy value unchanged", () => {
    expect(dynamicFieldsClean(undefined)).toBeUndefined();
    expect(dynamicFieldsClean("")).toBe("");
  });

  test("returns a valid key/value array unchanged", () => {
    const pairs = [{ key: "Fax", value: "15554444321" }];
    expect(dynamicFieldsClean(pairs)).toBe(pairs);
  });

  test("returns the original JSON string, not the parsed array", () => {
    const json = '[{"key":"Fax","value":"15554444321"}]';
    expect(dynamicFieldsClean(json)).toBe(json);
  });

  test("throws when an item is not a key/value pair", () => {
    expect(() => dynamicFieldsClean([{ key: "Fax" }])).toThrow(
      "Each item in dynamicValues should be a key-value pair",
    );
  });
});

describe("toRequiredTrimmedString", () => {
  const clean = toRequiredTrimmedString("File ID");

  test("trims a valid value", () => {
    expect(clean("  0697000000K2g5AAAR ")).toBe("0697000000K2g5AAAR");
  });

  test.each([
    undefined,
    "",
    "   ",
  ])("throws a labelled error for %p", (value) => {
    expect(() => clean(value)).toThrow("Must specify a valid File ID");
  });
});

describe("cleanSortCriteria", () => {
  test("keeps a provided sort", () => {
    expect(cleanSortCriteria(" Name ")).toBe("Name");
  });

  test.each([
    undefined,
    "",
    "  ",
  ])("falls back to the default for %p", (value) => {
    expect(cleanSortCriteria(value)).toBe(DEFAULT_SORT_CRITERIA);
  });
});

describe("cleanPositiveInt", () => {
  test.each([
    ["1000", 1000],
    [42, 42],
    ["0", undefined],
    ["-5", undefined],
    [undefined, undefined],
    ["", undefined],
  ])("cleans %p to %p", (value, expected) => {
    expect(cleanPositiveInt(value)).toBe(expected);
  });
});

describe("cleanBoundedCount", () => {
  const clean = cleanBoundedCount(5, 20);

  test.each([
    ["10", 10],
    [20, 20],
    ["21", 5],
    ["abc", 5],
    [undefined, 5],
  ])("cleans %p to %p", (value, expected) => {
    expect(clean(value)).toBe(expected);
  });
});

describe("cleanPicklistValues / cleanPicklistValuesLowercase", () => {
  test("passes a picklist through", () => {
    expect(cleanPicklistValues(["Account", "Contact"])).toStrictEqual([
      "Account",
      "Contact",
    ]);
  });

  test("lowercases and trims", () => {
    expect(
      cleanPicklistValuesLowercase([" Account ", "CONTACT"]),
    ).toStrictEqual(["account", "contact"]);
  });

  test.each([
    undefined,
    "Account",
    3,
  ])("falls back to an empty list for %p", (value) => {
    expect(cleanPicklistValues(value)).toStrictEqual([]);
    expect(cleanPicklistValuesLowercase(value)).toStrictEqual([]);
  });
});

describe("cleanObjectFieldMap / cleanObjectSelection", () => {
  test("returns a valid object field map", () => {
    const map = { fields: [{ field: { key: "Name", label: "Name" } }] };
    expect(cleanObjectFieldMap(map)).toStrictEqual(map);
  });

  test("throws a labelled error for an invalid object field map", () => {
    expect(() => cleanObjectFieldMap("not a map")).toThrow(
      "Must specify valid value for Mapping Fields",
    );
  });

  test("returns a valid object selection", () => {
    const selection = [{ object: { key: "Account" } }];
    expect(cleanObjectSelection(selection)).toStrictEqual(selection);
  });

  test("throws a labelled error for an invalid object selection", () => {
    expect(() => cleanObjectSelection("not a selection")).toThrow(
      "Must specify valid value for Selected Record Types",
    );
  });
});

describe("cleanSingleItemList / cleanStringArray", () => {
  test("wraps a single value in a list", () => {
    expect(cleanSingleItemList("Widget__c")).toStrictEqual(["Widget__c"]);
  });

  test("parses a JSON array", () => {
    expect(cleanStringArray('["A__c","B__c"]')).toStrictEqual(["A__c", "B__c"]);
  });
});

describe("cleanPicklistNone", () => {
  test.each([
    ["none", undefined],
    ["NONE", undefined],
    ["", undefined],
    [undefined, undefined],
    [" Warm ", "Warm"],
  ])("cleans %p to %p", (value, expected) => {
    expect(cleanPicklistNone(value)).toBe(expected);
  });
});

describe("cleanOptionalValueList", () => {
  test("returns the list of strings", () => {
    expect(cleanOptionalValueList(["Account.MyMessage"])).toStrictEqual([
      "Account.MyMessage",
    ]);
  });

  test.each<unknown>([
    undefined,
    null,
    [],
    [""],
  ])("returns undefined for empty %p", (value) => {
    expect(cleanOptionalValueList(value)).toBeUndefined();
  });
});

describe("cleanOptionalStringList", () => {
  test("returns an array as strings", () => {
    expect(cleanOptionalStringList(["Name", 5])).toStrictEqual(["Name", "5"]);
  });

  test.each([
    undefined,
    null,
    "Name",
  ])("returns undefined for non-array %p", (value) => {
    expect(cleanOptionalStringList(value)).toBeUndefined();
  });
});

describe("cleanKeyValueListToObject", () => {
  test("converts a key-value list", () => {
    expect(
      cleanKeyValueListToObject([
        { key: "Name", value: "string" },
        { key: "Count", value: "number" },
      ]),
    ).toStrictEqual({ Name: "string", Count: "number" });
  });

  test.each<unknown>([
    undefined,
    null,
    [],
  ])("returns an empty object for %p", (value) => {
    expect(cleanKeyValueListToObject(value)).toStrictEqual({});
  });
});

describe("processFilterCriteria", () => {
  test("parses a JSON array", () => {
    const criteria = [
      { field: "Account.Name", operation: "equals", value: "Acme" },
    ];
    expect(processFilterCriteria(JSON.stringify(criteria))).toStrictEqual(
      criteria,
    );
  });

  test.each([undefined, ""])("returns an empty list for %p", (value) => {
    expect(processFilterCriteria(value)).toStrictEqual([]);
  });

  test("throws for non-JSON", () => {
    expect(() => processFilterCriteria("nope")).toThrow(
      "Filter Criteria must be specified as JSON.",
    );
  });

  test("throws for a JSON object", () => {
    expect(() => processFilterCriteria('{"a":1}')).toThrow(
      "Filter Criteria must be a list of objects.",
    );
  });
});

describe("validatePermissions", () => {
  test("returns a boolean map", () => {
    expect(validatePermissions({ PermissionsApiEnabled: true })).toStrictEqual({
      PermissionsApiEnabled: true,
    });
  });

  test.each([undefined, null])("returns undefined for %p", (value) => {
    expect(validatePermissions(value)).toBeUndefined();
  });

  test("throws for a non-object", () => {
    expect(() => validatePermissions("yes")).toThrow(
      "Invalid permissions value provided.",
    );
  });

  test("throws for a non-boolean value", () => {
    expect(() =>
      validatePermissions({ PermissionsApiEnabled: "true" }),
    ).toThrow("All permission values must be booleans.");
  });
});

describe("fieldsInputClean", () => {
  test("returns an array unchanged", () => {
    expect(fieldsInputClean(["Name", "Phone"])).toStrictEqual([
      "Name",
      "Phone",
    ]);
  });

  test("parses a JSON array string", () => {
    expect(fieldsInputClean('["Name","Phone"]')).toStrictEqual([
      "Name",
      "Phone",
    ]);
  });

  test.each([undefined, ""])("returns undefined for %p", (value) => {
    expect(fieldsInputClean(value)).toBeUndefined();
  });

  test.each([
    '{"Name":true}',
    "Name, Phone",
    42,
  ])("throws for malformed %p", (value) => {
    expect(() => fieldsInputClean(value)).toThrow(
      "Fields must be an array of strings.",
    );
  });
});

describe("lookBackDateClean", () => {
  test("converts a past date to ISO", () => {
    expect(lookBackDateClean("2026-01-15")).toBe("2026-01-15T00:00:00.000Z");
  });

  test("returns an empty string for blank", () => {
    expect(lookBackDateClean("  ")).toBe("");
  });

  test("rejects a non-calendar date", () => {
    expect(() => lookBackDateClean("2026-02-31")).toThrow("YYYY-MM-DD");
  });

  test("rejects a non-string value and reports it", () => {
    expect(() => lookBackDateClean(20260115)).toThrow("Received: 20260115");
  });
});
