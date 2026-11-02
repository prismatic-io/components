import { util } from "@prismatic-io/spectral";
import {
  DATE_ONLY_PATTERN,
  DEFAULT_DAM_ROOT,
  MAX_PAGE_LIMIT,
} from "../constants";
import { toIsoDate } from "./dates";

export const cleanString = (value: unknown): string | undefined => {
  const str = util.types.toString(value).trim();
  return str ? str : undefined;
};

export const cleanRequiredString = (value: unknown): string =>
  util.types.toString(value).trim();

const DAM_ROOT_RELATIVE = DEFAULT_DAM_ROOT.replace(/^\/+/, "");

const toDamPath = (value: string): string => {
  const relative = value.replace(/^\/+/, "").replace(/\/+$/, "");
  const rooted =
    relative === DAM_ROOT_RELATIVE ||
    relative.startsWith(`${DAM_ROOT_RELATIVE}/`)
      ? relative
      : `${DAM_ROOT_RELATIVE}/${relative}`;
  return `/${rooted}`.replace(/\/+$/, "");
};

export const cleanDamPath = (value: unknown): string | undefined => {
  const str = util.types.toString(value).trim();
  return str ? toDamPath(str) : undefined;
};

export const cleanRequiredDamPath = (value: unknown): string => {
  const str = util.types.toString(value).trim();
  return str ? toDamPath(str) : "";
};

export const cleanStringList = (value: unknown): string[] =>
  (Array.isArray(value) ? value : [])
    .map((item) => util.types.toString(item).trim())
    .filter((item) => item.length > 0);

export const cleanLimit = (value: unknown): number | undefined => {
  const str = util.types.toString(value).trim() || undefined;
  if (str === undefined) return undefined;
  const limit = /^\d+$/.test(str) ? util.types.toInt(str) : undefined;
  if (limit === undefined || limit < 1 || limit > MAX_PAGE_LIMIT) {
    throw new Error(
      `Limit must be a whole number from 1 to ${MAX_PAGE_LIMIT}. Received: ${str}`,
    );
  }
  return limit;
};

export const cleanOptionalDateTime = (value: unknown): string | undefined => {
  const str = util.types.toString(value).trim() || undefined;
  if (str === undefined) return undefined;
  let parsed: Date;
  try {
    parsed = toIsoDate(str);
  } catch {
    throw new Error(`"${str}" is not a valid ISO 8601 date-time.`);
  }
  return parsed.toISOString();
};

export const cleanHttpsUrl = (value: unknown): string => {
  const str = util.types.toString(value).trim() || undefined;
  let parsed: URL | undefined;
  try {
    parsed = str ? new URL(str) : undefined;
  } catch {
    parsed = undefined;
  }
  if (parsed?.protocol !== "https:") {
    throw new Error(`"${str ?? ""}" must be an absolute https:// URL.`);
  }
  return parsed.href;
};

export const cleanOptionalHttpsUrl = (value: unknown): string | undefined =>
  util.types.toString(value).trim()
    ? cleanHttpsUrl(value).replace(/\/$/, "")
    : undefined;

export const lookBackDateClean = (value: unknown): string => {
  const raw = cleanString(value);
  if (raw === undefined) {
    return "";
  }

  const match = typeof value === "string" ? raw.match(DATE_ONLY_PATTERN) : null;
  if (!match) {
    throw new Error(
      `Look-back Date must be a date in YYYY-MM-DD format. Received: ${raw}`,
    );
  }

  const [, yearStr, monthStr, dayStr] = match;
  const year = util.types.toInt(yearStr);
  const month = util.types.toInt(monthStr);
  const day = util.types.toInt(dayStr);
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

export const cleanFolderPaths = (value: unknown): string[] => {
  const paths = (Array.isArray(value) ? value : [])
    .map((item) => util.types.toString(item).trim())
    .filter((item) => item.length > 0)
    .map(toDamPath);
  if (!paths.length)
    throw new Error("Folder Paths must contain at least one folder path.");
  return paths;
};

export const cleanKeyValueRecord = (value: unknown): Record<string, string> => {
  const pairs = (
    Array.isArray(value) ? (value as { key?: unknown; value?: unknown }[]) : []
  )
    .map((pair) => ({
      key: util.types.toString(pair.key).trim(),
      value: pair.value,
    }))
    .filter((pair) => pair.key.length > 0);
  return util.types.keyValPairListToObject(pairs, util.types.toString);
};
