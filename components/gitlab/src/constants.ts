export const DEFAULT_GITLAB_URL = "https://gitlab.com";
export const API_PATH = "/api/v4";
export const MAX_PER_PAGE = 100;
export const MAX_RETRIES = 3;
export const MAX_RETRY_DELAY_MS = 60000;
export const RETRY_BASE_DELAY_MS = 500;
export const IDEMPOTENT_METHODS = new Set(["get", "head", "put", "delete"]);
export const KEYSET_ORDER_BY_ID = { order_by: "id", sort: "asc" } as const;
export const RETRYABLE_NETWORK_CODES = new Set([
  "ECONNRESET",
  "ETIMEDOUT",
  "ECONNREFUSED",
  "EAI_AGAIN",
  "EPIPE",
]);
export const REDACTED_HEADERS = new Set(["private-token", "authorization"]);
export const REDACTED_BODY_KEYS = new Set([
  "token",
  "private_token",
  "access_token",
  "secret",
  "password",
  "client_secret",
]);
export const REDACTED_QUERY_PARAMS = new Set(["private_token", "access_token"]);
export const DEBUG_BODY_LIMIT_BYTES = 10 * 1024;
export const TLS_TRUST_CODES = new Set([
  "DEPTH_ZERO_SELF_SIGNED_CERT",
  "SELF_SIGNED_CERT_IN_CHAIN",
  "UNABLE_TO_VERIFY_LEAF_SIGNATURE",
  "UNABLE_TO_GET_ISSUER_CERT_LOCALLY",
  "CERT_HAS_EXPIRED",
]);
export const DEFAULT_BATCH_SIZE = 50;
export const MAX_BATCHED_PAGE_SIZE = 500;
export const MAX_BATCHED_PAYLOAD_BYTES = 4500000;
export const MAX_UNBATCHED_RECORDS = 1000;
export const WEBHOOK_STATE_KEY_PREFIX = "gitlabWebhook";
export const OTHER_EVENT_BRANCH = "Other";
export const WEBHOOK_EVENTS = [
  { label: "Push", value: "push_events", header: "Push Hook" },
  { label: "Tag Push", value: "tag_push_events", header: "Tag Push Hook" },
  { label: "Issue", value: "issues_events", header: "Issue Hook" },
  {
    label: "Confidential Issue",
    value: "confidential_issues_events",
    header: "Confidential Issue Hook",
  },
  { label: "Note", value: "note_events", header: "Note Hook" },
  {
    label: "Confidential Note",
    value: "confidential_note_events",
    header: "Confidential Note Hook",
  },
  {
    label: "Merge Request",
    value: "merge_requests_events",
    header: "Merge Request Hook",
  },
  { label: "Pipeline", value: "pipeline_events", header: "Pipeline Hook" },
  { label: "Job", value: "job_events", header: "Job Hook" },
  { label: "Release", value: "releases_events", header: "Release Hook" },
  {
    label: "Deployment",
    value: "deployment_events",
    header: "Deployment Hook",
  },
  { label: "Milestone", value: "milestone_events", header: "Milestone Hook" },
] as const;
export const WEBHOOK_BRANCH_NAMES = [
  ...WEBHOOK_EVENTS.map((event) => event.label),
  OTHER_EVENT_BRANCH,
];
export const POLL_RESOURCE_CONFIG = {
  issues: { label: "Issues", path: "issues" },
  mergeRequests: { label: "Merge Requests", path: "merge_requests" },
} as const;
export const ISSUE_STATE_OPTIONS = [
  { label: "Opened", value: "opened" },
  { label: "Closed", value: "closed" },
  { label: "All", value: "all" },
];
export const MERGE_REQUEST_STATE_OPTIONS = [
  { label: "Opened", value: "opened" },
  { label: "Closed", value: "closed" },
  { label: "Locked", value: "locked" },
  { label: "Merged", value: "merged" },
  { label: "All", value: "all" },
];
export const BOOLEAN_OPTIONS = [
  { label: "True", value: "true" },
  { label: "False", value: "false" },
];
export const STATE_EVENT_OPTIONS = [
  { label: "Close", value: "close" },
  { label: "Reopen", value: "reopen" },
];
export const ISSUE_STATES = ["opened", "closed"] as const;
export const MERGE_REQUEST_STATES = [
  "opened",
  "closed",
  "locked",
  "merged",
] as const;
export const MILESTONE_STATES = ["active", "closed"] as const;
export const PIPELINE_STATUSES = [
  "created",
  "waiting_for_resource",
  "preparing",
  "waiting_for_callback",
  "pending",
  "running",
  "success",
  "failed",
  "canceling",
  "canceled",
  "skipped",
  "manual",
  "scheduled",
] as const;
export const PIPELINE_STATUS_OPTIONS = PIPELINE_STATUSES.map((value) => ({
  label: value,
  value,
}));
export const MILESTONE_STATE_OPTIONS = MILESTONE_STATES.map((value) => ({
  label: `${value.charAt(0).toUpperCase()}${value.slice(1)}`,
  value,
}));
export const FILE_ENCODING_OPTIONS = [
  { label: "Text", value: "text" },
  { label: "Base64", value: "base64" },
];
export const DATE_PATTERN = /^(\d{4})-(\d{2})-(\d{2})$/;
export const BRANCH_DELETED_MESSAGE = "Branch deleted successfully.";
export const ISSUE_DELETED_MESSAGE = "Issue deleted successfully.";
