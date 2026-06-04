import type { Connection } from "@prismatic-io/spectral";

export interface CRMRecords {
  data: CRMRecord[];
}

export interface CRMRecord {
  id: string;
  Created_Time: string;
  Modified_Time: string;
  Full_Name: string;
  Name?: string;
  Subject?: string;
}

export interface BookContactsRecords {
  contacts: BookRecord[];
}

export interface BookRecord {
  created_time: string;
  last_modified_time: string;
  [key: string]: string;
}

export type ZohoRecord = CRMRecord | BookRecord;

export interface NotificationTriggerInputs {
  connection: Connection;
  channelId?: string;
  events: unknown;
  token?: string;
  channelExpiry?: string;
  returnAffectedFieldValues?: boolean;
  notifyOnRelatedAction?: boolean;
  notificationCondition?: unknown;
}

export interface EnableNotificationParams {
  channelId: string | number;
  events: unknown;
  notifyUrl: string;
  token?: string;
  channelExpiry?: string;
  returnAffectedFieldValues?: boolean;
  notifyOnRelatedAction?: boolean;
  notificationCondition?: unknown;
}

export interface DisableSpecificNotificationParams {
  channelId: string | number;
  events: unknown;
  notifyOnRelatedAction?: boolean;
}

export interface WatchConfig {
  channel_id: string | number;
  events?: unknown;
  notify_url?: string;
  token?: string;
  channel_expiry?: string;
  notification_condition?: unknown[];
  notify_on_related_action?: boolean;
  return_affected_field_values?: boolean;
}

export interface NotificationChannel {
  channel_id: string;
  events: string[];
  notify_url?: string;
  channel_expiry?: string;
}

export interface WatchResponse {
  watch: NotificationChannel[];
}

export interface NotificationsBody {
  token?: string;
  channelExpiry?: string;
  notificationCondition?: unknown;
  events?: unknown;
  notifyUrl?: string;
  notifyOnRelatedAction?: boolean;
  returnAffectedFieldValues?: boolean;
}

export interface paginationParams {
  searchFields?: string;
  fields?: string;
  page?: number;
  per_page?: number;
  page_token?: string;
  sort_order?: string;
  sort_by?: string;
  channelId?: string | number;
  module?: string;
}
