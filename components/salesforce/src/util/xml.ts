import { util } from "@prismatic-io/spectral";
import { XMLParser } from "fast-xml-parser";
const parseV3TagValue = (
  _tagName: string,
  value: string,
): string | number | boolean => {
  if (value.trim() === "" || !util.types.isNumber(value)) {
    return value === "true" ? true : value === "false" ? false : value;
  }
  if (value.includes("0x") || value.includes("."))
    return util.types.toNumber(value);
  if (/^[+-]?Infinity$/.test(value.trim())) return Number.NaN;
  return util.types.toInt(value);
};
const xmlParser = new XMLParser({
  ignoreAttributes: false,
  removeNSPrefix: false,
  textNodeName: "_text",
  parseTagValue: false,
  tagValueProcessor: parseV3TagValue,
  processEntities: false,
  ignoreDeclaration: true,
  ignorePiTags: true,
});
export const parseXml = (xml: string): unknown => xmlParser.parse(xml) || {};
