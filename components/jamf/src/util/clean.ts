import { util } from "@prismatic-io/spectral";
import { LOOK_BACK_DATE_PATTERN } from "../constants";
export const toOptionalString = (value: unknown) =>
  value ? util.types.toString(value) : undefined;
export const toOptionalNumber = (value: unknown) =>
  value ? util.types.toNumber(value) : undefined;
export const toOptionalBool = (value: unknown) =>
  value === undefined || value === null || value === ""
    ? undefined
    : util.types.toBool(value);
export const asStringArray = (value: unknown) => value as string[];
export const lookBackDateClean = (value: unknown): string => {
  const raw = value ? util.types.toString(value).trim() : "";
  if (!raw) {
    return "";
  }
  const match =
    typeof value === "string" ? raw.match(LOOK_BACK_DATE_PATTERN) : null;
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
