import type { HttpClient } from "@prismatic-io/spectral/dist/clients/http";

export interface SegmentPagination {
  current?: string;
  next?: string;
  totalEntries?: number;
}

export interface SegmentListResponse {
  pagination?: SegmentPagination;
  [key: string]: unknown;
}

export interface PaginateOptions {
  client: HttpClient;
  endpoint: string;
  params?: Record<string, unknown>;
  fetchAll: boolean;
  count?: string;
  cursor?: string;
}
