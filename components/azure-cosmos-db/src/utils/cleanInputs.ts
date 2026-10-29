import { util } from "@prismatic-io/spectral";

export const toOptionalString = (value: unknown) =>
  value ? util.types.toString(value) : undefined;

export const toOptionalNumber = (value: unknown) =>
  value ? util.types.toNumber(value) : undefined;

const throwJsonInputError = (inputLabel: string) => {
  throw new Error(`Invalid JSON for ${inputLabel} input.`);
};

export const cleanJsonInput = (value: unknown, inputLabel: string) => {
  if (value) {
    try {
      const object = util.types.toObject(value);
      if (typeof object === "string") {
        return JSON.parse(object);
      }
      return object;
    } catch (_error) {
      throwJsonInputError(inputLabel);
    }
  }
  return undefined;
};
