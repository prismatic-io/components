import { util } from "@prismatic-io/spectral";
const throwCodeInputError = (inputLabel: string) => {
  throw new Error(`Invalid code for ${inputLabel} input.`);
};
export const cleanStringInput = (value: unknown) =>
  value ? util.types.toString(value) : undefined;
export const cleanNumberInput = (value: unknown) =>
  value ? util.types.toNumber(value) : undefined;
export const cleanArrayCodeInput = (
  value: unknown,
  inputLabel: string,
  returnEmptyArray = false,
) => {
  if (value) {
    const cleanedArray = cleanCodeInput(value, inputLabel);
    if (Array.isArray(cleanedArray)) {
      return cleanedArray;
    }
    throw new Error(`Invalid array for ${inputLabel} input.`);
  }
  return returnEmptyArray ? [] : undefined;
};
export const cleanCodeInput = (
  value: unknown,
  inputLabel: string,
  returnEmptyObject = false,
) => {
  if (value) {
    try {
      return util.types.toObject(value);
    } catch (_error) {
      throwCodeInputError(inputLabel);
    }
  }
  return returnEmptyObject ? {} : undefined;
};
export const cleanBooleanInput = (value: unknown) =>
  value ? util.types.toBool(value) : undefined;
const LOOK_BACK_DATE_PATTERN = /^(\d{4})-(\d{2})-(\d{2})$/;
export const lookBackDateClean = (value: unknown): string => {
  if (
    value === undefined ||
    value === null ||
    (typeof value === "string" && value.trim() === "")
  ) {
    return "";
  }
  const raw = typeof value === "string" ? value.trim() : String(value);
  const match =
    typeof value === "string" ? raw.match(LOOK_BACK_DATE_PATTERN) : null;
  if (!match) {
    throw new Error(
      `Look-back Date must be a date in YYYY-MM-DD format. Received: ${raw}`,
    );
  }
  const [, yearStr, monthStr, dayStr] = match;
  const year = Number(yearStr);
  const month = Number(monthStr);
  const day = Number(dayStr);
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
