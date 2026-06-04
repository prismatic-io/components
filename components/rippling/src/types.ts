import type { API_VERSION } from "./constants";

export type ApiVersion = (typeof API_VERSION)[keyof typeof API_VERSION];

export interface PollingState {
  lastPolledAt?: string;
}

export interface RipplingRecord {
  id: string;
  created_at: string;
  updated_at: string;
  [key: string]: unknown;
}
