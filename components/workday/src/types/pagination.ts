import type { HttpClient } from "@prismatic-io/spectral/dist/clients/http";

export interface WorkdayListResponse<T = unknown> {
  total: number;
  data: T[];
}

export interface PaginateOptions {
  client: HttpClient;
  endpoint: string;
  fetchAll: boolean;
  params?: Record<string, unknown>;
  limit?: number;
  offset?: number;
}
