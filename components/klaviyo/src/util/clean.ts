import { util } from "@prismatic-io/spectral";
export const cleanStringInput = (value: unknown) =>
  value ? util.types.toString(value) : undefined;
export const cleanNumberInput = (value: unknown) =>
  value ? util.types.toNumber(value) : undefined;
export const cleanValueListInput = (value: unknown): string[] | undefined => {
  if (Array.isArray(value)) {
    return value.length > 0 ? value : undefined;
  }
  return undefined;
};
export const cleanBooleanInput = (value: unknown) =>
  value ? util.types.toBool(value) : undefined;
const throwCodeInputError = (inputLabel: string) => {
  throw new Error(`Invalid code for ${inputLabel} input.`);
};
export const cleanCodeInput = (value: unknown, inputLabel: string) => {
  if (value) {
    try {
      return util.types.toObject(value);
    } catch (_error) {
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
export const cleanDate = (value: unknown, inputLabel: string) => {
  if (value) {
    const date = new Date(util.types.toString(value));
    if (!Number.isNaN(date.getTime())) {
      return date;
    }
    throw new Error(`Invalid date for ${inputLabel} input.`);
  }
  return undefined;
};
export const lookBackDateClean = (value: unknown): string => {
  const raw = value ? util.types.toString(value).trim() : "";
  if (!raw) return "";
  if (!/^\d{4}-\d{2}-\d{2}$/.test(raw)) {
    throw new Error("Look-back Date must be in YYYY-MM-DD format.");
  }
  const [year, month, day] = raw.split("-").map(Number);
  const date = new Date(Date.UTC(year, month - 1, day));
  if (
    date.getUTCFullYear() !== year ||
    date.getUTCMonth() !== month - 1 ||
    date.getUTCDate() !== day
  ) {
    throw new Error("Look-back Date is not a valid calendar date.");
  }
  const today = new Date();
  today.setUTCHours(0, 0, 0, 0);
  if (date > today) {
    throw new Error("Look-back Date cannot be a future date.");
  }
  return raw;
};
export const bufferToDataUri = (buffer: Buffer, mimeType: string): string => {
  const base64String = buffer.toString("base64");
  return `data:${mimeType};base64,${base64String}`;
};
