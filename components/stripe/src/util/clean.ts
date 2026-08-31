import type { KeyValuePair } from "@prismatic-io/spectral";
import { util } from "@prismatic-io/spectral";
export const cleanNumberInput = (number: unknown) =>
  number ? util.types.toNumber(number) : undefined;
export const cleanIntegerInput = (value: unknown) => {
  if (value === undefined || value === null || value === "") {
    return undefined;
  }
  const parsed = util.types.toNumber(value);
  if (!Number.isInteger(parsed)) {
    throw new Error(`Value '${value}' must be a whole number.`);
  }
  return parsed;
};
export const cleanAmountInput = cleanIntegerInput;
export const cleanRequiredAmountInput = (value: unknown): number => {
  const parsed = util.types.toNumber(value);
  if (!Number.isInteger(parsed)) {
    throw new Error(`Value '${value}' must be a whole number.`);
  }
  return parsed;
};
export const cleanStringInput = (string: unknown) =>
  string ? util.types.toString(string) : undefined;
export const cleanStringListInput = (value: unknown): string[] | undefined =>
  Array.isArray(value) && value.length > 0
    ? value.map((item) => util.types.toString(item))
    : undefined;
export const cleanRequiredStringListInput = (value: unknown): string[] =>
  Array.isArray(value) ? value.map((item) => util.types.toString(item)) : [];
export const cleanObjectInput = (object: unknown) =>
  object ? util.types.toObject(object) : undefined;
export const cleanTriStateBoolInput = (value: unknown) =>
  value === undefined || value === null || value === ""
    ? undefined
    : util.types.toBool(value);
export const cleanKeyValueListInput = (value: unknown) =>
  util.types.keyValPairListToObject((value ?? []) as KeyValuePair<unknown>[]);
export const cleanMetadataInput = (value: unknown) =>
  util.types.keyValPairListToObject<string>(
    (value ?? []) as KeyValuePair<unknown>[],
    util.types.toString,
  );
