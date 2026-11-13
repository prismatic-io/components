import type { WebhookResourceConfig, WebhookResourceType } from "./types";

export const ATTACHMENTS_DATA_INPUT_EXAMPLE = [
  { key: "my-attachment.pdf", value: "<BINARY FILE DATA TO ATTACH>" },
  { key: "another-attachment.xlsx", value: "<BINARY EXCEL FILE DATA>" },
];

export const scopesForAuthorizationCodeFlow =
  "https://graph.microsoft.com/User.Read https://graph.microsoft.com/Calendars.ReadWrite https://graph.microsoft.com/Mail.ReadWrite https://graph.microsoft.com/Mail.Send offline_access";

export const RENEWAL_EXPIRATION_MINUTES = 10070;

export const WEBHOOK_RESOURCE_CONFIG: Record<WebhookResourceType, WebhookResourceConfig> = {
  event: {
    endpoint: "/me/events",
    dataKey: "eventData",
  },
  message: {
    endpoint: "/me/messages",
    dataKey: "messageData",
  },
};

export const POLLING_ENDPOINTS = {
  MESSAGES: "/me/messages",
  MAIL_FOLDER_MESSAGES: (folderId: string): string => `/me/mailFolders/${folderId}/messages`,
};

export const MESSAGES_DEFAULT_ORDERBY = "lastModifiedDateTime";

export const TRIGGER_BATCH_SIZE = 50;

export const POLL_PAGE_SIZE = 100;

export const POLL_UNBATCHED_MAX_PAGES = 10;

export const WATERMARK_SKEW_MARGIN_MS = 60_000;

export const LOOK_BACK_DATE_PATTERN = /^(\d{4})-(\d{2})-(\d{2})$/;

export const ATTACHMENT_METADATA_SELECT = "id,name,contentType,size,isInline,lastModifiedDateTime";

export const REFERENCE_ATTACHMENT_ODATA_TYPE = "#microsoft.graph.referenceAttachment";

export const DEFAULT_ATTACHMENT_CONTENT_TYPE = "application/octet-stream";

export const ITEM_ATTACHMENT_EXPAND = "microsoft.graph.itemAttachment/item($select=id)";

export const ITEM_ATTACHMENT_CONTENT_TYPES: Record<string, string> = {
  "#microsoft.graph.message": "message/rfc822",
  "#microsoft.graph.event": "text/calendar",
};
