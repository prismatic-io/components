import {
  cleanObject,
  cleanString,
  getDocumentIds,
  getUserIds,
  jsonCheck,
  toStringArray,
} from "./clean";

describe("jsonCheck", () => {
  it("parses a JSON string", () => {
    expect(jsonCheck('{"name":"Jane","tags":["a"]}')).toEqual({
      name: "Jane",
      tags: ["a"],
    });
  });

  it("returns an empty object for an empty string", () => {
    expect(jsonCheck("")).toEqual({});
  });

  it("returns an empty object for non-string input", () => {
    expect(jsonCheck(undefined)).toEqual({});
    expect(jsonCheck(null)).toEqual({});
    expect(jsonCheck({ already: "object" })).toEqual({});
  });

  it("throws on malformed JSON", () => {
    expect(() => jsonCheck("{not json")).toThrow();
  });
});

describe("getDocumentIds", () => {
  it("maps each id to a documentId object", () => {
    expect(getDocumentIds(["1", "2"])).toEqual([
      { documentId: "1" },
      { documentId: "2" },
    ]);
  });

  it("returns an empty array for non-array input", () => {
    expect(getDocumentIds(undefined)).toEqual([]);
    expect(getDocumentIds("1")).toEqual([]);
  });
});

describe("getUserIds", () => {
  it("maps each id to a userId object", () => {
    expect(getUserIds(["u1", "u2"])).toEqual([
      { userId: "u1" },
      { userId: "u2" },
    ]);
  });

  it("returns an empty array for non-array input", () => {
    expect(getUserIds(undefined)).toEqual([]);
    expect(getUserIds("u1")).toEqual([]);
  });
});

describe("toStringArray", () => {
  it("converts each item to a string", () => {
    expect(toStringArray(["envelope-sent", 42, true])).toEqual([
      "envelope-sent",
      "42",
      "true",
    ]);
  });

  it("returns an empty array for non-array input", () => {
    expect(toStringArray(undefined)).toEqual([]);
    expect(toStringArray("envelope-sent")).toEqual([]);
  });
});

describe("cleanObject", () => {
  it("drops undefined, null, and empty string values", () => {
    expect(
      cleanObject({ a: "x", b: undefined, c: null, d: "", e: 0, f: false }),
    ).toEqual({ a: "x", e: 0, f: false });
  });

  it("drops empty arrays and keeps non-empty ones", () => {
    expect(cleanObject({ empty: [], ids: ["1", "2"] })).toEqual({
      ids: ["1", "2"],
    });
  });

  it("recursively cleans nested objects and drops ones left empty", () => {
    expect(
      cleanObject({
        nested: { keep: "y", drop: "" },
        allEmpty: { drop: undefined },
      }),
    ).toEqual({ nested: { keep: "y" } });
  });

  it("cleans object items inside arrays but keeps them even when emptied", () => {
    expect(
      cleanObject({ items: [{ name: "a", note: "" }, { note: null }, "raw"] }),
    ).toEqual({ items: [{ name: "a" }, {}, "raw"] });
  });
});

describe("cleanString", () => {
  it("converts a truthy value to a string", () => {
    expect(cleanString("envelope-sent")).toBe("envelope-sent");
    expect(cleanString(42)).toBe("42");
  });

  it("returns undefined for empty, undefined, and null input", () => {
    expect(cleanString("")).toBeUndefined();
    expect(cleanString(undefined)).toBeUndefined();
    expect(cleanString(null)).toBeUndefined();
  });
});
