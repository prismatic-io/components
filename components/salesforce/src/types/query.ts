import type { Connection, Query, Schema, SObjectFieldType } from "jsforce";
export interface SFQueryParams {
  salesforceClient: Connection<Schema>;
  dynamicValues?: Record<string, unknown>;
  recordType: string;
  fieldValues?: Record<string, unknown>;
  fieldValueTypes?: Record<string, unknown>;
  fetchAll: boolean;
  maxRecordsToFetch?: number;
  pageNumber?: number;
  pageSize?: number;
  sortValue?: string;
}
export interface Pagination {
  query: QueryType;
  fetchAll: boolean;
  maxRecordsToFetch: number;
  limit?: number;
  offset?: number;
}
export type QueryType = Query<
  Schema,
  string,
  Record<string, SObjectFieldType> & Record<string, unknown>,
  "Records"
>;
export interface SOQLQueryParams {
  recordType: string;
  fields: string[];
  filters: Record<string, unknown>;
  sortValue: string;
  maxRecords?: number;
  conditions?: string[];
}
