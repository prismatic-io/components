export const DEFAULT_PAGE_SIZE = 100;
export const WEBHOOK_SECRET_BYTES = 32;
export const LINK_HEADER_NEXT = 'rel="next"';
export const WEBHOOK_DEFAULTS = {
  name: "web",
  contentType: "json",
  insecureSsl: "0",
} as const;
export const DEFAULT_BATCH_SIZE = 50;
export const LOOK_BACK_DATE_PATTERN = /^(\d{4})-(\d{2})-(\d{2})$/;
export const MAX_BATCHED_RECORDS = 500;
