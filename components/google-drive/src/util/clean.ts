import { util } from "@prismatic-io/spectral";
import { MY_DRIVE } from "../constants";
export const cleanStringInput = (value: unknown): string | undefined =>
  value ? util.types.toString(value) : undefined;
export const cleanIntegerInput = (value: unknown): number | undefined =>
  value === undefined || value === null || value === ""
    ? undefined
    : util.types.toInt(value);
export const cleanArrayInput = (value: unknown): string[] => {
  if (Array.isArray(value)) {
    return value.map(cleanStringInput).filter(Boolean);
  }
  return [];
};
export const cleanItemInput = (value: unknown): string | undefined => {
  const string = cleanStringInput(value);
  if (value === MY_DRIVE) {
    return undefined;
  }
  if (string) {
    return string.includes("items/") ? string : `items/${string}`;
  }
  return undefined;
};
const LOOK_BACK_DATE_PATTERN = /^(\d{4})-(\d{2})-(\d{2})$/;
export const lookBackDateClean = (value: unknown): string => {
  if (
    value === undefined ||
    value === null ||
    (typeof value === "string" && value.trim() === "")
  ) {
    return "";
  }
  const raw = typeof value === "string" ? value.trim() : String(value);
  const match =
    typeof value === "string" ? raw.match(LOOK_BACK_DATE_PATTERN) : null;
  if (!match) {
    throw new Error(
      `Look-back Date must be a date in YYYY-MM-DD format. Received: ${raw}`,
    );
  }
  const [, yearStr, monthStr, dayStr] = match;
  const year = Number(yearStr);
  const month = Number(monthStr);
  const day = Number(dayStr);
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
