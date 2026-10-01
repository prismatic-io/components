import { type KeyValuePair, util } from "@prismatic-io/spectral";
export const toOptionalString = (value: unknown): string | undefined => {
  const str = util.types.toString(value);
  return str ? str : undefined;
};
export const toOptionalNumber = (value: unknown): number | undefined =>
  value ? util.types.toNumber(value) : undefined;
export const toOptionalObject = (value: unknown): object | undefined =>
  value ? util.types.toObject(value) : undefined;
export const toObjectOrEmpty = (value: unknown): object =>
  value ? util.types.toObject(value) : {};
export const keyValPairListToObject = (
  value: unknown,
): Record<string, unknown> =>
  util.types.keyValPairListToObject(value as KeyValuePair<unknown>[]);
export const lookBackDateClean = (value: unknown): string => {
  const str = util.types.toString(value).trim();
  if (!str) return "";
  if (!/^\d{4}-\d{2}-\d{2}$/.test(str)) {
    throw new Error("Look-back Date must be in YYYY-MM-DD format.");
  }
  const parts = str.split("-");
  const year = util.types.toNumber(parts[0]);
  const month = util.types.toNumber(parts[1]);
  const day = util.types.toNumber(parts[2]);
  const parsed = new Date(year, month - 1, day);
  if (
    parsed.getFullYear() !== year ||
    parsed.getMonth() !== month - 1 ||
    parsed.getDate() !== day
  ) {
    throw new Error(`Look-back Date "${str}" is not a valid calendar date.`);
  }
  if (parsed > new Date()) {
    throw new Error("Look-back Date cannot be a future date.");
  }
  return str;
};
