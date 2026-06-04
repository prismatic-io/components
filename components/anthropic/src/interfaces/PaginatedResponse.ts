export interface PaginatedResponse<T> {
  data: T[];
  first_id: string | null;
  has_more: boolean;
  last_id: string | null;
}
