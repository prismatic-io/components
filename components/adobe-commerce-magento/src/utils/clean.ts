import { util } from "@prismatic-io/spectral";
import { LOOK_BACK_DATE_PATTERN } from "../constants";

export const cleanString = (value: unknown): string | undefined =>
  value ? util.types.toString(value) : undefined;

export const cleanNumber = (value: unknown): number | undefined =>
  util.types.toNumber(value) || undefined;

export const asJsonObject = (
  value: unknown,
  label: string,
): Record<string, unknown> => {
  if (typeof value !== "object" || value === null || Array.isArray(value)) {
    throw new Error(`${label} must be valid JSON.`);
  }
  return { ...(value as Record<string, unknown>) };
};

export const lookBackDateClean = (value: unknown): string | undefined => {
  const str = util.types.toString(value).trim();
  if (!str) return undefined;

  if (!LOOK_BACK_DATE_PATTERN.test(str)) {
    throw new Error("Look-back Date must be a date in YYYY-MM-DD format.");
  }

  const parts = str.split("-");
  const year = util.types.toNumber(parts[0]);
  const month = util.types.toNumber(parts[1]);
  const day = util.types.toNumber(parts[2]);
  const utc = new Date(Date.UTC(year, month - 1, day));
  if (
    utc.getUTCFullYear() !== year ||
    utc.getUTCMonth() !== month - 1 ||
    utc.getUTCDate() !== day
  ) {
    throw new Error("Look-back Date must be a date in YYYY-MM-DD format.");
  }

  if (utc > new Date()) {
    throw new Error("Look-back Date cannot be a future date.");
  }

  return utc.toISOString();
};
