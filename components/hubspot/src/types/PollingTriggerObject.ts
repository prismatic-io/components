import type { Connection } from "@prismatic-io/spectral";

export interface PollingTriggerObject {
  createdAt: string;
  updatedAt: string;
  [key: string]: unknown;
}

export interface SearchObjectParams {
  timeout: number;
  hubspotConnection: Connection;
  searchEndpoint?: string;
  searchProperties: object;
  objectType?: string;
  fetchAll: boolean;
  searchLimit: number;
}
