export interface OracleHcmListResponse<T> {
  items: T[];
  count: number;
  hasMore: boolean;
  limit: number;
  offset: number;
}
