



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
