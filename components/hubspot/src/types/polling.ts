import type { Connection } from "@prismatic-io/spectral";
import type { PollingTriggerObject } from "./pollingTriggerObject";
export interface PollResult {
  payload: {
    body: {
      data: unknown;
    };
    paginationState?: unknown;
  };
  polledNoChanges: boolean;
}
export interface PollingCursor extends Record<string, unknown> {
  watermark: string;
  windowStart: string;
  windowEnd: string;
  isBackfill: boolean;
  idWalk?: {
    denseTimestamp: string;
    idWatermark: string;
  };
}
export interface PollingWindow {
  records: PollingTriggerObject[];
  hasMore: boolean;
}
export interface SearchFilter {
  propertyName: string;
  operator: string;
  value?: unknown;
  values?: unknown[];
  highValue?: unknown;
}
export interface SearchFilterGroup {
  filters?: SearchFilter[];
}
export interface SearchRecordsPollingState {
  lastPolledAt?: string;
  cursor?: PollingCursor;
}
export interface PollChangesParams {
  hubspotConnection: Connection;
  showNewRecords: boolean;
  showUpdatedRecords: boolean;
  lookBackDate: string;
  searchEndpoint?: string;
  objectType?: string;
  searchProperties?: Record<string, unknown>;
}
export interface ResolveCursorParams {
  incoming: PollingCursor | undefined;
  state: SearchRecordsPollingState;
  lookBackDate: string;
  now: string;
}
export interface FetchPollingWindowParams {
  endpoint: string;
  searchProperties: Record<string, unknown> | undefined;
  dateProp: string;
  cursor: PollingCursor;
  windowLimit: number;
}
export interface CursorLogger {
  warn: (message: string) => void;
}
export interface HttpErrorish {
  response?: {
    status?: number;
    headers?: Record<string, unknown>;
    data?: {
      message?: string;
    };
  };
}
