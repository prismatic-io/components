export const BASE_URL = "https://api.notion.com/v1";
export const NOTION_VERSION = "2025-09-03";
export const OLD_NOTION_VERSION = "2022-06-28";
export const MAX_PAGE_SIZE = 100;
export enum HttpMethod {
  GET = "GET",
  POST = "POST",
}
export const BATCH_SIZE = 50;
export const LOOK_BACK_DATE_PATTERN = /^(\d{4})-(\d{2})-(\d{2})$/;
export const MILLISECONDS_PER_MINUTE = 60 * 1000;
export const MAX_POLL_PAGES_PER_RUN = 50;
export const MAX_BATCHED_PAGES_PER_RUN = 5;
export const DEFAULT_BACKFILL_MAX_PAGES = 20;
export const BACKFILL_CURSOR_KEY = "notionBackfillCursor";
export const BACKFILL_COMPLETED_KEY = "notionBackfillCompleted";
