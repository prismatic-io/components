import { type KeyValuePair, util } from "@prismatic-io/spectral";
export const cleanString = (value: unknown): string | undefined =>
  value ? util.types.toString(value) : undefined;
export const cleanNumber = (value: unknown): number | undefined =>
  value ? util.types.toNumber(value) : undefined;
export const cleanObject = (value: unknown): object | undefined =>
  value ? util.types.toObject(value) : undefined;
export const cleanKeyValPair = (
  value: unknown,
): Record<string, unknown> | undefined =>
  value
    ? util.types.keyValPairListToObject(value as KeyValuePair<unknown>[])
    : undefined;
