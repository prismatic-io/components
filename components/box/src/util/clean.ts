import { util } from "@prismatic-io/spectral";
import {
  LOOK_BACK_DATE_PATTERN,
  SHARED_LINK_PERMISSION_DOWNLOAD,
  SHARED_LINK_PERMISSION_PREVIEW,
} from "../constants";

export const lookBackDateClean = (value: unknown): string => {
  const str = util.types.toString(value).trim();
  if (!str) return "";

  if (!LOOK_BACK_DATE_PATTERN.test(str)) {
    throw new Error("Look-back Date must be in YYYY-MM-DD format.");
  }

  const parts = str.split("-");
  const year = util.types.toNumber(parts[0]);
  const month = util.types.toNumber(parts[1]);
  const day = util.types.toNumber(parts[2]);
  const parsed = new Date(year, month - 1, day);
  if (
    parsed.getFullYear() !== year ||
    parsed.getMonth() !== month - 1 ||
    parsed.getDate() !== day
  ) {
    throw new Error(`Look-back Date "${str}" is not a valid calendar date.`);
  }

  if (parsed > new Date()) {
    throw new Error("Look-back Date cannot be a future date.");
  }

  return str;
};

export const cleanString = (value: unknown): string | undefined =>
  value ? util.types.toString(value) : undefined;

export const cleanCommaSeparatedString = (
  value: unknown,
): string | undefined => {
  if (!value) return undefined;

  const str = util.types.toString(value);
  return str
    .split(",")
    .map((item) => item.trim())
    .filter((item) => item !== "")
    .join(",");
};

export const toStringList = (values: unknown): string[] =>
  ((values as string[]) || []).map((value) => util.types.toString(value));

export const humanizeEnumLabel = (value: string): string => {
  return value
    .replace(/_/g, " ")
    .replace(/\./g, " ")
    .toLowerCase()
    .replace(/\b\w/g, (char) => char.toUpperCase());
};

export const pathLeafName = (path: unknown): string =>
  util.types.toString(path).split("/").filter(Boolean).slice(-1)[0] ?? "";

export const sharedLinkVanityUrl = (vanityName: unknown): string | null => {
  const name = util.types.toString(vanityName);
  return name ? `https://app.box.com/v/${name}` : null;
};

export const sharedLinkEffectivePermission = (
  permissions: Record<string, unknown>,
): string =>
  permissions.can_download
    ? SHARED_LINK_PERMISSION_DOWNLOAD
    : SHARED_LINK_PERMISSION_PREVIEW;
