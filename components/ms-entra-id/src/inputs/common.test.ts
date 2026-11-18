import {
  additionalProperties,
  deltaURL,
  eventualConsistencyLevelHeader,
  expirationDateTime,
  getAllPaginatedResults,
  groupId,
  groupTypes,
  memberId,
  odataParams,
  returnMinimal,
  uniqueName,
  useAsUpsert,
  userId,
} from "./common";

type Clean = (value: unknown) => unknown;

describe.each<[string, Clean]>([
  ["$deltatoken", odataParams.$deltatoken.clean],
  ["$filter", odataParams.$filter.clean],
  ["$select", odataParams.$select.clean],
  ["$expand", odataParams.$expand.clean],
  ["$orderby", odataParams.$orderby.clean],
  ["$skip", odataParams.$skip.clean],
  ["$search", odataParams.$search.clean],
  ["$format", odataParams.$format.clean],
  ["$skiptoken", odataParams.$skiptoken.clean],
])("odataParams.%s.clean", (_name, clean) => {
  test("keeps a provided value as a string", () => {
    expect(clean("abc")).toBe("abc");
    expect(clean(10)).toBe("10");
  });

  test("returns undefined for an empty value", () => {
    expect(clean("")).toBeUndefined();
    expect(clean(undefined)).toBeUndefined();
  });
});

describe("odataParams.$top.clean", () => {
  const clean = odataParams.$top.clean as Clean;

  test("returns a provided value as a number", () => {
    expect(clean("10")).toBe(10);
    expect(clean(25)).toBe(25);
  });

  test("returns undefined for an empty value", () => {
    expect(clean("")).toBeUndefined();
    expect(clean(undefined)).toBeUndefined();
  });

  test("throws for a value that is not a number", () => {
    expect(() => clean("ten")).toThrow();
  });
});

describe.each<[string, Clean]>([
  ["userId", userId.clean],
  ["groupId", groupId.clean],
  ["memberId", memberId.clean],
  ["uniqueName", uniqueName.clean],
  ["deltaURL", deltaURL.clean],
  ["expirationDateTime", expirationDateTime.clean],
])("%s.clean", (_name, clean) => {
  test("returns the value as a string", () => {
    expect(clean("value-1")).toBe("value-1");
    expect(clean(42)).toBe("42");
  });

  test("coerces an empty value to an empty string instead of throwing", () => {
    expect(clean(undefined)).toBe("");
  });
});

describe.each<[string, Clean]>([
  ["odataParams.$count", odataParams.$count.clean],
  ["eventualConsistencyLevelHeader", eventualConsistencyLevelHeader.clean],
  ["useAsUpsert", useAsUpsert.clean],
  ["returnMinimal", returnMinimal.clean],
  ["getAllPaginatedResults", getAllPaginatedResults.clean],
])("%s.clean", (_name, clean) => {
  test("coerces boolean strings", () => {
    expect(clean("true")).toBe(true);
    expect(clean("false")).toBe(false);
  });

  test("coerces an empty value to false instead of throwing", () => {
    expect(clean(undefined)).toBe(false);
  });
});

describe("groupTypes.clean", () => {
  test("splits a comma-separated value into trimmed types", () => {
    expect(groupTypes.clean("Unified, DynamicMembership")).toEqual([
      "Unified",
      "DynamicMembership",
    ]);
  });

  test("returns undefined for an empty or non-string value", () => {
    expect(groupTypes.clean("")).toBeUndefined();
    expect(groupTypes.clean(["Unified"])).toBeUndefined();
  });
});

describe("additionalProperties.clean", () => {
  test("parses a JSON object", () => {
    expect(additionalProperties.clean('{"jobTitle":"Manager"}')).toEqual({
      jobTitle: "Manager",
    });
  });

  test("throws an error naming the Additional Properties input on invalid code", () => {
    expect(() => additionalProperties.clean("not json")).toThrow(
      "Invalid code for Additional Properties input.",
    );
  });
});
