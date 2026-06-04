export const PollResource = {
  TIMESHEETS: "timesheets",
  USERS: "users",
  JOBCODES: "jobcodes",
} as const;

export const POLL_RESOURCE_CONFIG = {
  [PollResource.TIMESHEETS]: { label: "Timesheets" },
  [PollResource.USERS]: { label: "Users" },
  [PollResource.JOBCODES]: { label: "Job Codes" },
} as const;

export const pollResourceModel = Object.entries(POLL_RESOURCE_CONFIG).map(([value, { label }]) => ({
  label,
  value,
}));
