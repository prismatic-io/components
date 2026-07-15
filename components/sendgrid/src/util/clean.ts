import { type DataPayload, util } from "@prismatic-io/spectral";
export const cleanStringInput = (value: unknown): string | undefined =>
  value ? util.types.toString(value) : undefined;
export const cleanValueListInput = (value: unknown): string[] => {
  if (value && Array.isArray(value)) {
    return value.map((item) => util.types.toString(item));
  }
  return [];
};
const throwCodeInputError = (inputLabel: string): void => {
  throw new Error(`Invalid code for ${inputLabel} input.`);
};
export const cleanArrayCodeInput = (
  value: unknown,
  inputLabel: string,
): Record<string, unknown>[] | undefined => {
  if (value) {
    let object: unknown;
    try {
      object = util.types.toObject(value);
    } catch (_error) {
      throwCodeInputError(inputLabel);
    }
    if (Array.isArray(object)) {
      return object;
    }
    throw new Error(`Invalid array for ${inputLabel} input.`);
  }
  return undefined;
};
export const cleanFieldMappingsInput = (value: unknown) => {
  try {
    const parsedFieldMappings =
      typeof value === "string" ? JSON.parse(value) : value;
    if (
      !Array.isArray(parsedFieldMappings) ||
      parsedFieldMappings.some((m) => typeof m !== "string" && m !== null)
    ) {
      throw new Error("Field Mappings must be an array of strings or null.");
    }
    return parsedFieldMappings;
  } catch (error) {
    const e = error as Error;
    throw new Error(`Invalid JSON format for Field Mappings: ${e.message}`);
  }
};
export const cleanContactsArrayInput = (value: unknown) => {
  try {
    const parsedContacts =
      typeof value === "string" ? JSON.parse(value) : value;
    if (!Array.isArray(parsedContacts)) {
      throw new Error("Contacts input must be an array of contact objects.");
    }
    return parsedContacts;
  } catch (error) {
    const e = error as Error;
    throw new Error(`Invalid JSON format for Contacts: ${e.message}`);
  }
};
export const cleanDataInput = (value: unknown): DataPayload | undefined => {
  if (value) {
    return util.types.toData(value);
  }
  return undefined;
};
