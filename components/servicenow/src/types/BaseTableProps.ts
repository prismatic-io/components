import type { Connection } from "@prismatic-io/spectral";

export interface BaseTableProps {
  connection: Connection;
  tableName: string;
  apiVersion: unknown;
  instanceUrl: string;
  queryParameters?: Record<string, string>;
  payload?: Record<string, unknown>;
  debug: boolean;
}
