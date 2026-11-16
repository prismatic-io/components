import {
  lookBackDateClean,
  recordIdClean,
  recordTypeClean,
  restServiceTypeClean,
  standardRecordTypeClean,
  toCommaSeparatedList,
  toNumberWithDefault1000,
  toOptionalString,
} from "./cleanFunctions";

describe("toOptionalString", () => {
  test.each([
    [undefined, undefined],
    [null, undefined],
    ["", undefined],
    ["email IS 'a@example.com'", "email IS 'a@example.com'"],
  ])("cleans %j to %j", (value, expected) => {
    expect(toOptionalString(value)).toBe(expected);
  });
});

describe("recordTypeClean", () => {
  test.each([
    "customer",
    "nonInventorySaleItem",
    "customrecord_project_milestone",
    "customrecord123",
    "customtransaction_expense_claim",
    "customtransaction45",
  ])("accepts %s", (value) => {
    expect(recordTypeClean(value)).toBe(value);
  });

  test("trims surrounding whitespace", () => {
    expect(recordTypeClean("  customrecord_milestone ")).toBe(
      "customrecord_milestone",
    );
  });

  test.each([
    "widget",
    "customrecord",
    "customrecord_bad-name",
    "",
  ])("rejects %j", (value) => {
    expect(() => recordTypeClean(value)).toThrow(
      `Unexpected Record Type: ${value}`,
    );
  });
});

describe("toNumberWithDefault1000", () => {
  test.each([
    ["25", 25],
    [50, 50],
    ["0", 0],
  ])("coerces %j to %j", (value, expected) => {
    expect(toNumberWithDefault1000(value)).toBe(expected);
  });

  test.each([undefined, null, ""])("defaults %j to 1000", (value) => {
    expect(toNumberWithDefault1000(value)).toBe(1000);
  });

  test("throws on a value that is not a number", () => {
    expect(() => toNumberWithDefault1000("abc")).toThrow();
  });
});

describe("lookBackDateClean", () => {
  test.each([
    undefined,
    null,
    "",
    "   ",
  ])("returns an empty string for %j", (value) => {
    expect(lookBackDateClean(value)).toBe("");
  });

  test("returns a past date as a UTC-midnight ISO timestamp", () => {
    expect(lookBackDateClean("2020-01-15")).toBe("2020-01-15T00:00:00.000Z");
  });

  test("trims surrounding whitespace", () => {
    expect(lookBackDateClean(" 2020-01-15 ")).toBe("2020-01-15T00:00:00.000Z");
  });

  test.each([
    "01/15/2020",
    "2020-1-5",
    "not a date",
  ])("rejects the malformed value %j", (value) => {
    expect(() => lookBackDateClean(value)).toThrow(
      `Look-back Date must be a date in YYYY-MM-DD format. Received: ${value}`,
    );
  });

  test("rejects a non-calendar date", () => {
    expect(() => lookBackDateClean("2026-02-31")).toThrow(
      "Look-back Date must be a date in YYYY-MM-DD format. Received: 2026-02-31",
    );
  });

  test("rejects a future date", () => {
    expect(() => lookBackDateClean("2999-01-01")).toThrow(
      "Look-back Date cannot be a future date. Received: 2999-01-01",
    );
  });
});

describe("toCommaSeparatedList", () => {
  test("joins an array into a comma-separated string", () => {
    expect(toCommaSeparatedList(["email", "companyname"])).toBe(
      "email,companyname",
    );
  });

  test("coerces array items to strings", () => {
    expect(toCommaSeparatedList([1, "two"])).toBe("1,two");
  });

  test("passes a non-array value through unchanged", () => {
    expect(toCommaSeparatedList("email")).toBe("email");
    expect(toCommaSeparatedList(undefined)).toBeUndefined();
  });
});

describe("restServiceTypeClean", () => {
  test.each(["record", "query"])("accepts %s", (value) => {
    expect(restServiceTypeClean(value)).toBe(value);
  });

  test("trims surrounding whitespace", () => {
    expect(restServiceTypeClean(" query ")).toBe("query");
  });

  test.each([
    "",
    "suiteql",
    "Record",
    "rest/record",
  ])("rejects %j with a clear error", (value) => {
    expect(() => restServiceTypeClean(value)).toThrow(
      `Unexpected Service Type: ${value}. Expected "record" or "query".`,
    );
  });
});

describe("recordIdClean", () => {
  test.each([
    ["107", "107"],
    [" eid:CUST-9 ", "eid:CUST-9"],
  ])("cleans %j to %j", (value, expected) => {
    expect(recordIdClean(value)).toBe(expected);
  });

  test.each([
    "",
    "   ",
    undefined,
  ])("rejects an empty Record ID (%j)", (value) => {
    expect(() => recordIdClean(value)).toThrow("Record ID is required.");
  });
});

describe("standardRecordTypeClean", () => {
  test("accepts a standard record type", () => {
    expect(standardRecordTypeClean("customer")).toBe("customer");
  });

  test.each([
    "customrecord_milestone",
    "customtransaction_expense",
  ])("rejects the custom type %s", (value) => {
    expect(() => standardRecordTypeClean(value)).toThrow(
      `Unexpected Record Type: ${value}`,
    );
  });
});
