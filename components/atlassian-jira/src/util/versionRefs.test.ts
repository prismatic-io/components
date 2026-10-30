import { toVersionRefs } from "./versionRefs";

describe("toVersionRefs", () => {
  test("wraps a single reference object in an array", () => {
    expect(toVersionRefs('{ "id": "10001" }')).toEqual([{ id: "10001" }]);
  });

  test("keeps an array of references as is", () => {
    expect(toVersionRefs('[{ "id": "1" }, { "id": "2" }]')).toEqual([
      { id: "1" },
      { id: "2" },
    ]);
  });

  test("accepts an already-parsed object or array", () => {
    expect(toVersionRefs({ id: "10001" })).toEqual([{ id: "10001" }]);
    expect(toVersionRefs([{ id: "1" }])).toEqual([{ id: "1" }]);
  });

  test("returns undefined for an empty value", () => {
    expect(toVersionRefs("")).toBeUndefined();
    expect(toVersionRefs(undefined)).toBeUndefined();
    expect(toVersionRefs(null)).toBeUndefined();
  });

  test("rejects text that is not a JSON object or array", () => {
    expect(() => toVersionRefs("10001")).toThrow(
      "Version references must be a JSON object or array",
    );
    expect(() => toVersionRefs("{ id:")).toThrow(
      "Version references must be a JSON object or array",
    );
  });
});
