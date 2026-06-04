import type { KlaviyoApi } from "../enums/KlaviyoApi";

export interface PollingState {
  lastPolledAt?: string;
}

export interface KlaviyoRecord {
  id: string;
  type: string;
  attributes: Record<string, unknown>;
  [key: string]: unknown;
}

export interface PollResourceConfig {
  label: string;
  api: KlaviyoApi;
  createdAtField: string;
  updatedAtField: string;
}

export type KlaviyoPollableResource = "profiles" | "lists";
