export interface AdpListResponse {
  meta?: { totalNumber?: number } & Record<string, unknown>;
  confirmMessage?: unknown;
  [resource: string]: unknown;
}

export interface PaginatedResult<T> {
  data: T[];
  meta: unknown;
  confirmMessage: unknown;
}
