import { util } from "@prismatic-io/spectral";
import type { GetQueryString, MsProjectRecord } from "./types";

export const getQueryString = ({ queryString, url }: GetQueryString): string => {
  if (!queryString) {
    return url;
  }
  return `${url}?${queryString}`;
};


export const toPaginationParams = (
  pageSizeValue: unknown,
  pageNumberValue: unknown,
): { $top: number; $skip: number } | undefined => {
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
