export interface CursorPageResponse<T> {
  items: T[];
  cursor?: string;
}

export interface PaginationParams {
  fetchAll: boolean;
  cursor?: string;
  limit?: number;
}
