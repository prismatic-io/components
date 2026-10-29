import type { OdooRecord } from "./record";

export interface PollCursor extends Record<string, unknown> {
  watermark: string;
  boundaryIds: number[];
  tieGroup?: { lastKey: number | null };
}

export interface PollingState extends Record<string, unknown> {
  lastPolledAt?: string;
  boundaryIds?: number[];
  cursor?: PollCursor;
  initialSyncFrom?: string;
}

export interface PollPageQuery {
  domain: [string, string, string | number][];
  order: string;
  limit: number;
}

export type FetchPollPage = (query: PollPageQuery) => Promise<OdooRecord[]>;

export interface DrainResult {
  records: OdooRecord[];
  cursor: PollCursor;
  drained: boolean;
}

export interface DrainRound {
  delivered: OdooRecord[];
  cursor: PollCursor;
  drained: boolean;
}

export interface PollingChangesObject {
  created: OdooRecord[];
  updated: OdooRecord[];
}

export interface PollingRecordChange {
  changeType: "created" | "updated";
  record: OdooRecord;
}

export interface PollWindow {
  since: string;
  isInitialSync: boolean;
  createdSince: string;
}
