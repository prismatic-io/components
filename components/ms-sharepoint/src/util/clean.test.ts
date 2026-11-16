import { afterEach, beforeEach, vi } from "vitest";
import { DEFAULT_SUBSCRIPTION_DAYS, SITE_LIST_SUBSCRIPTION_DEFAULT_DAYS } from "../constants";
import {
  cleanExpirationDays,
  cleanSiteListExpirationDateTime,
  toOptionalNumber,
  toKeyValueObject,
  toOptionalString,
  toParentRefs,
  toTrimmedString,
  toValueOrRoot,
} from "./clean";

describe("toTrimmedString", () => {
  test("trims surrounding whitespace", () => {
    expect(toTrimmedString("  Reports  ")).toBe("Reports");
  });

  test("turns a missing value into an empty string", () => {
    expect(toTrimmedString(undefined)).toBe("");
  });
});

describe("toOptionalString", () => {
  test("returns undefined for an empty value", () => {
    expect(toOptionalString("")).toBeUndefined();
    expect(toOptionalString(undefined)).toBeUndefined();
  });

  test("returns the string for a present value", () => {
    expect(toOptionalString("abc")).toBe("abc");
  });
});

describe("toOptionalNumber", () => {
  test("returns undefined when nothing was entered", () => {
    expect(toOptionalNumber("")).toBeUndefined();
    expect(toOptionalNumber(undefined)).toBeUndefined();
    expect(toOptionalNumber(null)).toBeUndefined();
  });

  test("coerces a numeric string to a number", () => {
    expect(toOptionalNumber("5")).toBe(5);
  });

  test("rejects a value that is not a number", () => {
    expect(() => toOptionalNumber("abc")).toThrow("Value 'abc' cannot be coerced to a number.");
  });
});

describe("toValueOrRoot", () => {
  test("falls back to root for a blank or whitespace-only value", () => {
    expect(toValueOrRoot("")).toBe("root");
    expect(toValueOrRoot("   ")).toBe("root");
    expect(toValueOrRoot(undefined)).toBe("root");
  });

  test("keeps a present folder ID", () => {
    expect(toValueOrRoot("01Q7VXAXZW7LCB32ODBRCKZNSJIC544FXU")).toBe(
      "01Q7VXAXZW7LCB32ODBRCKZNSJIC544FXU",
    );
  });
});

describe("cleanExpirationDays", () => {
  test("defaults a blank value to the documented default", () => {
    expect(cleanExpirationDays("")).toBe(DEFAULT_SUBSCRIPTION_DAYS);
    expect(cleanExpirationDays(undefined)).toBe(DEFAULT_SUBSCRIPTION_DAYS);
  });

  test("accepts a whole number of days within range", () => {
    expect(cleanExpirationDays("7")).toBe(7);
    expect(cleanExpirationDays(30)).toBe(30);
  });

  test("rejects out-of-range and non-numeric values instead of substituting", () => {
    expect(() => cleanExpirationDays("45")).toThrow(
      "Expiration Days must be a whole number between 1 and 30.",
    );
    expect(() => cleanExpirationDays("0")).toThrow();
    expect(() => cleanExpirationDays("2.5")).toThrow();
    expect(() => cleanExpirationDays("abc")).toThrow();
  });
});

describe("cleanSiteListExpirationDateTime", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-01-01T00:00:00.000Z"));
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  test("defaults a blank value to now plus the site list subscription default", () => {
    const expected = new Date("2026-01-01T00:00:00.000Z");
    expected.setDate(expected.getDate() + SITE_LIST_SUBSCRIPTION_DEFAULT_DAYS);
    expect(cleanSiteListExpirationDateTime("")).toBe(expected.toISOString());
    expect(cleanSiteListExpirationDateTime(undefined)).toBe(expected.toISOString());
  });

  test("turns a Date into an ISO string", () => {
    expect(cleanSiteListExpirationDateTime(new Date("2026-02-01T10:00:00.000Z"))).toBe(
      "2026-02-01T10:00:00.000Z",
    );
  });

  test("passes a valid date string through unchanged", () => {
    expect(cleanSiteListExpirationDateTime("2026-02-01T10:00:00Z")).toBe("2026-02-01T10:00:00Z");
  });

  test("rejects a string that is not a date", () => {
    expect(() => cleanSiteListExpirationDateTime("not-a-date")).toThrow(
      "cannot be coerced to date",
    );
  });
});

describe("toKeyValueObject", () => {
  test("turns a key-value list into an object", () => {
    expect(
      toKeyValueObject([
        { key: "Title", value: "Quarterly Report" },
        { key: "Status", value: "Draft" },
      ]),
    ).toEqual({ Title: "Quarterly Report", Status: "Draft" });
  });
});

describe("toParentRefs", () => {
  const siteId =
    "example.sharepoint.com,6c44888f-5883-4ef0-a542-d21a802cfea6,ed2d5d06-e192-4047-afa6-a5d7f25b3418";

  test("keeps a single site ID whole, commas included", () => {
    expect(toParentRefs(` ${siteId} `)).toEqual([{ id: siteId }]);
  });

  test("maps a list of IDs and drops blank entries", () => {
    expect(toParentRefs([siteId, " ", "d2"])).toEqual([{ id: siteId }, { id: "d2" }]);
  });

  test("keeps the labels of an Object Selection", () => {
    expect(toParentRefs([{ object: { key: siteId, label: "Intranet" } }])).toEqual([
      { id: siteId, label: "Intranet" },
    ]);
  });

  test("parses an Object Selection given as a JSON string", () => {
    expect(toParentRefs(JSON.stringify([{ object: { key: "d1", label: "Documents" } }]))).toEqual([
      { id: "d1", label: "Documents" },
    ]);
  });

  test("parses a list of IDs given as a JSON string", () => {
    expect(toParentRefs(JSON.stringify([siteId, "s2"]))).toEqual([{ id: siteId }, { id: "s2" }]);
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
    expect(toParentRefs(["d1", "d2", "d1"])).toEqual([{ id: "d1" }, { id: "d2" }]);
    expect(
      toParentRefs(
        JSON.stringify([{ object: { key: "d1" } }, { object: { key: "d1", label: "Documents" } }]),
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
