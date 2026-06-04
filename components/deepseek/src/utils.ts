import { util } from "@prismatic-io/spectral";

export const cleanRangeNumber = (
  value: unknown,
  min: number,
  max: number,
  message: string
) => {
  const numberValue = util.types.toNumber(value);
  if (numberValue < min || numberValue > max) {
    throw new Error(message);
  }

  return numberValue;
};

export const cleanOptionalRangeNumber = (
  value: unknown,
  min: number,
  max: number,
  message: string
) => {
  if (!value) {
    return undefined;
  }

  return cleanRangeNumber(value, min, max, message);
};

export const toOptionalString = (value: unknown) =>
  util.types.toString(value) || undefined;

export const toOptionalStringValueList = (value: unknown) => {
  const values = (value as unknown[]).map((v) => util.types.toString(v));

  return values?.length > 0 ? values : undefined;
};

export const toOptionalObject = (value: unknown) => {
  const valueObject = util.types.toObject(value);

  return Object.keys(valueObject || {})?.length > 0 ? valueObject : undefined;
};
