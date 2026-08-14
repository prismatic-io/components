import { type KeyValuePair, util } from "@prismatic-io/spectral";
export const cleanBoolean = (value: unknown): boolean | undefined =>
  value ? util.types.toBool(value) : undefined;
export const cleanString = (value: unknown): string | undefined =>
  value ? util.types.toString(value) : undefined;
export const cleanCode = (
  value: unknown,
): Record<string, unknown> | undefined =>
  value ? (util.types.toObject(value) as Record<string, unknown>) : undefined;
export const cleanNumber = (value: unknown): number | undefined =>
  value ? util.types.toNumber(value) : undefined;
export const cleanKeyValueList = (
  value: unknown,
): Record<string, unknown> | undefined =>
  value
    ? util.types.keyValPairListToObject(value as KeyValuePair[])
    : undefined;
