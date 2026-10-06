import { type KeyValuePair, util } from "@prismatic-io/spectral";
import { LOOK_BACK_DATE_PATTERN } from "../constants";
import type { StringCleanFor, TagAction } from "../types";
export const cleanNumber = (value: unknown): number | undefined =>
  value ? util.types.toNumber(value) : undefined;
export const cleanCommaSeparatedString = (
  idsString: unknown,
): number[] | undefined =>
  idsString
    ? commaSeparatedStringToArrayOfNumbers(util.types.toString(idsString))
    : undefined;
export const cleanNumberArray = (value: unknown): number[] | undefined => {
  if (Array.isArray(value)) {
    return value.map((string: string) => util.types.toNumber(string));
  }
  return undefined;
};
export const cleanStringArray = (value: unknown): string[] | undefined => {
  if (Array.isArray(value)) {
    return value.map((string: string) => util.types.toString(string));
  }
  return undefined;
};
export const cleanString = (value: unknown): string | undefined => {
  const str = util.types.toString(value);
  return str ? str : undefined;
};
export const cleanStringByRequired = <R extends boolean>(
  required: R,
): StringCleanFor<R> =>
  (required ? util.types.toString : cleanString) as StringCleanFor<R>;
export const toKeyValuePairList = (
  value: unknown,
): KeyValuePair[] | undefined =>
  Array.isArray(value) ? (value as KeyValuePair[]) : undefined;
export const toTimestampIfDate = (value: unknown): unknown =>
  util.types.isDate(value) ? util.types.toDate(value).getTime() : value;
const commaSeparatedStringToArrayOfNumbers = (str: string): number[] =>
  str
    .replace(/\s/g, "")
    .split(",")
    .map((s: string) => util.types.toNumber(s));
export const lookBackDateClean = (value: unknown): string => {
  const raw = util.types.toString(value).trim();
  if (raw === "") {
    return "";
  }
  const match = raw.match(LOOK_BACK_DATE_PATTERN);
  if (!match) {
    throw new Error(
      `Look-back Date must be a date in YYYY-MM-DD format. Received: ${raw}`,
    );
  }
  const [, yearStr, monthStr, dayStr] = match;
  const year = util.types.toNumber(yearStr);
  const month = util.types.toNumber(monthStr);
  const day = util.types.toNumber(dayStr);
  const parsed = new Date(Date.UTC(year, month - 1, day));
  if (
    parsed.getUTCFullYear() !== year ||
    parsed.getUTCMonth() !== month - 1 ||
    parsed.getUTCDate() !== day
  ) {
    throw new Error(
      `Look-back Date must be a date in YYYY-MM-DD format. Received: ${raw}`,
    );
  }
  if (parsed.getTime() > Date.now()) {
    throw new Error(`Look-back Date cannot be a future date. Received: ${raw}`);
  }
  return parsed.toISOString();
};
export const cleanTagAction = (value: unknown): TagAction =>
  util.types.toString(value) as TagAction;
