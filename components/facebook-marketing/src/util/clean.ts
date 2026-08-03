import { type KeyValuePair, util } from "@prismatic-io/spectral";
import { DEFAULT_VERSION } from "../constants";
export const valueListInputClean = (value: unknown) => {
  if (Array.isArray(value)) {
    return value;
  }
  return undefined;
};
export const cleanString = (value: unknown) =>
  value ? util.types.toString(value) : undefined;
export const cleanNumber = (value: unknown) => {
  return value ? util.types.toNumber(value) : undefined;
};
const throwCodeInputError = (inputLabel: string) => {
  throw new Error(`Invalid code for ${inputLabel} input.`);
};
export const cleanCodeInput = (value: unknown, inputLabel: string) => {
  if (value) {
    try {
      const object = util.types.toObject(value);
      if (typeof object === "string") {
        return JSON.parse(object);
      }
      return object;
    } catch (_error) {
      throwCodeInputError(inputLabel);
    }
  }
  return undefined;
};
export const cleanArrayCodeInput = (value: unknown, inputLabel: string) => {
  const object = cleanCodeInput(value, inputLabel);
  if (object) {
    if (Array.isArray(object)) {
      return object;
    }
    throw new Error(`Invalid array for ${inputLabel} input.`);
  }
  return undefined;
};
export const cleanVersion = (value: unknown) => {
  const version = util.types.toInt(value);
  if (!util.types.isInt(version)) return DEFAULT_VERSION;
  return version;
};
export const cleanKeyValuePairs = (values: unknown) =>
  util.types.keyValPairListToObject(values as KeyValuePair<unknown>[]);
export const cleanMoreData = (value: unknown) =>
  cleanCodeInput(value, "More Data") || {};
export const cleanValueList = (value: unknown) => value as string[];
export const eventTimeClean = (value: unknown) => {
  if (!value) {
    return Math.floor(Date.now() / 1000);
  }
  return cleanNumber(value);
};
