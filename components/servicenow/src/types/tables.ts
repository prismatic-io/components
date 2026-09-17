import type { Connection } from "@prismatic-io/spectral";
export interface BaseTableProps {
  connection: Connection;
  tableName: string;
  apiVersion: unknown;
  instanceUrl: string;
  queryParameters?: Record<string, string | undefined>;
  payload?: Record<string, unknown>;
  debug: boolean;
}
export type GetTableProps = BaseTableProps;
export type DeleteTableProps = GetTableProps;
export interface GetAllTablesProps {
  connection: Connection;
  instanceUrl: string;
  queryParameters?: Record<string, string | undefined>;
  debug: boolean;
}
export type PostTableProps = BaseTableProps & {
  payload: Record<string, unknown>;
};
export type PutTableProps = GetTableProps & PostTableProps;
