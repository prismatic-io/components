import { GRAPH_SUBSCRIPTION_MAX_MINUTES } from "ms-utils";

export const BASE_URL = "https://graph.microsoft.com/v1.0";
export const RENEWAL_MARGIN_MINUTES = 10;
export const RENEWAL_EXPIRATION_MINUTES =
  GRAPH_SUBSCRIPTION_MAX_MINUTES.DRIVE_ITEM - RENEWAL_MARGIN_MINUTES;
export const MINUTES_PER_DAY = 24 * 60;
export const MAX_SUBSCRIPTION_DAYS = 30;
export const DEFAULT_SUBSCRIPTION_DAYS = 3;
export const DEFAULT_TIMEOUT = 4000;
export const SUBSCRIPTION_TIMEOUT_MS = 30000;
export const DRIVE_ROOT_PREFIX = "/drive/root:";
export const ROOT_CHILDREN_PATH = "/me/drive/root/children";
export const GRAPH_RESOURCE_PREFIXES = [
  "/me/",
  "/drive/",
  "/drives/",
  "/sites/",
  "/users/",
  "/groups/",
];

export const GRAPH_FANOUT_CONCURRENCY = 5;
export const FOLDER_KEY_SEPARATOR = ":";
export const SITE_SEARCH_ALL = "";
export const SKIPPABLE_PARENT_STATUSES = [403, 404];
