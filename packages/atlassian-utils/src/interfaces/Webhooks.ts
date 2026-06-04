export interface AtlassianWebhook {
  id: number;
  events: string[];
  expirationDate: string;
  jqlFilter?: string;
  fieldIdsFilter?: string[];
}

export interface AtlassianWebhookListResponse {
  startAt: number;
  maxResults: number;
  total: number;
  isLast: boolean;
  values: AtlassianWebhook[];
}

export interface AtlassianWebhookConfig {
  events: string[];
  jqlFilter?: string;
  fieldIdsFilter?: string[];
  issuePropertyKeysFilter?: string[];
}

export interface AtlassianWebhookBasicConfig {
  name: string;
  description?: string;
  events: string[];
  filters: Filters;
  excludeBody: boolean;
  secret?: string;
}

export interface Filters {
  "issue-related-events-section": string;
}

export interface CreateAtlassianWebhookRequest {
  url: string;
  webhooks: AtlassianWebhookConfig[];
}

export interface CreateAtlassianWebhookBasicRequest
  extends AtlassianWebhookConfig {
  url: string;
  name?: string;
}

export interface WebhookRegistrationResult {
  createdWebhookId?: number;
  errors?: string[];
}

export interface CreateAtlassianWebhookResponse {
  webhookRegistrationResult: WebhookRegistrationResult[];
}

export interface CreateAtlassianWebhookBasicResponse {
  self: string;
  name: string;
  url: string;
  events: string[];
  filters?: Record<string, string>;
  excludeBody?: boolean;
  enabled?: boolean;
}

export interface RefreshAtlassianWebhookRequest {
  webhookIds: number[];
}

export interface RefreshAtlassianWebhookResponse {
  expirationDate: string;
}

export interface DeleteAtlassianWebhookRequest {
  webhookIds: number[];
}

export interface AtlassianWebhookState {
  webhookId: number;
  expirationDate: string;
  jqlFilter?: string;
  events?: string[];
}

export interface CreateWebhookTriggerParams {
  events: string[];
  jqlFilter?: string;
  fieldIdsFilter?: string[];
  issuePropertyKeysFilter?: string[];
}

export interface WebhookDeletion {
  id: number;
  deleted: boolean;
}

export interface PaginatedResponse<T> {
  startAt: number;
  maxResults: number;
  total: number;
  isLast: boolean;
  values: T[];
}
