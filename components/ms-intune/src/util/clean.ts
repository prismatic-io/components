import { util } from "@prismatic-io/spectral";

export const cleanStringInput = (value: unknown): string | undefined =>
  value ? util.types.toString(value) : undefined;

export const cleanOptionalNumberInput = (value: unknown): number | undefined =>
  util.types.toString(value) === "" ? undefined : util.types.toNumber(value);

export const cleanCodeInput = (value: unknown): object | undefined =>
  value ? util.types.toObject(value) : undefined;

export const cleanBooleanStringInput = (
  value: unknown,
): boolean | undefined => {
  if (value) {
    return util.types.toBool(value);
  }
  return undefined;
};

export const cleanBodyInput = (value: unknown): object =>
  value ? util.types.toObject(value) : {};

export const cleanArrayInput = (value: unknown): string[] | undefined => {
  if (!value) {
    return undefined;
  }
  const data = util.types.toObject(value);
  if (Array.isArray(data)) {
    return data
      .map(cleanStringInput)
      .filter((item): item is string => Boolean(item));
  }
  throw new Error("Change Type must be an array.");
};

export const cleanOptionalArrayInput = (
  value: unknown,
): string[] | undefined => {
  if (value) {
    const data = util.types.toObject(value);
    if (Array.isArray(data)) {
      return data
        .map(cleanStringInput)
        .filter((item): item is string => Boolean(item));
    }
    throw new Error("Member IDs must be an array.");
  }
  return undefined;
};
