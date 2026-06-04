export interface PollingState extends Record<string, unknown> {
  lastPolledAt?: string;
}




export interface GithubIssueRecord {
  id: number;
  number?: number;
  title?: string;
  state?: string;
  html_url?: string;
  created_at?: string;
  updated_at?: string;
  pull_request?: Record<string, unknown>;
}
