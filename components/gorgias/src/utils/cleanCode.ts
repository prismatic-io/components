import { util } from "@prismatic-io/spectral";

const throwCodeInputError = (inputLabel: string) => {
  throw new Error(`Invalid code for ${inputLabel} input.`);
};

export const cleanCodeInput = (value: unknown, inputLabel: string) => {
  if (value) {
    try {
      return util.types.toObject(value);
    } catch (error) {
      throwCodeInputError(inputLabel);
    }
  }

  return undefined;
};

export const cleanArrayCodeInput = (value: unknown, inputLabel: string) => {
  if (value) {
    let object: unknown;
    try {
      object = util.types.toObject(value);
    } catch (error) {
      throwCodeInputError(inputLabel);
    }
    if (Array.isArray(object)) {
      return object;
    }
    throw new Error(`Invalid array for ${inputLabel} input.`);
  }
  return undefined;
};
