import { type KeyValuePair, util } from "@prismatic-io/spectral";
import { LOOK_BACK_DATE_PATTERN } from "../constants";

const throwInvalidInputError = (kind: string, inputLabel: string): never => {
  throw new Error(`Invalid ${kind} for ${inputLabel} input.`);
};

const assertJsonInput = (value: unknown, inputLabel: string): void => {
  if (typeof value === "string" && !util.types.isJSON(value)) {
    throwInvalidInputError("code", inputLabel);
  }
};

const assertJsonObject = (parsed: unknown, inputLabel: string): void => {
  if (typeof parsed !== "object" || parsed === null) {
    throwInvalidInputError("code", inputLabel);
  }
};

const isEmptyInput = (value: unknown): boolean =>
  value === undefined || value === null || value === "";

export const cleanNumberInput = (value: unknown): number | undefined =>
  isEmptyInput(value) ? undefined : util.types.toNumber(value);

export const cleanStringInput = (value: unknown): string | undefined =>
  value ? util.types.toString(value) : undefined;

export const cleanBooleanInput = (value: unknown): boolean | undefined =>
  isEmptyInput(value) ? undefined : util.types.toBool(value);

export const cleanKeyValueListInput = (
  value: unknown,
): Record<string, unknown> | undefined =>
  value
    ? util.types.keyValPairListToObject(value as KeyValuePair[])
    : undefined;

export const cleanDate = (
  value: unknown,
  inputLabel: string,
): Date | undefined => {
  if (!value) {
    return undefined;
  }
  try {
    return util.types.toDate(value);
  } catch (_error) {
    return throwInvalidInputError("date", inputLabel);
  }
};

export const cleanCodeInput = (
  value: unknown,
  inputLabel: string,
): unknown | undefined => {
  if (!value) {
    return undefined;
  }
  assertJsonInput(value, inputLabel);
  const parsed = util.types.toObject(value);
  assertJsonObject(parsed, inputLabel);
  return parsed;
};

export const cleanArrayCodeInput = (
  value: unknown,
  inputLabel: string,
): unknown[] | undefined => {
  if (!value) {
    return undefined;
  }
  assertJsonInput(value, inputLabel);
  const object = util.types.toObject(value);
  assertJsonObject(object, inputLabel);
  return Array.isArray(object)
    ? object
    : throwInvalidInputError("array", inputLabel);
};

export const cleanValueListInput = (value: unknown): string[] | undefined => {
  const values = (Array.isArray(value) ? value : value ? [value] : [])
    .map((entry) => util.types.toString(entry).trim())
    .filter(Boolean);
  return values.length > 0 ? values : undefined;
};

export const overlapMinutesClean = (value: unknown): number | undefined => {
  if (isEmptyInput(value) || (typeof value === "string" && !value.trim())) {
    return undefined;
  }
  const minutes = Number(typeof value === "string" ? value.trim() : value);
  if (!Number.isInteger(minutes) || minutes < 0) {
    throw new Error(
      `Overlap Minutes must be a whole number of minutes, 0 or more. Received: ${String(value)}`,
    );
  }
  return minutes;
};

export const lookBackDateClean = (value: unknown): string => {
  if (isEmptyInput(value) || (typeof value === "string" && !value.trim())) {
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
  const [year, month, day] = match.slice(1).map(Number);
  const parsed = new Date(Date.UTC(year, month - 1, day));
  if (
    parsed.getUTCFullYear() !== year ||
    parsed.getUTCMonth() !== month - 1 ||
    parsed.getUTCDate() !== day
  ) {
    throw new Error(
      `Look-back Date must be a valid calendar date. Received: ${raw}`,
    );
  }
  if (parsed.getTime() > Date.now()) {
    throw new Error(`Look-back Date cannot be a future date. Received: ${raw}`);
  }
  return parsed.toISOString();
};
