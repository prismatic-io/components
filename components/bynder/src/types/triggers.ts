export interface PollingState {
  lastPolledAt?: string;
}

export interface PollResourceConfig {
  label: string;
  clientType: "v4" | "api" | "workflow";
  createdAtField: string;
  updatedAtField: string | null;
}

export interface BynderRecord {
  id: string;
  [key: string]: unknown;
}
