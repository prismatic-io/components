import type { CategoryAttributeDefinitionVo } from "../types";
import { MULTI_SELECT_DELIMITER, parseArenaAttributeValue } from "../util";
const def = (fieldType: string, multiSelect = false) =>
  ({
    fieldType,
    multiSelect,
  }) as unknown as CategoryAttributeDefinitionVo;
describe("parseArenaAttributeValue", () => {
  describe("passthrough guards", () => {
    it("returns the value unchanged when no attribute definition is given", () => {
      expect(parseArenaAttributeValue("anything")).toBe("anything");
    });
    it("returns null and undefined unchanged", () => {
      expect(parseArenaAttributeValue(null, def("NUMBER"))).toBeNull();
      expect(
        parseArenaAttributeValue(undefined, def("NUMBER")),
      ).toBeUndefined();
    });
  });
  describe("numeric field types", () => {
    it.each([
      "NUMBER",
      "POSITIVE_DOUBLE",
      "COST",
    ])("parses a decimal string to a float for %s", (fieldType) => {
      expect(parseArenaAttributeValue("2.5", def(fieldType))).toBe(2.5);
    });
    it("leaves an existing number untouched", () => {
      expect(parseArenaAttributeValue(2.5, def("NUMBER"))).toBe(2.5);
    });
    it("keeps the original string when it is not numeric", () => {
      expect(parseArenaAttributeValue("abc", def("NUMBER"))).toBe("abc");
    });
  });
  describe("integer field types", () => {
    it.each([
      "INTEGER",
      "POSITIVE_INTEGER",
    ])("parses an integer string for %s", (fieldType) => {
      expect(parseArenaAttributeValue("3", def(fieldType))).toBe(3);
    });
    it("truncates a numeric value with Math.floor", () => {
      expect(parseArenaAttributeValue(3.9, def("INTEGER"))).toBe(3);
    });
  });
  describe("boolean field type", () => {
    it.each(["true", "1", "yes", "on"])("maps '%s' to true", (value) => {
      expect(parseArenaAttributeValue(value, def("BOOLEAN"))).toBe(true);
    });
    it.each(["false", "0", "no", "off"])("maps '%s' to false", (value) => {
      expect(parseArenaAttributeValue(value, def("BOOLEAN"))).toBe(false);
    });
    it("passes an actual boolean through", () => {
      expect(parseArenaAttributeValue(true, def("BOOLEAN"))).toBe(true);
    });
    it("returns an unrecognized string unchanged", () => {
      expect(parseArenaAttributeValue("maybe", def("BOOLEAN"))).toBe("maybe");
    });
  });
  describe("multi-select delimiter", () => {
    it(`splits a string joined by the "${MULTI_SELECT_DELIMITER}" delimiter into a trimmed array`, () => {
      const joined = ["Red", "Blue", "Green"].join(MULTI_SELECT_DELIMITER);
      expect(parseArenaAttributeValue(joined, def("DROP_DOWN", true))).toEqual([
        "Red",
        "Blue",
        "Green",
      ]);
    });
    it("filters out empty segments", () => {
      const joined = `Red${MULTI_SELECT_DELIMITER}${MULTI_SELECT_DELIMITER}Blue`;
      expect(parseArenaAttributeValue(joined, def("DROP_DOWN", true))).toEqual([
        "Red",
        "Blue",
      ]);
    });
    it("wraps a single value in a one-element array", () => {
      expect(
        parseArenaAttributeValue("OnlyOne", def("DROP_DOWN", true)),
      ).toEqual(["OnlyOne"]);
    });
    it("does NOT split a comma-joined string (pins the current assumption)", () => {
      expect(
        parseArenaAttributeValue("Red, Blue, Green", def("DROP_DOWN", true)),
      ).toEqual(["Red, Blue, Green"]);
    });
  });
  describe("text and other field types", () => {
    it("returns text values unchanged", () => {
      expect(parseArenaAttributeValue("hello", def("SINGLE_LINE_TEXT"))).toBe(
        "hello",
      );
    });
  });
});
