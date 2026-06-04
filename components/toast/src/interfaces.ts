import type { HttpClient } from "@prismatic-io/spectral/dist/clients/http";

export interface PaginatedResponse {
  results: unknown[];
  nextPageToken: string | null;
  [key: string]: unknown;
}


export interface PollingState extends Record<string, unknown> {
  lastPolledAt?: string; 
}




export interface ToastTimeEntryRecord {
  createdDate?: string;
  modifiedDate?: string;
  [key: string]: unknown;
}

export interface PaginateOptions {
  client: HttpClient;
  endpoint: string;
  params?: Record<string, unknown>;
  pageSize?: string;
  fetchAll?: boolean;
  pageToken?: string;
}
