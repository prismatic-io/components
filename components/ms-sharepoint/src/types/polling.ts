import type { DriveItem } from "./drive";

export interface DeltaCursor extends Record<string, unknown> {
  nextLink: string;
}

export interface SiteDeltaCursor extends Record<string, unknown> {
  remaining: string[];
  nextLink?: string;
}

export interface PollSiteChangesSeparatedChanges {
  deleted?: DriveItem[];
  added?: DriveItem[];
  updated?: DriveItem[];
  moved?: DriveItem[];
}

export interface PollSiteChangesResult {
  [key: string]: PollSiteChangesSeparatedChanges;
}

export interface PollingRecordChange {
  changeType: "deleted" | "added" | "updated" | "moved";
  record: DriveItem;
}

export interface PollingState {
  [key: string]: string;
}

export interface DriveTriggerItem {
  isDeleted: boolean;
  separatedChanges: PollSiteChangesSeparatedChanges;
  change: DriveItem;
}
