import {
  cleanDamPath,
  cleanFolderPaths,
  cleanHttpsUrl,
  cleanLimit,
  cleanOptionalDateTime,
  cleanOptionalHttpsUrl,
  cleanRequiredDamPath,
  cleanRequiredString,
  cleanString,
  cleanStringList,
  lookBackDateClean,
} from "./clean";

describe("cleanString", () => {
  test("trims a value and returns undefined for blank input", () => {
    expect(cleanString("  /content/dam  ")).toBe("/content/dam");
    expect(cleanString("   ")).toBeUndefined();
    expect(cleanString(undefined)).toBeUndefined();
    expect(cleanString(null)).toBeUndefined();
  });
});

describe("cleanRequiredString", () => {
  test("trims a value and returns an empty string for blank input", () => {
    expect(cleanRequiredString(" frag-1 ")).toBe("frag-1");
    expect(cleanRequiredString(undefined)).toBe("");
  });
});

describe("cleanStringList", () => {
  test("trims entries and drops blanks", () => {
    expect(cleanStringList([" a ", "", "  ", "b"])).toEqual(["a", "b"]);
  });

  test("returns an empty list for a non-array value", () => {
    expect(cleanStringList(undefined)).toEqual([]);
    expect(cleanStringList("a")).toEqual([]);
  });
});

describe("cleanDamPath", () => {
  test("prefixes a folder name or relative path with the DAM root", () => {
    expect(cleanDamPath("wknd-shared/en")).toBe("/content/dam/wknd-shared/en");
    expect(cleanDamPath("/wknd-shared/en/")).toBe(
      "/content/dam/wknd-shared/en",
    );
    expect(cleanDamPath(" new-folder ")).toBe("/content/dam/new-folder");
  });

  test("keeps a path that already starts with the DAM root", () => {
    expect(cleanDamPath("/content/dam/wknd-shared/en")).toBe(
      "/content/dam/wknd-shared/en",
    );
    expect(cleanDamPath("content/dam/wknd-shared/en/")).toBe(
      "/content/dam/wknd-shared/en",
    );
    expect(cleanDamPath("/content/dam")).toBe("/content/dam");
    expect(cleanDamPath("/content/dam/")).toBe("/content/dam");
  });

  test("returns undefined for blank input", () => {
    expect(cleanDamPath("")).toBeUndefined();
    expect(cleanDamPath("  ")).toBeUndefined();
    expect(cleanDamPath(undefined)).toBeUndefined();
  });
});

describe("cleanRequiredDamPath", () => {
  test("prefixes the DAM root and returns an empty string for blank input", () => {
    expect(cleanRequiredDamPath("wknd-shared")).toBe(
      "/content/dam/wknd-shared",
    );
    expect(cleanRequiredDamPath("/content/dam/wknd-shared")).toBe(
      "/content/dam/wknd-shared",
    );
    expect(cleanRequiredDamPath("")).toBe("");
  });
});

describe("cleanFolderPaths", () => {
  test("prefixes each entry with the DAM root, trims, and drops blanks", () => {
    expect(
      cleanFolderPaths(["new-folder", " /content/dam/other ", "", "/a/b/"]),
    ).toEqual([
      "/content/dam/new-folder",
      "/content/dam/other",
      "/content/dam/a/b",
    ]);
  });

  test("throws when no path is given", () => {
    expect(() => cleanFolderPaths([])).toThrow(
      "Folder Paths must contain at least one folder path.",
    );
    expect(() => cleanFolderPaths(["", "  "])).toThrow(
      "Folder Paths must contain at least one folder path.",
    );
  });
});

describe("cleanLimit", () => {
  test("returns undefined for a blank value", () => {
    expect(cleanLimit("")).toBeUndefined();
    expect(cleanLimit(undefined)).toBeUndefined();
  });

  test("accepts the bounds 1 and 50", () => {
    expect(cleanLimit("1")).toBe(1);
    expect(cleanLimit(" 50 ")).toBe(50);
  });

  test("rejects values outside 1 to 50 and non-integers", () => {
    expect(() => cleanLimit("0")).toThrow(
      "Limit must be a whole number from 1 to 50",
    );
    expect(() => cleanLimit("51")).toThrow(
      "Limit must be a whole number from 1 to 50",
    );
    expect(() => cleanLimit("2.5")).toThrow("Limit must be a whole number");
    expect(() => cleanLimit("-1")).toThrow("Limit must be a whole number");
    expect(() => cleanLimit("ten")).toThrow("Limit must be a whole number");
  });
});

describe("cleanOptionalDateTime", () => {
  test("normalizes a valid date-time to ISO 8601", () => {
    expect(cleanOptionalDateTime("2026-01-01T00:00:00Z")).toBe(
      "2026-01-01T00:00:00.000Z",
    );
  });

  test("returns undefined for a blank value", () => {
    expect(cleanOptionalDateTime("  ")).toBeUndefined();
  });

  test("throws on an unparseable value", () => {
    expect(() => cleanOptionalDateTime("not a date")).toThrow(
      '"not a date" is not a valid ISO 8601 date-time.',
    );
  });
});

describe("cleanHttpsUrl", () => {
  test("returns a normalized https URL", () => {
    expect(cleanHttpsUrl(" https://www.example.com/sitemap.xml ")).toBe(
      "https://www.example.com/sitemap.xml",
    );
  });

  test("rejects http, relative, and blank values", () => {
    expect(() => cleanHttpsUrl("http://www.example.com/sitemap.xml")).toThrow(
      "must be an absolute https:// URL",
    );
    expect(() => cleanHttpsUrl("/sitemap.xml")).toThrow(
      "must be an absolute https:// URL",
    );
    expect(() => cleanHttpsUrl("")).toThrow(
      '"" must be an absolute https:// URL.',
    );
  });
});

describe("cleanOptionalHttpsUrl", () => {
  test("returns undefined for a blank value", () => {
    expect(cleanOptionalHttpsUrl("")).toBeUndefined();
  });

  test("strips the trailing slash from a valid https URL", () => {
    expect(cleanOptionalHttpsUrl("https://www.example.com")).toBe(
      "https://www.example.com",
    );
    expect(cleanOptionalHttpsUrl("https://www.example.com/en/")).toBe(
      "https://www.example.com/en",
    );
  });

  test("rejects an http URL", () => {
    expect(() => cleanOptionalHttpsUrl("http://www.example.com")).toThrow(
      "must be an absolute https:// URL",
    );
  });
});

describe("lookBackDateClean", () => {
  test("returns an empty string when unset", () => {
    expect(lookBackDateClean("")).toBe("");
    expect(lookBackDateClean(undefined)).toBe("");
  });

  test("returns a past calendar date as an ISO 8601 string", () => {
    expect(lookBackDateClean("2026-01-01")).toBe("2026-01-01T00:00:00.000Z");
  });

  test("rejects a bad format, a non-calendar date, a non-string, and a future date", () => {
    expect(() => lookBackDateClean("01/01/2026")).toThrow(
      "Look-back Date must be a date in YYYY-MM-DD format",
    );
    expect(() => lookBackDateClean("2026-02-31")).toThrow(
      "Look-back Date must be a date in YYYY-MM-DD format",
    );
    expect(() => lookBackDateClean(20260101)).toThrow(
      "Look-back Date must be a date in YYYY-MM-DD format",
    );
    expect(() => lookBackDateClean("2999-01-01")).toThrow(
      "Look-back Date cannot be a future date",
    );
  });
});
