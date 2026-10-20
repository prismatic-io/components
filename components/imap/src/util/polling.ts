import { util } from "@prismatic-io/spectral";
import { LOOK_BACK_DATE_PATTERN } from "../constants";
export interface ImapRecordChange {
  changeType: "created";
  record: unknown;
}
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
export const resolveImapRecordChanges = (
  data: unknown[] | undefined,
): ImapRecordChange[] => {
  if (!data || !Array.isArray(data)) return [];
  return data.map((record) => ({ changeType: "created" as const, record }));
};
