import { util } from "@prismatic-io/spectral";
import { LOOK_BACK_DATE_PATTERN } from "../constants";
export const cleanFile = (value: unknown) =>
  value ? util.types.toBufferDataPayload(value) : undefined;
export const cleanString = (value: unknown) =>
  util.types.toString(value) || undefined;
export const cleanNumber = (value: unknown) =>
  value ? util.types.toNumber(value) : undefined;
export const cleanValueList = (value: unknown): string[] | undefined => {
  const list = (value as unknown[] | undefined) ?? [];
  const cleaned = list.map((entry: unknown) => util.types.toString(entry));
  return cleaned.length ? cleaned : undefined;
};
export const cleanValueListToString = (value: unknown): string | undefined => {
  const list = (value as unknown[] | undefined) ?? [];
  const joined = list
    .map((entry: unknown) => util.types.toString(entry))
    .join(",");
  return joined || undefined;
};
export const cleanValueListToEncodedString = (
  value: unknown,
): string | undefined => {
  const list = (value as unknown[] | undefined) ?? [];
  const joined = list
    .map((entry: unknown) => util.types.toString(entry))
    .map((entry: string) => encodeURIComponent(entry))
    .join(",");
  return joined || undefined;
};
export const cleanFunctionForLimitInput = (
  value: unknown,
): number | undefined => {
  const MAX_NUMBER_PER_PAGE = 100;
  if (!value) {
    return undefined;
  }
  const num = util.types.toNumber(value);
  return num > MAX_NUMBER_PER_PAGE ? MAX_NUMBER_PER_PAGE : num;
};
export const lookBackDateClean = (value: unknown): string | undefined => {
  if (
    value === undefined ||
    value === null ||
    (typeof value === "string" && value.trim() === "")
  ) {
    return undefined;
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
export const cleanZendeskDomain = (input: string): string => {
  if (!input) return "";
  const final = input.trim();
  const match = final.match(/([a-zA-Z0-9-]+)\.zendesk\.com/i);
  if (match?.[1]) {
    return `https://${match[1]}.zendesk.com`;
  }
  if (/^[a-zA-Z0-9-]+$/.test(final)) {
    return `https://${final}.zendesk.com`;
  }
  return final;
};
