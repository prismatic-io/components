import { type KeyValuePair, util } from "@prismatic-io/spectral";
export const toOptionalString = (value: unknown): string | undefined =>
  value ? util.types.toString(value) : undefined;
export const toKeyValueObject = (value: unknown): Record<string, unknown> =>
  value ? util.types.keyValPairListToObject(value as KeyValuePair[]) : {};
