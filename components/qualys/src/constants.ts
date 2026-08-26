export enum ApiPlane {
  Gateway = "gateway",
  Classic = "classic",
}
export const TICKET_BATCH_LIMIT = 20000;
export const DEFAULT_GATEWAY_PAGE_SIZE = 100;
export const DEFAULT_CLASSIC_PAGE_SIZE = 100;
export const MIN_PAGE_SIZE = 10;
export const Messages = {
  TICKETS_UPDATED: "Tickets updated",
  TICKETS_DELETED: "Tickets deleted",
  TICKETS_DRY_RUN: "Dry run — showing tickets that would be deleted",
  SCAN_LAUNCHED: "Scan launched",
  DETERMINED_BY_FILTERS: "determined by filters",
  SCAN_SUBMITTED: "Submitted",
  SUCCESS: "SUCCESS",
} as const;
export const DEFAULT_QPS_PAGE_SIZE = 100;
export const TRURISK_SEVERE_THRESHOLD = 850;
export const TRURISK_HIGH_THRESHOLD = 700;
export const TRURISK_MEDIUM_THRESHOLD = 500;
export const MS_PER_DAY = 1000 * 60 * 60 * 24;
export const HTTP_RANGE_NOT_SATISFIABLE = 416;
export const XML_HEADERS = {
  "Content-Type": "application/xml",
  Accept: "application/xml",
} as const;
export const TEXT_XML_HEADERS = {
  "Content-Type": "text/xml",
  Accept: "application/xml",
} as const;
