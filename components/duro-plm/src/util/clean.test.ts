import {
  listChangeOrdersInputs,
  listComponentsInputs,
  createChangeOrderInputs,
  rawRequestInputs,
} from "../inputs";
import {
  cleanCodeInput,
  cleanKeyValueListInput,
  cleanNumberInput,
  cleanStringInput,
  parseJsonArray,
} from "./clean";

describe("cleanNumberInput (first)", () => {
  test("is the clean of the First N Items input", () => {
    expect(listComponentsInputs.first.clean).toBe(cleanNumberInput);
  });

  test("converts a numeric string to a number", () => {
    expect(cleanNumberInput("10")).toBe(10);
  });

  test("returns undefined for an empty value", () => {
    expect(cleanNumberInput("")).toBeUndefined();
  });

  test("throws for a non-numeric value", () => {
    expect(() => cleanNumberInput("abc")).toThrow(
      "Value 'abc' cannot be coerced to a number.",
    );
  });
});

describe("cleanStringInput (libraryType, description)", () => {
  test("is the clean of the Library Type and Description inputs", () => {
    expect(listComponentsInputs.libraryType.clean).toBe(cleanStringInput);
    expect(createChangeOrderInputs.description.clean).toBe(cleanStringInput);
  });

  test("returns a non-empty value as a string", () => {
    expect(cleanStringInput("GENERAL")).toBe("GENERAL");
  });

  test("returns undefined for an empty value", () => {
    expect(cleanStringInput("")).toBeUndefined();
    expect(cleanStringInput(undefined)).toBeUndefined();
  });
});

describe("cleanKeyValueListInput (variables)", () => {
  test("is the clean of the Variables input", () => {
    expect(rawRequestInputs.variables.clean).toBe(cleanKeyValueListInput);
  });

  test("converts a key-value list to an object", () => {
    expect(
      cleanKeyValueListInput([
        { key: "userId", value: "12345" },
        { key: "status", value: "active" },
      ]),
    ).toEqual({ userId: "12345", status: "active" });
  });

  test("returns undefined for an empty list", () => {
    expect(cleanKeyValueListInput([])).toBeUndefined();
    expect(cleanKeyValueListInput(undefined)).toBeUndefined();
  });
});

describe("cleanCodeInput (variablesObject)", () => {
  test("is the clean of the Variables Object input", () => {
    expect(rawRequestInputs.variablesObject.clean).toBe(cleanCodeInput);
  });

  test("parses a JSON object string", () => {
    expect(cleanCodeInput('{"key1": "value1"}')).toEqual({ key1: "value1" });
  });

  test("returns undefined for an empty value", () => {
    expect(cleanCodeInput("")).toBeUndefined();
  });

  test("returns invalid JSON unchanged instead of throwing", () => {
    expect(cleanCodeInput("{not json")).toBe("{not json");
  });
});

describe("parseJsonArray (orderBy)", () => {
  test("is the clean of the Order By input", () => {
    expect(listChangeOrdersInputs.orderBy.clean).toBe(parseJsonArray);
  });

  test("parses a JSON array string", () => {
    expect(parseJsonArray('[{"con": "asc"}]')).toEqual([{ con: "asc" }]);
  });

  test("returns undefined for an empty value", () => {
    expect(parseJsonArray("")).toBeUndefined();
  });

  test("throws for a JSON object", () => {
    expect(() => parseJsonArray('{"con": "asc"}')).toThrow(
      "Expected a JSON array",
    );
  });
});
