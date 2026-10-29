import { util } from "@prismatic-io/spectral";

export const cleanFunctionValueList = (value: unknown): string[] => {
  if (Array.isArray(value)) {
    return value
      .map((item) => (item ? util.types.toString(item) : undefined))
      .filter(Boolean) as string[];
  }

  return [] as string[];
};

export const cleanFunctionForString = (value: unknown): string | undefined => {
  if (!value) {
    return undefined;
  }

  return util.types.toString(value);
};

export const cleanFunctionForBoolean = (
  value: unknown,
): boolean | undefined => {
  if (!value) {
    return undefined;
  }
  return util.types.toBool(value);
};

export const cleanFunctionForBooleanValueList = (
  value: unknown,
): Record<string, boolean>[] | undefined => {
  if (Array.isArray(value)) {
    return value.map((item) => {
      const key = util.types.toString(item);
      return {
        [key]: true,
      };
    });
  }

  return undefined;
};

export const cleanNumber = (value: unknown): number | undefined =>
  value ? util.types.toNumber(value) : undefined;

export const cleanJsonArrayInput = (value: unknown): unknown[] | undefined => {
  if (!value) return undefined;
  const parsed = util.types.toObject(value);
  if (!Array.isArray(parsed)) {
    throw new Error("Input must be a JSON array.");
  }
  return parsed;
};
