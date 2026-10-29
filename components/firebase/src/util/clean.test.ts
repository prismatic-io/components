import { keyValuePairsToObject, validateJSON } from "./clean";

describe("keyValuePairsToObject", () => {
  test("converts a key-value list to an object", () => {
    expect(
      keyValuePairsToObject([
        { key: "name", value: "Jane Smith" },
        { key: "role", value: "admin" },
      ]),
    ).toEqual({ name: "Jane Smith", role: "admin" });
  });

  test("throws on a value that is not a key-value list", () => {
    expect(() => keyValuePairsToObject("name=Jane")).toThrow();
  });
});

describe("validateJSON", () => {
  test("parses a valid JSON string", () => {
    expect(validateJSON('[{"field1":"value1"}]')).toEqual([
      { field1: "value1" },
    ]);
  });

  test("throws on malformed JSON", () => {
    expect(() => validateJSON("[{field1:")).toThrow("Invalid JSON format.");
  });
});
