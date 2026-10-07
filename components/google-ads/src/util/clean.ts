import { util } from "@prismatic-io/spectral";
import { LOOK_BACK_DATE_PATTERN } from "../constants";
export const cleanString = (value: unknown): string | undefined => {
  const str = util.types.toString(value);
  return str ? str : undefined;
};
export const cleanCustomerId = (value: unknown): string => {
  const id = util.types.toString(value);
  return id.replace("customers/", "").replace(/-/g, "");
};
export const toOptionalCustomerId = (value: unknown): string | undefined => {
  const id = util.types.toString(value);
  return id ? cleanCustomerId(id) : undefined;
};
export const valueListInputClean = (value: unknown): string | undefined => {
  if (Array.isArray(value) && value.length >= 1 && value[0] !== "000xxx") {
    return value
      .map((v) => `customer_id:${cleanCustomerId(v)}`)
      .toString()
      .replaceAll(",", ";");
  }
  return undefined;
};
export const toOptionalInt = (value: unknown): number | undefined =>
  value ? util.types.toInt(value) : undefined;
export const toStringList = (value: unknown): string[] => {
  if (value && Array.isArray(value)) {
    return value as string[];
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
  return raw;
};
