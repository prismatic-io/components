import { util } from "@prismatic-io/spectral";
import { MAX_LIST_FOLDER_LIMIT } from "../constants";
import type { StringTag } from "../types";
export const cleanString = (value: unknown): string =>
  util.types.toString(value).replace(/\/$/, "");
export const cleanActionArray = (value: unknown): StringTag[] | undefined => {
  if (Array.isArray(value) && value.length > 0) {
    return value.map((item) => ({ ".tag": util.types.toString(item) }));
  }
  return undefined;
};
export const cleanPathArray = (value: unknown): string[] | undefined => {
  if (!Array.isArray(value) || value.length === 0) {
    return undefined;
  }
  return value.map((item) => util.types.toString(item));
};
export const cleanStringWithTag = (value: unknown): StringTag | undefined => {
  if (value) {
    return { ".tag": util.types.toString(value) };
  }
  return undefined;
};
export const toOptionalString = (value: unknown): string | undefined => {
  if (value) {
    return util.types.toString(value);
  }
  return undefined;
};
export const lookBackDateClean = (value: unknown): string => {
  const raw = util.types.toString(value).trim();
  if (!raw) {
    return "";
  }
  if (!/^\d{4}-\d{2}-\d{2}$/.test(raw)) {
    throw new Error(
      `Look-back Date must be in YYYY-MM-DD format. Received "${raw}".`,
    );
  }
  const parsed = new Date(`${raw}T00:00:00.000Z`);
  if (Number.isNaN(parsed.getTime()) || !parsed.toISOString().startsWith(raw)) {
    throw new Error(`Look-back Date is not a real calendar date: "${raw}".`);
  }
  if (parsed.getTime() > Date.now()) {
    throw new Error(`Look-back Date cannot be a future date: "${raw}".`);
  }
  return raw;
};
export const cleanInitialSyncPageSize = (value: unknown): number => {
  const parsed = util.types.toNumber(value);
  if (!Number.isFinite(parsed) || parsed <= 0) {
    return MAX_LIST_FOLDER_LIMIT;
  }
  return Math.min(Math.floor(parsed), MAX_LIST_FOLDER_LIMIT);
};
