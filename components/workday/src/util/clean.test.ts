import {
  cleanArrayCodeInput,
  cleanBooleanInput,
  cleanCodeInput,
  cleanDateOnlyInput,
  cleanKeyValueListInput,
  cleanNumberInput,
  cleanStringInput,
  cleanValueListInput,
  lookBackDateClean,
  overlapMinutesClean,
} from "./clean";

describe("cleanKeyValueListInput", () => {
  it("converts key-value pairs to an object", () => {
    expect(
      cleanKeyValueListInput([
        { key: "Effective_as_of_Date", value: "2026-10-01" },
        { key: "Organization!WID", value: "abc123" },
      ]),
    ).toEqual({
      Effective_as_of_Date: "2026-10-01",
      "Organization!WID": "abc123",
    });
  });

  it("returns undefined when no pairs are entered", () => {
    expect(cleanKeyValueListInput(undefined)).toBeUndefined();
    expect(cleanKeyValueListInput("")).toBeUndefined();
  });

  it("returns an empty object for an empty list", () => {
    expect(cleanKeyValueListInput([])).toEqual({});
  });

  it("keeps the last value for a repeated key", () => {
    expect(
      cleanKeyValueListInput([
        { key: "status", value: "Draft" },
        { key: "status", value: "Approved" },
      ]),
    ).toEqual({ status: "Approved" });
  });

  it("throws for a value that is not a list", () => {
    expect(() => cleanKeyValueListInput("status=Draft")).toThrow(TypeError);
  });
});

describe("cleanNumberInput", () => {
  it("converts a numeric string to a number", () => {
    expect(cleanNumberInput("42")).toBe(42);
    expect(cleanNumberInput(" 42 ")).toBe(42);
  });

  it("returns undefined for an empty value", () => {
    expect(cleanNumberInput("")).toBeUndefined();
    expect(cleanNumberInput(undefined)).toBeUndefined();
  });

  it("keeps zero", () => {
    expect(cleanNumberInput(0)).toBe(0);
    expect(cleanNumberInput("0")).toBe(0);
  });

  it("throws for a non-numeric value", () => {
    expect(() => cleanNumberInput("abc")).toThrow(
      "Value 'abc' cannot be coerced to a number.",
    );
  });
});

describe("cleanStringInput", () => {
  it("returns the value as a string", () => {
    expect(cleanStringInput("Approved")).toBe("Approved");
    expect(cleanStringInput(42)).toBe("42");
  });

  it("does not trim whitespace", () => {
    expect(cleanStringInput(" Approved ")).toBe(" Approved ");
  });

  it("returns undefined for an empty value", () => {
    expect(cleanStringInput("")).toBeUndefined();
    expect(cleanStringInput(undefined)).toBeUndefined();
  });
});

describe("cleanBooleanInput", () => {
  it("converts true and false strings", () => {
    expect(cleanBooleanInput("true")).toBe(true);
    expect(cleanBooleanInput("false")).toBe(false);
    expect(cleanBooleanInput(true)).toBe(true);
  });

  it("returns undefined for an empty value", () => {
    expect(cleanBooleanInput("")).toBeUndefined();
    expect(cleanBooleanInput(undefined)).toBeUndefined();
  });

  it("keeps boolean false", () => {
    expect(cleanBooleanInput(false)).toBe(false);
  });

  it("treats any other non-empty string as true", () => {
    expect(cleanBooleanInput("abc")).toBe(true);
  });
});

describe("cleanDateOnlyInput", () => {
  const clean = cleanDateOnlyInput("Calendar Date");

  it("keeps a date as written", () => {
    expect(clean("2026-11-17")).toBe("2026-11-17");
  });

  it("keeps the written date of a date-time with a UTC offset", () => {
    expect(clean("2026-11-17T20:00:00-06:00")).toBe("2026-11-17");
    expect(clean("2026-11-17T01:00:00+09:00")).toBe("2026-11-17");
  });

  it("uses the UTC date of a UNIX epoch timestamp in seconds", () => {
    const utcDate = new Date(1790000000 * 1000).toISOString().slice(0, 10);
    expect(clean(1790000000)).toBe(utcDate);
    expect(clean("1790000000")).toBe(utcDate);
  });

  it("returns undefined for an empty value", () => {
    expect(clean("")).toBeUndefined();
    expect(clean(undefined)).toBeUndefined();
  });

  it("throws for a value that is not a date", () => {
    expect(() => clean("not a date")).toThrow(
      "Invalid date for Calendar Date input.",
    );
    expect(() => clean("2026-02-31")).toThrow(
      "Invalid date for Calendar Date input.",
    );
  });
});

