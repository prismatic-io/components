import { parseXml } from "./xml";

describe("parseXml", () => {
  test.each([
    ["00123", 123],
    ["0x1F", 31],
    ["2500000.0", 2500000],
    ["-12.50", -12.5],
    ["1e5", 1],
    ["12345678901234567890", 12345678901234567000],
    ["true", true],
    ["false", false],
    ["TRUE", "TRUE"],
    ["yes", "yes"],
    ["0X1F", 0],
    ["+1 (555) 010-0199", "+1 (555) 010-0199"],
  ])("coerces tag value %p like fast-xml-parser 3.x", (value, expected) => {
    expect(parseXml(`<a>${value}</a>`)).toStrictEqual({ a: expected });
  });

  test.each([
    "Infinity",
    "+Infinity",
    "-Infinity",
  ])("yields NaN for %p like fast-xml-parser 3.x instead of throwing", (value) => {
    expect(parseXml(`<a>${value}</a>`)).toStrictEqual({ a: Number.NaN });
  });

  test("truncates an exponent that overflows Number to its integer prefix like 3.x", () => {
    expect(parseXml("<a>1e400</a>")).toStrictEqual({ a: 1 });
  });

  test("leaves entities undecoded", () => {
    expect(parseXml('<a t="x &amp; y">&lt;b&gt;</a>')).toStrictEqual({
      a: { _text: "&lt;b&gt;", "@_t": "x &amp; y" },
    });
  });

  test("does not expand DOCTYPE entities", () => {
    expect(
      parseXml('<!DOCTYPE r [<!ENTITY e "boom">]><r>&e;</r>'),
    ).toStrictEqual({ r: "&e;" });
  });

  test("omits the XML declaration and processing instructions", () => {
    expect(
      parseXml('<?xml version="1.0"?><r><?pi data?><a>1</a></r>'),
    ).toStrictEqual({
      r: { a: 1 },
    });
  });

  test("returns an empty object for an empty body", () => {
    expect(parseXml("")).toStrictEqual({});
  });
});
