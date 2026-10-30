import type { JiraIssue } from "./jiraIssue";

export interface JiraWebhookUser {
  accountId: string;
  displayName: string;
  accountType?: string;
  emailAddress?: string;
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

export interface WebhookData {
  events: string[];
  id: number;
}
