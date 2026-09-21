import { describe, expect, it } from "vitest";
import {
  getDateXmlTags,
  getXmlTagOrEmptyString,
  cleanFunctionForXml,
} from "./xml";
describe("getDateXmlTags", () => {
  it("generates XML tags from a valid MM/DD/YYYY date", () => {
    const result = getDateXmlTags("06/15/2024", "datedue");
    expect(result).toContain("<year>2024</year>");
    expect(result).toContain("<month>06</month>");
    expect(result).toContain("<day>15</day>");
    expect(result).toContain("<datedue>");
    expect(result).toContain("</datedue>");
  });
  it("throws on invalid date format", () => {
    expect(() => getDateXmlTags("2024-06-15", "datedue")).toThrow(
      "Invalid date format.",
    );
    expect(() => getDateXmlTags("13/01/2024", "datedue")).toThrow(
      "Invalid date format.",
    );
  });
});
describe("getXmlTagOrEmptyString", () => {
  it("wraps non-empty value in a tag", () => {
    expect(getXmlTagOrEmptyString("name", "John")).toBe("<name>John</name>");
  });
  it("returns empty string for empty value", () => {
    expect(getXmlTagOrEmptyString("name", "")).toBe("");
  });
});
describe("cleanFunctionForXml", () => {
  it("escapes ampersands to &amp;", () => {
    expect(cleanFunctionForXml("A & B")).toBe("A &amp; B");
  });
  it("handles string without ampersands", () => {
    expect(cleanFunctionForXml("hello")).toBe("hello");
  });
});
