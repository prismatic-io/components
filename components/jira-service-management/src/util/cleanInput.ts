import { util } from "@prismatic-io/spectral";
export const toOptionalString = (value: unknown) =>
  value ? util.types.toString(value) : undefined;
export const toOptionalNumber = (value: unknown) =>
  value ? util.types.toNumber(value) : undefined;
const LOOK_BACK_DATE_PATTERN = /^(\d{4})-(\d{2})-(\d{2})$/;
export const lookBackDateClean = (value: unknown): string => {
  if (value === undefined || value === null) {
    return "";
  }
  const raw = typeof value === "string" ? value.trim() : String(value);
  if (raw === "") {
    return "";
  }
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
export const toObjectOrEmpty = (value: unknown): Record<string, unknown> =>
  value ? (util.types.toObject(value) as Record<string, unknown>) : {};
export const toOptionalArray = (value: unknown): unknown[] | undefined => {
  if (!value) return undefined;
  const parsed = util.types.toObject(value);
  return Array.isArray(parsed) && parsed.length ? parsed : undefined;
};
export const toOptionalObject = (
  value: unknown,
): Record<string, unknown> | undefined => {
  if (!value) return undefined;
  const parsed = util.types.toObject(value) as Record<string, unknown>;
  return parsed && Object.keys(parsed).length ? parsed : undefined;
};
