export interface Webhook {
  uri: string;
  callback_url: string;
  created_at: string;
  updated_at: string;
  retry_started_at: string | null;
  state: string;
  events: string[];
  scope: string;
  organization: string;
  user: string | null;
  creator: string | null;
}
