import { type KeyValuePair, util } from "@prismatic-io/spectral";

export const cleanString = (value: unknown): string =>
  util.types.toString(value).trim();

export const toOptionalString = (value: unknown): string | undefined =>
  value ? util.types.toString(value) : undefined;

export const cleanKeyValueList = (value: unknown): Record<string, unknown> =>
  util.types.keyValPairListToObject(value as KeyValuePair<unknown>[]);

export const cleanExpirationDays = (value: unknown): number => {
  const days = util.types.toNumber(value);
  return days > 0 && days <= 30 ? days : 3;
};
