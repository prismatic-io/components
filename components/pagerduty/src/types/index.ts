


import type { HttpClient } from "@prismatic-io/spectral/dist/clients/http";

export interface PaginatedParams {
  limit: number;
  offset: number;
}

export interface FetchAllWithPaginationProps {
  client: HttpClient;
  configVars: Record<string, unknown>;
  endpoint: string;
  objectKey: string;
}


export interface PollingState extends Record<string, unknown> {
  lastPolledAt?: string; 
}





export interface PagerDutyIncident {
  id: string;
  type: string;
  summary: string;
  incident_number: number;
  title: string;
  status: string;
  urgency: string;
  created_at: string; 
  updated_at?: string; 
  last_status_change_at?: string; 
  [key: string]: unknown;
}
