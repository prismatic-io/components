export interface PageInfo {
  hasNextPage: boolean;
  endCursor: string;
}
export type Nodes = Record<string, unknown>[];
export interface ObjectNodes<T> {
  nodes: T[];
  pageInfo: PageInfo;
}
export interface PaginatedNodes {
  nodes: Nodes;
  pageInfo: PageInfo;
}
export interface PaginationLink {
  limit: string;
  page_info: string;
  rel: string;
  url: string;
}
export interface PaginationResponse {
  previous?: PaginationLink;
  next?: PaginationLink;
}