describe("cleanCodeInput", () => {
  it("parses a JSON string", () => {
    expect(cleanCodeInput('{"a":1}', "Extra Body")).toEqual({ a: 1 });
    expect(cleanCodeInput("[1]", "Extra Body")).toEqual([1]);
  });

  it("returns an object unchanged", () => {
    expect(cleanCodeInput({ a: 1 }, "Extra Body")).toEqual({ a: 1 });
  });

  it("returns undefined for an empty value", () => {
    expect(cleanCodeInput("", "Extra Body")).toBeUndefined();
    expect(cleanCodeInput(undefined, "Extra Body")).toBeUndefined();
  });

  it("throws for invalid JSON", () => {
    expect(() => cleanCodeInput("{bad", "Extra Body")).toThrow(
      "Invalid code for Extra Body input.",
    );
  });

  it("throws for JSON that isn't an object or array", () => {
    expect(() => cleanCodeInput("42", "Extra Body")).toThrow(
      "Invalid code for Extra Body input.",
    );
  });
});

describe("cleanArrayCodeInput", () => {
  it("parses a JSON array", () => {
    expect(cleanArrayCodeInput('[{"a":1}]', "Days")).toEqual([{ a: 1 }]);
    expect(cleanArrayCodeInput("[]", "Days")).toEqual([]);
    expect(cleanArrayCodeInput([1], "Days")).toEqual([1]);
  });

  it("returns undefined for an empty value", () => {
    expect(cleanArrayCodeInput("", "Days")).toBeUndefined();
    expect(cleanArrayCodeInput(undefined, "Days")).toBeUndefined();
  });

  it("throws for JSON that is not an array", () => {
    expect(() => cleanArrayCodeInput('{"a":1}', "Days")).toThrow(
      "Invalid array for Days input.",
    );
  });

  it("throws the code message for invalid JSON", () => {
    expect(() => cleanArrayCodeInput("{bad", "Days")).toThrow(
      "Invalid code for Days input.",
    );
  });
});

describe("cleanValueListInput", () => {
  it("trims entries and drops empty ones", () => {
    expect(cleanValueListInput([" bp1 ", "", "bp2"])).toEqual(["bp1", "bp2"]);
  });

  it("returns undefined when nothing remains", () => {
    expect(cleanValueListInput(undefined)).toBeUndefined();
    expect(cleanValueListInput([" "])).toBeUndefined();
  });
});

describe("lookBackDateClean", () => {
  it("treats empty input as no backfill", () => {
    expect(lookBackDateClean(undefined)).toBe("");
    expect(lookBackDateClean("  ")).toBe("");
  });

  it("normalizes a date to the start of that day in UTC", () => {
    expect(lookBackDateClean("2026-01-01")).toBe("2026-01-01T00:00:00.000Z");
  });

  it("rejects a malformed, non-calendar, or future date", () => {
    expect(() => lookBackDateClean("01/01/2026")).toThrow(
      /Look-back Date must be a date in YYYY-MM-DD format/,
    );
    expect(() => lookBackDateClean("2026-02-31")).toThrow(
      /Look-back Date must be a valid calendar date/,
    );
    expect(() => lookBackDateClean("2999-01-01")).toThrow(
      /Look-back Date cannot be a future date/,
    );
  });
});

describe("overlapMinutesClean", () => {
  it("returns undefined for an empty value", () => {
    expect(overlapMinutesClean(undefined)).toBeUndefined();
    expect(overlapMinutesClean("")).toBeUndefined();
    expect(overlapMinutesClean(null)).toBeUndefined();
  });

  it("accepts a whole number of minutes, 0 included", () => {
    expect(overlapMinutesClean("0")).toBe(0);
    expect(overlapMinutesClean("45")).toBe(45);
    expect(overlapMinutesClean(10)).toBe(10);
  });

  it("rejects a negative, fractional or non-numeric value", () => {
    for (const bad of ["-1", "1.5", "abc", Number.NaN]) {
      expect(() => overlapMinutesClean(bad)).toThrow(
        /Overlap Minutes must be a whole number of minutes, 0 or more/,
      );
    }
  });
});
