import type { User } from "./user";
export interface SystemLogEvent {
  uuid: string;
  published: string;
  eventType: string;
  severity?: string;
  displayMessage?: string;
  [key: string]: unknown;
}
export interface UsersPollingState extends Record<string, unknown> {
  lastUpdated?: string;
}
export interface SystemLogsPollingState extends Record<string, unknown> {
  next?: string;
  filter?: string;
  seeded?: boolean;
  lastUpdated?: string;
}
export interface SystemLogsCursor extends Record<string, unknown> {
  next: string;
  filter?: string;
}
export interface SystemLogsWindowParams {
  pageSize: number;
  maxPages: number;
  link?: string;
  since?: string;
  filter?: string;
}
export interface SystemLogsWindow {
  events: SystemLogEvent[];
  hasMore: boolean;
  next?: string;
}
export interface UserChange {
  changeType: "created" | "updated";
  record: User;
}
export interface SystemLogChange {
  changeType: "created";
  record: SystemLogEvent;
}
