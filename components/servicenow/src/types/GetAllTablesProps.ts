import type { Connection } from "@prismatic-io/spectral";

export interface GetAllTablesProps {
  connection: Connection;
  instanceUrl: string;
  queryParameters?: Record<string, string>;
  debug: boolean;
}
