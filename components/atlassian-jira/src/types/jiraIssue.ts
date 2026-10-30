import type { JiraWebhookUser } from "./webhooks";

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
  created: string;
  updated: string;
  priority?: JiraPriority;
  assignee?: JiraWebhookUser;
  reporter?: JiraWebhookUser;
  [key: string]: unknown;
}

export interface JiraIssue {
  id: string;
  key: string;
  self: string;
  fields: JiraIssueFields;
}
