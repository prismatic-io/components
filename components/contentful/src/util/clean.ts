import { util } from "@prismatic-io/spectral";

export const stringOrUndefinedCleaner = (value: unknown): string | undefined =>
  value ? util.types.toString(value) : undefined;

export const cleanCodeInput = (value: unknown) => {
  if (value) {
    return util.types.toObject(value);
  }
  return undefined;
};

export const cleanStringValueListInput = (value: unknown): string[] => {
  if (value && Array.isArray(value)) {
    return value.map(stringOrUndefinedCleaner).filter(Boolean) as string[];
  }

  return [];
};
