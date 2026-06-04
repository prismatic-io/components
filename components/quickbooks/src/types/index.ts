import type { HttpClient } from "@prismatic-io/spectral/dist/clients/http";

export interface PollingState extends Record<string, unknown> {
  lastPolledAt?: string;
}

export interface QuickBooksRecord extends Record<string, unknown> {
  Id?: string;
  MetaData?: {
    CreateTime?: string;
    LastUpdatedTime?: string;
  };
}

export interface PaginatedDataParams {
  startPosition: string;
  maxResults: string;
}

export interface PaginatedDataRequest {
  client: HttpClient;
  queryString: string;
  objectName: string;
  fetchAll: boolean;
  params?: PaginatedDataParams;
}

export interface CloudEventsEvent {
  specversion: string;
  id: string;
  source: string;
  type: string;
  time: string;
  intuitentityid: string;
  intuitaccountid: string;
  [key: string]: unknown;
}

export type CloudEventsWebhook = CloudEventsEvent[];
export interface LegacyWebhookEntity {
  name: string;
  id: string;
  operation: string;
  lastUpdated: string;
}
export interface LegacyWebhookDataChangeEvent {
  entities: LegacyWebhookEntity[];
}

export interface LegacyWebhookNotification {
  realmId: string;
  dataChangeEvent?: LegacyWebhookDataChangeEvent;
}

export interface LegacyWebhook {
  eventNotifications: LegacyWebhookNotification[];
}

export interface ParsedQuickBooksEvent {
  id: string;
  entityId: string;
  accountId: string;
  entity: string;
  operation: string;
  eventType: string;
  timestamp?: string;
  source?: string;
  specversion?: string;
}

export interface NormalizedWebhookOutput {
  format: "cloudevents" | "legacy";
  formatWarning?: string;
  eventCount: number;
  events: ParsedQuickBooksEvent[];
  event: ParsedQuickBooksEvent;
  entityId: string;
  accountId: string;
  entity: string;
  operation: string;
  eventType: string;
  timestamp?: string;
}
