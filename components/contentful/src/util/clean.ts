import { util } from "@prismatic-io/spectral";
import { LOOK_BACK_DATE_PATTERN } from "../constants";
export const toOptionalString = (value: unknown): string | undefined =>
  value ? util.types.toString(value) : undefined;
export const toOptionalObject = (value: unknown): object | undefined => {
  if (value) {
    return util.types.toObject(value);
  }
  return undefined;
};
export const cleanStringValueListInput = (
  value: unknown,
): string[] | undefined => {
  if (!value || !Array.isArray(value)) {
    return undefined;
  }
  return value
    .filter(Boolean)
    .map((item) => util.types.toString(item))
    .filter((item) => item !== "");
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
