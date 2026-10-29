export interface PaginatedResponse<T> {
  maxResults: number;
  startAt: number;
  total: number;
  isLast: boolean;
  values: T[];
}

export interface WebhookData {
  events: string[];
  id: number;
}
