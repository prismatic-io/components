import { type KeyValuePair, util } from "@prismatic-io/spectral";

export const cleanKeyValueListInput = (value: unknown) =>
  value
    ? util.types.keyValPairListToObject(value as KeyValuePair[])
    : undefined;
