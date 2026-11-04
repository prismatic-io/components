export const BASE_URL =
  "https://integrations.expensify.com/Integration-Server/ExpensifyIntegrations";

export const JOB_TYPES = {
  GET: "get",
  CREATE: "create",
  UPDATE: "update",
  DOWNLOAD: "download",
  FILE: "file",
} as const;

export const INPUT_SETTINGS_TYPES = {
  POLICY_LIST: "policyList",
  POLICY: "policy",
  DOMAIN_CARD_LIST: "domainCardList",
  EMPLOYEES: "employees",
  EXPENSE_RULES: "expenseRules",
  EXPENSES: "expenses",
  REPORT: "report",
  REPORT_STATUS: "reportStatus",
  COMBINED_REPORT_DATA: "combinedReportData",
} as const;

export const FORM_FIELDS = {
  REQUEST_JOB_DESCRIPTION: "requestJobDescription",
  TEMPLATE: "template",
} as const;

export const RETURN_RANDOM_FILE_NAME = "returnRandomFileName";

export const EMPLOYEE_UPDATE_SETTINGS = {
  ENTITY: "generic",
  DATA_SOURCE: "request",
} as const;

export const SUCCESS_RESPONSE_CODE = 200;
