import type { HttpClient } from "@prismatic-io/spectral/http";

export interface Record {
  [key: string]: string;
  id: string;
}

export interface FetchAllRecordsParams {
  client: HttpClient;
  recordType: string;
  query?: string;
}
