export const MY_DRIVE = "my-drive";
export const MY_DRIVE_LABEL = "My Drive";
export const LIST_CHANGES_STATE_KEY_PREFIX =
  "google-drive-list-changes-page-token";
export const FOLDER_MIME_TYPE = "application/vnd.google-apps.folder";
export const FOLDER_QUERY = `mimeType='${FOLDER_MIME_TYPE}'`;
export const DRIVES_PAGE_SIZE = 100;
export const CHANGES_PAGE_SIZE = 1000;
export const CHANGE_LIST_KIND = "drive#changeList";
export const STAGGER_EVERY_N_CHUNKS = 10;
export const DRIVE_CHANGE_KIND = "drive#change";
export const CHANGE_TYPE_FILE = "file";
export const WEBHOOK_CHANNEL_TYPE = "web_hook";
export const DEFAULT_BATCH_SIZE = 50;
export const BACKFILL_FILE_FIELDS =
  "nextPageToken, files(id, name, mimeType, kind, modifiedTime)";
export const ACTIVITY_SYNC_HANDOFF_KEY_PREFIX =
  "google-drive-activity-sync-handoff";
export const INITIAL_SYNC_COMPLETED_KEY_PREFIX =
  "google-drive-initial-sync-completed";
