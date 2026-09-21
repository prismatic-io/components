import { util } from "@prismatic-io/spectral";
import { LOOK_BACK_DATE_PATTERN } from "../constants";
export const cleanCodeInput = (value: unknown) =>
  value ? util.types.toObject(value) : {};
export const cleanBooleanInput = (value: unknown) =>
  value ? util.types.toBool(value) : undefined;
export const cleanCustomFields = (value: unknown) => {
  if (value && typeof value === "string" && value.length > 0) {
    try {
      const parsedValue = JSON.parse(value);
      if (!Array.isArray(parsedValue)) {
        throw new Error("Custom Fields must be an array, check the example");
      }
      return parsedValue;
    } catch (_e) {
      throw new Error("Custom Fields invalid JSON");
    }
  } else return [];
};
export const cleanLookBackDate = (value: unknown): string | undefined => {
  const raw = util.types.toString(value).trim();
  if (!raw) {
    return undefined;
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
export const cleanFieldsList = (fields: unknown) => {
  if (fields && Array.isArray(fields) && fields.length > 0)
    return fields.map((field) => util.types.toString(field));
  return [];
};
