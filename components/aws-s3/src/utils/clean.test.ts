import {
  cleanString,
  getObjectAttributes,
  getObjectIdentifiers,
  lookBackDateClean,
  toBufferFromData,
  toKeyValuePairList,
  toObjectCannedACL,
  toObjectLockRetentionMode,
  toPartList,
  toPositiveInt,
  toTrimmedStringArray,
} from "./clean";
describe("cleanString", () => {
  test.each([
    [" abc ", "abc"],
    ["AMn71WZYnWqbvfy0unBOdtaBC.DRiN_r", "AMn71WZYnWqbvfy0unBOdtaBC.DRiN_r"],
    [42, "42"],
  ])("normalizes %j to %j", (value, expected) => {
    expect(cleanString(value)).toBe(expected);
  });
  test.each([
    [""],
    ["   "],
    [undefined],
    [null],
  ])("returns undefined for blank value %j", (value) => {
    expect(cleanString(value)).toBeUndefined();
  });
});
describe("toPositiveInt", () => {
  test.each([
    ["10", 10],
    [" 3 ", 3],
    [7, 7],
  ])("converts %j to %j", (value, expected) => {
    expect(toPositiveInt(value, 5)).toBe(expected);
  });
  test.each([
    [""],
    [undefined],
    [null],
  ])("returns the fallback for blank value %j", (value) => {
    expect(toPositiveInt(value, 5)).toBe(5);
  });
  test.each([
    ["abc"],
    ["0"],
    ["-2"],
    ["1.5"],
    ["10abc"],
  ])("throws for %j", (value) => {
    expect(() => toPositiveInt(value, 5)).toThrow(
      "must be a whole number greater than 0",
    );
  });
});
describe("toTrimmedStringArray", () => {
  test("trims every item and coerces non-strings", () => {
    expect(
      toTrimmedStringArray([" s3:ObjectCreated:* ", "s3:ObjectRemoved:*", 7]),
    ).toEqual(["s3:ObjectCreated:*", "s3:ObjectRemoved:*", "7"]);
  });
  test("throws a TypeError for a non-array value", () => {
    expect(() => toTrimmedStringArray("s3:ObjectCreated:*")).toThrow(TypeError);
  });
});
describe("toObjectCannedACL", () => {
  test("passes a canned ACL through as a string", () => {
    expect(toObjectCannedACL("bucket-owner-full-control")).toBe(
      "bucket-owner-full-control",
    );
  });
  test("passes the blank BUCKET DEFAULT option through as an empty string", () => {
    expect(toObjectCannedACL("")).toBe("");
  });
  test("does not validate the value (characterized coercion)", () => {
    expect(toObjectCannedACL("not-an-acl")).toBe("not-an-acl");
  });
});
describe("toObjectLockRetentionMode", () => {
  test("passes a retention mode through as a string", () => {
    expect(toObjectLockRetentionMode("COMPLIANCE")).toBe("COMPLIANCE");
  });
  test("does not validate the value (characterized coercion)", () => {
    expect(toObjectLockRetentionMode("FOREVER")).toBe("FOREVER");
  });
});
describe("toBufferFromData", () => {
  test("unwraps the buffer from a data payload", () => {
    const data = Buffer.from("chunk");
    expect(
      toBufferFromData({ data, contentType: "application/octet-stream" }),
    ).toBe(data);
  });
  test("returns a bare buffer unchanged", () => {
    const data = Buffer.from("chunk");
    expect(toBufferFromData(data)).toBe(data);
  });
  test("returns a non-buffer value unchanged rather than converting it (characterized coercion)", () => {
    expect(toBufferFromData("plain text")).toBe("plain text");
  });
});
describe("pass-through casts", () => {
  test("toKeyValuePairList returns the list unchanged", () => {
    const tags = [{ key: "env", value: "prod" }];
    expect(toKeyValuePairList(tags)).toBe(tags);
  });
  test("toPartList returns the list unchanged", () => {
    const parts = [{ ETag: '"etag-1"', PartNumber: 1 }];
    expect(toPartList(parts)).toBe(parts);
  });
  test("neither cast validates its value (characterized coercion)", () => {
    expect(toKeyValuePairList("env=prod")).toBe("env=prod");
    expect(toPartList(undefined)).toBeUndefined();
  });
});
describe("getObjectIdentifiers", () => {
  test("maps each key to an ObjectIdentifier", () => {
    expect(getObjectIdentifiers(["a.txt", "dir/b.txt"])).toEqual([
      { Key: "a.txt" },
      { Key: "dir/b.txt" },
    ]);
  });
  test("returns an empty list for a non-array value (characterized coercion)", () => {
    expect(getObjectIdentifiers("a.txt")).toEqual([]);
  });
});
describe("getObjectAttributes", () => {
  test("returns a non-empty attribute list unchanged", () => {
    expect(getObjectAttributes(["ETag", "ObjectSize"])).toEqual([
      "ETag",
      "ObjectSize",
    ]);
  });
  test("throws for an empty attribute list", () => {
    expect(() => getObjectAttributes([])).toThrow(
      "Object Attributes must contain at least one attribute",
    );
  });
  test("returns undefined for a non-array value (characterized coercion)", () => {
    expect(getObjectAttributes("ETag")).toBeUndefined();
  });
});
describe("lookBackDateClean", () => {
  test.each([
    [""],
    ["   "],
    [undefined],
    [null],
  ])("returns an empty string for %j", (value) => {
    expect(lookBackDateClean(value)).toBe("");
  });
  test.each([
    ["2024-01-15", "2024-01-15T00:00:00.000Z"],
    [" 2024-01-15 ", "2024-01-15T00:00:00.000Z"],
  ])("normalizes %j to %j", (value, expected) => {
    expect(lookBackDateClean(value)).toBe(expected);
  });
  test.each([
    ["2024/01/15"],
    ["2024-02-31"],
    [20240115],
    [new Date("2024-01-15")],
    [["2024-01-15"]],
  ])("rejects %j", (value) => {
    expect(() => lookBackDateClean(value)).toThrow(
      "Look-back Date must be a date in YYYY-MM-DD format.",
    );
  });
  test("rejects a future date", () => {
    expect(() => lookBackDateClean("2999-01-01")).toThrow(
      "Look-back Date cannot be a future date.",
    );
  });
});
