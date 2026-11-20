export const TENANT_PLACEHOLDER = "{tenant}";

export const SERVICE_VERSIONS = {
  timeTracking: "timeTracking/v7",
  absenceManagement: "absenceManagement/v5",
  person: "person/v4",
  accountsPayable: "accountsPayable/v1",
  businessProcess: "businessProcess/v1",
  connect: "connect/v2",
  customerAccounts: "customerAccounts/v1",
  common: "common/v1",
  prismAnalytics: "prismAnalytics/v3",
  staffing: "staffing/v7",
} as const;

export const SERVICES = {
  timeTracking: `/api/${SERVICE_VERSIONS.timeTracking}/${TENANT_PLACEHOLDER}`,
  absenceManagement: `/api/${SERVICE_VERSIONS.absenceManagement}/${TENANT_PLACEHOLDER}`,
  person: `/api/${SERVICE_VERSIONS.person}/${TENANT_PLACEHOLDER}`,
  accountsPayable: `/api/${SERVICE_VERSIONS.accountsPayable}/${TENANT_PLACEHOLDER}`,
  businessProcess: `/api/${SERVICE_VERSIONS.businessProcess}/${TENANT_PLACEHOLDER}`,
  connect: `/api/${SERVICE_VERSIONS.connect}/${TENANT_PLACEHOLDER}`,
  customerAccounts: `/api/${SERVICE_VERSIONS.customerAccounts}/${TENANT_PLACEHOLDER}`,
  common: `/api/${SERVICE_VERSIONS.common}/${TENANT_PLACEHOLDER}`,
  prismAnalytics: `/api/${SERVICE_VERSIONS.prismAnalytics}`,
  staffing: `/api/${SERVICE_VERSIONS.staffing}/${TENANT_PLACEHOLDER}`,
} as const;

export type ServiceKey = keyof typeof SERVICES;

export const WORKDAY_API_DOCS_URL =
  "https://community.workday.com/sites/default/files/file-hosting/restapi/index.html";

export const MULTIPART_JSON_PART_NAME = "jsonData";
export const DEFAULT_ATTACHMENT_FILE_NAME = "attachment";
export const ATTACHMENT_EXTENSIONS: Record<string, string> = {
  "application/json": "json",
  "application/msword": "doc",
  "application/pdf": "pdf",
  "application/vnd.ms-excel": "xls",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": "xlsx",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
    "docx",
  "application/xml": "xml",
  "application/zip": "zip",
  "image/gif": "gif",
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/tiff": "tiff",
  "text/csv": "csv",
  "text/html": "html",
  "text/plain": "txt",
  "text/xml": "xml",
};

export const WQL_MAX_GET_QUERY_LENGTH = 2047;
export const WQL_DEFAULT_FETCH_ALL_LIMIT = 1000;
export const WQL_MAX_CACHED_ROWS = 10000;

export const DEFAULT_TOKEN_TTL_MS = 15 * 60 * 1000;
export const TOKEN_EXPIRY_MARGIN_SECONDS = 60;
export const TOKEN_ERROR_MAX_LENGTH = 300;
export const HTTP_STATUS_UNAUTHORIZED = 401;
export const MS_PER_SECOND = 1000;
export const MS_PER_MINUTE = 60 * MS_PER_SECOND;

export const PAGINATION_DEFAULT_LIMIT = 100;
export const PAGINATION_MAX_PAGES = 100;

export const REST_API_ENDPOINT =
  /^(https:\/\/[^/?#]+)(\/[^?#]*?)?\/api\/v\d+\/([^/?#]+)\/?$/i;
export const TOKEN_ENDPOINT = /\/oauth2\/([^/?#]+)\/token\/?(?:[?#].*)?$/i;
export const ISO_DATE_PREFIX_PATTERN = /^\d{4}-\d{2}-\d{2}/;

export const DAY_MS = 24 * 60 * 60 * 1000;
export const ISO_DATE_LENGTH = 10;
export const ISO_MINUTES_LENGTH = 16;
export const ROW_FINGERPRINT_LENGTH = 16;
export const ISO_SECONDS_LENGTH = 19;

export const TRIGGER_BATCH_SIZE = 50;
export const LOOK_BACK_DATE_PATTERN = /^(\d{4})-(\d{2})-(\d{2})$/;
export const POLLING_OVERLAP_MS = 5 * 60 * 1000;
export const POLLING_SEEN_MAX = 10000;
export const WQL_DATE_VALUE_PATTERN =
  /^(\d{4}-\d{2}-\d{2})(?:[T ](\d{2}:\d{2}(?::\d{2}(?:\.\d+)?)?)(Z|[+-]\d{2}:?\d{2})?)?$/;
export const WQL_LAST_POLLED_AT_PLACEHOLDER = "{{lastPolledAt}}";
export const EVENT_STEPS_OVERLAP_DAYS = 1;
export const EVENT_STEPS_PAGE_SIZE = 100;
export const EVENT_STEPS_MAX_PAGES = 1000;
