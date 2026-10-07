import type { EntryProps, KeyValueMap } from "contentful-management";
export interface PollingState extends Record<string, unknown> {
  lastPolledAt?: string;
  initialSyncInProgress?: boolean;
}
export interface PollingChangesObject {
  created: EntryProps<KeyValueMap>[];
  updated: EntryProps<KeyValueMap>[];
}
export interface PollingRecordChange {
  changeType: "created" | "updated";
  record: EntryProps<KeyValueMap>;
}
export interface EventsWebhookFlowState {
  webhookId: string;
  spaceId: string;
}
export interface ContentfulCanonicalRequest {
  method: string;
  path: string;
  headers: Record<string, string>;
  body: string;
}
