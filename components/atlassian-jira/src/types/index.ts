export type { Attachment, AttachmentResponse } from "./Attachment";
export type { JiraApiCustomOptions } from "./JiraApiCustomOptions";
export type { PaginatedResponse, WebhookData } from "./PaginatedResponse";
export type {
  Issue,
  IssueFields,
  AttachmentAuthor,
  AvatarUrls,
  Comment,
  UpdateAuthorClass,
  Description,
  DescriptionContent,
  ContentContent,
  Visibility,
  Issuelink,
  WardIssue,
  InwardIssueFields,
  Status,
  Type,
  Project,
  Insight,
  ProjectCategory,
  Timetracking,
  Watcher,
  Worklog,
} from "./Issue";
export interface JiraWebhookUser {
  accountId: string;
  accountType?: string;
  displayName: string;
  emailAddress?: string;
}
export interface JiraIssueStatus {
  name: string;
  id: string;
}
export interface JiraIssueType {
  name: string;
  id: string;
}
export interface JiraProject {
  key: string;
  name: string;
  id: string;
}
export interface JiraPriority {
  name: string;
  id: string;
}
export interface JiraIssueFields {
  summary: string;
  status: JiraIssueStatus;
  issuetype: JiraIssueType;
  project: JiraProject;
  priority?: JiraPriority;
  assignee?: JiraWebhookUser;
  reporter?: JiraWebhookUser;
  created: string;
  updated: string;
  [key: string]: unknown;
}
export interface JiraIssue {
  id: string;
  key: string;
  self: string;
  fields: JiraIssueFields;
}
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
  logger: {
    warn: (message: string) => void;
  };
  heldTimeZone?: string;
  nextPageToken?: string;
  additionalJql?: string;
}
export interface PollingStream {
  streamStartedAt: Date;
  nextPageToken?: string;
  timeZone?: string;
}
export interface JiraWebhookPayload {
  timestamp: number;
  webhookEvent: string;
  issue_event_type_name?: string;
  user?: JiraWebhookUser;
  issue?: JiraIssue;
  comment?: {
    id: string;
    body: string;
    author: JiraWebhookUser;
    created: string;
    updated: string;
  };
  changelog?: {
    id: string;
    items: {
      field: string;
      fieldtype: string;
      from: string | null;
      fromString: string | null;
      to: string | null;
      toString: string | null;
    }[];
  };
}
