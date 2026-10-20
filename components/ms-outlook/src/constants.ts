import type { WebhookResourceConfig } from "./types";
export const ATTACHMENTS_DATA_INPUT_EXAMPLE = [
  { key: "my-attachment.pdf", value: "<BINARY FILE DATA TO ATTACH>" },
  { key: "another-attachment.xlsx", value: "<BINARY EXCEL FILE DATA>" },
];
export const scopesForAuthorizationCodeFlow =
  "https://graph.microsoft.com/User.Read https://graph.microsoft.com/Calendars.ReadWrite https://graph.microsoft.com/Mail.ReadWrite https://graph.microsoft.com/Mail.Send offline_access";
export const RENEWAL_EXPIRATION_MINUTES = 10070;
export const WEBHOOK_RESOURCE_CONFIG: Record<string, WebhookResourceConfig> = {
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
  MAIL_FOLDER_MESSAGES: (folderId: string): string =>
    `/me/mailFolders/${folderId}/messages`,
};
export const MESSAGES_DEFAULT_ORDERBY = "lastModifiedDateTime";
export const TRIGGER_BATCH_SIZE = 50;
export const POLL_PAGE_SIZE = 100;
export const POLL_UNBATCHED_MAX_PAGES = 10;
export const WATERMARK_SKEW_MARGIN_MS = 60000;
export const LOOK_BACK_DATE_PATTERN = /^(\d{4})-(\d{2})-(\d{2})$/;
