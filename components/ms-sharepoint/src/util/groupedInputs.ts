import type {
  PaginationGroup,
  PaginationParams,
  QueryParameterGroup,
  QueryParameterParams,
} from "../types";
import { toOptionalNumber, toOptionalString } from "./clean";

const isUnset = (value: unknown): boolean => value === undefined || value === null;

const flatValue = (params: object, key: string): unknown => Reflect.get(params, key);

export const resolvePagination = (params: PaginationParams): PaginationGroup => {
  const grouped: PaginationGroup = params.pagination ?? {};
  return {
    pageLimit:
      isUnset(grouped.pageLimit) || grouped.pageLimit === 0
        ? toOptionalNumber(flatValue(params, "pageLimit"))
        : grouped.pageLimit,
    pageToken: isUnset(grouped.pageToken)
      ? toOptionalString(flatValue(params, "pageToken"))
      : grouped.pageToken,
  };
};

export const resolveQueryParameters = (params: QueryParameterParams): QueryParameterGroup => {
  const grouped: QueryParameterGroup = params.queryParameters ?? {};
  return {
    $select: isUnset(grouped.$select)
      ? toOptionalString(flatValue(params, "$select"))
      : grouped.$select,
    $expand: isUnset(grouped.$expand)
      ? toOptionalString(flatValue(params, "$expand"))
      : grouped.$expand,
    $top: isUnset(grouped.$top) ? toOptionalNumber(flatValue(params, "$top")) : grouped.$top,
  };
};
