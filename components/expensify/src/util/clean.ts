import { util } from "@prismatic-io/spectral";

export const toOptionalString = (value: unknown): string | undefined =>
  value ? util.types.toString(value) : undefined;

export const toOptionalObject = (value: unknown): object | undefined => {
  if (typeof value === "string" && value.trim() === "") {
    return undefined;
  }
  return value ? util.types.toObject(value) : undefined;
};

export const valueListInputClean = (value: unknown): string[] | undefined => {
  const IS_ARRAY_WITH_NO_DEFAULT_VALUE =
    Array.isArray(value) && value.length >= 1 && value[0].trim() !== "";
  if (IS_ARRAY_WITH_NO_DEFAULT_VALUE) {
    return value as string[];
  }
  return undefined;
};

export const toOptionalBool = (value: unknown): boolean | undefined =>
  value === undefined || value === null || value === ""
    ? undefined
    : util.types.toBool(value);
