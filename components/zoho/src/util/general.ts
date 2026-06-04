import { type Connection, ConnectionError, type KeyValuePair, util } from "@prismatic-io/spectral";
import connections from "../connections";
import type {
  BookRecord,
  CRMRecord,
  NotificationChannel,
  NotificationsBody,
  WatchConfig,
} from "../types";

export const cleanKeyValList = (values: unknown) =>
  util.types.keyValPairListToObject(values as KeyValuePair<unknown>[]);

export const validateConnection = (connection: Connection): connection is Connection => {
  if (!connections.map((c) => c.key).includes(connection.key)) {
    throw new ConnectionError(
      connection,
      `Unsupported Connection specified. Please specify a supported connection type for Zoho. Received ${connection.key}`,
    );
  }
  return true;
};

export const toOptionalString = (value: unknown) =>
  value ? util.types.toString(value) : undefined;

export const toOptionalObject = (value: unknown) =>
  value ? util.types.toObject(value) : undefined;

export const getBooksUrl = (
  parentRecordType: string,
  parentRecordId: string,
  recordType: string,
  recordId?: string,
): string => {
  const url =
    parentRecordType && parentRecordId
      ? `/${parentRecordType}/${parentRecordId}/${recordType}`
      : `/${recordType}`;
  if (recordId) {
    return `${url}/${recordId}`;
  }
  return url;
};

export const fillNotificationsBody = (params: NotificationsBody, watchConfig: WatchConfig) => {
  if (params.events && Array.isArray(params.events) && params.events.length > 0) {
    watchConfig.events = params.events;
  }

  if (params.notifyUrl) {
    watchConfig.notify_url = params.notifyUrl;
  }

  if (params.token) {
    watchConfig.token = params.token;
  }

  if (params.channelExpiry) {
    watchConfig.channel_expiry = params.channelExpiry;
  }

  if (
    params.notificationCondition &&
    Array.isArray(params.notificationCondition) &&
    params.notificationCondition.length > 0
  ) {
    watchConfig.notification_condition = params.notificationCondition;
  }

  if (params.notifyOnRelatedAction !== undefined) {
    watchConfig.notify_on_related_action = params.notifyOnRelatedAction;
  }

  if (params.returnAffectedFieldValues !== undefined) {
    watchConfig.return_affected_field_values = params.returnAffectedFieldValues;
  }
};

export const getCrmRecordLabel = (record: CRMRecord): string => {
  return record.Full_Name || record.Name || record.Subject || record.id || "Unknown";
};

export const getBooksRecordLabel = (record: BookRecord): string => {
  return (
    record.contact_name ||
    record.name ||
    record.invoice_number ||
    record.item_name ||
    record.description ||
    "Unknown"
  );
};

export const getNotificationChannelLabel = (channel: NotificationChannel): string => {
  const events = channel.events?.join(", ") || "No events";
  return `Channel ${channel.channel_id} (${events})`;
};

export const getBooksRecordIdField = (record: BookRecord): string | undefined => {
  const idField = Object.keys(record).find((key) => key.endsWith("_id"));

  if (!idField && "id" in record) {
    return "id";
  }

  return idField;
};
