import type { HttpClient } from "@prismatic-io/spectral/dist/clients/http";

export interface ArmListResponse {
  value: unknown[];
  nextLink?: string;
}

export interface PaginateOptions {
  client: HttpClient;
  endpoint: string;
  params?: Record<string, unknown>;
  fetchAll: boolean;
}
