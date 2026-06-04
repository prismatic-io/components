import type { Connection } from "@prismatic-io/spectral";

export type { Deal } from "./deals";
export type { Organization } from "./organization";
export type { Person } from "./persons";

interface Pagination {
  start: number | null;
  limit: number;
  more_items_in_collection: boolean;
  next_start: number | null;
}

export interface AdditionalData {
  pagination: Pagination;
}

interface AdditionalCursorData {
  next_cursor: string | null;
}

export interface GenericPaginationData<T> {
  data: T[];
  additional_data: AdditionalData;
}

export interface GenericCursorPaginationData<T> {
  data: T[];
  additional_data: AdditionalCursorData;
}

export interface CreateWebhookParams {
  subscriptionUrl: string;
  eventAction: string;
  eventObject: string;
  userId?: number;
  httpAuthUser?: string;
  httpAuthPassword?: string;
  version: string;
}

export interface WebhookParams {
  connection: Connection;
  version: string;
  eventAction: string;
  eventObject: string;
  userId?: number;
  httpAuthUser?: string;
  httpAuthPassword?: string;
}

export interface Webhook {
  subscription_url: string;
  id: string;
}

export interface PollingState extends Record<string, unknown> {
  lastPolledAt?: string;
}

export interface PipedriveRecentItem {
  
  
  item?: string;
  id: number;
  data: Record<string, unknown>;
}

export interface PollResourceConfig {
  createdAtField: string | null;
  updatedAtField: string | null;
}
