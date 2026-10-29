import { type KeyValuePair, util } from "@prismatic-io/spectral";

export const toOptionalString = (value: unknown): string | undefined =>
  value ? util.types.toString(value) : undefined;

export const toOptionalInt = (value: unknown): number | undefined =>
  value ? util.types.toInt(value) : undefined;

export const toStringRecord = (value: unknown): Record<string, string> =>
  util.types.keyValPairListToObject(value as KeyValuePair<unknown>[]) as Record<
    string,
    string
  >;
