import { util } from "@prismatic-io/spectral";

const throwCodeInputError = (inputLabel: string) => {
  throw new Error(`Invalid code for ${inputLabel} input.`);
};

export const cleanCodeInput = (value: unknown, inputLabel: string) => {
  if (value) {
    try {
      if (typeof value === "string") {
        JSON.parse(value);
      }
      return util.types.toObject(value);
    } catch (_error) {
      throwCodeInputError(inputLabel);
    }
  }
  return undefined;
};

export const cleanArrayCodeInput = (value: unknown, inputLabel: string) => {
  const object = cleanCodeInput(value, inputLabel);
  if (object && typeof object === "object" && !Array.isArray(object)) {
    throw new Error(`Invalid array for ${inputLabel} input.`);
  }
  return object;
};

export const cleanStringInput = (value: unknown) =>
  value ? util.types.toString(value) : undefined;

export const cleanIntegerInput = (value: unknown) =>
  value ? util.types.toNumber(value) : undefined;

export const validateDate = (value: unknown, inputLabel: string): string => {
  if (typeof value !== "string") {
    throw new Error(`Date must be a string for ${inputLabel} input`);
  }

  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  if (!dateRegex.test(value)) {
    throw new Error(
      `Date must be in YYYY-MM-DD format for ${inputLabel} input`,
    );
  }

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    throw new Error(`Invalid date provided for ${inputLabel} input`);
  }

  return value;
};
