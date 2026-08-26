import { util } from "@prismatic-io/spectral";
export const toOptionalString = (value: unknown): string | undefined =>
  value ? util.types.toString(value) : undefined;
export const toOptionalNumber = (value: unknown): number | undefined =>
  value ? util.types.toNumber(value) : undefined;
export const asStringArray = (value: unknown): string[] =>
  (Array.isArray(value) ? value : []).map((v) => util.types.toString(v));
export const toNonEmptyArray = (value: unknown, label: string): unknown[] => {
  const arr = util.types.toObject(value);
  if (!Array.isArray(arr) || arr.length === 0) {
    throw new Error(`${label} must be a non-empty JSON array.`);
  }
  return arr;
};
