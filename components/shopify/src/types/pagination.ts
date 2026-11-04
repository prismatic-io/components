export interface PageInfo {
  hasNextPage: boolean;
  endCursor: string | null;
}

export type Nodes = Record<string, unknown>[];

export interface ObjectNodes<T> {
  nodes: T[];
  pageInfo: PageInfo;
}

interface PaginationLink {
  limit: string;
  page_info: string;
  rel: string;
  url: string;
}

export interface PaginationResponse {
  previous?: PaginationLink;
  next?: PaginationLink;
}

export interface RestPageInformation {
  data: Record<string, unknown[]>;
  pagination: PaginationResponse;
  pageInfo: string | null;
  rel: string | null;
  headers: unknown;
}

export interface RestPagination {
  pagination: { next: { page_info: string | null; rel: string } } | null;
  pageInfo: string | null;
  rel: string | null;
}
