import { type DataPayload, util } from "@prismatic-io/spectral";
import { LOOK_BACK_DATE_PATTERN } from "../constants";
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
export const lookBackDateClean = (value: unknown): string | undefined => {
  const raw = util.types.toString(value).trim();
  if (!raw) {
    return undefined;
  }
  const match = raw.match(LOOK_BACK_DATE_PATTERN);
  if (!match) {
    throw new Error(
      `Look-back Date must be a date in YYYY-MM-DD format. Received: ${raw}`,
    );
  }
  const [, yearStr, monthStr, dayStr] = match;
  const year = util.types.toNumber(yearStr);
  const month = util.types.toNumber(monthStr);
  const day = util.types.toNumber(dayStr);
  const parsed = new Date(Date.UTC(year, month - 1, day));
  if (
    parsed.getUTCFullYear() !== year ||
    parsed.getUTCMonth() !== month - 1 ||
    parsed.getUTCDate() !== day
  ) {
    throw new Error(
      `Look-back Date must be a date in YYYY-MM-DD format. Received: ${raw}`,
    );
  }
  if (parsed.getTime() > Date.now()) {
    throw new Error(`Look-back Date cannot be a future date. Received: ${raw}`);
  }
  return parsed.toISOString();
};
export const cleanDataInput = (value: unknown): DataPayload | undefined => {
  if (value) {
    return util.types.toData(value);
  }
  return undefined;
};
