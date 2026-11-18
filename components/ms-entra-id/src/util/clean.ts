import { util } from "@prismatic-io/spectral";

export const toOptionalString = (value: unknown): string | undefined =>
  value ? util.types.toString(value) : undefined;

export const toOptionalNumber = (value: unknown): number | undefined =>
  value ? util.types.toNumber(value) : undefined;

export const cleanBooleanInput = (value: unknown): boolean | undefined =>
  value ? util.types.toBool(value) : undefined;

export const cleanCodeInput = (
  value: unknown,
  inputLabel: string,
): object | undefined => {
  if (value) {
    try {
      const parsed = util.types.toObject(value);
      if (util.types.isString(parsed)) {
        throwCodeInputError(inputLabel);
      }
      return parsed;
    } catch (_error) {
      throwCodeInputError(inputLabel);
    }
  }
  return undefined;
};

export const cleanGroupTypes = (groupType: unknown): string[] | undefined => {
  if (groupType && util.types.isString(groupType)) {
    const groupTypes = groupType.split(",");
    return groupTypes.map((type) => type.trim());
  }
  return undefined;
};

export const cleanChangeType = (changeType: unknown): string => {
  if (changeType && Array.isArray(changeType)) {
    if (changeType.length === 0) {
      throw new Error("Change type input must have at least one value.");
    }
    const changeTypes = new Set(
      changeType.map((type) => util.types.toString(type)),
    );
    return Array.from(changeTypes).join(",");
  }
  throw new Error("Invalid change type input.");
};

export const cleanHeaders = (headersList: unknown): Record<string, string> => {
  if (Array.isArray(headersList)) {
    return util.types.keyValPairListToObject(headersList);
  }
  return {};
};

const throwCodeInputError = (inputLabel: string): never => {
  throw new Error(`Invalid code for ${inputLabel} input.`);
};
