import type { JiraIssue } from "./jiraIssue";

export interface PollingState extends Record<string, unknown> {
  lastPolledAt?: string;
  nextPageToken?: string;
  streamStartedAt?: string;
  backfillActive?: boolean;
  jqlFilter?: string;
  timeZone?: string;
}

export interface PollingCursor extends Record<string, unknown> {
  nextPageToken: string;
  streamStartedAt: string;
  timeZone: string;
  jqlFilter?: string;
}

export interface JiraIssueChangesObject {
  created: JiraIssue[];
  updated: JiraIssue[];
}

export interface JiraIssueChange {
  changeType: "created" | "updated";
  record: JiraIssue;
}

export interface IssuesWindowParams {
  sinceISO: string;
  pageSize: number;
  maxPages: number;
  timeZone: string;
  nextPageToken?: string;
  additionalJql?: string;
}

export interface StreamWindowParams {
  skipFetch: boolean;
  batching: boolean;
  sinceISO: string;
  logger: { warn: (message: string) => void };
  heldTimeZone?: string;
  nextPageToken?: string;
  additionalJql?: string;
}

export interface PollingStream {
  streamStartedAt: Date;
  nextPageToken?: string;
  timeZone?: string;
}
