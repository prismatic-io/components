import type { createClient } from "./client";

export interface PollingState extends Record<string, unknown> {
  lastPolledAt?: string;
}

export interface QlikListResponse {
  data?: QlikRecord[];
  links?: { next?: { href?: string } };
}





export interface QlikRecord {
  id?: string;
  [key: string]: unknown;
}

export type QlikPaginationStyle = "cursor" | "offset";

export interface QlikPollResourceConfig {
  endpoint: string;
  createdField: string;
  updatedField: string;
  paginationStyle: QlikPaginationStyle;
}

export type QlikClient = ReturnType<typeof createClient>;
