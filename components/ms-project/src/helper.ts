import { util } from "@prismatic-io/spectral";
import { LOOK_BACK_DATE_PATTERN } from "./constants";
import type {
  GetQueryString,
  MsProjectChangesObject,
  MsProjectRecord,
  MsProjectRecordChange,
} from "./types";
export const getQueryString = ({
  queryString,
  url,
}: GetQueryString): string => {
  if (!queryString) {
    return url;
  }
  return `${url}?${queryString}`;
};
export const toPaginationParams = (
  pageSizeValue: unknown,
  pageNumberValue: unknown,
):
  | {
      $top: number;
      $skip: number;
    }
  | undefined => {
  const pageSize = util.types.toInt(pageSizeValue) || undefined;
  const pageNumber = util.types.toInt(pageNumberValue) || undefined;
  if (!pageSize || !pageNumber) {
    return undefined;
  }
  const skip = pageNumber === 1 ? 0 : pageSize * (pageNumber - 1);
  return { $top: pageSize, $skip: skip };
};
export const toODataDateTime = (iso: string): string =>
  `datetime'${iso.replace(/\.\d+Z$/, "").replace(/Z$/, "")}'`;
export const buildPollingFilter = (
  createdAtField: keyof MsProjectRecord,
  updatedAtField: keyof MsProjectRecord,
  lastPolledAt: string,
  includeNew: boolean,
  includeUpdated: boolean,
): string | undefined => {
  const literal = toODataDateTime(lastPolledAt);
  const clauses: string[] = [];
  if (includeNew) clauses.push(`${createdAtField} gt ${literal}`);
  if (includeUpdated) clauses.push(`${updatedAtField} gt ${literal}`);
  if (clauses.length === 0) return undefined;
  return clauses.join(" or ");
};
export const resolvePollingRecordChanges = (
  data: MsProjectChangesObject | undefined,
): MsProjectRecordChange[] => {
  const changesObject = data ?? {};
  return [
    ...(changesObject.created ?? []).map(
      (record): MsProjectRecordChange => ({ changeType: "created", record }),
    ),
    ...(changesObject.updated ?? []).map(
      (record): MsProjectRecordChange => ({ changeType: "updated", record }),
    ),
  ];
};
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
