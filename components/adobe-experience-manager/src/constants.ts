import type { AemAssetsEventCode, AemSitesEventCode } from "./types";

export const SERVER_TO_SERVER_CONNECTION_KEY = "aemOAuthServerToServer";
export const WEB_APP_CONNECTION_KEY = "aemOAuthWebApp";

export const DEFAULT_TOKEN_URL = "https://ims-na1.adobelogin.com/ims/token/v3";
export const DEFAULT_AUTHORIZE_URL = "https://ims-na1.adobelogin.com/ims/authorize/v2";
export const WEB_APP_DEFAULT_SCOPES = "openid,AdobeID,aem.assets.author,aem.folders";

export const AEM_HOST_SUFFIX = ".adobeaemcloud.com";

export const SITES_API_PATH = "/adobe/sites";
export const FOLDERS_API_PATH = "/adobe/folders";
export const ASSETS_API_PATH = "/adobe/assets";

export const IO_EVENTS_BASE_URL = "https://api.adobe.io/events";
export const IO_EVENTS_PUBLIC_KEY_BASE_URL = "https://static.adobeioevents.com";

export const IO_EVENTS_REGISTRATION_NAME_MAX_LENGTH = 80;

export const PUBLIC_KEY_CACHE_TTL_MS = 24 * 60 * 60 * 1000;

export const MAX_PAGE_LIMIT = 50;
export const MAX_FETCH_ALL_PAGES = 500;

export const DEFAULT_DAM_ROOT = "/content/dam";

export const MAX_RETRIES = 5;
export const RETRYABLE_STATUS_CODES = [429, 503];

export const DEFAULT_BATCH_SIZE = 50;

export const UNBATCHED_MAX_PAGES = 20;
export const SETTLE_LAG_MS = 2 * 60 * 1000;

export const MAX_FOLDER_WALK = 1000;

export const MAX_DATA_SOURCE_ITEMS = 1000;

export const MAX_SITEMAPS = 50;

export const PUBLIC_CLIENT_BASE_URL = "";

export const ASSET_MODIFY_DATE_FIELD = "repositoryMetadata.repo:modifyDate";
export const ASSET_CREATE_DATE_FIELD = "repositoryMetadata.repo:createDate";
export const ASSET_ANCESTORS_FIELD = "repositoryMetadata.repo:ancestors";
export const ASSET_FORMAT_FIELD = "repositoryMetadata.dc:format";

export const CONTENT_FRAGMENT_STATUSES = [
  { label: "New", value: "NEW" },
  { label: "Draft", value: "DRAFT" },
  { label: "Published", value: "PUBLISHED" },
  { label: "Modified", value: "MODIFIED" },
  { label: "Unpublished", value: "UNPUBLISHED" },
];

export const DEFAULT_TRIGGER_FRAGMENT_STATUSES = ["PUBLISHED", "MODIFIED"];

export const CONTENT_FRAGMENT_PROJECTIONS = [
  { label: "Minimal", value: "minimal" },
  { label: "Summary", value: "summary" },
  { label: "Full", value: "full" },
];

export const CONTENT_FRAGMENT_REFERENCES = [
  { label: "Direct", value: "direct" },
  { label: "Direct (Hydrated)", value: "direct-hydrated" },
  { label: "All", value: "all" },
  { label: "All (Hydrated)", value: "all-hydrated" },
];

export const CONTENT_FRAGMENT_SORT_FIELDS = [
  { label: "Title", value: "title" },
  { label: "Created", value: "created" },
  { label: "Modified", value: "modified" },
  { label: "Modified or Created", value: "modifiedOrCreated" },
];

export const SORT_ORDERS = [
  { label: "Ascending", value: "ASC" },
  { label: "Descending", value: "DESC" },
];

export const FOLDER_LISTING_TYPES = [
  { label: "Folders and Assets", value: "FOLDER,ASSET" },
  { label: "Folders", value: "FOLDER" },
  { label: "Assets", value: "ASSET" },
];

export const FOLDER_ORDER_BY = [
  { label: "Name", value: "name" },
  { label: "Size", value: "size" },
  { label: "Last Modified", value: "lastModifiedAt" },
];

export const ASSET_SORT_FIELDS = [
  { label: "Modified", value: ASSET_MODIFY_DATE_FIELD },
  { label: "Created", value: ASSET_CREATE_DATE_FIELD },
  { label: "Name", value: "repositoryMetadata.repo:name" },
];

export const AEM_EVENT_BRANCHES = ["Notification", "URL Verification"];

export const AEM_SITES_EVENT_TYPES: { label: string; value: AemSitesEventCode }[] = [
  { label: "Content Fragment Created", value: "aem.sites.contentFragment.created" },
  { label: "Content Fragment Modified", value: "aem.sites.contentFragment.modified" },
  { label: "Content Fragment Published", value: "aem.sites.contentFragment.published" },
  { label: "Content Fragment Unpublished", value: "aem.sites.contentFragment.unpublished" },
  { label: "Content Fragment Deleted", value: "aem.sites.contentFragment.deleted" },
  { label: "Page Created", value: "aem.sites.page.created" },
  { label: "Page Modified", value: "aem.sites.page.modified" },
  { label: "Page Published", value: "aem.sites.page.published" },
  { label: "Page Unpublished", value: "aem.sites.page.unpublished" },
  { label: "Page Deleted", value: "aem.sites.page.deleted" },
];

export const AEM_ASSETS_EVENT_TYPES: { label: string; value: AemAssetsEventCode }[] = [
  { label: "Asset Processing Completed", value: "aem.assets.asset.processing_completed" },
  { label: "Asset Metadata Updated", value: "aem.assets.asset.metadata_updated" },
  { label: "Asset Published", value: "aem.assets.asset.published" },
  { label: "Asset Unpublished", value: "aem.assets.asset.unpublished" },
  { label: "Asset Deleted", value: "aem.assets.asset.deleted" },
];

export const DATE_ONLY_PATTERN = /^(\d{4})-(\d{2})-(\d{2})$/;
