import { util } from "@prismatic-io/spectral";
import { LOOK_BACK_DATE_PATTERN } from "../constants";
export const toOptionalString = (value: unknown): string | undefined =>
  value ? util.types.toString(value) : undefined;
export const validateId = (value: unknown) => {
  const strValue = util.types.toString(value).trim();
  if (/^[0-9]+$/.test(strValue)) {
    return strValue;
  } else {
    throw new Error(
      `Asana global IDs are numbers. "${strValue}" is not a valid Asana global ID.`,
    );
  }
};
export const validateUserId = (value: unknown) => {
  const strValue = util.types.toString(value).trim();
  return strValue === "me" ? strValue : validateId(strValue);
};
export const toOptionalDate = (value: unknown): Date | undefined =>
  value ? util.types.toDate(value) : undefined;
export const toOptionalId = (value: unknown): string | undefined => {
  const str = toOptionalString(value);
  if (str === undefined) return undefined;
  return validateId(str);
};
export const toCommaSeparatedList = (value: unknown): string => {
  const str = util.types.toString(value);
  return str
    .split(",")
    .map((field) => field.trim())
    .filter(Boolean)
    .join(",");
};
export const toOptionalStringArray = (value: unknown) => {
  if (typeof value === "object" && Array.isArray(value) && value.length > 0) {
    return value.map((el) => util.types.toString(el));
  }
  return undefined;
};
export const toOptionalInt = (value: unknown): number | undefined =>
  value ? util.types.toInt(value) : undefined;
export const toOptionalBool = (value: unknown): boolean | undefined =>
  value === "" ? undefined : util.types.toBool(value);
export const toOptionalTrimmedString = (value: unknown): string | undefined =>
  util.types.toString(value).trim() || undefined;
export const toOptionalObject = (value: unknown) =>
  value ? util.types.toObject(value) : undefined;
export const toStringArray = (value: unknown) => {
  if (typeof value === "object" && Array.isArray(value) && value.length > 0) {
    return value.map((el) => util.types.toString(el));
  }
  return [];
};
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
