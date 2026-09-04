import { util } from "@prismatic-io/spectral";
import type { Expand } from "dynamics-web-api";
import { LOOK_BACK_DATE_PATTERN } from "../constants";
export const toOptionalString = (value: unknown): string | undefined =>
  value ? util.types.toString(value) : undefined;
export const toOptionalNumber = (value: unknown): number | undefined =>
  value ? util.types.toNumber(value) : undefined;
export const toStringList = (rawValue: unknown): string[] | undefined => {
  if (!Array.isArray(rawValue) || rawValue.length === 0) {
    return undefined;
  }
  return rawValue.map((item) => util.types.toString(item));
};
export const toExpandList = (rawValue: unknown): Expand[] | undefined => {
  if (!Array.isArray(rawValue) || rawValue.length === 0) {
    return undefined;
  }
  return rawValue.map((item) => ({
    property: util.types.toString(item),
  }));
};
export const toPicklistStrings = (value: unknown): string[] =>
  util.types.isPicklist(value) ? (value as string[]) : [];
export const toPicklistLowerCase = (value: unknown): string[] =>
  util.types.isPicklist(value)
    ? (value as string[]).map((name) => name.trim().toLowerCase())
    : [];
export const toDynamicValues = (value: unknown): Record<string, unknown> =>
  value
    ? Object.entries(value).reduce<Record<string, unknown>>((prev, [k, v]) => {
        prev[k] = v;
        return prev;
      }, {})
    : {};
export const lookBackDateClean = (value: unknown): string | undefined => {
  const raw = toOptionalString(value);
  if (!raw) return raw;
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
  return raw;
};
export const toFilteredStringList = (
  rawValue: unknown,
): string[] | undefined => {
  if (!Array.isArray(rawValue) || rawValue.filter(Boolean).length === 0) {
    return undefined;
  }
  return rawValue.map((item) => util.types.toString(item)).filter(Boolean);
};
