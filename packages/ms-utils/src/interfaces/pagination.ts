import type { HttpClient } from "@prismatic-io/spectral/dist/clients/http";
export interface ODataResponse<T = unknown> {
  value: T[];
  "@odata.nextLink"?: string;
  "@odata.context": string;
  nextLink?: string;
}
export interface PaginateOptions {
  client: HttpClient;
  endpoint: string;
  params?: Record<string, unknown>;
  fetchAll: boolean;
  pageSize?: string;
  pageToken?: string;
}
