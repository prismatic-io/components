export interface PaginationMetadata {
  self?: string;
  next?: string;
  prev?: string;
  count?: number;
}
export interface FetchPaginatedDataQueryParams {
  page_size?: string;
  page_token?: string;
}
