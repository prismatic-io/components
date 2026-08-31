import { util } from "@prismatic-io/spectral";
import {
  cleanAmountInput,
  cleanIntegerInput,
  cleanKeyValueListInput,
  cleanMetadataInput,
  cleanNumberInput,
  cleanObjectInput,
  cleanRequiredAmountInput,
  cleanRequiredStringListInput,
  cleanStringInput,
  cleanStringListInput,
  cleanTriStateBoolInput,
} from "./clean";
describe("cleanIntegerInput", () => {
  it("returns a whole number unchanged", () => {
    expect(cleanIntegerInput(10)).toBe(10);
    expect(cleanIntegerInput("10")).toBe(10);
  });
  it("rejects a fractional value instead of truncating it", () => {
    expect(() => cleanIntegerInput(10.7)).toThrow(
      "Value '10.7' must be a whole number.",
    );
    expect(() => cleanIntegerInput("10.7")).toThrow(
      "Value '10.7' must be a whole number.",
    );
  });
  it("resolves an absent value to undefined so the field is omitted", () => {
    expect(cleanIntegerInput("")).toBeUndefined();
    expect(cleanIntegerInput(null)).toBeUndefined();
    expect(cleanIntegerInput(undefined)).toBeUndefined();
  });
  it("preserves a zero", () => {
    expect(cleanIntegerInput(0)).toBe(0);
    expect(cleanIntegerInput("0")).toBe(0);
  });
});
describe("cleanAmountInput", () => {
  it("is the same function as cleanIntegerInput", () => {
    expect(cleanAmountInput).toBe(cleanIntegerInput);
  });
  it("preserves a zero amount, the contract its call sites rely on", () => {
    expect(cleanAmountInput(0)).toBe(0);
    expect(cleanAmountInput("0")).toBe(0);
  });
  it("still resolves an absent amount to undefined", () => {
    expect(cleanAmountInput("")).toBeUndefined();
    expect(cleanAmountInput(undefined)).toBeUndefined();
  });
});
describe("cleanStringInput", () => {
  it("resolves a blank to undefined so the field is omitted", () => {
    expect(cleanStringInput("")).toBeUndefined();
    expect(cleanStringInput(null)).toBeUndefined();
    expect(cleanStringInput(undefined)).toBeUndefined();
  });
  it("passes a supplied value through", () => {
    expect(cleanStringInput("cus_123")).toBe("cus_123");
  });
  it("does not trim surrounding whitespace", () => {
    expect(cleanStringInput("  cus_123  ")).toBe("  cus_123  ");
  });
  it("coerces a non-string to its string form", () => {
    expect(cleanStringInput(42)).toBe("42");
  });
  it("drops a numeric zero", () => {
    expect(cleanStringInput(0)).toBeUndefined();
  });
});
describe("cleanNumberInput", () => {
  it("returns a coercible value as a number", () => {
    expect(cleanNumberInput("3.22")).toBe(3.22);
    expect(cleanNumberInput(7)).toBe(7);
  });
  it("throws on a value it cannot coerce", () => {
    expect(() => cleanNumberInput("Hello")).toThrow(
      "Value 'Hello' cannot be coerced to a number.",
    );
  });
  it("resolves an absent value to undefined", () => {
    expect(cleanNumberInput("")).toBeUndefined();
    expect(cleanNumberInput(null)).toBeUndefined();
    expect(cleanNumberInput(undefined)).toBeUndefined();
  });
  it("drops a zero, unlike cleanIntegerInput", () => {
    expect(cleanNumberInput(0)).toBeUndefined();
    expect(cleanIntegerInput(0)).toBe(0);
  });
});
describe("cleanStringListInput", () => {
  it("maps a populated list to strings", () => {
    expect(cleanStringListInput(["a", "b"])).toEqual(["a", "b"]);
    expect(cleanStringListInput([1, 2])).toEqual(["1", "2"]);
  });
  it("resolves an empty list to undefined so the field is omitted", () => {
    expect(cleanStringListInput([])).toBeUndefined();
  });
  it("resolves a non-array to undefined", () => {
    expect(cleanStringListInput(undefined)).toBeUndefined();
    expect(cleanStringListInput(null)).toBeUndefined();
    expect(cleanStringListInput("not-a-list")).toBeUndefined();
  });
});
describe("cleanRequiredStringListInput", () => {
  it("maps a list to strings", () => {
    expect(cleanRequiredStringListInput(["a", 2])).toEqual(["a", "2"]);
  });
  it("resolves a non-array to an empty array rather than undefined", () => {
    expect(cleanRequiredStringListInput(undefined)).toEqual([]);
    expect(cleanRequiredStringListInput(null)).toEqual([]);
    expect(cleanRequiredStringListInput("not-a-list")).toEqual([]);
  });
  it("keeps an empty list as an empty array", () => {
    expect(cleanRequiredStringListInput([])).toEqual([]);
  });
});
describe("cleanObjectInput", () => {
  it("parses a JSON string into an object", () => {
    expect(cleanObjectInput('{"a":1}')).toEqual({ a: 1 });
  });
  it("passes an object through untouched", () => {
    const value = { a: 1 };
    expect(cleanObjectInput(value)).toBe(value);
  });
  it("resolves a falsy value to undefined", () => {
    expect(cleanObjectInput("")).toBeUndefined();
    expect(cleanObjectInput(null)).toBeUndefined();
    expect(cleanObjectInput(undefined)).toBeUndefined();
  });
  it("returns a malformed JSON string unchanged instead of throwing", () => {
    expect(cleanObjectInput("{not json")).toBe("{not json");
    expect(cleanObjectInput("plain text")).toBe("plain text");
  });
});
describe("cleanTriStateBoolInput", () => {
  it("resolves the blank option to undefined", () => {
    expect(cleanTriStateBoolInput("")).toBeUndefined();
    expect(cleanTriStateBoolInput(null)).toBeUndefined();
    expect(cleanTriStateBoolInput(undefined)).toBeUndefined();
  });
  it("converts the two chosen options to booleans", () => {
    expect(cleanTriStateBoolInput("true")).toBe(true);
    expect(cleanTriStateBoolInput("false")).toBe(false);
  });
});
describe("cleanKeyValueListInput", () => {
  it("folds a pair list into an object", () => {
    expect(
      cleanKeyValueListInput([
        { key: "a", value: "1" },
        { key: "b", value: "2" },
      ]),
    ).toEqual({ a: "1", b: "2" });
  });
  it("resolves an absent list to an empty object, not undefined", () => {
    expect(cleanKeyValueListInput(undefined)).toEqual({});
    expect(cleanKeyValueListInput(null)).toEqual({});
    expect(cleanKeyValueListInput([])).toEqual({});
  });
  it("leaves non-string values as they are", () => {
    expect(
      cleanKeyValueListInput([{ key: "nested", value: { a: 1 } }]),
    ).toEqual({
      nested: { a: 1 },
    });
  });
});
describe("cleanMetadataInput", () => {
  it("folds a pair list into an object with stringified values", () => {
    expect(
      cleanMetadataInput([
        { key: "orderId", value: 1234 },
        { key: "vip", value: true },
      ]),
    ).toEqual({ orderId: "1234", vip: "true" });
  });
  it("resolves an absent list to an empty object, not undefined", () => {
    expect(cleanMetadataInput(undefined)).toEqual({});
    expect(cleanMetadataInput(null)).toEqual({});
    expect(cleanMetadataInput([])).toEqual({});
  });
});
describe("util.types.toString used as a clean", () => {
  it("coerces to a string and never returns undefined", () => {
    expect(util.types.toString("cus_123")).toBe("cus_123");
    expect(util.types.toString(42)).toBe("42");
  });
  it("resolves an absent value to an empty string rather than undefined", () => {
    expect(util.types.toString(undefined)).toBe("");
    expect(util.types.toString(null)).toBe("");
    expect(util.types.toString("")).toBe("");
  });
});
describe("util.types.toBool used as a clean", () => {
  it("maps the string forms of true and false", () => {
    expect(util.types.toBool("true")).toBe(true);
    expect(util.types.toBool("yes")).toBe(true);
    expect(util.types.toBool("false")).toBe(false);
    expect(util.types.toBool("no")).toBe(false);
  });
  it("passes a real boolean through", () => {
    expect(util.types.toBool(true)).toBe(true);
    expect(util.types.toBool(false)).toBe(false);
  });
  it("collapses a blank to false", () => {
    expect(util.types.toBool("")).toBe(false);
    expect(util.types.toBool(undefined)).toBe(false);
  });
});
describe("util.types.toNumber used as a clean", () => {
  it("coerces a numeric string", () => {
    expect(util.types.toNumber("12")).toBe(12);
    expect(util.types.toNumber("3.22")).toBe(3.22);
  });
  it("throws on a value it cannot coerce", () => {
    expect(() => util.types.toNumber("Hello")).toThrow(
      "Value 'Hello' cannot be coerced to a number.",
    );
  });
  it("resolves an absent value to 0", () => {
    expect(util.types.toNumber(undefined)).toBe(0);
    expect(util.types.toNumber("")).toBe(0);
    expect(util.types.toNumber(null)).toBe(0);
  });
});
describe("util.types.toObject used as a clean", () => {
  it("parses a JSON string and passes a value through otherwise", () => {
    expect(util.types.toObject('[{"price":"price_123","quantity":1}]')).toEqual(
      [{ price: "price_123", quantity: 1 }],
    );
    const value = [{ price: "price_123" }];
    expect(util.types.toObject(value)).toBe(value);
  });
  it("returns a malformed JSON string unchanged rather than throwing", () => {
    expect(util.types.toObject("[{not json")).toBe("[{not json");
  });
});
describe("cleanRequiredAmountInput", () => {
  it("coerces an integer string", () => {
    expect(cleanRequiredAmountInput("2000")).toBe(2000);
  });
  it("rejects a fractional value instead of truncating it", () => {
    expect(() => cleanRequiredAmountInput(10.7)).toThrow(
      "Value '10.7' must be a whole number.",
    );
    expect(() => cleanRequiredAmountInput("44.55")).toThrow(
      "Value '44.55' must be a whole number.",
    );
  });
  it("preserves a zero and never resolves to undefined", () => {
    expect(cleanRequiredAmountInput(0)).toBe(0);
    expect(cleanRequiredAmountInput("0")).toBe(0);
    expect(cleanRequiredAmountInput("")).toBe(0);
  });
  it("throws on an uncoercible value", () => {
    expect(() => cleanRequiredAmountInput("abc")).toThrow(
      "Value 'abc' cannot be coerced to a number.",
    );
  });
});
