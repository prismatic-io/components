export interface PaginationOptions {
  fetchAll?: boolean;
  pageNumber?: string;
  pageSize?: string;
  
  dataKey?: string;
  additionalParams?: Record<string, unknown>;
}
