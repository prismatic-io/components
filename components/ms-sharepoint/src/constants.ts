import { GRAPH_SUBSCRIPTION_MAX_MINUTES } from "ms-utils";

export const BASE_URL = "https://graph.microsoft.com";
export const DEFAULT_SCOPES = "Sites.ReadWrite.All Sites.Manage.All offline_access";

export const DEFAULT_SUBSCRIPTION_DAYS = 3;
export const MAX_SUBSCRIPTION_DAYS = 30;
export const SITE_LIST_SUBSCRIPTION_DEFAULT_DAYS = 29;
export const RENEWAL_MARGIN_MINUTES = 10;
export const RENEWAL_EXPIRATION_MINUTES =
  GRAPH_SUBSCRIPTION_MAX_MINUTES.DRIVE_ITEM - RENEWAL_MARGIN_MINUTES;
export const MINUTES_PER_DAY = 24 * 60;

export const DEFAULT_PAGE_SIZE = 100;
export const DELTA_PREFER_HEADER = "deltaExcludeParent";
export const DELTA_NEXT_LINK_SUFFIX = ":nextLink";

export const GRAPH_FANOUT_CONCURRENCY = 5;
export const FOLDER_KEY_SEPARATOR = ":";
export const SITE_SEARCH_ALL = "";
export const SKIPPABLE_PARENT_STATUSES = [403, 404];
