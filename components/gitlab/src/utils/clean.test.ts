import {
  cleanString,
  encodePathSegment,
  lookBackDateClean,
  toEventList,
  toFilePathSegment,
  toIid,
  toOptionalBoolean,
  toOptionalDate,
  toOptionalId,
  toOptionalIdList,
  toOptionalLabelList,
  toOptionalTimestamp,
  toPathOrId,
  toPathOrIdList,
  toPathSegment,
  toPollResourceType,
  toRequiredId,
  toRequiredString,
} from "./clean";
describe("clean functions", () => {
  test.each([
    undefined,
    null,
    "",
    false,
    0,
  ])("optional ID, timestamp and date cleans return undefined for %s", (value) => {
    expect(toOptionalId(value)).toBeUndefined();
    expect(toOptionalTimestamp(value)).toBeUndefined();
    expect(toOptionalDate(value)).toBeUndefined();
  });
  test("cleanString returns undefined for blank", () => {
    expect(cleanString("  ")).toBeUndefined();
    expect(cleanString(" a ")).toBe("a");
  });
  test("toRequiredString throws on blank", () => {
    expect(() => toRequiredString("")).toThrow(/required/);
  });
  test("toRequiredString trims a valid value", () => {
    expect(toRequiredString(" a ")).toBe("a");
  });
  test("toOptionalBoolean keeps false distinct from unset", () => {
    expect(toOptionalBoolean("")).toBeUndefined();
    expect(toOptionalBoolean(undefined)).toBeUndefined();
    expect(toOptionalBoolean("false")).toBe(false);
    expect(toOptionalBoolean(true)).toBe(true);
  });
  test("ids", () => {
    expect(toOptionalId("")).toBeUndefined();
    expect(toOptionalId("15")).toBe(15);
    expect(() => toOptionalId("abc")).toThrow(/numeric ID/);
    expect(toRequiredId("9")).toBe(9);
    expect(() => toRequiredId("")).toThrow(/numeric ID/);
    expect(toOptionalIdList("")).toBeUndefined();
    expect(toOptionalIdList(["1", " 2 ", ""])).toEqual([1, 2]);
  });
  test("toOptionalIdList throws on a non-numeric entry", () => {
    expect(() => toOptionalIdList(["1", "x"])).toThrow(/numeric ID/);
  });
  test("toOptionalLabelList joins names", () => {
    expect(toOptionalLabelList("")).toBeUndefined();
    expect(toOptionalLabelList(["bug", " backend "])).toBe("bug,backend");
  });
  test("toOptionalTimestamp normalizes to ISO", () => {
    expect(toOptionalTimestamp("")).toBeUndefined();
    expect(toOptionalTimestamp("2026-09-01")).toBe("2026-09-01T00:00:00.000Z");
    expect(() => toOptionalTimestamp("yesterday")).toThrow(/ISO 8601/);
  });
  test("toOptionalDate validates calendar dates", () => {
    expect(toOptionalDate("2026-02-28")).toBe("2026-02-28");
    expect(() => toOptionalDate("2026-02-31")).toThrow(/YYYY-MM-DD/);
  });
  test("lookBackDateClean rejects future and malformed dates", () => {
    expect(lookBackDateClean("")).toBe("");
    expect(lookBackDateClean("2026-01-01")).toBe("2026-01-01");
    expect(() => lookBackDateClean("2999-01-01")).toThrow(/future/);
    expect(() => lookBackDateClean("01/01/2026")).toThrow(/YYYY-MM-DD/);
  });
  test("toEventList validates flags", () => {
    expect(toEventList(["push_events", "note_events"])).toEqual([
      "push_events",
      "note_events",
    ]);
    expect(() => toEventList([])).toThrow(/at least one event/);
    expect(() => toEventList(["bogus_events"])).toThrow(/Unknown event/);
  });
});
describe("encodePathSegment", () => {
  test("encodes slashes and dots", () => {
    expect(encodePathSegment("release/1.2")).toBe("release%2F1%2E2");
    expect(encodePathSegment("config/app.json")).toBe("config%2Fapp%2Ejson");
  });
});
describe("toPathOrId", () => {
  test.each([
    ["42", "42"],
    [" 42 ", "42"],
    ["group/sub/my.project", "group%2Fsub%2Fmy%2Eproject"],
    ["group%2Fproj", "group%2Fproj"],
    ["/group/proj/", "group%2Fproj"],
    ["group/proj.git", "group%2Fproj"],
    ["https://gitlab.example.com/group/proj/-/issues/3", "group%2Fproj"],
    ["https://gitlab.example.com/group/proj", "group%2Fproj"],
    ["https://gitlab.example.com/groups/acme/sub", "acme%2Fsub"],
    ["https://gitlab.example.com/groups/acme/sub/-/issues", "acme%2Fsub"],
    ["https://gitlab.example.com/acme/groups/-/issues", "acme%2Fgroups"],
    ["groups/proj", "groups%2Fproj"],
  ])("%s -> %s", (input, expected) => {
    expect(toPathOrId(input)).toBe(expected);
  });
  test("rejects empty", () => {
    expect(() => toPathOrId("  ")).toThrow(/ID or path/);
  });
});
describe("toIid", () => {
  test.each([
    ["42", 42],
    ["#42", 42],
    ["!17", 17],
    [7, 7],
  ])("%s -> %s", (input, expected) => {
    expect(toIid(input)).toBe(expected);
  });
  test.each(["", "0", "abc", "4.2"])("rejects %s", (input) => {
    expect(() => toIid(input)).toThrow(/IID/);
  });
});
describe("path segment cleans", () => {
  test("toPathSegment encodes and requires a value", () => {
    expect(toPathSegment("feature/login")).toBe("feature%2Flogin");
    expect(() => toPathSegment("")).toThrow(/required/);
  });
  test("toFilePathSegment strips a leading slash", () => {
    expect(toFilePathSegment("/src/index.ts")).toBe("src%2Findex%2Ets");
  });
  test("toFilePathSegment requires a non-empty path", () => {
    expect(() => toFilePathSegment("")).toThrow(/required/);
    expect(() => toFilePathSegment("/")).toThrow(/required/);
  });
  test("toPathOrIdList cleans each entry and drops blanks", () => {
    expect(toPathOrIdList(["12", "", "group/proj"])).toEqual([
      "12",
      "group%2Fproj",
    ]);
    expect(() => toPathOrIdList("")).toThrow(/at least one project/);
  });
});
describe("toPollResourceType", () => {
  test("accepts a Resource Type key", () => {
    expect(toPollResourceType(" mergeRequests ")).toBe("mergeRequests");
  });
  test("rejects an API path or unknown value instead of crashing the poll", () => {
    expect(() => toPollResourceType("merge_requests")).toThrow(
      /Unknown resource type: merge_requests\. Use one of: issues, mergeRequests\./,
    );
    expect(() => toPollResourceType("toString")).toThrow(
      /Unknown resource type/,
    );
  });
  test("throws on blank", () => {
    expect(() => toPollResourceType("")).toThrow(/required/);
  });
});
