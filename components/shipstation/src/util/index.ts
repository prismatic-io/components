import { type KeyValuePair, util } from "@prismatic-io/spectral";

export const cleanStringInput = (value: unknown): string | undefined =>
  value ? util.types.toString(value) : undefined;

export const toOptionalNumber = (value: unknown): number | undefined =>
  value !== null && value !== undefined
    ? util.types.toNumber(value)
    : undefined;

export const validateJSON = (input: unknown) =>
  input ? util.types.toObject(input) : undefined;

export const validateJSONArray = (input: unknown) => {
  const parsed = util.types.toObject(input);
  if (!Array.isArray(parsed)) {
    throw new Error("JSON is not an array");
  }
  return parsed;
};

export const cleanKeyValueListInput = (value: unknown) =>
  value
    ? util.types.keyValPairListToObject(
        value as KeyValuePair[],
        util.types.toObject,
      )
    : undefined;
