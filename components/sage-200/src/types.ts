export interface PollingState extends Record<string, unknown> {
  lastPolledAt?: string;
}

export interface Sage200Record {
  date_time_created?: string;
  date_time_updated?: string;
  [key: string]: unknown;
}

export interface Sage200Changes {
  created: Sage200Record[];
  updated: Sage200Record[];
}

export interface Sage200RecordChange {
  changeType: "created" | "updated";
  record: Sage200Record;
}

export interface PaginateOptions {
  client: import("@prismatic-io/spectral/dist/clients/http").HttpClient;
  endpoint: string;
  fetchAll: boolean;
  pageSize?: number;
}
