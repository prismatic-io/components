import type { ActionLogger, Connection } from "@prismatic-io/spectral";
import type { HttpClient } from "@prismatic-io/spectral/dist/clients/http";

export interface GetClient {
  connection: Connection;
  debug: boolean;
}

export interface CreateApiPaginationResponse<T> {
  data: T[];
  object: string;
  uri: string;
  meta: {
    prev_cursor: string | null;
    next_cursor: string | null;
  };
}

export interface PollingState {
  lastPolledAt?: string;
}

export interface GorgiasRecord {
  id: number;
  created_datetime: string | null;
  updated_datetime: string | null;
  [key: string]: unknown;
}

export interface DebugLoggerProps {
  debug: boolean;
  logger: ActionLogger;
  output: unknown;
}

export interface FetchAllWithPaginationProps {
  configVars: Record<string, unknown>;
  client: HttpClient;
  endpoint: string;
}
