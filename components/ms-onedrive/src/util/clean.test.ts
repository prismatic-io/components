import { DEFAULT_SUBSCRIPTION_DAYS, MAX_SUBSCRIPTION_DAYS } from "../constants";
import {
  cleanExpirationDays,
  cleanKeyValueList,
  toOptionalNumber,
  toOptionalString,
  toOptionalTrimmedString,
  toParentRefs,
  toTrimmedString,
} from "./clean";

describe("toTrimmedString", () => {
  test("trims surrounding whitespace", () => {
    expect(toTrimmedString("  /Documents  ")).toBe("/Documents");
  });

  test("turns a missing value into an empty string", () => {
    expect(toTrimmedString(undefined)).toBe("");
  });
});

describe("toOptionalString", () => {
  test("returns undefined for an empty value", () => {
    expect(toOptionalString("")).toBeUndefined();
  });

  test("returns the string for a present value", () => {
    expect(toOptionalString("abc")).toBe("abc");
  });
});

describe("cleanKeyValueList", () => {
  test("returns undefined when nothing was entered", () => {
    expect(cleanKeyValueList(undefined)).toBeUndefined();
    expect(cleanKeyValueList("")).toBeUndefined();
  });

  test("turns a key-value list into an object", () => {
    expect(cleanKeyValueList([{ key: "name", value: "Report.docx" }])).toEqual({
      name: "Report.docx",
    });
  });
});

describe("cleanExpirationDays", () => {
  test("defaults a blank value to the documented default", () => {
    expect(cleanExpirationDays("")).toBe(DEFAULT_SUBSCRIPTION_DAYS);
    expect(cleanExpirationDays(undefined)).toBe(DEFAULT_SUBSCRIPTION_DAYS);
  });

  test("keeps a number of days within range, fractions included", () => {
    expect(cleanExpirationDays("7")).toBe(7);
    expect(cleanExpirationDays(30)).toBe(30);
    expect(cleanExpirationDays("2.5")).toBe(2.5);
  });

  test("clamps a value above the maximum so saved steps keep running", () => {
    expect(cleanExpirationDays("45")).toBe(MAX_SUBSCRIPTION_DAYS);
  });

  test("defaults non-positive values as before", () => {
    expect(cleanExpirationDays("0")).toBe(DEFAULT_SUBSCRIPTION_DAYS);
    expect(cleanExpirationDays("-2")).toBe(DEFAULT_SUBSCRIPTION_DAYS);
  });

  test("rejects a non-numeric value, as it always has", () => {
    expect(() => cleanExpirationDays("abc")).toThrow();
  });
});

describe("toOptionalNumber", () => {
  test("returns undefined when nothing was entered", () => {
    expect(toOptionalNumber("")).toBeUndefined();
    expect(toOptionalNumber(undefined)).toBeUndefined();
  });

  test("coerces a numeric string to a number", () => {
    expect(toOptionalNumber("5")).toBe(5);
  });

  test("rejects a value that is not a number", () => {
    expect(() => toOptionalNumber("abc")).toThrow(
      "Value 'abc' cannot be coerced to a number.",
    );
  });
});

describe("toOptionalTrimmedString", () => {
  test("returns undefined for a blank or whitespace-only value", () => {
    expect(toOptionalTrimmedString("")).toBeUndefined();
    expect(toOptionalTrimmedString("   ")).toBeUndefined();
    expect(toOptionalTrimmedString(undefined)).toBeUndefined();
  });

  test("trims a present value", () => {
    expect(toOptionalTrimmedString("  Report.docx ")).toBe("Report.docx");
  });
});

describe("toParentRefs", () => {
  const siteId =
    "contoso.sharepoint.com,da60e844-ba1d-49bc-b4d4-d5e36bae9019,712a596e-90a1-49e3-9b48-bfa80bee8740";

  test("keeps a single site ID whole, commas included", () => {
    expect(toParentRefs(` ${siteId} `)).toEqual([{ id: siteId }]);
  });

  test("maps a list of IDs and drops blank entries", () => {
    expect(toParentRefs([siteId, " ", "d2"])).toEqual([
      { id: siteId },
      { id: "d2" },
    ]);
  });

  test("keeps the labels of an Object Selection", () => {
    expect(
      toParentRefs([{ object: { key: siteId, label: "Intranet" } }]),
    ).toEqual([{ id: siteId, label: "Intranet" }]);
  });

  test("parses an Object Selection given as a JSON string", () => {
    expect(
      toParentRefs(
        JSON.stringify([{ object: { key: "d1", label: "Documents" } }]),
      ),
    ).toEqual([{ id: "d1", label: "Documents" }]);
  });

  test("parses a list of IDs given as a JSON string", () => {
    expect(toParentRefs(JSON.stringify([siteId, "s2"]))).toEqual([
      { id: siteId },
      { id: "s2" },
    ]);
  });

  test("drops an Object Selection entry with a blank key", () => {
    expect(
      toParentRefs([
        { object: { key: " ", label: "Blank" } },
        { object: { key: "d1", label: "Documents" } },
      ]),
    ).toEqual([{ id: "d1", label: "Documents" }]);
  });

  test("keeps one reference per ID, preferring the one that carries a label", () => {
    expect(toParentRefs(["d1", "d2", "d1"])).toEqual([
      { id: "d1" },
      { id: "d2" },
    ]);
    expect(
      toParentRefs(
        JSON.stringify([
          { object: { key: "d1" } },
          { object: { key: "d1", label: "Documents" } },
        ]),
      ),
    ).toEqual([{ id: "d1", label: "Documents" }]);
  });

  test("treats a string that starts with a bracket but is not JSON as one ID", () => {
    expect(toParentRefs("[not-json")).toEqual([{ id: "[not-json" }]);
  });

  test.each([
    ["an empty string", ""],
    ["an empty list", []],
    ["null", null],
    ["undefined", undefined],
  ])("returns no parents for %s", (_name, value) => {
    expect(toParentRefs(value)).toEqual([]);
  });
});
