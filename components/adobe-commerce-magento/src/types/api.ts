export interface MagentoListResponse<T = unknown> {
  items?: T[];
  total_count?: number;
  search_criteria?: Record<string, unknown>;
}
export interface PaginateOptions {
  client: import("@prismatic-io/spectral/dist/clients/http").HttpClient;
  endpoint: string;
  queryParams?: Record<string, unknown>;
  fetchAll: boolean;
}
