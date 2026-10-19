export interface WooCommerceRecord {
  id: number;
  date_created_gmt?: string | null;
  [key: string]: unknown;
}
export interface PollCursor extends Record<string, unknown> {
  watermark: string;
  boundaryIds: number[];
  tieGroup?: Record<string, never>;
}
export interface PollingState extends Record<string, unknown> {
  lastPolledAt?: string;
  boundaryIds?: number[];
  cursor?: PollCursor;
}
export interface PollPageQuery {
  afterMs: number;
  beforeMs: number;
  exclude: number[];
}
export type FetchPollPage = (
  query: PollPageQuery,
) => Promise<WooCommerceRecord[]>;
export interface DrainRound {
  delivered: WooCommerceRecord[];
  cursor: PollCursor;
  drained: boolean;
}
export interface DrainResult {
  records: WooCommerceRecord[];
  cursor: PollCursor;
  drained: boolean;
}
export interface PollingChangesObject {
  created: WooCommerceRecord[];
  updated: WooCommerceRecord[];
}
export interface PollingRecordChange {
  changeType: "created" | "updated";
  record: WooCommerceRecord;
}
export interface PollWindow {
  after: string;
  notBefore?: string;
}
