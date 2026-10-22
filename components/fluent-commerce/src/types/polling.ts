import type { FluentOrder } from "./orders";
export interface PollingState extends Record<string, unknown> {
  lastPolledAt?: string;
  windowTo?: string;
  backfillActive?: boolean;
  after?: string;
}
export interface PollingWindow {
  from: string;
  to: string;
  after: string | null;
}
export interface PollingCursor extends Record<string, unknown> {
  windowTo: string;
  after: string;
}
export interface FluentOrderChangesObject {
  created: FluentOrder[];
  updated: FluentOrder[];
}
export interface FluentOrderChange {
  changeType: "created" | "updated";
  record: FluentOrder;
}
