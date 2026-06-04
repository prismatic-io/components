export const PollResource = {
  REPORT_SUITES: "reportSuites",
  COMPANIES: "companies",
} as const;

export const POLL_RESOURCE_CONFIG = {
  [PollResource.REPORT_SUITES]: { label: "Report Suites" },
  [PollResource.COMPANIES]: { label: "Companies" },
} as const;

export const pollResourceModel = Object.entries(POLL_RESOURCE_CONFIG).map(
  ([value, { label }]) => ({ label, value }),
);
