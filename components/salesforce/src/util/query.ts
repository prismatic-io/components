import {
  type DataSourceContext,
  type Element,
  util,
} from "@prismatic-io/spectral";
import type { ActionContext } from "@prismatic-io/spectral/dist/serverTypes";
import type { FindOptions, Schema, SObjectNames } from "jsforce";
import { REQUIRED_POLL_FIELDS } from "../constants";
import type {
  Pagination,
  SFError,
  SFQueryParams,
  SOQLQueryParams,
} from "../types";
import { coerceObjectValues } from "./cleanFunctions";
export const toFindOptions = <S extends Schema, N extends SObjectNames<S>>(
  pageSizeValue: unknown,
  pageNumberValue: unknown,
): FindOptions<S, N> => {
  const pageSize = util.types.toInt(pageSizeValue) || undefined;
  const pageNumber = util.types.toInt(pageNumberValue) || undefined;
  if (!pageSize || !pageNumber) {
    return undefined;
  }
  const offset = pageNumber === 1 ? 0 : pageSize * (pageNumber - 1);
  return { limit: pageSize, offset };
};
export const getFindQuery = ({
  dynamicValues,
  fetchAll,
  fieldValueTypes,
  fieldValues,
  maxRecordsToFetch,
  pageNumber,
  pageSize,
  recordType,
  salesforceClient,
  sortValue,
}: SFQueryParams) => {
  let query = salesforceClient.sobject(recordType).find({
    ...dynamicValues,
    ...coerceObjectValues(
      fieldValues,
      util.types.keyValPairListToObject(fieldValueTypes),
    ),
  });
  query = addPaginationToQuery({
    fetchAll,
    maxRecordsToFetch,
    query,
    limit: pageSize,
    offset: pageNumber,
  });
  query = query.sort(sortValue);
  return query;
};
export const addPaginationToQuery = ({
  fetchAll,
  maxRecordsToFetch,
  query,
  limit,
  offset,
}: Pagination) => {
  query = query.autoFetch(fetchAll);
  if (maxRecordsToFetch && fetchAll) {
    query = query.maxFetch(maxRecordsToFetch);
  }
  if (!fetchAll) {
    const findOptions = toFindOptions(limit, offset);
    if (findOptions) {
      if (findOptions.limit) {
        query = query.limit(findOptions.limit);
      }
      if (findOptions.offset) {
        query = query.offset(findOptions.offset);
      }
    }
  }
  return query;
};
export const executeSFAction = async (
  context: ActionContext | DataSourceContext,
  command,
) => {
  try {
    return await command;
  } catch (error: unknown) {
    if ((error as SFError)?.errorCode === "MULTIPLE_API_ERRORS") {
      context.logger.error(
        "Error executing Salesforce action",
        (error as SFError).data,
      );
      throw error;
    }
    context.logger.error("Error executing Salesforce action", error);
    throw error;
  }
};
export const mapToElement = (
  objects: Record<string, unknown>[],
  labelKey: string,
  valueKey: string,
): Element[] => {
  return objects.map((object) => ({
    label: util.types.toString(object[labelKey]),
    key: util.types.toString(object[valueKey]),
  }));
};
const escapeSOQLValue = (value: unknown): string => {
  if (typeof value === "boolean") return util.types.toString(value);
  if (typeof value === "number") return util.types.toString(value);
  return `'${util.types.toString(value).replace(/'/g, "\\'")}'`;
};
export const formatSOQLDateTime = (value: Date | string): string => {
  const date = value instanceof Date ? value : new Date(value);
  if (Number.isNaN(date.getTime())) {
    throw new Error(`Invalid date value for SOQL literal: ${String(value)}`);
  }
  return `${date.toISOString().slice(0, 19)}Z`;
};
const SALESFORCE_ID_PATTERN = /^[a-zA-Z0-9]+$/;
export const formatSOQLId = (value: string): string => {
  if (!SALESFORCE_ID_PATTERN.test(value)) {
    throw new Error(
      `Invalid Salesforce Id for SOQL literal: ${JSON.stringify(value)}`,
    );
  }
  return `'${value}'`;
};
const buildSOQLWhereClause = (
  filters: Record<string, unknown>,
  conditions: string[] = [],
): string => {
  const clauses = [
    ...Object.entries(filters).map(
      ([key, value]) => `${key} = ${escapeSOQLValue(value)}`,
    ),
    ...conditions,
  ];
  return clauses.length > 0 ? ` WHERE ${clauses.join(" AND ")}` : "";
};
const buildSOQLOrderBy = (sortValue: string): string => {
  if (!sortValue?.trim()) return "";
  const parts = sortValue.trim().split(/\s+/);
  const orderClauses = parts.map((part) => {
    if (part.startsWith("-")) return `${part.slice(1)} DESC`;
    return `${part} ASC`;
  });
  return ` ORDER BY ${orderClauses.join(", ")}`;
};
export const buildSOQLQuery = ({
  recordType,
  fields,
  filters,
  sortValue,
  maxRecords,
  conditions,
}: SOQLQueryParams): string => {
  const allFields = [...new Set([...REQUIRED_POLL_FIELDS, ...fields])];
  let soql = `SELECT ${allFields.join(", ")} FROM ${recordType}`;
  soql += buildSOQLWhereClause(filters, conditions);
  soql += buildSOQLOrderBy(sortValue);
  if (maxRecords) soql += ` LIMIT ${maxRecords}`;
  return soql;
};
