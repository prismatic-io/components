export interface Pagination {
  count: number;
  next_page: string | null;
  previous_page: string | null;
  next_page_token: string | null;
  previous_page_token: string | null;
}
