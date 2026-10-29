import { util } from "@prismatic-io/spectral";

export const toOptionalString = (value: unknown) =>
  value ? util.types.toString(value) : undefined;

export const toOptionalInt = (value: unknown) =>
  value ? util.types.toInt(value) : undefined;

export const toOptionalObject = <T>(value: unknown): T | undefined =>
  value ? (util.types.toObject(value) as T) : undefined;

const YYYY_MM_DD = /^\d{4}-\d{2}-\d{2}$/;

export const lookBackDateClean = (value: unknown): string => {
  const raw = util.types.toString(value).trim();
  if (!raw) return "";
  if (!YYYY_MM_DD.test(raw)) {
    throw new Error("Look-back Date must be in YYYY-MM-DD format.");
  }
  const parsed = new Date(`${raw}T00:00:00Z`);
  if (Number.isNaN(parsed.getTime())) {
    throw new Error("Look-back Date is not a valid calendar date.");
  }
  const [y, m, d] = raw.split("-").map(Number);
  if (
    parsed.getUTCFullYear() !== y ||
    parsed.getUTCMonth() + 1 !== m ||
    parsed.getUTCDate() !== d
  ) {
    throw new Error("Look-back Date is not a valid calendar date.");
  }
  if (parsed.getTime() > Date.now()) {
    throw new Error("Look-back Date cannot be a future date.");
  }
  return raw;
};
