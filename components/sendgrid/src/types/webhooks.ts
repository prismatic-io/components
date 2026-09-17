export interface CreateWebhookParams {
  url: string;
  enabled: boolean;
  delivered: boolean;
  bounce: boolean;
  deferred: boolean;
  processed: boolean;
  dropped: boolean;
  open: boolean;
  click: boolean;
  spamReport: boolean;
  unsubscribe: boolean;
  groupUnsubscribe: boolean;
  groupResubscribe: boolean;
  accountStatusChange: boolean;
  friendlyName?: string;
}
export interface WebhookRequestBody {
  url: string;
  enabled: boolean;
  delivered: boolean;
  bounce: boolean;
  deferred: boolean;
  processed: boolean;
  dropped: boolean;
  open: boolean;
  click: boolean;
  spam_report: boolean;
  unsubscribe: boolean;
  group_unsubscribe: boolean;
  group_resubscribe: boolean;
  account_status_change: boolean;
  friendly_name?: string;
}
export interface UpdateWebhookParams extends CreateWebhookParams {
  webhookId: string;
}
export interface DeleteWebhookParams {
  webhookId: string;
}
export interface ToggleSignatureVerificationParams {
  webhookId: string;
  enabled: boolean;
}
export interface WebhookResponse {
  enabled: boolean;
  url: string;
  group_resubscribe: boolean;
  delivered: boolean;
  group_unsubscribe: boolean;
  spam_report: boolean;
  bounce: boolean;
  deferred: boolean;
  unsubscribe: boolean;
  processed: boolean;
  open: boolean;
  click: boolean;
  dropped: boolean;
  account_status_change: boolean;
  friendly_name: string;
  id: string;
  oauth_client_id: string;
  oauth_token_url: string;
  public_key: string;
  created_date: string;
  updated_date: string;
}
export interface WebhookState {
  webhookId: string;
  publicKey?: string;
}
export interface TrackEvents {
  delivered: boolean;
  bounce: boolean;
  deferred: boolean;
  processed: boolean;
  dropped: boolean;
  open: boolean;
  click: boolean;
  spamReport: boolean;
  unsubscribe: boolean;
  groupUnsubscribe: boolean;
  groupResubscribe: boolean;
  accountStatusChange: boolean;
}
