import { type KeyValuePair, util } from "@prismatic-io/spectral";
export const cleanStringInput = (value: unknown): string | undefined =>
  value ? util.types.toString(value) : undefined;
export const toOptionalNumber = (value: unknown): number | undefined =>
  value !== null && value !== undefined
    ? util.types.toNumber(value)
    : undefined;
export const validateJSON = (input: unknown) =>
  input ? util.types.toObject(input) : undefined;
export const validateJSONArray = (input: unknown) => {
  const parsed = util.types.toObject(input);
  if (!Array.isArray(parsed)) {
    throw new Error("JSON is not an array");
  }
  return parsed;
};
export const cleanKeyValueListInput = (value: unknown) =>
  value
    ? util.types.keyValPairListToObject(
        value as KeyValuePair[],
        util.types.toObject,
      )
    : undefined;
const LOOK_BACK_DATE_PATTERN = /^(\d{4})-(\d{2})-(\d{2})$/;
export const lookBackDateClean = (value: unknown): string => {
  const raw = util.types.toString(value).trim();
  if (raw === "") {
    return "";
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
export * from "./watermark";
