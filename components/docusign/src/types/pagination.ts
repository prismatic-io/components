import type { HttpClient } from "@prismatic-io/spectral/http";

export interface DocuSignListResponse {
  resultSetSize?: string;
  totalSetSize?: string;
  startPosition?: string;
  endPosition?: string;
  nextUri?: string;
  [key: string]: unknown;
}

export interface PaginateOptions {
  client: HttpClient;
  endpoint: string;
  params?: Record<string, unknown>;
  fetchAll: boolean;
  count?: string;
  startPosition?: string;
  itemsKey: string;
}
