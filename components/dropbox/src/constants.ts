export const IN_PROGRESS_TAG = "in_progress";
export const SAVE_FROM_URL_POLL_INTERVAL_MS = 1000;
export const MAX_LIST_FOLDER_LIMIT = 2000;
export const MAX_SHARING_LIMIT = 1000;
export const MAX_BATCHED_PAGE_SIZE = 1000;
export const MAX_SEARCH_LIMIT = 1000;
export const ALL_LEVELS_AUTHENTICATION_INPUT_MODEL = [
  { label: "Admin", value: "admin" },
  { label: "User", value: "user" },
  { label: "Empty", value: "" },
];
export const MISSING_ACCESS_TOKEN_ERROR_MESSAGE =
  "The Dropbox connection has no access token. Reconnect the Dropbox connection and try again.";
export const MISSING_PATHS_ERROR_MESSAGE =
  "File Paths or Dynamic Paths must be specified";
export const BOTH_ENTRY_FILTER = "all";
export const LIST_CHANGES_CURSOR_STATE_KEY_PREFIX =
  "dropbox-list-changes-cursor";
export const SYNC_CHANGES_CURSOR_STATE_KEY_PREFIX =
  "dropbox-sync-changes-cursor";
