
export const EXPERIMENTAL_API_HEADER = {
  "X-ExperimentalApi": "opt-in",
} as const;


export const DEFAULT_PAGE_SIZE = 50;


export const API_PATH = "/rest/servicedeskapi";




export const SUCCESS_RESPONSE = { success: true } as const;



export const OPS_EVENTS_BASE_URL =
  "https://api.atlassian.com/jsm/ops/integration/v2";



export const OPS_API_HOST = "api.atlassian.com";
export const OPS_API_PATH_PREFIX = "/jsm/ops/api";






export const ASSETS_API_HOST = "api.atlassian.com";



export const ASSETS_WORKSPACE_LOOKUP_PATH =
  "/rest/servicedeskapi/assets/workspace";

export const DEFAULT_OAUTH2_SCOPES = [
  "read:servicedesk-request",
  "write:servicedesk-request",
  "manage:servicedesk-customer",
  "read:jira-user",
  "read:ops-alert:jira-service-management",
  "write:ops-alert:jira-service-management",
  "delete:ops-alert:jira-service-management",
  "read:ops-config:jira-service-management",
  "write:ops-config:jira-service-management",
  "delete:ops-config:jira-service-management",
  "read:cmdb-object:jira",
  "write:cmdb-object:jira",
  "delete:cmdb-object:jira",
  "read:cmdb-schema:jira",
  "write:cmdb-schema:jira",
  "delete:cmdb-schema:jira",
  "read:cmdb-type:jira",
  "write:cmdb-type:jira",
  "delete:cmdb-type:jira",
  "read:cmdb-attribute:jira",
  "offline_access",
] as const;
